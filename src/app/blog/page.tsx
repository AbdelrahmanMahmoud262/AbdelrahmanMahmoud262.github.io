"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Share2, CornerDownRight } from "lucide-react";
import { BLOG_POSTS } from "@/constants";

// Complete articles text representing Abdelrahman's technical writing
const ARTICLES_CONTENT: Record<string, { title: string; date: string; readTime: string; category: string; content: React.ReactNode }> = {
  "mostaqeem-blocking-service-architecture": {
    title: "Deep Dive: Architecting a Low-Latency Foreground App Blocker & Session Tracker in Mostaqeem",
    date: "June 28, 2026",
    readTime: "12 min read",
    category: "Android",
    content: (
      <div className="space-y-6">
        <p>
          Building a robust app blocker and screen time tracker on Android is challenging due to strict OEM battery management, OS restrictions on background operations, and the deprecation of traditional APIs. In <strong>Mostaqeem</strong>, we architected a highly efficient system that polls active applications, tracks user session bounds, and intercepts usage via a system overlay.
        </p>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// The Architecture: LifecycleService & Coroutine Flow Pipeline"}</h3>
        <p>
          At the core is <code>com.mostaqeem.service.main.Service</code>, a Hilt-injected <code>LifecycleService</code>. By extending <code>LifecycleService</code>, we gain access to a <code>lifecycleScope</code> that automatically binds background polling jobs to the service&apos;s lifecycle, eliminating coroutine leaks on service termination:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`override fun onCreate() {
    super.onCreate()
    registerUserPresentReceiver()
    sessionTrackingManager.startTracking(lifecycleScope)
    startAppsCollection()
}`}
        </pre>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Deep Dive: Low-Latency Polling via AppForegroundRepository"}</h3>
        <p>
          Instead of running heavy background loops, we designed <code>AppForegroundRepositoryImpl</code>. It polls the current foreground package name every 300ms. Standard <code>UsageStatsManager.queryUsageStats</code> is slow and resource-heavy, so we use <code>UsageEvents</code> which records discrete transitions and fallback to daily stats if empty:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`private fun resolveForegroundPackage(): String? {
    if (!PermissionChecker.checkUsageAccessPermission(context)) return null

    val endTime = System.currentTimeMillis()
    val startTime = endTime - EVENT_LOOKBACK_MS // 2000ms
    val events = usageStatsManager.queryEvents(startTime, endTime)
    val event = UsageEvents.Event()

    var latestPackage: String? = null
    var latestTimestamp = 0L

    while (events.hasNextEvent()) {
        events.getNextEvent(event)
        if (!event.isForegroundTransition()) continue
        if (event.timeStamp >= latestTimestamp) {
            latestTimestamp = event.timeStamp
            latestPackage = event.packageName
        }
    }
    return latestPackage ?: resolveForegroundFromUsageStats(endTime)
}`}
        </pre>
        <p>
          To maintain zero lag on the main thread, the polling flow is dispatched to a dedicated background pool: <code>.flowOn(ioDispatcher)</code>.
        </p>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Session Tracking & Screen Interception"}</h3>
        <p>
          When the active package changes, <code>SessionTrackingManager</code> ends the previous session (dispatching an <code>APP_CLOSED</code> event) and verifies the new package name. Launcher apps, device settings, and our own package are blacklisted from tracking.
        </p>
        <p>
          If <code>EvaluateBlockingStateUseCase</code> resolves a <code>BlockingDecision.Block</code>, the service launches <code>OverlayActivity</code> with <code>Intent.FLAG_ACTIVITY_NEW_TASK</code>, showing a fullscreen blocking screen:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`private fun block(decision: BlockingDecision.Block) {
    val now = System.currentTimeMillis()
    val samePackageRecentlyBlocked =
        decision.packageName == lastBlockedPackage &&
            now - lastBlockShownAtMs < BLOCK_OVERLAY_DEBOUNCE_MS

    if (samePackageRecentlyBlocked) return

    lastBlockedPackage = decision.packageName
    lastBlockShownAtMs = now

    startActivity(
        Intent(this, OverlayActivity::class.java).apply {
            putExtra("blockType", BlockType.Apps)
            putExtra(OverlayActivity.EXTRA_RETURN_TO_PACKAGE, decision.packageName)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        }
    )
}`}
        </pre>
      </div>
    )
  },
  "schoolie-white-label-gradle-automation": {
    title: "Gradle Build Flavor Overlays: Scaling SAGA/Schoolie to 40+ School App Variants",
    date: "May 10, 2026",
    readTime: "10 min read",
    category: "Architecture",
    content: (
      <div className="space-y-6">
        <p>
          Scaling a single codebase to support 40+ branded application variants (for schools under the <strong>SAGA/Schoolie</strong> brand) presents a complex compilation challenge. Maintaining separate branches for each client results in massive merge conflicts. The correct engineering solution is a single-repo Gradle multi-flavor configuration.
        </p>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Build Logic and Flavor Configurations"}</h3>
        <p>
          To prevent bloating the main <code>build.gradle.kts</code>, we implemented custom convention plugins in <code>build-logic/convention/</code>. Build variants are parsed dynamically from a JSON descriptor mapping (<code>clients/clients.json</code>), automatically setting product flavors:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`android {
    flavorDimensions.add("brand")
    productFlavors {
        create("schoolA") {
            dimension = "brand"
            applicationIdSuffix = ".schoola"
            manifestPlaceholders["appName"] = "School A App"
        }
        create("schoolB") {
            dimension = "brand"
            applicationIdSuffix = ".schoolb"
            manifestPlaceholders["appName"] = "School B App"
        }
    }
}`}
        </pre>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Resource Overlays & Theme Directories"}</h3>
        <p>
          Android&apos;s asset merger resolves resources directory-by-directory. If flavor-specific assets exist in <code>src/schoolA/res/</code> (like custom brand drawables, color definitions, or assets), they automatically overwrite the default files in <code>src/main/res/</code> during build time. This allows completely custom branding without duplicate layout files.
        </p>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Dependency Injection & Convention Modularization"}</h3>
        <p>
          We decoupled feature implementations into isolated modules: <code>app</code>, <code>core</code>, <code>feature</code>, and <code>language</code>. Dependency injection is managed via **Koin 4.2.0** with KSP annotations:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`@Module
class FeedFeatureModule {
    @Single
    fun provideFeedRepository(api: KtorClient): FeedRepository = FeedRepositoryImpl(api)
}`}
        </pre>
      </div>
    )
  },
  "taxi-alwatani-clean-architecture-refactor": {
    title: "Refactoring Taxi Alwatani: An Incremental Clean Architecture Migration under 30K+ Live Users",
    date: "April 18, 2026",
    readTime: "11 min read",
    category: "Leadership",
    content: (
      <div className="space-y-6">
        <p>
          Refactoring <strong>Taxi Alwatani</strong>—Iraq&apos;s leading ride-hailing application with 30,000+ active users—required an incremental strategy. Release freezes or full code rewrites were impossible due to business dependency. We had to migration the legacy monolith code to Clean Architecture layer-by-layer.
        </p>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Phase 1: Decoupling Data and Domain Boundaries"}</h3>
        <p>
          We began by wrapping network payloads and database tables into isolated data transfer objects (DTOs) and Room entities. We created strict contracts (repositories) in the domain layer, making sure the presentation layer never accesses low-level networking directly:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`// Domain Contract
interface RideRepository {
    fun getActiveRides(): Flow<Result<List<Ride>>>
    suspend fun requestRide(pickup: Location, dropoff: Location): Result<Unit>
}`}
        </pre>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Phase 2: Swapping to Hilt and Declarative Compose"}</h3>
        <p>
          We replaced monolithic static managers with constructor injection via **Dagger Hilt**. This allowed us to swap network configurations and mock repositories seamlessly during testing. Next, we migrated the UI layer from XML views to **Jetpack Compose** screens, collecting view states asynchronously using Kotlin StateFlows:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`@Composable
fun RideStatusScreen(viewModel: RideViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    // Render Compose UI based on stable state classes
}`}
        </pre>
      </div>
    )
  },
  "taxi-captain-realtime-tracking-websockets": {
    title: "High-Frequency Background GPS Tracking and WebSockets Dispatch in Taxi Alwatani Captain App",
    date: "March 22, 2026",
    readTime: "9 min read",
    category: "Android",
    content: (
      <div className="space-y-6">
        <p>
          While passenger applications can afford standard background updates, driver/captain applications require constant, high-frequency GPS tracking to match rides accurately. In the <strong>Taxi Alwatani Captain</strong> application, we built a location-polling engine that operates in the background and sends coordinates to ride dispatch servers.
        </p>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Resilient Foreground Service GPS Tracker"}</h3>
        <p>
          To prevent the Android OS from killing the location updater, we wrapped the Google Fused Location Provider in a persistent Foreground Service. The service is bound to a high-priority notification channel:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`val locationRequest = LocationRequest.Builder(
    Priority.PRIORITY_HIGH_ACCURACY, 
    LOCATION_UPDATE_INTERVAL_MS
).apply {
    setMinUpdateIntervalMillis(FASTEST_LOCATION_INTERVAL_MS)
    setWaveformResolution(true)
}.build()

fusedLocationProviderClient.requestLocationUpdates(
    locationRequest, 
    locationCallback, 
    Looper.getMainLooper()
)`}
        </pre>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// WebSocket Communication Pipeline"}</h3>
        <p>
          Location data is streamed to a background coroutine dispatcher. Coordinates are pushed directly to ride servers over a WebSocket connection. When a customer requests a ride, dispatch events are pushed back down the WebSocket channel instantly, bypassing HTTP polling delays:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`suspend fun connectAndStreamGPS(gpsFlow: Flow<Location>) {
    webSocketSession.webSocket {
        launch {
            gpsFlow.collect { loc ->
                send(Frame.Text("gps:\${loc.latitude},\${loc.longitude}"))
            }
        }
        
        for (frame in incoming) {
            if (frame is Frame.Text) {
                handleIncomingDispatch(frame.readText())
            }
        }
    }
}`}
        </pre>
      </div>
    )
  },
  "studentway-parent-offline-first-booking": {
    title: "Offline-First Sync, Shared Student Cache, and Paging in StudentWay Parent App",
    date: "Feb 15, 2026",
    readTime: "8 min read",
    category: "Architecture",
    content: (
      <div className="space-y-6">
        <p>
          The <strong>StudentWay Parent</strong> booking application is designed for parents to manage their children&apos;s school transport booking. When booking rides and managing transport routes, parents need a fast, responsive interface that operates offline. We built an offline-first system centered around a shared student database cache.
        </p>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Shared Student Cache Architecture"}</h3>
        <p>
          Rather than querying parent-student relationships repeatedly from the server, we store them in a shared Room database cache (<code>core:database</code>). Feature modules (like transportation and wallet) query student data locally, listening to database flow updates:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`@Dao
interface StudentDao {
    @Query("SELECT * FROM students WHERE parentId = :parentId")
    fun observeStudents(parentId: String): Flow<List<StudentEntity>>
    
    @Upsert
    suspend fun saveStudents(students: List<StudentEntity>)
}`}
        </pre>

        <h3 className="text-xl font-bold text-white pt-4 uppercase select-none">{"// Paginated Transport Rosters (Paging 3)"}</h3>
        <p>
          To display transportation catalogs and trip histories without memory spikes, we integrated Paging 3. The data source maps API payloads through RemoteMediator, writing network results directly to local tables, which act as the single source of truth for the UI list:
        </p>
        <pre className="bg-zinc-950 border border-zinc-850 rounded p-4 text-xs overflow-x-auto text-[#00e5ff] font-mono leading-relaxed">
{`val pager = Pager(
    config = PagingConfig(pageSize = 20),
    remoteMediator = TransportationRemoteMediator(database, networkApi)
) {
    database.transportationDao().getPagedTransportSource()
}.flow`}
        </pre>
      </div>
    )
  }
};

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  // Read URL hash on load/change to support direct linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ARTICLES_CONTENT[hash]) {
        setSelectedPost(hash);
      } else {
        setSelectedPost(null);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const selectPost = (slug: string) => {
    window.location.hash = slug;
    setSelectedPost(slug);
  };

  const closePost = () => {
    window.location.hash = "";
    setSelectedPost(null);
  };

  if (selectedPost && ARTICLES_CONTENT[selectedPost]) {
    const article = ARTICLES_CONTENT[selectedPost];
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-8 animate-fadeIn">
        <button
          onClick={closePost}
          className="inline-flex items-center gap-2 self-start text-xs font-mono text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded px-4 py-2 bg-[#121214]/60 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 select-none">
            <span className="text-[#00e5ff] uppercase font-bold">{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">
            {article.title}
          </h1>
        </div>

        <div className="border-t border-zinc-800/80 pt-8 text-base text-zinc-300 leading-relaxed font-sans prose prose-invert max-w-none">
          {article.content}
        </div>

        <div className="border-t border-zinc-800/80 pt-6 flex justify-between items-center text-xs font-mono text-zinc-500">
          <span>Author: Abdelrahman Nasr</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Article</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-xs font-mono text-accent-android uppercase tracking-wider font-extrabold select-none">
          {"// KOTLIN, JETPACK COMPOSE, & MOBILE ARCHITECTURE"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none">
          Technical Publication & Blog
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          Deep-dives into Android system internals, memory profile optimization, and build automation architectures.
        </p>
      </div>

      {/* Asymmetric Featured Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Post (spans 8 cols) */}
        {BLOG_POSTS.slice(0, 1).map((post) => (
          <div
            key={post.slug}
            className="lg:col-span-8 bg-[#121214]/30 border border-zinc-800/80 rounded-md p-8 flex flex-col justify-between gap-6 hover:border-[#00e5ff]/30 hover:scale-[1.005] transition-all duration-300 relative group cursor-pointer glass"
            onClick={() => selectPost(post.slug)}
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#00e5ff]/15 text-[#00e5ff] text-[9px] font-mono uppercase tracking-widest rounded-bl select-none">
              Featured Article
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                <span className="text-[#00e5ff] uppercase font-bold">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-accent-android transition-colors uppercase leading-none">
                {post.title}
              </h3>
              <p className="text-zinc-450 text-sm leading-relaxed max-w-xl">{post.excerpt}</p>
            </div>
            <div className="border-t border-zinc-800/80 pt-4 flex justify-between items-center text-xs font-mono text-zinc-500">
              <span>{post.readTime}</span>
              <span className="text-[#00e5ff] group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-bold">
                Read Article <CornerDownRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}

        {/* Secondary Stack (spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {BLOG_POSTS.slice(1, 3).map((post) => (
            <div
              key={post.slug}
              className="bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6 flex flex-col justify-between gap-4 hover:border-[#00e5ff]/30 hover:scale-[1.005] transition-all duration-300 cursor-pointer glass group"
              onClick={() => selectPost(post.slug)}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="text-[#00e5ff] uppercase font-bold">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-accent-android transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
              
              <div className="border-t border-zinc-850 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>{post.readTime}</span>
                <span className="text-[#00e5ff] flex items-center gap-1">
                  Read <CornerDownRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
