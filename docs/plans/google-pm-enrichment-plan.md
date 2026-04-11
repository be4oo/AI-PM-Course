# Google PM Certificate Enrichment — Implementation Plan (v2, Corrected)

**Spec**: [`docs/specs/google-pm-enrichment-spec.md`](../specs/google-pm-enrichment-spec.md)
**Version**: 2.0.0 — Grounded against real codebase
**Created**: 2026-04-11
**Status**: ✅ PLAN_GATE PASSED — Ready for `/tasks` workflow

---

## Pre-Flight Findings (Phase 0 Results)

These discoveries corrected critical assumptions in the previous plan draft:

### Real Lesson Schema (`curriculum.js`)

Each lesson object uses these **actual fields**:

```js
{
  id: "1.4",
  title: "...",
  type: "framework" | "concept" | "technical" | "deliverable" | "systems",
  content: `...markdown string...`,    // ← The body of the lesson
  apply: `...markdown string...`,      // ← The Apply exercise
  quiz: { q: "...", a: "..." },        // ← Quiz question + answer
  keys: ["...", "...", "..."],         // ← 3 key takeaways
  meta: {                              // ← Optional
    sources: [...],
    lastVerified: "...",
    artifact: "/path/...",
    rubric: [...],
    failureModes: [...],
    redTeam: [...]
  }
}
```

**The spec's assumed schema (`callouts[]`, `applyExercise{}`, `templates[]`) does NOT exist.**

### Real Enhancement System (`lessonEnhancements.js`)

There is a **separate file** for supplemental lesson content, keyed by `lesson.id`:

```js
export const LESSON_ENHANCEMENTS = {
  "7.1": {
    leadershipNote: "...",   // Rendered in Executive & Deep modes
    toolingLab: {            // Rendered in Deep mode only
      title: "...",
      tools: [...],
      steps: [...],
      artifactPath: "..."
    }
  }
}
```

This is imported in `App.jsx` at line 6 and merged into `lessonFrame` via `ensureLessonFrame()` at line 192.

### Two Enrichment Slots Available Per Lesson

Per `ensureLessonFrame()` (learningExperience.js:98–108):

| Slot | Source | Study Mode Shown |
|---|---|---|
| `concept` | `curriculum.js` → `lesson.content` | All |
| `takeaways` | `curriculum.js` → `lesson.keys` | All |
| `apply` | `curriculum.js` → `lesson.apply` | Deep + Fast |
| `reviewQuestion` | `curriculum.js` → `lesson.quiz.q` | All |
| `leadershipNote` | `lessonEnhancements.js` → `enhancement.leadershipNote` | Deep + Executive |
| `toolingLab` | `lessonEnhancements.js` → `enhancement.toolingLab` | Deep only |

### Lessons Already Having Enhancements

The following lesson IDs already have entries in `lessonEnhancements.js`:
`1.3`, `2.2`, `2.3`, `3.3`, `6.1`, `6.2`, `7.1`, `8.1`, `10.1`, `12.1`, `12.2`, `12.3`, `12.4`, `12.5`

Lessons targeted by the spec with **no current enhancement**: `1.4`, `4.1`, `9.1`

### Module Map (Actual)

| Module | Week | Key Lessons | Notes |
|---|---|---|---|
| Module 1 | WEEK 1 | 1.1, 1.2, 1.3, **1.4** | 1.4 = ROI & Investment Memo — **P0 target** |
| Module 2 | WEEK 2 | 2.1, 2.2, **2.3** | 2.3 = AI PRD & Sprint Management — back-link target for US-009 |
| Module 4 | WEEK 4 | **4.1** | 4.1 = Discovery — RACI (US-002) + Power Grid (US-004) |
| Module 6 | WEEK 6 | **6.1**, 6.2 | 6.1 = Build Loop — Kickoff (US-006) + Critical Path (US-007) + Scrum (US-009) |
| Module 7 | WEEK 7 | **7.1** | 7.1 = Guardrails/SLOs — PDCA (US-005) + Risk (US-008) + Scope (US-010) |
| Module 9 | WEEK 9 | **9.1**, 9.2 | 9.1 = GTM — OKRs (US-003) + Data-Informed (US-013) |
| Module 10 | WEEK 10 | **10.1** | 10.1 = Capstone — back-link target for US-012 |
| Module 12 | WEEK 12 | 12.1–12.5 | Leadership — Tuckman (US-011) best fits 12.2 (Org Design) |

---

## Architecture Decision

**Chosen approach**: Enrich the course using **both data layers** available in the existing system:

