# Wave 2 Operating Rigor and Failure Pattern Recognition — Task Board

## Summary
Total Phases: 6 | Total Tasks: 18 | Parallel Tasks: 10 | Est. Complexity: Medium

---

## Phase 1: Spec 06 — Kill Criteria and Sunset Discipline

- [ ] [frontend] [S] TASK-001: Add the new kill-criteria lesson to Module 1 in `src/data/curriculum.js`
      Agent: frontend
      Priority: P0
      Deps: None
      Exit: Module 1 contains a new lesson near ROI/business-case content that defines at least 5 kill-criteria dimensions, includes at least 2 case references, and links to a capstone-facing Apply exercise

- [ ] [frontend] [S] TASK-002: Add supporting framing in `src/data/lessonEnhancements.js` for the kill-criteria lesson
      Agent: frontend
      Priority: P0
      Deps: TASK-001
      Exit: The new lesson has leadership/deep-mode support that frames kill criteria as pre-committed operating discipline and not just post-launch cleanup

- [ ] [any] [S] TASK-003: Create `docs/templates/kill-criteria-register.md`
      Agent: any
      Priority: P0
      Deps: TASK-001
      Exit: The template includes criterion, threshold, measurement, owner, review cadence, and sunset plan, and is directly usable from the lesson Apply flow

- [ ] [any] [S] TASK-004: Update `docs/templates/assessment-rubric-operations.md` and `src/data/capstoneDashboard.js` to require kill-criteria evidence
      Agent: any
      Priority: P0
      Deps: TASK-002, TASK-003
      Exit: Operational-readiness evidence and capstone milestones both recognize a kill-criteria register as part of required capstone proof

---

## Phase 2: Spec 09 — Eval Debt and Maintenance

