import type { AnalyticsProvider } from "../index";

/**
 * PostHog provider.
 * Initializes PostHog once and wraps its API into the Analytics abstraction.
 *
 * Required environment variables:
 *   NEXT_PUBLIC_POSTHOG_KEY   — your PostHog project API key
 *   NEXT_PUBLIC_POSTHOG_HOST  — defaults to https://app.posthog.com
 */

let posthogInstance: typeof import("posthog-js").default | null = null;

async function getPostHog() {
  if (posthogInstance) return posthogInstance;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || typeof window === "undefined") return null;

  const { default: posthog } = await import("posthog-js");
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
    capture_pageview: false, // We handle pageviews manually via Analytics.pageView()
    persistence: "localStorage",
  });
  posthogInstance = posthog;
  return posthog;
}

export const posthogProvider: AnalyticsProvider = {
  track(event, properties) {
    getPostHog().then((ph) => ph?.capture(event, properties));
  },
  pageView(url) {
    getPostHog().then((ph) =>
      ph?.capture("$pageview", { $current_url: url })
    );
  },
};
