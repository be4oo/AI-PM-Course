# Adversarial Cohort Simulator — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `docs/templates/assessment-rubric-operations.md`
- `docs/templates/weekly-red-team.md`
- `docs/templates/weekly-design-review.md`
- `src/data/curriculum.js`
- `src/data/lessonEnhancements.js`

---

## Overview

The course currently lacks pressure-testing. The existing self-quiz, artifact checklist, and rubric are self-graded — learners never experience adversarial critique under rubric-bound review. This spec defines an LLM-powered "Simulated Cohort" feature that reads learner-pushed artifacts (PRDs, eval suites, trust designs, ROI memos), runs them through the existing `assessment-rubric-operations.md` gates, and returns scored feedback in the voice of a senior AI PM reviewer.

The simulator is the single highest-leverage differentiator vs. paid cohort-based programs. It converts self-study into evidence-gated competency with measurable learning velocity.

---

## Actors

- **AI PM Course Learner**: Pushes an artifact (paste or URL) and requests adversarial review
- **Simulated Reviewer Persona**: LLM persona configured per rubric dimension (Safety, Eval, Ops, Trust, Problem Framing, Design)
- **Course Author (Beshoy)**: Maintains reviewer persona prompts and rubric mappings
- **Course Application**: Provides UI entry point, stores review history, computes learning velocity over time

---

## Current State

- The course has a strong rubric (`assessment-rubric-operations.md`) with 6 dimensions and 4 gates
- The course has red-team and design-review templates, but no automated reviewer
- Learners have no feedback loop beyond self-quiz and artifact checklist
- There is no persistence of review scores over time
- No reviewer prompt library exists in the repo

---

## In Scope

- A Review panel accessible from any lesson and from the capstone dashboard
- Paste-in or URL-fetch of learner artifacts
- Multi-persona reviewer that scores across rubric dimensions A–F
- Structured output: score per dimension, 3 strengths, 3 gaps, required actions
- Persistence of review history keyed by lesson/capstone milestone
- Learning velocity metric computed from score deltas over time

## Out of Scope

- Human peer review
- Live office-hours facilitation
- Grading of free-form essays (only rubric-bound artifacts)
- Certification issuance or external verification

---

## User Stories

### US-001: Submit an Artifact for Adversarial Review

**As an** AI PM Course Learner,
**I want to** submit a PRD, eval suite, or trust design artifact for rubric-bound review,
**so that** I get senior-level critique without needing a paid cohort.

**Acceptance Criteria:**
- [ ] AC-001: Review panel accepts pasted markdown and GitHub raw URL input
- [ ] AC-002: Review completes in under 30 seconds for artifacts up to 15KB
- [ ] AC-003: Output includes score (0–4) for each of 6 rubric dimensions with evidence
- [ ] AC-004: Output lists top 3 strengths, top 3 gaps, and 3 required actions with owners
- [ ] AC-005: Error state — If the artifact is unparseable or too large, the reviewer returns a structured error with remediation advice instead of a score

**Priority**: P0 | **Dependencies**: None

---

### US-002: Apply Different Reviewer Personas

**As a** learner,
**I want to** select a reviewer persona (e.g., Safety Reviewer, Eval Engineer, Executive Sponsor, Red-Team Attacker),
**so that** I get specialized critique matched to the artifact type.

**Acceptance Criteria:**
- [ ] AC-001: At least five reviewer personas are shipped with the course
- [ ] AC-002: Each persona has an anchored system prompt stored in `src/data/reviewerPersonas.js`
- [ ] AC-003: The selected persona weights rubric dimensions differently and exposes that weighting in the UI
- [ ] AC-004: Error state — If no persona is selected, the default persona is `senior-ai-pm`

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Track Learning Velocity Over Time

**As a** learner,
**I want to** see my rubric scores evolve across submissions,
**so that** I know whether I am actually improving.

**Acceptance Criteria:**
- [ ] AC-001: All review results are persisted locally with timestamp, lesson ID, and score vector
- [ ] AC-002: A velocity chart renders rolling average score per dimension over time
- [ ] AC-003: The dashboard flags any dimension stuck below 2.0 for 3+ submissions as a remediation target
- [ ] AC-004: Error state — If fewer than 2 submissions exist, the chart shows a calibration prompt instead

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/reviewerPersonas.js` (new)
- `src/components/ReviewPanel.jsx` (new)
- `src/components/VelocityChart.jsx` (new)
- `src/App.jsx` (wire entry point)
- `src/data/lessonEnhancements.js` (add reviewer hints per lesson)
- `docs/templates/review-submission-template.md` (new)

---

## Non-Functional Requirements

- **Performance**: P95 review latency under 30 seconds for 15KB input
- **Cost**: Average cost per review under $0.08 using cached system prompt and capped output tokens
- **Privacy**: Artifacts are not logged beyond the user's local history store unless opt-in sharing is enabled
- **Reliability**: On API failure, return a structured stub result with retry guidance instead of breaking the UI
- **Maintainability**: Reviewer personas must be hot-swappable without code deploys

---

## Risks and Unknowns

- Reviewer hallucination: model may score generously or punish stylistically unusual but correct work
- Prompt drift: personas may become stale as curriculum evolves
- Learner gaming: learners may write to the persona rather than the real job — mitigated by hidden red-team persona

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Adversarial Cohort Simulator
User Stories:      3
Acceptance Tests:  13
Out of Scope:      4 items
Spec Location:     docs/specs/01-adversarial-cohort-simulator-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to produce file-level edits and persona prompt scaffolding.
