# FinOps & Cost Observability for AI — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 2, Module 7)
- `Micro-Teams_2026__Designing_AI-Native_Software_Orgs_That_Scale.md` (agent budget / kill switch content)

---

## Overview

Module 2 teaches token economics at design time. Module 7 teaches observability. Neither teaches in-production cost attribution, budget alerts, model-tier auto-downgrade under load, cache-hit rate monitoring, or the runaway-agent failure mode that burns thousands of dollars in hours. This spec defines a new lesson in Module 7, a reference attribution schema, and a capstone requirement for cost dashboards.

---

## Actors

- **AI PM Course Learner**: Owns cost SLOs and unit economics post-launch
- **Course Author (Beshoy)**: Maintains lesson placement and templates
- **Course Application**: Renders the lesson and cost dashboard examples

---

## Current State

- Token math is taught in Module 2 but as a design-time concern
- SLOs mentioned in Module 7 do not include cost as a first-class SLO dimension
- No lesson addresses per-user, per-feature, or per-tenant cost attribution
- No template exists for AI FinOps incident handling or runaway-agent mitigation

---

## In Scope

- One new lesson: "AI FinOps: Cost Attribution, Budgets, and Runaway-Agent Defense"
- A reference cost-attribution event schema
- A `docs/templates/ai-finops-playbook.md` template with budget thresholds and kill-switch patterns
- Capstone requirement: cost dashboard per user or per feature

## Out of Scope

- Vendor-specific pricing negotiations (covered in Module 12 vendor strategy)
- FinOps certification content
- Full billing system architecture

---

## User Stories

### US-001: Attribute Cost to Users, Features, and Tenants

**As a** learner,
**I want to** learn how to tag every AI call with user, feature, tenant, and model dimensions,
**so that** I can answer "which user, feature, or tenant is burning our margin."

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines at least 4 required attribution tags per AI call
- [ ] AC-002: Lesson provides a reference event schema in the template
- [ ] AC-003: Apply exercise asks learner to instrument their capstone with attribution tags
- [ ] AC-004: Error state — If learners only tag model and cost, the lesson flags missing user/tenant tags as incomplete

**Priority**: P0 | **Dependencies**: None

---

### US-002: Defend Against Runaway Agents

**As a** learner,
**I want to** learn kill-switch patterns for runaway agents and budget overruns,
**so that** I prevent the "six-hour $10K loop" failure mode.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines at least 3 runaway-agent patterns (unbounded loop, cost amplifier, prompt recursion)
- [ ] AC-002: Lesson provides kill-switch designs at request, session, and tenant level
- [ ] AC-003: Template includes a runaway-agent incident response runbook
- [ ] AC-004: Error state — If the capstone lacks a per-session or per-tenant budget cap, the rubric marks safety as incomplete

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Ship a Cost Dashboard in the Capstone

**As a** learner,
**I want to** include a working cost dashboard in the capstone,
**so that** I demonstrate cost SLO discipline end-to-end.

**Acceptance Criteria:**
- [ ] AC-001: Capstone checklist adds "Per-feature or per-user cost dashboard with trend and alerts"
- [ ] AC-002: Rubric adds a Cost Readiness subscore under Operational Readiness
- [ ] AC-003: Error state — If the dashboard is static or static screenshots only, the rubric marks it insufficient

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (Module 7 — new lesson)
- `src/data/lessonEnhancements.js` (executive note on FinOps leadership)
- `docs/templates/ai-finops-playbook.md` (new)
- `docs/templates/assessment-rubric-operations.md` (cost readiness subscore)

---

## Non-Functional Requirements

- **Pedagogical coherence**: Must not duplicate Module 2's design-time cost modeling
- **Operational realism**: Examples must reflect real unit economics, not round numbers
- **Maintainability**: Lesson must use neutral pricing placeholders, not vendor price lists

---

## Risks and Unknowns

- Cost numbers change frequently — lesson must reference `liveBaseline` data rather than inline constants
- Overlap with Module 12 vendor-risk lesson — clarify that FinOps is operational, vendor risk is strategic

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           FinOps & Cost Observability for AI
User Stories:      3
Acceptance Tests:  11
Out of Scope:      3 items
Spec Location:     docs/specs/04-finops-cost-observability-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson object and template skeleton.
