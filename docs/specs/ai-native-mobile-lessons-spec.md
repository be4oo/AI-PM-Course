# AI-Native Mobile Curriculum Expansion — Executable Specification

**Version**: 1.0.0  
**Created**: 2026-04-16  
**Status**: ✅ Implemented  
**Source Inputs**:
- `docs/Building a Production-Grade AI-Native Mobile Micro‑Team That Ships Safely at Speed.md`
- `docs/AI-project-management-curriculum-new-lessons.md`
- `src/data/curriculum.js`
- `src/data/lessonEnhancements.js`

---

## Overview

The AI PM Course currently delivers a strong AI product management spine across strategy, model systems, context engineering, discovery, trust design, build/eval loops, production governance, agents, GTM, capstone, Arabic systems, and executive leadership.

This specification defines how to incorporate 24 new lesson concepts derived from the AI-native mobile micro-team operating model without disrupting the course's core identity as an AI PM curriculum.

The chosen curriculum architecture is a **hybrid model**:
- Embed cross-cutting PM, governance, evaluation, and leadership lessons into existing modules
- Introduce one dedicated mobile specialization module for the deeply mobile-specific execution material

This approach preserves pacing, keeps the main learning arc coherent, and prevents highly specialized Flutter/mobile delivery content from fragmenting the primary course narrative.

---

## Actors

- **AI PM Course Learner**: Wants a coherent learning progression from AI PM foundations to production-grade operating systems
- **Course Author (Beshoy)**: Maintains curriculum structure and decides what belongs in the mainline vs. specialization tracks
- **Course Application**: Renders lesson and enhancement data from `src/data/`

---

## Current State

- The live curriculum is defined in `src/data/curriculum.js`
- Leadership and tooling supplements are defined in `src/data/lessonEnhancements.js`
- The current curriculum contains 12 modules, including a strong PM/governance spine and executive track
- The new lessons currently exist only as a flat research list in `docs/AI-project-management-curriculum-new-lessons.md`
- No learner-facing curriculum structure currently groups those 24 lessons into modules, sequencing, or implementation surfaces

---

## In Scope

- Defining where each of the 24 new lesson concepts belongs in the curriculum
- Specifying which lessons should be embedded into existing modules
- Specifying which lessons require a dedicated specialization module
- Defining acceptance criteria for curriculum placement decisions
- Naming the primary implementation surfaces in the repo

## Out of Scope

- Writing final lesson copy
- Editing `src/data/curriculum.js`
- Editing `src/data/lessonEnhancements.js`
- Creating new React views or navigation components
- Building assessments, quizzes, or visual assets for the new lessons

---

## User Stories

### US-001: Preserve the Core AI PM Spine

**As a** course author,  
**I want to** integrate the new lessons without turning the main curriculum into a fragmented mobile engineering course,  
**so that** the primary learner journey remains focused on AI product management.

**Acceptance Criteria:**
- [ ] AC-001: Cross-cutting PM, governance, evaluation, and leadership topics are mapped into existing modules rather than collected in one isolated appendix
- [ ] AC-002: The main curriculum continues to flow from foundations -> systems -> context -> discovery -> trust -> build/eval -> governance -> GTM -> leadership
- [ ] AC-003: No more than one new specialization module is introduced
- [ ] AC-004: Error state — If more than one new standalone module is required, the placement plan must explicitly justify why the existing module structure cannot absorb the material

**Priority**: P0 | **Dependencies**: None

---

### US-002: Create a Dedicated Home for Mobile-Specific Delivery Content

**As a** course learner pursuing mobile AI execution depth,  
**I want to** find all deeply mobile-specific delivery concepts in one coherent module,  
**so that** I can study the specialization without hunting across unrelated weeks.

**Acceptance Criteria:**
- [ ] AC-001: A dedicated specialization module is defined after Module 8 and before Module 9
- [ ] AC-002: The module has a clear working title: `AI-Native Mobile Delivery Systems`
- [ ] AC-003: The module contains the mobile-specific lessons on design-token context, UI consistency via token injection, Flutter orchestration, Flutter context engineering, mobile multi-agent orchestration, and BLE/IoT HITL mapping
- [ ] AC-004: The specialization module is positioned as advanced material, not as a prerequisite for the whole course
- [ ] AC-005: Error state — If any of the mobile-specialist lessons are scattered into unrelated modules, the plan must identify the learner confusion risk introduced by that split

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Extend Module 2 with Agent-Ready Specification Skills

