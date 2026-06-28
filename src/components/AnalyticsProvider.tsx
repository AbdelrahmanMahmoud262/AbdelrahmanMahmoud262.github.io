"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@/lib/analytics";
import { ga4Provider } from "@/lib/analytics/providers/ga4";
import { posthogProvider } from "@/lib/analytics/providers/posthog";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * AnalyticsProvider — replaces GoogleAnalytics.tsx.
 * - Registers all analytics providers once
 * - Tracks client-side route changes via usePathname
 * - Injects GA4 script tags
 */
export default function AnalyticsProvider() {
  const pathname = usePathname();

  // Register providers once on mount
  useEffect(() => {
    Analytics.addProvider(ga4Provider);
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      Analytics.addProvider(posthogProvider);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    const url = pathname ?? "/";
    Analytics.pageView(url, document.title);
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: false,
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}
