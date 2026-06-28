# ADR-004: Generate White-Label Variants From a Client Registry

- Status: Accepted for Schoolie
- Decision confidence: **Strongly inferred**
- Implementation confidence: **Verified**

## Context

Schoolie ships multiple branded applications from one product codebase. Hardcoded Gradle flavor blocks and per-brand branches would duplicate configuration and make additions error-prone.

## Decision

Maintain client identity, application suffix, version, and type in `clients/clients.json`. Parse that registry during Gradle configuration to register product flavors and emit `CLIENT_ID` and `APP_TYPE` into `BuildConfig`.

At runtime, `AppConfiguration` resolves branding, theme, and feature configuration. Keep Firebase application records consolidated when they share the same Firebase project.

The verified registry contains 18 clients.

## Alternatives

1. One branch per client: isolates releases but multiplies merge and drift cost.
2. Hardcoded Gradle flavors: workable for a few brands, but duplicates structured data.
3. Runtime-only branding in one package: cannot provide distinct store identities and application IDs.

## Consequences

- Adding a client is primarily a data/configuration change.
- Compile-time app identity remains separate from runtime feature and theme selection.
- Invalid registry values can fail or misconfigure many variants, so schema validation and CI variant checks are important next steps.
- Repository CI automation is not currently present and must not be claimed.

## Evidence

Schoolie `clients/clients.json`, `app/build.gradle.kts`, `Schoolie.kt`, `AppConfiguration`, configuration classes, and consolidated `google-services.json`.

