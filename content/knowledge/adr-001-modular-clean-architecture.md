# ADR-001: Scale Clean Architecture Boundaries With Product Complexity

- Status: Accepted
- Decision confidence: **Strongly inferred**
- Implementation confidence: **Verified**

## Context

The five Android products range from focused taxi clients to broad education and digital-wellbeing platforms. They all require independently testable business rules, replaceable transport/persistence code, and Compose presentation state that does not depend directly on SDK clients.

## Decision

Use presentation/domain/data boundaries everywhere, then promote them to separate Gradle modules only where product size and change isolation justify it.

- Taxi client and captain: `app`, `domain`, `data`.
- Schoolie and StudentWayParent: feature-level data/domain/presentation modules plus shared core modules.
- Mostaqeem: core, feature, and dedicated service modules because persistent Android components have a distinct lifecycle and dependency graph.

## Alternatives

1. Single app module: lower initial setup, but broad dependency visibility and slower ownership scaling.
2. Maximum module granularity for every app: consistent diagrams, but unnecessary configuration and build overhead for smaller products.
3. Package-only clean architecture: useful within a small module, but cannot enforce dependency direction at build time.

## Consequences

- Domain contracts remain independent of Ktor, Firestore, Room, and Compose.
- Large products can change one feature without exposing every implementation dependency.
- Build logic and DI composition become more complex as module count grows.
- Cross-feature models require deliberate placement in core modules.

## Evidence

`settings.gradle.kts`, feature Gradle files, repository interfaces, implementations, and application DI modules in all five projects.

