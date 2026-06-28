import type { AnalyticsProvider } from "../index";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Google Analytics 4 provider.
 * Wraps existing gtag calls — no direct component imports of gtag needed.
 */
export const ga4Provider: AnalyticsProvider = {
  track(event, properties) {
    if (typeof window === "undefined") return;
    window.gtag?.("event", event, properties);
  },
  pageView(url) {
    if (typeof window === "undefined") return;
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;
    window.gtag?.("config", gaId, {
      page_path: url,
      send_page_view: true,
    });
  },
};
