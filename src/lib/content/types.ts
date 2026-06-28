/**
 * Content type definitions for blog posts and case studies.
 * These types are the schema contract between content files and page components.
 */

export interface Author {
  name: string;
  role: string;
  url: string;
}

export interface SEOMeta {
  keywords?: string[];
  ogImage?: string;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  lastModified: string;
  category: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
  author: Author;
  relatedArticles?: string[];
  relatedProjects?: string[];
  seo?: SEOMeta;
  experienceLevel?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  version?: string;
  references?: Array<{ title: string; url: string; type: "docs" | "paper" | "github" | "rfc" | "android" | "other" }>;
  technologies?: string[];
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  /** Raw MDX string — passed to MDXRemote for rendering */
  content: string;
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyFrontmatter {
  title: string;
  subtitle: string;
  tagline: string;
  role: string;
  company: string;
  period: string;
  teamSize?: number;
  technologies: string[];
  metrics: CaseStudyMetric[];
  seo?: SEOMeta;
}

export interface CaseStudy extends CaseStudyFrontmatter {
  slug: string;
  content: string;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
