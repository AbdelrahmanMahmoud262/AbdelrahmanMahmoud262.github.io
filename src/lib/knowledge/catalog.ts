export type Confidence = "Verified" | "Strongly inferred";

export interface EngineeringPattern {
  id: string;
  index: string;
  title: string;
  confidence: Confidence;
  summary: string;
  projects: string[];
  evidence: string;
  accent: "cyan" | "amber";
}

export interface ArchitectureDecision {
  id: string;
  number: string;
  title: string;
  status: string;
  confidence: Confidence;
  decision: string;
  consequence: string;
  projects: string[];
  patternIds: string[];
}

export const ENGINEERING_PATTERNS: EngineeringPattern[] = [
  {
    id: "modular-clean-boundaries",
    index: "P-01",
    title: "Modular clean boundaries",
    confidence: "Verified",
    summary:
      "Presentation, domain contracts, and infrastructure stay separate while module granularity scales with product breadth.",
    projects: ["Mostaqeem", "Schoolie", "StudentWay", "Taxi Client", "Taxi Captain"],
    evidence: "5/5 codebases",
    accent: "cyan",
  },
  {
    id: "realtime-authoritative-fetch",
    index: "P-02",
    title: "Realtime signal, authoritative fetch",
    confidence: "Verified",
    summary:
      "Firestore, Firebase RTDB, or Pusher carries a small state signal; Ktor retrieves or mutates the complete domain payload.",
    projects: ["StudentWay", "Taxi Client", "Taxi Captain"],
    evidence: "3 transport pairs",
    accent: "amber",
  },
  {
    id: "local-read-model",
    index: "P-03",
    title: "Room as a local read model",
    confidence: "Verified",
    summary:
      "Room-backed Flows stabilize screens and service state. Durability claims remain scoped to the domains that actually use their DAOs.",
    projects: ["Mostaqeem", "Schoolie", "StudentWay", "Taxi Captain"],
    evidence: "4 active implementations",
    accent: "cyan",
  },
  {
    id: "explicit-state-machines",
    index: "P-04",
    title: "Explicit async state machines",
    confidence: "Verified",
    summary:
      "External platform and backend events are reduced into named states before Compose renders them.",
    projects: ["Mostaqeem", "StudentWay", "Taxi Client", "Taxi Captain"],
    evidence: "4 lifecycle models",
    accent: "amber",
  },
  {
    id: "foreground-execution",
    index: "P-05",
    title: "Mode-bound foreground execution",
    confidence: "Verified",
    summary:
      "Persistent work runs only while protection, upload, or driver-online value is visible to the user.",
    projects: ["Mostaqeem", "Schoolie", "Taxi Captain"],
    evidence: "3 execution models",
    accent: "cyan",
  },
  {
    id: "white-label-registry",
    index: "P-06",
    title: "White-label configuration as data",
    confidence: "Verified",
    summary:
      "A client registry generates Gradle variants; runtime configuration resolves branding, theme, and feature policy.",
    projects: ["Schoolie"],
    evidence: "18 configured clients",
    accent: "amber",
  },
];

export const ARCHITECTURE_DECISIONS: ArchitectureDecision[] = [
  {
    id: "adr-001-modular-clean-architecture",
    number: "ADR-001",
    title: "Scale clean boundaries with product complexity",
    status: "Accepted",
    confidence: "Strongly inferred",
    decision:
      "Keep presentation, domain, and data boundaries universal; create finer Gradle modules only where ownership and change isolation justify them.",
    consequence:
      "Dependency direction is enforceable, while larger products absorb additional build and DI composition cost.",
    projects: ["All five projects"],
    patternIds: ["modular-clean-boundaries"],
  },
  {
    id: "adr-002-local-first-read-models",
    number: "ADR-002",
    title: "Use local-first read models selectively",
    status: "Accepted with constraints",
    confidence: "Strongly inferred",
    decision:
      "Persist domains where stale data or continuity has value. Do not describe a whole product as offline-first without durable writes and conflict rules.",
    consequence:
      "Screens stay stable through network changes, but schema migrations become part of the product reliability contract.",
    projects: ["Mostaqeem", "Schoolie", "StudentWay", "Taxi Captain"],
    patternIds: ["local-read-model"],
  },
  {
    id: "adr-003-foreground-services",
    number: "ADR-003",
    title: "Bind foreground work to explicit user state",
    status: "Accepted",
    confidence: "Strongly inferred",
    decision:
      "Start persistent services only for protection mode or online driver mode; use bounded workers for recoverable jobs.",
    consequence:
      "Battery and permission costs are explainable, but each service needs a separate restart and stream-recovery design.",
    projects: ["Mostaqeem", "Schoolie", "Taxi Captain"],
    patternIds: ["foreground-execution", "explicit-state-machines"],
  },
  {
    id: "adr-004-white-label-flavors",
    number: "ADR-004",
    title: "Generate variants from a client registry",
    status: "Accepted for Schoolie",
    confidence: "Strongly inferred",
    decision:
      "Parse one client registry during Gradle configuration and resolve branding, themes, and feature policy from generated identity fields.",
    consequence:
      "Client onboarding becomes configuration work; schema validation and full variant CI remain required safeguards.",
    projects: ["Schoolie"],
    patternIds: ["white-label-registry"],
  },
];

export const PROJECT_MATRIX = [
  { project: "Mostaqeem", boundary: "Core / feature / service", realtime: "UsageStats + accessibility events", local: "Room rules and sessions", runtime: "FGS + worker + boot" },
  { project: "Schoolie", boundary: "Core + layered features", realtime: "Ktor", local: "Room queues", runtime: "Foreground workers" },
  { project: "StudentWay", boundary: "45 Gradle modules", realtime: "Firebase RTDB + Pusher", local: "Room + Paging", runtime: "App-scope sync" },
  { project: "Taxi Client", boundary: "App / domain / data", realtime: "Firestore + HTTP poll", local: "Dormant trip DAO", runtime: "UI lifecycle" },
  { project: "Taxi Captain", boundary: "App / domain / data", realtime: "Firestore + Ktor", local: "Room trip read model", runtime: "Location FGS" },
] as const;

