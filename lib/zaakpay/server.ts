import { createHmac } from "node:crypto";

import { env, requireEnv } from "@/lib/env";

const REQUEST_CHECKSUM_EXCLUDED_KEYS = new Set(["checksum"]);
const RESPONSE_CHECKSUM_ORDER = [
  "amount",
  "bank",
  "bankid",
  "cardId",
  "cardScheme",
  "cardToken",
  "cardhashid",
  "doRedirect",
  "orderId",
  "paymentMethod",
  "paymentMode",
  "responseCode",
  "responseDescription",
  "productDescription",
  "product1Description",
  "product2Description",
  "product3Description",
  "product4Description",
  "pgTransId",
  "pgTransTime"
] as const;

export type ZaakpayRequestPayload = Record<string, string>;
export type ZaakpayResponsePayload = Record<string, string>;

function isPresent(value: string | null | undefined) {
  return value !== undefined && value !== null && value !== "";
}

function buildChecksumString(
  payload: Record<string, string>,
  orderedKeys: readonly string[]
) {
  return orderedKeys
    .filter((key) => isPresent(payload[key]))
    .map((key) => `${key}=${payload[key]}&`)
    .join("");
}

export function generateZaakpayRequestChecksum(payload: ZaakpayRequestPayload) {
  const orderedKeys = Object.keys(payload)
    .filter((key) => !REQUEST_CHECKSUM_EXCLUDED_KEYS.has(key) && isPresent(payload[key]))
    .sort((left, right) => left.localeCompare(right));

  return createHmac("sha256", requireEnv("ZAAKPAY_SECRET_KEY"))
    .update(buildChecksumString(payload, orderedKeys))
    .digest("hex");
}

export function verifyZaakpayResponseChecksum(payload: ZaakpayResponsePayload) {
  const checksum = payload.checksum;

  if (!checksum) {
    return false;
  }

  const expectedChecksum = createHmac("sha256", requireEnv("ZAAKPAY_SECRET_KEY"))
    .update(buildChecksumString(payload, RESPONSE_CHECKSUM_ORDER))
    .digest("hex");

  return checksum.toLowerCase() === expectedChecksum.toLowerCase();
}

export function getZaakpayTransactUrl() {
  const baseUrl =
    env.ZAAKPAY_ENVIRONMENT === "live"
      ? "https://api.zaakpay.com"
      : "https://zaakstaging.zaakpay.com";

  return `${baseUrl}/api/paymentTransact/V8`;
}

export function hasZaakpay() {
  return Boolean(env.ZAAKPAY_MERCHANT_IDENTIFIER && env.ZAAKPAY_SECRET_KEY);
}
