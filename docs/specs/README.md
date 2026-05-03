# Specs Index

| Spec File | Feature | User Stories | Status |
|---|---|---|---|
| [ai-native-mobile-lessons-spec.md](ai-native-mobile-lessons-spec.md) | AI-Native Mobile Curriculum Expansion | US-001 through US-008 | ✅ Ready for /plan |
| [google-pm-enrichment-spec.md](google-pm-enrichment-spec.md) | Google PM Certificate Curriculum Enrichment (all 6 courses) | US-001 through US-013 | ✅ Ready for /plan |
| [21-2026-curriculum-gap-remediation-spec.md](21-2026-curriculum-gap-remediation-spec.md) | 2026 Curriculum Gap Remediation (thinking models, MCP, RAG, EU AI Act, moats) | US-001 through US-011 | ✅ Implemented |

# AI PM Course — Enrichment Spec Set (20 Specs)

**Created**: 2026-04-16
**Status**: 📝 Draft set — ready for `/plan` workflow
**Author**: Beshoy (CardoO) + Claude audit pass

This directory contains 20 executable specifications for enriching the AI PM Course. Each spec follows the existing project spec format (`Overview → Actors → Current State → In/Out of Scope → User Stories with ACs → Affected Files → NFRs → Risks → Completion Report`) and is ready to drop into `docs/specs/` and run through the existing `/plan → /tasks` workflow.

---

## Execution Order (Priority Waves)

### Wave 1 — Low effort, high leverage (start this week)

| # | Spec | Priority | Est. Effort | Notes |
|---|---|---|---|---|
| 05 | Module 8.5 Bookmark Key Conflict Fix | P0 | 1 hour | Prevents future storage fragmentation |
| 20 | Freshness Score & Course Changelog | P0 | 1–2 days | Converts course into ongoing credibility asset |
| 15 | Micro-Teams 2026 Integration into Module 12 | P0 | 2 hours | Wires existing research doc into curriculum |
| 11 | AGENTS.md Anthology & Annotated Examples | P1 | 2 days | Pattern recognition beats templates |

### Wave 2 — Content additions (next 2 weeks)

| # | Spec | Priority | Est. Effort | Notes |
|---|---|---|---|---|
| 06 | Kill Criteria & Sunset Discipline Lesson | P0 | 1 day | Inverse of ROI — most AI products die slow |
| 07 | MENA Privacy & Data Residency | P0 | 2 days | Existential for CardoO/Fawry/Paymob work |
| 09 | Eval Debt & Maintenance | P0 | 1 day | Real teams accumulate eval debt fast |
| 04 | FinOps & Cost Observability | P0 | 2 days | Prevents runaway-agent failure mode |
| 10 | Multi-Tenant Safety for AI Systems | P0 | 2 days | B2B PM gap |
| 19 | Regulatory Readiness (EU AI Act, NIST, ISO 42001) | P0 | 2 days | Every B2B PM needs this now |
| 12 | AI Product Failure Anthology | P1 | 3 days | Disaster learning accelerates pattern recognition |
| 14 | AI-Native User Research | P0 | 2 days | Meta-gap: AI PM course should use AI for PM work |
| 03 | Prompt & Context Versioning as Code | P0 | 1 day | Table stakes at serious AI orgs |
| 02 | AI Product Analytics & Instrumentation | P0 | 2–3 days | Offline evals ≠ product metrics |
| 08 | AI PM Portfolio & Interview Prep | P0 | 1 day | Market-exit value |

### Wave 3 — Mechanics (next month)

| # | Spec | Priority | Est. Effort | Notes |
|---|---|---|---|---|
| 13 | Weekly Artifact CI Enforcement | P0 | 1 day | Turns "commits = cert" from aspiration to contract |
| 17 | Rubric Dimension G — Iteration Velocity | P0 | 1 day | Depends on Spec 01 review history |
| 18 | Persona Paths Onboarding | P1 | 3 days | Doubles TAM with low content cost |

### Wave 4 — Moats (4+ weeks each, pick one first)

| # | Spec | Priority | Est. Effort | Notes |
|---|---|---|---|---|
| 01 | Adversarial Cohort Simulator | P0 | 2–3 weeks | **Build this first for defensibility** |
| 16 | AI Product Strategy Game | P1 | 3–4 weeks | Experience mechanic Maven can't clone cheaply |

---

## Full Spec Index

