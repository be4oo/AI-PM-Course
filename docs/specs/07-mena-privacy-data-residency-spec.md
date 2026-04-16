# MENA Privacy & Data Residency for AI — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 11 Arabic AI Systems, Module 7 Governance)
- `docs/templates/responsible-ai-audit-template.md`

---

## Overview

Module 11 is strong on Arabic tokenization, retrieval, and localization UX. It ignores regional data law: Saudi PDPL, UAE PDPL, Egyptian Data Protection Law 151/2020, cross-border data flow when vendor models route through US/EU, and Arabic-specific PII redaction (tokenizers break on Arabic names). This is existential for MENA-facing AI products. This spec adds a dedicated lesson in Module 11 and a reference compliance checklist.

---

## Actors

- **AI PM Course Learner (MENA-facing)**: Needs to ship AI products that respect regional privacy law
- **Course Author (Beshoy)**: Maintains lesson and template
- **Course Application**: Renders the lesson and links the compliance checklist

---

## Current State

- Module 11 addresses tokenization, retrieval, bilingual UX, but not regional law
- No lesson covers Saudi PDPL, UAE PDPL, or Egyptian DPL 151/2020 implications for AI systems
- No template exists for MENA data-flow mapping or cross-border routing review
- Arabic PII redaction is not addressed

---

## In Scope

- One new lesson in Module 11: "MENA Privacy, Data Residency, and Cross-Border AI Risk"
- A `docs/templates/mena-privacy-compliance-checklist.md` template
- Integration with the responsible AI audit template (add MENA jurisdiction fields)
- Arabic-PII redaction patterns (names, addresses, national ID formats)

## Out of Scope

- Legal advice or certification
- Full GDPR content (outside the MENA focus, covered in separate regulatory spec)
- Country-by-country legal deep dives beyond Saudi/UAE/Egypt

---

## User Stories

### US-001: Map AI Data Flows Against MENA Privacy Law

**As a** MENA-facing learner,
**I want to** learn how to map AI data flows against Saudi PDPL, UAE PDPL, and Egyptian DPL,
**so that** I can identify cross-border risks before launch.

**Acceptance Criteria:**
- [ ] AC-001: Lesson summarizes the applicable clauses for AI systems in at least 3 MENA jurisdictions
- [ ] AC-002: Lesson provides a data-flow mapping template
- [ ] AC-003: Apply exercise asks learner to map their capstone's data flows and flag cross-border risks
- [ ] AC-004: Error state — If the learner's mapping ignores third-party model provider routing, the lesson flags it

**Priority**: P0 | **Dependencies**: None

---

### US-002: Arabic PII Redaction Patterns

**As a** learner,
**I want to** implement Arabic-aware PII redaction,
**so that** standard English tokenizers don't leak Arabic names, IDs, and addresses.

**Acceptance Criteria:**
- [ ] AC-001: Lesson covers at least 4 Arabic PII patterns (names, national ID formats, Arabic addresses, phone formats)
- [ ] AC-002: Lesson includes a reference redaction routine appropriate for Arabic text
- [ ] AC-003: Apply exercise asks learner to test redaction against an Arabic PII corpus
- [ ] AC-004: Error state — If the learner uses an English-only redaction library, the lesson flags failure cases

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: MENA Compliance Checklist as a Gate Artifact

**As a** learner,
**I want to** use a standardized MENA compliance checklist,
**so that** MENA deployment readiness is evidence-gated.

**Acceptance Criteria:**
- [ ] AC-001: Template exists at `docs/templates/mena-privacy-compliance-checklist.md`
- [ ] AC-002: Template covers: data residency, consent, cross-border transfer, retention, Arabic PII handling, breach notification
- [ ] AC-003: Responsible AI audit template references MENA fields where relevant
- [ ] AC-004: Error state — If required fields are blank, the checklist is marked incomplete

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (Module 11 — new lesson)
- `src/data/lessonEnhancements.js` (leadership note on regulatory leadership in MENA)
- `docs/templates/mena-privacy-compliance-checklist.md` (new)
- `docs/templates/responsible-ai-audit-template.md` (update with MENA fields)

---

## Non-Functional Requirements

- **Legal correctness caveat**: Lesson must state it is educational, not legal advice
- **Locality**: Examples should favor realistic MENA product scenarios
- **Maintainability**: Jurisdictional summaries must include `lastVerified` dates

---

## Risks and Unknowns

- Regional law evolves faster than course content — require freshness score on this lesson
- Some learners outside MENA may skip — surface relevance in onboarding personas

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           MENA Privacy & Data Residency for AI
User Stories:      3
Acceptance Tests:  12
Out of Scope:      3 items
Spec Location:     docs/specs/07-mena-privacy-data-residency-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson body and checklist template.