1. **`curriculum.js`** — Append Google PM framework content to `lesson.content`, `lesson.apply`, `lesson.keys`, and `lesson.meta` for lessons that need inline pedagogical additions.
2. **`lessonEnhancements.js`** — Add or extend `leadershipNote` and `toolingLab` entries for lessons that need executive-mode or deep-mode supplemental blocks.

No schema changes, no new files in `src/`, no React component changes.

---

## ADRs

### ADR-001: Which data layer for each enrichment type?

**Context**: There are two data layers. Google PM frameworks span both "content body" material (concepts, frameworks, exercises) and "leadership lens" material (governance implications, decision rights, review cadences).

**Options Considered**:
- Option A: Put everything in `curriculum.js` → content is always visible, dense, loads regardless of study mode
- Option B: Split by study-mode intent — core frameworks in `curriculum.js`, governance/leadership implications in `lessonEnhancements.js`
- Option C: Create a new data file `googlePMEnrichments.js` following the same pattern as `lessonEnhancements.js` — keeps concerns separated and avoids polluting either existing file

**Decision**: Option B — Use `curriculum.js` for US-001 through US-013 core content (Triple Constraint, RACI, OKRs, Power Grid, etc.) because learners need these regardless of study mode. Use `lessonEnhancements.js` for governance-flavored leadership notes that reinforce each framework for executive-mode users.

**Consequences**: Some lessons will have both their `content` and `apply` fields extended, AND a new `leadershipNote` in `lessonEnhancements.js`. This is consistent with how other lessons like `2.3` and `7.1` are already structured.

---

### ADR-002: Append vs. insert in `lesson.content`

**Context**: `lesson.content` is a long markdown template string. The spec says frameworks should be inserted "before the Kill Criteria section" in Lesson 1.4 — this requires understanding the internal markdown structure.

**Options Considered**:
- Option A: Simple append — add new content block at the end of `lesson.content` with a clear separator header
- Option B: Precise insertion — find the exact markdown position and insert inline

**Decision**: Option A — Append with a bold section header (e.g., `\n\n**THE CONSTRAINT MODEL FOR AI PM**\n\n...`) for two reasons: (1) the existing lessons don't use heading syntax — they use `**Bold text**` as section markers, consistent with the entire file's style; (2) the "Kill Criteria" is literally the last two lines of Lesson 1.4's content, so appending before it is functionally equivalent to a targeted insert.

**Consequences**: The new Google PM framework sections will always appear after the existing AI-native content. This is intentional — the AI-PM content is the primary and the Google PM is the structural enrichment layer.

---

### ADR-003: `lesson.apply` — extend vs. replace

**Context**: All target lessons already have an `apply` field with an existing exercise. The spec requires new Apply exercises (RACI, Sprint 0 Kickoff, Risk Register).

**Options Considered**:
- Option A: Replace the existing `apply` with the new Google PM exercise
- Option B: Extend the existing `apply` by appending a clearly labeled second exercise block
- Option C: Add a `secondaryApply` field (new schema field — requires CourseViews.jsx change)

**Decision**: Option B — Extend existing `apply` with a separator (`---`) and a labeled block (`**APPLY B — [Exercise Name]**`). This preserves existing exercises, adds the new framework exercise, and requires no component changes. The rendering already handles multi-paragraph apply content.

**Consequences**: Some lessons will have longer `apply` sections (two exercises). This is acceptable — the learner can do one or both depending on their current focus.

---

## Exact Insertion Points

All confirmed by reading the actual file:

| US | Lesson | File | Field | Current Line Range | Action |
|---|---|---|---|---|---|
| US-001 | 1.4 | curriculum.js | `content` | L137–L183 | Append Triple Constraint block before last 2 lines |
| US-001 | 1.4 | lessonEnhancements.js | Add `"1.4"` entry | Currently missing | Add `leadershipNote` about constraint trade-off decisions |
| US-002 | 4.1 | curriculum.js | `content` | L362–L386 | Append RACI framework block |
| US-002 | 4.1 | curriculum.js | `apply` | L388 | Extend with RACI Apply exercise |
| US-003 | 9.1 | curriculum.js | `content` | L621–L657 | Append OKR template block |
| US-003 | 9.1 | curriculum.js | `apply` | L659–L665 | Extend with OKR Apply exercise |
| US-003 | 9.1 | lessonEnhancements.js | Add `"9.1"` entry | Currently missing | Add `leadershipNote` about OKR reporting |
| US-004 | 4.1 | curriculum.js | `content` | L362–L386 | Append Power Grid block (same lesson as US-002) |
| US-004 | 4.1 | curriculum.js | `keys` | L389 | Add Power Grid key takeaway |
| US-005 | 7.1 | curriculum.js | `content` | L543–L561 | Append PDCA quality cycle block |
| US-006 | 6.1 | curriculum.js | `apply` | L508 | Extend with Sprint 0 Kickoff Apply exercise |
| US-006 | 6.1 | lessonEnhancements.js | Extend `"6.1"` entry | L58–L71 | Extend `leadershipNote` with kickoff governance point |
| US-007 | 6.1 | curriculum.js | `content` | L487–L506 | Append Critical Path block |
| US-008 | 7.1 | curriculum.js | `apply` | L563 | Extend with Risk Register Apply exercise |
| US-008 | 7.1 | lessonEnhancements.js | Extend `"7.1"` entry | L86–L99 | Extend `toolingLab` to reference risk register artifact |
| US-009 | 6.1 | curriculum.js | `content` | L487–L506 | Append Scrum translation table |
| US-009 | 6.1 | curriculum.js | `keys` | L509 | Add Scrum→AI role translation key |
| US-010 | 7.1 | curriculum.js | `content` | L543–L561 | Append Scope Creep section |
| US-011 | 12.2 | curriculum.js | `content` | L854 (start of 12.2) | Append Tuckman stages block |
| US-012 | 10.1 | curriculum.js | `apply` | L760–L762 | Extend with Closeout template Apply exercise |
| US-013 | 9.1 | curriculum.js | `content` | L621–L657 | Append Data-Informed section (same lesson as US-003) |

> **Note**: US-002 and US-004 both target Lesson 4.1. US-003 and US-013 both target Lesson 9.1.
> US-007 and US-009 both target Lesson 6.1. US-005 and US-010 both target Lesson 7.1.
> These will be batched into single edits per lesson to avoid conflicts.

---

## Phase Breakdown

### Phase 1: Infrastructure — Template `.md` Files
**Dependencies**: None — run immediately  
**Goal**: Create reusable practitioner templates referenced in the enrichment content  

- [ ] [P] Task 1.1 — Create `docs/templates/ai-team-raci.md` — *Exit*: File exists with header row + 6 AI decision rows (golden dataset, model selection, HITL level, guardrail design, hallucination incident response, eval threshold) and Rules section
- [ ] [P] Task 1.2 — Create `docs/templates/stakeholder-power-grid.md` — *Exit*: File exists with 2×2 Power Grid pre-filled with 4 quadrant communication strategies + 3 AI movement signals
- [ ] [P] Task 1.3 — Create `docs/templates/sprint-0-kickoff.md` — *Exit*: File exists with 7-block agenda (Problem framing, Scope, RACI, Eval criteria, Context strategy, HITL level, Q&A) + follow-up email template
- [ ] [P] Task 1.4 — Create `docs/templates/ai-risk-register.md` — *Exit*: File exists with 7-column table header + 5 example rows (model outage, hallucination spike, token cost surge, dataset drift, GDPR violation) + 4 treatment strategies
- [ ] [P] Task 1.5 — Create `docs/templates/ai-feature-closeout.md` — *Exit*: File exists with 5 quality metric fields + Sprint Retrospective format (Well/Degraded/Differently) + risk register feed note
- [ ] [P] Task 1.6 — Create `docs/templates/okr-ai-features.md` — *Exit*: File exists with OKR template (Objective, 3 KRs, scoring scale) + 2 AI-specific examples + common mistake callout

---

### Phase 2: P0 Enrichments — Lesson 1.4 (Triple Constraint)
**Dependencies**: None  

- [ ] Task 2.1 — **US-001** — Extend `lesson.content` in `curriculum.js` at line ~169 (before "When to kill") with the Triple Constraint for AI block — *Exit*: Lesson 1.4 `content` string contains `**THE AI CONSTRAINT MODEL**` section with 4-constraint definition and trade-off table
- [ ] Task 2.2 — **US-001** — Add `"1.4"` key to `lessonEnhancements.js` with `leadershipNote` about constraint trade-off documentation — *Exit*: `LESSON_ENHANCEMENTS["1.4"]` exists with non-empty `leadershipNote` string

---

### Phase 3: P0 Enrichments — Lesson 4.1 (RACI + Power Grid)
**Dependencies**: Phase 2 complete (Triple Constraint language defined)  

> Both US-002 and US-004 target this lesson. This is a **single batched edit**.

