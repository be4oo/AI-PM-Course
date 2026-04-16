# Regulatory Readiness — EU AI Act, NIST AI RMF, ISO 42001 — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 9 GTM, Ethics & AI Leadership)
- `docs/templates/responsible-ai-audit-template.md`

---

## Overview

Module 9 covers "ethics" abstractly. It should teach the concrete compliance regime every AI PM at a B2B company is being pulled into now: EU AI Act risk tiers, what "high-risk AI" triggers, NIST AI RMF's four functions (Govern, Map, Measure, Manage), ISO 42001 certification, CE-marking implications. This spec adds a Module 9 lesson and a regulatory readiness checklist.

---

## Actors

- **AI PM Course Learner**: Navigates AI regulation at work
- **Course Author (Beshoy)**: Maintains lesson and checklist
- **Course Application**: Renders the lesson and links the checklist

---

## Current State

- Module 9 covers ethics and responsible AI abstractly
- No lesson covers EU AI Act risk tiers, NIST AI RMF, or ISO 42001
- No checklist exists to map a product to applicable regulation
- Learners shipping to EU or regulated verticals cannot use the course to navigate compliance questions

---

## In Scope

- One new lesson in Module 9: "Regulatory Readiness for AI Products"
- A `docs/templates/regulatory-readiness-checklist.md` template
- Tiered coverage of EU AI Act risk categories (unacceptable, high, limited, minimal)
- NIST AI RMF four-function summary
- ISO 42001 certification overview

## Out of Scope

- Legal advice or regulatory representation
- Full EU AI Act article-by-article coverage
- Certification issuance

---

## User Stories

### US-001: Map a Product to EU AI Act Risk Tiers

**As a** learner,
**I want to** learn how to classify my product against EU AI Act risk tiers,
**so that** I can anticipate compliance obligations.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines each of the four risk tiers with examples
- [ ] AC-002: Lesson includes a decision tree for tier classification
- [ ] AC-003: Apply exercise asks learner to classify their capstone against the tiers
- [ ] AC-004: Error state — If the learner's classification contradicts clear tier triggers, the lesson flags it

**Priority**: P0 | **Dependencies**: None

---

### US-002: Apply NIST AI RMF's Four Functions

**As a** learner,
**I want to** learn how to apply NIST AI RMF's four functions (Govern, Map, Measure, Manage) to my product,
**so that** I can structure risk management against a recognized framework.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines each function with concrete activities and artifacts
- [ ] AC-002: Lesson maps existing course outputs (evals, PRDs, audits) to the four functions
- [ ] AC-003: Apply exercise asks learner to fill a NIST AI RMF one-pager for their capstone
- [ ] AC-004: Error state — If the learner's mapping leaves functions empty, the lesson flags it

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Regulatory Readiness Checklist

**As a** learner,
**I want to** use a regulatory readiness checklist,
**so that** I do not miss common obligations (documentation, transparency, data governance, post-market monitoring).

**Acceptance Criteria:**
- [ ] AC-001: Template exists with sections for EU AI Act, NIST AI RMF, ISO 42001, and sector-specific rules
- [ ] AC-002: Checklist ties each item to concrete evidence (link, artifact, signed-off owner)
- [ ] AC-003: Error state — If required evidence fields are empty, the checklist marks readiness incomplete

**Priority**: P1 | **Dependencies**: US-001, US-002

---

## Affected Files

- `src/data/curriculum.js` (Module 9 — new lesson)
- `src/data/lessonEnhancements.js` (executive note on regulatory leadership)
- `docs/templates/regulatory-readiness-checklist.md` (new)
- `docs/templates/responsible-ai-audit-template.md` (cross-reference regulatory fields)

---

## Non-Functional Requirements

- **Educational framing**: Must repeat clearly that the content is not legal advice
- **Freshness**: Regulation evolves — require quarterly `lastVerified` review
- **Maintainability**: No vendor-specific legal content

---

## Risks and Unknowns

- Regulation changes mid-year can invalidate examples — lesson must prefer durable structure over transient detail
- Non-EU learners may skip — persona paths can surface relevance

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Regulatory Readiness — EU AI Act, NIST AI RMF, ISO 42001
User Stories:      3
Acceptance Tests:  11
Out of Scope:      3 items
Spec Location:     docs/specs/19-regulatory-readiness-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson body and checklist structure.
