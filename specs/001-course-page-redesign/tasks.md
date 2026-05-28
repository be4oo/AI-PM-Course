---
description: "Task list for Editorial-Dark Course Page Redesign (001-course-page-redesign)"
---

# Tasks: Editorial-Dark Course Page Redesign

**Input**: Design documents from `/specs/001-course-page-redesign/`

**Prerequisites**: `plan.md` (required), `spec.md` (required — clarified 2026-05-26), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Included. The spec treats automated tests as a release gate (SC-003 viewport regression suite, SC-004 keyboard shortcut suite, SC-005 round-trip import/export, SC-006 per-variant contrast evidence, SC-008 four-tool guard, plus reduced-motion and RTL parity from FR-023a, FR-028).

**Project type**: Single React 19 + Vite project. All new code lives under `src/course/`. Tests are colocated as `*.test.{js,jsx}`. The only file outside `src/course/` modified by this feature is `src/App.jsx` (delegate the `view === "learn"` branch to `<CourseShell>`).

**Note on plan/spec drift**: `/speckit-clarify` ran after `/speckit-plan`. Tasks below incorporate the five clarifications directly (gzipped per-chunk bundle gate, 4 enumerated accents + per-variant contrast, `prefers-reduced-motion`, Lighthouse mobile preset, `mena-note` callout). `plan.md` and `research.md` carry a small drift — captured in the polish phase as docs-sync tasks rather than rerun gates.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Maps to user story from `spec.md` (US1–US5); omitted for Setup / Foundational / Polish
- File paths are absolute under repo root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffolding, lint rules, and CI gates that all stories depend on.

- [X] T001 Create directory tree `src/course/{shell,tools,account,palette,tweaks,hooks,lib,styles}/` with empty `.gitkeep` placeholders so subsequent `[P]` tasks can land in parallel
- [X] T002 [P] Add ESLint flat-config override scoped to `src/course/**` forbidding `background-color: var(--module-*)` and equivalent property names (rule per Plan R4) — edit `eslint.config.js`
- [X] T003 [P] Add `scripts/check-bundle.mjs` that walks `dist/assets/**.js` after `vite build` and fails on any chunk over 500 KB gzipped (per spec Clarification §1 + SC-007); wire into `npm run build` via a `postbuild` script in `package.json`
- [X] T004 [P] Add `scripts/lighthouse-mobile.mjs` running Lighthouse against the production build under the mobile preset (Moto G Power emulation, 4× CPU throttle, Slow 4G) and asserting LCP < 2.5s (per spec Clarification §4 + SC-007); add `npm run perf:lighthouse` script
- [X] T005 [P] Add Vitest jsdom viewport mock helper at `src/test-utils/viewport.js` that snaps the test environment to 375 / 768 / 1024 / 1440 px on demand (supports SC-003 and SC-004)
- [X] T006 [P] Add a `<dir>`-toggle test helper at `src/test-utils/rtl.js` for the RTL parity tests (supports FR-028)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Tokens, scope, hooks, and the modal frame that every user story needs. No user-story work begins until this phase is complete.

**⚠️ CRITICAL**: Phase 2 gates all subsequent phases.

