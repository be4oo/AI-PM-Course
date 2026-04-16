# Eval Debt & Maintenance Lesson — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 6)
- `docs/templates/eval-rubric-template.md`

---

## Overview

Module 6 teaches how to build evals but not how to maintain them. Real teams accumulate eval debt: drifted golden datasets, flaky LLM-judges, coverage gaps vs. production distribution, and stale rubrics. This spec adds a lesson on eval debt detection, refactoring, and a template for quarterly eval audits.

---

## Actors

- **AI PM Course Learner**: Must keep evals honest over time
- **Course Author (Beshoy)**: Maintains lesson and template
- **Course Application**: Renders the lesson and links the audit template

---

## Current State

- Module 6 covers eval creation, golden datasets, LLM-as-judge, and rubric-based scoring
- No lesson addresses eval drift, dataset rot, judge flakiness, or coverage gaps
- No template exists for eval debt audits
- The capstone measures eval quality at a point in time, not over time

---

## In Scope

- One new lesson in Module 6: "Eval Debt: Drift, Flakiness, and Coverage Gaps"
- A `docs/templates/eval-debt-audit.md` template
- A capstone addition: a 2-week post-launch eval audit artifact
- Reference patterns for judge-variance detection and coverage sampling

## Out of Scope

- Building a full eval CI system
- Replacing Promptfoo or LangSmith tutorials
- Statistical rigor coursework (covered at high level only)

---

## User Stories

### US-001: Detect Eval Drift and Dataset Rot

**As a** learner,
**I want to** detect when golden datasets or rubrics no longer reflect production,
**so that** my eval scores don't become a false comfort signal.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines at least 4 drift signals (production label drift, rubric staleness, adversarial gaps, unmeasured segments)
- [ ] AC-002: Lesson provides a sampling policy for refreshing golden datasets from production
- [ ] AC-003: Apply exercise asks learner to audit their capstone's eval suite for drift
- [ ] AC-004: Error state — If the learner hasn't refreshed their dataset in over 90 days, the lesson flags it

**Priority**: P0 | **Dependencies**: None

---

### US-002: Manage LLM-Judge Flakiness

**As a** learner,
**I want to** detect and mitigate LLM-judge flakiness,
**so that** judge variance doesn't mask real regressions.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines judge-variance measurement (repeat-run variance, calibration against humans)
- [ ] AC-002: Lesson covers at least 3 mitigations (ensembling, pinned model versions, judge retraining)
- [ ] AC-003: Apply exercise asks learner to run variance tests on their capstone judge
- [ ] AC-004: Error state — If judge variance exceeds threshold, the lesson flags the eval results as unreliable

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Post-Launch Eval Audit in Capstone

**As a** learner,
**I want to** include a post-launch eval audit in the capstone,
**so that** my capstone demonstrates eval maintenance, not just eval creation.

**Acceptance Criteria:**
- [ ] AC-001: The capstone checklist adds "2-week post-launch eval audit"
- [ ] AC-002: The rubric adds eval-maintenance evidence under Evaluation Quality dimension
- [ ] AC-003: Error state — If no audit artifact exists, the rubric marks evaluation quality as incomplete for the extended capstone

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (Module 6 — new lesson)
- `src/data/lessonEnhancements.js` (tooling lab on variance measurement)
- `docs/templates/eval-debt-audit.md` (new)
- `docs/templates/assessment-rubric-operations.md` (add eval-maintenance evidence)

---

## Non-Functional Requirements

- **Pedagogical coherence**: Must build on Module 6 without duplicating its content
- **Realism**: Examples must use realistic numbers for variance and drift
- **Maintainability**: Reference patterns must not tie to one vendor

---

## Risks and Unknowns

- Some learners won't run their capstone long enough for true drift — require at least simulated drift in the audit exercise
- Overlap with Module 7 observability — clarify that eval debt is a separate discipline from tracing

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Eval Debt & Maintenance
User Stories:      3
Acceptance Tests:  11
Out of Scope:      3 items
Spec Location:     docs/specs/09-eval-debt-maintenance-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson and template skeletons.
