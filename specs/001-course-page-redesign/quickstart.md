# Quickstart — Editorial-Dark Course Page Redesign

**Feature**: 001-course-page-redesign
**For**: implementers picking up this feature from `tasks.md`.

This is the *implementer's* entry point — it tells you where the seams are, how `CourseShell` plugs into the existing app, and how to verify the constitutional gates before you push.

---

## 0. Where the design lives

```text
specs/001-course-page-redesign/
├── spec.md                      # WHAT and WHY
├── plan.md                      # HOW (structure, decisions)
├── research.md                  # 10 decisions + rationale
├── data-model.md                # entity shapes + storage keys
├── contracts/                   # 3 contracts (snapshot schema, shortcuts, modal protocol)
└── assets/design-bundle/        # Claude Design handoff (authoritative visual source)
    ├── README.md                # READ THIS first
    ├── chats/chat1.md           # designer's reasoning — read second
    └── project/                 # course.html, course.css, *.jsx, screenshots
```

Read order on first dive: `assets/design-bundle/README.md` → `assets/design-bundle/chats/chat1.md` → `spec.md` → `plan.md` → `research.md` → `data-model.md` → `contracts/*` → start writing code under `src/course/`.

---

## 1. Where the new code goes

```text
src/course/                       # ALL new code for this feature
├── CourseShell.jsx               # Mount point
├── shell/{Header,Sidebar,ReadingColumn,RightRail,MobileChrome}.jsx
├── tools/{ToolModal,SpacedReviewModal,AdversarialReviewModal,CapstoneModal,KnowledgeMapModal}.jsx
├── tools/practiceTools.js        # Frozen tool registry — protected by R10 test
├── account/{AccountMenu,ProfileModal,ImportProgressModal,ShortcutsModal}.jsx
├── palette/CommandPalette.jsx
├── tweaks/TweaksPanel.jsx
├── hooks/{useActiveLesson,useScrollOutline,useKeyboardShortcuts,useFocusTrap,useTweaks}.js
├── lib/{progressSnapshot,outlineFromLesson,moduleColor,designTokens,adversarialScoring}.js
└── styles/{course.module.css,tokens.css}
```

Tests are colocated as `*.test.{js,jsx}`.

---

## 2. How `CourseShell` mounts into the existing app

`src/App.jsx` currently switches on `view`:

```jsx
{view === "learn" && (
  /* 800+ lines of inline JSX rendering the legacy course layout */
)}
{view === "audit"  && <AuditView  ... />}
{view === "sources" && <SourcesView ... />}
/* ...more legacy views... */
```

The redesign replaces the `view === "learn"` branch only:

```jsx
{view === "learn" && (
  <CourseShell
    curriculum={curriculum}
    activeMod={activeMod}
    activeLesson={activeLesson}
    onNavigateLesson={navigateToLesson}
    completed={completed}
    setCompleted={setCompleted}
    bookmarks={bookmarks}
    setBookmarks={setBookmarks}
    studyMode={studyMode}
    setStudyMode={setStudyMode}
    /* ...progress-related state passed straight through... */
    openLegacyView={setView}      /* command-palette → audit/sources/etc. */
  />
)}
{/* all other view === "..." branches unchanged */}
```

The legacy state (`completed`, `bookmarks`, `studyMode`, etc.) flows in as props. `CourseShell` does **not** own persistence in v1 — it reads/writes the existing setters. A follow-up refactor can pull persistence into `course/` once the shell is stable.

---

## 3. Adding a new typographic callout to the reading column

**Canonical example: the `mena-note` callout** (FR-028a). It carries an
optional `dir` and `lang` so Arabic content nested inside an LTR shell
renders correctly. The renderer uses a `border-inline-start` rule + the
copper accent — never a background fill — and surfaces a `data-testid`
for the regression test.

Steps for adding a new kind:

1. Add a new block kind to the `RichContent` discriminated union in `data-model.md`.
2. Add a renderer in `ReadingColumn.jsx`'s switch — follow the `mena-note` shape:
   - Use a typographic treatment (italic, border-inline-start, indent) — never a fill.
   - Carry through any locale-relevant attributes (`dir`, `lang`).
   - Add a `data-testid` so the regression test can find it.
