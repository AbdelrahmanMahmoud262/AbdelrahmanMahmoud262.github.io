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
    tagline: "Refactoring Iraq's leading transport system to Clean Architecture while managing real-time routing for 30K+ active users.",
    metricValue: "30K+",
    metricLabel: "Active Users",
    role: "Android Team Lead",
    company: "Almyaar",
    period: "Sep 2025 - Present",
    technologies: ["Kotlin", "Jetpack Compose", "Ktor", "Dagger Hilt", "Clean Architecture", "Google Maps SDK", "Pusher", "FCM"],
    background: "Taxi Alwatani is Iraq's leading ride-hailing service, operating in challenging real-world conditions where connectivity is inconsistent and immediate location coordination is vital for driver-passenger matching.",
    problem: "The legacy application faced architectural bottlenecking, causing synchronization issues, battery drain during live GPS tracking, and a slow release cycle. The codebase needed a full refactor to Clean Architecture while simultaneously maintaining production feature deliveries.",
    businessContext: "As the service expanded, stability and responsiveness were paramount to secure regulatory approval from Iraq's Ministry of Transportation, ensuring the app complied with regional transport directives.",
    challenges: [
      "Continuous live GPS tracking without draining user battery in hot regional climates.",
      "Refactoring the entire data/domain/presentation flow without interrupting existing active riders and drivers.",
      "Real-time messaging and dispatch notification delivery under volatile 3G/4G connections.",
    ],
    decisions: [
      "Migrated networking to Ktor for lightweight HTTP and WebSocket handling.",
      "Adopted Clean Architecture with Dagger Hilt to decouple business logic from the UI layer.",
      "Implemented a specialized Foreground Service using the Fused Location Provider with adaptive intervals to balance GPS accuracy and battery consumption.",
    ],
    results: [
      "Full production refactor successfully completed and submitted for Ministry of Transportation approval.",
      "Significantly improved location tracking stability under weak network connections.",
      "Established unit testing for core domain use cases, bringing regression rates down.",
    ],
    lessons: "When refactoring a live, high-traffic product, introducing changes incrementally through feature layers (domain, then data, then presentation) is much safer than a hard rewrite, avoiding disruptions to existing users.",
  },
  {
    id: "schoolie",
    title: "Schoolie",
    subtitle: "White-Label School Management System",
    tagline: "Migrating and refactoring a white-label app serving 40+ schools across Egypt, UAE, and KSA with automated CI/CD variant generation.",
    metricValue: "40+",
    metricLabel: "Institutions Served",
    role: "Solo Android Developer",
    company: "SAGA",
    period: "Jun 2025 - Present",
    technologies: ["Kotlin", "Jetpack Compose", "Ktor", "Koin", "Koin Annotations", "Clean Architecture", "WebSockets", "CI/CD (GitLab/GitHub Actions)"],
    background: "Schoolie is a white-label platform serving 40+ schools, managing communications, student attendance, bus routing, and homework feeds.",
    problem: "The application originally relied on Java/XML with high technical debt, a broken real-time messaging pipeline, and manual distribution. Compiling and uploading customized branded apps for 40+ schools individually consumed hours of manual developer time per release.",
    businessContext: "White-label scaling required rapid code-sharing and automated distribution. Adding new school branding could not require manual layout code modifications or individual code branches.",
    challenges: [
      "Migrating 60% of a legacy Java/XML codebase to Kotlin/Compose in under 7 months without blocking daily school operations.",
      "Rebuilding a broken messaging system to ensure immediate parent-teacher communications.",
      "Automating the generation and signing of 40+ customized branded APKs/AABs.",
    ],
    decisions: [
      "Implemented a Gradle-based build-flavor automation system that maps school-specific assets, themes, and configs dynamically.",
      "Used WebSockets for messaging to resolve the high failure rates of the previous polling system.",
      "Architected offline-first database sync to cache feeds, allowing parents to view reports and school updates in areas with poor internet.",
    ],
    results: [
      "Successfully migrated 60% of the codebase in under 7 months.",
      "Reduced white-label release distribution overhead to zero via automated CI/CD pipelines.",
      "Stabilized WebSocket messaging, resolving daily communication failures.",
    ],
    lessons: "Automating packaging early in a white-label product lifecycle is critical. What started as hours of manual compile work was reduced to a simple git tag release, freeing engineering time for actual product features.",
  },
  {
    id: "rafiqy",
    title: "Rafiqy (formerly Mostaqeem)",
    subtitle: "Privacy-First Digital Wellness App",
    tagline: "Designing a high-performance Android wellness engine that intercepts app usage on-device with zero server storage and minimum battery impact.",
    metricValue: "100%",
    metricLabel: "On-Device & Private",
    role: "Solo Creator & Architect",
    company: "Self-Employed",
    period: "2024 - Present",
    technologies: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Android Accessibility Service", "UsageStats API", "Coroutines & Flow", "Google OAuth 2.0"],
    background: "Rafiqy is a solo-developed digital wellness application available on Google Play, built to curb short-form video addiction (TikTok, Shorts, Reels) and block harmful content on-device.",
    problem: "Most content blockers either route traffic through slow, privacy-invasive VPNs or run battery-heavy background polling. Intercepting custom app views (like YouTube Shorts) requires a fast, low-footprint background system that does not leak user data.",
    businessContext: "Users trust wellness applications with highly personal device usage data. Adopting a strictly local, privacy-by-design approach was both an ethical choice and a core competitive differentiator.",
    challenges: [
      "Detecting specific UI nodes in real-time (e.g. distinguishing a standard YouTube video from a YouTube Short) without lagging the device.",
      "Refactoring a monolithic 1,000+ line background service to optimize battery life.",
      "Enforcing secure features like partner-verified unlocking and anti-uninstall security hooks.",
    ],
    decisions: [
      "Leveraged the Android Accessibility Service API to inspect screen hierarchies on-device, discarding screen buffers immediately after analysis.",
      "Utilized the UsageStats API for macro application-level monitoring, triggering the Accessibility Engine only when target apps are open.",
      "Refactored the background service into a modular multi-module Clean Architecture structure (`:feature:protection`, `:feature:statistics`), optimizing Coroutine thread scheduling.",
    ],
    results: [
      "Deployed Rafiqy to Google Play with a strong, highly reliable blocking system.",
      "Drastically reduced battery consumption through structured concurrency (Kotlin Coroutines/Flow) and modularized services.",
      "Achieved 100% private, on-device operations with zero tracking data transmitted to servers.",
    ],
    lessons: "The Android Accessibility Service is extremely powerful but highly resource-sensitive. Any delay in processing screen nodes directly impacts system-wide touch latency. Keeping node queries ultra-focused and executing filters off the main thread is vital.",
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
    title: "Deep Dive: Architecting a Low-Latency Foreground App Blocker & Session Tracker in Mostaqeem",
    excerpt: "An architectural review of background foreground polling, session lifecycle tracking, and custom overlay interception on Android.",
    category: "Android",
    date: "June 28, 2026",
    readTime: "12 min read",
  },
  {
    slug: "schoolie-white-label-gradle-automation",
    title: "Gradle Build Flavor Overlays: Scaling SAGA/Schoolie to 40+ School App Variants",
    excerpt: "Eliminating git branch hell. How to automate assets, localized modules, and configurations dynamically via JSON in a single codebase.",
    category: "Architecture",
    date: "May 10, 2026",
    readTime: "10 min read",
  },
  {
    slug: "taxi-alwatani-clean-architecture-refactor",
    title: "Refactoring Taxi Alwatani: An Incremental Clean Architecture Migration under 30K+ Live Users",
    excerpt: "How we migrated the passenger app to Jetpack Compose, Ktor, and Hilt without downtime or release freezes.",
    category: "Leadership",
    date: "April 18, 2026",
    readTime: "11 min read",
  },
  {
    slug: "taxi-captain-realtime-tracking-websockets",
    title: "High-Frequency Background GPS Tracking and WebSockets Dispatch in Taxi Alwatani Captain App",
    excerpt: "Tuning Foreground Services and WebSocket connections to achieve stable routing and instant ride request dispatch.",
    category: "Android",
    date: "March 22, 2026",
    readTime: "9 min read",
  },
  {
    slug: "studentway-parent-offline-first-booking",
    title: "Offline-First Sync, Shared Student Cache, and Paging in StudentWay Parent App",
    excerpt: "Designing a synchronized database boundary with Room, Paging 3, and Ktor safety wrappers for parent booking flows.",
    category: "Architecture",
    date: "Feb 15, 2026",
    readTime: "8 min read",
  },
];
