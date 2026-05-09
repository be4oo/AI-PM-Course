# Curriculum Gap Analysis — 2026-05-08

**Status:** Audit complete. **Verdict:** No critical content gaps remaining. Curriculum is materially up-to-date as of 2026-Q2.

## Executive Summary

A gap analysis circulated in early May 2026 flagged ~11 "critical / important / nice-to-have" gaps in the AI-PM-Course curriculum, including reasoning models, MCP, EU AI Act detail, edge AI, agentic RAG, and CLAUDE.md/AGENTS.md.

After auditing the **rendered curriculum** — `src/data/curriculum.js`, the JS module that drives the GitHub Pages site — **9 of 10 confirmed gaps are already present** as full lessons or substantive sections. The original analysis was sourced from `docs/UNIFIED_AI_PM_CURRICULUM.md`, a one-time aggregation that has drifted from the live source. There is no script that regenerates it, so the MD file silently goes stale every time `curriculum.js` is updated.

The real problem is **doc drift**, not curriculum gaps.

## Methodology

- **Source of truth:** `src/data/curriculum.js` (66 lessons, 13 modules including 8.5)
- **Stale snapshot:** `docs/UNIFIED_AI_PM_CURRICULUM.md` (aggregation, no regeneration script)
- **Verification:** every claim below was confirmed by direct `grep -n` against `src/data/curriculum.js` on 2026-05-08

## Topic-by-Topic Verification

| Topic flagged as gap | Actual location in `src/data/curriculum.js` | Verdict |
|---|---|---|
| Reasoning / thinking models lesson | Module 2 (lines 278–295) + full lesson at 443–514 | Present, full lesson |
| MCP fundamentals | Lesson 3.3 (full lesson with Linux Foundation governance, 97M+ SDK downloads, Read/Write/Delete taxonomy) | Full lesson |
| Test-time compute economics | Lines 208–210, 278–295, 318 | Present |
| Compute Budget as 5th constraint | Lines 208–210, 473–474, 508 ("5-constraint model: add Compute Budget to Quality/Latency/Cost/Privacy") | Present |
| Context engineering as discipline | Module 3 entire (3 lessons) | Full module |
| Hybrid search + reranking | Lesson 3.2 (Semantic 0.7 + BM25 0.3, Cohere Rerank / BGE Reranker, 15–30% quality boost) | Present |
| Long-context vs RAG decision | Lesson 3.1 Layer 2 tradeoff matrix | Present |
| Agentic RAG | Line 626 (self-directed retrieval, retrieval-decision eval) | Present |
| Fine-tune vs RAG vs prompt-only | Lesson 3.3 escalation ladder + lines 716–746 | Present |
| Distillation + synthetic data generation | Lines 716–733 (frontier-model-as-teacher pattern, $30–50 distillation cost) | Present |
| EU AI Act detail (GPAI, Article 50, Article 22) | Lines 1697–1771, 1866 (full lesson with risk classification table, prohibited manipulation, automated decision rights) | Full lesson |
| Edge / on-device AI | Lesson 8.3 lines 1437–1497 (Apple Intelligence, Gemini Nano, hybrid architecture, OS update cycle constraint) | Full lesson |
| SWE-Bench + Chatbot Arena Elo benchmarks | Lines 2071–2083 (full benchmark literacy table) | Present |
| CLAUDE.md / AGENTS.md spec pattern | Lines 564–570 + Lesson 7.2 lines 1192–1210 ("AGENTS.md and Repo Policy") | Present |
| Moats / data flywheel in commoditization era | Lesson 2.2 (4 sources: data, distribution, trust, learning loops; Cursor case study) | Present |
| Micro-teams (SWTeams.md) integration | Module 8.5 — 6 lessons (8.5.1–8.5.6) at lines 1503–1602 | Integrated |
| Module 4 (Discovery) thinness | 2 lessons present (4.1, 4.2) | Light vs. peers |

## Confirmed Remaining Gaps

Only four genuine items remain after the verification pass:

