import { NextResponse } from "next/server";

import {
  canUseTemporaryManualAccess,
  isBypassCheckoutEnabled
} from "@/lib/env";
import { findPurchaseBySessionId } from "@/lib/db";
import { getPlanById } from "@/lib/payments/plans";
import { hasZaakpay } from "@/lib/zaakpay/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session ID." },
      { status: 400 }
    );
  }

  const purchase = await findPurchaseBySessionId(sessionId);

  if (
    (!hasZaakpay() &&
      purchase &&
      (isBypassCheckoutEnabled ||
        canUseTemporaryManualAccess(purchase.email))) ||
    sessionId.startsWith("dev_bypass_") ||
    sessionId.startsWith("manual_access_")
  ) {
    if (!purchase) {
      return NextResponse.json(
        { error: "Unable to verify checkout session." },
        { status: 503 }
      );
    }

    const plan = getPlanById(purchase.planId);

    return NextResponse.json({
      email: purchase.email,
      amount: purchase.amount,
      currency: purchase.currency,
      planName: plan?.name ?? "Roop Veda Plan"
    });
  }

  if (!purchase || purchase.status !== "paid") {
    return NextResponse.json(
      { error: "Payment has not been verified yet." },
      { status: 400 }
    );
  }

  const plan = getPlanById(purchase.planId);

  return NextResponse.json({
    email: purchase.email,
    amount: purchase.amount,
    currency: purchase.currency,
    planName: plan?.name ?? "Roop Veda Plan"
  });
}
