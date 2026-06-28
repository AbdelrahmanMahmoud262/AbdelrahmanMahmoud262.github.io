# Architecture Asset Map

## Published Assets

| Route | Asset | Format | Status |
| --- | --- | --- | --- |
| `/patterns/` | Pattern catalog grid and project comparison matrix | Native HTML/CSS | Implemented |
| `/patterns/#adr-*` | Four decision records | Native HTML/CSS | Implemented |
| Mostaqeem article | Two-engine detection flow | Mermaid source in MDX | Implemented |
| Mostaqeem article | Session state machine | Mermaid source in MDX | Implemented |
| Schoolie article | Registry-to-runtime configuration flow | Mermaid source in MDX | Implemented |
| Taxi client article | Three-signal dispatch resolution | Mermaid source in MDX | Implemented |
| Taxi captain article | Firestore/Ktor/Room reconciliation | Mermaid source in MDX | Implemented |
| StudentWay article | Room Paging and RemoteMediator flow | Mermaid source in MDX | Implemented |

## Recommended Visual Replacements

The current MDX renderer presents Mermaid definitions as reviewable code blocks. Replace them with rendered diagrams only when the renderer can preserve accessibility, static export, and dark-theme contrast.

1. **Two-engine blocking system**
   - Placement: Mostaqeem article after "Why Two Detection Engines Exist".
   - Nodes: UsageStats, foreground loop, rule engine, accessibility events, classifiers, overlay.
   - Accent: cyan for polling, amber for event-driven interception.

2. **Schoolie configuration pipeline**
   - Placement: Schoolie article after "Compile-Time Identity, Runtime Policy".
   - Nodes: client registry, Gradle flavors, BuildConfig, configuration resolvers, composition locals.
   - Show 18 as a registry count, not a hardcoded flavor count.

3. **Taxi passenger dispatch race**
   - Placement: passenger article after "Three Signals Race to Resolve Search".
   - Nodes: driver acceptance document, trip-ended document, backend poll, `take(1)`, active/rejected states.

4. **Captain reconciliation loop**
   - Placement: captain article after "TripSyncManager Reconciles Room".
   - Nodes: Firestore driver document, ID diff, Ktor fetch, active/candidate DAOs, UI/overlay.

5. **StudentWay message read model**
   - Placement: StudentWay article after "Messaging Uses Room as the Paging Source".
   - Nodes: Compose, Pager, Room PagingSource, RemoteMediator, Ktor.

## Open Asset Work

- [ ] Capture sanitized application screenshots from the source apps.
- [ ] Produce route-specific OG images for `/patterns/` and each rewritten article.
- [ ] Render diagrams to accessible SVG or canvas only after verifying static export support.
- [ ] Add captions that identify Verified versus Strongly inferred conclusions.

