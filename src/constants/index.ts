export const PERSONAL_INFO = {
  name: "Abdelrahman Mahmoud Nasr",
  title: "Senior Android Developer • Android Team Lead",
  shortTitle: "Android Team Lead & Architect",
  email: "abdelrahmanmahmoudnasr@gmail.com",
  phone: "+20 102 368 6787",
  location: "Cairo, Egypt (Available for Remote / Hybrid)",
  linkedin: "https://linkedin.com/in/abdelrahman262",
  github: "https://github.com/AbdelrahmanMahmoud262/",
  summary:
    "Results-driven Senior Android Developer and Team Lead with 6+ years of experience architecting and delivering production-grade Android applications used by tens of thousands of active users. Expert in Kotlin, Jetpack Compose, and Clean Architecture; proven ability to lead engineering teams, own full codebase migrations, architect offline-first multi-module systems, and drive measurable performance improvements at production scale.",
};

export const METRICS = [
  {
    value: "6+",
    label: "Years Experience",
    description: "Building production Android apps",
  },
  {
    value: "30K+",
    label: "Active Users",
    description: "On Iraq's leading ride-hailing app",
  },
  {
    value: "40+",
    label: "Institutions Served",
    description: "Across Egypt, UAE, and KSA",
  },
  {
    value: "60%",
    label: "Codebase Migrated",
    description: "Java/XML to Kotlin/Compose in under 7 months",
  },
];

export const TECHNICAL_SKILLS = [
  {
    category: "Languages & UI",
    skills: ["Kotlin", "Java", "Jetpack Compose", "XML", "Material Design 3"],
  },
  {
    category: "Architecture",
    skills: [
      "Clean Architecture",
      "MVVM",
      "MVI",
      "Multi-Module Architecture",
      "Repository Pattern",
      "Use Cases",
    ],
  },
  {
    category: "DI & Async",
    skills: [
      "Koin",
      "Koin Annotations",
      "Dagger Hilt",
      "Coroutines",
      "Flow",
      "StateFlow",
      "SharedFlow",
    ],
  },
  {
    category: "Networking & Push",
    skills: ["Ktor", "Retrofit", "WebSockets", "Pusher", "RESTful APIs", "FCM"],
  },
  {
    category: "Persistence & Sync",
    skills: [
      "Room",
      "DataStore",
      "Offline-First Architecture",
      "Feed Caching & Sync",
    ],
  },
  {
    category: "Maps & Location",
    skills: [
      "Google Maps SDK",
      "Directions API",
      "Places API",
      "Fused Location Provider",
      "Foreground Services",
    ],
  },
  {
    category: "Security & Services",
    skills: [
      "Android Accessibility Service",
      "UsageStats API",
      "App Locking",
      "Uninstall Prevention",
      "Battery Optimization",
      "GDPR Compliance",
    ],
  },
  {
    category: "CI/CD & Tooling",
    skills: [
      "CI/CD Pipelines",
      "White-Label Build Automation",
      "Gradle",
      "JUnit4",
      "MockK",
      "Git",
    ],
  },
];

