"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// GA4 is env-gated: renders nothing unless NEXT_PUBLIC_GA4_ID is set, so it is
// safe to ship and activate later by adding the ID to env.
//
// Initial page_view is sent by gtag('config') itself once the script loads.
// The effect below handles client-side route changes only (App Router
// navigations don't reload, so config never re-fires) — it skips the first
// run to avoid double-counting the initial view. By the time a user
// navigates, the gtag script has long since loaded.
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA4_ID;
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!id || typeof (window as any).gtag === "undefined") return;
    (window as any).gtag("event", "page_view", { page_path: pathname });
  }, [pathname, id]);

  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