3. Verify lint rule R4 rejects any accidental `background-color: var(--module-*)` usage.
4. Add a test under `src/course/shell/ReadingColumn.test.jsx` mirroring the existing `mena-note` tests:
   - Renders when supplied.
   - Absent when not supplied (no empty container).
   - Any attributes (dir/lang) propagate.

---

## 4. Adding a new command-palette entry

- **Lesson / section entries**: automatic — derived from `curriculum`. Nothing to do.
- **View entry** (audit, sources, etc.): add to `LEGACY_VIEW_PALETTE_ENTRIES` in `src/course/palette/CommandPalette.jsx`. These are only surfaced when the user query starts with `>` (R7). This is the *intended* path for keeping Benchmark Transparency (Principle I) without dragging audit/sources back into the learner sidebar.

If you find yourself wanting to add a learner-facing entry that is NOT a lesson or a section, stop and re-read Principle I. The likely answer is "add it as a `>` view entry."

---

## 5. Adding a new Practice tool

**Don't, in this feature.** SC-008 caps the rail at 4 and the test in `src/course/tools/practiceTools.test.js` will fail your build.

If a future feature needs a fifth tool:
1. Open `.specify/memory/constitution.md` and either amend Principle II's scope or document an exception in `docs/exceptions.md` with a time bound.
2. Add to `PRACTICE_TOOLS` in `practiceTools.js`.
3. Update the four-tool test to the new count and the new id list.
4. Bump the constitution to MINOR (added scope).

---

## 6. Constitutional gates — run before every push

```bash
npm run lint                 # ESLint flat config, includes R4 module-color rule
npm run test:course          # Vitest scoped to src/course + src/test-utils (uses jsdom env)
npm test                     # Full suite (legacy + course)
npm run build                # Vite build (postbuild runs check-bundle automatically)
npm run check:bundle         # Standalone bundle audit (gzipped per Vite chunk, 500 KB ceiling per SC-007)
```

### Release-readiness gates

These run at release, not per-commit (they need a built artifact + a server):

```bash
npm run build && npm run preview &           # Serve production build on :4173
npm run perf:lighthouse                       # Lighthouse mobile preset; asserts LCP < 2.5s (SC-007)
```

### Per-variant contrast evidence (SC-006)

`src/course/styles/contrast.test.jsx` runs as part of `npm test` and
asserts WCAG 2.1 AA contrast for each of the four enumerated Tweaks
accents against `--bg` and `--bg-elev`. The build fails if any variant
drops under the floor. Adding a fifth accent requires:

1. Amending spec FR-025 (currently forbids that).
2. Extending `ACCENT_VARIANTS` in `src/course/lib/designTokens.js`.
3. The contrast test iterates `ACCENT_VARIANT_IDS` automatically — no
   test edit needed, but a new variant could fail and that's the gate.

A11y spot-check (manual, until automated):
- Tab through the shell — focus rings visible at every stop, on near-black with the copper accent.
- Open each Practice tool — `Esc` closes it and returns focus to the trigger.
- Switch the page to `dir="rtl"` via devtools — sidebar moves to inline-end, module marker mirrors.

---

## 7. What "done" looks like for this feature

- `view === "learn"` renders the editorial-dark shell.
- All four Practice tools open as modals from the sidebar AND from their respective shortcuts where defined.
- The `⌘K` palette finds lessons by title and section heading, and finds audit/sources/etc. only after a `>` prefix.
- Export → save JSON → Import → state is identical (SC-005).
- Lint, test, build, bundle-audit all green.
- `CLAUDE.md` carries a `<!-- SPECKIT START -->` … `<!-- SPECKIT END -->` block pointing at this plan.
- The audit, sources, cohort, coverage, community, glossary, cheatsheets, tools, exec, live, changelog, reviews, templates, ops views still load when reached from the command palette — they have not been deleted.

---

## 8. Out of scope (don't try to do this here)

- Decomposing `src/App.jsx` beyond replacing the learn branch. The 1,843-line monolith is tracked in `plan.md` → Complexity Tracking; it gets its own `/refactor-strategist` follow-up.
- Replacing the Adversarial review scorer with an LLM call. Would trigger Principle III (Eval & Guardrail Discipline) and add Promptfoo + Langfuse eval work. Out of scope.
- Removing or rewriting the legacy non-learn views.
- Multi-account / server-side sync.
- A new build tool or CSS framework.
