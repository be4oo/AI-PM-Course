# Adversarial Cohort Simulator — Task Board

## Summary
Total Phases: 7 | Total Tasks: 20 | Parallel Tasks: 11 | Est. Complexity: High

---

## Phase 1: Review Domain Contract

- [ ] [any] [P] TASK-001: Create `src/data/reviewerPersonas.js` with the initial persona pack
      Agent: any
      Priority: P0
      Deps: None
      Exit: At least 5 personas are defined with `senior-ai-pm` as the default, each persona exposes rubric-weight metadata and artifact-fit guidance, and the module is importable from the React app

- [ ] [any] [P] TASK-002: Create `src/utils/reviewHistory.js` with normalized submission and result schemas
      Agent: any
      Priority: P0
      Deps: None
      Exit: One canonical shape exists for review submissions, successful results, and structured error results, and the helpers support serialization/deserialization without UI-specific assumptions

- [ ] [any] [P] TASK-003: Create `docs/templates/review-submission-template.md`
      Agent: any
      Priority: P1
      Deps: None
      Exit: The template covers learner metadata, artifact source, persona, artifact type, rubric expectations, and submission notes, and is usable as both learner guidance and QA fixture content

Wave note: Tasks `001`–`003` are Wave A of max-3 parallel work.

- [ ] [any] [S] TASK-004: Update `docs/templates/assessment-rubric-operations.md` for simulator-compatible structured scoring
      Agent: any
      Priority: P0
      Deps: TASK-001, TASK-002, TASK-003
      Exit: The rubric preserves Dimensions A–F, defines machine-readable evidence fields for simulator output, and supports strengths, gaps, required actions, and structured incomplete-evidence handling

---

## Phase 2: Persistence and Migration Support

- [ ] [frontend] [P] TASK-005: Extend `src/App.jsx` state with simulator history, selected persona, and draft-review state
      Agent: frontend
      Priority: P0
      Deps: TASK-002
      Exit: Simulator submission history, active persona selection, and current review draft are first-class React state and do not reuse `reviewEvidence` or `cohortEvidence`

- [ ] [frontend] [P] TASK-006: Update `src/App.jsx` load/save flows to persist simulator state in `ai-pm-progress`
      Agent: frontend
      Priority: P0
      Deps: TASK-005
      Exit: Fresh sessions and saved sessions both hydrate simulator data correctly, and reload preserves history, persona selection, and draft review state

- [ ] [any] [P] TASK-007: Update `src/utils/moduleStorage.js` for simulator-history compatibility
      Agent: any
      Priority: P0
      Deps: TASK-002
      Exit: Migration helpers preserve backwards compatibility for old payloads and normalize any new lesson-linked simulator keys without breaking current review/cohort storage behavior

Wave note: Tasks `005`–`007` are split into Wave B with `005` and `007` first, then `006` after `005`.

- [ ] [any] [S] TASK-008: Add persistence and schema tests in `src/utils/reviewHistory.test.js` and related storage tests
      Agent: any
      Priority: P0
      Deps: TASK-006, TASK-007
      Exit: Tests cover valid history records, malformed payload fallback, legacy snapshot loading, and lesson-linked key normalization

---

## Phase 3: Review Submission Surface

- [ ] [frontend] [P] TASK-009: Create `src/components/ReviewPanel.jsx` with paste and URL submission modes
      Agent: frontend
      Priority: P0
      Deps: TASK-001, TASK-002, TASK-006
      Exit: Learners can open one panel, switch between paste and URL modes, select a persona, enter artifact context, and submit a valid review request object

- [ ] [frontend] [P] TASK-010: Add client-side validation and structured error states to `src/components/ReviewPanel.jsx`
      Agent: frontend
      Priority: P0
      Deps: TASK-009
      Exit: Empty content, oversize artifacts, invalid URLs, and parse failures each render a structured error state with remediation guidance and no fake score output

- [ ] [frontend] [P] TASK-011: Add rubric-weight preview and persona explanation UI to `src/components/ReviewPanel.jsx`
      Agent: frontend
      Priority: P1
      Deps: TASK-001, TASK-009
      Exit: The selected persona exposes rubric weighting and reviewer framing in the UI without hiding the core six-dimension score contract