- [X] T007 [P] Implement `src/course/lib/designTokens.js` exporting the editorial-dark token map (bg, bg-elev, ink, ink-dim, rule, accent, fonts) and the **4 enumerated accent variants** (`copper`, `sage`, `ink-blue`, `iron`) per FR-025 (clarified)
- [X] T008 [P] Implement `src/course/lib/moduleColor.js` exporting `MODULE_MARKER_PALETTE` (12 colors) and `moduleColor(moduleId)`; pure module — no DOM
- [X] T009 [P] Implement `src/course/styles/tokens.css` defining `:where(.course-shell) { --bg, --bg-elev, --ink, ... }` with `data-accent` / `data-display` / `data-density` selector variants driving the live Tweaks swap (per Plan R3)
- [X] T010 [P] Implement `src/course/styles/course.module.css` with the shell-scoped layout, including a `@media (prefers-reduced-motion: reduce)` block that disables all transitions and sets `scroll-behavior: auto` everywhere under `.course-shell` (per FR-023a)
- [X] T011 [P] Implement `src/course/lib/progressSnapshot.js`: `buildSnapshot(state)` and `parseSnapshot(json)` against `contracts/progress-snapshot.schema.json`; reject unknown major schema versions; drop unknown lesson IDs with a count (per FR-010, SC-005, data-model.md migration plan)
- [X] T081 [P] Implement `src/course/lib/legacyStorageMigration.js`: one-time migration on first `<CourseShell>` mount — read existing legacy keys produced by `buildLessonStorageKey`/`buildCohortStorageKey`/`buildReviewStorageKey` and write to the `course/*` namespace if it is empty; legacy keys remain read-only after migration. Co-locate `legacyStorageMigration.test.js` (fixtures: empty target, partially populated target, missing legacy). Per data-model.md §"Storage key registry" — closes coverage gap C2 from `/speckit-analyze`.
- [X] T012 [P] Implement `src/course/lib/outlineFromLesson.js` returning ordered `{ id, label }` entries from a lesson's `RichContent` body (drives RightRail outline; pure function)
- [X] T013 [P] Implement `src/course/lib/adversarialScoring.js` — extract `scoreArtifactAgainstRubric`, `resolveArtifactContent`, and `REVIEW_SIGNAL_MAP` from `src/App.jsx` to break the future circular import; leave `App.jsx`'s in-place copies as thin re-exports for backward compatibility during transition (per Plan R8)
- [X] T014 [P] Implement `src/course/hooks/useTweaks.js` — reads/writes `course/tweaks/v1` in localStorage, applies `data-accent`, `data-display`, `data-density` attributes to the shell root; default fallback for unknown values (per data-model TweaksPreferences validation)
- [X] T015 [P] Implement `src/course/hooks/useFocusTrap.js` — Tab/Shift+Tab cycles inside the modal; restores focus on unmount to a supplied element (per Contract tool-modal-protocol.md)
- [X] T016 [P] Implement `src/course/hooks/useActiveLesson.js` — reads/writes URL hash, exposes `{ moduleIndex, lessonIndex, sectionId }`, syncs with the existing `navigateToLesson` setter supplied by `App.jsx` (per FR-006, data-model.md)
- [X] T017 [P] Implement `src/course/hooks/useScrollOutline.js` — `IntersectionObserver` with `rootMargin: "-30% 0% -65% 0%"` returning the currently-highlighted section id (per Plan R2, FR-007)
- [X] T018 [P] Implement `src/course/hooks/useKeyboardShortcuts.js` skeleton — registers global listeners with input-focus suppression and modal-state suppression (per Contract keyboard-shortcuts.md). Story phases plug in individual shortcuts.
- [X] T019 Implement `src/course/tools/ToolModal.jsx` — shared modal frame: portal mount into `#course-modal-root`, focus-trap via T015, Esc-close, backdrop-click close, body-lock, scroll-position save/restore on the reading column, `aria-modal=true` + `aria-labelledby`; one-at-a-time invariant (per Contract tool-modal-protocol.md, FR-011, FR-016) **— depends on T015**
- [X] T020 Add `#course-modal-root` to `index.html` as a sibling of `#root`
- [X] T021 [P] Tests for ToolModal: focus-trap on open, focus-restore on close, Esc-close behavior, scroll-position fidelity, swap-then-open (FR-016) — file `src/course/tools/ToolModal.test.jsx` **— depends on T019**
- [X] T022 [P] Tests for `progressSnapshot.js`: round-trip equality on a fixture, schema-version rejection, unknown-lesson-id counted-and-dropped — file `src/course/lib/progressSnapshot.test.js` **— depends on T011** (validates SC-005)
- [X] T023 [P] Test for `designTokens.js` and `moduleColor.js`: 12 markers in palette, 4 accent variants enumerated, no overlap — file `src/course/lib/designTokens.test.js`