1. **MD aggregation drift.** `docs/UNIFIED_AI_PM_CURRICULUM.md` is the artifact most external readers reach for. It is stale and actively misled the May 8 gap analysis. No regeneration script exists.
2. **Module 4 still thin.** 2 lessons vs. 3+ in peer modules. Originally flagged P0 in `docs/gap-matrix-2026-04-11.md`.
3. **`SWTeams.md` cross-reference missing.** The standalone file at the repo root does not link forward to Module 8.5, even though 8.5 is the curriculum integration of its content. Readers landing on `SWTeams.md` from search or from external links don't discover the integration.
4. **No published audit artifact.** Future audits will hit the same false-positive trap if there is no document recording that the perceived gaps were resolved before May 2026.

## Recommendations (Now / Next / Later)

Following the convention in `docs/master-audit-and-implementation-log.md`.

### Now
- [x] Publish this gap analysis at `docs/curriculum-gap-analysis-2026-05-08.md`
- [x] Add cross-reference header to `/SWTeams.md` pointing to Module 8.5
- [x] Add stale-snapshot header to `docs/UNIFIED_AI_PM_CURRICULUM.md` declaring the JS source of truth

### Next (completed 2026-05-08)
- [x] **Expanded Module 4 to 3 lessons.** Added 4.3: *"Quantifying AI Pain: Override Rate, Time-to-Task & the Eval Threshold Bridge"* — formalizes the override-rate method, time-to-task baseline, and the discovery → eval threshold handoff. Live in `src/data/curriculum.js`.
- [x] **Built `scripts/build-unified-md.mjs`.** Regenerates `docs/UNIFIED_AI_PM_CURRICULUM.md` from `src/data/curriculum.js`. Wired as `npm run docs:unified`. Companion `npm run docs:unified:check` is a CI-friendly freshness gate that fails when the MD has drifted from the JS.
- [x] **Wired `docs:unified:check` into CI.** New `.github/workflows/docs-sync.yml` runs on every PR that touches the curriculum JS, the unified MD, or the script — and on every push to `main`/`develop`. Also added to the weekly `freshness-check.yml` cron so drift is caught even if the path filter misses an edit.
- [ ] **Add gap-matrix entry** in `docs/gap-matrix-2026-04-11.md` (or a successor file) tracking the regeneration script as a freshness-control measure. *(Optional — the script header, this audit, and the new CI workflow document the control.)*

### Later (completed 2026-05-08)
- [x] **Federated learning + differential privacy + confidential enclaves.** Added as a "Privacy-Preserving Training" section in Lesson 8.3, covering the three patterns (federated learning, DP, Apple Private Cloud Compute / confidential enclaves), PM trade-offs, and the disclosure obligations that map to GDPR Article 22 and the EU AI Act lesson.
- [x] **Voice agent UX patterns.** New Lesson 8.4 *"Voice Agent UX: Turn-Taking, Barge-In & the Latency Budget"* — production voice patterns including the < 800ms latency budget, streaming pipeline requirements, VAD + semantic endpointing turn-taking, hot-mic barge-in, backchanneling at the 800ms silent-gap threshold, tool-use audio tiers, voice + visual co-presence, and async voice for long tasks.

## Related Existing Artifacts (Do Not Recreate)

- `docs/templates/regulatory-readiness-checklist.md` — already covers EU AI Act tiering
- `docs/templates/model-routing-policy.md` — already covers benchmark-based routing
- `docs/design/context-engineering-audit.md` — already exists
- `docs/examples/agents-md/` — three CLAUDE.md/AGENTS.md examples (startup / YC-scale / enterprise)
- `docs/freshness-report.md` — published 2026-Q2 freshness assessment
- `docs/master-audit-and-implementation-log.md` — broader audit history
- `docs/gap-matrix-2026-04-11.md` — gap-tracking format

## Verification Commands

To re-run the audit:

```bash
# Confirm every "present" claim in the table
grep -n -i "EU AI Act\|GPAI\|Article 50\|Article 22\|test-time compute\|reasoning token\|edge AI\|on-device\|Apple Intelligence\|Gemini Nano\|distillation\|synthetic data\|SWE-bench\|chatbot arena\|agentic RAG\|CLAUDE.md\|AGENTS.md\|compute budget\|extended thinking" src/data/curriculum.js

# Count lessons per module
grep -n 'id: "' src/data/curriculum.js | wc -l

# Verify the source of truth is what the site renders
grep -rn "from.*curriculum" src/
```