export const EXPERIENCES = [
  {
    role: "Android Team Lead",
    company: "Almyaar",
    period: "Sep 2025 – Present",
    location: "Baghdad, Iraq — Remote",
    highlights: [
      "Lead a team of 3 Android developers on Taxi Alwatani — Iraq's primary ride-hailing platform serving 30,000+ active users.",
      "Architected and delivered a full production refactor of Taxi Alwatani using Kotlin, Jetpack Compose, Ktor, Dagger Hilt, and Clean Architecture across data/domain/presentation layers.",
      "Drove full-cycle architecture and development of Student Way — a dual-app school bus tracking solution featuring real-time GPS, Pusher live messaging, and bus schedule management.",
      "Integrated Google Maps SDK, Directions API, and Places API to power real-time driver routing, passenger pickup coordination, and location matching.",
      "Implemented foreground services for continuous live GPS tracking and background upload services, maintaining battery and performance efficiency.",
      "Established unit test coverage for domain-layer use cases and ViewModels using JUnit4 and MockK.",
      "Promoted to Team Lead within 4 months, taking ownership of architectural standards, sprint coordination, and cross-team strategy.",
    ],
  },
  {
    role: "Android Developer — Solo",
    company: "SAGA (Schoolie)",
    period: "Jun 2025 – Present",
    location: "Cairo, Egypt — Remote",
    highlights: [
      "Sole Android developer responsible for production maintenance and feature delivery for Schoolie — a white-label school management system serving 40+ institutions across Egypt, UAE, and KSA.",
      "Migrated ~60% of the Android codebase from Java/XML to Kotlin and Jetpack Compose in under 7 months with zero disruption to live institutions.",
      "Led end-to-end architectural refactor of Schoolie from scratch — redesigning onboarding, authentication, attendance, messaging, feed, and dashboard systems using Kotlin, Jetpack Compose, Ktor, Koin + Koin Annotations, and Clean Architecture.",
      "Architected multi-account support and offline-first feed caching with background sync for reliability in low-connectivity environments.",
      "Designed and implemented CI/CD pipelines automating white-label build generation and release distribution across 40+ branded app variants, eliminating manual overhead.",
      "Integrated WebSocket real-time messaging and FCM push notifications across all variants.",
    ],
  },
  {
    role: "Android Developer",
    company: "Develop Network",
    period: "Sep 2024 – May 2025",
    location: "Cairo, Egypt — Hybrid",
    highlights: [
      "Served as sole Android developer, independently owning all Android product development across the company's portfolio using Jetpack Compose, CameraX, and Apache POI.",
      "Engineered scheduling logic, location-based services, and background processing; implemented app locking, overlay protection, and uninstall prevention for enterprise-grade security.",
      "Integrated ad monetization SDKs; maintained MVVM + Clean Architecture across a modular codebase ensuring long-term scalability.",
    ],
  },
  {
    role: "Junior Android Developer",
    company: "Vertex Code",
    period: "Jan 2024 – Aug 2024",
    location: "UK — Remote",
    highlights: [
      "Developed and maintained production Android applications in Kotlin within a fully remote cross-functional team.",
      "Contributed features, resolved bugs, and authored technical documentation.",
    ],
  },
  {
    role: "Freelance Android Developer",
    company: "Self-Employed",
    period: "Feb 2020 – Present",
    location: "Remote",
    highlights: [
      "Architected and built Rafiqy (formerly Mostaqeem) from scratch — a privacy-first digital wellness app featuring intelligent app blocking, short-form content inhibition, and a Guardian accountability framework.",
      "Engineered a dual-engine on-device blocking system using a Foreground Service with the UsageStats API and an Accessibility Service for in-app content interception.",
      "Decomposed a 1,000+ line monolithic service into a modular, Clean Architecture multi-module system (:feature:protection, :feature:statistics, etc.), delivering a significant reduction in battery consumption.",
      "Implemented behavioral analytics (Dead Clicks tracking, Time Saved dashboards, comparative usage patterns), Google OAuth 2.0, and anti-uninstall security hooks.",
      "Delivered tailored Android applications for diverse clients across multiple industries, managing full lifecycle from requirements through Play Store deployment.",
    ],
  },
];

