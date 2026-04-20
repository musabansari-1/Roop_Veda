import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_PROVIDER: z.string().optional(),
  DATABASE_URL: z
    .string()
    .default("postgresql://postgres:postgres@127.0.0.1:5432/postgres"),
  DIRECT_URL: z.string().optional(),
  AUTH_JWT_SECRET: z
    .string()
    .min(24)
    .default("change-this-development-secret-before-production"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_BRAND_NAME: z.string().default("Roop Veda"),
  NEXT_PUBLIC_DEFAULT_CURRENCY: z.string().default("inr"),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  META_ACCESS_TOKEN: z.string().optional(),
  META_API_VERSION: z.string().default("v19.0"),
  META_TEST_EVENT_CODE: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  DEV_ENABLE_BYPASS_CHECKOUT: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  TEMP_MANUAL_ACCESS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  TEMP_MANUAL_ACCESS_EMAILS: z.string().default(""),
  RESEND_DEBUG_LOGGING: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().default("Roop Veda <onboarding@example.com>"),
  GCS_BUCKET_NAME: z.string().optional(),
  GCP_PROJECT_ID: z.string().optional(),
  GCP_CLIENT_EMAIL: z.string().optional(),
  GCP_PRIVATE_KEY: z.string().optional(),
  NEXT_PUBLIC_SUPPORT_WHATSAPP: z.string().optional()
});

export const env = serverEnvSchema.parse({
  DATABASE_PROVIDER: process.env.DATABASE_PROVIDER,
  DATABASE_URL:
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@127.0.0.1:5432/postgres",
  DIRECT_URL: process.env.DIRECT_URL,
  AUTH_JWT_SECRET:
    process.env.AUTH_JWT_SECRET ??
    "change-this-development-secret-before-production",
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  NEXT_PUBLIC_BRAND_NAME:
    process.env.NEXT_PUBLIC_BRAND_NAME ?? "Roop Veda",
  NEXT_PUBLIC_DEFAULT_CURRENCY:
    process.env.NEXT_PUBLIC_DEFAULT_CURRENCY ?? "usd",
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
  META_API_VERSION: process.env.META_API_VERSION ?? "v19.0",
  META_TEST_EVENT_CODE: process.env.META_TEST_EVENT_CODE,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  DEV_ENABLE_BYPASS_CHECKOUT:
    process.env.DEV_ENABLE_BYPASS_CHECKOUT ?? "false",
  TEMP_MANUAL_ACCESS_ENABLED:
    process.env.TEMP_MANUAL_ACCESS_ENABLED ?? "false",
  TEMP_MANUAL_ACCESS_EMAILS:
    process.env.TEMP_MANUAL_ACCESS_EMAILS ?? "",
  RESEND_DEBUG_LOGGING:
    process.env.RESEND_DEBUG_LOGGING ?? "false",
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL:
    process.env.RESEND_FROM_EMAIL ?? "Roop Veda <onboarding@example.com>",
  GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  GCP_CLIENT_EMAIL: process.env.GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY,
  NEXT_PUBLIC_SUPPORT_WHATSAPP: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP
});

export const isProduction = process.env.NODE_ENV === "production";
export const isBypassCheckoutEnabled =
  !isProduction && env.DEV_ENABLE_BYPASS_CHECKOUT;
export const isTemporaryManualAccessEnabled =
  isProduction && env.TEMP_MANUAL_ACCESS_ENABLED;

export function getTemporaryManualAccessEmails() {
  return env.TEMP_MANUAL_ACCESS_EMAILS.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function canUseTemporaryManualAccess(email: string) {
  if (!isTemporaryManualAccessEnabled) {
    return false;
  }

  return getTemporaryManualAccessEmails().includes(email.trim().toLowerCase());
}

type StringEnvKey = {
  [Key in keyof typeof env]: NonNullable<(typeof env)[Key]> extends string
    ? Key
    : never;
}[keyof typeof env];

export function requireEnv(name: StringEnvKey) {
  const value = (env as Record<string, unknown>)[name as string];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value as string;
}
