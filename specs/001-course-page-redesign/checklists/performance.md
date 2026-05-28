# Performance Requirements Quality Checklist: Editorial-Dark Course Page Redesign

**Purpose**: Unit-test the *quality* of the performance requirements written across `spec.md`, `plan.md`, and `research.md` — not the implementation. Does the spec define performance well enough that a reviewer can say "this passes / fails" without inventing the bar?
**Created**: 2026-05-26
**Feature**: [spec.md](../spec.md)
**Audience**: PR reviewer
**Depth**: Standard

## Loading & First-Render

- [ ] CHK001 - Is the LCP < 2.5s target tied to a specific device class and network profile, or stated unconditionally? [Measurability, Spec §SC-007]
- [ ] CHK002 - Is "representative mid-range device" defined (Lighthouse "mid-tier" preset? specific RAM/CPU?), or left undefined? [Clarity, Ambiguity, Spec §SC-007]
- [ ] CHK003 - Are requirements specified for what counts as the LCP element (the lesson title? the first paragraph? the sidebar?)? [Coverage, Gap, Spec §SC-007]
- [ ] CHK004 - Is "10 seconds to resume" (SC-001) measured from page-load-start, navigation-start, or paint-start? [Measurability, Spec §SC-001]
- [ ] CHK005 - Are requirements defined for the cold-cache vs warm-cache LCP target separately, or as a single number? [Coverage, Gap, Spec §SC-007]

## Bundle & Asset Budget

- [ ] CHK006 - Is the "500 KB parsed JS" budget specified as compressed (gzip/brotli) or uncompressed? [Clarity, Ambiguity, Spec §SC-007, Plan R6]
- [ ] CHK007 - Is the budget per-chunk or total-initial-page-load? Plan R6 says per-chunk; spec says "initial JS payload" — are they consistent? [Consistency, Conflict, Spec §SC-007 vs Plan R6]
- [ ] CHK008 - Are CSS, font, and image budgets defined, or only JavaScript? [Coverage, Gap]
- [ ] CHK009 - Is the build-failing threshold for the new `scripts/check-bundle.mjs` (Plan R6) tied to the spec's 500 KB number, or could it drift independently? [Consistency, Traceability, Plan R6]
- [ ] CHK010 - Are requirements defined for legacy non-learn views' bundle size (they share `App.jsx`'s chunk), or are they exempt? [Coverage, Gap]

## Font Loading

- [ ] CHK011 - Is the "font load failure" edge case (Spec §Edge Cases) tied to a measurable CLS bound, or only to "no greater than 0.01"? [Measurability, Spec §Edge Cases]
- [ ] CHK012 - Are requirements defined for the maximum acceptable FOUT/FOIT duration (in addition to the CLS bound)? [Coverage, Gap]
- [ ] CHK013 - Is the specific weight list of Newsreader / Geist / Geist Mono enumerated in spec, or only in research (Plan R6)? [Traceability, Plan R6, Spec §Assumptions]
- [ ] CHK014 - Are requirements specified for Arabic font loading separately from Latin, given Constitution Principle IV? [Coverage, Gap]

## Outline Tracking & Scroll

- [ ] CHK015 - Is the 200ms outline-highlight bound (User Story 1 #2) measured from heading-cross-event or from scroll-end? [Measurability, Spec §User Story 1 #2]
- [ ] CHK016 - Are requirements defined for outline behavior on very long lessons (>200 sections), or is the upper bound undefined? [Edge Case, Gap]
- [ ] CHK017 - Is the scroll-position save/restore on modal open/close defined with a maximum tolerated drift (e.g., ±2px), or as exact? [Measurability, Gap, Spec §FR-011]
- [ ] CHK018 - Are smooth-scroll duration requirements defined for outline-click jumps, or left to the browser default? [Coverage, Gap, Spec §FR-007]

## Modal & Tool Performance

- [ ] CHK019 - Are requirements specified for the maximum time from tool-click to modal-mounted-and-focus-trapped? [Coverage, Gap, Contract tool-modal-protocol.md]
- [ ] CHK020 - Is the Spaced review queue's build-time bounded (e.g., for a learner with 500 due cards)? [Edge Case, Gap, Data model SpacedSession]
- [ ] CHK021 - Are requirements defined for the Knowledge map render with the full 50-lesson constellation (e.g., <100ms first paint)? [Measurability, Gap, Spec §FR-015]
- [ ] CHK022 - Is the Adversarial-review scoring function's worst-case execution time bounded (for an artifact at the `MAX_REVIEW_ARTIFACT_CHARS` ceiling)? [Coverage, Gap, Data model AdversarialSession]

## Persistence

- [ ] CHK023 - Are read/write throughput requirements specified for `localStorage` operations (e.g., import progress with 50 lessons completed)? [Coverage, Gap, Spec §FR-018]
- [ ] CHK024 - Is the export JSON file-size growth bounded (e.g., MB ceiling) so the download stays snappy? [Coverage, Gap, Spec §FR-010]

## Layout Stability

- [ ] CHK025 - Is the CLS target specified for the course page distinct from a whole-app target? [Clarity, Gap, Spec §Edge Cases]
- [ ] CHK026 - Are requirements defined for the streak-chip's render path (it depends on a date computation — could shift if computed late)? [Coverage, Gap]
- [ ] CHK027 - Is the cohort-subtitle's appearance/disappearance at the 1024px breakpoint specified as a non-CLS event (e.g., reserved space)? [Coverage, Gap, Spec §FR-008]

## Viewport Symmetry

- [ ] CHK028 - Is "no horizontal scroll at any of 375/768/1024/1440px" (SC-003) tied to the *redesigned course page only*, or to the whole app? [Clarity, Spec §SC-003]
- [ ] CHK029 - Are intermediate widths (e.g., 900px) implicitly covered by SC-003, or explicitly out of scope? [Coverage, Spec §SC-003]

## Measurability of Success Criteria

- [ ] CHK030 - Can each performance SC be measured by an automated tool (Lighthouse, Vitest, custom script), or do any rely on manual stopwatch timing? [Measurability, Spec §SC-001, §SC-003, §SC-007]
- [ ] CHK031 - Is the regression boundary defined (i.e., does a 5% LCP regression block release, or only a hard breach)? [Coverage, Gap]

## Notes

- The constitution requires LCP < 2.5s and parsed initial JS < 500 KB as engineering bars. The questions above test whether the spec is *specific enough* to enforce those bars, not whether the implementation meets them.
- `[Gap]` items can usually be resolved by adding a one-line clarification to `spec.md` or by referencing a stack-wide convention (e.g., "device class = Lighthouse mobile preset").
