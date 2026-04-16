# Wave 2 Operating Rigor and Failure Pattern Recognition — Implementation Plan

## Architecture Decision

Ship Wave 2 as one coordinated curriculum-and-enforcement wave across four specs:

1. Spec 06 — Kill Criteria & Product Sunset Lesson
2. Spec 09 — Eval Debt & Maintenance Lesson
3. Spec 12 — AI Product Failure Anthology
4. Spec 13 — Weekly Artifact CI Enforcement

This wave should be executed in that order:

- Spec 06 first because it adds a missing operating discipline at the front of the course and creates a new capstone artifact that later rubric/CI work can reference
- Spec 09 second because it extends existing Module 6 evaluation content and naturally strengthens the same capstone evidence model
- Spec 12 third because it adds a new structured case-study data surface plus one new lesson in Module 9, benefiting from the freshness/changelog conventions already introduced in Wave 1
- Spec 13 last because it formalizes artifact enforcement after the artifact set and rubric expectations have been expanded by Specs 06 and 09

## Current State

- Wave 1 already introduced lesson freshness utilities, changelog plumbing, `docs/reading/` support, and additional curriculum wiring in [src/App.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/App.jsx), [src/data/curriculum.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/curriculum.js), and [src/data/lessonEnhancements.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/lessonEnhancements.js)
- Module 1 contains ROI and AI PRD framing but still lacks explicit kill-criteria instruction
- Module 6 covers eval creation and golden datasets but not long-term eval maintenance
- Module 9 includes go/no-go and responsible AI lessons but no structured failure anthology
- Capstone readiness exists in [src/data/capstoneDashboard.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/capstoneDashboard.js), but it does not yet require kill criteria or post-launch eval-maintenance artifacts
- Rubric operations exist in [docs/templates/assessment-rubric-operations.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/templates/assessment-rubric-operations.md), but they do not yet encode kill-criteria evidence or eval-maintenance evidence
- No `docs/ci/` workflow pack exists yet for reusable weekly artifact enforcement

## ADRs (Rejected Alternatives)

## ADR-001: Theme Wave 2 Around New Surface Area vs Reinforce Existing System Boundaries
**Context**: Many remaining specs are attractive, but not all compound on Wave 1.
**Options Considered**:
- Option A: Pick unrelated high-interest features such as analytics, user research, or strategy game content
- Option B: Pick specs that deepen the course’s operating discipline, capstone evidence model, and CI/accountability loop
**Decision**: Option B
**Consequences**: Wave 2 compounds on the same curriculum, template, and workflow surfaces already touched, which lowers integration risk and improves leverage.

## ADR-002: Build Weekly Artifact CI Before Artifact Expectations Are Expanded vs After
**Context**: CI enforcement is useful only if the rubric and capstone artifacts are already correct.
**Options Considered**:
- Option A: Implement Spec 13 first to get enforcement live quickly
- Option B: Expand the artifact model first via Specs 06 and 09, then encode it into CI
**Decision**: Option B
**Consequences**: The verifier can reflect the final desired artifact set instead of needing a follow-up rewrite one wave later.

## ADR-003: Represent Failure Anthology Inline in `curriculum.js` vs Structured Data
**Context**: Spec 12 introduces at least six public failure cases with metadata and framework mappings.
**Options Considered**:
- Option A: Inline all cases in one large Module 9 lesson string
- Option B: Create a structured data file and keep the lesson as the entry point
**Decision**: Option B
**Consequences**: Cases become freshness-trackable, reusable, and easier to gate or expand without turning Module 9 into an oversized text blob.

## Affected Files

### Must Change in Wave 2

- [src/data/curriculum.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/curriculum.js)
- [src/data/lessonEnhancements.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/lessonEnhancements.js)
- [src/data/capstoneDashboard.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/capstoneDashboard.js)
- [docs/templates/assessment-rubric-operations.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/templates/assessment-rubric-operations.md)

### Likely New Files