**As an** AI PM learner,  
**I want to** learn how work is specified for agents before I reach build and production modules,  
**so that** I understand the operating contract between product intent and AI execution.

**Acceptance Criteria:**
- [ ] AC-001: Module 2 is expanded with new lessons covering machine-readable acceptance criteria, AI PRD structure for agent-executed features, and model selection per task type
- [ ] AC-002: These lessons are sequenced after the current Module 2 foundations rather than placed in later modules
- [ ] AC-003: The placement rationale explicitly states that these concepts are execution prerequisites, not post-build governance topics
- [ ] AC-004: Error state — If AI PRD structure or acceptance-criteria design is placed after build/eval modules, the plan must flag this as a sequencing flaw

**Priority**: P0 | **Dependencies**: None

---

### US-004: Extend Module 6 with Operational Build-Loop Controls

**As an** AI PM learner,  
**I want to** learn the operational controls around evaluation and kickoff during the build stage,  
**so that** the build loop feels like a governed delivery system rather than an abstract iteration model.

**Acceptance Criteria:**
- [ ] AC-001: Module 6 is expanded with lessons covering the 5-level validation pyramid, golden datasets/evals for AI features, and Sprint 0 kickoff for AI-native builder lanes
- [ ] AC-002: The placement rationale explicitly ties these lessons to build-loop execution and release readiness
- [ ] AC-003: These lessons are not relocated into strategy or executive modules
- [ ] AC-004: Error state — If the validation pyramid is separated from the build/eval module, the plan must identify the resulting loss of instructional coherence

**Priority**: P1 | **Dependencies**: US-003

---

### US-005: Extend Module 7 with Repository-Governed Safety

**As an** AI PM learner,  
**I want to** understand how production safety is enforced at the repo and release layer,  
**so that** I can operate AI-native teams with explicit controls rather than informal judgment.

**Acceptance Criteria:**
- [ ] AC-001: Module 7 is expanded with lessons covering AGENTS.md authoring, hallucination and drift monitoring with Langfuse, kill-switch design, AI-merge cap enforcement, audit-trail review of AI-generated PRs, and the AI risk register
- [ ] AC-002: The placement rationale explicitly maps these topics to production, security, and governance rather than to discovery or GTM
- [ ] AC-003: The lesson cluster is described as a repo-governed safety system
- [ ] AC-004: Error state — If kill-switches, merge caps, or drift monitoring are placed outside the governance module without justification, the plan must flag this as a governance boundary violation

**Priority**: P0 | **Dependencies**: US-001

---

### US-006: Extend Module 9 with Evidence-Based Launch Control

**As an** AI PM learner,  
**I want to** connect ethics and GTM to concrete launch decisions,  
**so that** I can translate trust and quality evidence into release choices.

**Acceptance Criteria:**
- [ ] AC-001: Module 9 is expanded with lessons covering go/no-go decisions from AI-generated evidence and a responsible AI checklist for consumer electronics
- [ ] AC-002: The placement rationale explicitly connects these lessons to launch readiness, trust, and market-facing accountability
- [ ] AC-003: The responsible AI checklist is not treated as a purely legal appendix
- [ ] AC-004: Error state — If go/no-go decision lessons are placed only in the executive track, the plan must flag the lost connection to GTM and feature launch practice

**Priority**: P1 | **Dependencies**: US-005

---

### US-007: Extend Module 12 with Leadership Operating Models

**As an** executive-track learner,  
**I want to** study AI-native operating metrics and org design in the leadership module,  
**so that** leadership concepts remain clearly separated from day-to-day practitioner execution.

**Acceptance Criteria:**
- [ ] AC-001: Module 12 is expanded with lessons covering DORA baselines before agents, org design for AI-native teams, vendor strategy/model switching, and communicating AI metrics to non-technical leadership
- [ ] AC-002: The placement rationale explicitly states that these are portfolio and leadership controls, not build-loop mechanics
- [ ] AC-003: These lessons remain in the executive track rather than being distributed across lower-level modules
- [ ] AC-004: Error state — If DORA baselines or executive reporting are embedded only in practitioner modules, the plan must identify the resulting leadership visibility gap

