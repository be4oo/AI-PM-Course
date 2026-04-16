# AI-Native User Research Lesson — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 4 Discovery)

---

## Overview

Module 4 teaches traditional discovery interviews. It never teaches how to use AI itself to do PM work: AI-synthesized interview themes, adversarial persona generation, Wizard-of-Oz testing of AI features, and AI-shadow research. An AI PM course that does not teach using AI for PM is incomplete. This spec adds a lesson in Module 4 with Apply exercises that require learners to use AI during discovery.

---

## Actors

- **AI PM Course Learner**: Applies AI to their own PM workflow
- **Course Author (Beshoy)**: Maintains lesson and AI prompt library
- **Course Application**: Renders the lesson and links the prompt library

---

## Current State

- Module 4 uses manual interview techniques only
- No lesson covers AI for thematic synthesis, adversarial persona generation, or Wizard-of-Oz piloting
- No reusable prompt library exists for discovery work
- Meta-level gap: the course teaches AI PM without modeling AI-native PM behavior

---

## In Scope

- One new lesson in Module 4: "AI-Native User Research"
- A `docs/templates/ai-discovery-prompt-library.md` with reusable prompts
- Apply exercises that require using AI for interview synthesis and persona generation
- A Wizard-of-Oz pilot pattern for validating AI features with real users

## Out of Scope

- Replacing qualitative research methods entirely
- Vendor-specific transcription or research tools
- Survey design coursework

---

## User Stories

### US-001: Synthesize Interviews Using AI

**As a** learner,
**I want to** use AI to synthesize 20+ interviews into themes,
**so that** I can scale discovery without losing fidelity.

**Acceptance Criteria:**
- [ ] AC-001: Lesson provides a prompt pattern for thematic synthesis with explicit grounding
- [ ] AC-002: Lesson covers at least 3 failure modes (fabrication, theme inflation, loss of outlier signal)
- [ ] AC-003: Apply exercise asks learner to synthesize 5+ interview notes using the pattern
- [ ] AC-004: Error state — If the learner accepts AI themes without source-mapped evidence, the lesson flags it

**Priority**: P0 | **Dependencies**: None

---

### US-002: Generate Adversarial Personas and Edge-Case Users

**As a** learner,
**I want to** use AI to generate adversarial personas and edge-case users,
**so that** I stress-test discovery beyond my own biases.

**Acceptance Criteria:**
- [ ] AC-001: Lesson provides adversarial persona prompts with explicit constraints to avoid stereotyping
- [ ] AC-002: Lesson covers at least 2 failure modes (stereotyped personas, hallucinated needs)
- [ ] AC-003: Apply exercise asks learner to generate 3 adversarial personas for their capstone
- [ ] AC-004: Error state — If any generated persona contains stereotyping patterns, the lesson includes a correction exercise

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Wizard-of-Oz Piloting of AI Features

**As a** learner,
**I want to** learn Wizard-of-Oz patterns for piloting AI features with real users,
**so that** I validate demand before building the model pipeline.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines at least 3 Wizard-of-Oz patterns appropriate for AI features
- [ ] AC-002: Lesson covers ethical disclosure and consent requirements
- [ ] AC-003: Apply exercise asks learner to design a Wizard-of-Oz pilot for their capstone
- [ ] AC-004: Error state — If the pilot lacks disclosure, the lesson flags it as ethically unsafe

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (Module 4 — new lesson)
- `src/data/lessonEnhancements.js` (tooling lab on AI-assisted research)
- `docs/templates/ai-discovery-prompt-library.md` (new)

---

## Non-Functional Requirements

- **Ethics**: Wizard-of-Oz content must stress disclosure
- **Anti-bias**: Persona prompts must include guardrails against stereotyping
- **Maintainability**: Prompt library must be vendor-agnostic

---

## Risks and Unknowns

- Learners may over-rely on AI for synthesis — lesson must force source-mapped evidence
- Cultural patterns differ by market — Arabic research needs its own variants

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AI-Native User Research
User Stories:      3
Acceptance Tests:  12
Out of Scope:      3 items
Spec Location:     docs/specs/14-ai-native-user-research-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson and prompt library.
