# Phase 0 — Research: Editorial-Dark Course Page Redesign

**Feature**: 001-course-page-redesign
**Date**: 2026-05-26

Headline: the design bundle already encodes most decisions. Research here resolves the *integration* questions between the bundle's prototype and the existing React 19 + Vite app, and codifies the build-time guardrails that protect the redesign's principles (single accent, four tools only, RTL parity, performance budget).

---

## R1 — Modal portal & focus management

**Decision**: Use a single React portal mounted at `#course-modal-root` (sibling of `#root`). The shared `<ToolModal>` owns: backdrop click, `Esc` close, focus trap on open, focus restore on close, and reading-column scroll-position save/restore.

**Rationale**:
- React 19 still routes events through the React tree even with portals, so keyboard handlers stay co-located with shell logic.
- A single portal node enforces FR-016 (only one modal at a time) at the DOM level.
- Saves scroll position on the `.course-reading-column` element only, not on `document` — avoids cross-app interference with `App.jsx`'s scroll-to-top handlers.

**Alternatives considered**:
- `<dialog>` element with the native top layer: rejected because Safari support for `showModal` styling controls is uneven for our visual fidelity, and the focus-trap behavior of `<dialog>` does not let us scroll-restore reliably.
- Per-tool ad-hoc modals: rejected because it makes FR-016 a convention rather than an invariant.

---

## R2 — Scroll-tracked outline (right rail)

**Decision**: `IntersectionObserver` with `rootMargin: "-30% 0% -65% 0%"` and `threshold: 0`. The currently-highlighted section is "the section whose heading is most recently above the top-third line." Implemented in `useScrollOutline.js`.

**Rationale**:
- No scroll listeners → no rAF throttling, no jank.
- Hits the 200ms acceptance bound in US1 #2 trivially.
- The asymmetric rootMargin (`-30%` top, `-65%` bottom) gives a single active section even when multiple short sections are visible.

**Alternatives considered**:
- Manual `scroll` listener + `requestAnimationFrame`: more code, more failure modes, no benefit.
- Scroll-snap-anchored sections: rejected — fights with the editorial reading flow.

---

## R3 — Editorial-dark palette & Tweaks panel

**Decision**: Tokens defined as CSS custom properties under `:where(.course-shell)` in `src/course/styles/tokens.css`. Tweaks toggles flip the values of those properties at runtime via `useTweaks` (writes to `data-` attributes on the shell root). Persisted in `localStorage` under `course/tweaks/v1`.

**Rationale**:
- Scoped to `.course-shell` so legacy views (audit, sources, etc.) inherit nothing from the editorial palette.
- Custom properties cascade naturally to child CSS-modules.
- `:where(...)` keeps specificity at 0 so individual components can override cleanly.

