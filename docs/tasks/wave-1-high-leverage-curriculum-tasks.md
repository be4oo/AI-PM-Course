# Wave 1 High-Leverage Curriculum Enhancements — Task Board

## Summary
Total Phases: 6 | Total Tasks: 18 | Parallel Tasks: 10 | Est. Complexity: Medium

---

## Phase 1: Module 8.5 Storage-Key Safety — ⛔ Prerequisite for the rest of the wave

- [x] [frontend] [S] TASK-001: Create the shared storage-key contract in `src/utils/moduleStorage.js`
      Agent: frontend
      Priority: P0
      Deps: None
      Exit: `moduleStorageSlug()` and key-builder helpers exist, return `8-5` for Module `8.5`, preserve other module IDs unchanged, and expose one import path for persisted-key construction

- [x] [frontend] [S] TASK-002: Refactor persisted-state key usage in `src/App.jsx` to use the storage helpers
      Agent: frontend
      Priority: P0
      Deps: TASK-001
      Exit: Bookmark, lesson-progress, review, and cohort key construction no longer directly interpolates raw `module.id` values for persisted state

- [x] [frontend] [S] TASK-003: Add one-time legacy key migration for `ai-pm-progress` in `src/App.jsx`
      Agent: frontend
      Priority: P0
      Deps: TASK-002
      Exit: Existing `8.5-*` keys are migrated to `8-5-*` idempotently on load, old keys are removed only after a successful transform, and failure leaves original payload intact

- [x] [frontend] [S] TASK-004: Add storage-slug regression coverage in `src/utils/moduleStorage.test.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-003
      Exit: Tests fail if any storage slug contains a dot, if Module `8.5` is not normalized, or if migration changes values during rename

---

## Phase 2: Freshness Metadata Foundation

- [x] [frontend] [P] TASK-005: Audit and normalize lesson freshness metadata in `src/data/curriculum.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-004
      Exit: Every lesson has a consistent freshness input shape, missing values are intentionally marked, and malformed legacy formats are either normalized or explicitly surfaced for invalid-date handling

- [x] [frontend] [P] TASK-006: Implement freshness computation utilities in `src/utils/freshness.js` with coverage in `src/utils/freshness.test.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-004
      Exit: Utility logic deterministically returns `fresh`, `aging`, `stale`, `unverified`, or `invalid date` from `lastVerified` and optional `freshnessWindow`, with tests covering all branches

- [x] [frontend] [P] TASK-007: Seed the changelog source in `src/data/changelog.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-004
      Exit: Changelog data exists with a stable schema for date, module, lesson, change type, reason, and linkable context, including initial Wave 1 seed entries

Wave note: Tasks `005`–`007` are Wave A of max-3 parallel work.

---

## Phase 3: Freshness UI and Weekly Automation

- [x] [frontend] [P] TASK-008: Build `src/components/FreshnessBadge.jsx` and render it from the lesson surfaces in `src/App.jsx` and/or `src/views/CourseViews.jsx`
      Agent: frontend
      Priority: P0
      Deps: TASK-005, TASK-006
      Exit: Every lesson displays a text-backed freshness badge, lessons without verification show `unverified`, and malformed dates show `invalid date` with non-blocking warning behavior

- [x] [frontend] [P] TASK-009: Build `src/components/ChangelogView.jsx` and wire the changelog route/view in `src/App.jsx`
      Agent: frontend
      Priority: P0
      Deps: TASK-007
      Exit: A changelog view renders entries sorted descending, reads from `src/data/changelog.js`, and falls back gracefully when the source is unavailable or empty

- [x] [infra] [P] TASK-010: Extend the freshness automation in `scripts/check-freshness.mjs`, `scripts/freshness-sweep.js`, `scripts/generate-rss.js`, and `.github/workflows/freshness-check.yml`
      Agent: infra
      Priority: P1
      Deps: TASK-005, TASK-006, TASK-007
      Exit: Weekly automation can audit lesson freshness, write `docs/freshness-report.md`, fail non-zero on parsing/report errors, and preserve the previous RSS/feed output on generation failure

Wave note: Tasks `008`–`010` are Wave B of max-3 parallel work.

---

## Phase 4: Spec 15 — Micro-Teams 2026 Integration Into Module 12

- [x] [any] [P] TASK-011: Add the curated reading in `docs/reading/micro-teams-2026.md`
      Agent: any
      Priority: P0
      Deps: TASK-010
      Exit: The Micro-Teams research document is available in-repo with preserved citations, an explicit `lastVerified` field, and framing that notes freshness/research limitations

