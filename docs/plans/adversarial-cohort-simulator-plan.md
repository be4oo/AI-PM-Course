# Adversarial Cohort Simulator — Implementation Plan

## Architecture Decision

Build Spec 01 first and treat it as the foundation moat for Wave 4.

The strongest choice in this repo is to ship the Adversarial Cohort Simulator before the AI Product Strategy Game because it compounds on surfaces that already exist:

- the app already has review, cohort, and capstone flows in [src/App.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/App.jsx), [src/views/CourseViews.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/views/CourseViews.jsx), and [src/data/reviewSystem.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/reviewSystem.js)
- learner state is already persisted locally through the single `ai-pm-progress` snapshot and migration utilities in [src/utils/moduleStorage.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/utils/moduleStorage.js)
- the rubric and capstone model already emphasize review evidence in [docs/templates/assessment-rubric-operations.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/templates/assessment-rubric-operations.md) and [src/data/capstoneDashboard.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/capstoneDashboard.js)
- Spec 17 explicitly depends on review history from Spec 01, so shipping this first unlocks another defensibility layer immediately afterward

This plan therefore favors a review-system extension, not a disconnected mini-product. The initial implementation should stay local-first, deterministic in structure, and compatible with the future persistence model in [docs/architecture/persistence-schema.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/architecture/persistence-schema.md).

## Current State

- `view === "reviews"` and `view === "cohort"` already provide pressure-loop and accountability surfaces, but they are manual evidence capture only
- the app persists one large progress blob containing `reviewChecks`, `reviewEvidence`, `cohortChecks`, `cohortEvidence`, `capstoneChecks`, and `capstoneNotes`, but no structured review-result history
- capstone readiness already models milestone-level evidence, but there is no adversarial scoring or submission history
- the rubric template already defines the six scoring dimensions and required feedback structure, which gives the simulator a strong output contract
- no reviewer persona library, artifact submission schema, review-history data model, or velocity utility exists yet
- the current app is purely client-side; there is no existing OpenAI integration or server boundary in `src/`

## ADRs (Rejected Alternatives)

## ADR-001: Build the AI Product Strategy Game first vs Build the Adversarial Cohort Simulator first
**Context**: Both specs are plausible moats, but only one should lead Wave 4.
**Options Considered**:
- Option A: Ship Spec 16 first because it is highly experiential and marketable
- Option B: Ship Spec 01 first because it compounds on existing review/capstone/rubric infrastructure and unlocks Spec 17
**Decision**: Option B
**Consequences**: Wave 4 starts with the higher-leverage feedback moat and creates historical scoring data that later features can reuse.

## ADR-002: Start with live API-backed reviewing vs Start with a local-first integration seam
**Context**: The spec wants LLM-powered review, but the current app has no established backend or secret-handling layer.
**Options Considered**:
- Option A: Wire direct model calls into the first UI implementation
- Option B: Create a review-engine seam with structured inputs and outputs, then plug in live inference only behind an explicit client-safe adapter decision
**Decision**: Option B
**Consequences**: The first implementation stays testable and schema-driven, while preserving a clean path to a server-backed or desktop-bridge execution model later.

## ADR-003: Store simulator history inside existing free-form evidence fields vs Add a structured review history record
**Context**: The app already stores free-form text evidence for review loops.
**Options Considered**:
- Option A: Append simulator results into `reviewEvidence` text blobs
- Option B: Add a dedicated structured history collection inside the persisted progress snapshot
**Decision**: Option B
**Consequences**: Velocity, persona-specific history, and future export/sync logic remain feasible without brittle parsing.

## ADR-004: Add velocity in the first slice vs Ship review history first and compute velocity second
**Context**: Spec 01 includes velocity, but velocity quality depends on history quality.
**Options Considered**:
- Option A: Deliver review engine and velocity in one giant vertical slice
- Option B: Land the history model and submission flow first, then layer velocity rendering once the record shape is stable
**Decision**: Option B
**Consequences**: Execution risk stays lower, and the storage contract can be validated before charting and threshold logic are added.

## Affected Files

### Must Change

- [src/App.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/App.jsx)
- [src/views/CourseViews.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/views/CourseViews.jsx)
- [src/utils/moduleStorage.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/utils/moduleStorage.js)
- [src/data/lessonEnhancements.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/lessonEnhancements.js)
- [docs/templates/assessment-rubric-operations.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/templates/assessment-rubric-operations.md)

### Likely New Files

- `src/data/reviewerPersonas.js`
- `src/components/ReviewPanel.jsx`
- `src/components/VelocityChart.jsx`
- `src/utils/reviewHistory.js`
- `src/utils/reviewHistory.test.js`
- `src/utils/velocity.js`
- `src/utils/velocity.test.js`
- `docs/templates/review-submission-template.md`

