import { NextResponse } from "next/server";

import { findLeadById, findPurchaseBySessionId } from "@/lib/db";
import { env } from "@/lib/env";
import { getPlanById } from "@/lib/payments/plans";
import {
  generateZaakpayRequestChecksum,
  getZaakpayTransactUrl,
  hasZaakpay
} from "@/lib/zaakpay/server";
import { absoluteUrl } from "@/lib/utils";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeZaakpayIpAddress(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const candidate = value.split(",")[0]?.trim();

  if (!candidate) {
    return undefined;
  }

  const ipv4MappedMatch = candidate.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  const normalized = ipv4MappedMatch?.[1] ?? candidate;

  const ipv4Pattern =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

  if (!ipv4Pattern.test(normalized)) {
    return undefined;
  }

  return normalized;
}

export async function GET(request: Request) {
  if (!hasZaakpay()) {
    return NextResponse.json(
      { error: "Zaakpay is not configured." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session ID." },
      { status: 400 }
    );
  }

  const purchase = await findPurchaseBySessionId(sessionId);

  if (!purchase) {
    return NextResponse.json(
      { error: "Purchase could not be found." },
      { status: 404 }
    );
  }

  const plan = getPlanById(purchase.planId);
  const lead = purchase.leadId ? await findLeadById(purchase.leadId) : null;
  const merchantIpAddress = normalizeZaakpayIpAddress(lead?.ipAddress);
  const payload = {
    amount: String(purchase.amount),
    buyerEmail: purchase.email,
    buyerFirstName: purchase.email.split("@")[0].replace(/[^a-z0-9 ]/gi, "").slice(0, 30) || "Customer",
    currency: purchase.currency.toUpperCase(),
    merchantIdentifier: env.ZAAKPAY_MERCHANT_IDENTIFIER ?? "",
    orderId: sessionId,
    productDescription: (plan?.name ?? "Roop Veda Plan").slice(0, 100),
    returnUrl: absoluteUrl("/api/zaakpay/return", request)
  };
  const checksum = generateZaakpayRequestChecksum(payload);
  const transactUrl = getZaakpayTransactUrl();
  const inputs = Object.entries({
    ...payload,
    ...(merchantIpAddress ? { merchantIpAddress } : {}),
    checksum
  })
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<input type="hidden" name="${escapeHtml(key)}" value="${escapeHtml(value)}" />`
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirecting to secure checkout</title>
  </head>
  <body>
    <form id="zaakpay-checkout-form" method="post" action="${escapeHtml(transactUrl)}">
      ${inputs}
      <noscript>
        <button type="submit">Continue to payment</button>
      </noscript>
    </form>
    <script>
      document.getElementById("zaakpay-checkout-form")?.submit();
    </script>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  });
}
