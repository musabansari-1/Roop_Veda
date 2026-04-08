import { NextResponse } from "next/server";
import { z } from "zod";

import {
  canUseTemporaryManualAccess,
  env,
  isBypassCheckoutEnabled,
  isTemporaryManualAccessEnabled
} from "@/lib/env";
import { sendMetaCapiEvent } from "@/lib/meta/server";
import { prisma } from "@/lib/prisma/client";
import { getPlanById } from "@/lib/stripe/plans";
import { getStripeServer, hasStripe } from "@/lib/stripe/server";
import { getBaseUrl } from "@/lib/utils";

const attributionSchema = z
  .object({
    source: z.enum(["seo", "ads"]),
    utmSource: z.string().nullable().optional(),
    utmMedium: z.string().nullable().optional(),
    utmCampaign: z.string().nullable().optional(),
    fbclid: z.string().nullable().optional(),
    fbc: z.string().nullable().optional(),
    fbp: z.string().nullable().optional()
  })
  .optional();

const checkoutSchema = z.object({
  leadId: z.string().min(1),
  planId: z.string().min(1),
  eventId: z.string().min(1),
  eventSourceUrl: z.string().url(),
  attribution: attributionSchema
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = checkoutSchema.parse(await request.json());
    const lead = await prisma.lead.findUnique({
      where: {
        id: body.leadId
      }
    });
    const plan = getPlanById(body.planId);

    if (!lead || !plan) {
      return NextResponse.json(
        { error: "Lead or plan could not be found." },
        { status: 404 }
      );
    }

    const canBypassCheckout =
      isBypassCheckoutEnabled || canUseTemporaryManualAccess(lead.email);

    if (!hasStripe() && !canBypassCheckout) {
      return NextResponse.json(
        {
          error: isTemporaryManualAccessEnabled
            ? "Payment is not configured yet and this email has not been approved for temporary manual access."
            : "Stripe is not configured."
        },
        { status: 503 }
      );
    }

    let sessionId: string;
    let checkoutUrl: string;
    let purchaseStatus = "checkout_started";
    let purchaseSource = lead.source;

    if (hasStripe()) {
      const stripe = getStripeServer();
      const successUrl = `${getBaseUrl()}/setup?session_id={CHECKOUT_SESSION_ID}&purchase_event_id=${body.eventId}`;
      const cancelUrl = `${getBaseUrl()}/plans?leadId=${lead.id}`;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        allow_promotion_codes: true,
        customer_email: lead.email,
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: plan.currency,
              unit_amount: plan.amount,
              product_data: {
                name: plan.name,
                description: plan.description
              }
            }
          }
        ],
        metadata: {
          leadId: lead.id,
          planId: plan.id,
          source: lead.source,
          purchaseEventId: body.eventId
        }
      });

      sessionId = session.id;
      checkoutUrl = session.url ?? `${getBaseUrl()}/plans?leadId=${lead.id}`;
    } else {
      sessionId = isBypassCheckoutEnabled
        ? `dev_bypass_${body.eventId}`
        : `manual_access_${body.eventId}`;
      checkoutUrl = `${getBaseUrl()}/setup?session_id=${sessionId}&purchase_event_id=${body.eventId}`;
      purchaseStatus = "paid";
      purchaseSource = isBypassCheckoutEnabled ? lead.source : "manual_access";
    }

    await prisma.purchase.upsert({
      where: {
        stripeSessionId: sessionId
      },
      update: {
        email: lead.email,
        status: purchaseStatus,
        leadId: lead.id,
        planId: plan.id,
        amount: plan.amount,
        currency: plan.currency,
        source: purchaseSource,
        purchaseEventId: body.eventId
      },
      create: {
        leadId: lead.id,
        email: lead.email,
        stripeSessionId: sessionId,
        status: purchaseStatus,
        planId: plan.id,
        amount: plan.amount,
        currency: plan.currency,
        source: purchaseSource,
        purchaseEventId: body.eventId
      }
    });

    await sendMetaCapiEvent(
      {
        eventName: "InitiateCheckout",
        eventId: body.eventId,
        eventSourceUrl: body.eventSourceUrl,
        email: lead.email,
        attribution: body.attribution ?? {
          source: lead.source === "ads" ? "ads" : "seo",
          fbclid: lead.fbclid,
          fbc: lead.fbc,
          fbp: lead.fbp
        },
        customData: {
          value: hasStripe() ? plan.amount / 100 : 0,
          currency: (hasStripe()
            ? plan.currency
            : env.NEXT_PUBLIC_DEFAULT_CURRENCY
          ).toUpperCase(),
          source: purchaseSource
        }
      },
      request,
      {
        ipAddress: lead.ipAddress,
        userAgent: lead.userAgent
      }
    );

    return NextResponse.json({
      url: checkoutUrl
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 400 }
    );
  }
}
