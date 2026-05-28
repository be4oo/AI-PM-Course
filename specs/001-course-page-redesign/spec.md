# Feature Specification: Editorial-Dark Course Page Redesign

**Feature Branch**: `001-course-page-redesign`

**Created**: 2026-05-26

**Status**: Draft

**Input**: User description: "Fetch this design file, read its readme, and implement the relevant aspects of the design. https://api.anthropic.com/v1/design/h/SI7qka2Dz0hynzVw3zgCJA?open_file=course.html — Implement: course.html"

**Design source of truth**: A handoff bundle from Claude Design has been
extracted to `specs/001-course-page-redesign/assets/design-bundle/`. The
canonical design intent lives in `assets/design-bundle/chats/chat1.md` (the
designer's reasoning) and `assets/design-bundle/project/course.html`,
`course.css`, `data.jsx`, `components.jsx`, `app.jsx`, `tweaks-panel.jsx`.
The visual target is *Editorial dark — "The Economist meets Linear"*: a
reading-first course experience with warm cream type on near-black, a
single copper accent, serif display titles, and calm sans body.

## Clarifications

### Session 2026-05-26

- Q: How should SC-007's 500 KB JavaScript budget be measured by the CI gate? → A: Gzipped, per emitted Vite chunk.
- Q: How should contrast compliance be specified across the Tweaks accent variants? → A: Enumerate four accents (copper, sage, ink-blue, iron); WCAG 2.1 AA required per-variant on body text, interactive boundary, and focus ring, with per-variant test evidence.
- Q: How should the redesign handle `prefers-reduced-motion: reduce`? → A: Honor it everywhere — all animations disabled (modal open/close, scroll, sidebar collapse, streak/chip).
- Q: What's the reference device/network profile for LCP < 2.5s in SC-007? → A: Lighthouse mobile preset (Moto G Power emulation, 4× CPU throttle, Slow 4G).
- Q: How should the redesign address the constitution's MENA/RTL per-lesson callout requirement? → A: Reserve a `mena-note` callout slot in the reading column, render only when a lesson supplies the field; content team backfills over time.
- Note (post-analyze, 2026-05-26): Five MEDIUM underspecification items surfaced by `/speckit-analyze` were resolved by edit, not by question: FR-018 now lists `streak`; FR-019 specifies RTL reading-order semantics; FR-022 specifies focus-ring contrast (≥ 3:1) and minimum stroke (2px) per accent; FR-024 defines the 768–1023px two-column layout; FR-026 specifies multi-artifact ordering and empty-state behavior.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Read a lesson in a focused editorial layout (Priority: P1)

A learner opens the course page, picks a lesson from the left sidebar, and
reads it in a calm, reading-first layout. The middle column shows the
lesson body with a serif title and restrained typographic callouts
(Takeaways, Leadership note, Case study) instead of stacked colored boxes.
The right rail shows an "on this lesson" outline that tracks scroll
position, study-mode pills (Skim / Deep / Exec), and a "next due review"
prompt. Module color shows only as a thin 2px marker — never as a fill.

**Why this priority**: This is the core learner job. If a learner can open
a lesson and read it cleanly with working navigation and outline tracking,
the redesign already delivers the bulk of its value. Every other surface
is supporting.

**Independent Test**: Loading the course page, selecting a lesson from the
sidebar, scrolling the reading column, and observing that (a) the right
rail outline highlights the current section, (b) module color appears only
as a 2px marker, and (c) no colored callout boxes appear — only
typographic treatments.

**Acceptance Scenarios**:

1. **Given** the course page is loaded for the first time, **When** the
   learner does nothing, **Then** the first lesson of the first incomplete
   module is shown in the reading column with a serif title, calm sans
   body, and the right-rail outline populated from that lesson's section
   headings.
2. **Given** a learner is reading a lesson, **When** they scroll past a
   section heading, **Then** the matching item in the right-rail outline
   becomes the highlighted "current section" within 200ms of the heading
   crossing the viewport's top third.
3. **Given** a learner clicks a lesson in the sidebar, **When** the lesson
   loads, **Then** the reading column scrolls to the top, the outline
   refreshes to that lesson's headings, and the URL or in-app state
   reflects the new lesson so it can be deep-linked or bookmarked.
4. **Given** a learner clicks an outline item in the right rail, **When**
   the item is selected, **Then** the reading column smooth-scrolls to
   that section heading with the heading anchored near the top of the
   viewport.
5. **Given** the lesson body contains a Takeaways block, a Leadership note,
   and a Case study, **When** the lesson renders, **Then** each is styled
   with a typographic treatment (e.g., numbered list, italic pull-quote,
   indented marginal note) and never as a coloured box with a bright
   accent fill.

---

### User Story 2 — Navigate the course via a quiet, learner-focused sidebar (Priority: P1)

The left sidebar shows a single progress meter at the top, then the module
list with collapsible lessons underneath, then a small "Practice" rail at
the bottom that surfaces only the four tools that matter to learners:
Spaced review, Adversarial review, Capstone, Knowledge map. Author and
audit tooling is removed from this surface entirely.

**Why this priority**: The current UI's biggest problem is 20+ secondary
"views" in a mega-menu. Replacing that with a curated 4-tool rail and a
clean module list is the structural change that makes everything else
readable. Without this story, the visual cleanup of the reading column is
undermined by ambient menu noise.

**Independent Test**: Opening the sidebar, counting the items in the
Practice rail (exactly 4), and confirming none of the previous author /
audit views (e.g., benchmark editor, source library, audit panels) appear
in the sidebar at all.

**Acceptance Scenarios**:

1. **Given** the sidebar is rendered, **When** the learner scans it from
   top to bottom, **Then** they see (in order) a progress meter, the
   module list (each module collapsible), and a Practice rail with
   exactly four tools: Spaced review, Adversarial review, Capstone,
   Knowledge map.
2. **Given** a module header is shown in the sidebar, **When** the learner
   clicks it, **Then** the module's lessons expand or collapse beneath it
   without navigating away from the current lesson.
3. **Given** a lesson in the sidebar is the active lesson, **When** the
   sidebar renders, **Then** that lesson is visually distinguished from
   its siblings (e.g., accent marker, bolder weight) and any completed
   lessons show a single, restrained completion indicator — not a
   checkbox, a state radio, and a "Mark complete" button at the same
   time.
4. **Given** a learner has completed lessons in a module, **When** the
   sidebar progress meter renders, **Then** it shows a single aggregate
   progress signal for the course; per-module progress, if shown, appears
   only on hover or expansion, never as a redundant second meter.

---

### User Story 3 — Trigger course tools without leaving the page (Priority: P2)

Each of the four Practice rail tools (Spaced review, Adversarial review,
Capstone, Knowledge map) opens as a full modal over the current lesson —
not as a separate route, not as an inline panel. The modal keeps the
learner's reading context intact and closes back to the same scroll
position.

**Why this priority**: The chat transcript explicitly required every
listed tool to be fully wired, not stubbed with a toast. P2 because P1
delivers a usable lesson-reading experience even if tools are temporarily
read-only; P3 work depends on these being live.

**Independent Test**: From a lesson, clicking each of the four Practice
tools and verifying each opens a working modal with the documented
contents, and that closing it returns the learner to the same scroll
position.

**Acceptance Scenarios**:

1. **Given** the learner clicks "Spaced review", **When** the modal opens,
   **Then** the learner sees a flashcard session with a reveal action and
   four grading buttons — Forgot, Hard, Good, Easy — and on completing the
   session sees a summary screen.
2. **Given** the learner clicks "Adversarial review", **When** the modal
   opens, **Then** the learner sees a persona picker, a paste-or-link
   field for an artifact, and on submission a scored rubric verdict.
3. **Given** the learner clicks "Capstone", **When** the modal opens,
   **Then** the learner sees a 6-milestone view with stats and lesson
   gating (which lessons unlock which milestone).
4. **Given** the learner clicks "Knowledge map", **When** the modal opens,
   **Then** the learner sees lessons grouped by module as a constellation
   and clicking any node jumps to that lesson with the modal closed.
5. **Given** any tool modal is open, **When** the learner presses Esc or
   clicks the modal's close affordance, **Then** the modal closes and the
   reading column is restored at the same scroll position they left.

---

### User Story 4 — Use a confident, non-wrapping header with an account menu (Priority: P2)

The header shows an editorial italic-roman serif wordmark — italic copper
`ai`, thin divider, roman cream `PM`, in Newsreader — with `Cohort 4 ·
Spring '26` as the meaningful subtitle at desktop widths. The header also
includes a `⌘K` command palette trigger, a streak chip, and an avatar.
Clicking the avatar opens an account menu with: Profile & cohort, Export
progress, Import progress, Display & settings (opens Tweaks), Keyboard
shortcuts, Sign out.

**Why this priority**: Resolves the explicit comment that the prior header
"didn't feel right" and folds in the export/import/settings/shortcuts
actions that were buried in the old toolbar. P2 because the lesson can be
read without the avatar menu, but the menu is required for the redesign
to feel complete.

**Independent Test**: Loading the page at desktop, tablet, and narrow
widths and confirming nothing in the header wraps onto two lines.
Clicking the avatar and confirming all six menu items are present and
trigger their respective surfaces (Export downloads a JSON; Import accepts
drag-and-drop or browse; Display opens Tweaks; Shortcuts opens a help
modal).

**Acceptance Scenarios**:

1. **Given** the header is rendered at viewport widths of 375px, 768px,
   1024px, and 1440px, **When** the page loads, **Then** no element in
   the header wraps to a second line, and the cohort subtitle is shown
   only at widths ≥ 1024px.
2. **Given** the learner clicks the avatar, **When** the menu opens,
   **Then** it shows exactly six items in this order: Profile & cohort,
   Export progress, Import progress, Display & settings, Keyboard
   shortcuts, Sign out.
3. **Given** the learner clicks "Export progress", **When** the action
   runs, **Then** the browser downloads a JSON file containing the
   learner's completion state and bookmarks.
4. **Given** the learner clicks "Import progress", **When** the modal
   opens, **Then** they can drag-and-drop a JSON file or browse to one,
   and on success the in-app state is updated to match.

---

### User Story 5 — Operate the course via keyboard (Priority: P3)

The redesign documents and supports a learner-grade keyboard layer: `⌘K`
opens the search palette, `?` opens the shortcuts help modal, `b` toggles
bookmark on the current lesson, `j` / `k` move to next / prev lesson
(crossing module boundaries), `e` / `q` toggle the Practice / Self-test
disclosures, `r` opens the Adversarial review modal, `Esc` closes any
open modal.

**Why this priority**: Power-user affordance; the lesson is fully usable
without these. Listed because the design explicitly commits to them and
they need a regression boundary so they don't silently rot.

**Independent Test**: Loading the course page and exercising each
shortcut to confirm it produces the documented effect, including from
inside an open modal where Esc must close it.

**Acceptance Scenarios**:

1. **Given** the page is focused (no input element active), **When** the
   learner presses `?`, **Then** the shortcuts help modal opens listing
   every documented shortcut.
2. **Given** the learner is on lesson N of module M, **When** they press
   `j`, **Then** they navigate to lesson N+1 of module M, or to lesson 1
   of module M+1 if N was the last lesson of module M.
3. **Given** any modal is open, **When** the learner presses `Esc`,
   **Then** the modal closes and keyboard focus returns to the element
   that opened it.

---

### Edge Cases

- **Narrow viewport (<768px)**: The three-column layout collapses to a
  single reading column with the sidebar accessible behind a hamburger
  and the right-rail outline accessible behind a small "Outline" toggle.
  The Practice rail and account menu remain reachable in one tap each.
- **No completed lessons yet**: The progress meter renders at 0% with a
  short on-ramp message; the active lesson defaults to the first lesson
  of the first module.
- **All lessons completed**: The progress meter shows 100%; the Practice
  rail surfaces Capstone first; the "next due review" prompt in the
  right rail switches to a "course complete" affordance.
- **Bookmarked lesson is deleted from the course**: The bookmark is
  surfaced in Profile & cohort with a "no longer available" state and
  can be removed; the app does not crash on a stale ID.
- **Import progress receives malformed JSON**: The modal rejects the file
  with a human-readable error and leaves existing state untouched.
- **Imported progress references unknown lesson IDs**: Unknown IDs are
  ignored with a count surfaced in the import summary; known IDs are
  applied.
- **Tool modal opened while another modal is open** (e.g., Adversarial
  review triggered from inside the command palette): The previously open
  modal closes before the new one opens; only one modal is ever visible.
- **Font load failure (Newsreader / Geist)**: The wordmark and body fall
  back to system serif and system sans, respectively, without layout
  shift greater than 0.01 CLS.
- **Right-rail outline on a lesson with no headings**: The outline shows
  the lesson title as the single anchor; study-mode pills and "next due
  review" remain visible.

## Requirements *(mandatory)*

### Functional Requirements

**Page layout & navigation**

- **FR-001**: The course page MUST present a three-column layout at
  viewport widths ≥ 1024px — left sidebar (course navigation), center
  reading column, right rail (on-lesson outline).
- **FR-002**: The left sidebar MUST contain, in order, a single course
  progress meter, the module list with collapsible lessons, and a
  Practice rail with exactly four tools: Spaced review, Adversarial
  review, Capstone, Knowledge map. No author or audit tools may appear
  in the sidebar.
- **FR-003**: The center reading column MUST render the active lesson
  with a serif display title (Newsreader), calm sans body (Geist), and
  typographic callouts (Takeaways, Leadership note, Case study) rendered
  without bright accent-fill boxes.
- **FR-004**: Module color MUST appear only as a 2px marker (e.g., a
  left rule on the active item or a tab indicator) and MUST NOT be used
  as a background fill on cards, callouts, or panels.
- **FR-005**: The right rail MUST contain a scroll-tracking outline of
  the active lesson's section headings, study-mode pills (Skim, Deep,
  Exec), inline lesson actions (bookmark, listen, copy), and a "next
  due review" affordance that opens the Spaced review modal.
