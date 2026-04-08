import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";
import Stripe from "stripe";

import { sendPaymentConfirmationEmail } from "@/lib/email/service";
import { env, requireEnv } from "@/lib/env";
import { sendMetaCapiEvent } from "@/lib/meta/server";
import { prisma } from "@/lib/prisma/client";
import { getPlanById } from "@/lib/stripe/plans";
import { getStripeServer } from "@/lib/stripe/server";
import { absoluteUrl } from "@/lib/utils";

function logWebhookSideEffectFailure(
  channel: "email" | "meta",
  sessionId: string,
  error: unknown
) {
  console.error(`[stripe-webhook] ${channel} side effect failed`, {
    sessionId,
    error
  });
}

async function handleCompletedSession(
  session: Stripe.Checkout.Session,
  request: Request
) {
  const email = (
    session.customer_details?.email ?? session.customer_email
  )?.toLowerCase();

  if (!email) {
    return;
  }

  const planId = session.metadata?.planId ?? "signature-ritual";
  const purchaseEventId = session.metadata?.purchaseEventId ?? randomUUID();
  const leadId = session.metadata?.leadId ?? undefined;
  const source = session.metadata?.source ?? "seo";
  const amount = Number(session.amount_total ?? 0);
  const currency = (session.currency ?? env.NEXT_PUBLIC_DEFAULT_CURRENCY).toLowerCase();
  const plan = getPlanById(planId);
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  const lead = leadId
    ? await prisma.lead.findUnique({
        where: {
          id: leadId
        }
      })
    : null;

  if (user && !user.isPaid) {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        isPaid: true
      }
    });
  }

  await prisma.purchase.upsert({
    where: {
      stripeSessionId: session.id
    },
    update: {
      userId: user?.id,
      leadId,
      email,
      status: "paid",
      planId,
      amount,
      currency,
      source,
      purchaseEventId
    },
    create: {
      userId: user?.id,
      leadId,
      email,
      stripeSessionId: session.id,
      status: "paid",
      planId,
      amount,
      currency,
      source,
      purchaseEventId
    }
  });

  const sideEffects = await Promise.allSettled([
    sendPaymentConfirmationEmail(email, plan?.name ?? "Roop Veda Plan"),
    sendMetaCapiEvent(
      {
        eventName: "Purchase",
        eventId: purchaseEventId,
        eventSourceUrl: absoluteUrl(
          `/setup?session_id=${session.id}&purchase_event_id=${purchaseEventId}`
        ),
        email,
        attribution: {
          source: source === "ads" ? "ads" : "seo",
          fbclid: lead?.fbclid,
          fbc: lead?.fbc,
          fbp: lead?.fbp,
          utmSource: lead?.utmSource,
          utmMedium: lead?.utmMedium,
          utmCampaign: lead?.utmCampaign
        },
        customData: {
          value: amount / 100,
          currency: currency.toUpperCase(),
          source
        }
      },
      request,
      {
        ipAddress: lead?.ipAddress,
        userAgent: lead?.userAgent
      }
    )
  ]);

  sideEffects.forEach((result, index) => {
    if (result.status === "fulfilled") {
      return;
    }

    logWebhookSideEffectFailure(
      index === 0 ? "email" : "meta",
      session.id,
      result.reason
    );
  });
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripeServer();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      requireEnv("STRIPE_WEBHOOK_SECRET")
    );

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await handleCompletedSession(
        event.data.object as Stripe.Checkout.Session,
        request
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Webhook verification failed." },
      { status: 400 }
    );
  }
}
