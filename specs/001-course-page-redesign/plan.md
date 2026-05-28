# Implementation Plan: Editorial-Dark Course Page Redesign

**Branch**: `001-course-page-redesign` | **Date**: 2026-05-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-course-page-redesign/spec.md`

## Summary

Replace the existing course experience (a 1,843-line `src/App.jsx` rendering ~20 author/audit views inline) with a reading-first, editorial-dark layout: three-column shell (sidebar / reading column / right rail), serif display + calm sans body, a single copper accent, typographic callouts in place of colored boxes, a header with `⌘K` palette + account menu, and four Practice tools (Spaced review, Adversarial review, Capstone, Knowledge map) opened as modals. Author/audit surfaces (Audit, Sources, Cohort, Coverage, Community, Tools, Glossary, Cheatsheets, ROI, Outline, Changelog, Templates, Ops) are removed from the learner sidebar but remain reachable from the command palette and the Profile modal. The redesign is delivered as a parallel `CourseShell` mount that replaces the learn-view branch of `App.jsx`; non-learn views remain at their current routes during the transition. Implementation translates the prototype HTML/CSS/JSX in `assets/design-bundle/` into the project's React 19 + Vite stack rather than shipping the prototype verbatim.

## Technical Context

**Language/Version**: JavaScript (JSX) on React 19.2, Node 20 for tooling.

**Primary Dependencies**: `react` `^19.2.4`, `react-dom` `^19.2.4`, Vite 8, ESLint flat config (no new runtime deps; the prototype's Babel-Standalone + CDN React loader is for the in-browser design tool only and is dropped on translation).

**Storage**: Browser `localStorage` — same keying utilities (`buildLessonStorageKey`, `buildCohortStorageKey`, `buildReviewStorageKey`, `migrateLegacyModuleStorage`) already used today. No new persistence layer.

**Testing**: Vitest unit + component tests; jsdom environment for DOM-touching tests; ESLint as a gate. No new test runner.

**Target Platform**: Modern evergreen browsers; deployed to GitHub Pages via `gh-pages`. RTL parity preserved.

**Project Type**: Single-page React application (single project layout; existing `src/`).

**Performance Goals**: LCP < 2.5s on a representative mid-range device with broadband; initial parsed JS < 500 KB; CLS < 0.01 across the four target viewport widths (375 / 768 / 1024 / 1440).

**Constraints**: WCAG 2.1 AA contrast on the editorial-dark palette and all Tweaks accents; no horizontal scroll at any target width; the four Practice tools are the only learner-facing tools in the sidebar (SC-008 enforces a build-time check); the existing Adversarial review scoring (`scoreArtifactAgainstRubric`) remains local — no new model calls in scope, so Promptfoo / Langfuse eval requirements are not triggered by this feature; bilingual / RTL behavior must match today's parity.

**Scale/Scope**: ~50 lessons across 12 modules; one learner per device; current `App.jsx` is the largest file in the codebase at 1,843 lines and is the primary refactor target — but only the *learn-view branch* is rewritten in this feature; non-learn view components stay where they are.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Project constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) v1.0.0.

| Principle | Status | Evidence |
|---|---|---|
| I. Benchmark Transparency (NON-NEGOTIABLE) | PASS | FR-027 keeps the course-audit and source-library surfaces reachable via the command palette and the Profile & cohort modal. They are removed from the learner sidebar (which is the whole point of the redesign) but not deleted. The audit view stays at parity. |
| II. Hands-On Artifact Bias | PASS | FR-026 requires every lesson that has an artifact to surface the artifact link in the reading column or right rail. The plan adds an `ArtifactStripe` component for the reading column and an artifact slot in the right rail. |
| III. Eval & Guardrail Discipline | PASS (not triggered) | The redesign does not introduce a new AI call. Adversarial review continues to use the local `scoreArtifactAgainstRubric` keyword rubric. If a later increment swaps this for a model call, that change must trigger Promptfoo + Langfuse evals at that time. |
| IV. Bilingual & MENA-Inclusive by Default | PASS | FR-028 commits to RTL parity. The plan uses logical CSS properties (`margin-inline-start`, `padding-inline-end`) and `dir`-aware mirror behavior for the three-column shell and the module marker side. RTL is a release gate, not a follow-up. **Clarification 2026-05-26 (FR-028a):** the redesign reserves a `mena-note` callout block in the reading column for per-lesson Arabic/RTL/MENA context; content authors backfill on a per-lesson basis. |
| V. Source Integrity & Copyright Safety (NON-NEGOTIABLE) | PASS | The design bundle is our own asset from Claude Design. No external copyrighted lesson content is reproduced. Existing course copy is unchanged. |
| Quality & Engineering Constraints | PASS | Stack stays at React 19 + Vite + Vitest + ESLint. New code follows the file-length and cyclomatic-complexity ceilings in `.claude/rules/03-code-standards.md` (50-line function cap, complexity ≤ 10). The current 1,843-line `App.jsx` is *not* fully decomposed in this feature — only the learn-view branch is extracted; the rest is left in place to keep blast radius bounded. Tracked under Complexity Tracking below. |
| Workflow & Governance | PASS | Spec-driven flow followed (`/speckit-specify` → `/speckit-plan`). Conventional Commits + feature branch (`001-course-page-redesign`) already in place. Docs (`README.md`) will be updated alongside implementation per Law 14. |

**Verdict**: All gates pass. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-course-page-redesign/
├── plan.md              # This file
├── spec.md              # Feature spec
├── research.md          # Phase 0 output (this command)
├── data-model.md        # Phase 1 output (this command)
├── quickstart.md        # Phase 1 output (this command)
├── contracts/           # Phase 1 output (this command)
│   ├── progress-snapshot.schema.json
│   ├── keyboard-shortcuts.md
│   └── tool-modal-protocol.md
├── checklists/
│   └── requirements.md  # Spec quality checklist
├── assets/
│   └── design-bundle/   # Claude Design handoff (README, chats, project files)
└── tasks.md             # Phase 2 — created by /speckit-tasks (NOT this command)
```