**Checkpoint**: Foundation ready. The modal frame, hooks, tokens, persistence shape, and CI gates are all in place. User stories begin.

---

## Phase 3: User Story 1 — Read a lesson in a focused editorial layout (Priority: P1) 🎯 MVP

**Goal**: A learner opens the course page and reads a lesson in the three-column editorial-dark layout with a scroll-tracked outline, typographic callouts (incl. `mena-note`), module color appearing only as a 2px marker, and the active artifact surfaced.

**Independent Test**: Mount `<CourseShell>` with a fixture lesson; (a) right-rail outline highlights the current section as you scroll, (b) module color appears nowhere as a background fill, (c) no callout renders as a coloured box, (d) the artifact link is visible in the reading column when the lesson has one, (e) `mena-note` blocks render when present and the layout is unaffected when absent.

### Implementation for User Story 1

- [X] T024 [P] [US1] Implement `src/course/shell/ReadingColumn.jsx` — serif title, calm sans body, switch-renderer for `RichContent` block kinds (heading, prose, list, takeaways, leadership-note, case-study, code, image, **`mena-note`** per FR-028a, **`artifact-link`** per FR-026); module marker via `border-inline-start` only (no fills, FR-004) **— depends on T009, T010**
- [X] T025 [P] [US1] Implement `src/course/shell/RightRail.jsx` — outline list driven by `useScrollOutline`, study-mode pills (Skim / Deep / Exec), lesson actions (bookmark, listen, copy), "next due review" affordance that triggers the Spaced review modal (per FR-005) **— depends on T017**
- [X] T026 [US1] Implement `src/course/CourseShell.jsx` v1 — three-column shell (sidebar slot, reading column, right rail), header slot, modal portal root; wires `useActiveLesson`, `useTweaks`, `useScrollOutline`, `useKeyboardShortcuts` (with US1-relevant shortcuts only — see US5 for full layer); reads curriculum + progress props from `App.jsx`; invokes `legacyStorageMigration` (T081) exactly once on first mount before reading any `course/*` key **— depends on T024, T025, T014, T016, T081**
- [X] T027 [US1] Modify `src/App.jsx` — replace the `view === "learn"` JSX branch with `<CourseShell ... />`, passing all existing learn-view state as props (completed, bookmarks, studyMode, navigateToLesson, etc.). Do not touch any other `view === "..."` branch. Per Quickstart §2
- [X] T028 [P] [US1] Test `src/course/shell/ReadingColumn.test.jsx` — asserts (a) `mena-note` block renders when supplied and is absent when not, (b) no element has a computed `background-color` matching a module-marker token, (c) the artifact link is visible when `lesson.artifact` is supplied
- [X] T029 [P] [US1] Test `src/course/shell/RightRail.test.jsx` — outline scroll-tracking (jsdom + simulated scroll), outline-click smooth-scroll falls back to instant under `prefers-reduced-motion: reduce`
- [X] T030 [P] [US1] Test `src/course/CourseShell.test.jsx` — three-column layout at 1024px + 1440px (uses T005 viewport helper), single-column at 375px, no horizontal scroll at any of 375/768/1024/1440px (validates SC-003)

**Checkpoint**: A learner can open the course page and read a lesson in the new editorial-dark layout. US1 ships as the MVP.

---

## Phase 4: User Story 2 — Quiet, learner-focused sidebar (Priority: P1)

**Goal**: A single progress meter, collapsible module list, and a Practice rail with exactly four tools (no author / audit views in the sidebar).

**Independent Test**: Render `<Sidebar>` with the full curriculum; (a) sidebar contains the progress meter, then modules, then exactly four Practice items in this order: Spaced review, Adversarial review, Capstone, Knowledge map. (b) Author/audit views (Audit, Sources, Cohort, Coverage, Community, Glossary, Cheatsheets, Tools, Exec, Live, Changelog, Reviews, Templates, Ops) appear nowhere. (c) Completed lessons show one indicator, not three.

