# Cross-Project Engineering Pattern Catalog

Evidence set: five verified technical models in `content/knowledge`.

Confidence labels:

- **Verified**: directly represented in source files.
- **Strongly inferred**: the implementation supports the conclusion, but design intent is not recorded.
- **Unable to verify**: excluded from public claims until evidence exists.

## Portfolio Matrix

| Project | Modular boundary | DI | Network/realtime | Local state | Long-running work |
| --- | --- | --- | --- | --- | --- |
| Mostaqeem | Core, feature, and service modules | Hilt | Ktor/network services, UsageStats polling, Accessibility events | Room rules and usage sessions | Foreground service, AccessibilityService, WorkManager, boot receiver |
| Schoolie | App, core, shared, and feature layer modules | Koin annotations | Ktor | Room v12, upload/feed queues | Foreground WorkManager workers |
| StudentWayParent | 45 modules with feature data/domain/presentation layers | Koin annotations | Ktor, Firebase RTDB, Pusher | Room v6, Paging RemoteMediator, optimistic chat rows | App-scope sync; no verified periodic cache worker |
| NationalTaxi client | App/domain/data | Koin | Ktor, Firestore, 30-second HTTP fallback poll | Room active-trip schema is present but unused | No registered app foreground service |
| National Taxi Captain | App/domain/data | Koin | Ktor, Firestore | Room active/candidate trip read model | Location/sync foreground service and system overlays |

## Pattern 1: Modular Clean Boundaries

**Confidence: Verified across all five projects.**

All projects separate presentation, domain contracts, and infrastructure, but the granularity is contextual:

- Mostaqeem isolates core, product feature, and persistent-service concerns.
- Schoolie and StudentWayParent enforce feature-level Gradle modules with data/domain/presentation submodules.
- The Taxi client and captain use a simpler three-module app/domain/data split.

This is not one template copied everywhere. Module count tracks product breadth and independent change pressure.

## Pattern 2: Realtime Signals Plus Authoritative Fetch

**Confidence: Verified in StudentWayParent and both Taxi apps.**

Realtime channels carry small invalidation or state signals; HTTP carries complete payloads:

- StudentWayParent: Firebase RTDB streams driver location after Ktor supplies tracking configuration; Pusher events are cached into Room.
- NationalTaxi: Firestore signals driver acceptance, search termination, status, and location; Ktor supplies trip details and route-related data.
- Captain: Firestore supplies assigned trip IDs; `TripSyncManager` fetches full `TripDto` values with Ktor and writes them into Room.

This limits document-listener payloads and keeps API mapping centralized, at the cost of coordinating two transports.

## Pattern 3: Local Database as a Read Model

**Confidence: Verified in Mostaqeem, Schoolie, StudentWayParent, and Captain; not active in NationalTaxi client.**

- Mostaqeem persists rules and usage sessions used by the blocking and statistics engines.
- Schoolie persists feed, conversation, upload, and queue state.
- StudentWayParent exposes students and messages from Room Flows; message paging is Room-backed.
- Captain reconciles Firestore assignment IDs into Room trip payloads consumed by UI and overlays.
- NationalTaxi defines an active-trip entity and DAO, but the flow does not call them.

The evidence supports "local-first reads" for specific domains, not a blanket claim that every app is fully offline-first.

## Pattern 4: Optimistic State With Explicit Failure

**Confidence: Verified in StudentWayParent messaging.**

`MessagesRepositoryImpl.sendTextMessage()` writes a local pending row, updates the conversation preview, replaces it after success, or marks it failed with a reason. The implementation provides immediate UI feedback and preserves failure visibility, but does not include an automatic durable retry worker.

## Pattern 5: Foreground Execution Around User-Visible Value

**Confidence: Verified in Mostaqeem and Captain; verified in narrower worker form in Schoolie.**

- Mostaqeem continuously evaluates foreground apps and uses a persistent notification; an AccessibilityService handles content-level interception.
- Captain runs only while the driver is online, publishes location, reconciles requests, and provides background overlays.
- Schoolie elevates upload/feed workers while the user-visible operation is active.

Mostaqeem includes WorkManager keep-alive and boot recovery. Captain deliberately or incidentally has a weaker recovery boundary: no boot receiver, no sticky restart, and no retry on terminated streams.

## Pattern 6: State Machines at External-System Boundaries

**Confidence: Verified.**

- Mostaqeem: Idle, AppOpened, Heartbeat, and AppClosed usage sessions.
- StudentWayParent: Connecting, Reconnecting, Disconnected, and active live tracking.
- NationalTaxi: Draft, Searching, active ride statuses, Finished/Canceled.
- Captain: Offline/Online availability plus candidate request and active-trip reconciliation.

Explicit state models isolate asynchronous platform or backend events from Compose rendering.

## Pattern 7: White-Label Configuration as Data

**Confidence: Verified only in Schoolie.**

Schoolie parses `clients/clients.json` during Gradle configuration to register 18 client flavors. Generated `BuildConfig` values select runtime branding, theme, and feature configuration. A consolidated Firebase file contains the known application IDs.

No repository CI pipeline was found, so build/distribution automation beyond Gradle flavor creation is unable to verify.

## Pattern 8: Destructive Migration as a Shared Risk

**Confidence: Verified in Schoolie, StudentWayParent, NationalTaxi, and Captain.**

Each inspected Room builder uses `fallbackToDestructiveMigration(true)`. This is low-friction during active schema development, but it is incompatible with strong durability claims for queues, optimistic writes, or active-trip recovery unless explicit migrations replace it.

## Comparative Review: Passenger vs Driver Taxi State

| Concern | NationalTaxi client | National Taxi Captain |
| --- | --- | --- |
| Realtime source | Firestore driver/trip documents | Firestore driver assignment document |
| Full payload source | Ktor | Ktor |
| Local read model | Declared but unused Room active-trip table | Active and candidate Room tables used by service/UI |
| Location direction | Reads driver location | Uploads driver location over HTTP |
| Background execution | No registered product foreground service | Location/sync foreground service while online |
| Terminal recovery | First of Firestore or 30-second backend poll | Firestore reconciliation after app/service start |

## Comparative Review: Schoolie vs StudentWayParent Sync

| Concern | Schoolie | StudentWayParent |
| --- | --- | --- |
| Queue workers | Upload, post queue, reaction sync | None verified for cache/message retry |
| Cache trigger | Feature workers and repositories | Authenticated account change plus screen refresh |
| Paging read model | Room entities exist across features | Messages use verified `RemoteMediator` + Room Paging source |
| Migration policy | Destructive fallback | Destructive fallback |

## Claims Excluded From Publication

- WebSocket transport in either Taxi app.
- Sub-second captain GPS updates, WakeLocks, adaptive tracking intervals, or sticky service restart.
- Full offline booking and background booking retry in StudentWayParent.
- Schoolie tag-triggered CI/CD or more than the 18 clients present in `clients.json`.
- Business outcome metrics not present in source or supplied as separate evidence.

