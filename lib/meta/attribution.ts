import type { AttributionData } from "@/lib/meta/types";
import type { QuizAnalysis } from "@/lib/quiz/analysis";

export const ATTRIBUTION_STORAGE_KEY = "rv_attribution";
export const ACTIVE_LEAD_STORAGE_KEY = "rv_active_lead";
export const QUIZ_ANSWERS_STORAGE_KEY = "rv_quiz_answers";
export const QUIZ_ANALYSIS_STORAGE_KEY = "rv_quiz_analysis";

function parseCookie(cookieName: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${cookieName}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

export function readAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AttributionData;
  } catch {
    return null;
  }
}

export function persistAttribution(
  pathname: string,
  searchParams: URLSearchParams
) {
  if (typeof window === "undefined") {
    return null;
  }

  const existing = readAttribution();
  const source =
    existing?.source ??
    (pathname === "/" ? "seo" : pathname.startsWith("/quiz") ? "ads" : "seo");
  const fbclid = searchParams.get("fbclid");
  const fbc =
    fbclid ?? existing?.fbclid
      ? `fb.1.${Date.now()}.${fbclid ?? existing?.fbclid}`
      : existing?.fbc;
  const fbp = parseCookie("_fbp") ?? existing?.fbp ?? undefined;

  const nextAttribution: AttributionData = {
    source,
    utmSource: searchParams.get("utm_source") ?? existing?.utmSource,
    utmMedium: searchParams.get("utm_medium") ?? existing?.utmMedium,
    utmCampaign: searchParams.get("utm_campaign") ?? existing?.utmCampaign,
    fbclid: fbclid ?? existing?.fbclid,
    fbc,
    fbp
  };

  window.localStorage.setItem(
    ATTRIBUTION_STORAGE_KEY,
    JSON.stringify(nextAttribution)
  );
  document.cookie = `rv_attribution=${encodeURIComponent(
    JSON.stringify(nextAttribution)
  )}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;

  return nextAttribution;
}

export function setActiveLead(payload: { leadId: string; email: string }) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACTIVE_LEAD_STORAGE_KEY, JSON.stringify(payload));
}

export function getActiveLead() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(ACTIVE_LEAD_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as { leadId: string; email: string };
  } catch {
    return null;
  }
}

export function setQuizAnalysis(payload: QuizAnalysis) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(QUIZ_ANALYSIS_STORAGE_KEY, JSON.stringify(payload));
}

export function readQuizAnalysis() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(QUIZ_ANALYSIS_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as QuizAnalysis;
  } catch {
    return null;
  }
}