### Source Code (repository root)

The project already uses a single-project React layout. The redesign lands inside `src/` under a dedicated `course/` namespace so existing components stay untouched:

```text
src/
├── App.jsx                          # Existing root — modified to delegate the "learn" view to CourseShell
├── main.jsx                         # Unchanged
├── App.css                          # Unchanged
├── index.css                        # Token additions for editorial-dark scope (variables only; no global redefinition)
├── course/                          # NEW — all redesign code lives here
│   ├── CourseShell.jsx              # Top-level three-column shell + header + modal portal
│   ├── shell/
│   │   ├── Header.jsx               # Wordmark + ⌘K + streak + avatar; AccountMenu inside
│   │   ├── Sidebar.jsx              # Progress meter + module list + Practice rail
│   │   ├── ReadingColumn.jsx        # Lesson title, body, callouts, ArtifactStripe, Mark-complete
│   │   ├── RightRail.jsx            # Outline (scroll-tracked), study-mode pills, lesson actions, next-due review
│   │   └── MobileChrome.jsx         # <768px: sidebar/outline toggles, collapse logic
│   ├── tools/
│   │   ├── ToolModal.jsx            # Shared modal frame (focus trap, esc-close, scroll restore)
│   │   ├── SpacedReviewModal.jsx    # Flashcard session + summary
│   │   ├── AdversarialReviewModal.jsx # Persona picker + paste/link + scored rubric
│   │   ├── CapstoneModal.jsx        # 6-milestone view + lesson gating
│   │   └── KnowledgeMapModal.jsx    # Module-grouped lesson constellation
│   ├── account/
│   │   ├── AccountMenu.jsx          # Six-item menu (Profile, Export, Import, Display, Shortcuts, Sign out)
│   │   ├── ProfileModal.jsx         # Cohort stats, bookmarks, recent completions, hidden-but-reachable audit/sources links
│   │   ├── ImportProgressModal.jsx  # Drag-drop / browse JSON
│   │   └── ShortcutsModal.jsx       # Help modal
│   ├── palette/
│   │   └── CommandPalette.jsx       # ⌘K — lessons + section headings + audit/sources hidden entries
│   ├── tweaks/
│   │   └── TweaksPanel.jsx          # Accent flip, serif/sans display swap, density toggle
│   ├── hooks/
│   │   ├── useActiveLesson.js       # Reads/writes hash, returns {moduleIndex, lessonIndex, sectionId}
│   │   ├── useScrollOutline.js      # IntersectionObserver-based outline highlight
│   │   ├── useKeyboardShortcuts.js  # Centralised shortcut layer
│   │   ├── useFocusTrap.js          # Modal a11y
│   │   └── useTweaks.js             # Tweaks state + CSS-variable application
│   ├── lib/
│   │   ├── progressSnapshot.js      # Export/import JSON with schema-version field
│   │   ├── outlineFromLesson.js     # Derive section-heading list from lesson body
│   │   ├── moduleColor.js           # 12-color module token (2px markers only)
│   │   └── designTokens.js          # Editorial-dark palette + Tweaks variants
│   └── styles/
│       ├── course.module.css        # Scoped editorial-dark styles (CSS modules — no global bleed)
│       └── tokens.css               # Custom-property scope :where(.course-shell) { ... }
│
├── components/                      # Existing — unchanged in this feature
├── data/                            # Existing — unchanged in this feature (curriculum is the source of truth)
├── utils/                           # Existing — unchanged
└── views/CourseViews.jsx            # Existing — unchanged; audit/sources/etc. still rendered via legacy routes

tests/                               # No top-level tests dir today; we keep colocated *.test.js
src/course/**/*.test.{js,jsx}        # NEW — unit + component tests colocated next to source
```