- [ ] Task 3.1 — **US-002 + US-004** — Extend `lesson.content` in `curriculum.js` at line ~386 (after capability table) with RACI framework section + Power Grid section — *Exit*: Lesson 4.1 `content` string contains `**AI TEAM RACI**` section (6 decision rows + Rules) and `**STAKEHOLDER POWER GRID**` section (2×2 grid + 4 strategies + 3 AI movement signals)
- [ ] Task 3.2 — **US-002** — Extend `lesson.apply` in `curriculum.js` at line ~388 with RACI Apply exercise — *Exit*: `apply` field contains `**APPLY B — AI Team RACI**` block with artifact path `/docs/discovery/ai-team-raci.md`
- [ ] Task 3.3 — **US-004** — Add Power Grid key to `lesson.keys` array at line ~389 — *Exit*: `keys` array has 4 entries (was 3), new entry references Power Grid or stakeholder mapping

---

### Phase 4: P0 Enrichments — Lesson 9.1 (OKRs + Data-Informed)
**Dependencies**: Phase 2 complete (OKR lesson must back-link to Triple Constraint in 1.4)  

> Both US-003 and US-013 target this lesson. Single batched edit.

- [ ] Task 4.1 — **US-003 + US-013** — Extend `lesson.content` in `curriculum.js` at line ~657 (after exec communication section) with OKR template block + Data-Informed Decisions section — *Exit*: Lesson 9.1 `content` contains `**OKR FRAMEWORK FOR AI FEATURES**` and `**DATA-INFORMED AI PM DECISIONS**` sections
- [ ] Task 4.2 — **US-003** — Extend `lesson.apply` in `curriculum.js` at line ~659–665 with OKR Apply exercise — *Exit*: `apply` field contains `**APPLY B — AI Feature OKRs**` block with artifact path `/docs/gtm/ai-feature-okrs.md`
- [ ] Task 4.3 — **US-003** — Add `"9.1"` key to `lessonEnhancements.js` with `leadershipNote` about OKR reporting cadence — *Exit*: `LESSON_ENHANCEMENTS["9.1"]` exists with non-empty `leadershipNote`

---

### Phase 5: P1 Enrichments — Lessons 6.1 and 7.1
**Dependencies**: Phases 2–4 complete (terminology established)  

> Two lessons, each with multiple user stories. Batched per lesson.

**Lesson 6.1 (Build Loop) — US-006, US-007, US-009**:
- [ ] Task 5.1 — Extend `lesson.content` at line ~506 with: Critical Path for AI block (US-007) + Scrum→AI Role Translation table (US-009) — *Exit*: Lesson 6.1 `content` contains `**CRITICAL PATH FOR AI BUILDS**` and `**SCRUM → AI TEAM TRANSLATION**` sections
- [ ] Task 5.2 — Extend `lesson.apply` at line ~508 with: Sprint 0 Kickoff Apply exercise (US-006) — *Exit*: `apply` field contains `**APPLY B — AI Sprint 0 Kickoff**` block with 7 agenda items and follow-up template, artifact path `/projects/sprint-0-kickoff-[feature].md`
- [ ] Task 5.3 — Add Scrum translation key to `lesson.keys` at line ~509 — *Exit*: `keys` array has 4 entries, new entry references the Scrum→AI role mapping
- [ ] Task 5.4 — Extend `lessonEnhancements.js` `"6.1"` entry `leadershipNote` with kickoff governance implication (US-006) — *Exit*: `"6.1"` `leadershipNote` references both iteration quality *and* Sprint 0 kickoff governance

**Lesson 7.1 (Guardrails/SLOs) — US-005, US-008, US-010**:
- [ ] Task 5.5 — Extend `lesson.content` at line ~561 with: PDCA Quality Cycle block (US-005) + Scope Creep Controls section (US-010) — *Exit*: Lesson 7.1 `content` contains `**AI QUALITY MANAGEMENT CYCLE (PDCA)**` and `**SCOPE INTEGRITY IN PRODUCTION**` sections
- [ ] Task 5.6 — Extend `lesson.apply` at line ~563 with: Risk Register Apply exercise (US-008) — *Exit*: `apply` field contains `**APPLY B — AI Production Risk Register**` block with artifact path `/docs/deploy/ai-risk-register.md`
- [ ] Task 5.7 — Extend `lessonEnhancements.js` `"7.1"` entry to reference Risk Register artifact in `toolingLab.artifactPath` — *Exit*: `"7.1"` `toolingLab.artifactPath` updated and `leadershipNote` references PDCA governance

---

### Phase 6: P2 Enrichments — Lessons 12.2 and 10.1
**Dependencies**: Phase 5 complete (Scrum/team context established)  