### Implementation for User Story 2

- [X] T031 [P] [US2] Implement `src/course/tools/practiceTools.js` — frozen array of exactly four entries `{ id, label, Component }` for `spaced-review`, `adversarial-review`, `capstone`, `knowledge-map` (Plan R10, SC-008). Component refs are placeholders for now; real components land in US3.
- [X] T032 [P] [US2] Test `src/course/tools/practiceTools.test.js` — asserts `PRACTICE_TOOLS.length === 4` and the sorted id list equals exactly the four allowed ids; this is the SC-008 build gate
- [X] T033 [US2] Implement `src/course/shell/Sidebar.jsx` — progress meter (course aggregate), collapsible module list (uses module marker color as a 2px rule only), Practice rail rendering from `PRACTICE_TOOLS`. No author/audit entries. **— depends on T008, T031**
- [X] T034 [US2] Wire `<Sidebar>` into `<CourseShell>` slot — replace any earlier placeholder; thread `openTool` callback for Practice rail items **— depends on T026, T033**
- [X] T035 [US2] Move the single Mark-complete affordance to the bottom of `<ReadingColumn>` (one place, not three — per FR-017); remove any redundant completion controls that would otherwise leak through from props **— depends on T024**
- [X] T036 [P] [US2] Implement `src/course/shell/MobileChrome.jsx` — at < 768px renders the sidebar behind a hamburger and the right-rail outline behind an "Outline" toggle, preserving keyboard reachability (per FR-024) **— depends on T033, T025**
- [X] T037 [P] [US2] Test `src/course/shell/Sidebar.test.jsx` — exactly 4 Practice items, no author/audit entries, active lesson visually distinguished, single completion indicator
- [X] T038 [P] [US2] Test `src/course/shell/MobileChrome.test.jsx` — at 375px the sidebar is hidden by default, hamburger reveals it, focus order is correct (validates Edge Case "narrow viewport")

**Checkpoint**: US1 + US2 deliver a clean reading-first experience. Tools are still stubbed; US3 lights them up.

---

## Phase 5: User Story 3 — Tool modals (Priority: P2)

**Goal**: Each of the four Practice rail tools opens as a working modal over the current lesson; closing restores scroll position; only one modal is visible at a time.

**Independent Test**: From a lesson, clicking each Practice item opens the corresponding modal with the documented content (flashcard session, persona picker + rubric, 6-milestone view, lesson constellation). Pressing Esc or clicking close returns the learner to the same scroll position.

### Implementation for User Story 3

