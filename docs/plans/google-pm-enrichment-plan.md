# Google PM Certificate Enrichment — Implementation Plan

**Spec**: [`docs/specs/google-pm-enrichment-spec.md`](../specs/google-pm-enrichment-spec.md)  
**Version**: 1.0.0  
**Created**: 2026-04-11  
**Status**: ✅ Ready for `/tasks` workflow

---

## Architecture Decision

**Selected approach**: Enrich `src/data/curriculum.js` in-place using the existing lesson object schema — no new data structures, no schema changes, no component refactors.

The existing `curriculum.js` lesson objects already support `keyPoints[]`, `callouts[]`, `applyExercise{}`, and `templates[]`. All 13 user stories map cleanly into these existing fields. The only "new" thing is the content strings — not the structure.

---

## ADRs (Rejected Alternatives)

### ADR-001: Markdown files vs. JS curriculum data
**Context**: The enrichment content is detailed (tables, checklists, templates). Could be stored as `.md` files and loaded dynamically.  
**Options Considered**:
- Option A: Store content in `curriculum.js` (inline JS strings) — consistent with existing architecture, zero new dependencies, no fetch required.
- Option B: Store as `.md` files in `docs/`, parse and render via `react-markdown` — more readable source, but requires a new dependency and a fetch/parse pipeline.
**Decision**: Option A — because the app is a static SPA and adding a runtime markdown fetch breaks the current zero-network-request pattern. The existing `curriculum.js` is the single source of truth.  
**Consequences**: Content authors edit `.js`, not `.md`. Rich formatting (tables) is represented as structured JS objects, rendered by `CourseViews.jsx`.

### ADR-002: New schema fields vs. existing fields
**Context**: Some enrichment types (e.g., RACI tables, risk registers) don't perfectly map to `keyPoints[]` or `applyExercise{}`.  
**Options Considered**:
- Option A: Extend lesson schema with new fields (`raciTable`, `riskRegister`) — semantically correct but requires changes to `CourseViews.jsx` to render them.
- Option B: Use existing `applyExercise{}` and `callouts[]` to structure all new content types — fits existing rendering logic with zero component changes.
**Decision**: Option B — because US-001 through US-013 all have clear mappings to existing fields. Semantic precision is less important than delivery speed and zero regressions.  
**Consequences**: Tables are represented as ordered arrays in `applyExercise.steps[]`. This is a known limitation; a future schema v2 can formalize table types.

### ADR-003: Content placement — append vs. insert
**Context**: Should enrichment content append to existing lessons, or be inserted at specific positions within them?  
**Options Considered**:
- Option A: Append to end of lesson — safe, non-breaking, easy to implement.
- Option B: Insert at specified positions (e.g., "before the Kill Criteria section") — pedagogically correct, follows spec exactly, but requires knowledge of lesson internal structure.
**Decision**: Option B — the spec explicitly defines insertion positions (e.g., "before the 'When to Kill' section in Lesson 1.4"). Following the spec precisely preserves pedagogical flow.  
**Consequences**: Requires reading each target lesson's existing `keyPoints[]` and `callouts[]` before inserting — adds implementation time but produces a higher-quality result.

---

## Phase Breakdown

### Phase 1: Infrastructure & Template Artifacts
**Dependencies**: None — runs first  
**Goal**: Create all referenced template files under `docs/templates/` and ensure `docs/specs/README.md` is initialized.

**Tasks**:
- [x] [P] Task 1.1 — Create `docs/specs/README.md` spec index — Exit: file exists with entry for `google-pm-enrichment-spec.md`
- [ ] [P] Task 1.2 — Create `docs/templates/ai-team-raci.md` template — Exit: file exists with RACI table rows for all 6 AI decision types from US-002
- [ ] [P] Task 1.3 — Create `docs/templates/stakeholder-power-grid.md` template — Exit: file exists with 2×2 grid and communication strategies from US-004
- [ ] [P] Task 1.4 — Create `docs/templates/sprint-0-kickoff.md` template — Exit: file exists with 7-block agenda and follow-up email from US-006
- [ ] [P] Task 1.5 — Create `docs/templates/ai-risk-register.md` template — Exit: file exists with all columns and 5 example rows from US-008
- [ ] [P] Task 1.6 — Create `docs/templates/ai-feature-closeout.md` template — Exit: file exists with closeout checklist and retrospective from US-012
- [ ] [P] Task 1.7 — Create `docs/plans/README.md` plans index — Exit: file exists with entry for this plan

---

### Phase 2: Read Target Lessons & Map Insertion Points
**Dependencies**: Phase 1 complete (specs confirmed)  
**Goal**: Read the current state of all target lessons in `curriculum.js` to confirm insertion points and avoid duplicating existing content.