**Tokens (minimum set, taken from the design bundle's `course.css`):**

```css
:where(.course-shell) {
  --bg: #0e0d0b;          /* near-black */
  --bg-elev: #161412;     /* elevated surface (modal, palette) */
  --ink: #ece7d8;         /* warm cream — body */
  --ink-dim: #b6ad97;     /* secondary text */
  --rule: #2a2622;        /* hairline */
  --accent: #c98a4b;      /* copper (Tweaks-swappable) */
  --serif: 'Newsreader', ui-serif, Georgia, serif;
  --sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --mono: 'Geist Mono', ui-monospace, SFMono-Regular, monospace;
  --column: 68ch;
  --density-y: 1.5rem;    /* roomy default; compact ⇒ 1rem */
}
```

Tweaks variants (frozen per spec FR-025 — clarified 2026-05-26):
- Accent: exactly four enumerated variants — `copper` (default), `sage`, `ink-blue`, `iron`. Adding a fifth requires a spec amendment AND a corresponding update to the per-variant contrast evidence (FR-021 / SC-006).
- Display: `serif` (Newsreader) or `sans` (Geist).
- Density: `roomy` (default) or `compact`.

Per-variant contrast evidence (SC-006) is captured by an automated test
suite (`src/course/styles/contrast.test.jsx`) that asserts WCAG 2.1 AA
ratios for each accent against `--bg` and `--bg-elev`. The build fails if
any variant drops under the floor.

**Alternatives considered**:
- Tailwind: rejected — project already uses plain CSS + small CSS-module surface; introducing Tailwind purely for this feature triples bundle audit complexity.
- Inline-styles: rejected — defeats the Tweaks-live-swap design.

---

## R4 — Module color as 2px marker only (lint-enforced)

**Decision**: `moduleColor(moduleId)` returns a token from a fixed 12-color palette. The token is only allowed in `border-inline-start`, `border-block-start`, `outline-color`, and SVG `stroke`. An ESLint rule (`no-restricted-syntax`, scoped via `overrides` to `src/course/**`) rejects `background-color: var(--module-*)` and equivalent property names.

**Rationale**: FR-004 makes this a release gate. A lint rule converts the rule from a code-review convention into a build-time invariant.

**Alternatives considered**:
- Code review only: rejected — drift is inevitable.
- A custom Stylelint rule: viable but heavier; ESLint flat-config already in the project.

---

## R5 — RTL parity strategy

**Decision**: All shell + reading-column spacing uses CSS logical properties (`margin-inline-*`, `padding-inline-*`, `border-inline-start`, `inset-inline-end`). The shell root sets `dir` from the existing app's `document.documentElement.dir`. Module markers reference `border-inline-start` rather than `border-left`. A Vitest snapshot test renders the shell under both `dir="ltr"` and `dir="rtl"` and asserts mirror behavior for sidebar, right rail, and module marker side.

**Rationale**: FR-028 commits to RTL parity. Logical properties are the cheapest way to honor that without per-rule conditionals.

**Alternatives considered**:
- Conditional class names: rejected — every component would need awareness; logical props handle it once.
- Separate RTL stylesheet: rejected — duplication.

---

## R6 — Font loading & performance budget

**Decision (clarified 2026-05-26)**:
- Self-host? **No** — use Google Fonts CSS endpoint (current prototype) but with `font-display: swap` and `&display=swap` already in the URL.
- Weights actually used: Newsreader 400, 500, 600, italic 400. Geist 400, 500, 600. Geist Mono 400.
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` in `index.html`.
- Bundle audit: `vite build` then `node scripts/check-bundle.mjs` walks `dist/assets/` and fails if any individual JS chunk exceeds **500 KB gzipped**. The route-level chunk for the course shell is the target. (SC-007 + Clarification §1.)
- LCP target: **< 2.5s** under the **Lighthouse mobile preset** (Moto G Power emulation, 4× CPU throttle, Slow 4G). Captured by `scripts/lighthouse-mobile.mjs` (run as `npm run perf:lighthouse`). Required at release; not gated per-commit. (Clarification §4.)

**Rationale**: Matches the SC-007 budget. Google Fonts CDN is already in the prototype and in production; self-hosting would add build complexity without budget proof.

**Alternatives considered**:
- Self-hosting fonts: deferred. Adds tooling; the swap behavior already protects CLS.
- Loading only Newsreader (skip Geist): rejected — sans body is part of the design language.

---

## R7 — Command palette index

**Decision**: Index built at runtime from `curriculum` (already imported). Entries:
- One per lesson — `{ kind: "lesson", lessonId, moduleId, label }`.
- One per section heading per lesson — `{ kind: "section", lessonId, sectionId, label }`.
- Hidden / unindexed entries for `audit`, `sources`, `changelog`, `cohort`, `coverage`, `community`, `tools`, `glossary`, `cheatsheets`, `exec`, `live`, `reviews`, `templates`, `ops`. These match only when the query starts with `>` (Linear-style command prefix), to keep the default search list scoped to lessons but keep the audit/sources surfaces reachable in one keystroke.

**Rationale**:
- Lesson-first search is what learners need.
- The `>` prefix keeps Benchmark Transparency (Constitution Principle I) satisfied without bloating the default search list.

**Alternatives considered**:
- Always-on global search: rejected — drags the audit views back into the learner attention surface.
- Hide audit/sources entirely: rejected — violates Principle I.

---

## R8 — Adversarial review: keep local scorer

**Decision**: The new `AdversarialReviewModal` continues to call the existing `scoreArtifactAgainstRubric(text, personaId)` and `resolveArtifactContent(submission)` from `src/App.jsx` (extracted into `src/course/lib/adversarialScoring.js` for reuse without circular import).

**Rationale**:
- The redesign is a UI refactor, not a model change.
- Constitution Principle III (Eval & Guardrail Discipline) is not triggered because no new AI call is introduced.
- If a later increment swaps the keyword rubric for an LLM call, that change triggers Promptfoo + Langfuse evals at that time.

**Alternatives considered**:
- Replace scorer with a model call: out of scope; documented for a future feature.

---

## R9 — Progress snapshot schema versioning

**Decision**: Export JSON shape:

```json
{
  "schema": "course-progress/v1",
  "exportedAt": "2026-05-26T11:30:00.000Z",
  "completedLessonIds": ["m1-l1", "m1-l2"],
  "bookmarkedLessonIds": ["m2-l3"],
  "lastReadLessonId": "m2-l3",
  "studyMode": "deep",
  "tweaks": { "accent": "copper", "display": "serif", "density": "roomy" },
  "streak": { "current": 11, "best": 11, "lastReadDate": "2026-05-26" }
}
```

- `schema` field gates forward compatibility: unknown major versions reject; same major with extra fields accepted.
- Unknown lesson IDs on import: counted, reported in the import summary, dropped silently from state.

**Rationale**: SC-005 requires 100% round-trip fidelity; a schema version is the only honest way to guarantee that across future shape changes.

**Alternatives considered**:
- Unversioned blob: rejected — future-hostile.
- Server-side migration: out of scope, no backend.

---

## R10 — Build-time gate for "exactly 4 tools" (SC-008)

**Decision**: A frozen constant in `src/course/tools/practiceTools.js`:

```js
export const PRACTICE_TOOLS = Object.freeze([
  { id: "spaced-review",      label: "Spaced review",      Component: SpacedReviewModal },
  { id: "adversarial-review", label: "Adversarial review", Component: AdversarialReviewModal },
  { id: "capstone",           label: "Capstone",           Component: CapstoneModal },
  { id: "knowledge-map",      label: "Knowledge map",      Component: KnowledgeMapModal },
]);
```

Vitest test:

```js
test("practice rail contains exactly four tools", () => {
  expect(PRACTICE_TOOLS).toHaveLength(4);
  expect(PRACTICE_TOOLS.map(t => t.id).sort()).toEqual([
    "adversarial-review", "capstone", "knowledge-map", "spaced-review",
  ]);
});
```

**Rationale**: SC-008 turns this into a release gate. The test fails the build if a fifth tool is added without a deliberate constitution-aligned amendment to the test.

**Alternatives considered**:
- Comment in code: rejected — drifts.
- Runtime warning: rejected — already-shipped is too late.

---

## R11 — `prefers-reduced-motion: reduce` strategy

**Decision (added 2026-05-26 after clarify Q3)**: Honor the media query
across **every** animated surface under `.course-shell`. Two layers:

1. **CSS layer** — a single `@media (prefers-reduced-motion: reduce)` block
   in `src/course/styles/course.module.css` zeroes `transition-duration`
   and `animation-duration` for every descendant (`!important`) and sets
   `scroll-behavior: auto`. The block is scoped to `.shell` (the
   CSS-module class applied alongside `.course-shell`) so it never affects
   legacy views.

2. **JS layer** — `scrollToSection(id)` reads `matchMedia('(prefers-reduced-motion: reduce)').matches`
   and downgrades `scrollIntoView({ behavior: "smooth" })` to `"auto"` when
   the user opts out. The same downgrade applies to any future
   programmatic scroll (palette navigation, capstone gating links, etc.).

**Test obligations**:
- `src/course/styles/reducedMotion.test.jsx` parses the CSS source and
  asserts the `@media` block exists, contains zero-duration declarations
  with `!important`, and forces `scroll-behavior: auto`. Also exercises
  `scrollToSection` under `matchMedia` returning `matches: true`.

**Rationale**: FR-023a is a release gate, not a polish item. Putting the
contract in CSS (declarative, browser-honoured) and JS (the smooth-scroll
helper) closes both paths. The CSS-source test is more robust than a
computed-style snapshot because jsdom doesn't run layout.

**Alternatives considered**: Per-component opt-in (e.g., a `useReducedMotion()` hook used
inside every transition consumer). Rejected — the universal `@media`
block can't be bypassed accidentally, while a hook can be forgotten.

---

## Open questions

None. All `[NEEDS CLARIFICATION]` markers from the spec are resolved or were never introduced.
