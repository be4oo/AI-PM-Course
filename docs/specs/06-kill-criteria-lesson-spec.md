# Kill Criteria & Product Sunset Lesson — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 1, Module 9, Module 12)
- `docs/templates/ai-risk-register.md`

---

## Overview

Module 1 teaches ROI and business case. The course never teaches the inverse: pre-committed kill criteria for AI features in production. Most AI products die slowly because no one had the conviction to kill them. This spec adds a lesson in Module 1 (paired with ROI) and a matching `kill-criteria-register.md` template, and integrates kill gates into the launch-control lessons in Module 9.

---

## Actors

- **AI PM Course Learner**: Needs discipline to commit kill thresholds before launch
- **Course Author (Beshoy)**: Maintains lesson and template
- **Course Application**: Renders the lesson and links the template to the capstone

---

## Current State

- Module 1 covers ROI and investment memo but not pre-committed kill criteria
- Module 9 covers go/no-go but only for launch, not for post-launch sunset
- No template exists for a kill-criteria register
- The capstone checklist does not include kill criteria as a deliverable

---

## In Scope

- One new lesson in Module 1 titled "Kill Criteria & Sunset Discipline"
- A `docs/templates/kill-criteria-register.md` template
- An integration hook in the Module 9 go/no-go lesson that references kill criteria
- A capstone deliverable: kill criteria register for the capstone feature

## Out of Scope

- Portfolio-level sunset decisions (covered in Module 12 executive content)
- Legal sunset procedures
- Customer notification playbooks

---

## User Stories

### US-001: Pre-Commit to Kill Criteria Before Launch

**As a** learner,
**I want to** learn how to pre-commit kill criteria before launch,
**so that** I can make sunset decisions on evidence, not emotion.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines at least 5 kill criteria dimensions (hallucination rate, unit economics, adoption, trust score, competitor displacement)
- [ ] AC-002: Lesson provides at least 2 real or anonymized case studies of AI products that should have been killed earlier
- [ ] AC-003: Apply exercise asks learner to draft kill criteria for their capstone feature
- [ ] AC-004: Error state — If the learner's criteria are all qualitative with no thresholds, the lesson flags it as unenforceable

**Priority**: P0 | **Dependencies**: None

---

### US-002: Kill Criteria Register Template

**As a** learner,
**I want to** use a standardized kill-criteria register template,
**so that** the criteria are documented, owned, and reviewable.

**Acceptance Criteria:**
- [ ] AC-001: Template exists at `docs/templates/kill-criteria-register.md`
- [ ] AC-002: Template includes fields for: criterion, threshold, measurement, owner, review cadence, sunset plan
- [ ] AC-003: Template is linked from the Apply exercise
- [ ] AC-004: Error state — If any required field is blank, the Apply exercise marks the submission incomplete

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Integrate Kill Criteria Into Capstone

**As a** learner,
**I want to** include a kill-criteria register as a capstone deliverable,
**so that** my capstone demonstrates sunset discipline.

**Acceptance Criteria:**
- [ ] AC-001: The capstone checklist adds kill-criteria register as a required artifact
- [ ] AC-002: The rubric adds kill-criteria evidence under Operational Readiness
- [ ] AC-003: Error state — If the capstone lacks a kill-criteria register, the rubric marks operational readiness incomplete

**Priority**: P1 | **Dependencies**: US-001, US-002

---

## Affected Files

- `src/data/curriculum.js` (Module 1 — new lesson; Module 9 — cross-reference)
- `src/data/lessonEnhancements.js` (executive note on portfolio sunsets)
- `docs/templates/kill-criteria-register.md` (new)
- `docs/templates/assessment-rubric-operations.md` (add kill-criteria evidence field)

---

## Non-Functional Requirements

- **Pedagogical coherence**: Must pair with ROI lesson as its inverse
- **Executive tone**: Leadership note must address portfolio-level sunset politics

---

## Risks and Unknowns

- Learners may skip this in practice — integrate with the capstone gate to force it
- Some criteria may be legally complex (contracts, users, data) — lesson flags this as a legal-review trigger

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Kill Criteria & Sunset Discipline
User Stories:      3
Acceptance Tests:  11
Out of Scope:      3 items
Spec Location:     docs/specs/06-kill-criteria-lesson-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson body and template fields.
