# AI-Native Mobile Curriculum Expansion — Implementation Plan

**Spec**: [../specs/ai-native-mobile-lessons-spec.md](../specs/ai-native-mobile-lessons-spec.md)  
**Version**: 1.0.0  
**Created**: 2026-04-16  
**Status**: ✅ PLAN_GATE PASSED — Ready for `/tasks`

---

## Pre-Flight Findings

### Real Curriculum Architecture

The live course structure is defined in [src/data/curriculum.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/curriculum.js), where each module is an object with:

```js
{
  id: 8,
  week: "WEEK 8",
  module: "MODULE 8",
  title: "Agents, Voice & Multimodal",
  tag: "Advanced",
  accent: "#00C8FF",
  lessons: [
    {
      id: "8.1",
      title: "...",
      type: "concept" | "technical" | "framework" | "systems" | ...,
      content: `...`,
      quiz: { q: "...", a: "..." },
      apply: `...`,
      keys: ["...", "...", "..."],
      meta: { ...optional }
    }
  ]
}
```

This means the curriculum expansion is primarily a **data-layer change**, not a component or route architecture change.

### Real Enhancement Layer

[src/data/lessonEnhancements.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/lessonEnhancements.js) provides optional:

- `leadershipNote`
- `toolingLab`

These are keyed by `lesson.id` and merged into the lesson frame in [src/App.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/App.jsx).

This gives us two implementation layers:

1. `curriculum.js` for the primary lesson body and module topology
2. `lessonEnhancements.js` for leadership-mode and deep-mode supplements

### UI Constraints Confirmed

The application does **not** hardcode a 12-module limit:

- `curriculum.length` is used dynamically in [src/App.jsx](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/App.jsx)
- navigation uses the array index (`activeMod`) rather than specific module IDs
- progress, review, and sidebar rendering derive from the current `curriculum` array

This means adding one new module is feasible without React component changes.

### Real Risks

The key technical risk is **labeling and identity**, not rendering:

- bookmarks use `${mod.id}-${lesson.id}`
- review systems key off `module.id`
- lesson metadata derives artifact paths from `lesson.id`

So the inserted specialization module needs a stable module `id`, `module` label, `week` label, and lesson numbering scheme.

### Existing Plan Precedent

The repo already uses doc-driven planning in [docs/plans/google-pm-enrichment-plan.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/plans/google-pm-enrichment-plan.md), which confirms that the expected implementation pattern is:

- inspect actual data structures first
- avoid schema invention
- batch edits by lesson or module
- keep UI changes out unless the data model truly requires them

---

## Architecture Decision

**Chosen approach**: Implement the curriculum expansion as a **hybrid data-layer rollout** with one inserted specialization module and targeted enrichments to existing modules.

1. **`src/data/curriculum.js`**
   - Add new lessons to existing modules 2, 6, 7, 9, and 12
   - Insert one new module after Module 8 for the mobile specialization
   - Keep core learner-facing structure in the curriculum data only

2. **`src/data/lessonEnhancements.js`**
   - Add `leadershipNote` and `toolingLab` support for newly created or expanded lessons where executive/deep mode benefits from it

3. **`docs/templates/`**
   - Add or extend reusable artifacts only where a lesson explicitly requires a template-backed output

No React component changes are required unless the implementation phase uncovers a UI copy issue around module labels.

---

## ADRs

### ADR-001: Insert a New Specialization Module vs. Scatter Mobile Content

**Context**: The spec requires preserving the AI PM spine while also giving mobile-specific AI delivery content a coherent home.

**Options Considered**:
- Option A: Scatter all mobile delivery lessons across existing modules
- Option B: Add one dedicated specialization module after Module 8
- Option C: Push all mobile content into executive or capstone modules

**Decision**: Option B — add one dedicated specialization module after Module 8.

**Consequences**:
- The main curriculum remains PM-first
- Mobile/Flutter execution depth becomes easier to navigate
- We introduce one new module object in `curriculum.js`, but avoid wider UI or routing changes

---

### ADR-002: Module Identity for the Inserted Module

**Context**: The spec describes the inserted module as "Module 8.5", but the live data currently uses integer `id` values and string labels like `"MODULE 8"`.

