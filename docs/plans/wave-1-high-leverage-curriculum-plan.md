# Wave 1 High-Leverage Curriculum Enhancements — Implementation Plan

## Architecture Decision

Ship Wave 1 as four sequenced specs across three boundaries:

1. `src/App.jsx` and small utilities for state/runtime fixes
2. `src/data/*`, `docs/*`, and lesson enhancement files for curriculum/content wiring
3. `scripts/*` and `.github/workflows/*` for freshness automation

The wave should be executed in this order:

- Spec 05 first because it removes future storage-key fragmentation and is isolated
- Spec 20 second because it creates the freshness primitives and automation that Specs 15 and 11 can reuse
- Spec 15 third because it is a narrow content integration into already-existing Module 12 lesson surfaces
- Spec 11 fourth because it is content-heavy and benefits from the freshness/changelog conventions introduced in Spec 20

## Current State

- `src/App.jsx` still constructs bookmark and review keys directly from `module.id` and `lesson.id`
- `src/data/curriculum.js` already contains Module `8.5`, Module 7 AGENTS.md content, and Module 12 org-design lessons
- `src/data/lessonEnhancements.js` already has Module `12.2`, `12.6`, and `12.7` enhancement surfaces that can absorb Micro-Teams references
- `scripts/check-freshness.mjs` and `.github/workflows/freshness-check.yml` already enforce freshness for `src/data/liveBaseline.js`
- There is no per-lesson freshness utility, no changelog data file, no `docs/reading/` corpus, and no `docs/examples/agents-md/` anthology yet

## ADRs (Rejected Alternatives)

## ADR-001: Four Separate Plans vs One Wave Plan
**Context**: The requested work is already prioritized as one weekly wave and shares dependencies.
**Options Considered**:
- Option A: Generate four independent plans and leave sequencing implicit
- Option B: Generate one wave-level plan with spec-level phases and dependencies
**Decision**: Option B
**Consequences**: Execution order is explicit, shared touchpoints are visible, and `/tasks` can decompose from one source of truth.

## ADR-002: Build New Freshness Infrastructure From Scratch vs Extend Existing Baseline Freshness Checks
**Context**: The repo already has a freshness script and GitHub workflow for baseline audit staleness.
**Options Considered**:
- Option A: Replace the current baseline freshness check with a new system
- Option B: Extend the existing script/workflow surface and layer lesson freshness on top
**Decision**: Option B
**Consequences**: Lower risk, lower effort, and stronger continuity with the current CI model.

## ADR-003: Wire Content Directly Into Lessons vs Use Supporting Docs Plus Lesson References
**Context**: Specs 15 and 11 introduce research/examples that should remain maintainable outside giant lesson strings.
**Options Considered**:
- Option A: Inline all anthology and Micro-Teams content inside `src/data/curriculum.js`
- Option B: Store supporting artifacts in `docs/` and reference them from curriculum/enhancement data
**Decision**: Option B
**Consequences**: Better maintainability, simpler freshness tracking, and less churn in the main curriculum dataset.

## Affected Files

### Must Change in Wave 1

- `src/App.jsx`
- `src/data/curriculum.js`
- `src/data/lessonEnhancements.js`
- `scripts/check-freshness.mjs`
- `.github/workflows/freshness-check.yml`

### Likely New Files

- `src/utils/moduleStorage.js`
- `src/utils/moduleStorage.test.js`
- `src/utils/freshness.js`
- `src/utils/freshness.test.js`
- `src/data/changelog.js`
- `src/components/FreshnessBadge.jsx`
- `src/components/ChangelogView.jsx`
- `docs/reading/micro-teams-2026.md`
- `docs/templates/90-day-micro-team-pilot.md`
- `docs/examples/agents-md/startup.md`
- `docs/examples/agents-md/yc-scale.md`
- `docs/examples/agents-md/enterprise.md`
- `docs/examples/agents-md/README.md`
- `docs/freshness-report.md`
- `scripts/freshness-sweep.js`
- `scripts/generate-rss.js`

### Adjacent Files to Inspect During Implementation

- `src/views/CourseViews.jsx`
- `src/data/lessonMetadata.js`
- `src/data/liveBaseline.js`
- `package.json`

## Phase Breakdown

### Phase 1: Spec 05 — Module 8.5 Storage-Key Normalization
**Dependencies**: None
**Tasks**:
- [ ] Add `src/utils/moduleStorage.js` with `moduleStorageSlug(mod)` and any shared key builders — Exit: all bookmark/review key creation can be expressed through one importable helper
- [ ] Refactor `src/App.jsx` to use storage helpers for lesson keys, bookmarks, review keys, and cohort keys — Exit: no remaining direct `${mod.id}-...` or equivalent construction for persisted state
- [ ] Add one-time migration logic for legacy `8.5-*` persisted keys in the `ai-pm-progress` payload — Exit: old stored keys migrate to `8-5-*` idempotently without losing values
- [ ] Add regression tests in `src/utils/moduleStorage.test.js` — Exit: tests cover slug normalization, dot rejection, and migration safety

