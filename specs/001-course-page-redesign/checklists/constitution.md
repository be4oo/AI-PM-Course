# Constitution-Alignment Requirements Quality Checklist: Editorial-Dark Course Page Redesign

**Purpose**: Unit-test whether the spec's requirements are written *specifically enough* to enforce the 5 principles in `.specify/memory/constitution.md` v1.0.0. This is not a question of "do the principles apply?" — they do. It is a question of "would a reviewer be able to refuse a merge that violated a principle, citing only the spec?"
**Created**: 2026-05-26
**Feature**: [spec.md](../spec.md) · Constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md)
**Audience**: PR reviewer
**Depth**: Standard

## Principle I — Benchmark Transparency (NON-NEGOTIABLE)

- [ ] CHK001 - Is the requirement to preserve the audit and source-library surfaces tied to a specific entry point (command palette `>` prefix, Profile modal), or only stated as "reachable"? [Clarity, Spec §FR-027, Plan R7]
- [ ] CHK002 - Are the audit-view and source-library entries in the command palette enumerated in the spec, or only described in the plan's research note? [Traceability, Spec §FR-027, Plan R7]
- [ ] CHK003 - Is the rule "audit / source surfaces MUST NOT clutter the learner sidebar" defined positively (where they live) in addition to negatively (where they don't)? [Clarity, Spec §FR-027]
- [ ] CHK004 - Are benchmark-delta statements (constitution requirement: "delta statement when project deviates from referenced standard") in scope for the redesign's audit-view entry point? [Coverage, Gap, Constitution §I]
- [ ] CHK005 - Is the requirement for benchmark visibility on a per-lesson basis specified, or only at the course level? [Coverage, Gap, Constitution §I, Spec §FR-027]

## Principle II — Hands-On Artifact Bias

- [ ] CHK006 - Is "at least one artifact per lesson" stated as a release gate, or as best-effort? [Measurability, Spec §FR-026, Constitution §II]
- [ ] CHK007 - Are requirements defined for what happens when a lesson genuinely has no artifact (legacy lesson awaiting backfill) — does the redesign suppress the slot, render an empty state, or block the lesson? [Edge Case, Gap, Spec §FR-026]
- [ ] CHK008 - Is the artifact surface location specified (reading column OR right rail OR either), with consistency rules across lessons? [Clarity, Spec §FR-026]
- [ ] CHK009 - Are downloadable artifact types enumerated (PDF, MD, CSV, …) or left unbounded? [Coverage, Gap, Constitution §II]
- [ ] CHK010 - Is the requirement that an artifact must be "usable within the same week" testable from a requirements review (not implementation), or aspirational only? [Measurability, Constitution §II]

## Principle III — Eval & Guardrail Discipline

- [ ] CHK011 - Is the spec explicit that the redesign introduces no new AI-touching surface (no model calls, no prompt rendering), so Promptfoo/Langfuse evals are not triggered? [Clarity, Spec §Assumptions, Plan §Constitution Check, Constitution §III]
- [ ] CHK012 - If a later increment swaps the local Adversarial-review scorer for a model call, is the trigger condition for evals documented in the spec (or only in research)? [Traceability, Plan R8, Constitution §III]
- [ ] CHK013 - Are requirements defined for Capstone scoring to confirm it remains a local, non-AI computation in this feature? [Coverage, Spec §FR-014, Constitution §III]
- [ ] CHK014 - Is the rule "failing evals MUST block release" referenced in the spec for any AI-touching path that could exist today (e.g., changelog freshness via Langfuse smoke test)? [Coverage, Gap, Constitution §III]

## Principle IV — Bilingual & MENA-Inclusive by Default

- [ ] CHK015 - Is RTL parity stated as a release gate, or only as a non-regression commitment ("preserve at parity with today's implementation")? [Measurability, Spec §FR-028, §Assumptions, Constitution §IV]
- [ ] CHK016 - Are requirements specified for MENA-specific content callouts (e.g., regulatory, cultural, language-specific examples) in the redesigned lesson layout? [Coverage, Gap, Constitution §IV]
- [ ] CHK017 - Is Arabic-language testing (font rendering, RTL keyboard shortcut semantics, modal layout mirror) included in the acceptance criteria, or assumed parity? [Coverage, Gap, Spec §FR-028]
- [ ] CHK018 - Are right-to-left versions of the keyboard shortcuts specified (does `j` mean next-in-reading-order in both, or next-geometrically-right)? [Clarity, Conflict, Spec §FR-019, Constitution §IV]
- [ ] CHK019 - Is the responsibility to flag "where Arabic / RTL / MENA context changes the recommendation" a per-lesson editorial requirement, or assumed to be content-authoring concern (out of scope)? [Clarity, Constitution §IV, Spec §FR-028]

## Principle V — Source Integrity & Copyright Safety (NON-NEGOTIABLE)

- [ ] CHK020 - Is the design bundle's provenance recorded (Claude Design, Anthropic, our own design — not a third-party copyrighted template)? [Traceability, Spec §Design source of truth]
- [ ] CHK021 - Are font licenses (Newsreader, Geist, Geist Mono) addressed in the spec or assumed via Google Fonts? [Coverage, Gap, Constitution §V]
- [ ] CHK022 - Is the constraint "no verbatim reproduction of proprietary lesson content from referenced courses" relevant to a UI-only redesign — and if not, is the irrelevance explicit? [Clarity, Constitution §V]

## Engineering Constraints (Section "Quality & Engineering Constraints")

- [ ] CHK023 - Are the file-length (50-line function cap) and complexity (≤10) constraints stated as gates for *new* code (`src/course/**`), or for the whole repo? [Clarity, Plan §Complexity Tracking, Constitution §Quality]
- [ ] CHK024 - Is the existing 1,843-line `src/App.jsx` exception documented as a tracked debt with a follow-up owner, or implicitly waived? [Traceability, Plan §Complexity Tracking, Constitution §Quality]
- [ ] CHK025 - Are the 85% test-coverage and "regression test per bug fix" requirements explicitly applied to this feature, or only inherited from the constitution? [Coverage, Constitution §Quality]
- [ ] CHK026 - Is the rule "secrets in `.env`, never source" relevant here — and if so, is any Promptfoo / Langfuse key handling re-validated, even though no AI surface is added? [Coverage, Constitution §Quality]

## Governance & Amendment

- [ ] CHK027 - Is the SC-008 "exactly 4 tools" gate written as something a reviewer can refuse a merge over, citing the spec and the constitution together? [Measurability, Spec §SC-008, Constitution §Governance]
- [ ] CHK028 - If a future change adds a fifth tool, is the amendment path documented in the spec (which constitution version bump, which docs to update)? [Traceability, Plan Quickstart §5, Constitution §Governance]
- [ ] CHK029 - Are documentation update obligations (Constitution Workflow: "behavior, API, or content-shape change MUST update relevant docs in the same change") referenced from the spec? [Coverage, Constitution §Workflow]

## Workflow Alignment

- [ ] CHK030 - Is the Speckit chain (`/speckit-constitution → specify → plan → tasks → implement`) referenced in the spec's assumptions or only in the constitution? [Traceability, Constitution §Workflow]
- [ ] CHK031 - Is the `/evolve` post-task requirement called out for this feature, or only as a global rule? [Coverage, Constitution §Workflow]

## Notes

- These items test whether the spec is *specific enough to enforce* the constitution principles. Resolution does not mean implementing the feature — it means strengthening the spec (or accepting a gap with rationale in `Assumptions`).
- Five NON-NEGOTIABLE constraints exist (Principles I and V, plus the engineering posture in Section 11). Any `[Gap]` item touching those should be resolved before `/speckit-implement`.
- For items that resolve to "this is fine as-is," consider adding a one-line `Assumptions` entry to `spec.md` to make the resolution durable.