| # | File | Summary |
|---|---|---|
| 01 | `01-adversarial-cohort-simulator-spec.md` | LLM-powered rubric-bound critic for learner artifacts |
| 02 | `02-ai-product-analytics-spec.md` | Session success, shadow mode, regret/containment metrics |
| 03 | `03-prompt-context-versioning-spec.md` | Prompt registry, semantic diff, PR review standards |
| 04 | `04-finops-cost-observability-spec.md` | Cost attribution, budgets, runaway-agent defense |
| 05 | `05-module-id-bookmark-conflict-fix-spec.md` | Normalize dot-in-key storage slugs with migration |
| 06 | `06-kill-criteria-lesson-spec.md` | Pre-committed sunset thresholds for AI features |
| 07 | `07-mena-privacy-data-residency-spec.md` | Saudi/UAE/Egypt PDPL, Arabic PII redaction |
| 08 | `08-portfolio-interview-prep-spec.md` | STAR-for-AI, leveling matrix, portfolio deck |
| 09 | `09-eval-debt-maintenance-spec.md` | Dataset drift, judge flakiness, coverage gaps |
| 10 | `10-multi-tenant-safety-spec.md` | Cross-tenant leakage, memory isolation, scoped evals |
| 11 | `11-agents-md-anthology-spec.md` | 3 annotated AGENTS.md exemplars (startup/YC/enterprise) |
| 12 | `12-ai-failure-anthology-spec.md` | Air Canada, Zillow, iTutor, DoNotPay case studies |
| 13 | `13-weekly-artifact-ci-enforcement-spec.md` | GitHub Action enforcing weekly artifact completeness |
| 14 | `14-ai-native-user-research-spec.md` | AI-synthesized themes, adversarial personas, WoO |
| 15 | `15-micro-teams-integration-spec.md` | Wire existing research doc into Module 12 |
| 16 | `16-ai-product-strategy-game-spec.md` | Branching decision scenarios with rubric-bound scoring |
| 17 | `17-rubric-iteration-velocity-spec.md` | Dimension G — auto-computed from review history |
| 18 | `18-persona-paths-onboarding-spec.md` | PM / Eng Lead / Founder / Domain Expert paths |
| 19 | `19-regulatory-readiness-spec.md` | EU AI Act risk tiers, NIST AI RMF, ISO 42001 |
| 20 | `20-freshness-score-changelog-spec.md` | Per-lesson freshness, top-nav changelog, weekly sweep |

---

## Dependency Graph

```
Spec 01 (Cohort Simulator)
  └─ Spec 17 (Velocity Dimension) ── requires review history

Spec 20 (Freshness) ── independent, enables trust for all other updates
Spec 05 (Bookmark Fix) ── independent, blocks nothing but fixes latent bug

Content specs (02, 03, 04, 06, 07, 08, 09, 10, 12, 14, 19)
  └─ mostly parallel; share `docs/templates/` additions

Spec 11 (AGENTS.md Anthology) ── depends on Module 7 lesson (existing)
Spec 13 (CI Enforcement) ── depends on artifact manifest stability
Spec 15 (Micro-Teams) ── depends on Module 12 lessons (existing)
Spec 18 (Persona Paths) ── best after Specs 01 + 17 to get full benefit
Spec 16 (Strategy Game) ── standalone high-effort build
```

---

## Aggregate Stats

- **Total User Stories**: 62
- **Total Acceptance Criteria**: ~225
- **New Lessons**: 14 (across Modules 1, 4, 6, 7, 9, 11, 12)
- **New Templates**: ~18 in `docs/templates/`
- **New UI Components**: ~7 (ReviewPanel, VelocityChart, PersonaPicker, ScenarioPlayer, ChangelogView, FreshnessBadge, FailureCaseView)
- **New Data Files**: ~8 (`reviewerPersonas.js`, `failureCases.js`, `scenarios.js`, `changelog.js`, `personas.js`, etc.)
- **New CI Workflows**: 2 (`weekly-artifact-check.yml`, `freshness-check.yml`)

---

## How to Use This Set

1. **Drop the 20 `.md` files into `docs/specs/`** in your repo.
2. **Start with Wave 1** — they are cheap and compound value.
3. **For each spec, run your existing `/plan` workflow** to produce `docs/plans/NN-<slug>-plan.md`.
4. **Then run `/tasks`** to produce `docs/tasks/NN-<slug>-tasks.md`.
5. **Ship in waves**, not all at once. Keep the main branch green.

Specs are versioned at `1.0.0` — revise before planning if scope changes. Mark status progression as `Draft → Planned → Implemented → Shipped` in each header.

---

## Open Questions (Ask Besho Before Planning)

1. **Spec 01 (Simulator) model choice** — Anthropic Claude for the reviewer, or multi-vendor via LiteLLM? Affects cost model and prompt format.
2. **Spec 13 (CI Enforcement)** — advisory-first for how long before switching some learners to strict? Suggest 4 weeks advisory, then strict for paid-tier capstone review.
3. **Spec 16 (Strategy Game)** — ship as a full separate experience or embed inside the existing lesson shell? Full separate is cleaner, more work.
4. **Spec 18 (Personas)** — do we add a paid founder-track later or stay free? Affects the persona config structure.
5. **Spec 20 (RSS)** — host on the same domain as the course app or a separate static site? Affects SEO/GEO implications per your stack preferences.