**Priority**: P0 | **Dependencies**: US-001

---

### US-008: Define an Explicit Lesson-to-Module Placement Map

**As a** course author,  
**I want to** see a complete mapping from each new lesson to its target module,  
**so that** the implementation phase can update curriculum files without revisiting placement decisions.

**Acceptance Criteria:**
- [ ] AC-001: The spec includes a complete target placement map for all 24 new lesson concepts
- [ ] AC-002: The mapping differentiates embedded lessons from specialization-module lessons
- [ ] AC-003: The mapping names the primary implementation surfaces: `src/data/curriculum.js`, `src/data/lessonEnhancements.js`, and relevant `docs/templates/*` artifacts
- [ ] AC-004: Error state — If any lesson from the research list is not mapped, the spec must mark the placement plan as incomplete

**Priority**: P0 | **Dependencies**: US-002, US-003, US-004, US-005, US-006, US-007

---

## Placement Map

### Embedded into Existing Modules

| Target Module | New Lesson Concepts |
|---|---|
| Module 2 — Model Systems & Token Economics | Lesson 2 — Model selection per task type; Lesson 8 — Machine-readable acceptance criteria; Lesson 10 — AI PRD format for agent-executed features |
| Module 6 — Build, Evaluate & Iterate | Lesson 5 — 5-level validation pyramid; Lesson 18 — Evals and golden datasets for Flutter/features; Lesson 24 — Sprint 0 kickoff for AI-native builder lanes |
| Module 7 — Production, Security & Governance | Lesson 1 — AGENTS.md authoring; Lesson 3 — Hallucination and drift monitoring with Langfuse; Lesson 4 — Kill-switch design per repo; Lesson 6 — AI-merge cap enforcement; Lesson 14 — Reviewing AI-generated PRs via audit trail; Lesson 21 — AI risk register for mobile/product teams |
| Module 9 — GTM, Ethics & AI Leadership | Lesson 9 — Go/no-go decisions from AI-generated evidence; Lesson 22 — Responsible AI checklist for consumer electronics |
| Module 12 — Executive AI Leadership | Lesson 7 — DORA baseline before agents; Lesson 19 — Org design for AI-native teams; Lesson 20 — Vendor strategy and model switching; Lesson 23 — Communicating AI metrics to non-technical leadership |

### Dedicated Specialization Module

| Target Module | New Lesson Concepts |
|---|---|
| Module 8.5 — AI-Native Mobile Delivery Systems | Lesson 11 — Design tokens as agent context; Lesson 12 — UI consistency enforcement via token injection; Lesson 13 — Flutter agent orchestration; Lesson 15 — BLE/IoT HITL mapping; Lesson 16 — Context engineering for Flutter code generation; Lesson 17 — Multi-agent orchestration for mobile development |

---

## Affected Files

- `src/data/curriculum.js`
- `src/data/lessonEnhancements.js`
- `docs/templates/`
- `docs/specs/README.md`

---

## Non-Functional Requirements

- **Pedagogical coherence**: New lessons must preserve a clear beginner-to-advanced progression
- **Curriculum integrity**: Mobile-specialist content must not overwhelm the core AI PM narrative
- **Implementation simplicity**: Placement should be achievable through data-layer changes without requiring React architecture changes
- **Extensibility**: The specialization module should allow future mobile delivery lessons without forcing another curriculum reshuffle

---

## Risks and Unknowns

- Module numbering for an inserted specialization module may require a decision on whether to use `8.5`, `13`, or an alternate labeling convention in the UI
- Some lessons in the research list are worded in mobile/Flutter terms but may need generalized framing if they are embedded into non-mobile modules
- The existing lesson density in `curriculum.js` may require splitting large additions into content vs. enhancement layers

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AI-Native Mobile Curriculum Expansion
User Stories:      8
Acceptance Tests:  32
Out of Scope:      5 items
Spec Location:     docs/specs/ai-native-mobile-lessons-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN

→ Suggest the user run the `/plan` workflow to translate this curriculum placement spec into exact file edits and rollout sequencing.
