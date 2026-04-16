# AI Product Failure Anthology — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 9 GTM & Ethics)

---

## Overview

Every credible PM course includes a disaster anthology. This spec introduces a curated set of well-documented AI product failures (Air Canada chatbot hallucination, Samsung ChatGPT leak, Zillow Offers ML pricing collapse, iTutor discrimination suit, DoNotPay FTC settlement, Klarna walk-back) and teaches each as a case study with: failure description, which framework would have prevented it, debrief exercise.

---

## Actors

- **AI PM Course Learner**: Builds failure-mode pattern recognition
- **Course Author (Beshoy)**: Curates cases and keeps them freshness-tracked
- **Course Application**: Renders cases with debrief exercises

---

## Current State

- Module 9 mentions ethics and responsible AI but does not anthologize concrete failures
- No structured case-study data format exists
- No debrief template exists for learner-led failure analysis
- The course lacks the "disaster learning" element that accelerates pattern recognition

---

## In Scope

- At least 6 failure cases added as structured data under `src/data/failureCases.js`
- A new Module 9 lesson titled "AI Product Failure Anthology"
- A `docs/templates/failure-debrief-template.md` for learner submissions
- Mapping each case to the existing course frameworks that would have prevented it

## Out of Scope

- Publishing defamatory or legally risky commentary
- Deep investigation of ongoing lawsuits
- Real-time breaking news incidents (freshness-maintained but not breaking)

---

## User Stories

### US-001: Curated Anthology of AI Failures

**As a** learner,
**I want to** study a curated anthology of documented AI failures,
**so that** I can pattern-match risk early in my own features.

**Acceptance Criteria:**
- [ ] AC-001: At least 6 failure cases are shipped with verified public sources
- [ ] AC-002: Each case states: context, failure, harm, frameworks that would have caught it, and debrief question
- [ ] AC-003: Each case has a `lastVerified` field
- [ ] AC-004: Error state — Any case without verified sources is gated out of the anthology

**Priority**: P0 | **Dependencies**: None

---

### US-002: Failure Debrief Exercise

**As a** learner,
**I want to** practice debriefing failures using course frameworks,
**so that** I rehearse the reasoning path a senior AI PM uses in a post-mortem.

**Acceptance Criteria:**
- [ ] AC-001: Debrief template includes: timeline, decisions, framework-by-framework review, counterfactual design
- [ ] AC-002: Apply exercise asks learner to debrief one case and draft a counterfactual PRD
- [ ] AC-003: Error state — If the learner's debrief references no course frameworks, the exercise flags it as off-target

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Map Failures to Existing Course Frameworks

**As a** learner,
**I want to** see which frameworks (5-A, 3P, HITL, guardrails, evals) would have caught each failure,
**so that** I understand frameworks as active defenses, not abstractions.

**Acceptance Criteria:**
- [ ] AC-001: Each case includes a mapping table of applicable frameworks
- [ ] AC-002: At least 3 distinct frameworks are referenced across the anthology
- [ ] AC-003: Error state — If a case references no framework, the mapping is flagged as incomplete

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/failureCases.js` (new)
- `src/data/curriculum.js` (Module 9 — new lesson)
- `src/components/FailureCaseView.jsx` (new)
- `docs/templates/failure-debrief-template.md` (new)

---

## Non-Functional Requirements

- **Legal risk**: Cases must rely on publicly documented facts; avoid opinion-forward language
- **Freshness**: Cases must carry `lastVerified` dates and source URLs
- **Anonymization**: Use public disputes; avoid private unverified claims

---

## Risks and Unknowns

- Case status may change (settlements, reversals) — require quarterly review
- Framing must stay educational, not accusatory

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AI Product Failure Anthology
User Stories:      3
Acceptance Tests:  10
Out of Scope:      3 items
Spec Location:     docs/specs/12-ai-failure-anthology-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the initial 6 cases with sources and framework mappings.
