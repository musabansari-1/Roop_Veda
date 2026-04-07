import { NextResponse } from "next/server";

import { isBypassCheckoutEnabled } from "@/lib/env";
import { prisma } from "@/lib/prisma/client";
import { getPlanById } from "@/lib/stripe/plans";
import { getStripeServer, hasStripe } from "@/lib/stripe/server";

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

  const purchase = await prisma.purchase.findUnique({
    where: {
      stripeSessionId: sessionId
    }
  });

  if ((!hasStripe() && isBypassCheckoutEnabled) || sessionId.startsWith("dev_bypass_")) {
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

  const stripe = getStripeServer();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const planId = session.metadata?.planId ?? purchase?.planId ?? "";
  const plan = getPlanById(planId);
  const email =
    session.customer_details?.email ?? session.customer_email ?? purchase?.email;

  if (!email || session.payment_status !== "paid") {
    return NextResponse.json(
      { error: "Payment has not been verified yet." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    email,
    amount: Number(session.amount_total ?? purchase?.amount ?? 0),
    currency: (session.currency ?? purchase?.currency ?? "usd").toLowerCase(),
    planName: plan?.name ?? "Roop Veda Plan"
  });
}