- [X] T039 [P] [US3] Implement `src/course/tools/SpacedReviewModal.jsx` — flashcard session: reveal action + four grading buttons (Forgot, Hard, Good, Easy), session-summary phase (per FR-012, data-model SpacedSession); uses `<ToolModal>` frame **— depends on T019**
- [X] T040 [P] [US3] Implement `src/course/tools/AdversarialReviewModal.jsx` — persona picker + paste-or-link artifact field; submit invokes `adversarialScoring.js` (from T013); render scored rubric verdict (per FR-013, data-model AdversarialSession) **— depends on T013, T019**
- [X] T041 [P] [US3] Implement `src/course/tools/CapstoneModal.jsx` — 6-milestone view fed by `src/data/capstoneDashboard.js`, stats + lesson gating (per FR-014, data-model CapstoneView) **— depends on T019**
- [X] T042 [P] [US3] Implement `src/course/tools/KnowledgeMapModal.jsx` — module-grouped lesson constellation; click-to-jump closes the modal and navigates to that lesson (per FR-015, data-model MapView) **— depends on T019, T016**
- [X] T043 [US3] Wire `practiceTools.js` `Component` refs from T031 to the real components — `SpacedReviewModal`, `AdversarialReviewModal`, `CapstoneModal`, `KnowledgeMapModal` **— depends on T039, T040, T041, T042**
- [X] T044 [US3] In `<CourseShell>`, add the `openTool(toolId, openedFrom)` reducer that enforces FR-016 (close-then-open swap behavior); thread to `<Sidebar>`, `<RightRail>` ("next due review" → Spaced review), and `<CommandPalette>` (later, US4) **— depends on T034, T043**
- [X] T045 [P] [US3] Test `src/course/tools/SpacedReviewModal.test.jsx` — reveal toggles answer, four grade buttons advance the index, summary phase appears at the end
- [X] T046 [P] [US3] Test `src/course/tools/AdversarialReviewModal.test.jsx` — persona picker present, paste path produces a verdict, link path uses `resolveArtifactContent`, no network calls when paste is used
- [X] T047 [P] [US3] Test `src/course/tools/CapstoneModal.test.jsx` — exactly 6 milestones rendered, lesson-gating state derived from completion
- [X] T048 [P] [US3] Test `src/course/tools/KnowledgeMapModal.test.jsx` — lessons grouped by module, click-to-jump invokes navigation and closes the modal
- [X] T049 [P] [US3] Cross-tool test `src/course/tools/ToolStack.test.jsx` — opening tool B while tool A is open closes A first then mounts B; one modal in the DOM at a time (validates FR-016)

**Checkpoint**: All four tools work. The reading-first experience is complete for power-using learners.

---

## Phase 6: User Story 4 — Confident header + account menu (Priority: P2)

**Goal**: Editorial italic-roman wordmark, `⌘K` palette trigger, streak chip, avatar; clicking the avatar opens an account menu with six items (Profile & cohort, Export progress, Import progress, Display & settings, Keyboard shortcuts, Sign out). Nothing wraps at any of 375 / 768 / 1024 / 1440 px.

**Independent Test**: Render `<Header>` at each of the four viewport widths and assert no element wraps to a second line; cohort subtitle present only at ≥1024px. Click the avatar; menu shows exactly six items in the documented order. Export downloads JSON; Import accepts JSON; Display opens Tweaks; Shortcuts opens help; the Profile modal exposes hidden audit/sources links.

### Implementation for User Story 4

- [X] T050 [P] [US4] Implement `src/course/account/AccountMenu.jsx` — six items in exact order (Profile & cohort, Export progress, Import progress, Display & settings, Keyboard shortcuts, Sign out) per FR-009; one callback per item
- [X] T051 [P] [US4] Implement `src/course/account/ProfileModal.jsx` — cohort stats, bookmarks, recent completions; includes hidden-but-reachable links to legacy audit-view and source-library views via `openLegacyView` prop (validates FR-027 Benchmark Transparency) **— depends on T019**
- [X] T052 [P] [US4] Implement `src/course/account/ImportProgressModal.jsx` — drag-drop or browse; validates against schema via `parseSnapshot` (T011); shows count of unknown lesson IDs dropped; rejects malformed JSON with a human-readable error (per FR-010, Edge Case) **— depends on T011, T019**
- [X] T053 [P] [US4] Implement `src/course/account/ShortcutsModal.jsx` — renders the keyboard contract from `contracts/keyboard-shortcuts.md` as a help table **— depends on T019**
- [X] T054 [P] [US4] Implement `src/course/tweaks/TweaksPanel.jsx` — three controls (accent / display / density) wired to `useTweaks`; opens via `<ToolModal>` from "Display & settings" **— depends on T014, T019**
- [X] T055 [P] [US4] Implement `src/course/palette/CommandPalette.jsx` — `⌘K` search; index built from curriculum at open (lessons + section headings); legacy `view:` entries (audit, sources, cohort, etc.) surfaced **only** when query starts with `>` (per Plan R7, FR-020, FR-027) **— depends on T019, T016**
- [X] T056 [US4] Implement `src/course/shell/Header.jsx` — italic-copper "ai" / hairline divider / roman-cream "PM" wordmark in Newsreader; cohort subtitle at ≥1024px only; `⌘K` trigger button; streak chip; avatar button mounts `<AccountMenu>` on click **— depends on T050**
- [X] T057 [US4] Wire `<Header>` slot in `<CourseShell>`; thread Export / Import / Display / Shortcuts / Profile / Sign out callbacks; wire CommandPalette open from `⌘K` button click and (later) the keyboard shortcut **— depends on T056, T055, T051, T052, T053, T054**
- [X] T058 [US4] Implement the Export action — call `buildSnapshot(state)` (T011), trigger a browser download named `ai-pm-course-progress-YYYY-MM-DD.json` **— depends on T011, T057**
- [X] T059 [P] [US4] Test `src/course/shell/Header.test.jsx` — at 375 / 768 / 1024 / 1440 px no element wraps to two lines; cohort subtitle visible only at ≥1024px (validates FR-008, SC-003)
- [X] T060 [P] [US4] Test `src/course/account/AccountMenu.test.jsx` — six items in exact order per FR-009
- [X] T061 [P] [US4] Test `src/course/palette/CommandPalette.test.jsx` — empty query shows lessons + sections; query `>` reveals legacy-view entries (audit, sources); plain `audit` query does NOT (validates Plan R7 and Principle I)
- [X] T062 [P] [US4] Test `src/course/account/ImportProgressModal.test.jsx` — valid file applies state; malformed JSON shows error and leaves state untouched; unknown lesson IDs counted in summary (validates Edge Cases)

