# CLAUDE.md

Guidance for Claude (and other AI assistants) working in this repo.

## Project overview

`AI-PM-Course` is a self-serve **AI Product Management courseware web app** built with **React 19 + Vite**. It is benchmarked against the public Product Faculty / Maven AI Product Management Certification (April 11, 2026) and ships:

- 13 modules (1–12 plus the half-step `8.5` "AI-Native Mobile Delivery Systems") / 66 lessons of curriculum data
- Glossary, cheat sheets, tools lab, course map, audit, and sources views
- Lesson quizzes, applied exercises, study modes (Fast / Deep / Executive)
- Progress tracking, bookmarks, deep-link hashing, read-aloud
- Adversarial cohort simulator, knowledge graph, ROI calculator, velocity chart
- Capstone dashboard with milestone scoring and readiness bands
- Downloadable templates (AI PRD, eval rubric, rollout checklist, responsible AI audit)
- Operations starters for **Promptfoo** (evals) and **Langfuse** (observability)
- Lesson-level **freshness metadata** with CI-enforced SLA

The product is deployed to GitHub Pages at `https://beshoyageeb.github.io/AI-PM-Course` (Vite `base: '/AI-PM-Course/'`).

## Tech stack

| Layer | Tool |
|---|---|
| UI | React 19 (StrictMode), JSX, plain CSS in `src/index.css` |
| Build | Vite 8 (`@vitejs/plugin-react`) |
| Lint | ESLint 9 flat config + `react-hooks` + `react-refresh` |
| Test | Vitest 4 (`*.test.js` colocated next to source) |
| Persistence | `window.storage` if injected (host shell), else `localStorage` fallback (see `src/main.jsx`) |
| Eval ops | Promptfoo (`evals/promptfoo/`) — Gemini 2.5 Pro provider |
| Observability | Langfuse smoke test (`observability/langfuse/`) |
| Deploy | GitHub Pages via `.github/workflows/deploy-pages.yml` (only path) |

There is **no TypeScript** despite `@types/react` being present (the types ship with React 19 and are pulled in transitively). The active deploy path is `deploy-pages.yml`.

## Repo layout

```
.
├── src/
│   ├── main.jsx                 # Entry; injects window.storage localStorage fallback
│   ├── App.jsx                  # ~1.8k LOC root component (curriculum runtime)
│   ├── index.css                # Global styles, design tokens (CSS variables)
│   ├── views/CourseViews.jsx    # Top-level views (Glossary, Cheatsheets, Tools, Audit, …)
│   ├── components/              # FreshnessBadge, ReviewPanel, KnowledgeGraphView, ROICalculatorView, …
│   ├── data/                    # Curriculum + content constants (the "database")
│   │   ├── curriculum.js        # ~2.4k LOC — 10 modules × lessons (canonical source of truth)
│   │   ├── courseContent.js     # GLOSSARY, CHEATSHEETS, TOOLS, COURSE_BENCHMARK, SOURCE_LIBRARY
│   │   ├── lessonEnhancements.js, lessonMetadata.js, learningExperience.js
│   │   ├── liveBaseline.js      # LIVE_BASELINE_LAST_UPDATED — drives freshness check
│   │   ├── reviewSystem.js, reviewerPersonas.js, capstoneDashboard.js
│   │   └── *.test.js            # Vitest specs colocated with data/utils
│   └── utils/                   # freshness.js, moduleStorage.js, reviewHistory.js, velocity.js (+ tests)
├── scripts/                     # Node CLI scripts (.mjs) — freshness, RSS, promptfoo, langfuse
├── evals/promptfoo/             # promptfooconfig.yaml + prompts/{system,user}.txt
├── observability/langfuse/      # Smoke-test env + trace-event schema
├── public/                      # Static assets, templates, changelog.json, rss.xml, icons.svg
├── docs/                        # Curriculum source-of-truth, audits, specs, plans, templates
│   ├── specs/                   # Numbered feature specs (01–21+)
│   ├── plans/                   # Gap remediation and enrichment plans
│   ├── templates/               # Authoring templates (PRDs, rubrics, RACI, …)
│   └── architecture/            # persistence-modes.md, persistence-schema.md
├── projects/, capstone/         # Capstone artifacts and example prototype
├── .github/workflows/           # ci.yml, deploy-pages.yml, freshness-check.yml, labeler.yml, stale.yml
├── README.md, SWTeams.md, promptfoo.md
├── vite.config.js, eslint.config.js, package.json, .env.example
```

## Development workflow

```bash
npm install
npm run dev          # Vite dev server (default http://localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Preview the production build
npm run lint         # ESLint
npm test             # Vitest one-shot
npm run test:watch   # Vitest watch mode
```

