import { NextResponse } from "next/server";
import { z } from "zod";

import { sendMetaCapiEvent } from "@/lib/meta/server";

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

const metaTrackSchema = z.object({
  eventName: z.enum([
    "PageView",
    "ViewContent",
    "Lead",
    "InitiateCheckout",
    "Purchase"
  ]),
  eventId: z.string().min(1),
  eventSourceUrl: z.string().url(),
  email: z.string().email().optional(),
  attribution: attributionSchema,
  customData: z
    .object({
      value: z.number().optional(),
      currency: z.string().optional(),
      source: z.string().optional()
    })
    .optional()
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = metaTrackSchema.parse(await request.json());
    await sendMetaCapiEvent(body, request);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to forward Meta event." },
      { status: 400 }
    );
  }
}