- `docs/templates/kill-criteria-register.md`
- `docs/templates/eval-debt-audit.md`
- `docs/templates/failure-debrief-template.md`
- `src/data/failureCases.js`
- `src/components/FailureCaseView.jsx`
- `docs/ci/weekly-artifact-check.yml`
- `docs/ci/verify-artifacts.js`
- `docs/ci/artifact-manifest.example.json`
- `docs/templates/weekly-artifact-setup-guide.md`

### Adjacent Files to Inspect During Implementation

- [src/App.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/App.jsx)
- [src/views/CourseViews.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/views/CourseViews.jsx)
- [src/data/changelog.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/changelog.js)
- [docs/templates/go-no-go-evidence.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/templates/go-no-go-evidence.md)
- [docs/templates/ai-risk-register.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/templates/ai-risk-register.md)

## Phase Breakdown

### Phase 1: Spec 06 — Kill Criteria and Sunset Discipline
**Dependencies**: None
**Tasks**:
- [ ] Add one new Module 1 lesson in `src/data/curriculum.js` near the ROI/business-case lessons so kill criteria are taught as the inverse of launch optimism — Exit: Module 1 includes a lesson that defines concrete kill dimensions, thresholds, and at least two case references
- [ ] Add the supporting executive/deep-mode framing in `src/data/lessonEnhancements.js` — Exit: the lesson includes leadership framing around pre-committed sunset discipline and capstone use
- [ ] Create `docs/templates/kill-criteria-register.md` — Exit: the template includes criterion, threshold, measurement, owner, review cadence, and sunset plan
- [ ] Update `docs/templates/assessment-rubric-operations.md` and `src/data/capstoneDashboard.js` to require kill-criteria evidence in operational readiness — Exit: the rubric and capstone milestone language both recognize kill criteria as a required evidence lane

### Phase 2: Spec 09 — Eval Debt and Maintenance
**Dependencies**: Phase 1 complete
**Tasks**:
- [ ] Add one new Module 6 lesson in `src/data/curriculum.js` focused on drift, dataset rot, judge flakiness, and coverage gaps without duplicating existing eval-creation lessons — Exit: Module 6 contains a clearly differentiated eval-maintenance lesson with realistic variance/drift framing
- [ ] Extend `src/data/lessonEnhancements.js` with a tooling lab for variance measurement and audit cadence — Exit: the lesson includes concrete exercises for judge variance and simulated drift review
- [ ] Create `docs/templates/eval-debt-audit.md` — Exit: the template supports a quarterly audit and a 2-week post-launch audit artifact
- [ ] Update `docs/templates/assessment-rubric-operations.md` and `src/data/capstoneDashboard.js` to add eval-maintenance evidence to the capstone — Exit: capstone readiness and rubric evidence explicitly mention post-launch eval audit

### Phase 3: Spec 12 — AI Product Failure Anthology
**Dependencies**: Phase 2 complete
**Tasks**:
- [ ] Create `src/data/failureCases.js` with at least six public cases, source URLs, `lastVerified`, framework mappings, and debrief prompts — Exit: failure data is structured, freshness-trackable, and complete enough to gate incomplete cases
- [ ] Add a new Module 9 lesson in `src/data/curriculum.js` that references the structured case data and debrief workflow — Exit: Module 9 exposes the anthology as a first-class lesson rather than incidental prose
- [ ] Create `src/components/FailureCaseView.jsx` if the existing lesson rendering is not enough for structured cases — Exit: cases can be rendered in a consistent, scannable format without inflating one lesson string
- [ ] Create `docs/templates/failure-debrief-template.md` and link it from the lesson Apply flow — Exit: learners have a reusable debrief artifact path and counterfactual-design exercise
- [ ] Seed changelog/freshness tracking for the anthology through `src/data/changelog.js` and case-level `lastVerified` — Exit: anthology content is compatible with the Wave 1 freshness discipline