**Tasks**:
- [ ] [P] Task 2.1 — Read Lesson 1.4 (AI ROI & Investment Memo) — Exit: confirmed insertion point for US-001 (Triple Constraint)
- [ ] [P] Task 2.2 — Read Lesson 4.1 (Discovery & Pain Quantification) — Exit: confirmed insertion points for US-002 (RACI), US-004 (Power Grid)
- [ ] [P] Task 2.3 — Read Lesson 6.1 (Build Loop) — Exit: confirmed insertion points for US-006 (Kickoff), US-007 (Critical Path), US-009 (Scrum Translation)
- [ ] [P] Task 2.4 — Read Lesson 7.1 (Guardrails, Observability & SLOs) — Exit: confirmed insertion points for US-005 (PDCA), US-008 (Risk Register), US-010 (Scope Creep)
- [ ] [P] Task 2.5 — Read Lesson 9.1 (Communicating AI to Executives) — Exit: confirmed insertion points for US-003 (OKRs), US-013 (Data-Informed Decisions)
- [ ] Task 2.6 — Read Module 6 Lesson 2.3 (Sprint Management) — Exit: confirmed back-link anchor for US-009
- [ ] Task 2.7 — Read final module lesson — Exit: confirmed insertion point for US-011 (Tuckman) and US-012 (Closeout)

---

### Phase 3: Core Enrichment — P0 Priority User Stories
**Dependencies**: Phase 2 complete  
**Goal**: Implement all P0-priority user stories (US-001 through US-004). These are the highest-value additions and unblock the other stories.

- [ ] Task 3.1 — **US-001: Triple Constraint for AI** — Add 4-constraint model block + trade-off table to Lesson 1.4 in `curriculum.js` — Exit: `keyPoints` or `callouts` array in Lesson 1.4 contains "Triple Constraint" content with 4 rows
- [ ] Task 3.2 — **US-002: RACI Charts for AI Teams** — Add RACI `applyExercise` to Lesson 4.1 — Exit: applyExercise titled "AI Feature RACI" exists in Lesson 4.1 with 6 decision rows and Rules section
- [ ] Task 3.3 — **US-003: OKR Template for AI Features** — Add OKR block to Lesson 9.1 — Exit: Lesson 9.1 contains OKR template with scoring scale + 2 AI-specific examples + common mistake callout
- [ ] Task 3.4 — **US-004: Stakeholder Power Grid** — Add Power Grid sub-section to Lesson 4.1 — Exit: Lesson 4.1 contains 2×2 grid definition, 4 quadrant strategies, and 3 AI movement signals

---

### Phase 4: Expanded Enrichment — P1 Priority User Stories
**Dependencies**: Phase 3 complete (P0 content provides terminology context)  
**Goal**: Implement P1-priority user stories (US-005 through US-010). These build on the P0 frameworks.

- [ ] [P] Task 4.1 — **US-005: PDCA / Quality Management** — Add PDCA-labeled quality cycle to Lesson 7.1 — Exit: Lesson 7.1 contains AI-relabeled PDCA cycle + DMAIC note + customer satisfaction proxies
- [ ] [P] Task 4.2 — **US-006: Sprint 0 Kickoff Template** — Add Apply exercise to Lesson 6.1 — Exit: applyExercise "AI Sprint 0 Kickoff Agenda" exists with 7 blocks + follow-up email template
- [ ] Task 4.3 — **US-007: Critical Path** — Add critical path callout to Lesson 6.1 — Exit: callout exists with day-by-day sequence (7+ steps), Float definition, and non-critical path list (after US-006 Task 4.2 is done)
- [ ] [P] Task 4.4 — **US-008: AI Risk Register** — Add risk register template block to Lesson 7.1 — Exit: block contains 7-column table, 5 pre-populated examples, 4 treatment strategies, and review cadence
- [ ] Task 4.5 — **US-009: Scrum → AI Translation** — Add supplementary frame to Lesson 6.1 — Exit: 3-role translation + 6-row artifact table + back-link to Lesson 2.3 (after US-006 Task 4.2 is done)
- [ ] [P] Task 4.6 — **US-010: Scope Creep Controls** — Add "Scope Integrity" callout to Lesson 7.1 — Exit: callout contains 4 AI creep patterns + change request process + impact table

---

### Phase 5: Optional Enrichment — P2 Priority User Stories
**Dependencies**: Phase 4 complete  
**Goal**: Implement P2-priority user stories (US-011 through US-013). These are valuable but not blocking.

- [ ] [P] Task 5.1 — **US-011: Tuckman's Stages** — Add AI team development block to Module 6 or Module 10 — Exit: block contains all 5 stages + AI-specific behaviors + regression warning
- [ ] [P] Task 5.2 — **US-012: Project Closeout Template** — Add closeout template to final module lesson — Exit: template contains 5 quality metrics + retrospective format + link to Risk Register (US-008)
- [ ] [P] Task 5.3 — **US-013: Data-Informed Decisions** — Add data supplement to Lesson 9.1 — Exit: supplement contains 4 AI metrics + data storytelling note + data ethics warning

