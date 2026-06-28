import { Entity } from "./types";

export const TOPICS: Entity[] = [
  {
    id: "topic.clean-architecture",
    type: "TOPIC",
    title: "Clean Architecture",
    slug: "clean-architecture",
    seo: {
      description: "Designing decupled, maintainable Android systems separated into Presentation, Domain, and Data layers.",
      keywords: ["Clean Architecture Android", "Domain Layer", "Repository pattern", "Multi-module dependency flow"]
    },
    presentation: {
      category: "Architecture Concepts",
      tags: ["Decoupling", "Modularization", "SOLID", "Dependency Inversion"],
      technologies: ["kotlin"]
    },
    relationships: []
  },
  {
    id: "topic.offline-first",
    type: "TOPIC",
    title: "Offline-First Data Sync",
    slug: "offline-first",
    seo: {
      description: "Architectural strategy of prioritizing local caching and on-device storage before running background network sync.",
      keywords: ["Offline-first Android", "Room database", "Repository cache", "Data synchronization"]
    },
    presentation: {
      category: "Data Systems",
      tags: ["Database Caching", "Data Synchronization", "Conflict Resolution", "Room"],
      technologies: ["kotlin", "room"]
    },
    relationships: []
  },
  {
    id: "topic.real-time",
    type: "TOPIC",
    title: "Real-Time Systems & WebSockets",
    slug: "real-time-websockets",
    seo: {
      description: "Managing live background location dispatch, tracking network states, and streaming events via WebSockets.",
      keywords: ["WebSockets Android", "Real-time dispatch", "Location tracking", "Kotlin Flow channels"]
    },
    presentation: {
      category: "Real-Time Interactivity",
      tags: ["WebSockets", "Data Streaming", "Active connection management", "Ktor Client"],
      technologies: ["ktor", "coroutines"]
    },
    relationships: []
  },
  {
    id: "topic.app-blocking",
    type: "TOPIC",
    title: "On-Device Interception & Blocking",
    slug: "on-device-blocking",
    seo: {
      description: "Building privacy-first utilities that evaluate active application states locally on the device using system services.",
      keywords: ["App blocker Android", "System interception", "Accessibility Service", "UsageStats API"]
    },
    presentation: {
      category: "Mobile Utilities",
      tags: ["On-device security", "Usage interceptor", "Battery optimization", "Privacy-first"],
      technologies: ["android accessibility", "kotlin"]
    },
    relationships: []
  },
  {
    id: "topic.build-flavors",
    type: "TOPIC",
    title: "Build Automation & Flavor Matrix",
    slug: "build-automation-flavors",
    seo: {
      description: "Configuring multi-variant white-label deployments from a single code base using customized build matrices.",
      keywords: ["Gradle build flavors", "White-label Android app", "Automation script matrix", "Gradle DSL optimization"]
    },
    presentation: {
      category: "Build Operations",
      tags: ["Gradle Kotlin DSL", "CI/CD matrix", "Variant automation", "White-label"],
      technologies: ["gradle", "kotlin"]
    },
    relationships: []
  }
];
