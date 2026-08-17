export const MOBILE_TRACK_ID = "mobile";

export const TRACKS = [
  { id: "aipm", label: "AI PM Course" },
  { id: MOBILE_TRACK_ID, label: "Mobile App Lessons" },
];

export const mobileCurriculum = [
{
  id: "mob-1", week: "MOBILE WEEK 1", module: "MOBILE 1", title: "How a hardware app is put together", tag: "Mobile", accent: "#1F7AE0",
  lessons: [
    {
      id: "mob-1.1", title: "The layer cake: views, state, services, models", type: "concept",
      content: `A device-companion app lives or dies by one discipline: **keeping the layers separate**.

The canonical stack, top to bottom:
- **Views** — screens and widgets. They render state and forward user intent. They never talk to a radio, a database, or an HTTP client directly.
- **State layer** — providers/notifiers/blocs (pick your framework's idiom). Holds the current truth the UI renders: "ring connected", "battery 72%", "sync in progress". State objects are immutable snapshots; changes flow one way.
- **Services** — the verbs. One service per capability: device sync, firmware, notifications, profile. Services own I/O: they call the backend, the vendor SDK bridge, the local store.
- **Models** — typed data shapes with (de)serialization, usually code-generated from JSON. No behavior beyond conversion and validation.

Why hardware apps need this more than CRUD apps: a physical device injects **a second source of truth** that changes without user input. The ring disconnects in a pocket; the scale reports mid-measurement; firmware updates half-complete. If views subscribe to the radio directly, every screen re-implements reconnection and error handling, and every bug is a screen-specific bug. Route all device events through the state layer and screens become dumb, testable renderers.

The tell of a healthy codebase: you can answer "where does the battery percentage come from?" with one file path per layer — the view that shows it, the provider that holds it, the service that fetched it, the model that typed it.

Top-company practice: this is Clean/Layered Architecture as preached in Android's official architecture guide and Apple's separation-of-concerns guidance — unidirectional data flow, UI as a function of state.`,
      quiz: { q: "Why is 'views never touch the radio' a harder requirement in hardware apps than in CRUD apps?", a: "Because the device is a second source of truth that changes without user input; if screens subscribe to the radio directly, every screen must re-implement connection, error, and retry logic, and device bugs become per-screen bugs instead of one fix in the state layer." },
      apply: `On your private device-app repo: pick one on-screen fact that comes from hardware (battery %, step count, weight). Trace it through all four layers and write the four file paths in a note. If any layer is skipped (a view importing the SDK bridge directly), file that as tech debt with the exact import line.`,
      keys: ["One-way data flow: device → service → state → view", "One service per capability, services own all I/O", "A physical device is a second source of truth"],
      meta: { lastVerified: "2026-08-17", sources: ["Android Developers — Guide to app architecture", "Flutter docs — App architecture case study"] }
    },
    {
      id: "mob-1.2", title: "Codegen and env bootstrap: why fresh clones don't build", type: "technical",
      content: `Clone a mature mobile repo, hit build, and watch it fail with hundreds of "missing symbol" errors. Nothing is broken — the repo simply doesn't ship its **generated files**.

What's typically generated, not committed:
- JSON (de)serializers (\`*.g.*\` files) from model annotations
- Route tables from navigation annotations
- Asset and localization accessors from resource folders
- An \`env\` file materialized from secrets that must never be committed

Why teams gitignore them: generated files churn on every model edit, bloat diffs, and cause merge conflicts in code nobody wrote by hand. The build machine regenerates them deterministically, so committing them adds noise without adding truth.

The cost: **bootstrap is now a real interface**. A fresh machine needs an ordered ritual — fetch deps → materialize env → run the generator → build. Two failure patterns to design against:
- **The undocumented ritual.** If bootstrap lives in one senior dev's shell history, every new laptop and every CI change burns a day. Fix: a single bootstrap script (or a documented three-command sequence in the README) that CI itself uses, so docs can't drift from reality.
- **The stale-codegen trap.** Generated files survive branch switches because git ignores them. Switch branches, and last branch's generated code silently mismatches this branch's models — fake "missing symbol" or, worse, subtly wrong serialization. Rule: **regenerate after every branch switch**, and put that rule where tools can see it (a bootstrap script, a git hook, or your agent's rules file).

Top-company practice: Google's monorepo treats generated code as build outputs, never sources; the principle travels — if a machine can derive it, a machine should.`,
      quiz: { q: "You switch branches and the build fails with missing-symbol errors in files you never touched. What happened and what's the fix?", a: "Generated files are gitignored, so the previous branch's stale codegen survived the switch and mismatches this branch's models. Re-run the code generator (and make regeneration-after-switch an automated or documented rule)." },
      apply: `On your private repo: from a scratch directory, clone and build using only what the README says. Time it and log every undocumented step you needed. Turn the log into a bootstrap script or README fix, and add "regenerate codegen after branch switch" to your agent/team rules if it isn't there.`,
      keys: ["Generated code is a build output, not a source", "Bootstrap is an interface — script it, don't tribal-knowledge it", "Regenerate codegen after every branch switch"],
      meta: { lastVerified: "2026-08-17", sources: ["Software Engineering at Google — build systems chapter", "12-factor app — config"] }
    },
    {
      id: "mob-1.3", title: "Navigation for device surfaces: pairing flows and detail pages", type: "framework",
      content: `A device app's navigation map is not screens-per-feature; it's **one corridor per device class**, and every corridor has the same three rooms:

1. **Onboarding/pairing flow** — permission prompts → discovery/scan → identify (QR, proximity, list pick) → bind to account/home. This is the highest-abandonment path in the product: a user who fails to pair returns the hardware.
2. **Detail page** — the device's home: live status, primary actions, entry to settings.
3. **Settings/maintenance** — rename, firmware update, unpair, diagnostics.

Design rules that survive contact with reality:
- **Pairing is a state machine, not a wizard.** Users kill the app mid-scan, deny one of three permissions, or have Bluetooth off. Model the flow as explicit states with re-entry (resume at "permission missing", not at page one). Every dead end needs an exit that names the fix: "Bluetooth is off → Open settings."
- **Permission prompts get a pre-screen.** Ask in your own UI first, explaining why, THEN trigger the OS dialog. An OS-level "deny" is expensive to recover from (the OS stops asking); a pre-screen "not now" costs nothing.
- **One corridor per device class, one shared entry.** A single "add device" chooser fans out to per-class pairing flows. Resist merging different transports (cloud-paired vs locally-paired devices) into one clever generic flow — their failure modes differ, and the generic flow handles neither well.
- **Deep-link every room.** Support tickets and push notifications need to land on "this device's settings", not the app root.

Top-company practice: study any mature ecosystem app (smart-home hubs, wearable companions): pairing is always resumable, always explains permissions before the OS does, and always separates device classes at the chooser.`,
      quiz: { q: "Why should the app show its own permission explainer before triggering the OS permission dialog?", a: "Because an OS-level denial is nearly irreversible (the OS may stop showing the prompt), while a 'not now' on your own pre-screen costs nothing — the pre-screen protects your one real shot at the OS dialog." },
      apply: `On your private repo: diagram the pairing flow of one device class as a state machine (states, events, re-entry points). Mark every state a user can currently get stuck in with no actionable exit. Fix or ticket the worst one.`,
      keys: ["Pairing is a resumable state machine", "Pre-screen every OS permission prompt", "One corridor per device class; deep-link every room"],
      meta: { lastVerified: "2026-08-17", sources: ["Material Design — permissions patterns", "Apple HIG — requesting permission"] }
    },
    {
      id: "mob-1.4", title: "Reading a mobile repo like a CTO: the 30-minute orientation", type: "framework",
      content: `You inherit (or return to) a codebase. Before touching anything, run this 30-minute orientation — the same sweep a new senior hire at a top company performs.

**Minute 0–5: the manifest layer.** Open the dependency manifest (pubspec/gradle/podfile). It tells you: the state-management religion, the navigation library, codegen tools, crash reporting, code-push, and — the interesting part — **path/git dependencies pointing at sibling packages or forks**. Every fork is a maintenance liability someone chose deliberately; find out why.
- **Minute 5–10: the entry point.** main/boot files show initialization order: what must exist before the first frame (env, DI container, background task registration, crash handler). Initialization order bugs live here.
- **Minute 10–18: one vertical slice.** Pick one hardware fact (battery %) and trace it view → state → service → bridge. This calibrates you on the codebase's real conventions — which may differ from its claimed conventions.
- **Minute 18–24: the tests.** Not coverage numbers — **distribution**. Where tests cluster is where the team was burned before; where they're absent is either rock-solid or never-verified (git blame tells you which).
- **Minute 24–30: the docs and the graveyard.** README freshness vs CI config (do they name the same toolchain versions?), docs folder, and stale branches. Person-named branches and \`temp/old-*\` branches are archaeology: they show migrations that never finished.

Two smells worth flagging on day one: **vendor reference code parked in the repo root** (it's spec material — file it into docs or a vendor folder) and **scripts duplicated in two locations** (they will drift; one will silently rot).

Output of the ritual: a one-page map — layers, device corridors, dependency risks, test-cluster interpretation, three questions for the team. If you can't produce the page, you're not oriented yet.`,
      quiz: { q: "Why is test *distribution* more informative than test *coverage* when orienting in a new codebase?", a: "Clusters show where the team was burned before (real historical risk); absent areas are either genuinely stable or never verified — distribution points you at the risk map, while a single coverage number hides it." },
      apply: `Run the full 30-minute orientation on your private repo as if you'd never seen it. Produce the one-page map. Include: every git/path dependency and why it exists, the test-cluster interpretation, and three questions you can't answer from code alone.`,
      keys: ["Manifest → entry point → one vertical slice → tests → graveyard", "Test clusters mark old burns", "Forks and parked vendor code are deliberate liabilities — know why they exist"],
      meta: { lastVerified: "2026-08-17", sources: ["Working Effectively with Legacy Code — characterization techniques", "Software Engineering at Google — code review & knowledge sharing"] }
    },
  ],
},
{
  id: "mob-2", week: "MOBILE WEEK 2", module: "MOBILE 2", title: "Vendor SDK integration discipline", tag: "Mobile", accent: "#00A86B",
  lessons: [
    {
      id: "mob-2.1", title: "The intake pipeline: SDK to shipped feature in five gates", type: "framework",
      content: `Hardware vendors hand you a binary SDK (an Android archive, an iOS framework) and a demo app of wildly varying quality. The failure mode is integrating it straight into your app and discovering its defects in production. The discipline is a five-gate pipeline; each gate has an exit artifact.

**Gate 1 — Intake.** Catalog what the vendor actually delivered: binaries, docs, demo source, contact channel. Exit artifact: an intake doc listing every SDK capability with a status of *claimed / verified / broken / absent*.
**Gate 2 — Wrapper package.** Wrap the SDK in your own plugin package with a clean typed API, in its own repo folder with its own tests. Your app never imports the vendor SDK directly — only your wrapper. This is the seam that makes vendor swaps and upgrades survivable.
**Gate 3 — Demo-app verification on real hardware.** The wrapper package ships its own minimal demo app. Every capability you plan to use gets exercised on physical units — plural — before any app integration. Exit artifact: a feature matrix (capability × device model × result).
**Gate 4 — App integration.** Only now do views/providers/services get built, against your wrapper's API, never the vendor's.
**Gate 5 — Field verification.** Release-build test plan on real devices, then staged rollout.

Why the wrapper gate is non-negotiable: vendor SDKs are the least-stable dependency you own. Versions change semantics silently; iOS and Android SDKs from the same vendor disagree; and one day you will switch vendors. The wrapper converts "rewrite the app" into "rewrite one package".

Top-company practice: this is a supplier-qualification funnel — the software mirror of EVT/DVT/PVT gates hardware companies run. Nothing advances a gate without its exit artifact.`,
      quiz: { q: "Why must every vendor capability be verified in the wrapper's demo app on real hardware BEFORE app integration begins?", a: "Because vendor claims routinely diverge from binary reality; verifying in the demo app isolates SDK defects from your app's bugs, produces a feature matrix you can hold the vendor to, and prevents building product UI on capabilities that turn out broken or absent." },
      apply: `On your private repo: pick your most recently integrated device SDK and reconstruct its feature matrix (capability × platform × verified/broken/absent). Every cell you cannot fill from an existing artifact is a gap in your intake pipeline — fill the worst three on hardware this week.`,
      keys: ["Five gates, each with an exit artifact", "The app imports your wrapper, never the vendor SDK", "Verify on real hardware before integration, not after"],
      meta: { lastVerified: "2026-08-17", sources: ["EVT/DVT/PVT hardware gating literature", "Google Play SDK quality guidelines"] }
    },
    {
      id: "mob-2.2", title: "Wrapping native SDKs: platform channels and per-feature handlers", type: "technical",
      content: `Cross-platform apps talk to native vendor SDKs over a **bridge** (platform channels or equivalent): typed calls in, event streams out. Bridge design decides whether the integration stays maintainable.

Rules that hold up:
- **One handler per capability, not one god-plugin.** Heart rate, blood oxygen, temperature, reminders, notifications — each gets its own native handler class. A single 3,000-line plugin file becomes the place where every bug hides. Handlers keep vendor-callback spaghetti quarantined per feature.
- **The bridge API speaks YOUR domain language.** \`startHeartRateMeasurement()\` returning a typed stream — not \`sendCommand(0x2A, bytes)\`. Translate vendor constants and byte protocols at the native edge, so the app side never learns them.
- **Events are streams with explicit lifecycle.** Every subscription has an owner and a defined end. The classic wearable-SDK bug: two screens subscribe to the same measurement; the vendor SDK only supports one listener; the last subscriber silently steals the stream. Decide the policy explicitly — newest-wins with notification, or a single multiplexing owner — and encode it in the bridge.
- **Errors cross the bridge as data, not exceptions.** Native crashes take down the whole app. Catch at the boundary, return typed error results, and file-log at the native layer (you'll need those logs in the field, where a debugger is not attached).
- **Both platforms, one contract.** The iOS and Android sides implement the same interface, verified by the same wrapper tests. Any capability that exists on one platform only gets an explicit \`unsupported\` result, never a silent no-op.

Top-company practice: treat the bridge like a public API — versioned, documented, semantically stable — because to your app, that's exactly what it is.`,
      quiz: { q: "Two screens subscribe to the same vendor measurement stream and readings silently stop on the first screen. What design rule was violated?", a: "Subscription lifecycle/ownership was left implicit: the vendor SDK supports one listener and the newest subscriber stole the stream. The bridge must encode an explicit policy (e.g., newest-wins with notification, or one multiplexing owner) instead of letting the SDK decide silently." },
      apply: `On your private repo: open your device bridge and list its native handler classes. If any handler exceeds ~500 lines or covers multiple capabilities, split-plan it. Then find one place where vendor constants/byte values leak past the bridge into app code and push the translation down to the native edge.`,
      keys: ["One native handler per capability", "Bridge speaks your domain, vendor bytes stay at the edge", "Subscription ownership is an explicit policy"],
      meta: { lastVerified: "2026-08-17", sources: ["Flutter docs — platform channels", "Effective Java/Kotlin API design guidance"] }
    },
    {
      id: "mob-2.3", title: "The vendor question doc: turning field bugs into answerable asks", type: "framework",
      content: `Your leverage over a hardware vendor is a support channel and a contract. Both are wasted by vague bug reports. The instrument that works is a **standing vendor question document** — a numbered list where each item is built to be answered in one line.

Anatomy of an item that gets answered:
1. **Observed symptom** — one sentence, from production or bench, with device model, OS, firmware and SDK version.
2. **Evidence** — the log line, byte trace, or reproduction rate ("4 of 30 attempts"). Not an interpretation — the raw observation.
3. **The ask** — a closed question: "Is command X expected to time out when the ring is charging — yes/no? If yes, what's the documented recovery?"

Discipline rules:
- **Platform-neutral first.** Phrase issues against the protocol/behavior, not your framework, or the vendor's first reply will be "we don't support your framework."
- **Numbered and versioned.** Items get stable numbers; answers get recorded next to the question with a date. The doc is your institutional memory when SDK v2 breaks the same thing again.
- **Ruthlessly pruned.** Ten sharp items outperform thirty vague ones. If you can't attach evidence, it's not ready to send.
- **One doc per vendor, kept in the repo.** Next to the wrapper package, versioned with the code that observed the behavior.

This doc compounds: at renewal/negotiation time it is your objective record of defect count, response latency, and unresolved issues — the difference between "we feel the SDK is flaky" and a table the vendor cannot argue with.

Top-company practice: this is supplier quality management (8D/SCAR reports) scaled to a software team: symptom, evidence, ask, and a tracked disposition per item.`,
      quiz: { q: "What three parts must every vendor question contain to be answerable in one line?", a: "The observed symptom (with device/OS/firmware/SDK versions), raw evidence (log line, trace, or reproduction rate), and a closed ask (a yes/no or specific-value question about expected behavior and recovery)." },
      apply: `On your private repo: take the three most annoying open device bugs and rewrite each as a vendor question with symptom, evidence, and closed ask. Send the doc through your vendor channel and record answer latency — that latency is a negotiation data point.`,
      keys: ["Symptom + evidence + closed ask, per numbered item", "Platform-neutral phrasing beats framework-specific", "The doc is negotiation evidence, not just support"],
      meta: { lastVerified: "2026-08-17", sources: ["8D problem-solving / SCAR supplier-quality practice", "Google SRE — postmortem culture (evidence-first reporting)"] }
    },
    {
      id: "mob-2.4", title: "Supplier management in code: pinning, forks, white-labels, licenses", type: "systems",
      content: `Every vendor dependency is a supplier relationship with a code representation. Manage it like procurement, in the repo.

- **Pin everything.** Git dependencies pinned to a commit hash, binaries to exact versions. "Latest" from a hardware vendor is a lottery ticket: SDK updates change byte protocols and callback semantics without semver discipline. An upgrade is a deliberate event with a verification pass (re-run the feature matrix from the intake pipeline), never a side effect of a dependency refresh.
- **Fork deliberately, document the delta.** Sometimes you must fork the vendor's SDK or plugin — to fix a crash they won't, or to strip behavior you can't ship. A fork is a liability you now maintain: keep a one-page FORK.md stating why it exists, the exact commits that differ from upstream, and the condition for retiring it ("vendor releases fix for issue #7"). An undocumented fork becomes unupgradeable within a year.
- **White-label residue is a leak.** Rebranded/white-labeled SDKs carry the original vendor's fingerprints — package names, resource prefixes, lock-file suffixes. Know what identifiers your build actually embeds; store listings, privacy labels, and security reviewers will find them even if you don't.
- **Licenses and legal payloads.** Binary SDKs embed licenses, third-party notices, and sometimes telemetry you didn't ask for. Run a dependency-audit step: what does the binary phone home to, what attribution must ship in the app, and what does the license forbid (some vendor SDKs prohibit exactly the wrapping-and-demo distribution you're doing — read it).
- **One upgrade lane.** Vendor SDK upgrades go through a dedicated branch + the feature-matrix re-verification + a changelog entry. Mixed "upgrade SDK + build feature" branches make regressions unattributable.

Top-company practice: this is an approved-vendor list with change control — aerospace/medical supply-chain discipline, scaled down: every supplier change is deliberate, verified, and documented.`,
      quiz: { q: "Why must a vendor-SDK upgrade never ride along inside a feature branch?", a: "Because if anything regresses you cannot attribute it — SDK semantics change silently, so upgrades need their own branch with feature-matrix re-verification; mixing them with feature work destroys the ability to bisect regressions to vendor vs. your code." },
      apply: `On your private repo: inventory every vendor dependency (binaries, git deps, forks). For each: is it pinned to an exact version/commit? If forked — does a FORK.md exist with the delta and retirement condition? Write the missing ones; they take 15 minutes each and save days later.`,
      keys: ["Pin to exact versions; upgrades are deliberate verified events", "Every fork carries a FORK.md: why, delta, retirement condition", "Audit what binaries embed: telemetry, licenses, identity residue"],
      meta: { lastVerified: "2026-08-17", sources: ["SLSA / supply-chain security guidance", "Google Play SDK policy & data-safety requirements"] }
    },
  ],
},
{
  id: "mob-3", week: "MOBILE WEEK 3", module: "MOBILE 3", title: "BLE & connectivity reliability", tag: "Mobile", accent: "#8B00FF",
  lessons: [
    {
      id: "mob-3.1", title: "The BLE lifecycle — and where each stage fails", type: "technical",
      content: `Every wearable bug report — "it won't connect", "data stopped", "it forgot my device" — maps to one stage of the BLE lifecycle. Learn the stages and you can triage from the symptom alone.

**Scan → Identify → Pair/Bond → Connect → Discover services → Subscribe → Steady state.**

Failure signatures per stage:
- **Scan** finds nothing: radio off, missing scan permission, device asleep/out of range, or OS scan throttling (aggressive periodic scans get rate-limited).
- **Identify** picks the wrong unit: multiple identical devices in range. You need a discriminator — QR-carried identity, RSSI proximity, or user confirmation on-device.
- **Pair vs bond confusion**: *pairing* is the temporary key exchange; *bonding* stores keys for reconnection. A device that must be re-paired daily has a bonding failure, not a connection failure. Beware diagnostic outputs: a "link encrypted now" flag is not the same as "bond stored" — verify bonds in the OS bonded-device list, not from a live-connection flag.
- **Connect** succeeds then drops: connection-parameter mismatch, or the peripheral only supports one central and something else (another phone, another app) holds it.
- **Subscribe** silently yields nothing: notifications not enabled on the characteristic (the descriptor write was skipped), or the vendor firmware requires an "enable streaming" command first.
- **Steady state** decays: OS kills the app in background, or the peripheral drops the link to save battery and your reconnect logic doesn't notice.

Two universal disciplines:
- **Instrument every transition.** Log stage entered, stage result, and error code. A connection bug without lifecycle logs is unfixable by anyone, including the vendor.
- **Reconnection is a feature, not an accident.** Define explicitly: who initiates reconnect, with what backoff, and what state must be replayed (re-subscribe, re-sync time, re-enable streams) after every reconnect.

Top-company practice: mature wearable teams publish an internal "connectivity funnel" dashboard — success rate per lifecycle stage — exactly like a checkout funnel. The funnel tells you where to spend engineering weeks.`,
      quiz: { q: "A user must re-pair their wearable from scratch every day. Which lifecycle stage is actually failing, and what would you check first?", a: "Bonding (persistent key storage), not connection. Check whether the device appears in the OS bonded-devices list after pairing — and don't trust a live 'link encrypted' flag, which reflects the current connection, not a stored bond." },
      apply: `On your private repo: list the lifecycle transitions your connection layer logs today. Add the missing ones (stage, result, error code) so every stage of scan→subscribe leaves a trace. Then reproduce one failed pairing and confirm you can name the failing stage from logs alone.`,
      keys: ["Every BLE bug maps to one lifecycle stage", "Pairing is key exchange; bonding is stored keys — verify bonds in the OS list", "Reconnection is designed: initiator, backoff, replayed state"],
      meta: { lastVerified: "2026-08-17", sources: ["Bluetooth Core Specification — GAP/GATT overview", "Android Developers — BLE guide", "Apple Core Bluetooth docs"] }
    },
    {
      id: "mob-3.2", title: "Command queues and subscription ownership", type: "technical",
      content: `Vendor device SDKs are almost always **single-lane**: one command in flight, one listener per stream. Your app is multi-lane: three screens, a background sync, and a settings write can all want the radio at once. The bridge between them needs two structures.

**1. The command queue.** All device commands enter one serialized queue:
- One command in flight; the next dispatches on completion or timeout.
- Every command carries a timeout — a command that never completes must fail loudly, not jam the lane forever.
- **Commands are bound to a connection generation.** When a connection drops, every queued command from that generation is retired with a "connection ended" failure instead of firing into the new connection. Replaying a stale write (an old goal value, a stale time-sync) into a fresh connection is a classic data-corruption bug.
- Priorities are allowed (user-initiated beats background sync) but starvation isn't: background work gets a floor.

**2. Subscription ownership.** For each measurement stream, one explicit policy:
- *Newest-owner-wins*: the latest subscriber takes the sink and the previous owner is notified it lost the stream (so its screen can show "measurement taken over" instead of freezing on a stale value).
- *Single multiplexing owner*: one bridge-level owner subscribes once and fans values out to any number of app-side listeners. More work, no stealing.
Pick one per stream type and encode it in the bridge. The unencoded version is the bug you'll chase for a month: two screens, one SDK listener slot, and whichever subscribed last silently wins.

Design smell to hunt: any \`await sdk.command()\` called directly from a view or provider without passing through the queue. One bypass reintroduces every race the queue exists to prevent.

Top-company practice: this is the actor model applied to a radio — a single serialized owner for a contended resource, the same pattern OS Bluetooth stacks use internally.`,
      quiz: { q: "Why must queued commands be retired when their connection ends, instead of firing on the next reconnect?", a: "Because a command composed against an old connection's state (a stale goal write, an old time sync) can corrupt data or mislead the device when replayed into a fresh connection — every queued command binds to its connection generation and fails cleanly when that generation dies." },
      apply: `On your private repo: audit the bridge for commands that bypass the queue (grep for direct SDK calls from views/providers). Then verify connection-generation binding: kill the connection with commands queued and confirm they fail with 'connection ended' rather than executing after reconnect.`,
      keys: ["One serialized command lane with timeouts", "Commands bind to a connection generation — retire on drop", "Subscription ownership is an explicit, encoded policy"],
      meta: { lastVerified: "2026-08-17", sources: ["Actor-model concurrency literature", "Android BluetoothGatt single-operation constraint (AOSP docs)"] }
    },
    {
      id: "mob-3.3", title: "Background sync: foreground services, schedulers, and locks", type: "systems",
      content: `Users expect the wearable to sync while the app is closed. Both OSes actively fight you: they kill background processes to save battery. Background sync is therefore an engineering discipline, not a checkbox.

The toolbox:
- **Scheduled work** (WorkManager-class schedulers): the OS runs your sync task periodically under constraints (battery, network). Guaranteed *eventually*, never *punctually*. Right for "sync every few hours".
- **Foreground service / background modes**: a user-visible ongoing task (persistent notification on Android; specific background modes on iOS). Right for active sessions — a live workout, a firmware transfer — wrong as a permanent daemon: OS review and battery scores punish it.
- **Connection events as wake triggers**: the OS can wake you when a bonded peripheral connects/advertises. The most battery-honest trigger when supported.

The three bugs every team ships once:
1. **The double-sync race.** Scheduled sync and app-open sync run concurrently, both push the same measurements, backend gets duplicates or version conflicts. Fix: a **sync lock** (single-flight mutex around the sync pipeline) plus idempotent backend writes keyed on (device, measurement timestamp).
2. **The greedy retry.** Sync fails offline, retries in a tight loop, drains battery overnight. Fix: exponential backoff with a cap, and respect OS constraint signals.
3. **The invisible failure.** Background sync breaks silently; user discovers a week of missing data. Fix: record last-successful-sync per device and surface staleness in the UI ("last synced 6 days ago" is a feature, not an embarrassment) plus a telemetry event on repeated failure.

Platform reality check: aggressive OEM battery managers kill scheduled work regardless of your correctness. Test on the actual handsets your users own, not just reference devices.

Top-company practice: wearable leaders treat "data freshness" as an SLO — p95 time-from-measurement-to-cloud — and alert on its regression, exactly like an API latency SLO.`,
      quiz: { q: "Scheduled background sync and a user-opened-app sync run at the same time and the backend receives duplicate measurements. Name the two fixes that make this class of bug impossible.", a: "A single-flight sync lock so only one sync pipeline runs at a time, and idempotent backend writes keyed on (device, measurement timestamp) so even a double-push cannot create duplicates." },
      apply: `On your private repo: find the sync entry points (scheduled task, app-open, manual pull-to-refresh). Verify they share one lock. Then check the backend write path for idempotency keys. Finally, surface 'last synced' staleness in the device detail UI if it isn't visible.`,
      keys: ["Scheduled work is eventual, foreground service is for active sessions", "Sync lock + idempotent writes kill the double-sync class", "Data freshness is an SLO with visible staleness"],
      meta: { lastVerified: "2026-08-17", sources: ["Android Developers — WorkManager & foreground services", "Apple — Core Bluetooth background processing", "Google SRE — SLO design"] }
    },
    {
      id: "mob-3.4", title: "Permissions and platform gotchas: Android vs iOS", type: "technical",
      content: `BLE permission models are the least portable part of a device app. Ship one flow for both platforms and you'll strand users on one of them.

**Android** (modern versions): separate runtime permissions for scanning and connecting, plus historical location-permission entanglement on older OS levels — your permission flow must branch by OS version. Scanning without the right permission doesn't crash; it silently returns nothing, which your UI must distinguish from "no devices nearby". Add OEM battery managers that kill background BLE per manufacturer, and "works on the reference device" means little.

**iOS**: one Bluetooth permission, but stricter background rules — restoration identifiers, limited background events, and a system that may relaunch your app into the background to deliver a peripheral event your code must handle without any UI existing.

Rules that keep you sane:
- **A permission gate before every radio operation.** One reusable gate component: checks the exact permission set for this OS version, explains in your UI, then prompts. Never assume a permission granted last month is still granted — users revoke, OS upgrades reset semantics.
- **Distinguish the three empty states.** "Permission missing", "radio off", and "nothing found" are different screens with different fixes. Collapsing them into one spinner is the top pairing-support driver.
- **Feature-gate per platform explicitly.** Capabilities that exist on one platform (certain background modes, notification access for call/message mirroring) get an explicit capability check and an honest UI ("not available on this platform"), never a silent no-op.
- **A permissions test matrix.** OS version × permission state (granted/denied/revoked-later) × radio state. It's ~a dozen cells per platform; script the walk-through for release-build verification.

Top-company practice: companion-app leaders maintain a per-OS-version permission decision table in the repo, updated each OS beta season — because both platforms change BLE permission semantics more often than any other subsystem.`,
      quiz: { q: "On Android, a scan with a missing permission returns an empty list instead of an error. Why is this dangerous and what must the UI do?", a: "Because 'permission missing' silently masquerades as 'no devices nearby', so users blame the hardware. The UI must check permissions before scanning and render three distinct empty states — permission missing, radio off, nothing found — each with its own fix action." },
      apply: `On your private repo: build (or verify) the permissions test matrix — OS version × permission state × radio state — for one device class. Walk it on a release build on both platforms. Every cell that shows a generic spinner instead of a named fix is a ticket.`,
      keys: ["Permission sets branch by OS version — gate every radio op", "Three empty states: permission / radio / nothing found", "Silent no-ops on missing platform capabilities are forbidden"],
      meta: { lastVerified: "2026-08-17", sources: ["Android Developers — Bluetooth permissions", "Apple — Core Bluetooth background execution modes"] }
    },
  ],
},
{
  id: "mob-4", week: "MOBILE WEEK 4", module: "MOBILE 4", title: "Firmware & OTA", tag: "Mobile", accent: "#FF6B35",
  lessons: [
    {
      id: "mob-4.1", title: "OTA architectures: direct DFU vs cloud-brokered", type: "technical",
      content: `Your app will carry firmware to devices over two fundamentally different architectures — often both in the same product line.

**Direct DFU (device firmware update over BLE).** The app downloads the firmware image, validates it, and streams it to the device over the radio, usually via the vendor's DFU protocol. You own the whole pipeline: download, integrity check, transfer, progress UI, failure recovery. Slow (radio bandwidth), fragile (user walks away mid-transfer), but fully under your control and works offline once the image is local.

**Cloud-brokered OTA.** For cloud-connected devices, the platform pushes firmware directly; your app is just the consent-and-progress UI. You get reliability for free and give up control: you can't gate versions, stage rollouts, or fix a bad image on your own timeline.

Decisions that define your OTA quality either way:
- **Image integrity is non-negotiable**: checksum/signature verification before a single byte hits the device. A corrupted image on a device without a fallback bootloader is a returned unit.
- **Know your device's recovery story** — this is intake-pipeline material (ask the vendor in writing): does the bootloader keep a fallback slot? Can a failed update brick it? What's the factory-reset path? Your UI's error handling is designed backward from these answers.
- **The transfer environment is policy**: minimum device battery, phone screen kept on or a foreground session for the duration, proximity warning. Every vendor DFU doc lists preconditions; encode them as preflight checks, not README notes.
- **Progress must be honest.** DFU has distinct phases (transfer → validate → reboot). Show them. A bar stuck at 100% while the device reboots generates support tickets; "Restarting device (up to 60s)…" doesn't.

Top-company practice: treat every OTA path like a mini deployment pipeline — versioned artifacts, integrity verification, preflight checks, and a rehearsed failure path — because that's literally what it is, with a radio in the middle.`,
      quiz: { q: "What must you get IN WRITING from the vendor before designing your DFU error handling, and why?", a: "The device's recovery story: whether the bootloader has a fallback slot, whether a failed/interrupted update can brick the unit, and the factory-reset path — because your UI's failure handling and preflight strictness are designed backward from what recovery is actually possible." },
      apply: `On your private repo: for each device class with OTA, write the one-page pipeline map — image source, integrity check, preflight checks, transfer phases shown to the user, and the documented recovery path. Any box you can't fill is a vendor question; send it.`,
      keys: ["Direct DFU: you own the pipeline; cloud-brokered: you own only consent UI", "Verify image integrity before transfer, always", "Design error handling backward from the device's recovery story"],
      meta: { lastVerified: "2026-08-17", sources: ["Nordic DFU protocol docs (representative direct-DFU design)", "IoT platform OTA service docs (representative cloud-brokered design)"] }
    },
    {
      id: "mob-4.2", title: "Version semantics and downgrade protection", type: "technical",
      content: `Firmware versioning looks trivial until the day the app tells a user to "update" to an older build, or refuses a critical fix because of a string comparison bug.

The traps, all shipped by real teams:
- **String comparison.** "1.0.10" < "1.0.9" as strings. Firmware versions must be parsed into numeric components and compared component-wise. This deserves a dedicated, unit-tested comparator — it's ten lines that guard the riskiest operation in the app.
- **Vendor version zoo.** Hardware revisions fork firmware lines: v2 hardware runs a 2.x line, v1 runs 1.x, and the newest 1.x may be *newer in time* than an older 2.x. "Latest" is meaningless without the hardware-revision axis: the update decision is (hardware revision, current version) → (correct line, latest in line).
- **Downgrade protection cuts both ways.** Devices often refuse older firmware (good — old firmware may have security holes). But your app must also never *offer* a downgrade by accident — mixed version lines plus a naive "server version ≠ device version → show update" check does exactly that. The check is "server is strictly newer within the same line", not "different".
- **Version is data you sync, not decoration.** Store current firmware per device in your backend. Fleet-wide version distribution tells you who's stranded on a buggy build, which support tickets correlate with which firmware, and whether a rollout actually penetrated.

And the app-side mirror: your own app's build numbers obey the same law. Parallel release lines that reuse build numbers force some users through uninstall/reinstall — which on a device app destroys pairings and local data. One monotonic build-number authority, no exceptions.

Top-company practice: fleet operators keep a version-distribution dashboard and define "stranded" (device >N versions behind) as an alertable metric.`,
      quiz: { q: "The app shows 'update available' to a user whose device already runs newer firmware. Name the two most likely design flaws behind this.", a: "String-based version comparison (\"1.0.10\" < \"1.0.9\") and/or ignoring the hardware-revision axis — comparing across firmware lines instead of 'strictly newer within this device's line'." },
      apply: `On your private repo: find the firmware version comparator. Confirm it's numeric, component-wise, line-aware, and unit-tested (add the '1.0.10 vs 1.0.9' case if missing). Then query your backend for the fleet's version distribution — if you can't, that's the gap to fix.`,
      keys: ["Numeric component-wise comparison, never string", "Update decision = (hardware revision, current) → latest within the line", "Fleet version distribution is an operations dashboard"],
      meta: { lastVerified: "2026-08-17", sources: ["SemVer spec", "Android versionCode monotonicity rules (Play Console docs)"] }
    },
    {
      id: "mob-4.3", title: "OTA as the highest-risk action: preflight, staged rollout, rollback", type: "framework",
      content: `Everything else your app does wrong is recoverable with a retry. A botched firmware update can hand the user a dead device. So OTA gets the discipline reserved for irreversible operations — the same shape as a database migration or a production deploy.

**Preflight (before one byte moves):**
- Device battery above the vendor threshold; phone battery sane; link quality adequate.
- Image integrity verified; image line matches this hardware revision.
- User consent with an honest time estimate and a "keep the device nearby" instruction.
- App state ready: transfer runs in a mode the OS won't kill mid-stream (foreground session), and every other command to the device is paused — the command queue drains before DFU starts.

**Staged rollout (fleet level):**
- New firmware goes to an internal ring first (team devices), then a small percentage, then everyone. Gate each stage on telemetry: update success rate, post-update crash/disconnect rate, battery drain regression.
- Keep a kill switch: server-side flag that stops offering the version fleet-wide within minutes when stage telemetry goes red.

**Rollback (assume failure will happen):**
- Know the recovery path per failure phase: transfer interrupted (retry from scratch? resume?), validation failed (device keeps old firmware — confirm it actually does), reboot hang (documented timeout + user guidance, not an eternal spinner).
- Rehearse it: on a bench unit, kill the transfer at 30/60/90% and verify the device recovers per the vendor's story. Do this once per firmware line, before the first field rollout — never discover the recovery story from a support ticket.

The one-line rule: **irreversibility budget**. The less reversible the operation, the more gates it must pass. OTA is your least reversible operation; it gets every gate.

Top-company practice: this is Google/Meta staged-rollout discipline plus SRE error budgets applied to firmware: ring-based deployment, telemetry gates between rings, rehearsed rollback.`,
      quiz: { q: "Why must the device command queue be drained and paused before a DFU transfer starts?", a: "Because interleaving normal commands with a firmware stream corrupts the transfer or triggers undefined vendor-SDK behavior mid-update — the single riskiest moment to have a second writer on the radio. DFU takes exclusive ownership of the connection." },
      apply: `On your private repo: run the rehearsal on a bench unit — interrupt one real firmware transfer at ~30%, ~60%, ~90% and document what the device does at each point versus what your UI tells the user. Every mismatch between reality and UI copy is a ticket. Then verify a server-side kill switch exists for pulling a firmware version.`,
      keys: ["Irreversibility budget: least reversible op gets the most gates", "Ring rollout with telemetry gates and a server kill switch", "Rehearse interrupted transfers on the bench before the field does it for you"],
      meta: { lastVerified: "2026-08-17", sources: ["Google SRE — canarying releases", "Staged rollout practice (Play Console / TestFlight rings)"] }
    },
  ],
},
{
  id: "mob-5", week: "MOBILE WEEK 5", module: "MOBILE 5", title: "Release engineering", tag: "Mobile", accent: "#FFB800",
  lessons: [
    {
      id: "mob-5.1", title: "Mobile CI anatomy: workflows, tracks, and build-number authority", type: "systems",
      content: `A mobile CI pipeline (Codemagic, Bitrise, GitHub Actions + fastlane — the provider matters less than the shape) is two or three **workflows**, each answering one question.

**The internal workflow** — "can testers try today's work?"
Triggers on the integration branch. Steps: bootstrap (deps → env → codegen) → static analysis → tests → build signed artifacts → publish to the internal lane (Play internal testing track / TestFlight internal). Output: a build testers install within the hour.

**The production workflow** — "is this release-candidate shippable?"
Triggers on a release branch or tag. Same steps, stricter: release signing, store-review submission targets, changelog required. Output: a build one manual approval away from users.

The parts teams get wrong:
- **CI must run the same bootstrap developers run.** If CI has a "generate env, localizations and sources" step that a laptop does differently, one of them is lying. One script, both consumers.
- **Build-number authority must be singular and monotonic.** The store rejects duplicate build numbers, and Android treats a lower number as a downgrade — forcing uninstall/reinstall, which on a device app destroys pairings and login. The clean pattern: CI resolves the next build number by querying the stores at build time — no human ever types one.
- **Version drift between docs and CI.** README says toolchain X, CI pins toolchain Y. The pipeline config is the truth; make the README point at it instead of restating it.
- **Notify the right humans.** A pipeline that emails only its committer hides releases from the founder/QA. Publishing events go to a channel, not a person.

What "good" feels like: any team member ships a tester build by merging to one branch, and nobody can remember the last time two builds collided on a number.

Top-company practice: release engineering as a product — Google's "release train" model: scheduled, boring, automated; humans approve, machines number and build.`,
      quiz: { q: "Why must the CI pipeline — not a human — own build numbers, and what specifically breaks on Android when the authority is violated?", a: "Humans create collisions and gaps across parallel branches; stores reject duplicates. On Android a lower-than-installed build number is a downgrade, which forces uninstall/reinstall — on a device app that wipes pairings and local data. CI querying the stores for the next number makes collisions structurally impossible." },
      apply: `On your private CI: verify (1) the bootstrap step is the same script developers run locally, (2) the build number is resolved from the stores at build time, (3) publish notifications reach a shared channel. Fix the weakest of the three this week.`,
      keys: ["Two workflows: internal lane and production lane", "One bootstrap script for CI and laptops", "CI is the single monotonic build-number authority"],
      meta: { lastVerified: "2026-08-17", sources: ["Google release-train practice (Software Engineering at Google)", "Play Console versioning rules", "fastlane/CI provider docs (representative)"] }
    },
    {
      id: "mob-5.2", title: "Release lines and the downgrade trap", type: "framework",
      content: `The most expensive release bug in device apps costs zero lines of code: **two release lines handing out builds independently**.

The anatomy of the incident (a composite every hardware team recognizes): the team's integration branch produces build 103 for testers. Meanwhile a developer's long-lived branch — kept alive because it holds a device integration that never merged — produces its own build, also numbered 103, from different code. Testers now run "103" that main knows nothing about. The next main build (104) looks like an upgrade to some devices and a downgrade to others, and the downgrade path forces uninstall — taking logins, pairings, and unsynced measurements with it.

The systemic causes, each worth killing:
- **Person-named, long-lived branches as de facto release lines.** A branch that outlives two sprints and installs on testers' devices IS a release line, whether you admit it or not. Either merge it or give it an explicitly separate application id so it can't collide.
- **No single build-number authority** (previous lesson) — collisions become possible.
- **No build provenance.** If you can't answer "which commit produced the build on this tester's phone?", every field bug report is unattributable. Fix: build metadata (branch, commit, CI run) embedded in the app's about/diagnostics screen.
- **Testers as an unmanaged fleet.** Know which build each tester cohort runs; a spreadsheet beats nothing. When a bad line ships, you must know exactly whose devices to rescue.

Recovery protocol when it happens anyway: stop the rogue line immediately, ship a main build with a number strictly above every number ever handed out (jump it by +10 — numbers are free), and tell affected testers exactly what they'll lose on reinstall before they discover it.

The lesson underneath: **branches are cheap, release lines are not.** A release line implies numbering authority, provenance, a tester fleet, and a support obligation. Never create one by accident.

Top-company practice: one shipping branch, protected; every other branch is unshippable by construction (CI refuses to publish from non-release branches).`,
      quiz: { q: "A tester's phone runs build 103 but main's build 103 has different code. What single CI rule would have made this impossible?", a: "CI refuses to publish installable builds from any branch except the designated release/integration branch — every other branch is unshippable by construction, so a parallel line can never hand out numbered builds." },
      apply: `On your private repo: check whether the app's diagnostics/about screen shows branch + commit + CI run of the running build. If not, add it — it's the cheapest insurance in this module. Then list every branch older than two sprints and decide each one's fate: merge, or kill.`,
      keys: ["A branch that installs on testers is a release line", "Provenance in the app: branch, commit, CI run visible in diagnostics", "CI publishes from one branch only; number jumps are free"],
      meta: { lastVerified: "2026-08-17", sources: ["Trunk-based development literature", "Play Console downgrade semantics"] }
    },
    {
      id: "mob-5.3", title: "Code push vs full release: when a patch is enough", type: "technical",
      content: `Between "hotfix through store review" (days) and "live with the bug" sits **code push**: shipping updated app logic directly to installed apps (Shorebird for Flutter, and equivalents in other ecosystems). Powerful, and easy to misuse.

What code push CAN carry: pure app-layer logic — UI fixes, parsing bugs, sync-logic corrections, threshold changes. What it CANNOT: native code changes — a new vendor SDK version, a new native handler in your bridge, permission manifest changes, anything that touches the platform build. The patch engine swaps interpreted/app code, not the native binary underneath.

That boundary is exactly where device apps get burned: your riskiest fixes (BLE handlers, DFU logic) live in native bridge code — **unpatchable**. Plan accordingly: the more logic you keep on the app side of the bridge (protocol sequencing, retry policy, parsing), the more of your device stack is hot-patchable. That's a real architecture argument for a thin native bridge.

Operating rules:
- **A patch is a release.** Same verification bar: tests green, release-build sanity pass, changelog entry, provenance. "It's just a patch" is how a second bug ships in an hour.
- **Patch against the exact release.** Patches bind to a specific store build; your pipeline must track which base builds are patchable and which patch version each device cohort runs — patch telemetry is fleet telemetry.
- **Store-policy honesty.** Both stores allow code push within limits (no changing the app's core purpose, no bypassing review for significant features). A patch that adds a feature belongs in a store release.
- **The rollback asymmetry is your friend**: a bad patch can be superseded within minutes by the next patch — this is the one lane where rollback is nearly free. Use it for exactly the class of bug where waiting days for review costs users data.

Decision rule: **data-loss or correctness bug in app-layer code → patch today, store release follows anyway. Anything native, anything feature-shaped → store lane only.**

Top-company practice: web-scale teams have deployed-in-minutes discipline; code push imports it to mobile — with the same requirement that every deploy is versioned, verified, and attributable.`,
      quiz: { q: "Your BLE reconnect bug fix touches only Dart/app-layer retry logic; a second fix adds a new native handler for a vendor SDK call. Which can ship via code push and why?", a: "Only the app-layer retry fix — code push swaps app-level code, not the native binary; the new native handler changes platform code and must go through a full store release. This asymmetry is why keeping device logic app-side (thin native bridge) increases your hot-patchable surface." },
      apply: `On your private repo: classify your last ten shipped bug fixes as patchable (app-layer) vs unpatchable (native). Compute the ratio — that's your hot-patch coverage. If most device-logic fixes were native, evaluate what protocol/retry/parsing logic could move app-side of the bridge.`,
      keys: ["Code push swaps app code, never native code", "A patch is a release: same verification bar", "Thin native bridge = larger hot-patchable surface"],
      meta: { lastVerified: "2026-08-17", sources: ["Shorebird docs (representative code-push mechanics)", "App Store / Play policy on interpreted code updates"] }
    },
    {
      id: "mob-5.4", title: "Signing: debug vs release, and SDK-bound identity", type: "technical",
      content: `Code signing looks like a checkbox until a signed-and-installing build fails at runtime for identity reasons. Device apps hit this more than others because **third-party platform SDKs bind to your signing identity**.

The mental model: your app's identity is (application id, signing certificate). Debug and release builds differ in the certificate — so to any system that checks identity, they are *different apps*.

Consequences that surprise teams:
- **Cloud platform SDKs validate identity server-side.** Smart-home and IoT cloud SDKs register your app's id + certificate fingerprint in a vendor console. A build signed with the wrong key installs fine and then dies at SDK init with an "illegal client" style error. The fix is never in code — it's re-signing with the registered key or registering the new fingerprint.
- **Store-managed signing splits your identity.** With Play App Signing, Google re-signs your upload: upload key fingerprint ≠ distribution fingerprint. Vendor consoles need the *distribution* fingerprint. This single fact explains a whole genus of works-locally-fails-from-store bugs.
- **Universal/debug artifacts mislead QA.** A debug-signed universal APK installs and mostly works — then any identity-validating SDK path fails, and QA reports phantom bugs. Testers get release-signed builds from the official lane, full stop. (On iOS the analogue is stricter: debug builds launched from the home screen can refuse to run at all on modern OS versions — hand testers proper distribution builds.)
- **Key custody is a company risk.** Losing an Android upload key is recoverable via the store; losing a full signing key (or the vendor-console registration password) can strand the app id permanently. Keys live in a password manager/HSM with named owners — never in the repo, never in one person's Downloads folder.

Keep a **signing map** in the repo docs: for each platform — which key signs which lane, every SHA fingerprint, and which vendor consoles hold registrations of which fingerprint. Half a page; saves a day per incident, and it's the first thing a new release engineer needs.

Top-company practice: signing identity is managed like TLS certificates in a bank — inventoried, owned, rotation-planned — because it is exactly that: cryptographic identity with business continuity stakes.`,
      quiz: { q: "A release build from the store fails at vendor-SDK init with an 'illegal client' error, but your local release build works. What's the most likely cause?", a: "Store-managed signing re-signed the build: the distribution certificate fingerprint differs from the upload key, and the vendor console only has the upload/local fingerprint registered. Register the store's distribution fingerprint in the vendor console." },
      apply: `On your private repo: write the signing map — per platform: key, lane, SHA fingerprints, vendor-console registrations, key custody owner. Verify the store's distribution fingerprint (not just your upload key) is registered in every vendor console. File the gaps.`,
      keys: ["App identity = (app id, certificate) — debug and release are different apps", "Vendor consoles need the distribution fingerprint, not the upload key", "Signing map in docs; key custody with named owners"],
      meta: { lastVerified: "2026-08-17", sources: ["Play App Signing docs", "Apple code-signing docs", "IoT platform SDK security registration docs (representative)"] }
    },
  ],
},
{
  id: "mob-6", week: "MOBILE WEEK 6", module: "MOBILE 6", title: "Backend, staging & production", tag: "Mobile", accent: "#FF3366",
  lessons: [
    {
      id: "mob-6.1", title: "Staging stack anatomy: the six boxes behind every device app", type: "systems",
      content: `Behind every device app sits the same six-box backend, whatever the cloud vendor. Read any staging environment through this lens and you can orient in an afternoon.

1. **Ingress**: a load balancer terminating TLS (with a managed certificate) and routing to the app tier. The only box the public internet touches.
2. **App tier**: containers running the API (a container service pulling images from a registry). Stateless by design — any instance can die; state lives below.
3. **Database**: managed relational instance. The system of record for accounts, devices, measurements.
4. **Cache/queue**: managed Redis-class store — sessions, hot reads, sometimes job queues.
5. **Secrets manager**: the ONLY place credentials live at runtime; containers fetch at boot. No secret in an image, an env file in git, or a task definition in plaintext.
6. **Telemetry**: logs and metrics shipped to a log group/monitoring service.

Two disciplines turn the boxes into an *environment*:
- **Infrastructure as code.** The stack is declared (Terraform-class tooling), versioned, and applied through plans — so staging can be rebuilt, diffed, and reviewed like code. The remote state file is itself sensitive (it can embed connection strings and resource ids): remote encrypted backend, never committed.
- **Staging is production's rehearsal, not its landfill.** Same topology, smaller sizes. The moment staging's shape diverges (different auth mode, no cache, manual DB), it stops predicting production behavior and every "worked on staging" becomes a lie.

For the mobile app, the environment boundary must be explicit: which backend a build talks to is stamped at build time (env config), visible in the diagnostics screen, and never switchable silently — a tester app pointed at production data (or vice versa) is a classic data-corruption incident.

Top-company practice: environments as cattle — rebuildable from declared code within an hour, and routinely rebuilt to prove it.`,
      quiz: { q: "Why is the Terraform-class remote state file itself treated as a secret, even though the infrastructure code is reviewable?", a: "Because state embeds concrete values — connection strings, resource ids, sometimes generated passwords — that the declarative code only references. It lives in a remote encrypted backend with restricted access and never enters git." },
      apply: `On your private infra: draw the six boxes for your staging stack and name the concrete service filling each. Then verify two facts: containers get every secret from the secrets manager (not env files), and the app build shown on a phone displays which environment it talks to.`,
      keys: ["Six boxes: ingress, app tier, DB, cache, secrets, telemetry", "IaC with remote encrypted state — state is a secret", "Environment stamped at build time and visible in diagnostics"],
      meta: { lastVerified: "2026-08-17", sources: ["AWS Well-Architected Framework", "12-factor app", "Terraform remote-state security docs"] }
    },
    {
      id: "mob-6.2", title: "Environment promotion and per-developer databases", type: "framework",
      content: `Code should flow one way: **laptop → staging → production**, gaining verification at each hop. Data should flow the other way or not at all. Most environment incidents are one of those arrows pointing backward.

Promotion discipline:
- **One artifact, promoted.** The image/binary verified on staging is byte-identical to what production runs — promote the artifact, never rebuild for production ("same commit, new build" has burned enough teams).
- **Config differs, code doesn't.** Environments differ only in injected configuration (endpoints, keys, feature flags). If production needs a code branch, your environments have forked and staging predicts nothing.
- **Migrations rehearse on staging** against production-shaped data volumes. A migration that runs in 200ms on a 1k-row staging table can lock a 10M-row production table for minutes.

Per-developer databases — the underrated multiplier for small teams: each developer gets an isolated schema/database on the shared staging instance. What it buys:
- Destructive experiments (schema changes, bulk deletes, migration dry-runs) without coordinating with anyone.
- Reproducible bug hunts: load one user's problematic state without fear.
- The shared staging DB stays semi-stable for QA instead of being everyone's sandbox.

The credential hygiene that comes with it: per-dev credentials are still real credentials to real infrastructure. They live in each developer's keychain/secret store — **not in a plaintext file in anyone's repo folder**, where they sit one \`git add .\` away from public history. (This exact accident — a "temporary" credentials file swept into a commit — is common enough that your gitignore should preempt the filename patterns, and a leak-scan should gate every push.)

Production data in lower environments: default no. When genuinely needed for debugging, it moves through an anonymizing export, never a raw dump — measurements from real users' bodies and homes are regulated personal data in most jurisdictions.

Top-company practice: "you build it, you run it" teams pair promotion pipelines with preview/per-dev environments — isolation for speed, one artifact for truth.`,
      quiz: { q: "Why is 'rebuild the same commit for production' worse than promoting the staging-verified artifact?", a: "A rebuild can differ from what was verified — different dependency resolution, toolchain patch, build-time env — so staging verified an artifact production never runs. Promotion guarantees the tested bytes are the shipped bytes." },
      apply: `On your private setup: (1) confirm production deploys promote the staging-verified image rather than rebuilding; (2) audit where per-developer DB credentials physically live right now — any plaintext file inside a repo directory gets moved to a keychain today and its filename pattern added to .gitignore.`,
      keys: ["Promote the artifact; only config differs per environment", "Per-dev databases: isolation for experiments, stability for QA", "Per-dev credentials are real credentials — keychain, never repo-adjacent files"],
      meta: { lastVerified: "2026-08-17", sources: ["12-factor — build/release/run", "Continuous Delivery (Humble & Farley) — artifact promotion"] }
    },
    {
      id: "mob-6.3", title: "Secrets discipline: the git-add accident and its defenses", type: "systems",
      content: `Every secrets leak in a small team follows the same script: a working file created "just for now" — credentials txt, a service-account keyfile, a vendor keystore — parked inside the repo directory. Weeks later, someone runs \`git add .\` for an unrelated change, the file rides along, and it's in history. On a public repo it's compromised the moment it's pushed; on a private repo it's a landmine waiting for the repo to change visibility, gain a collaborator, or get cloned to a laptop that's lost. **Untracked is not safe. Untracked is one command from published.**

Defense in depth, cheapest first:
1. **Never park secrets in the repo tree.** Working credentials live in the OS keychain or a password manager; infrastructure secrets in the cloud secrets manager; build-time secrets in CI's secret store. The repo directory is for code.
2. **Gitignore by pattern, preemptively.** \`*.keystore\`, \`*credentials*\`, \`*.pem\`, \`*service-account*.json\`, env files — ignored before the first such file ever exists. Write the rule the day you create the repo, and add a rule *the moment an accident is caught* so the same filename can never ride along again (your gitignore becomes a scar tissue log — good).
3. **A pre-push leak scan.** A script that greps the outgoing diff against a denylist of your real identifiers (hosts, key prefixes, vendor ids, internal names). Crucially, the denylist itself is a secret map — it lives gitignored locally, and the scanner passes silently when absent so public CI still runs.
4. **Secret-scanning services on** (repo-host push protection) — the vendor-side backstop for the patterns they know.
5. **Rehearsed revocation.** When (not if) a secret lands in history: rotate the credential first, THEN clean history (filter/rewrite + force push + provider cache purge), then verify the old value is dead. Rewriting history without rotating is theater — clones and caches already have it.

The audit habit that catches what tools miss: before any push to a public repo, a human (or agent) reads the full diff with one question — "would I show this hunk on a conference screen?" Names, internal hostnames, incident details, and vendor identifiers fail that test even when no credential does.

Top-company practice: secret hygiene is enforced, not requested — push protection on, scanners in CI, rotation runbooks written before the first incident, and post-incident rules added so each accident class dies after one occurrence.`,
      quiz: { q: "A credentials file was committed and pushed an hour ago. What's the correct order of response, and why does order matter?", a: "Rotate/revoke the credential first, then rewrite history and purge provider caches, then verify the old value no longer works. Order matters because clones, forks, and caches may already hold the file — cleaning history without rotating only hides the leak from you, not from attackers." },
      apply: `On your private repos: run the parking-lot audit — list every untracked file currently sitting in repo directories and relocate anything sensitive to a keychain/secrets manager. Add the preemptive gitignore patterns. If you don't have a pre-push leak scan, add the ten-line script this week and seed its local denylist.`,
      keys: ["Untracked is one git add from published", "Gitignore preemptively; add a rule per caught accident", "Rotate first, then rewrite history, then verify"],
      meta: { lastVerified: "2026-08-17", sources: ["GitHub — removing sensitive data & push protection docs", "OWASP secrets management cheat sheet"] }
    },
  ],
},
{
  id: "mob-7", week: "MOBILE WEEK 7", module: "MOBILE 7", title: "Field debugging & incident response", tag: "Mobile", accent: "#00C8FF",
  lessons: [
    {
      id: "mob-7.1", title: "Diagnostic logging: capture on-device, export with hygiene", type: "technical",
      content: `A device bug in the field is invisible three times over: no debugger, no console, and the interesting part happened in native bridge code at 7am in a user's pocket. The only witness is the log you designed in advance.

**Capture design:**
- **Log at the native layer too.** App-level logs miss the most valuable events — vendor SDK callbacks, connection state changes, command dispatch/completion. A small file-logger in the native bridge (ring-buffer files, size-capped, oldest-deleted) captures what app logs structurally cannot.
- **Structure over prose.** \`event=connect_result stage=subscribe code=133 device=<model> fw=<version>\` beats "connection failed :(". Structured lines are grep-able across thousands of reports and diffable across firmware versions.
- **Timestamps + generation ids.** Every reconnect increments a connection-generation id logged on every line — suddenly interleaved retries become readable stories.
- **The diagnostics screen.** Build number, branch/commit provenance, environment, device firmware, last-sync times, and an "export logs" button. This screen turns "it doesn't work" tickets into attachments.

**Export hygiene — the part teams learn from an incident:** a log export is a data release. Before any log leaves the device:
- **Scrub tokens and identity.** Auth tokens, session cookies, emails, precise locations have no business in logs at write-time (best) or must be redacted at export-time (minimum). A log export that carries a live auth token is an account-takeover kit in a zip file — and it WILL be forwarded, uploaded to ticket systems, and stored on vendor laptops.
- **Log body data as data, not identity.** Measurement values are fine; measurement values tied to name+email in the same line make the log itself regulated personal data.
- **The vendor-forwarding assumption.** Any log you collect will eventually be sent to a hardware vendor to debug their SDK. Write every line as if a third party will read it — because one will.

Retention: exports are for a ticket, not forever; device-side ring buffers self-expire by design.

Top-company practice: privacy review of log schemas is standard at mature companies — logging is classified as data collection, because it is.`,
      quiz: { q: "Why must log export scrubbing treat auth tokens differently from measurement values?", a: "A live token in an exported log is an account-takeover credential that travels with the file to ticket systems and vendor laptops — it must never be written or must be redacted at export. Measurement values are the debugging payload; they're fine as long as they aren't joined with identity in the same log." },
      apply: `On your private repo: export a real diagnostic log from a test device and read it as an attacker — list every credential, identity fragment, or location it contains. Fix write-time logging for the worst finding. Then verify the diagnostics screen shows build provenance (branch/commit) — add it if missing.`,
      keys: ["Log at the native bridge; structured lines with generation ids", "A log export is a data release — scrub tokens at write-time", "Write every line as if the vendor will read it"],
      meta: { lastVerified: "2026-08-17", sources: ["OWASP logging cheat sheet", "Google SRE workbook — instrumentation"] }
    },
    {
      id: "mob-7.2", title: "The debugging chronicle: symptom, evidence, fix, proof", type: "framework",
      content: `When a gnarly device bug takes days to kill, the knowledge generated is worth more than the fix — if it's captured. The instrument is the **debugging chronicle**: a running document written DURING the investigation, in a fixed four-beat shape per defect.

**1. Symptom** — what the user saw, verbatim. "Ring shows connected but steps stop updating after ~2 hours." Not your theory; the observable.
**2. Evidence** — the log lines, packet traces, or reproduction counts that localize the fault. Name the test rig precisely: handset model, OS version, firmware, number of physical units. "Reproduced 4/10 on <handset>, OS <n>, fw <x>" is evidence; "seems flaky" is not.
**3. Fix** — what changed and the mechanism: why THIS change stops THAT evidence pattern. If you can't articulate the mechanism, you have a correlation, not a fix — say so honestly and keep the item open.
**4. Proof** — the verification that the symptom is gone: re-run count, the log now showing the healthy pattern, the before/after trace. A fix without proof is a hypothesis that shipped. End the platform's chronicle with a manual test checklist a non-author can execute.

Why during, not after: memory rewrites investigations into tidy stories, dropping the dead ends — and dead ends are half the value ("we ruled out X via test Y" saves next quarter's re-investigation). One chronicle per investigation per platform; Android and iOS fail differently and deserve separate documents.

Three compounding payoffs: onboarding (new engineers read how this codebase actually fails), vendor escalation (chronicle items convert directly into evidence-backed vendor questions), and review (the branch's reviewer reads the chronicle to know what the diff *claims* to fix — then checks the proof).

Top-company practice: this is the lab-notebook discipline of hardware engineering imported to software. SRE postmortems are its incident-scale sibling; the chronicle is per-bug scale, written by the person in the trench.`,
      quiz: { q: "Why must the chronicle be written during the investigation rather than reconstructed after the fix?", a: "Because memory retrofits investigations into clean stories and deletes the dead ends — and the ruled-out hypotheses with their disproving evidence are half the document's value: they stop the team re-investigating the same theories next time." },
      apply: `Start a chronicle for the current hardest bug on your private repo, today, in the four-beat shape. Include the rig spec (handset, OS, firmware, unit count) in the evidence beat. When fixed, write the proof beat and hand the manual checklist to someone else to execute.`,
      keys: ["Four beats: symptom, evidence, fix, proof", "Written during, not after — dead ends are half the value", "Proofless fixes are hypotheses that shipped"],
      meta: { lastVerified: "2026-08-17", sources: ["Google SRE — postmortem culture", "Lab-notebook practice in hardware engineering"] }
    },
    {
      id: "mob-7.3", title: "Postmortems for tiny teams", type: "framework",
      content: `Postmortems feel like big-company ceremony until you count the cost of re-having the same incident. The discipline scales down to four people; the ceremony doesn't have to come along.

**When to write one (small-team threshold):** an incident that cost a user data, cost the team more than a day, or WILL recur if nothing changes. That's roughly one per month for an active hardware team — not a burden.

**The one-page format:**
- **Timeline** — discovery to resolution, timestamped, facts only.
- **Impact** — who was affected, what was lost, how many.
- **Root cause(s)** — mechanism, not villain. "The pipeline allowed two branches to publish builds with the same number" — not "X used the wrong branch". Blameless isn't kindness; it's accuracy: people-shaped causes produce lecture-shaped fixes, which don't work. System-shaped causes produce system-shaped fixes, which do.
- **What worked** — detection and response steps worth keeping.
- **Action items with owners and dates** — each one a *constraint*, not an intention: a CI rule, a gitignore pattern, a preflight check, an alert. "Be more careful" is not an action item; "CI refuses publishes from non-release branches (owner: X, done by: date)" is.

**The rule-update habit — the whole point:** every incident ends by asking "which rule, check, or gate was missing?" and adding exactly that. Errors are missing constraints. A team that turns each incident into one new constraint becomes measurably harder to hurt every quarter; a team that ends with "lesson learned" repeats the incident with better vocabulary.

Small-team shortcuts that preserve the value: the incident's protagonist writes the draft in 30 minutes; one review pass by the rest; action items land in the same tracker as feature work (or they'll starve); a quarterly ten-minute review of open postmortem actions.

Top-company practice: Google SRE's blameless postmortems and Amazon's COE process — both centered on the same loop you're building: incident → mechanism → constraint → verification that the constraint holds.`,
      quiz: { q: "Why does a blameless root cause produce better fixes than identifying who made the mistake?", a: "Because people-shaped causes yield lecture-shaped fixes ('be careful'), which decay in weeks — while system-shaped causes yield constraints (CI rules, gates, checks) that make the error structurally impossible regardless of who is working." },
      apply: `Write the one-page postmortem for your team's last painful incident — even months late. Force every action item into constraint form (a rule, gate, or check with an owner and date). Then audit: how many past incidents ended with a new constraint vs a new intention? That ratio is your learning rate.`,
      keys: ["Threshold: data lost, a day lost, or it will recur", "Root cause is a mechanism; action items are constraints", "Every incident adds exactly one missing rule"],
      meta: { lastVerified: "2026-08-17", sources: ["Google SRE — blameless postmortems", "Amazon COE practice (public descriptions)"] }
    },
  ],
},
{
  id: "mob-8", week: "MOBILE WEEK 8", module: "MOBILE 8", title: "Verification culture", tag: "Mobile", accent: "#00E676",
  lessons: [
    {
      id: "mob-8.1", title: "Definition of Done for hardware features — and reporting partial as partial", type: "framework",
      content: `"Done" is the most dangerous word in hardware-adjacent software, because the demo that works on the bench and the feature that works in the field are separated by a canyon of environmental conditions.

**A hardware feature's Definition of Done, minimum bar:**
1. Works on **real hardware** — multiple physical units, not one golden device (units vary; the vendor's sample often behaves better than production units).
2. On **release builds** from the official lane — not debug builds (different signing identity, different performance, and identity-validating SDK paths only exercise on release).
3. On **both platforms**, or the exception is stated in writing.
4. **Environmental conditions covered**: app backgrounded, phone locked, device out of range and returning, low battery on both ends, OS permission revoked mid-session.
5. **Failure paths demonstrated**, not just happy paths: what does the user see when it fails? (If the answer is an eternal spinner, it's not done.)
6. **Evidence attached**: the checklist run, on which rig, with results — not "tested, works".

**Reporting partial as partial — the cultural half.** Bench-only work reported as "done" is how field incidents are born: the report travels up, decisions get made on it, testers get promised, and the gap surfaces as a production surprise. The honest vocabulary costs one word: "done on bench, field verification pending", "works Android-side, iOS unverified", "happy path verified, failure paths not yet". Precision about the *un*verified part is what makes a status report load-bearing.

Leaders set this constant: if partial reports are punished as slowness, people stop reporting partially — they report "done" and let the field find the rest. Reward the precision, and the team's reports become instruments you can navigate by.

Top-company practice: aerospace and medical-device cultures formalize this as verification stages with distinct names (bench / integration / field) — nobody says "done", everybody says which stage passed. Import the vocabulary, skip the paperwork.`,
      quiz: { q: "Why must hardware features be verified on release builds specifically, not debug builds?", a: "Release builds differ in signing identity (identity-validating vendor SDK paths only exercise there), performance characteristics, and OS treatment — a feature 'done' on a debug build has skipped exactly the conditions that break in the field; on some OS versions debug builds don't even launch normally for testers." },
      apply: `Write the DoD checklist for your private repo's device features (start from the six points above, add your device classes' specifics). Then re-grade your last three 'done' features against it — any that were actually 'bench-done' get their missing verification scheduled, and the report format gains the stage vocabulary.`,
      keys: ["Real units, release builds, both platforms, hostile conditions, failure paths, evidence", "Partial reported as partial is a feature, not slowness", "Name the verification stage instead of saying done"],
      meta: { lastVerified: "2026-08-17", sources: ["Verification & validation practice (IEC/ISO V&V vocabulary)", "Google testing blog — test reliability"] }
    },
    {
      id: "mob-8.2", title: "Unit-test vs hardware-verify: drawing the line", type: "technical",
      content: `You cannot unit-test a radio, and you cannot hand-test ten thousand edge cases. A device app's quality system is knowing which verification lane each kind of logic belongs to — and structuring code so more of it can ride the cheap lane.

**The unit/widget lane (fast, per-commit, CI):**
- Pure logic: version comparators, chart/axis math, zone summaries, sleep-timeline calculations, parsing and (de)serialization of device payloads.
- State machines: connection lifecycle transitions, sync-lock behavior, queue retirement rules — with the radio faked behind an interface.
- Regression pins: every field bug that CAN be reproduced in a test gets one, permanently.
The structural rule that feeds this lane: **decouple logic from I/O**. A byte-stream parser that takes bytes (not a live connection) is testable; the same logic inlined in a callback is not. Test distribution should mirror risk — if your riskiest subsystem has your densest tests, you're doing it right.

**The hardware lane (slow, per-release, humans):**
- Anything crossing the bridge for real: actual pairing, actual OTA, actual background sync overnight, actual multi-device interference.
- Scripted, not improvised: a written release-build test plan — numbered steps, expected results, a rig spec (handset, OS, firmware, unit count) — executable by someone who didn't build the feature. A build flag that exposes verification screens/toggles in release builds (\`--define VERIFY=true\` style) keeps this lane efficient without shipping debug UI to users.
- Recorded: each run's results filed with the release, so "did we test X on firmware Y?" has an answer.

**The line's litmus test:** if a test would still pass with the device in a drawer, it belongs in CI. If it genuinely needs the radio, it goes in the plan — and the logic around it should shrink until the radio-dependent core is as small as possible.

The anti-pattern at both extremes: teams that hand-test everything (release day takes a week, coverage decays) and teams that mock everything (450 green tests and the pairing flow broken on real units — the mock became the product).

Top-company practice: the test pyramid, honestly applied to embedded realities — wide unit base, thin scripted hardware top, and continuous pressure to move logic down the pyramid.`,
      quiz: { q: "What is the litmus test for whether a given check belongs in CI or in the release-build hardware plan?", a: "Would it still pass with the device in a drawer? If yes, it's logic — decouple it from I/O and run it per-commit in CI. If it genuinely needs the radio, script it into the hardware plan, and shrink the radio-dependent core so as much logic as possible moves to the CI lane." },
      apply: `On your private repo: map test distribution against your risk map (which subsystem caused the most field bugs?). If the riskiest area is thinly tested, extract one piece of its logic from I/O this week and pin it with tests. Then check your release test plan is executable by a non-author — hand it to one and watch.`,
      keys: ["Drawer test: no radio needed → CI lane", "Decouple logic from I/O to grow the cheap lane", "Hardware lane is scripted, recorded, non-author-executable"],
      meta: { lastVerified: "2026-08-17", sources: ["Test pyramid (Fowler)", "Working Effectively with Legacy Code — seams"] }
    },
    {
      id: "mob-8.3", title: "Be the first tester: drive the UI before handoff", type: "practice",
      content: `The cheapest quality gate in the whole pipeline is the builder spending ten minutes as the feature's first user — on a real device, through the real UI — before anyone else sees it. Obvious, universally skipped.

Why it gets skipped: after hours in the code, the builder "knows it works" — they watched the logs succeed. But logs verify the *mechanism*; users experience the *surface*. The gap between those is where handoff embarrassments live: the flow works but the button is beneath the keyboard; the sync succeeds but the UI never updates; the error is handled but the message says \`code 133\`.

**The first-tester protocol (10 minutes):**
1. **Install the artifact testers will get** — the release build from the pipeline, not your IDE run. (You're also verifying the delivery lane.)
2. **Walk the flow as the persona**, not the author: cold start, real device, thumb-only, no memory of what order screens come in.
3. **Do the rude things**: rotate mid-flow, background the app at the worst moment, kill and relaunch, turn the radio off halfway, tap the button twice.
4. **Screenshot the end state.** The final-state screenshot is the proof artifact: it forces you to actually reach the end state, and it gives the handoff message evidence instead of assertion.
5. **File your own findings first.** Anything you'd wince at a tester reporting, you fix or disclose now: "known: progress bar hangs 2s at 99%, fix queued".

For agent-assisted teams the same rule governs delegated work: **never hand off code you haven't driven**. An agent's (or contractor's, or teammate's) report describes intent; the walk-through verifies reality. Read the diff AND drive the surface — the seams (registration, persistence, state lifecycle) are where described-intent and actual-behavior diverge.

The handoff message that results: what changed, what you drove, on what rig, the screenshot, known gaps. Testers who receive this format return signal instead of noise — they're not re-discovering what you already knew.

Top-company practice: "dogfooding" is this protocol at company scale; the per-feature version is the builder eating first, before inviting guests.`,
      quiz: { q: "The builder watched clean logs all afternoon — why is that insufficient to skip the ten-minute UI walk-through?", a: "Logs verify the mechanism; users experience the surface. The gap between them — UI not updating on success, raw error codes shown, layout breaking mid-flow, delivery-lane issues — is invisible in logs and is exactly what the first-tester walk-through catches before testers do." },
      apply: `For your next change on the private repo: run the full protocol — install the pipeline's release build, walk the flow rudely, screenshot the end state, and write the handoff message with the known-gaps section. Time it. If it took more than 15 minutes, your delivery lane (not the protocol) needs fixing.`,
      keys: ["Install what testers install; drive what users drive", "Final-state screenshot is the proof artifact", "Never hand off code you haven't driven — reports describe intent, not reality"],
      meta: { lastVerified: "2026-08-17", sources: ["Dogfooding practice (industry standard)", "Code review research — author self-review effectiveness"] }
    },
  ],
},
{
  id: "mob-9", week: "MOBILE WEEK 9", module: "MOBILE 9", title: "Team operations", tag: "Mobile", accent: "#E040FB",
  lessons: [
    {
      id: "mob-9.1", title: "Branching and review rituals for a four-person team", type: "framework",
      content: `Process for a four-person hardware team is a dosage problem: too little and you get release-line collisions and unreviewed native code; too much and your fastest shipper spends afternoons on ceremony. The minimum effective dose:

**Branching:**
- **One protected main.** Nothing installs on a tester's device except builds CI produced from main (or an explicit release branch). Protection means: no direct pushes, PRs only.
- **Short-lived typed branches**: \`feat/\`, \`fix/\`, \`chore/\`, \`ci/\` prefixes; a branch lives days, not sprints. Naming by person (\`alice-fixes\`) instead of intent is the gateway drug to person-owned release lines — the previous module's expensive incident.
- **Big integrations land in slices behind flags**, not as six-week mega-branches. A device integration that can't merge weekly is scoped wrong.

**Review — the four-person version:**
- **Every PR gets one reviewer; native bridge code gets the strictest one.** Native code carries the highest field risk and the weakest test safety net; the review bar scales with irreversibility, not file count.
- **The author narrates.** A walkthrough note — what changed, why, what was verified on hardware, known gaps — turns the reviewer from archaeologist into auditor. For big branches, a walk-me-through-the-diff session (author drives, reviewer interrogates) catches what silent reading misses.
- **Review the claim, not just the code.** The PR says it fixes reconnection: does the evidence (chronicle beat, test, log capture) actually demonstrate it? Approving code-that-looks-right without proof-it-does-right is how "fixed" bugs return.
- **Merge readiness is a checklist, not a feeling**: gates green, hardware verification stated (with rig), docs updated, no unrelated diff hitchhikers.

The founder/CTO trap worth naming: when the strongest engineer is also the boss, their PRs skip review by social gravity. Fix it structurally — the review requirement is branch protection, not politeness; the machine doesn't care about seniority.

Top-company practice: Google's code-review culture (every change reviewed, readability over cleverness) scaled to a team of four — the ritual survives because it's small enough to run every day.`,
      quiz: { q: "Why should review strictness scale with the code's irreversibility rather than the diff's size?", a: "Because a ten-line native-bridge or OTA change can brick devices or corrupt field data — risks tests can't catch and patches can't hot-fix — while a 500-line UI refactor is fully reversible. Reviewer attention is scarce; spend it where mistakes are permanent." },
      apply: `On your private repo: check branch protection on main (PRs required? who can bypass?). Then look at the last five merged PRs: did each state what was verified on hardware and on what rig? Add the merge-readiness checklist as a PR template this week.`,
      keys: ["One protected main; branches typed, short-lived, intent-named", "Review the claim's evidence, not just the code", "Strictness scales with irreversibility; bosses don't bypass"],
      meta: { lastVerified: "2026-08-17", sources: ["Google eng practices — code review guidelines", "Trunk-based development"] }
    },
    {
      id: "mob-9.2", title: "Docs as artifacts: SRS, chronicles, decision logs", type: "framework",
      content: `A four-person hardware team can't afford a documentation department — so it must only write documents that DO work. Four artifact types earn their keep; most other docs are decoration.

**1. The SRS (software requirements spec) — for native surfaces you hand to others.** When a feature spans app + native + vendor SDK (device settings, notification mirroring), a numbered requirements doc is what lets a second engineer — or a contractor, or an agent — implement without re-deriving intent from chat history. Numbered requirements are testable requirements: the release checklist cites them by number.
**2. The debugging chronicle** (module 7): the investigation's evidence trail. Written during, kept forever.
**3. The decision log — one line per irreversible choice.** "Chose vendor X over Y for scales: cloud API needs only key+secret; on-device route required per-product config we can't get. Revisit if: vendor ships offline SDK." Date, decision, reason, revisit-condition. Ten minutes to write; saves the quarterly "wait, why did we…" archaeology that otherwise consumes a meeting each.
**4. The runbook — for anything done twice under pressure.** CLI auth across platforms, build-from-fresh-machine, release steps, credential rotation. The test of a runbook: someone who didn't write it executes it without asking questions. Runbooks rot fastest of the four — stamp each with a last-verified date, and treat an execution failure as a doc bug to fix immediately.

The meta-rules that keep the system alive:
- **Docs live in the repo**, versioned with the code they describe — a wiki nobody diffs is where truth goes to die.
- **One source of truth per fact.** When a doc must exist in two places, one declares itself canonical and the other links to it. Duplicated docs drift within a month, then contradict, then both get ignored.
- **A doc that lied to you once gets fixed or deleted the same day.** Stale docs are worse than none: they spend your trust budget.

Top-company practice: Amazon's writing culture (narratives over slides) and Google's design docs — scaled down: the four artifact types above are the survivable subset for a team that also has to ship.`,
      quiz: { q: "What single line in a decision log entry converts it from history into an operating tool, and why?", a: "The revisit-condition ('revisit if vendor ships X / cost exceeds Y') — it turns a static record into a standing trigger: when the world changes in the named way, the team knows the decision is up for re-evaluation instead of rediscovering the debate from scratch." },
      apply: `On your private repo: start the decision log with the last five irreversible choices (vendor picks, architecture commitments) — date, decision, reason, revisit-condition. Then pick your most-used runbook, hand it to the team member who didn't write it, and fix every step where they had to ask.`,
      keys: ["Four artifacts that work: SRS, chronicle, decision log, runbook", "Docs in the repo, one canonical home per fact", "Revisit-conditions turn records into triggers"],
      meta: { lastVerified: "2026-08-17", sources: ["Amazon narrative culture (public accounts)", "Google design-doc practice"] }
    },
    {
      id: "mob-9.3", title: "Multi-repo product orgs: app, plugins, forks, infra", type: "systems",
      content: `A hardware product is never one repo. The typical constellation: the app repo, one plugin package per device SDK, a fork or two of vendor code, an infra repo (or directory) for backend definitions, and tooling scripts. Multi-repo is fine; **undocumented topology** is what hurts.

The failure modes:
- **The invisible dependency.** The app pins a git dependency on your fork of a vendor plugin; the fork's repo has no README explaining its delta. A year later nobody dares upgrade it (covered per-fork in module 2 — here the point is the MAP of all of them).
- **Knowledge divergence.** The same fact — how to authenticate to platform CLIs, what the release steps are — documented differently in two repos. One is stale; readers can't tell which.
- **Two generations in one codebase.** Migrations leave both the old and new integration for the same device class in the tree (an old cloud-based path and a new native-SDK path), plus \`temp/old-*\` branches. Without a status note saying which is live, every newcomer — human or AI agent — wastes a day discovering the answer, or worse, extends the dead one.
- **Cross-repo releases with no ordering.** A protocol change lands in the plugin repo; the app repo's pin doesn't move; production runs a mismatch neither repo's tests can see.

The disciplines, sized for a small team:
- **A topology doc in the app repo** (the constellation's natural center): every repo/package, what it is, who owns it, how it's pinned, its status (live / migrating / deprecated). One page. This is the doc a new engineer — or an agent onboarding onto the codebase — reads first.
- **Deprecation notes at the point of confusion**: a header comment in the dead integration's entry file ("superseded by X, kept until migration completes, do not extend") beats a wiki page nobody opens.
- **Pin moves are PRs with changelogs**, treated as releases of the constellation, not chores.
- **Version the contract, not just the code**: when plugin and app must move together, a compatibility line in both changelogs ("app ≥3.9 requires plugin ≥2.1") is the two-repo substitute for a monorepo's atomic commit.

Top-company practice: platform teams publish an internal "service catalog" — owner, status, contract, dependencies per component. Your one-page topology doc is that catalog at hardware-startup scale.`,
      quiz: { q: "Two integrations for the same device class coexist in the app — an old cloud-path and a new SDK-path. What's the minimum-cost discipline that prevents the next engineer (or agent) from extending the dead one?", a: "A deprecation note at the point of confusion: a header comment in the dead path's entry file naming the replacement, why it's kept, and 'do not extend' — discoverable exactly where the mistake would begin, unlike a wiki page nobody opens." },
      apply: `Write the one-page topology doc for your private constellation: every repo/package/fork, ownership, pinning, status. Then add deprecation headers to the entry files of every superseded integration still in the tree. Delete any temp/old-* branches whose content is fully captured.`,
      keys: ["One-page topology doc: repo, owner, pin, status", "Deprecation notes live at the point of confusion", "Cross-repo pin moves are releases with compatibility lines"],
      meta: { lastVerified: "2026-08-17", sources: ["Backstage/service-catalog practice", "Monorepo vs multi-repo literature"] }
    },
  ],
},
{
  id: "mob-10", week: "MOBILE WEEK 10", module: "MOBILE 10", title: "AI-native hardware development", tag: "Mobile", accent: "#FF8A00",
  lessons: [
    {
      id: "mob-10.1", title: "Agent guardrails for a device codebase", type: "systems",
      content: `Coding agents are now teammates on device codebases — teammates with infinite stamina, zero fear, and no innate sense of which file can brick hardware. You don't manage that with vibes; you manage it with a **control plane in the repo**.

The layers, cheapest first:
- **Context files** (the agent's onboarding doc): what this codebase is, the layer rules, the device corridors, what "done" means here. The same topology doc and conventions humans need — agents just read them more reliably.
- **Per-domain rules files**: the gotchas that took days to learn, written as constraints. "Generated files are gitignored — regenerate after branch switch." "All device commands go through the queue." "This integration is deprecated, do not extend." Every hard-won lesson from this course's earlier modules becomes one line an agent can't miss.
- **Hooks — mechanical guards at the action boundary**: scripts that run before/after agent actions and BLOCK the dangerous classes: touching secret-shaped files, editing generated code, committing to main, pushing without the leak scan. Rules advise; hooks enforce. The distinction matters because agents (like humans) skim docs under deadline pressure but cannot skim a failing gate. Guard scripts must be verified against the runner that executes them (a hook that silently fails-open because of a path or quoting bug is worse than no hook — it's confidence without protection). Test your guards by violating them on purpose.
- **Skills/runbooks — codified procedures**: the new-device intake pipeline, the release ritual, encoded as step-by-step procedures the agent executes the same way every time. Your best engineer's habits, made reproducible.
- **Risk-tiered autonomy.** Map action classes to freedom: reads and searches — free; app-layer edits — act, then show; native bridge, OTA logic, migrations, anything touching credentials — propose, human approves. The tier boundary follows *irreversibility*, the same gradient as review strictness (module 9) and OTA gates (module 4). One coherent principle, three applications.

Anti-pattern: guardrails as friction theater — asking approval for every trivial edit trains the human to approve without reading, which is worse than autonomy. Block at the harm boundary, be free everywhere else.

Top-company practice: this is defense-in-depth from security engineering applied to agent operations: layered controls, fail-closed on the irreversible paths, audited regularly by attempted violation.`,
      quiz: { q: "Why must a guard hook be tested by deliberately violating it, rather than trusting that it's configured?", a: "Because a hook with a path, quoting, or runner mismatch fails OPEN — it silently never fires, and you operate with confidence but no protection. Only a deliberate violation that gets blocked proves the guard actually executes in the real runner." },
      apply: `On your private repo: write the risk-tier map (action class → free / act-and-show / propose-and-approve). Then test every existing guard by violating it on purpose and record which ones actually block. Add one hook for the highest-risk unguarded action class.`,
      keys: ["Rules advise, hooks enforce — at the harm boundary only", "Autonomy tiers follow irreversibility", "Guards are tested by attempted violation"],
      meta: { lastVerified: "2026-08-17", sources: ["Defense-in-depth security practice", "Agentic coding tool docs (rules/hooks mechanisms, representative)"] }
    },
    {
      id: "mob-10.2", title: "Delegation and audit: read delegated code before done", type: "practice",
      content: `Delegating to an agent (or a contractor, or a fast teammate) has one iron law: **the report is not the work.** A delegate's summary describes intent — what it believes it built. Between that belief and field reality live the exact bugs that hurt: the handler registered but never invoked, the state persisted but never rehydrated, the error caught and silently swallowed.

The audit protocol for delegated work on a device codebase:
1. **Read the full diff.** Not the summary, not the file list — the hunks. You're auditing claims: for each thing the report says, find the code that makes it true. Anything you can't verify in the diff gets re-tested, not believed. Delegating the audit itself to "looks good" is delegation squared.
2. **Check the seams first.** Delegates write plausible middles; the failure lives at integration points — registration (is the new provider actually wired into the graph?), persistence (does the new field survive save/load?), lifecycle (who disposes the subscription? what happens on reconnect?). Walk the user flow end to end through the code.
3. **Run the gates yourself.** "Tests pass" in a report is a claim; your terminal is a fact. Same for lint, build, and — for device work — the hardware walk (module 8's first-tester protocol applies unchanged to delegated code: drive it before handoff).
4. **Audit for scope creep and hitchhikers.** Diffs that "fixed" adjacent things nobody asked for, deleted a safety check that looked redundant, or added a dependency for a one-line job. Agents especially love unrequested improvements; unrequested means unreviewed-by-design.
5. **Feed corrections back as constraints.** Every audit finding becomes a rule-file line or a hook (previous lesson) so the same class of miss can't recur. An audit that only fixes the instance has half its value.

The economics: auditing costs ~20% of doing the work yourself and catches the majority of delegation failures. Skipping the audit converts that 20% into field incidents at 10x the price — hardware users don't file bug reports, they file returns.

Top-company practice: this is code review turned inward — the reviewer's mindset ("verify the claim") applied to work done under your own name. Google-style review culture never exempted fast authors; agent delegation doesn't either.`,
      quiz: { q: "Why do delegated-code failures cluster at seams — registration, persistence, lifecycle — rather than in the core logic?", a: "Because delegates generate plausible self-contained middles; the seams require whole-system knowledge — what wires into what, what survives restart, who owns cleanup — which the delegate lacks and its report can't verify. So the audit walks the seams first, not the algorithm." },
      apply: `Take the last agent- or contractor-delivered change on your private repo and audit it retroactively with the five steps: full diff, seams, gates rerun, hitchhikers, constraint extraction. Record what you find — a clean retro-audit builds calibrated trust; findings prove the protocol's ROI.`,
      keys: ["The report is not the work — audit the claims", "Seams first: registration, persistence, lifecycle", "Every finding becomes a constraint, not just a fix"],
      meta: { lastVerified: "2026-08-17", sources: ["Code review research (defect clustering at interfaces)", "Google eng practices — reviewer standard"] }
    },
    {
      id: "mob-10.3", title: "The learning loop: retros that update the rules", type: "framework",
      content: `Everything in this course compounds through one weekly habit: the **retro that ends in a rule change**. Not a feelings meeting — an engineering procedure with inputs, a diff, and outputs.

**Inputs (30 minutes, honest sources only):**
- The week's incidents and near-misses (postmortem list, module 7).
- Guard-block logs: which hooks fired, which rules were violated-then-caught (module 10.1's guards produce this for free).
- Audit findings from delegated work (module 10.2).
- Friction notes: where did a human or agent get stuck, re-derive known truth, or ask a question a doc should have answered?

**The transform — each finding becomes exactly one of:**
- **A new constraint**: a rule line, a hook, a CI gate, a gitignore pattern. (Errors are missing constraints — the strongest output.)
- **A doc fix**: the runbook step that lied, the topology doc missing the new repo, the deprecation note that would have saved an hour.
- **A procedure change**: the checklist gains a line; the intake pipeline gains a gate.
- **A deliberate no-change**, recorded: "saw it, accepted the risk because X" — so next quarter doesn't relitigate.

**Outputs:** a small PR against the rules/docs/hooks — reviewed like code, because it IS code (it programs future behavior of humans and agents alike). Plus one metric glance: are guard-blocks trending down (constraints working) or repeating (constraint exists but doesn't bite)?

**The discipline that keeps it honest:**
- **Recommend, then apply.** The retro proposes rule changes; a human approves the enforcement changes — self-tightening systems that nobody reviews drift into either bureaucracy or theater.
- **Prune as eagerly as you add.** A rules file that only grows becomes noise nobody reads; each retro should ask which rule hasn't earned its place. Ten constraints that bite beat fifty that scroll past.
- **Close the loop on last week's changes**: did the new constraint actually fire/help? A constraint that never fires is either working perfectly or aimed at nothing — check which.

This is the whole course in miniature: every module taught a class of error and the constraint that kills it. The retro is the machine that keeps discovering new classes and installing new constraints — the team that runs it gets measurably harder to hurt every single week.

Top-company practice: SRE's "postmortem action-item review" plus Toyota-style kaizen — small, continuous, evidence-driven improvements to the system that produces the work, not just the work.`,
      quiz: { q: "Why must retro outputs land as a reviewed PR against rules/docs/hooks rather than as meeting notes?", a: "Because rules, hooks, and runbooks are code that programs future behavior — a PR makes the change concrete, reviewable, versioned, and enforceable, while meeting notes decay into intentions nobody executes. If the retro didn't produce a diff, it produced nothing." },
      apply: `Run the retro on your private repo this week with the four inputs. Produce the PR: at least one new constraint, one doc fix, and one pruned rule. Set the recurring 30-minute slot. In four weeks, check the metric: did any constraint added in week one prevent a repeat?`,
      keys: ["Every finding becomes a constraint, doc fix, procedure change, or recorded acceptance", "Rule changes ship as reviewed PRs — they are code", "Prune rules as eagerly as you add them"],
      meta: { lastVerified: "2026-08-17", sources: ["Google SRE — action-item follow-through", "Kaizen / continuous improvement practice"] }
    },
  ],
},
];