Wave note: Tasks `009`–`011` are Wave C of max-3 parallel work.

- [ ] [frontend] [S] TASK-012: Wire the review panel into lesson and capstone entry points in `src/App.jsx`
      Agent: frontend
      Priority: P0
      Deps: TASK-010, TASK-011
      Exit: At least one lesson-level entry point and one capstone-level entry point open the same review panel without fragmenting navigation or losing current progress state

- [ ] [frontend] [S] TASK-013: Update `src/views/CourseViews.jsx` to surface simulator status and recent submissions beside existing review/cohort flows
      Agent: frontend
      Priority: P0
      Deps: TASK-012
      Exit: Existing review and cohort surfaces show review-ready affordances, recent simulator activity, and clear next actions so the simulator reads as an upgrade to current review loops

---

## Phase 4: Review Engine Integration

- [ ] [frontend] [P] TASK-014: Implement a review-engine adapter boundary in `src/App.jsx` or a dedicated helper
      Agent: frontend
      Priority: P0
      Deps: TASK-002, TASK-012
      Exit: The UI submits normalized review requests to one adapter contract and receives normalized success or structured failure results without being coupled to a specific model API

- [ ] [frontend] [P] TASK-015: Add an initial deterministic execution mode for local development and fallback behavior
      Agent: frontend
      Priority: P0
      Deps: TASK-014
      Exit: Developers can run the review flow end to end without hidden infrastructure, and the adapter supports pending, success, and structured failure states cleanly

- [ ] [frontend] [P] TASK-016: Persist completed and failed review attempts into the structured history store
      Agent: frontend
      Priority: P0
      Deps: TASK-014, TASK-015
      Exit: Every submission attempt creates a timestamped history record with lesson or capstone context, persona, status, and score vector when available

Wave note: Tasks `014`–`016` are split into Wave D with `014` first, then `015`, then `016` because they share adapter and persistence surfaces.

- [ ] [any] [S] TASK-017: Add QA fixtures or tests for adapter result parsing and fallback behavior
      Agent: any
      Priority: P0
      Deps: TASK-015, TASK-016
      Exit: Tests or fixtures verify normalized parsing, structured failure handling, and history persistence for both successful and unsuccessful review attempts

---

## Phase 5: Velocity and Longitudinal Feedback

- [ ] [any] [P] TASK-018: Create `src/utils/velocity.js` and `src/utils/velocity.test.js`
      Agent: any
      Priority: P0
      Deps: TASK-016
      Exit: Velocity utilities compute rolling per-dimension trends, stuck-dimension flags, and insufficient-history fallbacks, and tests cover fewer-than-two, fewer-than-three, improving, flat, and regressing histories

- [ ] [frontend] [P] TASK-019: Create `src/components/VelocityChart.jsx` and render it in the simulator surfaces
      Agent: frontend
      Priority: P1
      Deps: TASK-018, TASK-013, TASK-016
      Exit: A chart renders rolling score trends from review history, flags remediation targets when a dimension stays below threshold, and shows a calibration prompt when history is insufficient

- [ ] [frontend] [P] TASK-020: Update simulator copy and labels to teach the review-history and velocity loop
      Agent: frontend
      Priority: P1
      Deps: TASK-019
      Exit: Learners can tell that velocity comes from repeated rubric-bound submissions and not a one-off grade, with copy consistent across lesson, review, and capstone surfaces

Wave note: Tasks `018`–`020` are split into Wave E with `018` first, then `019`, then `020`.

---

## Phase 6: Lesson and Capstone Integration

- [ ] [frontend] [P] TASK-021: Update `src/data/lessonEnhancements.js` with reviewer hints and recommended personas
      Agent: frontend
      Priority: P1
      Deps: TASK-013, TASK-016
      Exit: Capstone-adjacent and evaluation-heavy lessons surface intentional reviewer hints, artifact prompts, or recommended personas tied to adversarial review

