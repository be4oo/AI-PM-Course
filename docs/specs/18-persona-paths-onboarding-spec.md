# Persona Paths Onboarding — Executable Specification

**Version**: 1.0.0
**Created**: 2026-04-16
**Status**: 📝 Draft
**Source Inputs**:
- `src/data/curriculum.js`
- `src/App.jsx` (progress and navigation)
- `Finding_the_right_online_course_for_your_career`

---

## Overview

The course is laser-focused on AI PMs. The target audience also includes engineering leads, founders, and domain experts. This spec adds a persona-path onboarding step at first launch and a path selector in settings. Same modules, different ordering, different lesson emphasis, different persona-specific callouts. Doubles addressable audience with low content cost.

---

## Actors

- **New Learner**: Picks a persona on first launch
- **Returning Learner**: Changes persona from settings
- **Course Author (Beshoy)**: Maintains persona definitions and emphasis overrides
- **Course Application**: Applies persona weighting to lesson ordering, callouts, and enhancements

---

## Current State

- Curriculum is delivered in a fixed order for everyone
- Leadership/deep/fast modes exist, but they do not restructure the learning path by role
- No onboarding asks the learner who they are
- Marketing implies one audience (PM) while the content serves several

---

## In Scope

- A persona picker on first launch with 4 personas (PM, Eng Lead, Founder, Domain Expert)
- A persona-path configuration file that maps persona to lesson emphasis, recommended order, and callouts
- A settings UI to change persona later
- Persona-specific enhancement injection via the existing `lessonEnhancements.js` pattern

## Out of Scope

- Creating new lessons per persona (emphasis only, same content)
- Hiding or gating lessons by persona
- Paid tiers per persona

---

## User Stories

### US-001: Pick a Persona on First Launch

**As a** new learner,
**I want to** pick a persona on first launch,
**so that** the course calibrates to my role without extra configuration.

**Acceptance Criteria:**
- [ ] AC-001: A one-screen picker presents 4 personas with short descriptions
- [ ] AC-002: The selection persists locally
- [ ] AC-003: Default persona is PM if no selection is made within 30 seconds
- [ ] AC-004: Error state — If persistence fails, the picker is re-shown on next launch

**Priority**: P0 | **Dependencies**: None

---

### US-002: Apply Persona Emphasis Across the Curriculum

**As a** learner,
**I want to** see my persona's emphasis reflected in lesson order and callouts,
**so that** the course feels built for my role.

**Acceptance Criteria:**
- [ ] AC-001: Persona configuration maps each persona to a recommended lesson sequence and a set of emphasis hints
- [ ] AC-002: Lesson callouts render persona-specific notes when present
- [ ] AC-003: Error state — If persona is unrecognized, the UI falls back to the default PM path

**Priority**: P0 | **Dependencies**: US-001

---

### US-003: Change Persona From Settings

**As a** returning learner,
**I want to** change my persona from settings,
**so that** I can explore a different path without resetting progress.

**Acceptance Criteria:**
- [ ] AC-001: Settings expose a persona selector
- [ ] AC-002: Changing persona does not reset progress or bookmarks
- [ ] AC-003: Error state — If progress conflicts with the new persona path, the UI offers a guided reconciliation rather than overwriting progress

**Priority**: P1 | **Dependencies**: US-001

---

## Affected Files

- `src/data/personas.js` (new)
- `src/components/PersonaPicker.jsx` (new)
- `src/App.jsx` (first-run logic, settings panel)
- `src/data/lessonEnhancements.js` (persona-specific enhancement keys)

---

## Non-Functional Requirements

- **No content duplication**: Persona differences are emphasis-only
- **Reversible**: Switching personas must not corrupt state
- **Backward compatibility**: Existing learners without persona default to PM

---

## Risks and Unknowns

- Persona weights can fragment if not centralized — keep them in one file
- Risk of learners feeling constrained — always allow browsing outside the recommended order

---

## Completion Report

```markdown
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Persona Paths Onboarding
User Stories:      3
Acceptance Tests:  10
Out of Scope:      3 items
Spec Location:     docs/specs/18-persona-paths-onboarding-spec.md
Status:            ✅ Ready for the /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN
→ Run `/plan` to draft the persona config and picker UI.