- [ ] Task 6.1 — **US-011 (Tuckman)** — Read Lesson 12.2 `content` (line ~854), then extend with Tuckman's Team Development Stages block — *Exit*: Lesson 12.2 `content` contains `**AI TEAM DEVELOPMENT STAGES**` with all 5 Tuckman stages, AI-specific behaviors, and regression warning
- [ ] Task 6.2 — **US-012 (Closeout)** — Extend Lesson 10.1 `apply` at line ~760–762 with Closeout template Apply exercise — *Exit*: `apply` field contains `**APPLY B — AI Feature Closeout**` block with 5 quality metrics and artifact path `/docs/deploy/ai-feature-closeout-[feature].md`

---

### Phase 7: Quality Gate
**Dependencies**: Phases 1–6 complete

- [ ] Task 7.1 — Run `npm run lint` — *Exit*: 0 errors, 0 warnings
- [ ] Task 7.2 — Run `npm run test` — *Exit*: all 4 tests in `learningExperience.test.js` pass (no schema violations in lesson object structure)
- [ ] Task 7.3 — Run `npm run build` — *Exit*: Vite build success, 0 errors
- [ ] Task 7.4 — Spot-check in browser (`http://localhost:5174/AI-PM-Course/`): Navigate to Lessons 1.4, 4.1, 6.1, 7.1, 9.1, 12.2, 10.1 and confirm new sections appear — *Exit*: All 7 lessons render new content blocks without layout breaks
- [ ] Task 7.5 — Verify in Executive mode: Confirm `leadershipNote` additions appear for lessons 1.4, 6.1, 7.1, 9.1 — *Exit*: Executive study mode shows GM-enriched governance notes in all 4 lessons
- [ ] Task 7.6 — Update the spec status in `docs/specs/google-pm-enrichment-spec.md` to `✅ Implemented` — *Exit*: Spec file header status updated

---

## Breaking Changes & Migrations

**Zero breaking changes.** This plan:

- Does not add or rename any exported symbols
- Does not change the `curriculum` array structure (same number of modules and lessons)
- Does not modify `learningExperience.js`, `App.jsx`, or `CourseViews.jsx`
- Does not introduce any new runtime dependencies
- Does not modify the Vitest test configuration

**Files changed**:
1. `src/data/curriculum.js` — `content`, `apply`, `keys` extended for 7 lessons
2. `src/data/lessonEnhancements.js` — New entries for `1.4`, `9.1`; extended entries for `6.1`, `7.1`
3. `docs/templates/` — 6 new `.md` template files (no runtime impact)

---

## Non-Functional Considerations

**Performance**:
- `curriculum.js` grows from 72,227 bytes (~72KB) to an estimated ~80–84KB. Still well within acceptable range for a static SPA — no lazy loading required.
- `lessonEnhancements.js` grows from 7,890 bytes to ~11KB. Zero runtime impact.

**Accessibility**:
- All new content is plain markdown strings — rendered by the existing SPA with the same accessible markup patterns.
- No `innerHTML` injection, no new HTML elements.

**Maintainability**:
- Each appended block starts with a distinctive bold header (`**AI TEAM RACI**`, `**CRITICAL PATH FOR AI BUILDS**`, etc.) making it visually locatable for future editing.
- Template `.md` files serve as the portable, non-JS version of each framework for practitioners.

---

## PLAN_GATE Checklist

- [x] Architecture covers ALL 13 acceptance criteria from `spec.md`
- [x] Real data schema confirmed (not assumed) — sourced from lines 1–199 of `learningExperience.js`, `lessonEnhancements.js`, `curriculum.js`
- [x] Breaking changes: none — explicitly documented
- [x] Three ADRs documented with rejected alternatives
- [x] Every task has a concrete Exit Criteria with line-level precision
- [x] Lessons targeting multiple user stories batched into single edits (prevents conflicts)
- [x] Parallelizable tasks tagged `[P]`
- [x] Exact line numbers provided for all insertion points

---

## Verification Plan

```bash
# 1. Lint — must be 0 errors/warnings
npm run lint

# 2. Tests — must all pass
npm run test

# 3. Build — must succeed
npm run build
```

Manual: Start `npm run dev` and navigate to each of the 7 target lessons to confirm rendering.

---

```
📋 PLANNING COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           Google PM Certificate Enrichment (All 6 Courses)
Architecture:      Dual-layer data enrichment (curriculum.js + lessonEnhancements.js)
Approach Chosen:   Append to existing lesson fields — no schema changes, no component changes
ADRs Logged:       3 (data layer split, content append vs. insert, apply extend vs. replace)
Phase Count:       7 (1 infra + 5 content + 1 quality gate)
User Stories:      13 (P0: 4, P1: 6, P2: 3)
Plan Location:     docs/plans/google-pm-enrichment-plan.md
Status:            ✅ Ready for the /tasks workflow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