export const SERVICES = [
  {
    id: "android-dev",
    title: "Senior Android Development",
    shortDescription: "End-to-end native Android development using Kotlin and Jetpack Compose.",
    description: "Get robust, high-performance native apps built with current Android patterns. Fully native implementation focusing on optimal performance, smooth animations, and solid offline capabilities.",
    icon: "Smartphone",
    features: [
      "100% Kotlin & Jetpack Compose",
      "Offline-first architecture (Room & DataStore)",
      "Background task processing & WorkManager",
      "Sensor, CameraX & Bluetooth integrations",
    ],
  },
  {
    id: "architecture-reviews",
    title: "Android Architecture Audits",
    shortDescription: "Complete codebase analysis to scale features and reduce technical debt.",
    description: "A comprehensive audit of your codebase structure, dependency injection setups, async flows, and multi-module separation. You get a detailed roadmap on how to make your codebase ready for ten developers.",
    icon: "GitBranch",
    features: [
      "Clean Architecture & SOLID compliance check",
      "Dependency Injection optimization (Hilt/Koin)",
      "Structured concurrency and Flow audits",
      "Modularization structure & build speeds review",
    ],
  },
  {
    id: "compose-migration",
    title: "Jetpack Compose Migration",
    shortDescription: "Migrating legacy XML codebases to modern declarative UI.",
    description: "Safely transition your legacy XML layouts to Jetpack Compose. I create a gradual migration path that allows you to ship new features without freezing your product roadmap or breaking existing flows.",
    icon: "RefreshCw",
    features: [
      "Hybrid XML-Compose interoperability layout",
      "Component-by-component migration strategy",
      "Custom Design System mapping in Compose",
      "Performance optimization of Compose recompositions",
    ],
  },
  {
    id: "performance-optimization",
    title: "Performance & Battery Optimization",
    shortDescription: "Diagnose lags, memory leaks, and high battery consumption.",
    description: "Using tools like Android Profiler, Systrace, and LeakCanary to eliminate UI jank, optimize background processing (Foreground Services / WorkManager), and reduce battery drain for background-heavy apps.",
    icon: "Zap",
    features: [
      "Memory leak audits (LeakCanary)",
      "UI jank reduction & profiling",
      "Foreground service & battery life optimizations",
      "Network footprint and offline caching efficiency",
    ],
  },
  {
    id: "white-label-automation",
    title: "White-Label Build Automation",
    shortDescription: "Scale one codebase to dozens of custom branded apps automatically.",
    description: "Automate build flavors, resource mapping, configurations, and CI/CD pipelines to distribute multiple branded variants from a single core repository without manual packaging overhead.",
    icon: "Layers",
    features: [
      "Gradle build flavor configuration",
      "Asset & string resource replacement scripts",
      "Automated CI/CD deployment to Google Play console",
      "Multi-account and tenant management",
    ],
  },
  {
    id: "technical-consulting",
    title: "Technical Consulting & Leadership",
    shortDescription: "Aligning product objectives with elite Android engineering strategies.",
    description: "Get strategic engineering leadership to coordinate sprints, set architectural standards, review code, and bridge the gap between technical complexity and business goals.",
    icon: "Users",
    features: [
      "Code review processes & PR approvals setup",
      "Android API design & integration audits",
      "Agile sprint coordination & mentoring",
      "Security auditing (app locking, overlay protection)",
    ],
  },
];

