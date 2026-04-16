# Rubric Dimension G — Iteration Velocity — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `docs/templates/assessment-rubric-operations.md`
- `src/App.jsx` (review state and progress)

---

## Overview

The current assessment rubric measures six dimensions (A–F) at a point in time. It ignores the single strongest signal of AI PM aptitude: *how fast a learner closes identified gaps*. This spec adds Dimension G (Iteration Velocity) to the rubric and auto-computes it from historical review scores delivered by the Adversarial Cohort Simulator.

---

## Actors

- **AI PM Course Learner**: Improves over iterations, not just in one shot
- **Course Author (Beshoy)**: Maintains the rubric and the velocity formula
- **Course Application**: Computes and renders the velocity score

---

## Current State

- Rubric has six dimensions (A–F) scored 0–4 each, with four gates
- No dimension captures iteration velocity
- No auto-computation exists
- No velocity chart or trend view is provided

---

## In Scope

- Add Dimension G to `assessment-rubric-operations.md`
- Define a velocity formula from historical scores (delta per submission, lag to close gaps)
- Auto-compute the dimension from stored review history
- Render a velocity trend alongside the rubric summary

## Out of Scope

- Retroactive velocity for submissions that predate review history
- Human-graded velocity (velocity is automatic, not manual)

---

## User Stories

### US-001: Add Dimension G to the Rubric Template

**As a** course author,
**I want to** add Iteration Velocity as Dimension G,
**so that** future assessments include it alongside the existing six dimensions.

**Acceptance Criteria:**
- [ ] AC-001: Rubric template adds Dimension G with description, score scale, and evidence fields
- [ ] AC-002: The gate rules include a note that Dimension G does not gate pass/fail for first submissions
- [ ] AC-003: Error state — If no history exists, the rubric renders Dimension G as "N/A (insufficient history)"

**Priority**: P0 | **Dependencies**: None

---

### US-002: Auto-Compute Velocity From Review History

**As a** learner,
**I want to** have velocity auto-computed from my review history,
**so that** I see improvement without manual tracking.

**Acceptance Criteria:**
- [ ] AC-001: A velocity function computes score-delta-per-submission across at least the last 5 submissions
- [ ] AC-002: The function reports lag-to-close for each identified gap (time between gap flagged and gap closed)
- [ ] AC-003: The function outputs a single 0–4 velocity score mapped to thresholds
- [ ] AC-004: Error state — If history has fewer than 3 submissions, the function returns "insufficient history" rather than a misleading score

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Render Velocity Trend

**As a** learner,
**I want to** see a velocity trend chart,
**so that** I can see whether I am improving over time.

**Acceptance Criteria:**
- [ ] AC-001: A chart renders score-per-submission with a rolling average
- [ ] AC-002: Gaps that remain unresolved for more than 3 submissions are flagged as remediation targets
- [ ] AC-003: Error state — If the chart has no data, it shows a calibration prompt

**Priority**: P1 | **Dependencies**: US-002

---

## Affected Files

- `docs/templates/assessment-rubric-operations.md` (add Dimension G)
- `src/utils/velocity.js` (new)
- `src/utils/velocity.test.js` (new)
- `src/components/VelocityChart.jsx` (new, may be shared with Spec 01)
- `src/App.jsx` (wire the chart)

---

## Non-Functional Requirements

- **Determinism**: Velocity function must be deterministic given the same history
- **Transparency**: The formula must be documented and inspectable in the UI
- **Maintainability**: Thresholds must be tunable without code changes

---

## Risks and Unknowns

- Velocity can reward gaming (submit low, improve fast) — counter with minimum baseline gate
- Depends on Spec 01 for review history — sequence accordingly

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Rubric Dimension G — Iteration Velocity
User Stories:      3
Acceptance Tests:  10
Out of Scope:      2 items
Spec Location:     docs/specs/17-rubric-iteration-velocity-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` after Spec 01 (Adversarial Cohort Simulator) lands, since this depends on review history.
