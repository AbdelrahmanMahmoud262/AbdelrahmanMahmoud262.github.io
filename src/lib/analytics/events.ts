/**
 * Analytics event catalog — single source of truth for all trackable actions.
 * Import from here instead of using raw strings in components.
 */
export const AnalyticsEvent = {
  // ─── Content ───────────────────────────────────────────────────
  BlogArticleRead: "blog_article_read",
  BlogArticleCompleted: "blog_article_completed",
  CaseStudyViewed: "case_study_viewed",
  ServiceViewed: "service_viewed",

  // ─── Engagement ────────────────────────────────────────────────
  ResumeDownloaded: "resume_downloaded",
  ResumeViewed: "resume_viewed",
  ContactSubmitted: "contact_submitted",
  ContactFormStarted: "contact_form_started",

  // ─── External Navigation ────────────────────────────────────────
  GitHubProfileVisited: "github_profile_visited",
  LinkedInProfileVisited: "linkedin_profile_visited",
  ConsultationBooked: "consultation_booked",

  // ─── Search ────────────────────────────────────────────────────
  SiteSearchPerformed: "site_search_performed",
  SearchOpened: "search_opened",
  SearchQuery: "search_query",
  SearchNoResults: "search_no_results",
  SearchResultClicked: "search_result_clicked",
} as const;

export type AnalyticsEventKey =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];
