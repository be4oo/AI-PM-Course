# Micro-Teams 2026 Integration into Module 12 — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `Micro-Teams_2026__Designing_AI-Native_Software_Orgs_That_Scale.md`
- `src/data/curriculum.js` (Module 12 Executive AI Leadership)

---

## Overview

The project contains a full research doc on AI-native org design — micro-team topologies, new roles (orchestrator, agent wrangler, gatekeeper), a 90-day pilot playbook, DORA baselines, and risk register. Module 12 does not reference it. This is an unused high-leverage asset. This spec wires the doc into Module 12 as supplementary reading with a graded analysis exercise, and surfaces the 90-day pilot as a capstone add-on for executive-track learners.

---

## Actors

- **Executive-Track Learner**: Needs org-design content for AI-native teams
- **Course Author (Beshoy)**: Maintains integration and keeps the doc freshness-tracked
- **Course Application**: Renders the reading and exercises

---

## Current State

- The research doc lives under `/mnt/project/` but is not wired into any lesson
- Module 12 lessons cover DORA baselines, org design, vendor switching, and exec reporting — partially overlapping with the research doc but without using it
- No graded exercise uses the doc
- No capstone add-on uses the 90-day pilot playbook

---

## In Scope

- Add the research doc to `docs/reading/micro-teams-2026.md`
- Extend one or two Module 12 lessons to reference the reading
- Add a graded analysis Apply exercise that uses the doc
- Add an optional capstone add-on: "90-Day Micro-Team Pilot Plan"

## Out of Scope

- Creating a new module
- Changing existing Module 12 lesson IDs
- Editorializing the research doc beyond minor headers

---

## User Stories

### US-001: Wire the Research Doc Into Module 12

**As an** executive-track learner,
**I want to** find the Micro-Teams 2026 doc as curated supplementary reading,
**so that** I can study current org-design patterns without leaving the course.

**Acceptance Criteria:**
- [ ] AC-001: The doc is added to `docs/reading/micro-teams-2026.md`
- [ ] AC-002: Module 12 Org Design lesson links the reading
- [ ] AC-003: The reading renders with a `lastVerified` field for freshness tracking
- [ ] AC-004: Error state — If the reading is removed, the linked lesson renders a graceful placeholder

**Priority**: P0 | **Dependencies**: None

---

### US-002: Graded Analysis Exercise

**As a** learner,
**I want to** analyze the research doc against my own org or a target org,
**so that** I can internalize org-design trade-offs rather than skim the reading.

**Acceptance Criteria:**
- [ ] AC-001: Apply exercise asks learner to pick one pattern (micro-team, single-orchestrator, agency-as-a-service) and fit it to their org
- [ ] AC-002: Exercise rubric evaluates pattern fit, risk awareness, DORA-baseline readiness, and 90-day plan feasibility
- [ ] AC-003: Error state — If the learner's fit ignores stated constraints in the reading, the rubric flags it as uncalibrated

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Optional Capstone Add-On — 90-Day Pilot Plan

**As an** executive-track learner,
**I want to** add a 90-day pilot plan as a capstone deliverable,
**so that** my capstone includes an executive-grade org-design artifact.

**Acceptance Criteria:**
- [ ] AC-001: The capstone checklist surfaces the 90-day pilot as an optional deliverable for executive-track learners
- [ ] AC-002: A dedicated template exists at `docs/templates/90-day-micro-team-pilot.md`
- [ ] AC-003: Error state — If the pilot plan lacks DORA baseline entry and kill criteria, the rubric marks it incomplete

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `docs/reading/micro-teams-2026.md` (new — copy of the research doc with freshness metadata)
- `docs/templates/90-day-micro-team-pilot.md` (new)
- `src/data/curriculum.js` (Module 12 — extend lessons)
- `src/data/lessonEnhancements.js` (exec-track reading enhancement)

---

## Non-Functional Requirements

- **Source fidelity**: The reading must preserve source citations from the original doc
- **Freshness**: Must be reviewed quarterly
- **Executive tone**: Apply exercises should use executive framing

---

## Risks and Unknowns

- Research doc cites 2025–2026 stats that will age quickly — require freshness tracking
- Micro-team claims are based on self-reported startup data — caveat in the reading header

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Micro-Teams 2026 Integration into Module 12
User Stories:      3
Acceptance Tests:  10
Out of Scope:      3 items
Spec Location:     docs/specs/15-micro-teams-integration-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to wire the reading, extend the lessons, and draft the pilot template.
