# AI Product Strategy Game — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js` (all modules as scenario source material)
- `docs/templates/assessment-rubric-operations.md`

---

## Overview

The course teaches frameworks well but never forces learners to make sequenced decisions under pressure. This spec defines an interactive decision simulator. Learners receive branching scenarios (e.g., "A competitor just released AI agents replacing 700 support reps — 2 weeks to respond, here is your stack, budget, and team"), make sequenced decisions, see outcome branches, and get scored on decision quality separately from outcome quality — the key distinction the rest of the course depends on.

---

## Actors

- **AI PM Course Learner**: Plays through scenarios during or after coursework
- **Course Author (Beshoy)**: Authors and maintains scenarios
- **Course Application**: Renders scenarios, evaluates decisions, persists results

---

## Current State

- The course has no decision simulator
- Apply exercises are single-shot artifacts, not sequenced decisions
- No scoring separates decision quality from outcome quality
- There is no practice environment that compresses weeks of reasoning into minutes

---

## In Scope

- A scenarios data file `src/data/scenarios.js` with 4–6 scenarios at course launch
- A scenario player UI that branches on learner decisions
- A scoring rubric that distinguishes decision quality from outcome quality
- A scenario authoring format for future additions

## Out of Scope

- Real-time multiplayer play
- Procedurally generated scenarios
- Voice or video scenario delivery

---

## User Stories

### US-001: Play Through a Branching Scenario

**As a** learner,
**I want to** play through a branching decision scenario,
**so that** I practice AI PM judgment under pressure.

**Acceptance Criteria:**
- [ ] AC-001: At least 4 scenarios are shipped at launch
- [ ] AC-002: Each scenario has 3+ decision points with branches and realistic consequences
- [ ] AC-003: Each decision shows trade-offs before the learner commits
- [ ] AC-004: Error state — If a scenario branch dead-ends, the player offers a recovery path rather than halting

**Priority**: P0 | **Dependencies**: None

---

### US-002: Separate Decision Quality from Outcome Quality

**As a** learner,
**I want to** be scored on decision quality independently from outcome,
**so that** I internalize the most important AI PM skill: good decisions under uncertainty.

**Acceptance Criteria:**
- [ ] AC-001: Each scenario scores at least two dimensions: decision quality and outcome quality
- [ ] AC-002: Scoring rubric references existing course frameworks (3P, HITL levels, guardrails)
- [ ] AC-003: Final debrief explicitly notes when good decisions led to bad outcomes and vice versa
- [ ] AC-004: Error state — If scoring only shows outcomes, the player flags the distinction as missing

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Scenario Authoring Format

**As a** course author,
**I want to** add new scenarios in a structured format,
**so that** the anthology grows without code changes.

**Acceptance Criteria:**
- [ ] AC-001: Scenario schema is documented and versioned
- [ ] AC-002: A sample scenario is provided as reference
- [ ] AC-003: Error state — If a scenario violates the schema, it is excluded from the player with a clear error

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/scenarios.js` (new)
- `src/components/ScenarioPlayer.jsx` (new)
- `src/components/ScenarioDebrief.jsx` (new)
- `src/App.jsx` (new entry point in header)
- `docs/authoring/scenario-authoring-guide.md` (new)

---

## Non-Functional Requirements

- **Performance**: Scenario rendering must be instant on decision input
- **Persistence**: Play history must be stored locally and exportable
- **Accessibility**: Player must support keyboard navigation end-to-end

---

## Risks and Unknowns

- Scenario realism depends on source research and peer review
- Risk of over-gamification undermining the course's rigor — tie debrief to real frameworks

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AI Product Strategy Game
User Stories:      3
Acceptance Tests:  10
Out of Scope:      3 items
Spec Location:     docs/specs/16-ai-product-strategy-game-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to scaffold the player component, schema, and initial scenario set.
