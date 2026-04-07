import crypto from "node:crypto";

import { headers } from "next/headers";

import { env } from "@/lib/env";
import type { MetaTrackPayload } from "@/lib/meta/types";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(email?: string) {
  if (!email) {
    return undefined;
  }

  return sha256(email.trim().toLowerCase());
}

export type RequestContext = {
  ipAddress?: string | null;
  userAgent?: string | null;
};

export function getRequestContext(request?: Request): RequestContext {
  if (request) {
    return {
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      userAgent: request.headers.get("user-agent")
    };
  }

  const headerList = headers();
  return {
    ipAddress: headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: headerList.get("user-agent")
  };
}

export async function sendMetaCapiEvent(
  payload: MetaTrackPayload,
  request?: Request,
  contextOverride?: RequestContext
) {
  if (!env.NEXT_PUBLIC_META_PIXEL_ID || !env.META_ACCESS_TOKEN) {
    return { skipped: true };
  }

  const baseContext = getRequestContext(request);
  const requestContext = {
    ipAddress: contextOverride?.ipAddress ?? baseContext.ipAddress,
    userAgent: contextOverride?.userAgent ?? baseContext.userAgent
  };
  const endpoint = `https://graph.facebook.com/${env.META_API_VERSION}/${env.NEXT_PUBLIC_META_PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`;

  const body = {
    data: [
      {
        event_name: payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        event_source_url: payload.eventSourceUrl,
        action_source: "website",
        user_data: {
          em: normalizeEmail(payload.email),
          client_ip_address: requestContext.ipAddress ?? undefined,
          client_user_agent: requestContext.userAgent ?? undefined,
          fbp: payload.attribution?.fbp ?? undefined,
          fbc: payload.attribution?.fbc ?? undefined
        },
        custom_data: {
          value: payload.customData?.value,
          currency: payload.customData?.currency,
          source:
            payload.customData?.source ?? payload.attribution?.source ?? "seo"
        }
      }
    ],
    test_event_code: env.META_TEST_EVENT_CODE || undefined
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Meta CAPI request failed", details);
  }

  return response;
}