**Options Considered**:
- Option A: Renumber all later modules (9–12 become 10–13)
- Option B: Use a fractional or string identity for the new module, such as `id: "8.5"` with label `"MODULE 8.5"`
- Option C: Append the new module at the end and only describe it conceptually as between 8 and 9

**Decision**: Option B — keep downstream modules unchanged and use a stable inserted identity for the specialization module.

**Consequences**:
- Existing bookmarks and review keys for modules 9–12 stay stable
- The new module can appear in the intended learner sequence without forcing a whole-curriculum renumber
- Implementation must verify that any code assuming numeric `module.id` continues to behave correctly

---

### ADR-003: What Belongs in `curriculum.js` vs. `lessonEnhancements.js`

**Context**: The new lesson set includes both core instructional material and leadership/deep-mode overlays.

**Options Considered**:
- Option A: Put all new material directly in `curriculum.js`
- Option B: Put structural lesson content in `curriculum.js` and use `lessonEnhancements.js` only for mode-specific supplements
- Option C: Introduce a third curriculum-expansion data file

**Decision**: Option B.

**Consequences**:
- Lesson placement and sequencing stay centralized in `curriculum.js`
- Executive/deep-mode layering remains consistent with the existing app architecture
- No schema or import changes are needed in the application

---

### ADR-004: Dedicated Mobile Lessons vs. Generalized Reframing

**Context**: Some research prompts are written in very Flutter/mobile-specific language, while the main course is broader AI PM.

**Options Considered**:
- Option A: Preserve mobile specificity and keep those lessons in the specialization module
- Option B: Generalize all mobile prompts into broader cross-platform lessons

**Decision**: Option A, with selective reframing only for the lessons embedded into shared modules.

**Consequences**:
- The specialization module becomes a clear differentiator
- Existing modules retain cross-functional relevance
- Lesson copy work must distinguish between “core cross-platform PM concept” and “mobile specialization”

---

## Exact Change Surfaces

| File | Role | Planned Change |
|---|---|---|
| [src/data/curriculum.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/curriculum.js) | Primary curriculum structure | Insert one new module and extend existing modules with new lessons |
| [src/data/lessonEnhancements.js](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/src/data/lessonEnhancements.js) | Leadership/deep-mode supplements | Add enhancement entries for new or expanded lessons where needed |
| [docs/templates](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/templates) | Artifact templates | Add any new lesson templates required by the expansion |
| [docs/specs/ai-native-mobile-lessons-spec.md](/Users/beshoyageeb/Desktop/Beshoy/AI%20X%20Me/AI-PM-Course/docs/specs/ai-native-mobile-lessons-spec.md) | Source of truth | Already complete; used for traceability during implementation |

---

## Phase Breakdown

### Phase 1: Topology and Labeling Decision
**Dependencies**: None

- [ ] Task 1.1 — Confirm the inserted module identity in `curriculum.js` (`id`, `week`, `module`, title, tag, accent) — Exit: one explicit specialization module object contract is documented and ready to implement
- [ ] Task 1.2 — Verify that string or fractional module IDs do not break progress/bookmark/review behaviors in `App.jsx` — Exit: no code path requires numeric-only `module.id`
- [ ] Task 1.3 — Decide lesson numbering inside the new module (for example `8.5.1` through `8.5.6`) — Exit: numbering convention is consistent and stable across metadata, bookmarks, and artifacts

### Phase 2: Extend Existing Core Modules
**Dependencies**: Phase 1 complete

- [ ] [P] Task 2.1 — Expand Module 2 in `curriculum.js` with lessons for model routing, machine-readable acceptance criteria, and AI PRDs — Exit: Module 2 includes three new lessons placed after the existing foundations
- [ ] [P] Task 2.2 — Expand Module 6 in `curriculum.js` with lessons for validation pyramid, golden datasets/evals, and Sprint 0 — Exit: Module 6 includes three new operational build-loop lessons
- [ ] [P] Task 2.3 — Expand Module 7 in `curriculum.js` with lessons for repo-governed safety (AGENTS.md, drift, kill switch, merge caps, audit trail review, risk register) — Exit: Module 7 includes the full governance cluster
- [ ] [P] Task 2.4 — Expand Module 9 in `curriculum.js` with lessons for go/no-go evidence and responsible AI checklists — Exit: Module 9 includes two launch-control lessons
- [ ] [P] Task 2.5 — Expand Module 12 in `curriculum.js` with lessons for DORA baselines, org design, vendor switching, and executive reporting — Exit: Module 12 includes four leadership operating-model lessons

