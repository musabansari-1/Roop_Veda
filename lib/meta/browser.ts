"use client";

import type { MetaEventName, MetaTrackPayload } from "@/lib/meta/types";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function createEventId() {
  return crypto.randomUUID();
}

export function trackBrowserMetaEvent(
  eventName: MetaEventName,
  eventId: string,
  customData?: Record<string, unknown>
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  if (eventName === "PageView") {
    window.fbq("track", "PageView", undefined, { eventID: eventId });
    return;
  }

  window.fbq("track", eventName, customData ?? {}, { eventID: eventId });
}

export async function trackServerMetaEvent(payload: MetaTrackPayload) {
  await fetch("/api/meta/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}