- **FR-006**: Clicking a lesson in the sidebar MUST load that lesson in
  the reading column, reset its scroll position to the top, refresh the
  outline, and update the in-app navigation state for deep-linking.
- **FR-007**: Clicking a section in the right-rail outline MUST scroll
  the reading column so that the corresponding heading anchors near the
  top of the viewport.

**Header & account**

- **FR-008**: The header MUST render an editorial italic-roman wordmark
  ("ai" italic copper, thin divider, "PM" roman cream, in Newsreader),
  a cohort subtitle at viewports ≥ 1024px, a `⌘K` command palette
  trigger, a streak chip, and an avatar — none of which wrap to a second
  line at viewport widths of 375px, 768px, 1024px, and 1440px.
- **FR-009**: Clicking the avatar MUST open an account menu with
  exactly six items in this order: Profile & cohort, Export progress,
  Import progress, Display & settings, Keyboard shortcuts, Sign out.
- **FR-010**: "Export progress" MUST download a JSON file containing the
  learner's completion state, bookmarks, and any locally-stored progress
  signals; "Import progress" MUST accept a drag-and-drop or browse
  upload of the same JSON shape and apply it to the in-app state.

**Tools**

- **FR-011**: Each of the four Practice tools MUST open as a full modal
  over the current lesson; closing the modal MUST restore the reading
  column at the same scroll position the learner left.