export const CASE_STUDIES = [
  {
    id: "taxi-alwatani",
    title: "Taxi Alwatani",
    subtitle: "Iraq's Primary Ride-Hailing Platform",
    tagline: "Coordinating passenger trip creation, driver search, and active ride state across Ktor, Firestore, Room, and Compose.",
    metricValue: "30K+",
    metricLabel: "Active Users",
    role: "Android Team Lead",
    company: "Almyaar",
    period: "Sep 2025 - Present",
    technologies: ["Kotlin", "Jetpack Compose", "Ktor", "Koin", "Clean Architecture", "Google Maps SDK", "Firestore", "FCM"],
    background: "Taxi Alwatani is Iraq's leading ride-hailing service, operating in challenging real-world conditions where connectivity is inconsistent and immediate location coordination is vital for driver-passenger matching.",
    problem: "Trip state arrives from multiple asynchronous sources. The client must resolve driver acceptance, search termination, route updates, and terminal ride states without presenting contradictory UI.",
    businessContext: "As the service expanded, stability and responsiveness were paramount to secure regulatory approval from Iraq's Ministry of Transportation, ensuring the app complied with regional transport directives.",
    challenges: [
      "Resolve Firestore acceptance and cancellation signals alongside a 30-second backend fallback poll.",
      "Map backend trip status and driver coordinates into deterministic Compose map state.",
      "Recover an active ride from backend state while the declared Room cache remains outside the production flow.",
    ],
    decisions: [
      "Use Ktor for commands and complete payloads while Firestore carries small realtime dispatch signals.",
      "Keep app, domain, and data boundaries explicit with Koin as the composition mechanism.",
      "Merge three search-result flows and accept the first terminal event with take(1).",
    ],
    results: [
      "Driver acceptance, search termination, and backend fallback are represented by one domain result stream.",
      "Active ride status drives route, marker, camera, cancellation, and terminal navigation state.",
      "Known recovery gaps are explicit: the active-trip DAO is wired but unused and missing coordinates have a fallback risk.",
    ],
    lessons: "Realtime transports should emit small domain signals, while one use case owns terminal resolution and the UI receives only deterministic ride states.",
  },
  {
    id: "schoolie",
    title: "Schoolie",
    subtitle: "White-Label School Management System",
    tagline: "Generating 18 verified Android client variants from one registry, then resolving branding, themes, and feature policy at runtime.",
    metricValue: "18",
    metricLabel: "Configured Clients",
    role: "Solo Android Developer",
    company: "SAGA",
    period: "Jun 2025 - Present",
    technologies: ["Kotlin", "Jetpack Compose", "Ktor", "Koin", "Koin Annotations", "Clean Architecture", "Room", "WorkManager"],
    background: "Schoolie is a multi-module white-label education platform with 18 client identities verified in the current registry.",
    problem: "Client identity, app packaging, runtime branding, feature availability, and Firebase registration must stay synchronized without duplicating the product codebase.",
    businessContext: "A white-label product needs compile-time application identity and runtime policy to evolve independently while features remain shared.",
    challenges: [
      "Generate a Gradle variant matrix from structured client data rather than repeated flavor blocks.",
      "Propagate branding and feature policy through Compose without coupling screens to BuildConfig.",
      "Protect queued feed and upload work while the database still uses destructive migration fallback.",
    ],
    decisions: [
      "Parse clients/clients.json during Gradle configuration and emit CLIENT_ID and APP_TYPE fields.",
      "Resolve BrandingConfiguration, ThemeConfiguration, and FeatureConfiguration at runtime.",
      "Use Room and foreground WorkManager jobs for upload, post queue, and reaction synchronization.",
    ],
    results: [
      "One registry currently defines 18 verified application identities and version configurations.",
      "Compose receives typed branding and feature policy through composition locals.",
      "The evidence boundary is explicit: repository CI distribution is not currently implemented.",
    ],
    lessons: "Keep compile-time identity in the build system and runtime product policy in typed application configuration; validate the registry before adding distribution automation.",
  },
  {
    id: "rafiqy",
    title: "Rafiqy (formerly Mostaqeem)",
    subtitle: "Privacy-First Digital Wellness App",
    tagline: "Separating low-latency foreground-app detection from event-driven browser and short-form content interception.",
    metricValue: "2",
    metricLabel: "Detection Engines",
    role: "Solo Creator & Architect",
    company: "Self-Employed",
    period: "2024 - Present",
    technologies: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Android Accessibility Service", "UsageStats API", "Coroutines & Flow", "Google OAuth 2.0"],
    background: "Rafiqy is a solo-developed digital wellness application available on Google Play, built to curb short-form video addiction (TikTok, Shorts, Reels) and block harmful content on-device.",
    problem: "Most content blockers either route traffic through slow, privacy-invasive VPNs or run battery-heavy background polling. Intercepting custom app views (like YouTube Shorts) requires a fast, low-footprint background system that does not leak user data.",
    businessContext: "Users trust wellness applications with highly personal device usage data. Adopting a strictly local, privacy-by-design approach was both an ethical choice and a core competitive differentiator.",
    challenges: [
      "Detecting specific UI nodes in real-time (e.g. distinguishing a standard YouTube video from a YouTube Short) without lagging the device.",
      "Separating package-level polling from content-level accessibility tree inspection.",
      "Enforcing secure features like partner-verified unlocking and anti-uninstall security hooks.",
    ],
    decisions: [
      "Use UsageEvents polling for package-level rule evaluation and AccessibilityService events for content-level classifiers.",
      "Place rule evaluation behind service-domain contracts and keep enforcement in dedicated overlay activities.",
      "Use WorkManager and a boot receiver to recover the primary foreground service.",
    ],
    results: [
      "App, schedule, and duration rules converge into one BlockingDecision flow.",
      "Usage sessions are persisted independently from blocking policy.",
      "Recovery paths and classifier fragility are documented instead of hidden behind unmeasured reliability claims.",
    ],
    lessons: "Treat external view identifiers as an unstable integration surface and keep detection, policy, enforcement, and accounting independently replaceable.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Abdelrahman stepped into the Team Lead role and immediately revolutionized our engineering culture. He refactored our core system to Clean Architecture, established automated code reviews, and got our release approved by the Ministry of Transportation. His architectural clarity is unmatched.",
    author: "Senior Management",
    company: "Almyaar",
    role: "Taxi Alwatani & Student Way Project Sponsor",
  },
  {
    quote:
      "Faced with a massive 60% Java-to-Kotlin migration and 40+ white-label variations, Abdelrahman didn't just write code—he built an automated pipeline. What took us days now takes a single git command. He's a solo powerhouse who feels like a whole team.",
    author: "Lead Product Owner",
    company: "SAGA (Schoolie)",
    role: "White-Label Education Platform Manager",
  },
  {
    quote:
      "Rafiqy proves Abdelrahman's mastery of Android's deepest subsystems. Intercepting UI elements in real-time while maintaining 100% on-device privacy and low battery footprint is a masterclass in performance tuning. He builds serious software.",
    author: "Android Community Peer",
    company: "Google Play Developer Community",
    role: "Senior Mobile Architect Reviews",
  },
];