- [ ] [frontend] [P] TASK-022: Update `src/data/capstoneDashboard.js` and capstone UI copy to reference simulator evidence
      Agent: frontend
      Priority: P0
      Deps: TASK-013, TASK-016
      Exit: Capstone readiness can visibly reference simulator review history as supporting evidence without creating a disconnected scoring silo

- [ ] [any] [P] TASK-023: Align local simulator result linking with the future persistence model in `docs/architecture/persistence-schema.md`
      Agent: any
      Priority: P1
      Deps: TASK-016
      Exit: The local history schema maps cleanly onto the documented future `reviews` domain and the linkage strategy for lesson keys and capstone milestones is documented in code or comments where needed

Wave note: Tasks `021`–`023` are Wave F of max-3 parallel work.

---

## Phase 7: Verification and Sequencing Closeout

- [ ] [any] [S] TASK-024: Run Wave 4 local verification across build, tests, persistence reload, and structured error states
      Agent: any
      Priority: P0
      Deps: TASK-017, TASK-020, TASK-021, TASK-022, TASK-023
      Exit: The React app builds, new utility tests pass, legacy progress snapshots still load, simulator history survives reload, and all required error states render safely

- [ ] [any] [S] TASK-025: Confirm readiness for follow-on Spec 17 and capture the sequencing note for Spec 16
      Agent: any
      Priority: P1
      Deps: TASK-024
      Exit: The landed history model is sufficient for Spec 17 planning without schema redesign, and a short note is recorded that positions Spec 16 as the second moat after the feedback engine

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: Starts immediately and defines the persona, rubric, and submission contracts
- **Phase 2**: Starts after Phase 1’s data model is clear enough to persist safely
- **Phase 3**: Starts after Phase 2 so the UI can rely on stable simulator state
- **Phase 4**: Starts after Phase 3 because the review engine should plug into a completed submission surface
- **Phase 5**: Starts after Phase 4 because velocity depends on real review history
- **Phase 6**: Starts after Phases 3 and 4 because lesson/capstone integration depends on the simulator already existing in the main UX
- **Phase 7**: Final verification pass once domain, storage, UI, engine, velocity, and integration work are all in place

### Critical Path

1. `TASK-001`/`TASK-002`/`TASK-003` → `TASK-004`
2. `TASK-005` → `TASK-006`; `TASK-007` in parallel → `TASK-008`
3. `TASK-009` → `TASK-010`; `TASK-011` in parallel → `TASK-012` → `TASK-013`
4. `TASK-014` → `TASK-015` → `TASK-016` → `TASK-017`
5. `TASK-018` → `TASK-019` → `TASK-020`
6. `TASK-021`/`TASK-022`/`TASK-023`
7. `TASK-024` → `TASK-025`

### Acceptance Coverage Map

- Spec 01 US-001 AC-001: `TASK-009`, `TASK-012`
- Spec 01 US-001 AC-002: `TASK-014`, `TASK-015`, `TASK-024`
- Spec 01 US-001 AC-003: `TASK-004`, `TASK-014`, `TASK-016`
- Spec 01 US-001 AC-004: `TASK-004`, `TASK-014`, `TASK-016`
- Spec 01 US-001 AC-005: `TASK-010`, `TASK-015`, `TASK-017`
- Spec 01 US-002 AC-001: `TASK-001`
- Spec 01 US-002 AC-002: `TASK-001`
- Spec 01 US-002 AC-003: `TASK-001`, `TASK-011`
- Spec 01 US-002 AC-004: `TASK-001`, `TASK-005`
- Spec 01 US-003 AC-001: `TASK-005`, `TASK-006`, `TASK-016`
- Spec 01 US-003 AC-002: `TASK-018`, `TASK-019`
- Spec 01 US-003 AC-003: `TASK-018`, `TASK-019`
- Spec 01 US-003 AC-004: `TASK-018`, `TASK-019`

---

```markdown
📋 PM BREAKDOWN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project:           Adversarial Cohort Simulator
Total Phases:      7
Total Tasks:       25
Parallel Tasks:    14 (6 waves of max 3)
Sequential Tasks:  11
Tasks Location:    docs/tasks/adversarial-cohort-simulator-tasks.md
Status:            ✅ Ready for the AI Development Factory queue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
