# UX Requirements Quality Checklist: Editorial-Dark Course Page Redesign

**Purpose**: Unit-test the *quality* of the UX requirements written in `spec.md` and `plan.md` — completeness, clarity, consistency, measurability, coverage. This checklist does NOT verify the implementation; it verifies the requirements.
**Created**: 2026-05-26
**Feature**: [spec.md](../spec.md)
**Audience**: PR reviewer
**Depth**: Standard

## Layout & Hierarchy

- [ ] CHK001 - Is the three-column layout breakpoint explicitly defined as a single threshold rather than a range? [Clarity, Spec §FR-001]
- [ ] CHK002 - Are the minimum and maximum widths for each of the three columns specified, or only the column order? [Completeness, Gap, Spec §FR-001]
- [ ] CHK003 - Is the reading column's measure (line length) defined with a measurable target (e.g., `ch` or px), not just "calm" / "reading-first"? [Measurability, Spec §FR-003]
- [ ] CHK004 - Are the requirements for collapse behavior between 768px and 1024px (mid-range tablet) explicitly defined, or only the <768px and ≥1024px cases? [Coverage, Edge Case, Spec §FR-024]
- [ ] CHK005 - Is "module color appears only as a 2px marker" specified with the exact CSS properties allowed and forbidden (e.g., border vs background), or stated only as visual intent? [Clarity, Spec §FR-004]

## Typography & Visual Tokens

- [ ] CHK006 - Are the exact font families, weights, and italic variants required by the design enumerated in requirements, or only named as a family? [Completeness, Spec §FR-003, §FR-008]
- [ ] CHK007 - Is "warm cream on near-black" quantified with token values (hex / OKLCH / contrast ratio), or left as descriptive language? [Measurability, Ambiguity, Spec §Design source of truth]
- [ ] CHK008 - Are typographic callout treatments (Takeaways, Leadership note, Case study) defined with a structural pattern (numbered list, pull-quote, marginal note) for each, or grouped under "typographic treatment"? [Clarity, Spec §FR-003]
- [ ] CHK009 - Is the rule against "bright accent-fill boxes" defined positively (what IS allowed) in addition to negatively (what is NOT)? [Clarity, Spec §FR-003]
- [ ] CHK010 - Are the four Tweaks accent variants (copper / sage / ink-blue / iron) named in the spec, or only in the plan? [Traceability, Conflict, Spec §FR-025, Plan R3]

## Sidebar & Navigation

- [ ] CHK011 - Is "exactly four tools in the Practice rail" stated with a build-failing gate (SC-008) AND a corresponding requirement that the four ids are immutable without amendment? [Consistency, Spec §FR-002, §SC-008]
- [ ] CHK012 - Are requirements defined for what the sidebar shows when a module has zero lessons, or is that case asserted to never occur? [Coverage, Edge Case, Gap]
- [ ] CHK013 - Is the visual distinction for the active lesson in the sidebar specified (e.g., marker, weight) with measurable rules, or left as "visually distinguished"? [Clarity, Spec §FR-002 User Story 2 #3]
- [ ] CHK014 - Are sidebar progress-meter requirements consistent between the "single aggregate progress signal" claim (FR-002) and the per-module progress-on-expansion behavior (User Story 2 #4)? [Consistency, Spec §FR-002]
- [ ] CHK015 - Is the precedence order specified when multiple completion indicators could surface (lesson sidebar marker vs reading column Mark-complete vs streak counter)? [Consistency, Spec §FR-017]

## Header & Account

- [ ] CHK016 - Is the cohort subtitle's content rule defined as a config value or hard-coded string ("Cohort 4 · Spring '26")? [Clarity, Assumption, Spec §FR-008 Assumptions]
- [ ] CHK017 - Are the six account-menu items specified in a fixed order with the order treated as a contract, or only as an unordered set? [Clarity, Spec §FR-009]
- [ ] CHK018 - Is the visual fallback behavior defined when the avatar image is unavailable? [Edge Case, Gap]
- [ ] CHK019 - Are the requirements for what happens to the header at viewport widths between 1024px and 1440px (subtitle visible) versus below 1024px (subtitle hidden) symmetric (i.e., the transition is single-threshold, not a range)? [Clarity, Spec §FR-008]

## Modals & Tools

- [ ] CHK020 - Is "only one modal visible at a time" specified with the swap-then-open behavior (FR-016) AND the focus-restore destination after swap? [Completeness, Spec §FR-016, Contract tool-modal-protocol.md]
- [ ] CHK021 - Are the Spaced review grade buttons defined as exactly four with fixed labels (Forgot/Hard/Good/Easy), or as a configurable set? [Clarity, Spec §FR-012]
- [ ] CHK022 - Is the Capstone modal's "6 milestones" defined as a fixed count, or as the count derived from existing capstone data? [Consistency, Spec §FR-014, Data model CapstoneView]
- [ ] CHK023 - Are requirements for the Knowledge map's interaction model (click-to-jump only? hover preview? zoom?) specified beyond "navigable constellation"? [Completeness, Spec §FR-015]
- [ ] CHK024 - Is the scroll-restore destination after modal close specified as the reading column's `scrollTop`, or the document's `scrollY`? [Clarity, Spec §FR-011]

## Command Palette

- [ ] CHK025 - Is the `>` prefix for legacy-view entries documented in the spec as user-facing behavior, or only in research/research-note? [Traceability, Spec §FR-020, Plan R7]
- [ ] CHK026 - Are requirements defined for empty-query state of the palette (show recents? show first lessons? blank?)? [Coverage, Gap]
- [ ] CHK027 - Is the keyboard behavior inside the palette (Enter/Tab/arrow-keys) specified, or only the trigger key (`⌘K`)? [Completeness, Spec §FR-019, §FR-020]

## Tweaks & Persistence

- [ ] CHK028 - Are the three Tweaks knobs (accent, display, density) defined with exact allowed values in requirements, or left enumerable? [Clarity, Spec §FR-025, Data model TweaksPreferences]
- [ ] CHK029 - Is the persistence boundary documented (per-device vs per-account) for Tweaks and progress? [Clarity, Spec §FR-018, Assumptions]
- [ ] CHK030 - Are requirements specified for the Tweaks panel's initial state on first visit (no prior preferences)? [Coverage, Edge Case]

## Microcopy & Labels

- [ ] CHK031 - Are user-visible strings (account menu items, study-mode pill labels, tool names, modal headings) frozen in the spec, or only paraphrased? [Consistency, Spec §FR-009]
- [ ] CHK032 - Are bilingual / Arabic equivalents of new microcopy in scope for this feature, or explicitly deferred? [Coverage, Spec §FR-028, Assumptions]

## Acceptance Criteria Quality

- [ ] CHK033 - Can each P1/P2/P3 user story's "Independent Test" be executed by a reviewer in under 10 minutes, or are some tests under-specified? [Measurability, Spec §User Stories]
- [ ] CHK034 - Are acceptance scenarios written as observable behaviors rather than implementation states (e.g., "outline highlights the current section" rather than "the active class is added")? [Quality, Spec §User Stories]
- [ ] CHK035 - Is the 200ms outline-update bound (User Story 1 #2) tied to a measurable verification method, or left as a target? [Measurability, Spec §User Story 1 #2]

## Notes

- Items reference `[Spec §...]` to the spec section, or `[Plan ...]` / `[Contract ...]` when the requirement lives in a sibling artifact.
- `[Gap]` marks items where the spec is silent. Resolving a gap means adding a requirement, not building the feature.
- Suggested resolution path: walk this list in `/speckit-clarify` (if you want spec amendments) or note resolutions in PR review comments tied to the spec.
