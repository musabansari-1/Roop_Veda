import { randomUUID } from "node:crypto";

import { sendPaymentConfirmationEmail } from "@/lib/email/service";
import {
  findLeadById,
  findUserByEmail,
  updateUser,
  upsertPurchaseBySessionId
} from "@/lib/db";
import { env } from "@/lib/env";
import { sendMetaCapiEvent } from "@/lib/meta/server";
import { getPlanById } from "@/lib/payments/plans";
import { absoluteUrl } from "@/lib/utils";

function logPurchaseSideEffectFailure(
  channel: "email" | "meta",
  sessionId: string,
  error: unknown
) {
  console.error(`[purchase] ${channel} side effect failed`, {
    sessionId,
    error
  });
}

export async function completePaidPurchase(
  input: {
    sessionId: string;
    email: string;
    planId?: string;
    purchaseEventId?: string;
    leadId?: string;
    source?: string;
    amount: number;
    currency?: string;
  },
  request: Request
) {
  const email = input.email.toLowerCase();
  const planId = input.planId ?? "signature-ritual";
  const purchaseEventId = input.purchaseEventId ?? randomUUID();
  const leadId = input.leadId;
  const source = input.source ?? "seo";
  const currency = (input.currency ?? env.NEXT_PUBLIC_DEFAULT_CURRENCY).toLowerCase();
  const plan = getPlanById(planId);
  const user = await findUserByEmail(email);
  const lead = leadId ? await findLeadById(leadId) : null;

  if (user && !user.isPaid) {
    await updateUser({
      id: user.id,
      isPaid: true
    });
  }

  await upsertPurchaseBySessionId({
    userId: user?.id,
    leadId,
    email,
    paymentSessionId: input.sessionId,
    status: "paid",
    planId,
    amount: input.amount,
    currency,
    source,
    purchaseEventId
  });

  const sideEffects = await Promise.allSettled([
    sendPaymentConfirmationEmail(email, plan?.name ?? "Roop Veda Plan"),
    sendMetaCapiEvent(
      {
        eventName: "Purchase",
        eventId: purchaseEventId,
        eventSourceUrl: absoluteUrl(
          `/setup?session_id=${input.sessionId}&purchase_event_id=${purchaseEventId}`
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
          value: input.amount / 100,
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

    logPurchaseSideEffectFailure(
      index === 0 ? "email" : "meta",
      input.sessionId,
      result.reason
    );
  });

  return {
    purchaseEventId
  };
}