### Adjacent Files To Inspect During Implementation

- [src/data/reviewSystem.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/reviewSystem.js)
- [src/data/capstoneDashboard.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/capstoneDashboard.js)
- [docs/architecture/persistence-schema.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/architecture/persistence-schema.md)
- [docs/specs/17-rubric-iteration-velocity-spec.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/specs/17-rubric-iteration-velocity-spec.md)
- [src/data/curriculum.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/curriculum.js)

## Phase Breakdown

### Phase 1: Define the Review Domain Contract
**Dependencies**: None
**Tasks**:
- [ ] Create `src/data/reviewerPersonas.js` with at least five personas, default weighting metadata, artifact-fit guidance, and prompt anchors derived from the existing rubric contract — Exit: personas are structured, importable, and support a `senior-ai-pm` default plus weighted rubric display
- [ ] Create `src/utils/reviewHistory.js` to define the normalized submission/result shape for local persistence, including submission metadata, score vector, strengths, gaps, required actions, and error result shape — Exit: one canonical review-history schema exists and can serialize/deserialize without UI coupling
- [ ] Update `docs/templates/review-submission-template.md` to mirror the new submission fields and reviewer expectations — Exit: the template is usable as both learner guidance and a fixture for manual QA
- [ ] Update `docs/templates/assessment-rubric-operations.md` with simulator-compatible evidence expectations and explicit machine-readable output fields — Exit: the rubric stays human-readable but becomes precise enough to back structured review results

### Phase 2: Add Local Persistence and Migration Support
**Dependencies**: Phase 1 complete
**Tasks**:
- [ ] Extend `src/App.jsx` state to include dedicated simulator submission history, selected persona, and optional active review draft state — Exit: simulator data is first-class state rather than being packed into free-form evidence strings
- [ ] Update the load/save paths in `src/App.jsx` so simulator state is persisted inside the existing `ai-pm-progress` snapshot without breaking old snapshots — Exit: fresh sessions and migrated sessions both hydrate safely
- [ ] Update `src/utils/moduleStorage.js` migration helpers to preserve backwards compatibility for newly added history records and any key normalization needed for lesson-linked submissions — Exit: legacy snapshots still load and any new keyed records remain stable under module slug normalization
- [ ] Add `src/utils/reviewHistory.test.js` and extend existing storage tests where needed — Exit: malformed, missing, and legacy payload cases are covered

### Phase 3: Ship the Review Submission Surface
**Dependencies**: Phase 2 complete
**Tasks**:
- [ ] Create `src/components/ReviewPanel.jsx` with paste/URL tabs, persona selection, submission validation, structured error handling, and rubric-weight preview — Exit: learners can open one panel and prepare a valid submission from any lesson or the capstone surface
- [ ] Wire the review panel into [src/App.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/App.jsx) so it is reachable from lesson context and capstone context without fragmenting navigation — Exit: at least one lesson-level entry point and one capstone-level entry point open the same panel
- [ ] Update [src/views/CourseViews.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/views/CourseViews.jsx) to surface simulator status, recent submissions, and review-ready affordances alongside the current review/cohort flows — Exit: the simulator feels like an upgrade to the existing review loop, not a separate app
- [ ] Add input guardrails for empty content, oversize artifacts, invalid URLs, and parse failures — Exit: all specified structured error states render without crashing and do not produce fake scores

### Phase 4: Integrate the Review Engine
**Dependencies**: Phase 3 complete
**Tasks**:
- [ ] Implement a review-engine adapter boundary in `src/App.jsx` or a new helper module that accepts normalized submission input and returns a normalized result object — Exit: the UI depends only on the adapter contract, not on a specific model API
- [ ] Provide an initial execution mode that supports deterministic local development and future live-model integration, with clear handling for pending, success, and structured failure states — Exit: developers can validate the end-to-end flow without requiring hidden infrastructure
- [ ] Persist every completed or failed review attempt to the structured history store with timestamps, lesson or capstone context, selected persona, and score vector when present — Exit: each submission creates an inspectable history entry suitable for later analytics
- [ ] Add lightweight QA fixtures or tests for result parsing and adapter fallbacks — Exit: contract regressions are caught before UI changes ship

### Phase 5: Add Velocity and Longitudinal Feedback
**Dependencies**: Phase 4 complete
**Tasks**:
- [ ] Create `src/utils/velocity.js` to compute rolling per-dimension trends, stuck-dimension detection, and calibration fallbacks from review history — Exit: the function returns deterministic chart-ready data and handles insufficient-history cases explicitly
- [ ] Add `src/utils/velocity.test.js` covering fewer-than-two, fewer-than-three, improving, flat, and regressing histories — Exit: velocity behavior is stable enough to support the future Spec 17 rollout
- [ ] Create `src/components/VelocityChart.jsx` and render it from the lesson/capstone review surfaces where submission history exists — Exit: learners can see rolling score trends and low-performing dimensions without leaving the simulator context
- [ ] Update copy and labels to make it clear that velocity is derived from repeated rubric-bound submissions rather than a one-off grade — Exit: the UI teaches the feedback loop as part of the moat

