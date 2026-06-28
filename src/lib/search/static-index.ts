import { SearchResult } from "./types";
import { ARCHITECTURE_DECISIONS, ENGINEERING_PATTERNS } from "@/lib/knowledge/catalog";

export const STATIC_SEARCH_INDEX: SearchResult[] = [
  {
    id: "technology.kotlin",
    title: "Kotlin",
    url: "/blog/",
    excerpt: "Modern, concise, and safe programming language. The official language for native Android development.",
    category: "Languages",
    type: "TECHNOLOGY",
    score: 0
  },
  {
    id: "technology.compose",
    title: "Jetpack Compose",
    url: "/blog/",
    excerpt: "Android's modern declarative UI toolkit for building native user interfaces efficiently.",
    category: "UI Frameworks",
    type: "TECHNOLOGY",
    score: 0
  },
  {
    id: "technology.ktor",
    title: "Ktor",
    url: "/blog/",
    excerpt: "Asynchronous HTTP client and server framework built in Kotlin using Coroutines.",
    category: "Networking",
    type: "TECHNOLOGY",
    score: 0
  },
  {
    id: "technology.hilt",
    title: "Dagger Hilt",
    url: "/blog/",
    excerpt: "Dependency injection library for Android that reduces the boilerplate of Dagger in projects.",
    category: "Architecture Utilities",
    type: "TECHNOLOGY",
    score: 0
  },
  {
    id: "technology.coroutines",
    title: "Kotlin Coroutines & Flow",
    url: "/blog/",
    excerpt: "Asynchronous and non-blocking concurrency libraries for running tasks efficiently on Android.",
    category: "Concurrency",
    type: "TECHNOLOGY",
    score: 0
  },
  {
    id: "technology.accessibility",
    title: "Android Accessibility Service",
    url: "/blog/",
    excerpt: "System-level background utility API enabling developers to intercept user interactions and scan screens.",
    category: "Android OS APIs",
    type: "TECHNOLOGY",
    score: 0
  },
  {
    id: "technology.gradle",
    title: "Gradle & Build Automation",
    url: "/blog/",
    excerpt: "High-performance build automation tool specialized in managing complex multi-module Android build flavors.",
    category: "Build Tools",
    type: "TECHNOLOGY",
    score: 0
  },
  {
    id: "project.taxi-alwatani",
    title: "Taxi Alwatani",
    url: "/case-studies/taxi-alwatani/",
    excerpt: "Iraq's Primary Ride-Hailing Platform - Android Team Lead (Almyaar)",
    category: "Case Studies",
    type: "PROJECT",
    score: 0
  },
  {
    id: "project.schoolie",
    title: "Schoolie",
    url: "/case-studies/schoolie/",
    excerpt: "White-Label Educational Platform - Android Team Lead (SAGA)",
    category: "Case Studies",
    type: "PROJECT",
    score: 0
  },
  {
    id: "project.rafiqy",
    title: "Rafiqy",
    url: "/case-studies/rafiqy/",
    excerpt: "Personal Companion & App Blocker Utility - Solo Creator & Lead Developer",
    category: "Case Studies",
    type: "PROJECT",
    score: 0
  },
  {
    id: "article.mostaqeem-blocking-service-architecture",
    title: "Deep Dive: Architecting a Low-Latency Foreground App Blocker",
    url: "/blog/mostaqeem-blocking-service-architecture/",
    excerpt: "An architectural review of background foreground polling, session lifecycle tracking, and custom overlay interception on Android.",
    category: "Android",
    type: "ARTICLE",
    score: 0
  },
  {
    id: "article.schoolie-white-label-gradle-automation",
    title: "Schoolie White-Label Architecture: 18 Variants From One Registry",
    url: "/blog/schoolie-white-label-gradle-automation/",
    excerpt: "How clients.json generates Gradle flavors while runtime configuration resolves branding, themes, and feature policy.",
    category: "DevOps",
    type: "ARTICLE",
    score: 0
  },
  {
    id: "article.taxi-alwatani-clean-architecture-refactor",
    title: "Taxi Alwatani: Coordinating Ktor, Firestore, and Ride State",
    url: "/blog/taxi-alwatani-clean-architecture-refactor/",
    excerpt: "A source-level walkthrough of trip creation, competing dispatch signals, and active ride state in the passenger app.",
    category: "Architecture",
    type: "ARTICLE",
    score: 0
  },
  {
    id: "article.taxi-captain-realtime-tracking-websockets",
    title: "Taxi Captain: Foreground Dispatch With Firestore, Room, and Ktor",
    url: "/blog/taxi-captain-realtime-tracking-websockets/",
    excerpt: "How driver assignment, trip caches, HTTP location uploads, and background overlays cooperate without WebSockets.",
    category: "Networking",
    type: "ARTICLE",
    score: 0
  },
  {
    id: "article.studentway-parent-offline-first-booking",
    title: "StudentWay: Shared Caches, Optimistic Messages, and Live Tracking",
    url: "/blog/studentway-parent-offline-first-booking/",
    excerpt: "A verified look at session-scoped student caching, Room Paging, Pusher message events, and Firebase trip tracking.",
    category: "Database",
    type: "ARTICLE",
    score: 0
  },
  {
    id: "page.patterns",
    title: "Architecture Pattern Catalog & ADRs",
    url: "/patterns/",
    excerpt: "Source-verified engineering patterns and decision records extracted across five Android codebases.",
    category: "Knowledge Platform",
    type: "PAGE",
    score: 0
  },
  ...ENGINEERING_PATTERNS.map((pattern): SearchResult => ({
    id: `pattern.${pattern.id}`,
    title: pattern.title,
    url: `/patterns/#${pattern.id}`,
    excerpt: pattern.summary,
    category: "Engineering Patterns",
    type: "PATTERN",
    score: 0
  })),
  ...ARCHITECTURE_DECISIONS.map((adr): SearchResult => ({
    id: `adr.${adr.id}`,
    title: `${adr.number}: ${adr.title}`,
    url: `/patterns/#${adr.id}`,
    excerpt: adr.decision,
    category: "Architecture Decisions",
    type: "ADR",
    score: 0
  }))
];
export const defaultWeights = {
  title: 100,
  slug: 80,
  tech: 60,
  tags: 40,
  description: 30,
  body: 10
};
export function rankStaticIndex(query: string): SearchResult[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  return STATIC_SEARCH_INDEX.map(item => {
    let score = 0;
    const title = item.title.toLowerCase();
    const desc = item.excerpt.toLowerCase();

    if (title === cleanQuery) {
      score += defaultWeights.title;
    } else if (title.includes(cleanQuery)) {
      score += defaultWeights.title * 0.5;
    }

    if (desc.includes(cleanQuery)) {
      score += defaultWeights.description;
    }

    if (item.category.toLowerCase().includes(cleanQuery)) {
      score += defaultWeights.tech;
    }

    return {
      ...item,
      score
    };
  })
  .filter(res => res.score > 0)
  .sort((a, b) => b.score - a.score);
}