- **FR-012**: The Spaced review modal MUST present a flashcard session
  with a reveal action and four grading buttons (Forgot, Hard, Good,
  Easy), and MUST present a session-summary screen on completion.
- **FR-013**: The Adversarial review modal MUST present a persona
  picker, a paste-or-link artifact field, and a scored rubric verdict on
  submission.
- **FR-014**: The Capstone modal MUST present a 6-milestone view with
  stats and lesson gating that surfaces which lessons unlock which
  milestone.
- **FR-015**: The Knowledge map modal MUST group lessons by module as a
  navigable constellation; clicking a node MUST close the modal and load
  that lesson.
- **FR-016**: Only one modal MUST be visible at a time; opening a new
  modal while another is open MUST close the previous one.

**Progress & state**

- **FR-017**: Lesson completion MUST be controlled by a single
  affordance per lesson (a Mark-complete control in the reading
  column). The redundant prior systems — completion checkbox in the
  sidebar, lesson state radio, and module outro gate — MUST NOT all be
  present simultaneously.
- **FR-018**: The course MUST persist a learner's completion state,
  bookmarks, last-read lesson, study mode, streak (current, best, last
  read date), and Tweaks preferences (accent color, serif/sans display
  swap, compact/roomy density) locally on the device so reloading
  restores the previous session.

