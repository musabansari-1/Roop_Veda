import { NextResponse } from "next/server";

import { env, isBypassCheckoutEnabled, isProduction } from "@/lib/env";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    app: "roop-veda-funnel",
    environment: isProduction ? "production" : "development",
    integrations: {
      stripe: Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET),
      resend: Boolean(env.RESEND_API_KEY),
      metaPixel: Boolean(env.NEXT_PUBLIC_META_PIXEL_ID),
      metaCapi: Boolean(env.NEXT_PUBLIC_META_PIXEL_ID && env.META_ACCESS_TOKEN),
      gcs: Boolean(
        env.GCS_BUCKET_NAME &&
          env.GCP_PROJECT_ID &&
          env.GCP_CLIENT_EMAIL &&
          env.GCP_PRIVATE_KEY
      )
    },
    development: {
      bypassCheckout: isBypassCheckoutEnabled
    }
  });
}
