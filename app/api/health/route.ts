import { NextResponse } from "next/server";

import { ensureDatabaseSchema } from "@/lib/db";
import {
  getTemporaryManualAccessEmails,
  env,
  isBypassCheckoutEnabled,
  isProduction,
  isTemporaryManualAccessEnabled
} from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let databaseOk = false;
  let databaseError: string | undefined;

  try {
    await ensureDatabaseSchema();
    databaseOk = true;
  } catch (error) {
    databaseError = error instanceof Error ? error.message : "Unknown database error";
  }

  const hasExplicitGcsCredentials = Boolean(
    env.GCP_PROJECT_ID && env.GCP_CLIENT_EMAIL && env.GCP_PRIVATE_KEY
  );

  return NextResponse.json({
    app: "roop-veda-funnel",
    environment: isProduction ? "production" : "development",
    integrations: {
      database: databaseOk,
      zaakpay: Boolean(env.ZAAKPAY_MERCHANT_IDENTIFIER && env.ZAAKPAY_SECRET_KEY),
      resend: Boolean(env.RESEND_API_KEY),
      metaPixel: Boolean(env.NEXT_PUBLIC_META_PIXEL_ID),
      metaCapi: Boolean(env.NEXT_PUBLIC_META_PIXEL_ID && env.META_ACCESS_TOKEN),
      gcs: Boolean(env.GCS_BUCKET_NAME)
    },
    runtime: {
      gcsAuthMode: hasExplicitGcsCredentials ? "explicit_key" : "cloud_run_iam"
    },
    development: {
      bypassCheckout: isBypassCheckoutEnabled
    },
    productionFallback: {
      temporaryManualAccessEnabled: isTemporaryManualAccessEnabled,
      approvedEmailCount: isTemporaryManualAccessEnabled
        ? getTemporaryManualAccessEmails().length
        : 0
    },
    errors: {
      database: databaseError
    }
  });
}