export const BLOG_POSTS = [
  {
    slug: "mostaqeem-blocking-service-architecture",
    title: "Mostaqeem's Two-Engine Android Blocking Architecture",
    excerpt: "An architectural review of background foreground polling, session lifecycle tracking, and custom overlay interception on Android.",
    category: "Android Systems",
    date: "June 28, 2026",
    readTime: "8 min read",
  },
  {
    slug: "schoolie-white-label-gradle-automation",
    title: "Schoolie White-Label Architecture: 18 Variants From One Registry",
    excerpt: "How JSON-driven Gradle flavors connect to typed runtime branding, themes, feature policy, and background work.",
    category: "Build Architecture",
    date: "May 10, 2026",
    readTime: "8 min read",
  },
  {
    slug: "taxi-alwatani-clean-architecture-refactor",
    title: "Taxi Alwatani: Coordinating Ktor, Firestore, and Ride State",
    excerpt: "A source-level walkthrough of trip creation, competing dispatch signals, and active ride state.",
    category: "Architecture",
    date: "April 18, 2026",
    readTime: "8 min read",
  },
  {
    slug: "taxi-captain-realtime-tracking-websockets",
    title: "Taxi Captain: Foreground Dispatch With Firestore, Room, and Ktor",
    excerpt: "How online mode coordinates trip assignment, Room caches, HTTP location updates, and background overlays.",
    category: "Android Systems",
    date: "March 22, 2026",
    readTime: "9 min read",
  },
  {
    slug: "studentway-parent-offline-first-booking",
    title: "StudentWay: Shared Caches, Optimistic Messages, and Live Tracking",
    excerpt: "Session-scoped student caching, Room Paging, Pusher events, and bounded Firebase tracking retries.",
    category: "Data Architecture",
    date: "Feb 15, 2026",
    readTime: "9 min read",
  },
];
