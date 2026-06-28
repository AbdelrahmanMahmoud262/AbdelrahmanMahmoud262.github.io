# Verified Technical Model - Mostaqeem Android Project

This document provides a verified architectural model of the Mostaqeem Android project, reverse-engineered from the codebase located at `D:\Projects\Clients\Mostaqeem`. Every detail has been cross-referenced with the source code.

---

## 1. Module Structure and Dependencies

The project uses Kotlin DSL (`build.gradle.kts` and `settings.gradle.kts`) and is structured into multiple core, feature, and service modules:

### Included Modules (`settings.gradle.kts`)
*   **App Module**: `:app`
*   **Core Modules**:
    *   `:core:common`: Utility extension functions, permission utilities, and constants.
    *   `:core:domain`: Main domain entities and UseCases (auth, apps, domains, schedules, analytics).
    *   `:core:data`: Main data repositories, local Room database, migrations, and remote source integrations.
    *   `:core:models`: Hilt model classes (e.g., `ProtectionAction`).
    *   `:core:ui`: Common Compose UI theme elements, common layouts, and the shared `BlockScreen`.
*   **Feature Modules**:
    *   `:feature:home`: Core user features (App Blocking, reels, schedule, limits screens, and view models).
    *   `:feature:guardian`: Guardian protection controls.
    *   `:feature:gifts`: Reward system screen.
    *   `:feature:statistics`: Digital Wellbeing dashboard showing aggregates.
    *   `:feature:settings`: General application configurations.
    *   `:feature:onboarding`: User onboarding walkthrough.
    *   `:feature:auth`: Signup, login, OTP authentication flows.
    *   `:feature:protection`: Protection layer verification dialogs/activities.
    *   `:feature:service`: Accessibility-based fine-grained URL and Reels blocker.
*   **Service Modules**:
    *   `:service:main`: Main polling-based foreground service, workers, overlay launcher, and session tracking.
    *   `:service:domain`: Interfaces and models for rule evaluation, foreground repositories, and use cases.
    *   `:service:data`: Implemented collectors (duration, schedule, app list) and repositories.
*   **Shared Modules**:
    *   `:shared:test`: Testing utilities.

```mermaid
graph TD
    subgraph App
        AppM[":app"]
    end
    
    subgraph Feature Layers
        F_Home[":feature:home"]
        F_Serv[":feature:service"]
        F_Auth[":feature:auth"]
        F_Settings[":feature:settings"]
        F_Stats[":feature:statistics"]
        F_Guardian[":feature:guardian"]
        F_Gifts[":feature:gifts"]
        F_Onboard[":feature:onboarding"]
        F_Protect[":feature:protection"]
    end
    
    subgraph Service Layer
        S_Main[":service:main"]
        S_Data[":service:data"]
        S_Domain[":service:domain"]
    end

    subgraph Core Shared
        C_Common[":core:common"]
        C_UI[":core:ui"]
        C_Data[":core:data"]
        C_Domain[":core:domain"]
        C_Models[":core:models"]
    end

    AppM --> F_Home & F_Serv & F_Auth & F_Settings & F_Stats & F_Guardian & F_Gifts & F_Onboard & F_Protect
    AppM --> S_Main
    
    F_Home --> C_Common & C_UI & C_Data & C_Domain & C_Models
    F_Serv --> C_Common & C_UI & C_Data & C_Domain
    S_Main --> S_Domain & C_Domain & C_UI
    S_Data --> S_Domain & C_Domain
    S_Domain --> C_Domain
```

---

## 2. Layer Boundaries (Clean Architecture)

The codebase strictly segregates responsibilities across clean boundaries, utilizing Hilt for dependency injection:

### UI / Presentation Layer
*   **Location**: Inside individual `:feature` subdirectories (e.g. `feature/home/src/main/java/com/mostaqeem/feature/home/apps`).
*   **Components**: Jetpack Compose Screens (e.g., `AppsScreen.kt`) and Jetpack Lifecycle ViewModels (e.g., `AppsViewModel.kt`). Communication is event-driven via Kotlin StateFlows (`AppsUiState`) and events (`AppsUiEvent`).

### Domain Layer
*   **Location**: `core/domain` and `service/domain`.
*   **Components**: Plain Kotlin structures without Android framework dependencies. Contains repository interfaces (e.g., `AppsRepository`, `AppForegroundRepository`), data models (e.g., `EvaluationContext`, `BlockingDecision`), and UseCases (e.g., `EvaluateBlockingStateUseCase`).

