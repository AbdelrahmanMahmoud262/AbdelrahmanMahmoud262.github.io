import { tokens } from "@/lib/tokens";
import type { BlogPost, BreadcrumbItem, FAQItem } from "@/lib/content/types";

const BASE_URL = tokens.site.url;

// ─── Person ───────────────────────────────────────────────────────────────────

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tokens.author.name,
    alternateName: tokens.author.shortName,
    url: BASE_URL,
    email: tokens.author.email,
    telephone: tokens.author.phone,
    jobTitle: tokens.author.jobTitle,
    description: tokens.author.description,
    image: `${BASE_URL}/og/home.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
      addressCountry: "EG",
    },
    sameAs: [tokens.author.linkedin, tokens.author.github],
    knowsAbout: [
      "Android Development",
      "Kotlin Programming",
      "Jetpack Compose",
      "Clean Architecture",
      "Mobile Software Architecture",
      "Coroutines and Flow",
      "Dependency Injection",
      "Multi-Module Android",
      "Real-Time Systems",
      "Android Accessibility Service",
      "White-Label Build Automation",
      "Engineering Team Leadership",
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Harvard University (CS50x)" },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "CS50 — Introduction to Computer Science",
        credentialCategory: "Certificate",
        recognizedBy: { "@type": "Organization", name: "Harvard University" },
        dateCreated: "2023",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Advanced Android Development",
        credentialCategory: "Certificate",
        recognizedBy: { "@type": "Organization", name: "Udacity" },
        dateCreated: "2021",
      },
    ],
  };
}

// ─── Organization (personal brand) ────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: tokens.site.name,
    url: BASE_URL,
    logo: `${BASE_URL}/og/home.png`,
    description: tokens.author.description,
    founder: {
      "@type": "Person",
      name: tokens.author.name,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: tokens.author.email,
      contactType: "technical support",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [tokens.author.linkedin, tokens.author.github],
  };
}

// ─── WebSite + SearchAction ────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: BASE_URL,
    name: `${tokens.site.name} — Portfolio`,
    description: `Professional portfolio of ${tokens.author.name}, ${tokens.author.jobTitle}`,
    author: {
      "@type": "Person",
      name: tokens.author.name,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── BlogPosting / Article ────────────────────────────────────────────────────

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}/og/blog-${post.slug}.png`,
    url: `${BASE_URL}/blog/${post.slug}/`,
    datePublished: post.date,
    dateModified: post.lastModified,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      "@type": "Person",
      name: tokens.author.name,
      url: BASE_URL,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}/`,
    },
  };
}

// ─── BreadcrumbList ────────────────────────────────────────────────────────────

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

// ─── SoftwareApplication (case studies) ────────────────────────────────────────

export function softwareApplicationSchema({
  name,
  description,
  url,
  operatingSystem = "Android",
  applicationCategory = "MobileApplication",
}: {
  name: string;
  description: string;
  url: string;
  operatingSystem?: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    operatingSystem,
    applicationCategory,
    author: {
      "@type": "Person",
      name: tokens.author.name,
      url: BASE_URL,
    },
  };
}

// ─── ProfilePage ──────────────────────────────────────────────────────────────

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: personSchema(),
    url: `${BASE_URL}/about/`,
    name: `About ${tokens.author.name}`,
    description: `Professional profile and biography of ${tokens.author.name}, ${tokens.author.jobTitle}`,
  };
}
