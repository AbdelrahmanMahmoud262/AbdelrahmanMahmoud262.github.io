# ADR-003: Bind Foreground Services to Explicit Online or Protection State

- Status: Accepted
- Decision confidence: **Strongly inferred**
- Implementation confidence: **Verified**

## Context

Android restricts background execution, but digital protection and driver dispatch lose their product value if monitoring stops when the UI is backgrounded.

## Decision

Run persistent work in a foreground service only while a user-visible persistent mode is active:

- Mostaqeem: protection/service mode evaluates the foreground app and tracks sessions.
- Captain: online availability starts location and trip synchronization; offline availability or logout stops it.

Use WorkManager for bounded or periodic recovery work, and AccessibilityService only for content interception that requires accessibility events.

## Alternatives

1. Activity/ViewModel collection: lifecycle-safe but stops when the UI is gone.
2. Periodic WorkManager only: durable scheduling, but intervals are too coarse for blocking and dispatch.
3. Always-on service: simpler state, but wastes battery and violates user expectation when the mode is inactive.

## Consequences

- A persistent notification communicates ongoing work.
- Location, overlay, and service permissions become part of the product flow.
- Recovery must be designed separately. Mostaqeem includes boot/worker recovery; Captain currently depends on app launch and lacks stream retries.
- OEM power management still requires field validation.

## Evidence

Mostaqeem `Service`, `ServiceCheckerWorker`, `BootCompletedReceiver`, and `MosAccessibilityService`; Captain `DriverServiceController`, `DriverForegroundService`, and manifest service declaration.

