import { NextResponse } from "next/server";
import { z } from "zod";

import { sendLeadContinueEmail } from "@/lib/email/service";
import { getRequestContext, sendMetaCapiEvent } from "@/lib/meta/server";
import { prisma } from "@/lib/prisma/client";

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

export async function POST(request: Request) {
  try {
    const body = leadSchema.parse(await request.json());
    const requestContext = getRequestContext(request);
    const normalizedEmail = body.email.toLowerCase();

    const lead = await prisma.lead.create({
      data: {
        email: normalizedEmail,
        quizAnswers: JSON.stringify(body.quizAnswers),
        source: body.attribution?.source ?? "seo",
        ipAddress: requestContext.ipAddress,
        userAgent: requestContext.userAgent,
        utmSource: body.attribution?.utmSource,
        utmMedium: body.attribution?.utmMedium,
        utmCampaign: body.attribution?.utmCampaign,
        fbclid: body.attribution?.fbclid,
        fbc: body.attribution?.fbc,
        fbp: body.attribution?.fbp,
        pageUrl: body.eventSourceUrl
      }
    });

    await Promise.all([
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

    return NextResponse.json({
      success: true,
      leadId: lead.id
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to capture lead." },
      { status: 400 }
    );
  }
}