- [ ] [frontend] [P] TASK-005: Add the eval-debt lesson to Module 6 in `src/data/curriculum.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-004
      Exit: Module 6 contains a distinct lesson on drift, dataset rot, judge flakiness, and coverage gaps without duplicating existing eval-creation material

- [ ] [frontend] [P] TASK-006: Extend `src/data/lessonEnhancements.js` with an eval-maintenance tooling lab
      Agent: frontend
      Priority: P0
      Deps: TASK-004
      Exit: The new Module 6 lesson includes tooling-lab support for judge variance measurement, simulated drift review, and audit cadence

- [ ] [any] [P] TASK-007: Create `docs/templates/eval-debt-audit.md`
      Agent: any
      Priority: P0
      Deps: TASK-004
      Exit: The template supports both quarterly eval-maintenance review and a 2-week post-launch audit artifact

Wave note: Tasks `005`–`007` are Wave A of max-3 parallel work.

- [ ] [any] [S] TASK-008: Update `docs/templates/assessment-rubric-operations.md` and `src/data/capstoneDashboard.js` to add eval-maintenance evidence
      Agent: any
      Priority: P0
      Deps: TASK-005, TASK-006, TASK-007
      Exit: Capstone readiness language and rubric evidence both explicitly mention post-launch eval-maintenance audit expectations

---

## Phase 3: Spec 12 — AI Product Failure Anthology

- [ ] [any] [P] TASK-009: Create `src/data/failureCases.js` with the initial six-case anthology
      Agent: any
      Priority: P0
      Deps: TASK-008
      Exit: Structured failure-case data exists with verified public sources, `lastVerified`, framework mappings, harm summaries, and debrief prompts for at least 6 cases

- [ ] [frontend] [P] TASK-010: Add the failure-anthology lesson to Module 9 in `src/data/curriculum.js`
      Agent: frontend
      Priority: P0
      Deps: TASK-008
      Exit: Module 9 exposes the failure anthology as a first-class lesson with framework-aware debrief framing and artifact path integration

- [ ] [any] [P] TASK-011: Create `docs/templates/failure-debrief-template.md`
      Agent: any
      Priority: P0
      Deps: TASK-008
      Exit: The template includes timeline, decisions, framework review, and counterfactual-design sections and is linked from the anthology lesson

Wave note: Tasks `009`–`011` are Wave B of max-3 parallel work.

- [ ] [frontend] [S] TASK-012: Add `src/components/FailureCaseView.jsx` only if structured rendering is needed
      Agent: frontend
      Priority: P1
      Deps: TASK-009, TASK-010
      Exit: Failure cases render in a consistent, scannable format without bloating one lesson string, or implementation explicitly proves the component is unnecessary

- [ ] [frontend] [S] TASK-013: Seed anthology freshness/changelog integration in `src/data/changelog.js` and related runtime surfaces
      Agent: frontend
      Priority: P1
      Deps: TASK-009, TASK-010, TASK-011
      Exit: The anthology has Wave 2 changelog entries and the new structured cases are compatible with the existing freshness discipline

---

## Phase 4: Spec 13 — Weekly Artifact CI Enforcement

- [ ] [infra] [P] TASK-014: Create `docs/ci/weekly-artifact-check.yml`
      Agent: infra
      Priority: P0
      Deps: TASK-004, TASK-008
      Exit: A reusable GitHub Actions workflow exists in `docs/ci/`, runs on `push` and `pull_request`, and emits a clear setup error when the manifest is missing

- [ ] [infra] [P] TASK-015: Create `docs/ci/verify-artifacts.js` and `docs/ci/artifact-manifest.example.json`
      Agent: infra
      Priority: P0
      Deps: TASK-004, TASK-008
      Exit: The verifier checks decision memo, working build, eval report, and retrospective requirements, supports advisory/strict mode, and prints per-artifact diagnostics

- [ ] [any] [P] TASK-016: Create `docs/templates/weekly-artifact-setup-guide.md`
      Agent: any
      Priority: P1
      Deps: TASK-014, TASK-015
      Exit: Learners have a one-page setup guide that explains initial setup, advisory mode, strict mode, and first-push troubleshooting

Wave note: Tasks `014`–`016` are split into Wave C with `014` and `015` first, then `016` once the workflow/verifier exist.

- [ ] [frontend] [S] TASK-017: Add course references to the CI pack in `src/data/curriculum.js` and/or `src/data/lessonEnhancements.js`
      Agent: frontend
      Priority: P1
      Deps: TASK-014, TASK-015, TASK-016
      Exit: The app surfaces weekly-artifact CI setup guidance from the capstone or relevant operations lessons

---

## Phase 5: Integration Verification and Release Readiness

- [ ] [any] [S] TASK-018: Run Wave 2 integration verification across lessons, templates, capstone rubric, and CI pack
      Agent: any
      Priority: P0
      Deps: TASK-012, TASK-013, TASK-017
      Exit: Modules 1, 6, and 9 read coherently; rubric and capstone expectations align with the new artifacts; local verification passes for any new scripts/components; and Wave 2 changelog entries are present

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: Starts immediately and defines the first new capstone artifact contract
- **Phase 2**: Starts after Phase 1 because eval-maintenance evidence should build on the updated capstone/rubric model
- **Phase 3**: Starts after Phase 2 so the failure anthology lands into the strengthened freshness/changelog and artifact environment
- **Phase 4**: Starts after Phases 1 and 2 because the CI should enforce the artifact model after kill-criteria and eval-maintenance expectations are final
- **Phase 5**: Final integration pass once all lesson, template, rubric, and CI surfaces exist

### Critical Path

1. `TASK-001` → `TASK-002`/`TASK-003` → `TASK-004`
2. `TASK-005`/`TASK-006`/`TASK-007` → `TASK-008`
3. `TASK-009`/`TASK-010`/`TASK-011` → `TASK-012`/`TASK-013`
4. `TASK-014`/`TASK-015` → `TASK-016` → `TASK-017`
5. `TASK-018`

### Acceptance Coverage Map

- Spec 06 US-001: `TASK-001`, `TASK-002`
- Spec 06 US-002: `TASK-003`
- Spec 06 US-003: `TASK-004`
- Spec 09 US-001: `TASK-005`, `TASK-007`
- Spec 09 US-002: `TASK-005`, `TASK-006`
- Spec 09 US-003: `TASK-008`
- Spec 12 US-001: `TASK-009`, `TASK-010`
- Spec 12 US-002: `TASK-011`
- Spec 12 US-003: `TASK-009`, `TASK-010`, `TASK-012`
- Spec 13 US-001: `TASK-014`
- Spec 13 US-002: `TASK-015`
- Spec 13 US-003: `TASK-016`, `TASK-017`

---

```markdown
📋 PM BREAKDOWN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project:           Wave 2 Operating Rigor and Failure Pattern Recognition
Total Phases:      6
Total Tasks:       18
Parallel Tasks:    10 (4 waves of max 3)
Sequential Tasks:  8
Tasks Location:    docs/tasks/wave-2-operating-rigor-tasks.md
Status:            ✅ Ready for the AI Development Factory queue.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