**Keyboard & search**

- **FR-019**: The page MUST honour the following keyboard shortcuts when
  no text input is focused: `⌘K` opens the command palette, `?` opens
  shortcuts help, `b` toggles bookmark on the current lesson, `j` / `k`
  navigate next / previous lesson (crossing module boundaries), `e` /
  `q` toggle Practice / Self-test disclosures, `r` opens Adversarial
  review, `Esc` closes any open modal. Shortcuts operate in *reading
  order*, not geometric direction; under `dir="rtl"`, `j` still
  advances forward in the lesson sequence and `k` still moves backward.
- **FR-020**: The command palette opened by `⌘K` MUST allow searching
  lessons by title and section heading and selecting a result MUST
  navigate to that lesson and section.

**Accessibility**

- **FR-021**: All text in the redesigned UI MUST meet WCAG 2.1 AA
  contrast (≥ 4.5:1 for body text, ≥ 3:1 for interactive boundaries and
  focus rings) on the editorial-dark palette, and MUST meet the same
  thresholds for every Tweaks accent variant enumerated in FR-025 —
  measured for body text on the surface, the interactive-boundary
  stroke, and the focus ring. Per-variant evidence (automated
  contrast-check output or a recorded measurement) is required at
  release.
- **FR-022**: Every interactive element (sidebar item, tool trigger,
  outline anchor, modal close, account menu item, keyboard shortcut
  target) MUST be operable by keyboard alone, with a visible focus ring
  on the editorial-dark palette. The focus ring MUST be a minimum 2px
  stroke and MUST achieve at least 3:1 contrast against the
  background surface it sits on, measured against each of the four
  enumerated Tweaks accent variants in FR-025.
