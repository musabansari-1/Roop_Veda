import { NextResponse } from "next/server";

import { findPurchaseBySessionId, upsertPurchaseBySessionId } from "@/lib/db";
import { completePaidPurchase } from "@/lib/payments/complete-purchase";
import { verifyZaakpayResponseChecksum } from "@/lib/zaakpay/server";
import { getBaseUrl } from "@/lib/utils";

export const runtime = "nodejs";

async function readPayload(request: Request) {
  if (request.method === "GET") {
    const url = new URL(request.url);
    return Object.fromEntries(url.searchParams.entries());
  }

  const formData = await request.formData();
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
  );
}

async function handleReturn(request: Request) {
  const payload = await readPayload(request);
  const orderId = payload.orderId;

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing Zaakpay order ID." },
      { status: 400 }
    );
  }

  const purchase = await findPurchaseBySessionId(orderId);

  if (!purchase) {
    return NextResponse.json(
      { error: "Purchase could not be found." },
      { status: 404 }
    );
  }

  if (!verifyZaakpayResponseChecksum(payload)) {
    return NextResponse.json(
      { error: "Unable to verify Zaakpay response." },
      { status: 400 }
    );
  }

  const responseAmount = Number(payload.amount ?? purchase.amount);

  if (!Number.isFinite(responseAmount) || responseAmount !== purchase.amount) {
    return NextResponse.json(
      { error: "Zaakpay amount mismatch." },
      { status: 400 }
    );
  }

  const responseCode = payload.responseCode ?? "";
  const isPaid = responseCode === "100";
  const wasAlreadyPaid = purchase.status === "paid";
  const purchaseStatus =
    responseCode === "102"
      ? "cancelled"
      : isPaid
        ? "paid"
        : "payment_failed";

  await upsertPurchaseBySessionId({
    userId: purchase.userId ?? undefined,
    leadId: purchase.leadId ?? undefined,
    email: purchase.email,
    paymentSessionId: orderId,
    status: purchaseStatus,
    planId: purchase.planId,
    amount: responseAmount,
    currency: purchase.currency,
    source: purchase.source ?? undefined,
    purchaseEventId: purchase.purchaseEventId ?? undefined
  });

  const baseUrl = getBaseUrl(request);

  if (!isPaid) {
    return NextResponse.redirect(
      new URL(`/plans?leadId=${purchase.leadId ?? ""}`, baseUrl),
      { status: 303 }
    );
  }

  if (wasAlreadyPaid) {
    const purchaseEventId = purchase.purchaseEventId ?? orderId;

    return NextResponse.redirect(
      new URL(
        `/setup?session_id=${orderId}&purchase_event_id=${purchaseEventId}`,
        baseUrl
      ),
      { status: 303 }
    );
  }

  const completedPurchase = await completePaidPurchase(
    {
      sessionId: orderId,
      email: purchase.email,
      planId: purchase.planId,
      purchaseEventId: purchase.purchaseEventId ?? undefined,
      leadId: purchase.leadId ?? undefined,
      source: purchase.source ?? undefined,
      amount: responseAmount,
      currency: purchase.currency
    },
    request
  );

  return NextResponse.redirect(
    new URL(
      `/setup?session_id=${orderId}&purchase_event_id=${completedPurchase.purchaseEventId}`,
      baseUrl
    ),
    { status: 303 }
  );
}

export async function GET(request: Request) {
  return handleReturn(request);
}

export async function POST(request: Request) {
  return handleReturn(request);
}
