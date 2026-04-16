# AI Product Analytics & Instrumentation Module — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 6, 7, 9)
- `docs/templates/assessment-rubric-operations.md`
- `docs/live/` (existing observability content)

---

## Overview

The course teaches offline evals (Module 6) and observability traces (Module 7), but not product analytics for AI features — the in-production metrics that answer "is this feature working for users, not just passing evals." This includes regret rate, containment rate, shadow-mode A/B, interleaved eval, survivor-bias traps, and non-deterministic session success definitions. This spec defines a new module inserted as Module 6.5 or as three lessons embedded across Modules 6, 7, and 9.

---

## Actors

- **AI PM Course Learner**: Needs to instrument AI features with product-level metrics, not just LLM-level metrics
- **Course Author (Beshoy)**: Decides placement (new module vs. embedded lessons)
- **Course Application**: Renders new lessons and provides a reference instrumentation schema

---

## Current State

- Module 6 covers offline evals but stops at golden datasets
- Module 7 covers tracing and SLOs but not product analytics
- No lesson defines "session success" for non-deterministic features
- No reference instrumentation event schema exists in the repo
- Shadow mode, interleaved eval, and containment rate are not taught

---

## In Scope

- Three new lessons: Session Success Definition, Shadow Mode & Interleaved Eval, Regret & Containment Metrics
- A reference event schema (`docs/templates/ai-event-schema.md`)
- A case study lesson on survivor bias in AI feedback data
- Integration with the existing capstone checklist (add instrumentation requirement)

## Out of Scope

- Building a live analytics dashboard
- Replacing Langfuse or overlapping with Module 7 observability
- Vendor-specific analytics tool tutorials (Amplitude, Mixpanel)

---

## User Stories

### US-001: Define Session Success for AI Features

**As a** learner,
**I want to** learn how to define session success for non-deterministic features,
**so that** I can instrument and measure outcomes without binary pass/fail traps.

**Acceptance Criteria:**
- [ ] AC-001: Lesson teaches at least 4 session-success patterns (completion, containment, escalation avoidance, regret-free close)
- [ ] AC-002: Lesson includes at least 2 real examples (support agent, shopping assistant) with event-level definitions
- [ ] AC-003: Apply exercise requires learner to write a session-success spec for their capstone feature
- [ ] AC-004: Error state — If the learner's definition depends on exact-match or binary correctness, the lesson flags it as inappropriate for AI features

**Priority**: P0 | **Dependencies**: None

---

### US-002: Learn Shadow Mode and Interleaved Evaluation

**As a** learner,
**I want to** understand shadow-mode rollout and interleaved evals,
**so that** I can validate AI features against production traffic without user-visible risk.

**Acceptance Criteria:**
- [ ] AC-001: Lesson differentiates shadow mode, canary, interleaved eval, and A/B with failure-mode notes for each
- [ ] AC-002: Lesson includes a decision tree for when each pattern fits
- [ ] AC-003: Apply exercise asks learner to design a shadow-mode rollout for their capstone
- [ ] AC-004: Error state — If the learner's plan lacks traffic isolation, the lesson flags it as unsafe

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Teach Regret Rate, Containment Rate, and Survivor Bias

**As a** learner,
**I want to** learn AI-specific product metrics and their biases,
**so that** I don't ship features that look successful due to self-selection in feedback.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines regret rate, containment rate, deflection rate, and edit distance
- [ ] AC-002: Lesson covers at least 3 survivor-bias traps in AI feedback data
- [ ] AC-003: Apply exercise asks learner to identify bias risks in their capstone's feedback loop
- [ ] AC-004: Error state — If the learner's metrics rely only on thumbs-up/down without sampling policy, the lesson flags it

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (insert lessons 6.x or new Module 6.5)
- `src/data/lessonEnhancements.js` (add leadership and tooling entries)
- `docs/templates/ai-event-schema.md` (new)
- `docs/templates/session-success-spec.md` (new)

---

## Non-Functional Requirements

- **Pedagogical coherence**: Must not duplicate Module 6 evals or Module 7 observability
- **Artifact reuse**: Reference event schema must be usable as-is in the capstone
- **Maintainability**: Lessons must not hard-code vendor product names beyond examples

---

## Risks and Unknowns

- Placement tension: three new lessons may overload Module 6 — confirm whether to insert Module 6.5 or spread lessons across 6/7/9
- Some survivor-bias content could conflict with existing feedback-loop lesson in Module 5 — must cross-reference

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AI Product Analytics & Instrumentation
User Stories:      3
Acceptance Tests:  12
Out of Scope:      3 items
Spec Location:     docs/specs/02-ai-product-analytics-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to decide placement (Module 6.5 vs. embedded) and draft lesson objects.
