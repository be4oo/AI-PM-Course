<!--
Sync Impact Report
==================
Version change: (template, unratified) → 1.0.0
Modified principles: N/A (initial ratification)
Added sections:
  - Core Principles (I–V)
  - Quality & Engineering Constraints
  - Development Workflow
  - Governance
Removed sections: none
Templates requiring updates:
  - .specify/templates/plan-template.md (✅ compatible — Constitution Check refers to "the constitution" generically)
  - .specify/templates/spec-template.md (✅ compatible — no constitution-specific tokens)
  - .specify/templates/tasks-template.md (✅ compatible — task categories align with principles)
  - .claude/commands/*.md (✅ compatible — Orchestra commands are project-agnostic)
  - README.md (✅ no changes required at ratification)
  - CLAUDE.md (✅ Orchestra V3 doctrine remains the engineering substrate; constitution layers product-domain principles on top)
Follow-up TODOs: none
-->

# AI PM Course Constitution

## Core Principles

### I. Benchmark Transparency (NON-NEGOTIABLE)

Every learning claim, audit score, and curriculum gap MUST be traceable to a
named source and a visible benchmark inside the product. The audit view and
source library are first-class product surfaces, not internal artifacts. New
modules or lessons MUST NOT ship without (a) a benchmark entry showing what
external standard they meet or exceed, (b) a source citation with a
verification note, and (c) a delta statement when the project deviates from
the referenced standard.

Rationale: The product's differentiation is "harder, more transparent, more
hands-on than the public benchmark." Hiding the benchmark or the deltas
collapses that differentiation into ordinary courseware.

### II. Hands-On Artifact Bias

Every lesson MUST ship at least one downloadable, reusable artifact that a
practicing AI PM can apply on the job within the same week. Acceptable
artifacts include AI PRDs, eval rubrics, rollout checklists, responsible-AI
audits, prompt libraries, and ops kits. Pure-explainer lessons without an
artifact are out of scope for this product and MUST be reshaped or rejected.

Rationale: Applied AI PM mastery is built by shipping artifacts, not by
consuming theory. The artifact bias is what justifies the course existing
alongside free public material.

### III. Eval & Guardrail Discipline

Any feature that involves AI-generated content, prompts, model selection, or
agent behavior MUST be backed by Promptfoo evals and Langfuse observability
before it is exposed in the product. Failing evals MUST block release of the
feature; gaps in observability MUST block release of any change to a path
that was previously instrumented. Capstone deliverables MUST include an
eval pass and a guardrail design as part of their milestone scoring.

Rationale: Teaching evals and guardrails while shipping an unevaluated,
unobserved product is incoherent. The product must model the discipline it
teaches.

### IV. Bilingual & MENA-Inclusive by Default

Content, examples, and capstone scenarios MUST treat MENA-specific
considerations and at least one non-English language as first-class
requirements, not as a localization afterthought. New lessons MUST flag
where Arabic-language, RTL, or MENA regulatory/cultural context changes the
recommendation. Accessibility MUST meet WCAG 2.1 AA including RTL flow,
contrast, and screen-reader correctness for any bilingual surface.

Rationale: Most public AI PM material is monolingual and US-centric. MENA
inclusivity is part of the product's positioning; deferring it produces
the same gap the project was built to close.

### V. Source Integrity & Copyright Safety (NON-NEGOTIABLE)

The project MUST NOT reproduce proprietary lesson content verbatim from any
referenced course, paid program, or copyrighted source. Public marketing
pages MAY be used only to calibrate scope and positioning, with the access
date recorded in `docs/course-audit.md` or an equivalent ledger. Every
external excerpt MUST carry attribution and a verification note. When in
doubt, paraphrase, cite, and link — never copy.

Rationale: Benchmark transparency is meaningless if the underlying conduct
is unsafe. Source integrity protects learners, contributors, and the
product's right to exist.

## Quality & Engineering Constraints

Engineering execution MUST follow Orchestra V3 doctrine as encoded in
`CLAUDE.md`, `.claude/rules/00-protocol-zero.md`, `.claude/rules/01-universal-laws.md`,
and `.claude/rules/02-architecture-standards.md` through `08-error-prevention.md`.
This constitution layers product-domain principles on top of those rules and
does not override them. In addition:

- Stack: React 19, Vite, Vitest, ESLint flat config. Deviations require an ADR.
- Type safety: strict static typing where the language supports it; no
  implicit `any` in TypeScript surfaces if introduced.
- Performance: LCP < 2.5s, initial JS payload < 500kb parsed for the
  learner-facing app; lazy-load lesson media (WebP/AVIF) and code-split by
  module.
- Accessibility: WCAG 2.1 AA is a release gate, not a polish pass. Contrast
  ≥ 4.5:1 for text, ≥ 3:1 for interactive boundaries, full keyboard nav,
  visible focus rings, RTL parity.
- Security: secrets in `.env`, never in source; `.gitignore` covers `.env*`,
  `node_modules/`, `dist/`, `build/`; no hardcoded keys for Promptfoo or
  Langfuse; output sanitized to neutralize XSS in user-rendered lesson
  content.
- Test coverage: minimum 85% statement coverage on new product logic;
  regression test required for every bug fix; eval suites required for every
  AI-touching change.

## Development Workflow

- Spec-Driven Development is the default for any change larger than a
  trivial fix. The Speckit chain `/speckit-constitution → /speckit-specify
  → /speckit-clarify (when needed) → /speckit-plan → /speckit-tasks →
  /speckit-analyze (when needed) → /speckit-implement` is the canonical path
  for new lessons, new product surfaces, and structural refactors.
- Orchestra workflows (`/test`, `/review`, `/qa`, `/debug`, `/architecture`,
  `/evolve`) remain the canonical execution layer once a Speckit spec and
  plan exist. After `/speckit-implement`, follow with `/test`, then `/review`
  at milestones, then `/qa` before release.
- Git: feature branches only (`ai-[mode]-[description]` or speckit feature
  branches). Never commit to `main` directly. Conventional Commits are
  mandatory.
- Documentation: every behavior, API, or content-shape change MUST update
  the relevant docs (`README.md`, `docs/course-audit.md`, lesson metadata,
  or source library) in the same change.
- Learning loop: `/evolve` MUST run after any task that produced a durable
  lesson, bug pattern, or new constraint. Updates land in
  `.claude/rules/08-error-prevention.md`.

## Governance

- This constitution supersedes ad-hoc product decisions when they conflict
  with a stated principle. Engineering execution rules in Orchestra V3
  (`CLAUDE.md` and `.claude/rules/`) remain authoritative for code-level
  conduct; this constitution is authoritative for product-domain conduct.
- Amendments require: (a) a written rationale, (b) a version bump per the
  rules below, (c) a sync impact report at the top of this file, and (d)
  updates to any dependent templates or docs in the same change.
- Versioning policy (semantic):
  - MAJOR: a principle is removed, redefined incompatibly, or its scope
    materially narrowed.
  - MINOR: a principle, section, or material guidance is added or expanded.
  - PATCH: clarifications, wording, typo fixes, non-semantic refinements.
- Compliance review: any pull request that adds a lesson, module, eval
  suite, or product surface MUST cite the principles it satisfies and flag
  any principle it cannot satisfy with a justification. Reviewers MUST
  refuse merge if a NON-NEGOTIABLE principle is violated without an
  approved, time-bounded exception recorded in `docs/exceptions.md`.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26
