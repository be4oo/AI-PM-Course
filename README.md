# AI PM Course

Applied AI Product Management courseware and product experience built in React.

## Goal

This project is designed to match and exceed the practical value of the public-facing Product Faculty / Maven AI Product Management Certification by:

- translating concepts into a self-serve product experience
- pushing harder on hands-on artifacts, evals, guardrails, and capstone delivery
- adding multilingual and MENA-specific considerations
- making the benchmark, audit criteria, and source transparency visible inside the product

## What is in the app

- 10 modules
- 21 lessons
- glossary, cheat sheets, tools lab, course map
- lesson quizzes and applied exercises
- progress tracking and bookmarks
- audit view benchmarked against the target course
- source library with verification notes
- external community ops board (facilitator + reviewer assignments + links)
- capstone dashboard with milestone scoring and readiness bands
- downloadable templates (AI PRD, eval rubric, rollout checklist, responsible AI audit)
- starter ops kits for Promptfoo + Langfuse + freshness checks

## Course shell (editorial-dark redesign)

The course reading experience runs through `src/course/`, an editorial-dark
three-column shell built spec-first under
[`specs/001-course-page-redesign/`](specs/001-course-page-redesign/).
Highlights:

- **Tweaks panel** — four enumerated accent variants (`copper`, `sage`, `ink-blue`, `iron`), two display typefaces (serif / sans), two density modes (roomy / compact). All four accents are gated for WCAG 2.1 AA contrast at release.
- **Keyboard contract** — documented in [`specs/001-course-page-redesign/contracts/keyboard-shortcuts.md`](specs/001-course-page-redesign/contracts/keyboard-shortcuts.md). `⌘K` palette, `?` help, `b` bookmark, `j` / `k` next/prev lesson, `e` / `q` toggle Practice/Self-test, `r` Adversarial review, `Esc` close topmost modal.
- **Single-modal invariant (FR-016)** — every Practice tool, account modal, and the command palette share the `ToolModal` frame; only one is ever in the DOM.
- **Reduced motion** — `prefers-reduced-motion: reduce` is a release gate; transitions zeroed, smooth-scroll downgraded to instant.
- **RTL parity** — every shell rule uses CSS logical properties; Arabic content can be flagged per-lesson via the `mena-note` callout.

Read [`specs/001-course-page-redesign/quickstart.md`](specs/001-course-page-redesign/quickstart.md) for implementer entry points.

### Release gates

Per-commit gates (run automatically by `npm run build`):

```bash
npm run lint              # ESLint flat config (incl. R4 module-color guard scoped to src/course/**)
npm test                  # Full vitest suite — 300+ tests across course shell + legacy
npm run test:course       # Just the course-shell tests (jsdom env)
npm run build             # Vite build → postbuild runs scripts/check-bundle.mjs (500 KB gzipped per chunk)
```

Release-readiness gates (require a built artifact + a server):

```bash
npm run build && npm run preview &           # Serve production build on :4173
npm run perf:lighthouse                      # Lighthouse mobile preset; LCP < 2.5s
```

## What changed in this repo

- replaced the default Vite README with project documentation
- added a course audit in [`docs/course-audit.md`](/Users/beshoyageeb/Desktop/Beshoy/AI X Me/AI-PM-Course/docs/course-audit.md)
- enriched the app with benchmark, source, and artifact-oriented learning scaffolding

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Operations starters

```bash
npm run promptfoo:login
npm run check:freshness
npm run eval:promptfoo
npm run observability:langfuse:smoke
```

## Benchmark note

The course benchmark in this repo was aligned against the public Product Faculty / Maven AI Product Management Certification pages available on April 11, 2026. Public marketing pages were used only to calibrate scope and positioning, not to reproduce proprietary lesson content verbatim.