### Operations scripts

```bash
npm run check:freshness              # Validates LIVE_BASELINE_LAST_UPDATED + lesson lastVerified metadata
npm run freshness:sweep              # Writes docs/freshness-report.md
npm run rss:generate                 # Updates public/rss.xml from public/changelog.json
npm run promptfoo:login              # Authenticates Promptfoo CLI (needs PROMPTFOO_API_KEY)
npm run eval:promptfoo               # Runs the baseline eval suite (needs PROMPTFOO_API_KEY + GOOGLE/GEMINI key)
npm run observability:langfuse:smoke # Posts a sample trace (needs LANGFUSE_* env vars)
```

Deployment runs automatically from `main` via `.github/workflows/deploy-pages.yml`; there is no manual `npm run deploy` script.

Env vars live in `.env` (gitignored). Copy `.env.example` to start. Scripts load env via `scripts/env-loader.mjs`. Never commit raw API keys (see `promptfoo.md`).

### Testing conventions

- Tests are **colocated** with source: `foo.js` ↔ `foo.test.js`.
- Use Vitest's `describe` / `it` / `expect`.
- Pure-function utilities in `src/utils/` are the easiest target for new tests.
- There is **no jsdom/component test setup** wired in by default — keep tests at the data/utility layer unless you add the harness yourself.

## Key conventions

### Curriculum data is the source of truth

`src/data/curriculum.js` is the canonical curriculum. Each lesson follows roughly:

```js
{
  id: "1.1", title: "...", type: "concept" | "framework" | "technical" | "systems",
  content: "...markdown-flavored string with **bold** sections and tables...",
  quiz: { q: "...", a: "..." },
  apply: "Self-audit / exercise prompt with artifact path.",
  keys: ["Key takeaway 1", "..."],
  meta: {
    sources: [...],
    lastVerified: "YYYY-QN" | "YYYY-MM-DD",  // drives freshness badge
    artifact: "/docs/.../output.md",
    rubric: [...],
    failureModes: [...],
    redTeam: [...],
  }
}
```

`src/data/lessonMetadata.js` (`buildLessonMetadata`) provides defaults by `lesson.type` and merges with per-lesson `meta`. `src/data/lessonEnhancements.js` overlays leadership notes, tooling labs, etc., keyed by lesson id.

### Freshness system

- `LIVE_BASELINE_LAST_UPDATED` in `src/data/liveBaseline.js` gates the whole baseline; `npm run check:freshness` fails CI if it exceeds `FRESHNESS_SLA_DAYS` (default 30).
- Per-lesson freshness is computed by `src/utils/freshness.js` from `meta.lastVerified` and `meta.freshnessWindow` (default 180 days). Statuses: `fresh` / `aging` / `stale` / `unverified` / `invalid`.
- Up to `FRESHNESS_MAX_MISSING_LAST_VERIFIED` lessons (default 49 locally, also enforced in `freshness-check.yml`) may lack `lastVerified` before the check fails.
- When you change curriculum content, **bump `lastVerified`** on touched lessons and consider updating `LIVE_BASELINE_LAST_UPDATED` if you re-baselined live model/tool guidance.

### Persistence + module storage

- `src/main.jsx` provides a `localStorage`-backed `window.storage` fallback when the host shell does not inject one.
- `src/utils/moduleStorage.js` migrates legacy keys (notably module `8.5` → slug `8-5`). Always go through `buildLessonStorageKey` / `buildReviewStorageKey` / `buildCohortStorageKey` instead of constructing keys ad hoc.
- See `docs/architecture/persistence-modes.md` and `persistence-schema.md` for the storage contract.

### Component / view split

- **Top-level views** (Glossary, Cheatsheets, Tools, Audit, Sources, Live, Reviews, Cohort, Coverage, Outline, CommunityOps, TemplateDownloads, OpsStarter, CapstoneDashboard) live in `src/views/CourseViews.jsx`.
- **Reusable widgets** (FreshnessBadge, UpdatedBadge, ReviewPanel, ChangelogView, FailureCaseView, KnowledgeGraphView, ROICalculatorView, VelocityChart) live in `src/components/`.
- The lesson player and most navigation logic still lives inline in `src/App.jsx`. `docs/course-audit.md` lists "break up App.jsx" as recommended future work — be prepared for new code to land there until that refactor happens.

### ESLint

Flat config in `eslint.config.js`. Notable rules:

- `globalIgnores`: `dist`, `.agent/**`, `.agents/**`, `.claude/**`.
- `no-unused-vars`: error, but **vars matching `^[A-Z_]` are allowed** (lets you keep imports of constants/components that are referenced via dynamic dispatch).
- React hooks + `react-refresh/vite` rules are on.