### Data Layer
*   **Location**: `core/data` and `service/data`.
*   **Components**: Implementation of repository interfaces, local databases (`MosDatabase` via Room version 3), Room DAOs (e.g., `AppsDao`), migrations (`MIGRATION_2_3`), and network services.

---

## 3. Foreground Service and System Configurations

The background architecture is composed of two independent engines to bypass system constraints and execute persistent monitoring.

### Engine A: Polling Foreground Service (`:service:main`)
*   **Class Name**: `com.mostaqeem.service.main.Service` (extends `LifecycleService`).
*   **Lifecycle**: Started as a foreground service using `ContextCompat.startForegroundService` and `ServiceStarter.startService`.
*   **Foreground Registration**: Registered in `service/main/src/main/AndroidManifest.xml` with `android:foregroundServiceType="specialUse"` and property sub-type `Using Usage Stats...`. It calls `startForeground()` inside `onStartCommand` using notifications created by `ServiceNotificationManager`.
*   **Polling Loop**: Polling is executed by `AppForegroundRepositoryImpl` inside an infinite `while(true)` loop running on `Dispatchers.IO` with a `POLL_INTERVAL_MS` of **300ms**.
*   **System Permissions**: Assured by `PermissionChecker` checking for `android.permission.PACKAGE_USAGE_STATS` (UsageStatsManager) and `android.permission.SYSTEM_ALERT_WINDOW` (Overlay).
*   **Session Tracking System**: Managed by `SessionTrackingManager`. It listens to the foreground package flow, records session starts/stops in the local DB (`usageTrackingRepository`), and filters out launcher apps and system packages via a hardcoded blacklist `isLauncherOrSystemApp(packageName)`.

### Engine B: Accessibility Service (`:feature:service`)
*   **Class Name**: `com.mostaqeem.feature.service.MosAccessibilityService` (extends `AccessibilityService`).
*   **Registration**: Registered in `feature/service/src/main/AndroidManifest.xml` requiring `android.permission.BIND_ACCESSIBILITY_SERVICE` and configuration metadata `@xml/accessibilityservice`.
*   **Event Handling**: Handles `AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED`, `TYPE_WINDOW_STATE_CHANGED`, and `TYPE_VIEW_TEXT_CHANGED` by invoking `resolveWindowStateChangeEvent(event)` inside the injected CoroutineScope.
*   **Browser Interception**: Reads omnibar text views dynamically via browser configurations (`SupportedBrowserConfig`). Supports 14+ browsers (Chrome, Firefox, DuckDuckGo, Brave, etc.) mapping their package names to their address bar IDs (e.g., `com.android.chrome:id/url_bar`). If the normalized domain belongs to `blockedDomains` or is marked as harmful in `HarmfulRepository`, it redirects the tab to `Constants.DEFAULT_BROWSER_SAFE_URL` (blank page) and launches `OverlayActivity`.
*   **Social Media Classifiers**:
    *   `FacebookChecker`: Checks for ViewPager classes, Reels tabs, and text fields in Arabic/English to isolate Reels and Videos while bypassing Stories.
    *   `InstagramChecker`: Checks for `$PKG:id/clips_video_container` and reels viewer layouts. Mutes the system volume stream (`STREAM_MUSIC`) if the user is on the main Home Feed to block sound on autoplays.
    *   `TikTokChecker`: Inspects obfuscated nodes for "aweme" IDs and vertical viewpagers.
    *   `checkYoutubeContent`: Detects Youtube Shorts by checking for `reel_recycler` view IDs.
*   **Leaving Blocked Content**: Triggers a global back action (`GLOBAL_ACTION_BACK`) to pop out of Reels layouts.

### Background Execution & Battery Settings
*   **Worker Keep-Alive**: `ServiceCheckerWorker` executes a periodic work request every **16 minutes** (`WorkerStarter.startServiceCheckerWorker`) to ensure the foreground service is restarted if killed by the OS.
*   **Boot Recovery**: `BootCompletedReceiver` launches the foreground service and registers the WorkManager keep-alive worker immediately on `ACTION_BOOT_COMPLETED`.
*   **Doze Mode Bypass**: `PermissionsBottomSheet` prompts the user to grant `Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` for the app to ignore system battery saver throttling.

---

## 4. App Blocking Engine Flow

The blocking execution flows sequentially through the Clean Architecture boundaries:

