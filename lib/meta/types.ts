export type AttributionData = {
  source: "seo" | "ads";
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  fbclid?: string | null;
  fbc?: string | null;
  fbp?: string | null;
};

export type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "InitiateCheckout"
  | "Purchase";

export type MetaTrackPayload = {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  attribution?: AttributionData;
  customData?: {
    value?: number;
    currency?: string;
    source?: string;
  };
};