---

### Phase 6: Quality Gate
**Dependencies**: Phases 3–5 complete  
**Goal**: Verify zero regressions, lint clean, and all acceptance criteria passed.

- [ ] Task 6.1 — Run `npm run lint` — Exit: 0 errors, 0 warnings
- [ ] Task 6.2 — Run `npm run test` — Exit: all existing tests pass (no new schema violations)
- [ ] Task 6.3 — Run `npm run build` — Exit: build succeeds with no TypeScript/Vite errors
- [ ] Task 6.4 — Manual spot-check: Open `http://localhost:5173` and verify Lesson 1.4, 4.1, 6.1, 7.1, 9.1 render new content blocks — Exit: all 5 lessons display enrichment content
- [ ] Task 6.5 — Update `docs/master-audit-and-implementation-log.md` with enrichment summary — Exit: log entry added for this enrichment pass

---

## Breaking Changes & Migrations

**None.** This plan makes zero changes to:
- React component architecture
- `CourseViews.jsx` rendering logic
- `App.jsx` state model
- Vitest test configuration
- Vite build configuration
- Module count or structure (11 modules, fixed)

**Only changed file**: `src/data/curriculum.js` (content additions to existing lesson objects)  
**New files created**: Template `.md` files under `docs/templates/`, spec + plan reference files

---

## Coverage: Google PM Certificate Course Mapping

| Course | Key Frameworks Extracted | Mapped User Stories |
|---|---|---|
| **Course 1: Foundations** | PM lifecycle overview, project characteristics, change management intro | Context only — no direct US |
| **Course 2: Initiation** | RACI, OKRs/SMART Goals, Stakeholder Power Grid, Project Charter, Scope creep | US-002, US-003, US-004, US-010 |
| **Course 3: Planning** | Triple Constraint, Critical Path, WBS, Buffers, Procurement, Risk Register, Communication Plan, Kickoff Meeting, Kanban | US-001, US-006, US-007, US-008, US-010 |
| **Course 4: Execution** | PDCA/DMAIC quality cycle, change tracking, escalation, data analysis, Tuckman team stages, customer satisfaction measurement, project closeout | US-005, US-011, US-012, US-013 |
| **Course 5: Agile** | Scrum roles, pillars, values, sprint artifacts, Product Backlog, User Stories, Epics, Kanban, XP, Lean, VUCA, Spotify model | US-009 |
| **Course 6: Capstone** | Artifact portfolio integration, executive communication, stakeholder escalation, quality evaluation | US-012, US-013 |

---

## Non-Functional Considerations

**Performance**:
- All new content is static JS data. Zero runtime impact.
- `curriculum.js` will grow from ~1028 lines to an estimated ~1600-1700 lines. Within acceptable range for a static SPA.

**Security**:
- No new dependencies, API keys, or external services.

**Accessibility**:
- Content follows text-based patterns already in `CourseViews.jsx`. No raw HTML injected into the DOM.
- Tables are rendered as structured arrays — the existing renderer handles accessible markup.

**Maintainability**:
- Each enrichment block is tagged with the originating Google PM course (in a `source` comment) for future auditing.
- Template files are created in `docs/templates/` for re-use across learner portfolios.

---

## Verification Plan

### Automated Tests
```bash
# Lint check — must be 0 errors
npm run lint

# Unit tests — must all pass
npm run test

# Production build — must succeed
npm run build
```

### Manual Verification
1. Start dev server: `npm run dev`
2. Navigate to Lesson 1.4 — confirm Triple Constraint block renders
3. Navigate to Lesson 4.1 — confirm RACI Apply exercise and Power Grid both render
4. Navigate to Lesson 6.1 — confirm Kickoff, Critical Path, and Scrum Translation all render
5. Navigate to Lesson 7.1 — confirm PDCA, Risk Register, and Scope Creep callouts all render
6. Navigate to Lesson 9.1 — confirm OKR template and Data-Informed supplement render

### Browser Accessibility Check
- Verify all new content is reachable via keyboard navigation
- Verify no layout breaks on mobile viewport (375px)

---

## PLAN_GATE Checklist

- [x] Architecture covers ALL acceptance criteria from `spec.md`
- [x] Breaking changes: none — explicitly documented
- [x] Rejected alternatives documented as ADRs (3 ADRs)
- [x] Every task has an Exit Criteria
- [x] Parallelizable tasks tagged `[P]`
- [x] All 6 Google PM courses represented

---

*Status: ✅ PLAN_GATE PASSED — Ready for `/tasks` workflow*
