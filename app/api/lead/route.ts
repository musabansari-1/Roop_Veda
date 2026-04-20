import { NextResponse } from "next/server";
import { z } from "zod";

import { sendLeadContinueEmail } from "@/lib/email/service";
import { createLead } from "@/lib/db";
import { getRequestContext, sendMetaCapiEvent } from "@/lib/meta/server";

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

const leadSchema = z.object({
  email: z.string().email(),
  quizAnswers: z.record(z.string(), z.string()),
  eventId: z.string().min(1),
  eventSourceUrl: z.string().url(),
  attribution: attributionSchema
});

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Use POST to capture quiz leads."
  });
}

function logSideEffectFailure(
  channel: "email" | "meta",
  leadId: string,
  error: unknown
) {
  console.error(`[lead] ${channel} side effect failed`, {
    leadId,
    error
  });
}

export async function POST(request: Request) {
  try {
    const body = leadSchema.parse(await request.json());
    const requestContext = getRequestContext(request);
    const normalizedEmail = body.email.toLowerCase();

    const lead = await createLead({
      email: normalizedEmail,
      quizAnswers: body.quizAnswers,
      source: body.attribution?.source ?? "seo",
      ipAddress: requestContext.ipAddress ?? null,
      userAgent: requestContext.userAgent ?? null,
      utmSource: body.attribution?.utmSource ?? null,
      utmMedium: body.attribution?.utmMedium ?? null,
      utmCampaign: body.attribution?.utmCampaign ?? null,
      fbclid: body.attribution?.fbclid ?? null,
      fbc: body.attribution?.fbc ?? null,
      fbp: body.attribution?.fbp ?? null,
      pageUrl: body.eventSourceUrl
    });

    const sideEffects = await Promise.allSettled([
      sendLeadContinueEmail(normalizedEmail, lead.id),
      sendMetaCapiEvent(
        {
          eventName: "Lead",
          eventId: body.eventId,
          eventSourceUrl: body.eventSourceUrl,
          email: normalizedEmail,
          attribution: body.attribution,
          customData: {
            source: body.attribution?.source
          }
        },
        request
      )
    ]);

    sideEffects.forEach((result, index) => {
      if (result.status === "fulfilled") {
        return;
      }

      logSideEffectFailure(index === 0 ? "email" : "meta", lead.id, result.reason);
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id
    });
  } catch (error) {
    console.error("[lead] capture failed", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid lead payload.",
          issues: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Unable to capture lead." },
      { status: 500 }
    );
  }
}