- [x] [frontend] [P] TASK-012: Wire the reading into Module 12 lesson content in `src/data/curriculum.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-011
      Exit: Module `12.2`, `12.6`, and/or `12.7` exposes the reading from lesson content without changing existing lesson IDs, and missing-reading behavior degrades gracefully

- [x] [frontend] [P] TASK-013: Add the graded analysis exercise and executive-track enhancement in `src/data/lessonEnhancements.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-011
      Exit: The lesson enhancement layer includes a pattern-fit exercise that evaluates org fit, DORA-baseline readiness, risk awareness, and 90-day feasibility

Wave note: Tasks `011`–`013` are Wave C of max-3 parallel work.

- [x] [any] [S] TASK-014: Add the optional pilot-plan template in `docs/templates/90-day-micro-team-pilot.md` and wire its artifact path
      Agent: any
      Priority: P1
      Deps: TASK-012, TASK-013
      Exit: Executive-track learners can access a 90-day pilot template that explicitly includes DORA baseline, kill criteria, and pilot operating checkpoints

---

## Phase 5: Spec 11 — AGENTS.md Anthology and Lesson Wiring

- [x] [any] [P] TASK-015: Create the annotated anthology examples in `docs/examples/agents-md/startup.md`, `yc-scale.md`, and `enterprise.md`
      Agent: any
      Priority: P1
      Deps: TASK-010
      Exit: Three anonymized AGENTS.md examples exist, each section includes annotations describing the defended failure mode, and incomplete examples are identifiable by convention

- [x] [any] [P] TASK-016: Add the anthology index in `docs/examples/agents-md/README.md`
      Agent: any
      Priority: P1
      Deps: TASK-015
      Exit: The README provides a comparison entry point covering risk posture, autonomy, kill-switch strategy, and merge-cap differences across the three examples

- [x] [frontend] [P] TASK-017: Wire the anthology and pattern-spot exercise into Module 7 via `src/data/curriculum.js` and `src/data/lessonEnhancements.js`
      Agent: frontend
      Priority: P1
      Deps: TASK-015
      Exit: Lesson `7.2` references the anthology, surfaces the weak-AGENTS gap-spotting exercise, provides self-check/hint support, and degrades gracefully if an anthology artifact is missing

Wave note: Tasks `015`–`017` are Wave D of max-3 parallel work.

---

## Phase 6: Integration Verification and Release Readiness

- [ ] [any] [P] TASK-018: Run Wave 1 verification across runtime, content, and automation surfaces
      Agent: any
      Priority: P0
      Deps: TASK-008, TASK-009, TASK-010, TASK-014, TASK-016, TASK-017
      Exit: Local tests covering storage and freshness utilities pass, manual checks confirm Module 7, Module 8.5, Module 12, and changelog flows render correctly, and freshness automation produces a valid report path

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: Starts immediately and blocks the rest of the wave because it changes persisted-state behavior
- **Phase 2**: Starts after Phase 1 completes and establishes the metadata/data contracts for freshness and changelog work
- **Phase 3**: Starts after Phase 2 outputs exist; UI and automation can proceed in parallel
- **Phase 4**: Starts after freshness automation is established so the new reading follows the same verification conventions
- **Phase 5**: Starts after freshness automation is established so the anthology can adopt the same documentation conventions
- **Phase 6**: Final verification after all user-facing and automation surfaces are complete

### Critical Path

1. `TASK-001` → `TASK-002` → `TASK-003` → `TASK-004`
2. `TASK-005` + `TASK-006` + `TASK-007`
3. `TASK-008` + `TASK-009` + `TASK-010`
4. `TASK-011` → `TASK-012`/`TASK-013` → `TASK-014`
5. `TASK-015` → `TASK-016`/`TASK-017`
6. `TASK-018`

### Acceptance Coverage Map

- Spec 05 US-001 to US-003: `TASK-001` to `TASK-004`
- Spec 20 US-001 and US-005: `TASK-005`, `TASK-006`, `TASK-008`, `TASK-010`
- Spec 20 US-002: `TASK-007`, `TASK-009`
- Spec 20 US-003 and US-004: `TASK-010`
- Spec 15 US-001: `TASK-011`, `TASK-012`
- Spec 15 US-002: `TASK-013`
- Spec 15 US-003: `TASK-014`
- Spec 11 US-001: `TASK-015`
- Spec 11 US-002 and US-003: `TASK-016`, `TASK-017`

---

```markdown
📋 PM BREAKDOWN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project:           Wave 1 High-Leverage Curriculum Enhancements
Total Phases:      6
Total Tasks:       18
Parallel Tasks:    10 (4 waves of max 3)
Sequential Tasks:  8
Tasks Location:    docs/tasks/wave-1-high-leverage-curriculum-tasks.md
Status:            ✅ Ready for the AI Development Factory queue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