### Phase 2: Spec 20 — Freshness Foundation and Changelog
**Dependencies**: Phase 1 complete
**Tasks**:
- [ ] Audit `src/data/curriculum.js` for `lastVerified` coverage and normalize the chosen date format before adding freshness math — Exit: every lesson has parseable freshness metadata or an intentional `unverified` path
- [ ] Add `src/utils/freshness.js` plus `src/utils/freshness.test.js` to centralize badge state, date parsing, and threshold logic — Exit: freshness status is deterministic for valid, missing, and malformed dates
- [ ] Add `src/components/FreshnessBadge.jsx` and render it from existing lesson surfaces in `src/App.jsx` or `src/views/CourseViews.jsx` — Exit: every lesson view exposes textual freshness state, not color only
- [ ] Add `src/data/changelog.js` and `src/components/ChangelogView.jsx`, then extend the current `view` routing/nav in `src/App.jsx` — Exit: a changelog screen renders descending entries with graceful fallback
- [ ] Extend `scripts/check-freshness.mjs` or split responsibilities with `scripts/freshness-sweep.js` and `scripts/generate-rss.js` — Exit: CI can validate freshness metadata and a weekly job can generate a markdown report without deleting the previous RSS/feed state on failure
- [ ] Update `.github/workflows/freshness-check.yml` to run the lesson freshness sweep on a weekly cadence — Exit: scheduled automation exercises the new report path and fails loudly on parse errors

### Phase 3: Spec 15 — Micro-Teams 2026 Integration Into Module 12
**Dependencies**: Phase 2 complete
**Tasks**:
- [ ] Copy and normalize the research asset into `docs/reading/micro-teams-2026.md` with explicit verification metadata/header — Exit: the reading exists in-repo with preserved citations and freshness fields
- [ ] Extend `src/data/curriculum.js` for Module `12.2`, `12.6`, and/or `12.7` so the reading and exercise references appear in the right lessons without changing lesson IDs — Exit: learners can discover the reading from Module 12
- [ ] Extend `src/data/lessonEnhancements.js` with the graded analysis prompt and executive-track framing — Exit: one exercise clearly scores pattern fit, DORA baseline readiness, and 90-day feasibility
- [ ] Add `docs/templates/90-day-micro-team-pilot.md` and wire it into the capstone/executive track surface — Exit: the optional pilot-plan deliverable is visible and usable

### Phase 4: Spec 11 — AGENTS.md Anthology and Annotated Examples
**Dependencies**: Phase 2 complete
**Tasks**:
- [ ] Create `docs/examples/agents-md/startup.md`, `yc-scale.md`, and `enterprise.md` with a shared annotation convention — Exit: all three examples are complete, anonymized, and each section explains the defended failure mode
- [ ] Add `docs/examples/agents-md/README.md` as the anthology index and comparison entry point — Exit: one index summarizes posture differences and points to each example
- [ ] Extend `src/data/curriculum.js` around lesson `7.2` to reference the anthology and pattern-spot exercise — Exit: Module 7 exposes the examples and comparison framing
- [ ] Extend `src/data/lessonEnhancements.js` with the weak-AGENTS gap-spotting exercise and hint/reference-answer support — Exit: the lesson has a concrete apply path, not just links

### Phase 5: Integration and Readiness Check
**Dependencies**: Phases 1-4 complete
**Tasks**:
- [ ] Run targeted tests for new utility coverage and any existing app test suite — Exit: new helpers and content wiring pass local verification
- [ ] Manually exercise the app paths for Module 7, Module 8.5, Module 12, and the changelog view — Exit: no broken navigation, missing lesson content, or stale placeholder crashes
- [ ] Add initial changelog entries covering Wave 1 launches — Exit: changelog demonstrates the feature, not an empty screen

## Ordered Sequence

1. Ship Spec 05 as a standalone patch and verify persisted-state safety.
2. Build the freshness primitives from Spec 20, reusing the current baseline freshness pipeline.
3. Integrate Micro-Teams content into Module 12 using the new freshness conventions.
4. Create the AGENTS anthology and wire it into Module 7 with the same documentation pattern.
5. Close the loop with changelog seed data, weekly automation, and manual UI verification.

## Breaking Changes & Migrations

- Bookmark/review persistence for Module 8.5 changes from `8.5-*` to `8-5-*`
- Existing local progress data needs one idempotent migration inside the stored `ai-pm-progress` payload
- Freshness metadata may require a one-time normalization pass if current `lastVerified` formats are mixed

## Validation Points

- Spec 05: confirm a saved Module 8.5 bookmark created before the patch still appears after reload
- Spec 20: confirm lessons render one of `fresh`, `stale`, `unverified`, or `invalid date` deterministically
- Spec 20: confirm the changelog route/view renders with both populated data and missing-data fallback
- Spec 15: confirm Module 12 exposes both the reading link and the graded/org-design exercise
- Spec 11: confirm all three anthology examples render and the lesson degrades gracefully if one artifact is absent
- Automation: confirm the scheduled freshness job fails on malformed metadata and writes a report on success

## Risks and Unknowns

- `lastVerified` currently appears to use quarter-style strings in some lessons; freshness math needs one canonical parse strategy before implementation
- The spec names `docs/ci/freshness-check.yml`, but the repo already uses `.github/workflows/freshness-check.yml`; keep the GitHub Actions location unless there is a product reason to mirror docs
- The original Micro-Teams source document path is not yet confirmed inside the repo tree; implementation should locate and preserve the exact source before copying
- The changelog UI may need small updates in `src/views/CourseViews.jsx` if the existing view pattern is more centralized than `App.jsx` alone suggests

## Non-Functional Considerations

- Performance: freshness computation should stay utility-based and O(1) per lesson render; migration should stay O(n) over persisted keys
- Security: no new secret handling is required; file-driven docs and RSS generation should remain static/offline safe
- Accessibility: freshness badges and changelog indicators must use text labels, not color alone
- Maintainability: supporting research/examples should live in `docs/` with curriculum files linking to them rather than embedding large payloads inline

## Ready Slice Recommendation

If execution starts this week, the safest slice is:

1. Spec 05
2. Spec 20 core only: freshness utility, badge, metadata audit, changelog route/data
3. Spec 15
4. Spec 20 automation tail: weekly sweep + RSS
5. Spec 11

This keeps the first three deliverables aligned with your P0 list while delaying the most content-heavy P1 artifact until the runtime and freshness foundation are stable.