- **FR-023**: Each tool modal MUST trap focus while open, restore focus
  to the trigger on close, and be announced to assistive technology with
  an appropriate role and accessible name.
- **FR-023a**: The redesign MUST honor `prefers-reduced-motion: reduce`
  across every animated surface: modal open/close, smooth-scroll on
  outline click and palette navigation, sidebar collapse/expand, streak
  and chip increment effects, and any future motion introduced by this
  feature. When the media query matches, transitions MUST be replaced
  with instant state changes (≤ 16ms) and `scroll-behavior` MUST be
  `auto`, not `smooth`. Reduced-motion compliance is a release gate.
- **FR-024**: The page MUST render correctly at viewport widths of
  375px, 768px, 1024px, and 1440px. At widths ≥ 1024px the layout MUST
  present the three-column shell (sidebar / reading / right rail). At
  widths from 768px up to 1023px inclusive, the layout MUST present a
  two-column shell — sidebar + reading column — with the right-rail
  outline accessible via a toggle. Below 768px the layout MUST collapse
  to a single reading column with both the sidebar and outline
  accessible via toggles. No viewport width within the 375–1440px
  range may produce horizontal scroll.

**Tweaks panel**

- **FR-025**: A Tweaks panel — reachable via "Display & settings" in the
  account menu — MUST allow flipping the single accent color among
  exactly four enumerated variants (`copper` default, `sage`,
  `ink-blue`, `iron`), swapping serif vs sans display type, and
  toggling compact vs roomy density. Changes MUST apply live to the
  page and persist locally. Adding a fifth accent variant requires a
  spec amendment and a corresponding update to the per-variant
  contrast evidence in FR-021.

**Constitution alignment**

- **FR-026**: Every lesson rendered by the redesign MUST surface every
  downloadable, reusable artifact link associated with that lesson in
  the reading column or right rail, ordered to match the lesson body
  order (or, when sourced from a separate artifact array, in the order
  declared by the lesson data). Lessons with no artifact render
  unaffected — no empty container, no placeholder text. In alignment
  with the project constitution's Hands-On Artifact Bias.
- **FR-027**: The redesign MUST preserve the existing course-audit and
  source-library surfaces somewhere reachable from the app (e.g., from
  the Profile & cohort modal or the command palette), in alignment with
  the project constitution's Benchmark Transparency principle. These
  surfaces MUST NOT clutter the learner sidebar.
- **FR-028**: Any bilingual or RTL content present in the existing
  course MUST continue to render correctly in the redesigned layout,
  including correct mirror behavior of the three-column layout and the
  module-marker side, in alignment with the project constitution's
  Bilingual & MENA-Inclusive principle.
- **FR-028a**: The reading column MUST support a `mena-note` callout
  block — a typographic treatment (not a coloured box) for surfacing
  per-lesson Arabic-language, RTL, or MENA regulatory/cultural context
  that changes the recommendation. The redesign delivers the
  capability; content authors populate the field on a per-lesson
  basis as a separate work stream. Lessons without the field MUST
  render unaffected (no empty container, no broken layout).

