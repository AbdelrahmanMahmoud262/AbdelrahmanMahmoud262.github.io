import { Entity } from "./types";

export const TECHNOLOGIES: Entity[] = [
  {
    id: "technology.kotlin",
    type: "TECHNOLOGY",
    title: "Kotlin",
    slug: "kotlin",
    seo: {
      description: "Modern, concise, and safe programming language. The official language for native Android development.",
      keywords: ["Kotlin", "Kotlin Coroutines", "Android programming", "Kotlin Multiplatform"]
    },
    presentation: {
      category: "Languages",
      tags: ["OOP", "FP", "JVM", "Native"],
      technologies: ["kotlin"]
    },
    relationships: []
  },
  {
    id: "technology.compose",
    type: "TECHNOLOGY",
    title: "Jetpack Compose",
    slug: "jetpack-compose",
    seo: {
      description: "Android's modern declarative UI toolkit for building native user interfaces efficiently.",
      keywords: ["Jetpack Compose", "Declarative UI", "Compose runtime", "Compose animations"]
    },
    presentation: {
      category: "UI Frameworks",
      tags: ["Declarative", "Reactive UI", "Material Design 3"],
      technologies: ["jetpack compose", "kotlin"]
    },
    relationships: []
  },
  {
    id: "technology.ktor",
    type: "TECHNOLOGY",
    title: "Ktor",
    slug: "ktor",
    seo: {
      description: "Asynchronous HTTP client and server framework built in Kotlin using Coroutines.",
      keywords: ["Ktor", "HTTP Client", "Kotlin Ktor", "WebSockets client"]
    },
    presentation: {
      category: "Networking",
      tags: ["Async", "HTTP Client", "WebSockets", "Serialization"],
      technologies: ["ktor", "kotlin"]
    },
    relationships: []
  },
  {
    id: "technology.hilt",
    type: "TECHNOLOGY",
    title: "Dagger Hilt",
    slug: "dagger-hilt",
    seo: {
      description: "Dependency injection library for Android that reduces the boilerplate of Dagger in projects.",
      keywords: ["Dagger Hilt", "Dependency Injection", "Android DI", "Hilt ViewModel"]
    },
    presentation: {
      category: "Architecture Utilities",
      tags: ["Dependency Injection", "DI", "Hilt", "Dagger"],
      technologies: ["dagger hilt", "kotlin"]
    },
    relationships: []
  },
  {
    id: "technology.coroutines",
    type: "TECHNOLOGY",
    title: "Kotlin Coroutines & Flow",
    slug: "kotlin-coroutines",
    seo: {
      description: "Asynchronous and non-blocking concurrency libraries for running tasks efficiently on Android.",
      keywords: ["Coroutines", "Kotlin Flow", "StateFlow", "SharedFlow", "Concurrency", "Thread Safety"]
    },
    presentation: {
      category: "Concurrency",
      tags: ["Asynchronous", "Concurrency", "Reactive Streams", "Channels"],
      technologies: ["coroutines", "kotlin"]
    },
    relationships: []
  },
  {
    id: "technology.accessibility",
    type: "TECHNOLOGY",
    title: "Android Accessibility Service",
    slug: "android-accessibility",
    seo: {
      description: "System-level background utility API enabling developers to intercept user interactions and scan screens.",
      keywords: ["Accessibility Service", "Android overlay", "System interceptor", "UsageStats API"]
    },
    presentation: {
      category: "Android OS APIs",
      tags: ["System API", "Interception", "Background Engine", "Accessibility"],
      technologies: ["android accessibility", "kotlin"]
    },
    relationships: []
  },
  {
    id: "technology.gradle",
    type: "TECHNOLOGY",
    title: "Gradle & Build Automation",
    slug: "gradle",
    seo: {
      description: "High-performance build automation tool specialized in managing complex multi-module Android build flavors.",
      keywords: ["Gradle Kotlin DSL", "Build automation", "Multi-flavor builds", "CI/CD Gradle"]
    },
    presentation: {
      category: "Build Tools",
      tags: ["Gradle", "Kotlin DSL", "Build Automation", "DevOps"],
      technologies: ["gradle", "kotlin"]
    },
    relationships: []
  }
];