### CSS / styling

- Plain CSS in `src/index.css` with CSS custom properties (`--text-primary`, `--border-light`, etc.). No Tailwind, no CSS-in-JS, no PostCSS plugins beyond Vite defaults.
- Inline styles are used liberally throughout views (intentional, matches the existing pattern). Match the existing palette via the design tokens.

## CI / CD

| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | PR / push to `main` | Lint, test, freshness check, build |
| `deploy-pages.yml` | Push to `main`, manual | Builds `dist/`, uploads as Pages artifact, deploys to GitHub Pages |
| `freshness-check.yml` | Weekly cron (`Mon 08:00 UTC`), manual | Runs `check:freshness`, `freshness:sweep`, `rss:generate`, uploads artifacts |
| `labeler.yml`, `stale.yml` | Misc | Issue/PR housekeeping |

## Common tasks

### Add or update a lesson

1. Edit `src/data/curriculum.js` (find module by `id`/`module`, edit the `lessons` array).
2. Update `meta.lastVerified` to today's date.
3. If it adds a tooling lab or leadership note, add an entry in `src/data/lessonEnhancements.js` keyed by lesson id.
4. Run `npm run check:freshness` and `npm test`.

### Add a new top-level view

1. Add the component to `src/views/CourseViews.jsx` and export it.
2. Wire navigation from `src/App.jsx` (search for existing view hooks like `OutlineView` or `CapstoneDashboardView`).
3. Use `buildLessonStorageKey` / friends if it persists state.

### Add a downloadable template

Drop the markdown file into `public/templates/` and reference it from `TemplateDownloadsView` in `src/views/CourseViews.jsx`. Static files in `public/` are served from the Vite base path.

### Update the changelog feed

Edit `public/changelog.json`, then run `npm run rss:generate` to refresh `public/rss.xml`. The `ChangelogView` component renders from `src/data/changelog.js` (in-app) — keep both in sync if the entry is user-facing.

### Run an eval

1. Set `PROMPTFOO_API_KEY` and `GOOGLE_API_KEY` (or `GEMINI_API_KEY`) in `.env`.
2. `npm run promptfoo:login` once.
3. `npm run eval:promptfoo` — config at `evals/promptfoo/promptfooconfig.yaml`, prompts at `evals/promptfoo/prompts/`.

## Conventions for AI assistants

- **Prefer editing existing files over creating new ones.** The repo has many overlapping markdown specs/plans in `docs/` — read before adding.
- **Curriculum changes touch `src/data/curriculum.js`**, not `src/App.jsx`. The runtime reads from data; do not inline new lesson content into the component tree.
- **Bump `lastVerified` whenever you edit a lesson's content or `meta`.** Stale entries break the freshness check.
- **Storage keys go through `moduleStorage.js` helpers** to inherit the `8.5 → 8-5` migration. Do not hand-build keys.
- **Don't introduce TypeScript** in this repo. Files are `.js` / `.jsx`. The `tsc` step in `ci.yml` is a leftover from a generic CI template.
- **Don't add Tailwind / styled-components / a UI kit.** Match the existing CSS-tokens-and-inline-styles pattern.
- **Don't commit secrets.** `.env*` is gitignored except `.env.example`. `promptfoo.md` documents how a token leak was scrubbed — keep that policy.
- **CI** is `ci.yml` (lint + test + freshness + build) and `deploy-pages.yml` (deploy on `main`). Both are tailored to this stack — no generic templates remain.
- **Heavy files to be aware of when grepping:** `src/App.jsx` (~1.8k), `src/views/CourseViews.jsx` (~930), `src/data/curriculum.js` (~2.4k), `src/data/lessonEnhancements.js` (~530), `docs/UNIFIED_AI_PM_CURRICULUM.md` (~390kB).
- **CLAUDE.md, AGENTS.md, GEMINI.md, and CLAUDE_MANIFEST.md are gitignored** by `.gitignore`. To track this file, force-add it (`git add -f CLAUDE.md`) — that is the intended pattern for the `claude/add-claude-documentation-*` branch.

## Useful entry points

- `src/App.jsx:1-80` — imports and the high-level data wiring.
- `src/data/curriculum.js:1` — module/lesson schema in action.
- `src/utils/freshness.js:31` — `getFreshnessBadgeData` (the one function freshness flows through).
- `scripts/check-freshness.mjs` — what CI actually runs to gate freshness.
- `docs/course-audit.md` — current gap analysis vs. the benchmark course.
- `docs/specs/README.md` — index of numbered feature specs (gap-remediation roadmap).
