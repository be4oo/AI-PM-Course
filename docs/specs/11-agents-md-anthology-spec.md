# AGENTS.md Anthology & Annotated Examples — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 7 AGENTS.md lesson)
- `Micro-Teams_2026__Designing_AI-Native_Software_Orgs_That_Scale.md`

---

## Overview

Module 7 has an AGENTS.md authoring lesson, but a template alone is 30% of the value. Pattern recognition beats templates. This spec defines an anthology of three anonymized, real-world AGENTS.md files (startup, YC, enterprise-guardrailed) with per-section annotations describing what each section defends against.

---

## Actors

- **AI PM Course Learner**: Needs exemplars for repo-governed safety
- **Course Author (Beshoy)**: Curates and annotates the anthology
- **Course Application**: Renders anthology entries as structured viewable examples

---

## Current State

- Module 7 lesson provides a generic template approach
- No annotated examples exist in the repo
- Learners have no reference for what separates a strong AGENTS.md from a weak one
- No pattern-recognition exercise exists

---

## In Scope

- Three annotated AGENTS.md examples (startup, YC-scale, enterprise-guardrailed)
- An annotation convention: inline comments or sidebar explanations per section
- A compare-and-contrast lesson addition in Module 7
- A short pattern-spot Apply exercise

## Out of Scope

- Publishing real proprietary AGENTS.md files from named companies
- AGENTS.md tooling or validators beyond the existing lesson
- Full policy-as-code coursework

---

## User Stories

### US-001: Anthology of Three Annotated AGENTS.md Files

**As a** learner,
**I want to** study three annotated AGENTS.md examples at different org scales,
**so that** I recognize patterns rather than copy a single template.

**Acceptance Criteria:**
- [ ] AC-001: Anthology contains three distinct AGENTS.md files at startup, YC-scale, and enterprise scale
- [ ] AC-002: Each file has per-section annotations explaining the defended failure mode
- [ ] AC-003: Each file is cleanly anonymized (no real company names or secrets)
- [ ] AC-004: Error state — If an example lacks annotations, it is marked as incomplete and not rendered

**Priority**: P0 | **Dependencies**: None

---

### US-002: Pattern-Spot Apply Exercise

**As a** learner,
**I want to** practice identifying strong vs. weak AGENTS.md patterns,
**so that** I develop judgment rather than copy a template.

**Acceptance Criteria:**
- [ ] AC-001: Apply exercise presents a deliberately weak AGENTS.md and asks learners to identify 5 gaps
- [ ] AC-002: Exercise provides a reference answer set for self-check
- [ ] AC-003: Error state — If the learner's gaps list is empty or off-topic, the exercise offers a hint set

**Priority**: P1 | **Dependencies**: US-001

---

### US-003: Compare-and-Contrast Rendering in the Lesson

**As a** learner,
**I want to** view the three anthology entries side-by-side with annotations,
**so that** differences in scale and risk posture are visible at a glance.

**Acceptance Criteria:**
- [ ] AC-001: The Module 7 lesson renders a comparison table of the three entries
- [ ] AC-002: Comparison highlights risk posture, autonomy level, kill-switch strategy, and merge cap
- [ ] AC-003: Error state — If one anthology entry is missing, the comparison table renders a graceful placeholder

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `docs/examples/agents-md/startup.md` (new)
- `docs/examples/agents-md/yc-scale.md` (new)
- `docs/examples/agents-md/enterprise.md` (new)
- `docs/examples/agents-md/README.md` (anthology index)
- `src/data/curriculum.js` (Module 7 — extend lesson content with anthology links)
- `src/data/lessonEnhancements.js` (deep-mode lab referencing the anthology)

---

## Non-Functional Requirements

- **Anonymization**: No real company identifiers
- **Realism**: Each file must be plausible at its stated scale
- **Maintainability**: Each file must be freshness-tracked

---

## Risks and Unknowns

- Synthetic examples may feel sanitized — base them on publicly available patterns to keep realism
- Must not disclose any real-world proprietary agent configurations

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AGENTS.md Anthology & Annotated Examples
User Stories:      3
Acceptance Tests:  10
Out of Scope:      3 items
Spec Location:     docs/specs/11-agents-md-anthology-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to produce the three anthology drafts and the lesson integration.
