# Portfolio Screenshot Checklist

Use production or sanitized staging data only. Do not expose tokens, phone numbers, precise user locations, school identities, or private repository paths.

## Knowledge Platform

- [ ] Desktop `/patterns/` at 1440x900: hero, evidence counters, and first pattern row.
- [ ] Mobile `/patterns/` at 390x844: hero, counters, and first pattern card with no horizontal overflow.
- [ ] Pattern comparison matrix showing the five-project rows.
- [ ] ADR section with ADR-001 through ADR-004 visible.
- [ ] Command palette search for `Architecture Decisions` showing four ADR results.

## Mostaqeem / Rafiqy

- [ ] Protection status screen with personal data removed.
- [ ] App rule configuration and schedule editor.
- [ ] Statistics/session view using seeded or anonymized data.
- [ ] Android foreground-service notification.
- [ ] Accessibility permission flow; do not include unrelated installed apps.

Annotation focus: distinguish the 300ms UsageStats engine from the event-driven accessibility engine.

## Schoolie

- [ ] Two builds from different verified client flavors showing distinct branding.
- [ ] `clients/clients.json` excerpt with client names anonymized if required.
- [ ] Gradle variant list proving generated flavor names.
- [ ] Compose screen reading runtime branding and feature configuration.
- [ ] Upload or queued-post foreground worker notification.

Annotation focus: compile-time identity versus runtime policy. Do not imply a CI pipeline that is not checked into the repository.

## StudentWayParent

- [ ] Student selector populated from the shared Room cache.
- [ ] Conversation history after network loss.
- [ ] Pending and failed optimistic message states.
- [ ] Live tracking Connecting and Reconnecting states.
- [ ] Firebase-driven vehicle marker with route and personal location sanitized.

Annotation focus: messages use `RemoteMediator`; transportation does not.

## NationalTaxi Client

- [ ] Trip creation step sequence.
- [ ] Searching state before driver acceptance.
- [ ] Active trip states: OnTheWay, Arrived, Started, Finished.
- [ ] Route/marker changes for pickup versus destination.
- [ ] A diagram capture of the three terminal search signals.

Annotation focus: Firestore signals plus 30-second backend fallback. Do not present the dormant Room DAO as active recovery.

## National Taxi Captain

- [ ] Online/offline driver availability control.
- [ ] Foreground service notification while online.
- [ ] Candidate trip carousel backed by Room.
- [ ] Incoming trip system overlay while the app is backgrounded.
- [ ] Floating launcher overlay.
- [ ] Active trip after Firestore-to-Ktor-to-Room reconciliation.

Annotation focus: 10-second/100-meter fused location request and HTTP upload. Do not label the transport as WebSocket.

## Capture Quality

- [ ] Use the same device frame and pixel density across each project set.
- [ ] Keep system clock, battery, and network indicators consistent.
- [ ] Confirm all text remains readable at the final publishing size.
- [ ] Include descriptive alt text for each published image.
- [ ] Export WebP for UI captures and PNG only when lossless text detail is required.