**Checkpoint**: US1–US4 deliver the full editorial-dark course experience minus power-user keyboard shortcuts.

---

## Phase 7: User Story 5 — Keyboard layer (Priority: P3)

**Goal**: Full keyboard contract from `contracts/keyboard-shortcuts.md` operates on the page when no input is focused; Esc always closes the topmost modal.

**Independent Test**: With the page loaded and no input focused, each shortcut produces its documented effect. With a `<textarea>` focused, the global layer is suppressed except `Esc`. Inside an open modal, the global layer is suppressed except `Esc`.

### Implementation for User Story 5

- [X] T063 [US5] Extend `useKeyboardShortcuts.js` (T018) with the full layer: `⌘K` / `Ctrl+K` (palette), `?` (shortcuts), `b` (bookmark), `j` / `k` (next/prev lesson, crossing module boundaries), `e` / `q` (Practice / Self-test disclosures), `r` (Adversarial review), `Esc` (close topmost modal); honour focus-suppression rules per Contract keyboard-shortcuts.md **— depends on T018, T026, T044, T055**
- [X] T064 [P] [US5] Test `src/course/hooks/useKeyboardShortcuts.test.jsx` — every shortcut produces documented effect (validates SC-004)
- [X] T065 [P] [US5] Test `src/course/hooks/useKeyboardShortcuts.suppression.test.jsx` — global layer is suppressed when `<input>`, `<textarea>`, or `contenteditable` is focused; Esc still fires; tested via T005 viewport helper at 375 / 768 / 1024 / 1440 px (validates Contract keyboard-shortcuts.md §Scope rules and SC-004)
- [X] T066 [P] [US5] Test `src/course/hooks/useKeyboardShortcuts.modal.test.jsx` — when any modal is open, global shortcuts are suppressed except `Esc`, which closes the topmost modal and restores focus to the trigger (validates Contract tool-modal-protocol.md)

**Checkpoint**: All five user stories ship.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Constitution-aligned gates that span every story plus docs/refresh.

