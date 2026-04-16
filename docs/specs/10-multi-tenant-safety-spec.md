# Multi-Tenant Safety for AI Systems — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (Module 7, Module 8, Module 8.5)
- `docs/templates/responsible-ai-audit-template.md`

---

## Overview

The course covers guardrails and prompt injection, but not cross-tenant leakage: embeddings from tenant A surfacing for tenant B, context contamination in agent memory, tenant-scoped eval suites. This is critical for B2B SaaS AI PMs. This spec adds a Module 7 lesson and a multi-tenant safety audit template.

---

## Actors

- **AI PM Course Learner (B2B)**: Ships AI features to multiple tenants with isolation requirements
- **Course Author (Beshoy)**: Maintains lesson and template
- **Course Application**: Renders the lesson and links the audit template

---

## Current State

- Guardrail types are taught (input/output/tool/approval) but without tenant scoping
- Agent memory is introduced in Module 8 without isolation patterns
- RAG is taught without tenant-partitioning guidance
- No template covers tenant-scoped eval or cross-tenant leakage testing

---

## In Scope

- One new lesson in Module 7: "Multi-Tenant Safety for AI Systems"
- A `docs/templates/multi-tenant-safety-audit.md` template
- Reference patterns for tenant-scoped retrieval, memory isolation, and eval suites
- A capstone optional add-on: multi-tenant scenario

## Out of Scope

- Full B2B SaaS architecture coursework
- Identity and access management beyond tenant-scoping for AI features
- Vendor-specific RAG product tutorials

---

## User Stories

### US-001: Prevent Cross-Tenant Leakage in RAG

**As a** B2B learner,
**I want to** learn patterns that prevent cross-tenant leakage in retrieval,
**so that** tenant A's data cannot surface for tenant B.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines at least 3 tenant-scoping patterns for vector stores (namespace, metadata filter, per-tenant index)
- [ ] AC-002: Lesson provides a failure-mode test plan that intentionally attempts cross-tenant queries
- [ ] AC-003: Apply exercise asks learner to design tenant-scoped retrieval for their capstone (or a multi-tenant variant)
- [ ] AC-004: Error state — If retrieval uses a single shared index without filters, the lesson flags it as unsafe for multi-tenant

**Priority**: P0 | **Dependencies**: None

---

### US-002: Isolate Agent Memory Per Tenant

**As a** learner,
**I want to** learn memory-isolation patterns for agents serving multiple tenants,
**so that** one tenant's conversation state cannot pollute another.

**Acceptance Criteria:**
- [ ] AC-001: Lesson covers at least 3 memory-isolation patterns (per-tenant stores, hashed keys, TTL-based scoping)
- [ ] AC-002: Lesson includes at least 2 failure modes (session collision, long-term memory bleed)
- [ ] AC-003: Apply exercise asks learner to produce a memory-isolation spec
- [ ] AC-004: Error state — If learners propose a global memory store, the lesson flags it as multi-tenant unsafe

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Tenant-Scoped Evals and Audits

**As a** learner,
**I want to** run evals per tenant and audit cross-tenant leakage,
**so that** safety is measured, not assumed.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines per-tenant eval shards and cross-tenant leakage tests
- [ ] AC-002: Template includes an audit checklist with required test cases
- [ ] AC-003: Error state — If audits only measure aggregate pass rate, the template flags tenant-level coverage as missing

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/curriculum.js` (Module 7 — new lesson)
- `src/data/lessonEnhancements.js` (leadership note on B2B trust)
- `docs/templates/multi-tenant-safety-audit.md` (new)

---

## Non-Functional Requirements

- **Pedagogical coherence**: Must sit alongside guardrails lesson in Module 7
- **Realism**: Must show concrete isolation failures learners can replicate
- **Maintainability**: Must not hard-code a specific vector store vendor

---

## Risks and Unknowns

- Some learners won't be B2B — surface relevance in the persona-path onboarding
- Simulating leakage safely requires careful example construction

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Multi-Tenant Safety for AI Systems
User Stories:      3
Acceptance Tests:  11
Out of Scope:      3 items
Spec Location:     docs/specs/10-multi-tenant-safety-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the lesson and audit template.
