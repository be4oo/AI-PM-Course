# Accessibility Requirements Quality Checklist: Editorial-Dark Course Page Redesign

**Purpose**: Unit-test the *quality* of the accessibility requirements written in `spec.md`, `plan.md`, and the keyboard / modal contracts — not the implementation. Does the spec say enough, clearly enough, for an implementer to deliver WCAG 2.1 AA without inventing rules?
**Created**: 2026-05-26
**Feature**: [spec.md](../spec.md)
**Audience**: PR reviewer
**Depth**: Standard

## Contrast & Visual A11y

- [ ] CHK001 - Is the 4.5:1 contrast target stated for body text AND for the copper accent on near-black specifically, or only as a general WCAG claim? [Clarity, Spec §FR-021]
- [ ] CHK002 - Are contrast requirements specified for each of the four Tweaks accent variants (copper, sage, ink-blue, iron), or only for the default? [Coverage, Spec §FR-021, §FR-025, §SC-006]
- [ ] CHK003 - Is the "3:1 interactive boundary" target tied to specific UI primitives (e.g., focus rings, modal close buttons, study-mode pills), or stated generically? [Measurability, Spec §FR-021]
- [ ] CHK004 - Are requirements defined for module-marker contrast against the near-black background, given markers are 2px and may sit below contrast minimums for non-text graphics? [Edge Case, Gap, Spec §FR-004]
- [ ] CHK005 - Is the contrast behavior documented for the `compact` vs `roomy` Tweaks density mode (e.g., does smaller spacing affect text size and therefore contrast bar)? [Coverage, Gap, Spec §FR-025]

## Keyboard Operability

- [ ] CHK006 - Does the keyboard contract enumerate every interactive element that MUST be reachable by Tab, or only state "every interactive element"? [Completeness, Spec §FR-022, Contract keyboard-shortcuts.md]
- [ ] CHK007 - Are the keyboard-shortcut suppression rules (active input element exempts global layer) specified for all input types (`<input>`, `<textarea>`, `contenteditable`, custom rich-text), or only for "text input"? [Clarity, Contract keyboard-shortcuts.md §Scope rules]
- [ ] CHK008 - Is the focus order specified when the sidebar collapses on <768px (i.e., does Tab reach the hamburger before the wordmark)? [Coverage, Gap, Spec §FR-024]
- [ ] CHK009 - Are requirements defined for what happens when a shortcut is fired with no current lesson (impossible state at runtime but undefined in spec)? [Edge Case, Gap, Contract keyboard-shortcuts.md]
- [ ] CHK010 - Is the focus-restore destination after `Esc`-close defined as "the element that opened the modal" with a fallback when that element no longer exists in the DOM? [Edge Case, Gap, Contract tool-modal-protocol.md]

## Focus Management

- [ ] CHK011 - Is focus-trap behavior specified for each modal type independently, or only at the shared frame level? [Consistency, Contract tool-modal-protocol.md]
- [ ] CHK012 - Are requirements defined for the visible focus ring's color and width on the editorial-dark palette, or only its existence? [Clarity, Spec §FR-022]
- [ ] CHK013 - Is the behavior of focus when a modal swaps to another modal (FR-016) specified — does focus move to the new modal's first focusable, or restore to the trigger then re-trap? [Clarity, Gap, Spec §FR-016, Contract tool-modal-protocol.md]

## ARIA & Semantics

- [ ] CHK014 - Are the ARIA roles and labels required for each shell region (sidebar, reading column, right rail, header, footer) specified? [Completeness, Gap, Spec §FR-023]
- [ ] CHK015 - Is the live-region behavior for "next due review" updates and streak changes specified, or are they silent updates? [Coverage, Gap]
- [ ] CHK016 - Are requirements defined for how scroll-driven outline highlighting is communicated to assistive technology (does it announce, or stay silent)? [Coverage, Gap, Spec §FR-007]
- [ ] CHK017 - Is the accessible name for the `⌘K` palette trigger specified independent of its visible glyph? [Clarity, Gap, Spec §FR-008]
- [ ] CHK018 - Are modal `aria-labelledby` vs `aria-label` requirements specified, given some modals (e.g., Knowledge map) may lack a visible title? [Coverage, Contract tool-modal-protocol.md]

## Motion, Animation, & Sensory

- [ ] CHK019 - Are requirements defined for `prefers-reduced-motion` behavior (e.g., the modal open animation, the smooth-scroll on outline click)? [Coverage, Gap, Spec §FR-007]
- [ ] CHK020 - Is the font-load fallback specified for accessibility users (the spec mentions CLS < 0.01 but not whether reflow-on-swap affects screen-readers)? [Coverage, Spec §Edge Cases]
- [ ] CHK021 - Are requirements defined for the streak chip's animation when the streak increments (must respect reduced motion)? [Coverage, Gap]

## RTL & Bilingual

- [ ] CHK022 - Is RTL parity defined as "behavior matches LTR" or as a specific list of mirrored properties (sidebar inline-end, right-rail inline-start, marker side)? [Clarity, Spec §FR-028]
- [ ] CHK023 - Are requirements specified for mixed-direction content (a Latin lesson title above Arabic body, or vice versa)? [Coverage, Edge Case, Gap]
- [ ] CHK024 - Is the keyboard shortcut layer specified to behave identically in RTL (e.g., does `j` still mean "next" in reading order, or "right" geometrically)? [Clarity, Gap, Spec §FR-019]
- [ ] CHK025 - Are font-stack fallbacks specified separately for Latin and Arabic, or only as a single stack? [Completeness, Gap]

## Screen-Reader Specific

- [ ] CHK026 - Is the reading-column heading order specified to never skip levels (H1 → H2 → H3 only), or only "semantic"? [Clarity, Gap, Spec §FR-003]
- [ ] CHK027 - Are requirements defined for how the four-tool Practice rail is announced (e.g., is it a `<nav>` with a label, a list, a toolbar)? [Clarity, Gap]
- [ ] CHK028 - Is the command-palette result list specified as a `combobox`/`listbox` pattern, or only as a search input? [Clarity, Gap, Spec §FR-020]

## Test Obligation Quality

- [ ] CHK029 - Does the spec require an automated a11y regression for contrast, focus order, and ARIA, or only manual review? [Completeness, Spec §SC-004, §SC-006]
- [ ] CHK030 - Are the test obligations in `contracts/keyboard-shortcuts.md` (each shortcut × focus suppression × modal-state) measurable, or open to interpretation? [Measurability, Contract keyboard-shortcuts.md §Test obligations]

## Notes

- WCAG 2.1 AA is the floor stated in the constitution. AAA is not in scope.
- Resolving any `[Gap]` item should produce either a new requirement in `spec.md` or an explicit "out of scope" entry in `Assumptions`.
- Items related to RTL are non-deferrable per Constitution Principle IV.