- [X] T067 [P] Tests `src/course/styles/contrast.test.jsx` — for each of the 4 enumerated accent variants (copper, sage, ink-blue, iron), compute WCAG 2.1 AA contrast for body text, interactive boundary, and focus ring against the editorial-dark background; assert each ≥ 4.5:1 / ≥ 3:1; record per-variant evidence (validates FR-021, FR-025, SC-006)
- [X] T068 [P] Test `src/course/styles/reducedMotion.test.jsx` — under `matchMedia('(prefers-reduced-motion: reduce)')` returning true, no element under `.course-shell` carries a non-zero `transition-duration`; `scroll-behavior` is `auto` (validates FR-023a)
- [X] T069 [P] Test `src/course/CourseShell.rtl.test.jsx` — render shell with `<div dir="rtl">`; sidebar lives on `inline-end` side; module marker uses `border-inline-start` and mirrors; `j` / `k` shortcuts still mean next / prev in reading order (validates FR-028 + Constitution Principle IV) — uses T006 RTL helper
- [X] T070 [P] Vitest config — ensure `vitest.config.js` includes `src/course/**/*.test.{js,jsx}` and uses jsdom environment; add `npm run test:course` shortcut
- [X] T071 [P] Add `npm run perf:lighthouse` to CI (or as a documented release-candidate step in `package.json`) and gate releases on LCP < 2.5s under the mobile preset
- [X] T072 Update `src/course/index.css` or `src/index.css` to import `tokens.css` and `course.module.css` scoped under `.course-shell`; confirm no leakage to legacy views via a Vitest snapshot of a legacy view's computed styles
- [X] T073 [P] Update `specs/001-course-page-redesign/plan.md` to reflect the five clarifications: Constitution Check row IV mentions `mena-note`; Complexity Tracking unchanged; under Phase 0 Research, note that R3 enumerates 4 accents and R6 pins to Lighthouse mobile + gzipped per-chunk
- [X] T074 [P] Update `specs/001-course-page-redesign/research.md` — R3 lists the four accent variants explicitly; R6 re-pins perf gate to Lighthouse mobile preset + gzipped per-chunk; add **R11** documenting `prefers-reduced-motion` strategy
- [X] T075 [P] Update `specs/001-course-page-redesign/data-model.md` — extend the `Lesson.body` `RichContent` union to include `mena-note` block kind (label, body); confirm `TweaksPreferences.accent` enum already lists 4
- [X] T076 [P] Update `specs/001-course-page-redesign/quickstart.md` — §3 cites `mena-note` as the canonical "new typographic callout" example; §6 adds Lighthouse mobile-preset and per-variant contrast evidence to the release gates
- [X] T077 [P] Update `README.md` — add a "Course shell" subsection under "What is in the app" pointing at `/specs/001-course-page-redesign/`; note the four Tweaks accents and the keyboard contract
- [X] T078 Run `quickstart.md` validation end-to-end on a clean checkout: `npm install`, `npm run dev`, open the course page, exercise each acceptance scenario from US1–US5; record evidence in `specs/001-course-page-redesign/release-evidence.md`
- [X] T079 Run `npm run lint`, `npm test`, `npm run build`, `node scripts/check-bundle.mjs`, `npm run perf:lighthouse`; attach output to the release-evidence file
- [X] T080 Trigger `/evolve` per Orchestra V3 doctrine — capture any durable lessons from this feature into `.claude/rules/08-error-prevention.md`

**Final checkpoint**: Constitution-aligned, contract-tested, performance-verified, RTL-mirrored, reduced-motion-honored.

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup. **BLOCKS all user stories.**
- **US1 (Phase 3)**: Depends on Foundational. MVP target.
- **US2 (Phase 4)**: Depends on Foundational. Can run in parallel with US1 if staffed.
- **US3 (Phase 5)**: Depends on Foundational. Can run in parallel with US1/US2 once `ToolModal` (T019) is done.
- **US4 (Phase 6)**: Depends on Foundational. Header/AccountMenu/Palette can land before US3 tool bodies, but `Display & settings` requires `<TweaksPanel>` (T054) which only needs T014 + T019.
- **US5 (Phase 7)**: Depends on US3 (tool open triggers) and US4 (palette + Profile) for the full layer to land; can do a partial layer earlier if needed.
- **Polish (Phase 8)**: Depends on US1–US5 being feature-complete.

