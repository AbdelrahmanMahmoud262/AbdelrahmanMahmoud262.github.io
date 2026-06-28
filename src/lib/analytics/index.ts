import type { AnalyticsEventKey } from "./events";

/** Every analytics provider must implement this interface */
export interface AnalyticsProvider {
  track(event: AnalyticsEventKey | string, properties?: Record<string, unknown>): void;
  pageView(url: string, title?: string): void;
}

const providers: AnalyticsProvider[] = [];

/**
 * Analytics — universal abstraction over all analytics providers.
 *
 * Business events are fired once here; providers receive them internally.
 * No component should import PostHog, GA4, or any provider directly.
 *
 * Usage:
 *   Analytics.track(AnalyticsEvent.ResumeDownloaded)
 *   Analytics.track(AnalyticsEvent.CaseStudyViewed, { slug: 'taxi-alwatani' })
 */
export const Analytics = {
  /**
   * Register a provider. Called once during app initialization.
   * Providers are registered in AnalyticsProvider.tsx.
   */
  addProvider(provider: AnalyticsProvider): void {
    providers.push(provider);
  },

  /**
   * Track a named business event with optional properties.
   */
  track(event: AnalyticsEventKey | string, properties?: Record<string, unknown>): void {
    if (typeof window === "undefined") return;
    providers.forEach((p) => {
      try {
        p.track(event, properties);
      } catch {
        // Silently fail — analytics must never break user experience
      }
    });
  },

  /**
   * Track a page view.
   */
  pageView(url: string, title?: string): void {
    if (typeof window === "undefined") return;
    providers.forEach((p) => {
      try {
        p.pageView(url, title);
      } catch {
        // Silently fail
      }
    });
  },
};
