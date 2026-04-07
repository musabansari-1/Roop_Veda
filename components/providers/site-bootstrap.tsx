"use client";
/* eslint-disable @next/next/no-img-element */

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { persistAttribution } from "@/lib/meta/attribution";
import {
  createEventId,
  trackBrowserMetaEvent,
  trackServerMetaEvent
} from "@/lib/meta/browser";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function SiteBootstrap() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const attribution = persistAttribution(pathname, params);
    const eventId = createEventId();
    const eventSourceUrl = window.location.href;

    trackBrowserMetaEvent("PageView", eventId);
    void trackServerMetaEvent({
      eventName: "PageView",
      eventId,
      eventSourceUrl,
      attribution: attribution ?? undefined,
      customData: {
        source: attribution?.source
      }
    });
  }, [pathname]);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
        `}
      </Script>
      <noscript>
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
