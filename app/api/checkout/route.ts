import { NextResponse } from "next/server";
import { z } from "zod";

import {
  canUseTemporaryManualAccess,
  isBypassCheckoutEnabled,
  isTemporaryManualAccessEnabled
} from "@/lib/env";
import { findLeadById, upsertPurchaseBySessionId } from "@/lib/db";
import { sendMetaCapiEvent } from "@/lib/meta/server";
import { getPlanById } from "@/lib/payments/plans";
import { getBaseUrl } from "@/lib/utils";
import { hasZaakpay } from "@/lib/zaakpay/server";

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

function createZaakpayOrderId(planId: string, eventId: string) {
  const normalizedPlanId = planId.replace(/[^a-z0-9]/gi, "").slice(0, 12);
  const normalizedEventId = eventId.replace(/[^a-z0-9]/gi, "");

  return `${normalizedPlanId}${normalizedEventId}`.slice(0, 40);
}

export async function POST(request: Request) {
  try {
    const body = checkoutSchema.parse(await request.json());
    const lead = await findLeadById(body.leadId);
    const plan = getPlanById(body.planId);

    if (!lead || !plan) {
      return NextResponse.json(
        { error: "Lead or plan could not be found." },
        { status: 404 }
      );
    }

    const canBypassCheckout =
      isBypassCheckoutEnabled || canUseTemporaryManualAccess(lead.email);

    if (!hasZaakpay() && !canBypassCheckout) {
      return NextResponse.json(
        {
          error: isTemporaryManualAccessEnabled
            ? "Payment is not configured yet and this email has not been approved for temporary manual access."
            : "Zaakpay is not configured."
        },
        { status: 503 }
      );
    }

    let sessionId: string;
    let checkoutUrl: string;
    let purchaseStatus = "checkout_started";
    let purchaseSource = lead.source;

    if (hasZaakpay()) {
      const baseUrl = getBaseUrl(request);
      sessionId = createZaakpayOrderId(plan.id, body.eventId);
      checkoutUrl = `${baseUrl}/api/zaakpay/redirect?sessionId=${encodeURIComponent(sessionId)}`;
    } else {
      const baseUrl = getBaseUrl(request);
      sessionId = isBypassCheckoutEnabled
        ? `dev_bypass_${body.eventId}`
        : `manual_access_${body.eventId}`;
      checkoutUrl = `${baseUrl}/setup?session_id=${sessionId}&purchase_event_id=${body.eventId}`;
      purchaseStatus = "paid";
      purchaseSource = isBypassCheckoutEnabled ? lead.source : "manual_access";
    }

    await upsertPurchaseBySessionId({
      leadId: lead.id,
      email: lead.email,
      paymentSessionId: sessionId,
      status: purchaseStatus,
      planId: plan.id,
      amount: plan.amount,
      currency: plan.currency,
      source: purchaseSource,
      purchaseEventId: body.eventId
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
          value: hasZaakpay() ? plan.amount / 100 : 0,
          currency: plan.currency.toUpperCase(),
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
