export interface ProposalContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface ProposalMeta {
  title: string;
  subtitle: string;
  client: ClientInfo;
  date: string;
  version: string;
  passcode: string; // Private access key
}

export interface ProjectGoal {
  title: string;
  description: string;
}

export interface UnderstandingItem {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface TechItem {
  name: string;
  skills: string[];
}

export interface ProposedSolutionSection {
  title: string;
  description: string;
  bullets: string[];
}

export interface ProcessStep {
  phase: string;
  title: string;
  duration: string;
  description: string;
}

export interface Milestone {
  id: string;
  name: string;
  duration: string;
  deliverables: string[];
  completion: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  highlighted: boolean;
  description: string;
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TermsItem {
  title: string;
  description: string;
}

export interface ProposalContent {
  contact: ProposalContact;
  meta: ProposalMeta;
  overview: string;
  goals: string[];
  aboutMe: {
    bio: string;
    experienceYears: string;
    coreExpertise: string[];
    industries: string[];
    philosophy: string;
  };
  understanding: {
    clientGoals: UnderstandingItem;
    challenges: UnderstandingItem;
    successCriteria: UnderstandingItem;
    assumptions: UnderstandingItem;
  };
  solution: {
    architecture: ProposedSolutionSection;
    systemDesign: ProposedSolutionSection;
    security: ProposedSolutionSection;
    scalability: ProposedSolutionSection;
    performance: ProposedSolutionSection;
    maintainability: ProposedSolutionSection;
  };
  techStack: TechItem[];
  process: ProcessStep[];
  scope: {
    included: string[];
    excluded: string[];
  };
  deliverables: {
    title: string;
    description: string;
    icon: string;
  }[];
  timeline: Milestone[];
  pricing: {
    baseCurrency: string;
    totalCost: string;
    breakdown: { label: string; amount: string; percentage: number }[];
    milestones: { label: string; amount: string; percentage: number; description: string }[];
    addons: { name: string; price: string; description: string }[];
    maintenance: { name: string; price: string; period: string; details: string[] }[];
  };
  whyMe: { title: string; description: string; icon: string }[];
  testimonials: { quote: string; author: string; company: string }[];
  faqs: FAQItem[];
  terms: TermsItem[];
}

export const PROPOSAL_DATA: ProposalContent = {
  contact: {
    name: "Abdelrahman Mahmoud Nasr",
    role: "Senior Android Architect & Team Lead",
    email: "abdelrahmanmahmoudnasr@gmail.com",
    phone: "+20 102 368 6787",
    location: "Cairo, Egypt (Available for Remote / Hybrid)",
    linkedin: "https://linkedin.com/in/abdelrahman262",
    github: "https://github.com/AbdelrahmanMahmoud262/",
    portfolio: "https://abdelrahmanmahmoud262.github.io/"
  },
  meta: {
    title: "Rafiqy",
    subtitle: "Premium Subscription Feature Integration",
    client: {
      name: "Mr. Ahmed Monged",
      email: "ahmedelmagdaly12@gmail.com",
      phone: "+201011819851",
      company: "Rafiqy Wellness"
    },
    date: "15th July 2026",
    version: "v2.0.0",
    passcode: "rafiqy-billing"
  },
  overview: "This proposal outlines the implementation of the Premium Subscription Feature for the Rafiqy Digital Wellness application. The objective of this milestone is to introduce a paywall system that gates detailed productivity statistics and analytics. Free users will maintain access to basic statistics, while paid subscribers will unlock comprehensive insights and history dashboards. The scope of this contract is strictly limited to mobile client-side development, covering UI screens, local subscription state management, plan refresh logic, and Paymob SDK integration to process Visa and Mastercard payments natively. The timeline is 2 days, commencing once the designs, backend configurations, and API credentials are fully ready and supplied.",
  goals: [
    "Introduce a premium membership tier with Monthly, Yearly, and Lifetime pricing cycles.",
    "Implement paywall screens and logic to gate advanced statistics and daily reports.",
    "Integrate the Paymob SDK for native credit/debit card checkouts in Egypt.",
    "Architect secure local subscription caching and verification on app startup.",
    "Deliver a fully functional client implementation within 2 days after receiving design and backend keys."
  ],
  aboutMe: {
    bio: "Senior Android Architect and Team Lead with 6+ years of experience building high-performance, security-focused, and offline-first mobile products. Proven track record leading engineering teams, automating complex white-label multi-client build pipelines, and implementing high-efficiency background services that scale. Deeply invested in Clean Architecture and declarative UI engineering.",
    experienceYears: "6+ Years",
    coreExpertise: [
      "Native Kotlin & Jetpack Compose",
      "Clean Architecture & Multi-Module setups",
      "Android System Services (Accessibility, UsageStats)",
      "High-Performance Foreground Services",
      "Gradle White-Label Build Automation",
      "Offline-First Caching & Data Sync"
    ],
    industries: [
      "Mobility & Ride-Hailing",
      "EdTech & School Management",
      "Digital Productivity & Security",
      "SaaS Mobile Offerings"
    ],
    philosophy: "I believe that software architecture should serve the business while guaranteeing codebase longevity. By strictly segregating concerns, maintaining clean modular separations, and automating quality assurance pipelines, we can deploy robust applications to production that are easily maintainable by any developer and withstand platform evolutions."
  },
  understanding: {
    clientGoals: {
      title: "Client Goals",
      description: "Integrate a monetization layer into the Rafiqy app. Implement a credit/debit card payment system (Paymob) to sell Monthly, Yearly, and Lifetime subscription plans.",
      icon: "Target"
    },
    challenges: {
      title: "Current Challenges",
      description: "Integrating the Paymob SDK natively on the mobile client, maintaining local billing cache that updates on start, and building a responsive Compose UI that checks billing states instantly.",
      icon: "AlertTriangle"
    },
    successCriteria: {
      title: "Success Criteria",
      description: "Smooth checkout experience using Paymob SDK. Unlocked advanced charts immediately after purchase, and resilient billing status verification on app launch.",
      icon: "CheckCircle"
    },
    assumptions: {
      title: "Assumptions",
      description: "All backend endpoints, database updates, and Paymob webhook setup will be developed and hosted by the client's team. Figma designs and production keys will be supplied prior to the 2-day clock starting.",
      icon: "HelpCircle"
    }
  },
  solution: {
    architecture: {
      title: "MVVM & Billing Gating UseCases",
      description: "We separate the billing logic from the user interface using clean architecture boundaries.",
      bullets: [
        "Billing Repository: Handles local billing state, cache verification, and remote token refreshes.",
        "Gating UseCase: Queries local subscription state before releasing detailed statistics, keeping data private.",
        "Presentation: Renders Compose views dynamically based on subscription state flow."
      ]
    },
    systemDesign: {
      title: "Dedicated Billing Gradle Module",
      description: "We isolate billing logic into a dedicated module to ensure high maintainability and security.",
      bullets: [
        ":core:billing - Contains all billing repositories, local caching, and Paymob integrations.",
        ":feature:paywall - Contains UI sheets, checkout details, and plan selection screens.",
        ":feature:statistics - Integrates with :core:billing to verify feature locks."
      ]
    },
    security: {
      title: "Client Billing Cache",
      description: "To prevent local bypass of subscriptions, we implement standard mobile security practices.",
      bullets: [
        "Encrypted DataStore: Subscription expiration dates are signed and encrypted locally.",
        "Server Verification: Periodic status sync queries with the client's backend on app start.",
        "Tamper Detection: Basic client-side checks to prevent user device-time changes from unlocking features."
      ]
    },
    scalability: {
      title: "Flexible Plan Architecture",
      description: "The plan schema is designed to allow simple future adjustments.",
      bullets: [
        "Plans are defined on the backend registry (Monthly, Yearly, Lifetime).",
        "Adding new tiers or changing prices will update the Compose paywall dynamically without releasing app updates."
      ]
    },
    performance: {
      title: "Zero-Jank Paywall Experience",
      description: "We optimize resource usage to maintain a smooth interface.",
      bullets: [
        "Asynchronous initialization of Paymob components using Kotlin Coroutines.",
        "Gated views render cached placeholders instantly, ensuring zero lag when entering stats screens."
      ]
    },
    maintainability: {
      title: "SOLID Coding & Unit Testing",
      description: "Billing pipelines are rigorously tested to eliminate transaction discrepancies.",
      bullets: [
        "Mock payment states used in local unit testing.",
        "Decoupled Paymob SDK dependency behind abstract repository interfaces, allowing future provider switches (e.g., Stripe)."
      ]
    }
  },
  techStack: [
    {
      name: "Android Mobile SDKs",
      skills: ["Kotlin", "Jetpack Compose", "Coroutines & Flow", "Encrypted DataStore", "Paymob Android SDK"]
    },
    {
      name: "Backend Payments integration",
      skills: ["Client Backend API (provided by client)", "Paymob merchant dashboard APIs", "Client-side payment callbacks"]
    },
    {
      name: "Supported Plans",
      skills: ["Monthly: EGP 30", "Yearly: EGP 300", "Lifetime: EGP 600"]
    },
    {
      name: "Tools & Quality Assurance",
      skills: ["Figma Screen Blueprints", "Paymob Sandbox Testing Dashboard", "JUnit4 & MockK Unit Tests"]
    }
  ],
  process: [
    {
      phase: "Phase 1",
      title: "Setup & Logic",
      duration: "Day 1",
      description: "Initialize Paymob SDK with credentials, implement local encrypted billing cache, create gating use-cases for Compose views, and set up status refresh hooks."
    },
    {
      phase: "Phase 2",
      title: "UI & Sandbox QA",
      duration: "Day 2",
      description: "Implement plan selection sheets and native paywall screens matching Figma, integrate SDK payment dialogues, handle error/success loops, and compile final APK."
    }
  ],
  scope: {
    included: [
      "Integration of Paymob Android SDK (Visa and Mastercard payment flows)",
      "Premium plan UI (selection sheet with Monthly, Yearly, and Lifetime options)",
      "Dynamic statistics gating: Free plan restricts views; Paid plan unlocks all insights and charts",
      "Billing status synchronization on app launch (client-side refresh callbacks)",
      "Encrypted DataStore caching of subscription signature",
      "Sandbox transaction validations and error state UI handling"
    ],
    excluded: [
      "Backend server setup, webhooks development, and server payment receivers (provided by client)",
      "Database schema adjustments or cloud server configurations",
      "Alternative payment gateways (e.g. Fawry, Instapay, ValU) unless added as separate milestones",
      "Apple iOS Subscription Billing/StoreKit integration (Android only)"
    ]
  },
  deliverables: [
    {
      title: "Source Code Branch",
      description: "Clean, modular code delivered in a dedicated `feature/billing` Git branch, following Clean Architecture guidelines.",
      icon: "Code"
    },
    {
      title: "Sandbox Release APK",
      description: "Sandbox-configured Android package (APK) to test credit card checkouts and statistics unlocks directly on device.",
      icon: "Package"
    },
    {
      title: "Integration Documentation",
      description: "Android-specific integration guide containing client billing setups and sandbox credit cards.",
      icon: "FileText"
    },
    {
      title: "Google Play Console Config",
      description: "Setup of internal testing, closed alpha tracks, and final production listings on your Google Play Console account.",
      icon: "UploadCloud"
    },
    {
      title: "Milestone Bug Warranty",
      description: "A 14-day warranty following the milestone release to resolve any issues related to payment validation or statistics gating.",
      icon: "Shield"
    }
  ],
  timeline: [
    {
      id: "M1",
      name: "Setup & Billing Logic",
      duration: "Day 1",
      deliverables: ["Paymob SDK setup", "Statistics gating UseCases", "Encrypted cache storage"],
      completion: 0
    },
    {
      id: "M2",
      name: "UI Screens & Sandbox QA",
      duration: "Day 2",
      deliverables: ["Plan selection Compose views", "Sandbox testing validations", "Handover branch", "Test APK"],
      completion: 0
    }
  ],
  pricing: {
    baseCurrency: "EGP",
    totalCost: "7,000",
    breakdown: [
      { label: "Paymob SDK & Gating Core", amount: "3,800", percentage: 54 },
      { label: "Plan UI & checkout views", amount: "2,600", percentage: 37 },
      { label: "Testing & Sandbox QA Validation", amount: "600", percentage: 9 }
    ],
    milestones: [
      { label: "Down Payment (35%)", amount: "2,450", percentage: 35, description: "Due upon milestone kickoff to secure scheduling and API setup." },
      { label: "Midpoint Payment (35%)", amount: "2,450", percentage: 35, description: "Due after core feature gating and Paymob SDK checkout integration (Milestone 2)." },
      { label: "Final Payment (30%)", amount: "2,100", percentage: 30, description: "Due upon successful sandbox card checkouts, webhook update confirmation, and code handover." }
    ],
    addons: [
      { name: "Instapay Wallet Support", price: "1,500 EGP", description: "Adds support for digital wallets (Vodafone Cash, Telda) via Paymob wallet channel." },
      { name: "Fawry Payments support", price: "1,500 EGP", description: "Adds support for cash collection via Fawry reference numbers." }
    ],
    maintenance: [
      {
        name: "Standard Retainer",
        price: "1,500 EGP",
        period: "month",
        details: [
          "Updates for new Paymob SDK API versions",
          "Payment gateway webhook monitoring",
          "Monthly backup of subscriber databases",
          "Minor billing bugs fixes"
        ]
      },
      {
        name: "Advanced Retainer",
        price: "2,500 EGP",
        period: "month",
        details: [
          "Everything in Standard Retainer",
          "Compliance checks for latest Android OS limits",
          "Adding new subscription plan configurations",
          "Technical billing consultation support"
        ]
      }
    ]
  },
  whyMe: [
    {
      title: "Clean Architecture Expertise",
      description: "My apps are built with strict data/domain/presentation separation, making them easy to maintain and refactor as you scale.",
      icon: "Layers"
    },
    {
      title: "Modern Android Tech Stack",
      description: "100% Kotlin, Coroutines, Flow, and Jetpack Compose. I use Google's recommended libraries to prevent technical debt.",
      icon: "Cpu"
    },
    {
      title: "Security & Licensing",
      description: "Years of experience building custom system services, background blockers, and encrypted local storage on Android.",
      icon: "Shield"
    },
    {
      title: "Paymob SDK Integration Experience",
      description: "Deep understanding of Egyptian payment flows, webhook security verification, and native payment client libraries.",
      icon: "Smartphone"
    },
    {
      title: "Clear Communication",
      description: "You deal directly with the engineer. Regular video updates, organized GitHub PRs, and absolute transparency.",
      icon: "MessageSquare"
    },
    {
      title: "Milestone Warranties",
      description: "I provide structured code documentation, sandbox testing scripts, and a 14-day post-handover bug warranty.",
      icon: "Clock"
    }
  ],
  testimonials: [
    {
      quote: "Abdelrahman completely refactored our ride-hailing application. His expertise in location tracking and clean state management made the product extremely stable.",
      author: "Product Director",
      company: "Almyaar Co."
    },
    {
      quote: "He built our CI/CD pipelines to manage 40+ client apps from a single repository. What used to take hours of manual packaging now happens automatically in minutes.",
      author: "Co-Founder",
      company: "SAGA (Schoolie)"
    }
  ],
  faqs: [
    {
      question: "Which cards does Paymob support in this milestone?",
      answer: "This integration will support Visa and Mastercard debit and credit cards natively. This covers the vast majority of local bank card users in Egypt."
    },
    {
      question: "How do you secure subscription status against local bypass?",
      answer: "We store the subscription signature in encrypted DataStore and check it against the backend on app start, ensuring it cannot be bypassed by changing system time or local files."
    },
    {
      question: "What happens if a payment fails mid-transaction?",
      answer: "The Paymob SDK handles failure states natively. We present a clear error screen with a retry option and do not unlock premium features until a successful webhook event is confirmed."
    },
    {
      question: "Are there transaction fees for Paymob payments?",
      answer: "Yes. Paymob collects a standard transaction percentage fee (approx. 2.75% + 3 EGP per transaction for card payments, subject to change by Paymob). These merchant fee settings are managed directly inside your Paymob dashboard."
    }
  ],
  terms: [
    {
      title: "Payment Terms",
      description: "Milestone payments are due upon completion and verification of the respective deliverables. Work on subsequent sprints begins after payment clearance."
    },
    {
      title: "Revision Policy",
      description: "The proposal price includes up to two rounds of UI/UX revisions during the paywall design stage. Subsequent adjustments during or after the coding sprints will be charged at a separate hourly rate."
    },
    {
      title: "Intellectual Property",
      description: "All source code, webhook receiver scripts, configurations, and compiled packages are transferred 100% to the client upon final payment clearance."
    },
    {
      title: "Confidentiality & NDAs",
      description: "Both parties agree to treat all business plans, API credentials, and codebase integrations as strictly confidential. NDAs will be signed prior to kickoff."
    },
    {
      title: "Warranty & Support",
      description: "A 14-day warranty is provided after code handover. This covers critical crashes, checkout integration bugs, or database sync failures."
    },
    {
      title: "Cancellation & Termination",
      description: "Either party may terminate the project with 7 days written notice. The client will be billed for work completed and deliverables verified up to the termination date."
    }
  ]
};

export const RAFIQY_PROPOSAL_DATA: ProposalContent = PROPOSAL_DATA;

export const MOSTAQEEM_STABILITY_PROPOSAL_DATA: ProposalContent = {
  contact: {
    name: "Abdelrahman Mahmoud Nasr",
    role: "Senior Android Architect & Team Lead",
    email: "abdelrahmanmahmoudnasr@gmail.com",
    phone: "+20 102 368 6787",
    location: "Cairo, Egypt (Available for Remote / Hybrid)",
    linkedin: "https://linkedin.com/in/abdelrahman262",
    github: "https://github.com/AbdelrahmanMahmoud262/",
    portfolio: "https://abdelrahmanmahmoud262.github.io/"
  },
  meta: {
    title: "Mostaqeem",
    subtitle: "Development & Stability Improvements",
    client: {
      name: "Mr. Ahmed Monged",
      email: "ahmedelmagdaly12@gmail.com",
      phone: "+201011819851",
      company: "Mostaqeem Productivity"
    },
    date: "14th August 2026",
    version: "v2.5.0",
    passcode: "mostaqeem-stability"
  },
  overview: "This proposal covers a focused set of improvements and fixes across the Mostaqeem Android application, with the goal of improving stability, Arabic/RTL compatibility, feature consistency, and overall user experience. The work is divided into two distinct categories: (1) Defined Development Scope with a fixed price of 4,000 EGP covering 10 specific functional items, and (2) Accessibility & Blocking Improvements with a variable effort starting estimate of ~6,000 EGP (expected range: 4,000 – 8,000 EGP). The Accessibility work is handled separately because investigation and implementation effort depends on existing AccessibilityService behavior, Android system state, target applications (Facebook & Instagram), and issues discovered during testing.",
  goals: [
    "Deliver 10 defined development fixes (Arabic RTL layout mirroring, profile saving persistence, Harmful Bees dataset, Figma reset text alignment, translation fixes, IG Reels redirect, app list filtering, notification scaling & throttling, OTP retention, Protection PIN rules).",
    "Investigate & audit AccessibilityService lifecycle, fixing permission prompt freezes/unresponsiveness, service crash recovery, and FB/IG Reels redirection in both English and Arabic.",
    "Maintain existing Clean Architecture, SOLID principles, and business logic using surgical, targeted code updates.",
    "Provide clear financial clarity with a 4,000 EGP fixed-scope tier and an estimated ~6,000 EGP accessibility investigation budget (~10,000 EGP expected total)."
  ],
  aboutMe: {
    bio: "Senior Android Architect and Team Lead with 6+ years of experience building high-performance, security-focused, and offline-first mobile products. Creator of Rafiqy/Mostaqeem digital wellness solutions featuring advanced Android Accessibility Services, UsageStats background engines, anti-uninstall security hooks, and Clean Architecture.",
    experienceYears: "6+ Years",
    coreExpertise: [
      "Native Kotlin & Jetpack Compose",
      "Android AccessibilityService & UsageStats API",
      "Clean Architecture & SOLID Principles",
      "Multi-Language & RTL Layout Compatibility",
      "Foreground Services & Battery Optimization",
      "Security & Anti-Bypass Protection Hooks"
    ],
    industries: [
      "Digital Productivity & Anti-Distraction",
      "Mobility & Ride-Hailing",
      "EdTech & Institution Management",
      "Enterprise Mobile Security"
    ],
    philosophy: "I believe that software maintenance should preserve existing business logic while targeting root-cause fixes. By making minimal, well-tested architectural adjustments and enforcing regression checks across all supported languages, we ensure long-term application stability."
  },
  understanding: {
    clientGoals: {
      title: "Client Goals",
      description: "Stabilize Mostaqeem across 10 defined functional areas (RTL layouts, profile updates, dataset repopulation, OTP state, notification frequency, Protection Layer rules) and audit/fix the Accessibility blocking engine.",
      icon: "Target"
    },
    challenges: {
      title: "Technical Challenges",
      description: "Android AccessibilityService lifecycle is sensitive to OS battery optimizations, target app DOM updates (Facebook/Instagram), and locale-dependent layout mirroring. Investigation is required for reliable background enforcement.",
      icon: "AlertTriangle"
    },
    successCriteria: {
      title: "Success Criteria",
      description: "Pixel-perfect RTL mirroring in Arabic, persisted user profiles, clean app lists, reliable Instagram/FB Reels blocking, non-resetting OTP entry, and resilient AccessibilityService recovery.",
      icon: "CheckCircle"
    },
    assumptions: {
      title: "Development Assumptions",
      description: "Existing codebase architecture and Figma designs are available. AccessibilityService fixes will be evaluated dynamically based on investigation findings.",
      icon: "HelpCircle"
    }
  },
  solution: {
    architecture: {
      title: "Targeted Refactoring & Minimal Surface Changes",
      description: "Implementation adheres strictly to MVVM and Clean Architecture without rewriting core business flows unnecessarily.",
      bullets: [
        "Presentation: Fix RTL layout direction, button/icon mirroring, and Figma string resources across English and Arabic.",
        "Domain & Data: Fix profile persistence repository logic, Harmful Bees dataset initialization, and OTP transient state retention.",
        "Service Layer: Audit and harden AccessibilityService checkers and system overlay triggers."
      ]
    },
    systemDesign: {
      title: "Defined Scope & Accessibility Modularization",
      description: "Development is separated into fixed UI/logic fixes and dynamic Accessibility engine auditing.",
      bullets: [
        "Defined Items (2.1 - 2.10): Fixed 4,000 EGP scope covering 10 distinct application features.",
        "Accessibility Engine (Section 3): Variable ~6,000 EGP scope covering background service lifecycle and app interception."
      ]
    },
    security: {
      title: "Protection & OTP Flow Hardening",
      description: "Enhance security UX while eliminating unnecessary friction.",
      bullets: [
        "Protection Layer: Allow feature configuration changes when disabled without forcing PIN entry.",
        "Partner Approval OTP: Retain entered OTP digits when switching away from the app.",
        "System App Exclusion: Cleanly exclude core OS packages while retaining user Google apps."
      ]
    },
    scalability: {
      title: "RTL & Multi-Language Robustness",
      description: "Ensure layout frameworks seamlessly switch between LTR and RTL directions.",
      bullets: [
        "Proper Compose / XML auto-mirroring setup for icons and navigation controls.",
        "Consistent Facebook & Instagram Reels tab redirection across English and Arabic locales."
      ]
    },
    performance: {
      title: "Notification & Service Efficiency",
      description: "Reduce OS resource consumption and improve notification discipline.",
      bullets: [
        "Limit Rafiqy system notifications to a maximum of 1 per day with enlarged, high-visibility icons.",
        "Prevent AccessibilityService freezing and optimize foreground checking overhead."
      ]
    },
    maintainability: {
      title: "Regression Testing & Quality Assurance",
      description: "Thorough testing of all affected features across devices and OS versions.",
      bullets: [
        "Verification of English and Arabic behaviors on physical test devices.",
        "Regression checks to ensure fixed-scope updates do not break existing blocking rules."
      ]
    }
  },
  techStack: [
    {
      name: "Defined Scope Fixes (Fixed 4,000 EGP)",
      skills: ["Arabic & RTL Compatibility", "Login Profile Persistence", "Harmful Bees Dataset", "Reset to Default (Figma)", "Multi-language UI & Reels", "Instagram Arabic Reels Redirect", "App Lists Filtering", "Rafiqy Notifications", "Partner Approval OTP State", "Protection Layer PIN Rules"]
    },
    {
      name: "Accessibility & Blocking (~6,000 EGP Estimate)",
      skills: ["Accessibility Permission Prompt", "Unresponsive Prompt Fixing", "Service Availability & Crash Recovery", "Re-prompting Mechanism", "FB Reels Tab Blocking (EN/AR)", "Instagram Redirect Logic", "Checker Service Audit", "Blocking Regression Testing"]
    },
    {
      name: "Core Android Technologies",
      skills: ["Kotlin", "Jetpack Compose & XML", "Android AccessibilityService", "UsageStats API", "Clean Architecture", "Room & DataStore"]
    },
    {
      name: "Tools & Testing",
      skills: ["Figma Design Alignment", "Git Branching Strategy", "Multi-Device QA", "JUnit4 & MockK"]
    }
  ],
  process: [
    {
      phase: "Phase 1",
      title: "Defined Development Scope (10 Fixes)",
      duration: "Fixed Sprint",
      description: "Execute the 10 fixed-scope items: Arabic RTL layout mirroring, Profile saving fix, Harmful Bees repopulation, Figma text updates, App list filtering, Notification scaling, OTP retention, and PIN rule adjustments."
    },
    {
      phase: "Phase 2",
      title: "Accessibility Audit & Investigation",
      duration: "Variable Effort",
      description: "Investigate AccessibilityService lifecycle, fix permission prompt freezes/unresponsiveness, implement service crash recovery, and refine Facebook/Instagram Reels redirection logic in both languages."
    },
    {
      phase: "Phase 3",
      title: "Regression Testing & Handover",
      duration: "Final Release",
      description: "Perform comprehensive testing across English and Arabic environments, verify non-system app lists, validate notification throttling, and deliver final production build."
    }
  ],
  scope: {
    included: [
      "2.1 Arabic & RTL Compatibility: Review & fix layout direction, buttons, and mirrored icons across affected screens.",
      "2.2 Login Profile: Fix saving issue for profile name and avatar updates with correct data persistence.",
      "2.3 Harmful Bees Dataset: Re-populate dataset and verify feature behavior after repopulation.",
      "2.4 Reset to Default: Update page text aligned with approved Figma designs.",
      "2.5 Multi-language & Arabic UI: Fix translation bugs, label selections, and Facebook Reels multi-language consistency.",
      "2.6 Instagram Arabic Reels: Fix flow to ensure tapping Reels tab redirects user to Home page.",
      "2.7 Application Lists: Remove system apps from Apps/Schedule/Duration while preserving user Google apps (YouTube, Chrome).",
      "2.8 Rafiqy Notifications: Increase notification icon size for visibility and throttle notifications to max 1 per day.",
      "2.9 Partner Approval OTP: Preserve entered OTP numbers when leaving and returning to the application.",
      "2.10 Protection Layer: Allow changing Protection Layer when disabled without requiring PIN.",
      "3.0 Accessibility & Blocking (Variable Scope): Audit permission prompts, freeze fixes, service crash recovery, FB/IG Reels redirection, and blocking regression testing."
    ],
    excluded: [
      "Major new feature development outside the 10 defined items and Accessibility scope.",
      "Complete codebase rewrite (work will be minimal, targeted, and architecture-preserving).",
      "Backend server migrations or third-party cloud infrastructure overhauls."
    ]
  },
  deliverables: [
    {
      title: "Defined Fixes Branch",
      description: "Clean Git commits resolving all 10 defined development scope items across UI, persistence, and RTL compatibility.",
      icon: "Code"
    },
    {
      title: "Accessibility & Blocking Engine",
      description: "Hardened AccessibilityService codebase with improved crash recovery, prompt responsiveness, and FB/IG Reels blocking.",
      icon: "Shield"
    },
    {
      title: "Tested Production APK / AAB",
      description: "Production-ready Android build thoroughly tested across English and Arabic locales.",
      icon: "Package"
    },
    {
      title: "QA & Verification Summary",
      description: "Detailed report confirming resolution of defined issues and Accessibility behavior regression checks.",
      icon: "FileText"
    },
    {
      title: "Post-Delivery Bug Warranty",
      description: "A 14-day warranty following delivery covering any regressions or bugs related to the implemented fixes.",
      icon: "CheckCircle"
    }
  ],
  timeline: [
    {
      id: "M1",
      name: "Defined Scope Fixes (10 Items)",
      duration: "4,000 EGP Fixed",
      deliverables: ["RTL Layout Fixes", "Profile Persistence", "Harmful Bees Dataset", "OTP & PIN Flow Updates"],
      completion: 0
    },
    {
      id: "M2",
      name: "Accessibility Audit & Investigation",
      duration: "Variable Scope",
      deliverables: ["Permission Prompt Fixes", "Service Crash Recovery", "Re-prompting Mechanism"],
      completion: 0
    },
    {
      id: "M3",
      name: "FB & IG Reels Blocking Refinement",
      duration: "Variable Scope",
      deliverables: ["Facebook Reels Blocking (EN/AR)", "Instagram Redirect Fixes", "Checker Service Audit"],
      completion: 0
    },
    {
      id: "M4",
      name: "Regression Testing & Handover",
      duration: "Final Release",
      deliverables: ["Dual-Language QA Pass", "Production APK", "Handover Report"],
      completion: 0
    }
  ],
  pricing: {
    baseCurrency: "EGP",
    totalCost: "10,000",
    breakdown: [
      { label: "Defined Development Scope (Fixed)", amount: "4,000", percentage: 40 },
      { label: "Accessibility & Blocking Improvements (Estimated)", amount: "6,000", percentage: 60 }
    ],
    milestones: [
      {
        label: "Defined Development Scope (Fixed Price)",
        amount: "4,000",
        percentage: 40,
        description: "Fixed price of 4,000 EGP covering all 10 defined items in Section 2 (RTL mirroring, profile save, Harmful Bees, reset text, translations, IG Reels redirect, app lists, notifications, OTP state, Protection PIN rules)."
      },
      {
        label: "Accessibility & Blocking Improvements (Estimated Budget)",
        amount: "6,000",
        percentage: 60,
        description: "Starting estimate of ~6,000 EGP (expected range: 4,000 – 8,000 EGP). Handled separately because investigation and implementation effort depends on actual technical challenges encountered."
      }
    ],
    addons: [
      {
        name: "Additional Scope Requests",
        price: "Quoted Separately",
        description: "Any functionality or requirements introduced outside the scope described in this proposal will be evaluated and quoted separately."
      }
    ],
    maintenance: [
      {
        name: "Standard Maintenance Retainer",
        price: "1,500 EGP",
        period: "month",
        details: [
          "Compatibility checks for new Android OS updates",
          "Ongoing AccessibilityService monitoring & minor adjustments",
          "Bug fixes for reported edge cases",
          "Up to 2 hours of technical support per month"
        ]
      }
    ]
  },
  whyMe: [
    {
      title: "Deep Mostaqeem Codebase Expertise",
      description: "Comprehensive experience with Mostaqeem's architecture, Accessibility Services, UsageStats engines, and security protection layers.",
      icon: "Layers"
    },
    {
      title: "Clean Architecture & Targeted Fixes",
      description: "Focus on minimal, surgical changes that solve root causes without breaking existing flows or introducing technical debt.",
      icon: "Cpu"
    },
    {
      title: "Accessibility & System Service Mastery",
      description: "Specialized experience handling complex Android system services, anti-uninstall hooks, and overlay blocking engines.",
      icon: "Shield"
    },
    {
      title: "Multi-Language & RTL Focus",
      description: "Rigorous attention to Arabic layout mirroring, font metrics, and translation accuracy across all user screens.",
      icon: "Smartphone"
    },
    {
      title: "Fair & Transparent Pricing",
      description: "Fixed pricing for predictable items (4,000 EGP) combined with flexible estimation for complex Accessibility investigation (4,000–8,000 EGP).",
      icon: "Clock"
    },
    {
      title: "Clear Communication & QA",
      description: "Direct communication with the engineer, organized PRs, and multi-device regression testing before delivery.",
      icon: "MessageSquare"
    }
  ],
  testimonials: [
    {
      quote: "Abdelrahman completely refactored our application architecture. His expertise in native Android background engines and clean state management made the product extremely stable.",
      author: "Product Lead",
      company: "Mostaqeem Partner"
    }
  ],
  faqs: [
    {
      question: "Why is the Accessibility work estimated separately from the fixed scope?",
      answer: "AccessibilityService behavior on Android is highly variable and depends on OS vendor customizations (Samsung, Xiaomi, Pixel), battery saver policies, and third-party app updates (Facebook/Instagram DOM changes). Separating it into an estimated range (4,000–8,000 EGP with a ~6,000 EGP starting budget) ensures you only pay for the actual technical effort required."
    },
    {
      question: "What is included in the 4,000 EGP fixed price?",
      answer: "All 10 defined items in Section 2: Arabic RTL layout compatibility, Profile saving fix, Harmful Bees dataset repopulation, Reset text alignment with Figma, Arabic UI translations, Instagram Arabic Reels redirect, System apps removal from lists, Rafiqy notification scaling/frequency, Partner OTP retention, and Protection Layer PIN rules."
    },
    {
      question: "How will systemic apps be handled in Application Lists?",
      answer: "Core Android system background packages will be filtered out to prevent cluttering, while user-facing Google apps (like YouTube and Google Chrome) will be preserved for blocking and schedule configuration."
    },
    {
      question: "What happens if additional issues are discovered during work?",
      answer: "Any requirement introduced outside the defined 10 items and the Accessibility scope will be discussed transparently before any work is undertaken."
    }
  ],
  terms: [
    {
      title: "Scope Boundary",
      description: "The fixed 4,000 EGP price applies strictly to the 10 defined items listed in Section 2. Accessibility investigation and fixes are billed based on actual effort within the estimated 4,000–8,000 EGP range."
    },
    {
      title: "Payment Terms",
      description: "4,000 EGP upon completion and verification of the Defined Development Scope. Accessibility work will be billed according to progress milestones agreed upon prior to Accessibility sprint kickoff."
    },
    {
      title: "Testing & Verification",
      description: "All items will undergo testing in both English and Arabic locales on physical devices before handover."
    },
    {
      title: "Intellectual Property",
      description: "100% of all code changes, fixes, and configuration updates remain the exclusive property of the client upon payment clearance."
    },
    {
      title: "Post-Delivery Warranty",
      description: "Includes a 14-day warranty following handover covering any regressions or bugs directly related to the implemented fixes."
    }
  ]
};
