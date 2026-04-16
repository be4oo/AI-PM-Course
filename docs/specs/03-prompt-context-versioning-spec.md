# Prompt & Context Versioning as Code — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 3, Module 7)
- `docs/templates/weekly-design-review.md`

---

## Overview

Module 3 teaches context engineering beautifully, but never addresses prompt versioning, prompt registry, semantic diffing, A/B rollout of system prompts, rollback discipline, or PR review standards for prompts. This is now table-stakes at serious AI orgs. This spec adds a lesson to Module 7 and a `prompts/` directory convention to the capstone repo, plus a reusable template for prompt change review.

---

## Actors

- **AI PM Course Learner**: Needs to manage prompts the way engineers manage code
- **Course Author (Beshoy)**: Owns lesson placement and template
- **Course Application**: Renders the new lesson and links to the template

---

## Current State

- Prompts are treated as inline strings in lesson examples
- No lesson addresses prompt change as a deployable artifact
- No template exists for prompt review
- The capstone repo structure does not include a `prompts/` directory convention

---

## In Scope

- One new lesson in Module 7 titled "Prompt & Context Versioning"
- A `prompts/` directory convention with `v1/`, `v2/`, `latest/` folders and `CHANGELOG.md`
- A `docs/templates/prompt-change-review.md` template
- Integration with the capstone checklist (prompt registry becomes a required artifact)

## Out of Scope

- Building a prompt registry product or service
- Automated prompt optimization tools (DSPy, etc.) — future spec
- Fine-tuning workflows (covered in Module 3)

---

## User Stories

### US-001: Treat Prompts as Versioned Artifacts

**As a** learner,
**I want to** learn how to version prompts with semantic diffs and rollback,
**so that** I can ship prompt changes with the same rigor as code changes.

**Acceptance Criteria:**
- [ ] AC-001: Lesson covers semantic diff patterns for prompts (what changed, why, expected behavior delta)
- [ ] AC-002: Lesson defines minimum prompt PR review standards (eval before merge, blast radius, rollback window)
- [ ] AC-003: Lesson provides a `prompts/` directory convention example
- [ ] AC-004: Error state — If learners edit prompts in place without bumping version, the template flags it

**Priority**: P0 | **Dependencies**: None

---

### US-002: Prompt Change Review Template

**As a** learner,
**I want to** use a standardized template for reviewing prompt changes,
**so that** prompt reviews cover blast radius, eval impact, and rollback plan.

**Acceptance Criteria:**
- [ ] AC-001: Template exists at `docs/templates/prompt-change-review.md`
- [ ] AC-002: Template includes fields for: change summary, eval delta, blast radius, rollback plan, approver sign-off
- [ ] AC-003: Template is referenced from the new lesson's Apply exercise
- [ ] AC-004: Error state — If a required field is empty, the Apply exercise flags the submission as incomplete

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Integrate Prompt Registry Into Capstone

**As a** learner,
**I want to** include a prompt registry as a capstone deliverable,
**so that** my capstone demonstrates production prompt discipline.

**Acceptance Criteria:**
- [ ] AC-001: The capstone checklist adds "Prompt registry with at least 2 versions and CHANGELOG.md"
- [ ] AC-002: The capstone rubric dimension for Operational Readiness includes prompt-versioning evidence
- [ ] AC-003: Error state — If the capstone repo lacks a `prompts/` directory, the assessment template marks operational readiness as incomplete

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (Module 7 — new lesson)
- `src/data/lessonEnhancements.js` (leadership note on prompt governance)
- `docs/templates/prompt-change-review.md` (new)
- `docs/templates/assessment-rubric-operations.md` (add prompt-versioning evidence field)

---

## Non-Functional Requirements

- **Pedagogical coherence**: Must sit in Module 7 governance, not duplicate Module 3 context engineering
- **Maintainability**: Template must not hard-code any specific model or vendor

---

## Risks and Unknowns

- Learners without git fluency may treat versioning as optional — enforce via capstone gate
- Overlap with existing eval lessons — clarify that prompt changes trigger eval re-runs

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Prompt & Context Versioning as Code
User Stories:      3
Acceptance Tests:  11
Out of Scope:      3 items
Spec Location:     docs/specs/03-prompt-context-versioning-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson object and template skeleton.
