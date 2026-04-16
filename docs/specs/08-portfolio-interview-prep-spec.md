# AI PM Portfolio & Interview Prep Lesson — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 12)
- `Finding_the_right_online_course_for_your_career`

---

## Overview

The course ends at "ship capstone." It never teaches how to convert that artifact into market positioning. This spec adds a Module 12 lesson on turning GitHub artifacts into an AI PM portfolio deck, STAR-format storytelling for AI decisions, interview-grade trade-off articulation, and AI PM leveling signals (L5 vs L6 vs Principal / Staff PM).

---

## Actors

- **AI PM Course Learner**: Needs to convert course outputs into hire-ability
- **Course Author (Beshoy)**: Maintains lesson and template
- **Course Application**: Renders the lesson and links the portfolio template

---

## Current State

- Capstone is treated as the endpoint
- No lesson teaches how to present AI decisions to a hiring panel
- No template exists for an AI PM portfolio or case-study format
- No leveling matrix is provided for AI PM roles

---

## In Scope

- One new lesson in Module 12: "AI PM Portfolio, Leveling, and Interview Storytelling"
- A `docs/templates/ai-pm-portfolio-template.md` template
- A leveling reference table (L4–Principal) with AI-specific signals
- At least 3 example STAR-format AI decision narratives

## Out of Scope

- Resume review or CV editing
- Salary negotiation content
- Company-specific interview loops

---

## User Stories

### US-001: Convert Capstone Into a Portfolio Artifact

**As a** learner,
**I want to** convert my GitHub capstone into an interview-ready portfolio deck,
**so that** hiring panels can evaluate my AI PM judgment.

**Acceptance Criteria:**
- [ ] AC-001: Lesson provides a portfolio template with required sections (problem, decision log, trade-offs, evals, outcomes)
- [ ] AC-002: Lesson provides at least 2 worked examples of portfolio-ready case studies
- [ ] AC-003: Apply exercise asks learner to produce their own portfolio entry
- [ ] AC-004: Error state — If the learner's case study hides trade-offs or presents only wins, the lesson flags it as non-credible

**Priority**: P0 | **Dependencies**: None

---

### US-002: Interview-Grade Trade-off Articulation

**As a** learner,
**I want to** practice articulating AI decisions using STAR and trade-off framing,
**so that** I can hold my own in senior AI PM interviews.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines STAR-for-AI-decisions and shows at least 3 worked examples
- [ ] AC-002: Lesson includes a checklist for interview-grade trade-off answers
- [ ] AC-003: Apply exercise asks learner to narrate their own capstone decision in STAR-for-AI format
- [ ] AC-004: Error state — If the learner's narrative hides uncertainty or eval failure, the lesson flags it

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: AI PM Leveling Signals

**As a** learner,
**I want to** understand leveling signals for AI PM roles,
**so that** I can target my portfolio at the level I want.

**Acceptance Criteria:**
- [ ] AC-001: Lesson provides a reference leveling matrix from L4 through Principal / Staff PM
- [ ] AC-002: Matrix maps each level to specific AI PM behaviors (eval authority, cross-team influence, model trade-offs)
- [ ] AC-003: Apply exercise asks learner to self-assess their current level and identify the next-level gap
- [ ] AC-004: Error state — If the learner self-assesses without evidence, the lesson flags self-assessment without artifacts as unsubstantiated

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (Module 12 — new lesson)
- `src/data/lessonEnhancements.js` (leadership note on hiring-signal calibration)
- `docs/templates/ai-pm-portfolio-template.md` (new)
- `docs/templates/ai-pm-leveling-matrix.md` (new)

---

## Non-Functional Requirements

- **Pedagogical coherence**: Must sit at end of Module 12 as the exit artifact
- **Evidence orientation**: All examples must tie back to course-created artifacts
- **Maintainability**: Leveling matrix must be freshness-tracked

---

## Risks and Unknowns

- Leveling expectations vary widely between companies — lesson must caveat
- Some learners are internal promotion candidates, others external — provide both framings

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AI PM Portfolio & Interview Prep
User Stories:      3
Acceptance Tests:  12
Out of Scope:      3 items
Spec Location:     docs/specs/08-portfolio-interview-prep-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson and template skeletons.