**Structure Decision**: Single-project React layout (existing). All new code lives under `src/course/` to bound blast radius. `src/App.jsx` is modified only enough to delegate the "learn" view to `<CourseShell>`; non-learn views (audit, sources, cohort, coverage, community, glossary, cheatsheets, tools, exec, live, changelog, reviews, templates, ops, capstone-legacy) continue to render via the existing branches in `App.jsx` and `src/views/CourseViews.jsx`. The redesign's Capstone *modal* is a new surface that links to the legacy `capstone` view when a learner needs the full dashboard.

## Phase 0 — Research

See [research.md](./research.md) for the consolidated record. Five clarifications landed on 2026-05-26 *after* this plan was first drafted; the docs were refreshed in Phase 8 task T073 to stay in sync:

- **R3 (palette tokens)** — accent variants are now enumerated as exactly four (`copper`, `sage`, `ink-blue`, `iron`) per FR-025.
- **R6 (perf budget)** — pinned to **Lighthouse mobile preset** (Moto G Power, 4× CPU throttle, Slow 4G) for LCP, and **gzipped per Vite chunk** for the 500 KB JS budget (SC-007).
- **R11 (NEW — reduced motion)** — `prefers-reduced-motion: reduce` is a release gate (FR-023a): all transitions zeroed, `scroll-behavior: auto`, no streak/chip animation.

Headline decisions:

1. **State integration**: extend the existing `localStorage` keying utilities; do not introduce a new state library. `CourseShell` reads the same `curriculum`, `bookmarks`, `completed`, `studyMode`, `lessonStates` that today's `App.jsx` owns — passed in as props from `App.jsx` so the learn-view rewrite does not fork persistence.
2. **Scroll-tracked outline**: `IntersectionObserver` with a top-third root margin (`-30% 0% -65% 0%`). No scroll listeners; no scroll throttling needed.
3. **Modal stack**: one-at-a-time policy (FR-016). The shared `ToolModal` mounts via a portal into `#course-modal-root`, owns focus-trap, esc-close, scroll-position save/restore.
4. **Editorial-dark palette + Tweaks**: defined as CSS custom properties scoped under `:where(.course-shell)` so global app styles are not affected. Three Tweaks knobs (accent, display-typeface, density) toggle scoped CSS variables.
5. **Module color as 2px marker only**: `moduleColor.js` returns a token that is applied to `border-inline-start` width 2px / a top sliver / dot indicator — never to a `background-color`. ESLint rule (`no-restricted-syntax`) added scoped to `src/course/` to forbid `background-color: var(--module-color-*)`.
6. **RTL parity**: all spacing uses logical properties (`margin-inline-*`, `padding-inline-*`). The sidebar lives on `inline-start`; the right rail on `inline-end`. Automatically mirrors under `dir="rtl"`.
7. **Adversarial review** continues to use the existing local `scoreArtifactAgainstRubric` — no model call, no eval gate triggered for this feature.
8. **Performance budget**: Newsreader + Geist + Geist Mono loaded with `font-display: swap` and only the weights actually used (Newsreader 400/500/600 + 400 italic; Geist 400/500/600; Geist Mono 400). Bundle audit will run in CI to confirm parsed JS < 500 KB.
9. **SC-008 "exactly 4 tools" gate**: implemented as a Vitest test that asserts `PRACTICE_TOOLS.length === 4` and that each entry is one of the four allowed ids. Plus an ESLint custom rule rejecting new entries unless the constant is renamed and the SC is updated.
10. **Build-time SVG/icon strategy**: SVG icons inline as React components (no icon-font, no remote sprite) to keep CLS predictable and the bundle in budget.