### User-story dependencies

- US1 and US2 are mostly independent — they share `<CourseShell>` (T026) and the data flow from `App.jsx` (T027), but the column/sidebar components are decoupled.
- US3 depends only on the shared `ToolModal` (T019); each tool body is independent and parallelizable.
- US4 components are independent of US1–US3 except where the `Header`'s `⌘K` button needs the `CommandPalette` (T055).
- US5 ties everything together — it activates triggers the other stories already wired (e.g., `b` toggles bookmark via the same callback the right rail uses).

### Within each user story

- Tests live alongside implementation. Recommended order per story:
  1. Models / pure libs (Phase 2 already covered most)
  2. Components
  3. Wiring into `<CourseShell>`
  4. Tests (some `[P]` against still-unwritten components are fine — write the spec first)

### Parallel opportunities

- All Setup `[P]` tasks (T002–T006) run in parallel.
- All Foundational `[P]` tasks (T007–T018, T021–T023) run in parallel; T019 / T020 are serial gates inside Phase 2.
- Once Phase 2 ships, US1, US2, US3 tool bodies, and US4 components can be developed in parallel across stories.
- All tests within a story marked `[P]` run in parallel.

---

## Parallel Example: User Story 1

```bash
# Once Phase 2 ships, launch in parallel:
Task: T024 [P] [US1] Implement src/course/shell/ReadingColumn.jsx
Task: T025 [P] [US1] Implement src/course/shell/RightRail.jsx

# Then:
Task: T026 [US1] Implement src/course/CourseShell.jsx v1

# Then:
Task: T027 [US1] Modify src/App.jsx to delegate the learn view

# Tests in parallel after components exist:
Task: T028 [P] [US1] ReadingColumn.test.jsx
Task: T029 [P] [US1] RightRail.test.jsx
Task: T030 [P] [US1] CourseShell.test.jsx
```

## Parallel Example: User Story 3

```bash
# All four tool bodies in parallel once T019 (ToolModal) ships:
Task: T039 [P] [US3] SpacedReviewModal.jsx
Task: T040 [P] [US3] AdversarialReviewModal.jsx
Task: T041 [P] [US3] CapstoneModal.jsx
Task: T042 [P] [US3] KnowledgeMapModal.jsx
```

---

## Implementation Strategy

### MVP first (User Story 1 only)

1. Phase 1 — Setup (T001–T006)
2. Phase 2 — Foundational (T007–T023)
3. Phase 3 — US1 (T024–T030)
4. **STOP and VALIDATE**: Test US1 independently — a learner can read a lesson cleanly with outline tracking and `mena-note` support. Module color verified at 2px marker only.
5. Demo / staging deploy if ready.

### Incremental delivery

1. Setup + Foundational → MVP foundation
2. US1 → first deployable increment (lessons readable)
3. US2 → sidebar cleanup (now four tools surface; tool bodies still stubbed)
4. US3 → tool bodies live
5. US4 → header + account menu + command palette
6. US5 → keyboard layer
7. Polish → contrast / reduced-motion / RTL / docs

### Parallel team strategy (multiple developers)

After Phase 2:
- Developer A: US1 (T024–T030)
- Developer B: US2 (T031–T038)
- Developer C: US3 (T039–T049) — needs T019 from Phase 2 only
- Developer D: US4 (T050–T062)
- Developer E (if available): US5 wait-state plus Polish prep (T067–T071)

---

## Notes

- `[P]` = different files, no dependencies on incomplete tasks
- `[Story]` label maps to spec.md user story for traceability
- The constitution mandates `/evolve` after the feature; T080 enforces this.
- Tests in Phase 2 (T021–T023) are written alongside implementation, not before — this is not strict TDD because the design is locked by `contracts/` and `data-model.md`.
- Avoid: opening more than one Practice tool at a time; using module color as a fill; adding a fifth tool without amending T031–T032 + the spec + the constitution; bypassing `prefers-reduced-motion`.