### Phase 6: Capstone and Lesson Integration
**Dependencies**: Phases 3-5 complete
**Tasks**:
- [ ] Update [src/data/lessonEnhancements.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/lessonEnhancements.js) with reviewer hints, recommended personas, or artifact prompts for lessons that most benefit from adversarial review — Exit: at least the capstone-adjacent and evaluation-heavy lessons recommend a reviewer mode intentionally
- [ ] Update [src/data/capstoneDashboard.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/capstoneDashboard.js) and relevant capstone copy so review history becomes visible as part of readiness rather than separate side activity — Exit: capstone readiness can reference simulator evidence without introducing a separate scoring silo
- [ ] Ensure simulator results can be linked back to lesson keys and capstone milestones in a way that matches the future Supabase-ready review model — Exit: the local schema maps cleanly onto the documented future `reviews` domain

### Phase 7: Verification and Wave Sequencing Closeout
**Dependencies**: Phases 1-6 complete
**Tasks**:
- [ ] Run local build/test verification for new utilities and the React app — Exit: the app builds cleanly and utility tests pass
- [ ] Validate that old progress snapshots still load, new simulator history survives reload, and all error states render safely — Exit: there is no regression in existing learner progress persistence
- [ ] Confirm that Spec 17 can now plan against the landed history model without schema redesign — Exit: the simulator history shape is sufficient to support Dimension G and trend computation
- [ ] Capture a short follow-on note for Spec 16 positioning — Exit: the strategy game is now framed as the second moat built on top of a proven feedback and assessment engine rather than as the lead Wave 4 investment

## Ordered Sequence

1. Define the persona, rubric, and history contracts.
2. Add storage and migration support before any UI depends on the new data.
3. Ship the submission surface and wire it into existing review/capstone flows.
4. Plug in the review engine behind a stable adapter contract.
5. Add velocity only after structured history exists.
6. Tighten lesson and capstone integration.
7. Use the resulting history model to plan Spec 17, then return to Spec 16 as the next major moat.

## Breaking Changes and Migrations

- The persisted `ai-pm-progress` snapshot will gain new fields for simulator history and review draft state
- Old snapshots must remain readable without requiring manual reset
- No route migration is required, but navigation state in `src/App.jsx` may gain one or more new review-related views or modal states
- If live model inference is later added, secret handling must not be embedded directly into the current client-only surface

## Validation Points

- Personas: at least five reviewer personas exist with distinct weighting metadata and a default fallback
- Submission UX: learners can submit pasted markdown and URL-based artifacts with structured validation failures
- History: every review attempt produces a stable, reload-safe history entry
- Velocity: fewer-than-two and fewer-than-three submission histories show calibration messaging rather than misleading scores
- Integration: lesson-level and capstone-level entry points both land on the same simulator surface
- Compatibility: legacy progress payloads still hydrate without loss of existing review/cohort/capstone data

## Risks and Unknowns

- The current app has no established backend or model secret boundary, so live inference must be introduced carefully and may require a separate architectural decision
- URL fetching for learner artifacts could expand scope quickly if it attempts to robustly ingest arbitrary GitHub or remote content on day one
- Overloading `src/App.jsx` further could increase complexity; implementation should opportunistically extract simulator helpers or view-level components rather than adding more monolithic branching
- Velocity can create false precision if the rubric output contract is inconsistent across personas; persona weighting should change emphasis, not the core score format
- If the first slice tries to fully solve prompt ops, persistence sync, and charting simultaneously, delivery risk will spike

## Non-Functional Considerations

- Performance: keep review result objects compact and lazy-render history lists so the main app state does not become sluggish
- Privacy: keep the first implementation local-first and avoid storing raw artifact text longer than necessary if summaries or hashes can serve history views
- Maintainability: isolate review history and velocity logic into utilities instead of burying derived calculations inside `src/App.jsx`
- Accessibility: the review panel, persona selector, and velocity chart must remain keyboard-usable and readable without color dependence

## Ready Slice Recommendation

Start Wave 4 with a narrow but complete vertical slice of Spec 01:

1. Persona data contract
2. Structured local review-history model
3. Review submission panel in lesson and capstone contexts
4. Adapter-backed result rendering with safe fallback mode

Then add velocity as the second slice of Spec 01, and only after that move to Spec 16.

That sequencing gives the repo a durable moat chain:

- Spec 01: feedback engine and evidence history
- Spec 17: measurable iteration velocity on top of that history
- Spec 16: strategy simulation layered onto a product that already knows how to score and coach learners over time