### Flow 1: Foreground Service Polling (Main App Blocker)
```mermaid
sequenceDiagram
    autonumber
    participant System as Android OS (UsageStats)
    participant Rep as AppForegroundRepositoryImpl
    participant UC as EvaluateBlockingStateUseCase
    participant Coll as App/Duration/Schedule Collectors
    participant Serv as Service (main)
    participant Act as OverlayActivity (main)

    Note over Rep: Loops every 300ms
    Rep->>System: queryEvents(Lookback: 2000ms)
    System-->>Rep: UsageEvents list
    Rep->>Rep: Filter for ACTIVITY_RESUMED / MOVE_TO_FOREGROUND
    Rep-->>UC: Emit foreground packageName
    
    activate UC
    UC->>Coll: Match against combined active rules
    Note over Coll: Rules evaluate time, duration, and blacklist
    Coll-->>UC: Return matching rule (if any)
    
    alt Rule Matched (Block)
        UC->>Serv: Emit BlockingDecision.Block(packageName)
        deactivate UC
        Serv->>Act: Start Activity (FLAG_ACTIVITY_NEW_TASK)
        activate Act
        Act->>Act: Render BlockScreen (Compose UI)
        Note over Act: User attempts Backpress
        Act->>System: Redirect to Device Launcher Home
        deactivate Act
    else No Rule Matched (Unblock)
        UC-->>Serv: Emit BlockingDecision.UnBlock
    end
```

### Flow 2: Accessibility Interception (Reels & URL Blocker)
```mermaid
sequenceDiagram
    autonumber
    participant System as Android Accessibility System
    participant Serv as MosAccessibilityService
    participant Check as Classifiers (Facebook/Instagram/TikTok)
    participant Act as OverlayActivity (feature/service)

    System->>Serv: onAccessibilityEvent(event)
    Note over Serv: Event is state/content/text change
    
    alt Event is Browser URL Change
        Serv->>Serv: captureUrl() using SupportedBrowserConfig
        Note over Serv: Delay 500ms to verify URL stability
        Serv->>Serv: query HarmfulRepository / blockedDomains
        alt URL is blocked/harmful
            Serv->>System: Redirect tab to safe URL (blank page)
            Serv->>Act: Start OverlayActivity (BlockType.Websites)
        end
    else Event is Social Media App Event
        Serv->>Check: classifyScreen(rootNode)
        alt Reels / Shorts Visible
            Check-->>Serv: Classifies as Screen.Reels
            Serv->>System: performGlobalAction(GLOBAL_ACTION_BACK)
            Serv->>Act: Start OverlayActivity (BlockType.Reels)
            activate Act
            Act->>Act: Render BlockScreen (Compose UI)
            deactivate Act
        end
    end
```

### Flow 3: Session Tracking State Machine
```mermaid
stateDiagram-v2
    [*] --> Idle: Service Started
    
    Idle --> AppOpened: Foreground app changes (not launcher/system)
    state AppOpened {
        [*] --> StartSession: usageTrackingRepository.startSession()
        StartSession --> RecordEvent: recordEvent(UsageEventType.APP_OPENED)
    }
    
    AppOpened --> Heartbeat: Same app remains active
    Heartbeat --> AppOpened: Update lastActiveTimestamp
    
    AppOpened --> AppClosed: Foreground app changes to launcher/system/other app
    state AppClosed {
        [*] --> EndSession: usageTrackingRepository.endSession()
        EndSession --> RecordCloseEvent: recordEvent(UsageEventType.APP_CLOSED)
    }
    AppClosed --> Idle
```

---

## 5. Technical Debt and Trade-offs

During analysis, several technical trade-offs, security implications, and design boundaries were identified:

1.  **UsageStatsManager Polling vs. Event-Driven Performance**: 
    *   *Trade-off*: Polling the foreground package name every 300ms consumes continuous CPU cycles and battery.
    *   *Alternative*: While the accessibility service is event-driven, it relies on complex accessibility tree traversals that can also cause UI stutters.
2.  **Duplicated Overlay Activities**:
    *   *Trade-off*: The app contains two separate implementations of `OverlayActivity` (one in `:service:main` and one in `:feature:service`), loading different layouts but sharing dismissal behavior. This introduces redundancy.
3.  **Fragility of View ID Scans**:
    *   *Trade-off*: Social media checkers search for hardcoded view IDs (e.g., `clips_video_container` for Instagram, `reel_recycler` for YouTube). If these platforms update their obfuscated resource names, the blocking engine will fail silently until an app update is released.
4.  **Security Bypass in Overlay Dismissal**:
    *   *Trade-off*: The overlay intercepts back presses, but it delegates closing by posting a delayed runnable (`Handler.postDelayed`) checking `isFinishing`. A fast user interaction or custom task-manager swipe can occasionally terminate the overlay task, rendering the blocked app visible.