### Phase 3: Insert the Mobile Specialization Module
**Dependencies**: Phase 1 complete

- [ ] Task 3.1 — Insert the new specialization module after Module 8 in `curriculum.js` — Exit: the curriculum array contains the new module in the intended sequence
- [ ] Task 3.2 — Populate the specialization module with lessons on design-token context, UI consistency via token injection, Flutter orchestration, Flutter context engineering, multi-agent mobile orchestration, and BLE/IoT HITL mapping — Exit: the specialization module contains all six mobile-delivery lessons from the spec
- [ ] Task 3.3 — Verify that downstream modules remain visually and logically ordered after insertion — Exit: modules after the specialization still navigate correctly in sequence

### Phase 4: Add Mode-Specific Enhancements
**Dependencies**: Phases 2 and 3 complete

- [ ] [P] Task 4.1 — Add `lessonEnhancements.js` entries for any new executive/deep-mode lessons in Modules 2, 6, 7, 9, and 12 — Exit: each selected lesson has a valid `leadershipNote` and/or `toolingLab`
- [ ] [P] Task 4.2 — Add enhancement entries for specialization-module lessons that need tooling guidance or executive framing — Exit: specialization lessons render meaningful enhancement content in deep/executive modes

### Phase 5: Add Supporting Templates
**Dependencies**: Phases 2 and 3 complete

- [ ] [P] Task 5.1 — Identify which new lessons require reusable templates in `docs/templates/` rather than inline markdown only — Exit: template-backed lessons are explicitly listed
- [ ] [P] Task 5.2 — Create any missing templates referenced by new lesson `apply` or `meta.artifact` fields — Exit: all referenced template paths exist and match lesson outputs

### Phase 6: Validation and QA
**Dependencies**: Phases 2–5 complete

- [ ] Task 6.1 — Run the app and verify module counts, lesson counts, navigation, bookmarks, and progress still work with the inserted module — Exit: core navigation and progress flows behave normally
- [ ] Task 6.2 — Verify new lessons render correctly in fast, deep, and executive modes — Exit: no lesson falls back unintentionally because of missing fields
- [ ] Task 6.3 — Spot-check artifact targets and template references for the new lessons — Exit: all referenced artifact and template paths are valid

---

## Breaking Changes & Migrations

- **No storage schema migration is planned by default**
- **Potential soft migration risk**: If the inserted module changes visible ordering, users with saved `activeMod` indices may reopen on a different module than before
- **Potential key stability risk**: If downstream module IDs are renumbered instead of preserving existing IDs, old bookmark and progress keys may drift

**Mitigation**:
- Preserve existing module IDs for current modules where possible
- Treat the new specialization module as an inserted object with a distinct stable identity rather than renumbering the rest of the curriculum

---

## Non-Functional Considerations

- **Performance**: The curriculum dataset will grow, but rendering remains a static in-memory map and should stay inexpensive at this scale
- **Security**: No new secret, auth, or server boundary work is involved
- **Accessibility**: No component-level changes are planned, so accessibility risk is low unless lesson content introduces unreadable formatting
- **Content Maintainability**: Keep large lesson additions readable by preserving the current lesson object style and avoiding excessively large monolithic strings where an enhancement entry would suffice

---

## Risks and Unknowns

- The inserted module label (`MODULE 8.5`) may be pedagogically clear but visually unconventional in the UI
- Some embedded lessons may need broader wording if they are currently too Flutter-specific for a shared module
- Tool map, coverage, or executive-track helper datasets may eventually need expansion if you want the new lessons fully represented in auxiliary views, though that is not required for the first implementation pass

---

## Completion Report

```markdown
📋 PLANNING COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           AI-Native Mobile Curriculum Expansion
Architecture:      Hybrid curriculum expansion with one inserted specialization module and targeted existing-module enrichments
Approach Chosen:   Data-layer only changes in curriculum/enhancements because the UI already derives module topology dynamically
ADRs Logged:       4
Phase Count:       6
Plan Location:     docs/plans/ai-native-mobile-lessons-plan.md
Status:            ✅ Ready for the /tasks workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AUTO-CHAIN

→ Suggest the user run the `/tasks` workflow to decompose this plan into atomic implementation tasks.