## Phase 1 — Design & Contracts

### Data model

See [data-model.md](./data-model.md). Entities: `Lesson`, `Module`, `LearnerProgress`, `ToolSession`, `CommandPaletteEntry`, `TweaksPreferences`. Validation rules and state transitions documented per entity.

### Contracts

The redesign exposes three contract surfaces:

1. **Progress snapshot JSON** (Export/Import) — schema in [`contracts/progress-snapshot.schema.json`](./contracts/progress-snapshot.schema.json). Schema-versioned for round-trip equality (SC-005) and forward compatibility.
2. **Keyboard shortcut layer** — the complete set documented in [`contracts/keyboard-shortcuts.md`](./contracts/keyboard-shortcuts.md). Treated as a contract because external users will memorize them; changes require an ADR.
3. **Tool modal protocol** — the lifecycle every `ToolModal` consumer must implement (open / close / focus / scroll-restore / aria) in [`contracts/tool-modal-protocol.md`](./contracts/tool-modal-protocol.md).

No HTTP/server API is added by this feature.

### Quickstart

See [quickstart.md](./quickstart.md). Covers: how to mount `<CourseShell>`, how to feed it curriculum + progress props, how to add a new typographic callout to the reading column, how to register a new command-palette entry without polluting the learner sidebar, how to verify the four-tool gate.

### Agent context update

`CLAUDE.md` will be updated between `<!-- SPECKIT START -->` and `<!-- SPECKIT END -->` markers (creating them if absent — current `CLAUDE.md` does not yet carry these markers; the update will add them at the bottom of the file so the rest of the Orchestra V3 doctrine is preserved verbatim).

## Re-Constitution Check (post-design)

| Principle | Post-design status | Notes |
|---|---|---|
| I. Benchmark Transparency | PASS | Command-palette and Profile modal entries for audit / sources confirmed in `CommandPalette.jsx` design. |
| II. Hands-On Artifact Bias | PASS | `ArtifactStripe` component in the reading column is part of `ReadingColumn.jsx`. |
| III. Eval & Guardrail Discipline | PASS (not triggered) | No new AI call surface added. |
| IV. Bilingual / MENA | PASS | Logical CSS properties, `dir`-aware shell, RTL parity tests in the Vitest suite. |
| V. Source Integrity | PASS | No proprietary content reproduced. |
| Quality & Engineering | PASS | New files honor 50-line / complexity-10 caps; the legacy `App.jsx` is *not* further decomposed in this feature — tracked below. |

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `src/App.jsx` remains > 200 lines (currently 1,843; will drop modestly when the learn-view branch is removed) | Blast radius. Fully decomposing `App.jsx` in the same feature that introduces a new shell would couple two large changes and make rollback impossible. | A full decomposition pass is a separate `refactor-strategist`-led follow-up after this feature ships and is verified. The constitution's file-length guidance is a target, not a release gate on `App.jsx`; the new code under `src/course/` honors the cap from day one. |
| Two coexisting course UIs during the transition (legacy `learn` branch deleted, but legacy non-learn views like `audit`, `sources`, `cohort` still render through `CourseViews.jsx`) | Those views are out of scope for this feature; folding them into the editorial-dark shell would balloon scope. | We considered routing the legacy views into the new shell with a "raw" body wrapper, but that loses the visual cleanup benefit and risks regressing audit/sources views that have their own established UX. Reachability is preserved via the command palette and the Profile modal. |

Both items are tracked, not waived. They become candidates for `/refactor-strategist` follow-up after release.

---

## Stop & Report

**Branch**: `001-course-page-redesign`

**Plan file**: `specs/001-course-page-redesign/plan.md`

**Generated artifacts**:
- `research.md` — 10 decisions with rationale + alternatives
- `data-model.md` — 6 entities with fields, relationships, validation, state transitions
- `contracts/progress-snapshot.schema.json` — Export/Import JSON schema
- `contracts/keyboard-shortcuts.md` — Documented shortcut contract
- `contracts/tool-modal-protocol.md` — Modal lifecycle protocol
- `quickstart.md` — Implementer entry point
- `CLAUDE.md` — Agent context pointer added

**Next**: `/speckit-tasks` to decompose this plan into an ordered, parallelizable task list (`tasks.md`). Optional pre-step: `/speckit-checklist` to generate quality checklists, or `/speckit-analyze` after tasks for cross-artifact consistency.