### Key Entities

- **Lesson**: A unit of learning with a title, module association,
  ordered section headings, body content, optional artifacts, optional
  practice and self-test blocks, completion state, and bookmark state.
- **Module**: A group of lessons with a name, an ordering index, a
  module-marker color, and an aggregate progress derived from its
  lessons.
- **Learner Progress**: A per-device record of completed lesson IDs,
  bookmarked lesson IDs, last-read lesson ID, current study mode,
  Tweaks preferences, and a streak counter.
- **Tool Session**: An open instance of one of the four Practice tools
  (Spaced review, Adversarial review, Capstone, Knowledge map),
  including its transient state (e.g., current flashcard index, persona
  selection, capstone milestone focus).
- **Command Palette Entry**: A searchable target consisting of a lesson
  ID, optional section heading anchor, and a display label.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A learner can open the course page, find the lesson they
  were last reading, and resume reading within 10 seconds of page load
  on a typical broadband connection.
- **SC-002**: At least 95% of learners in usability testing identify the
  four Practice tools from the sidebar without prompting, and zero
  learners mention being confused by author / audit views (because none
  are present).
- **SC-003**: At viewport widths of 375px, 768px, 1024px, and 1440px,
  the header renders on a single line and the page exhibits no
  horizontal scroll.
- **SC-004**: Each documented keyboard shortcut produces its documented
  effect in 100% of trials across the four supported viewport widths,
  measured by an automated regression suite.
- **SC-005**: Exporting and re-importing progress on the same device
  results in 100% fidelity of completion state and bookmarks (round-trip
  equality).
- **SC-006**: All redesigned text passes WCAG 2.1 AA contrast against
  the editorial-dark palette and against each of the four enumerated
  Tweaks accent variants (copper, sage, ink-blue, iron), with
  per-variant evidence recorded at release for body text, interactive
  boundary, and focus ring.
- **SC-007**: The redesigned course page achieves an LCP under 2.5
  seconds under the Lighthouse mobile preset (Moto G Power emulation,
  4× CPU throttle, Slow 4G network), and ships every emitted Vite
  chunk at under 500 KB gzipped. The Lighthouse run is part of the
  release evidence; the per-chunk gzipped budget is enforced by a CI
  bundle audit; a chunk over budget fails the build.
- **SC-008**: The sidebar contains exactly four tools in the Practice
  rail at all times; an automated check fails the build if a fifth tool
  is added without an explicit constitution-aligned justification.

## Assumptions

- The redesign replaces the existing course page only; the rest of the
  product (course audit, source library, capstone dashboard backing
  data) continues to live where it does today and is reached from the
  new entry points (Profile & cohort, command palette) rather than
  duplicated into the new sidebar.
- The handoff bundle in `assets/design-bundle/` is the authoritative
  design source for visual tokens, layout rules, microcopy, and tool
  flows. Implementation will translate it into the project's stack
  (React 19 + Vite) rather than ship the prototype's HTML/CSS/JSX
  verbatim.
- "Local persistence" of learner progress refers to the browser-local
  storage already used by the existing app; no new backend account
  system is in scope.
- The "Cohort 4 · Spring '26" subtitle is the current cohort label;
  later cohorts will swap the string without changing layout.
- The four Practice tools are the only learner-facing tools required;
  any new tool added later requires a constitution-aligned justification
  (see SC-008).
- Existing eval, observability, and freshness ops scripts continue to
  run unchanged; the redesign does not block or change Promptfoo or
  Langfuse integrations.
- The redesign does not introduce any new external font, image, or
  third-party script not already referenced in the design bundle
  (Newsreader, Geist, Geist Mono from Google Fonts).
- Bilingual / RTL support is preserved at parity with today's
  implementation; new RTL-specific work is out of scope for this
  feature unless a regression is discovered during implementation.
- SC-001 ("resume within 10 seconds") has no dedicated stopwatch test
  because it is satisfied transitively by SC-007 (LCP < 2.5s under
  the Lighthouse mobile preset) plus the last-read restoration
  guarantee from `useActiveLesson` (`course/last-read/v1`). If
  LCP regresses past 2.5s OR last-read restoration breaks, SC-001 is
  considered failed.