### Phase 4: Spec 13 — Weekly Artifact CI Enforcement
**Dependencies**: Phases 1 and 2 complete; Phase 3 recommended complete
**Tasks**:
- [ ] Create `docs/ci/weekly-artifact-check.yml` — Exit: a reusable GitHub Actions workflow exists, runs on `push` and `pull_request`, and fails with a clear setup message if the manifest is missing
- [ ] Create `docs/ci/verify-artifacts.js` plus `docs/ci/artifact-manifest.example.json` — Exit: the verifier checks the weekly artifact set, supports advisory and strict mode, and prints per-artifact diagnostics
- [ ] Create `docs/templates/weekly-artifact-setup-guide.md` — Exit: learners have one-page setup instructions and can switch from advisory to strict mode without hidden steps
- [ ] Add course references to the CI pack inside `src/data/curriculum.js` or `src/data/lessonEnhancements.js` wherever the capstone weekly artifact system is already taught — Exit: the app surfaces setup guidance from the relevant lesson/capstone path

### Phase 5: Integration and Readiness Check
**Dependencies**: Phases 1-4 complete
**Tasks**:
- [ ] Validate lesson sequencing in Modules 1, 6, and 9 to ensure the new lessons reinforce, rather than duplicate, adjacent material — Exit: the curriculum reads coherently through the new additions
- [ ] Validate template/rubric/capstone alignment across the new artifact expectations — Exit: kill criteria, eval-debt audit, failure debrief, and weekly artifact CI all point at consistent evidence models
- [ ] Run local verification for any new scripts/components and sanity-check the CI verifier on a sample manifest — Exit: the new scripts run locally and the app still builds cleanly
- [ ] Add Wave 2 seed entries to `src/data/changelog.js` and, if appropriate, `public/changelog.json` — Exit: the changelog reflects the new operating-rigor wave

## Ordered Sequence

1. Land kill criteria as the missing pre-launch/post-launch decision discipline.
2. Land eval-debt maintenance so the capstone rubric measures ongoing eval quality, not just initial setup.
3. Add the failure anthology to strengthen pattern recognition using structured, freshness-trackable case data.
4. Encode the new artifact expectations into reusable GitHub CI so output accountability becomes enforceable.
5. Close with rubric/capstone/changelog alignment and end-to-end validation.

## Breaking Changes and Migrations

- No persistence or route migration is expected at the same level as Wave 1
- Capstone readiness semantics will change because new required artifacts may need to be reflected in milestone wording or scoring
- Rubric expectations will tighten; existing learner artifacts may look incomplete against the updated rubric until templates are adopted

## Validation Points

- Spec 06: confirm Module 1 now teaches kill thresholds with a usable register template and capstone tie-in
- Spec 09: confirm Module 6 now distinguishes eval maintenance from eval creation and exposes a realistic audit artifact
- Spec 12: confirm at least six failure cases render with sources, framework mappings, and `lastVerified`
- Spec 13: confirm the reusable GitHub workflow fails clearly on missing manifest, warns in advisory mode, and fails in strict mode for missing artifacts
- Cross-cutting: confirm rubric, capstone milestones, and lesson artifact targets all describe the same required outputs

## Risks and Unknowns

- Structured case rendering for Spec 12 may not need a dedicated component if the existing lesson renderer is sufficient; implementation should inspect this before adding UI weight
- The current capstone milestone model is intentionally compact; adding too many new milestone obligations could dilute clarity unless changes stay milestone-oriented rather than checklist-sprawling
- Strict weekly artifact CI can create learner friction if the manifest schema is too rigid too early; advisory-first remains the safest rollout
- Raw `lastVerified` coverage is still incomplete from Wave 1, so any new structured content added in Wave 2 should set a stronger metadata example than the legacy lessons currently do

## Non-Functional Considerations

- Maintainability: keep new curriculum depth in `docs/templates/` and structured data files where possible instead of expanding monolithic lesson strings unnecessarily
- Pedagogical coherence: each added lesson should act as the missing “next question” after adjacent lessons, not a parallel topic dump
- Portability: the CI verifier should run on `ubuntu-latest` without external packages
- Legal/safety posture: failure anthology content must stay factual, sourced, and educational rather than opinion-heavy

## Ready Slice Recommendation

If execution starts immediately, the safest Wave 2 slice is:

1. Spec 06
2. Spec 09
3. Spec 12
4. Spec 13

This order keeps Wave 2 centered on one coherent outcome: stronger operational judgment plus enforceable artifact discipline, with CI landing only after the artifact model it enforces is complete.
