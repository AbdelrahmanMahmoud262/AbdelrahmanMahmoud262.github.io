# ADR-002: Use Local-First Read Models Selectively

- Status: Accepted with constraints
- Decision confidence: **Strongly inferred**
- Implementation confidence: **Verified by domain**

## Context

Mobile screens need stable rendering during network loss and realtime transport changes. Some workflows also need optimistic feedback or process-death recovery. Treating the network response as UI state makes those workflows fragile.

## Decision

Use Room as the observable read model for domains where stale data is useful or continuity matters. Synchronize it from HTTP/realtime sources, but do not label an entire product offline-first unless every required workflow has durable write and conflict behavior.

Verified applications:

- StudentWayParent students and messages.
- Captain active/candidate trips.
- Schoolie upload/feed/conversation queues.
- Mostaqeem rules and usage sessions.

NationalTaxi's active-trip table remains dormant and is not part of this decision's active implementation.

## Alternatives

1. Network-only UI state: simpler, but blank or unstable screens on transient failure.
2. Cache raw HTTP responses: easy persistence, but weak query and invalidation semantics.
3. Universal offline write queue: strongest continuity, but requires conflict policies and operational tooling that several domains do not yet implement.

## Consequences

- UI observes stable Flow/Paging sources.
- Optimistic actions can expose pending and failed states.
- Realtime and HTTP events need deterministic merge rules.
- Schema migrations become production-critical; destructive fallback must be removed before making durability guarantees.

## Evidence

Room databases/DAOs, StudentWayParent `MessagesRemoteMediator`, `StudentsRepositoryImpl`, Captain `TripSyncManager`, and the verified Schoolie/Mostaqeem models.

