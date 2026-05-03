# 2026 Curriculum Gap Remediation + Updated Badge — Task Board

**Plan**: `docs/plans/21-2026-curriculum-gap-remediation-plan.md`  
**Spec**: `docs/specs/21-2026-curriculum-gap-remediation-spec.md`  
**Created**: 2026-05-02  

## Summary

Total Phases: 5 | Total Tasks: 22 | Parallel Tasks: 14 (5 waves of max 3) | Sequential Tasks: 8 | Est. Complexity: High

---

## Phase 1: Updated Badge Infrastructure — ⛔ Prerequisite for all badge functionality

> All Phase 1 tasks are sequential. T-001 and T-002 write to the same storage module; T-003 must exist before wiring in T-004/T-005.

- [x] [frontend] [S] TASK-001: Extend `moduleStorage.js` — add `lessonCompletedAt` to storage schema
      Agent: frontend
      Priority: P0
      Deps: None
      File: `src/utils/moduleStorage.js`
      Exit: `loadProgress()` returns a `lessonCompletedAt` key with value `{}` when no timestamps exist; existing stored progress loads without error (no migration needed — absent key defaults to `{}`). Manually clear localStorage and reload to verify default state.

- [x] [frontend] [S] TASK-002: Record first-completion timestamp on lesson state change
      Agent: frontend
      Priority: P0
      Deps: TASK-001
      File: `src/App.jsx` (lesson state-change handler, ~line 1390 area)
      Exit: When a lesson's state transitions to `"Quiz completed"`, `"Artifact started"`, or `"Artifact completed"` for the first time, `lessonCompletedAt[key]` is written with `new Date().toISOString()`. If a timestamp already exists for that key, it is NOT overwritten (first-completion semantics). Verified by completing a lesson, checking localStorage, completing again, and confirming timestamp is unchanged. Also verify: when a lesson state is reset (if reset action exists), `lessonCompletedAt[key]` is deleted so the badge can fire again after re-completion.

- [x] [frontend] [S] TASK-003: Create `UpdatedBadge` component
      Agent: frontend
      Priority: P0
      Deps: TASK-001
      File: `src/components/UpdatedBadge.jsx` (new file)
      Exit: Component accepts props `{ updatedAt: string | undefined, completedAt: string | undefined }`. Renders a compact chip with label `UPDATED`, background `#7C3AED`, white text `#FFFFFF`, same padding/border-radius as existing type tag badges. Renders NOTHING when (a) `updatedAt` is absent, (b) `completedAt` is absent, or (c) `updatedAt ≤ completedAt`. Contrast check: `#7C3AED` on `#FFFFFF` ≥ 4.5:1 ✅. Manual test: pass `updatedAt="2026-05-02"` and `completedAt="2026-04-01"` → badge renders. Pass `updatedAt="2026-04-01"` and `completedAt="2026-05-02"` → badge absent.

- [x] [frontend] [S] TASK-004: Wire `UpdatedBadge` into sidebar lesson list
      Agent: frontend
      Priority: P0
      Deps: TASK-002, TASK-003
      File: `src/App.jsx` (~line 1390, sidebar lesson button render)
      Exit: Sidebar lesson button imports `UpdatedBadge`, reads `lessonCompletedAt[lk]` from progress state, passes `lesson.meta?.updatedAt` and stored timestamp as props. Badge renders inline after `FreshnessBadge`. No visual regression on lessons without `updatedAt`. Verify at 375px, 768px, 1024px — badge does not overflow the sidebar button layout.

- [x] [frontend] [S] TASK-005: Wire `UpdatedBadge` into main content lesson header
      Agent: frontend
      Priority: P0
      Deps: TASK-004
      File: `src/App.jsx` (~line 1472, main content lesson header)
      Exit: Lesson header renders `UpdatedBadge` alongside the type tag. Same prop pattern as sidebar. Visually verify: badge appears in header for a lesson with `updatedAt` set and recorded completion; badge absent for lessons without `updatedAt`. Keyboard focus order unaffected (badge is non-interactive display element).

---

## Phase 2: Wave A — Critical Content (3 lessons + 2 patches)

> Prerequisite: Phase 1 complete. T-006 through T-009 write to different sections of `curriculum.js` and are fully parallel. Max 3 at once — split into two sub-waves.

### Wave A-1 (run 3 in parallel)

- [x] [frontend] [P] TASK-006: Add Lesson 2.3 — Reasoning/Thinking Models (US-001)
      Agent: frontend
      Priority: P0
      Deps: TASK-005
      File: `src/data/curriculum.js` — append to Module 2 lessons array
      Spec ACs: US-001 AC-001 through AC-007
      Exit: Object `{ id: "2.3", title: "Reasoning & Thinking Models", type: "technical", meta: { updatedAt: "2026-05-02", lastVerified: "2026-Q2", ... } }` exists in Module 2. Content contains: (1) thinking model tier definition naming Claude extended thinking / o3 / Gemini 2.5 Pro, (2) decision flowchart prose covering 4 dimensions with binary recommendation, (3) UX section covering 30–120s latency patterns + progress indicators, (4) 5-constraint model table (Quality / Latency / Cost / Privacy / **Compute Budget**), (5) reasoning token cost worked example with fast-model comparison, (6) 5-scenario classification exercise with answer key, (7) failure mode section on over-reasoning + hallucinated chains. Lesson renders in app without errors.

- [x] [frontend] [P] TASK-007: Add Lesson 8.3 — MCP Fundamentals (US-002)
      Agent: frontend
      Priority: P0
      Deps: TASK-005
      File: `src/data/curriculum.js` — append to Module 8 lessons array
      Spec ACs: US-002 AC-001 through AC-007
      Exit: Object `{ id: "8.3", title: "MCP: The Agent Integration Standard", type: "technical", meta: { updatedAt: "2026-05-02", lastVerified: "2026-Q2", ... } }` exists in Module 8. Content contains: (1) MCP definition + client/server model + ≥5 named enterprise tool servers, (2) tool-scope decision framework covering read data / actions / blast radius, (3) Principle of Least Capability named and explained, (4) security model covering approval flows / HITL checkpoints / audit logging, (5) conceptual reframe replacing "how to give agent access to X", (6) PM tool-scope exercise (customer support agent scenario), (7) over-grant failure mode with ≥2 illustrative examples. Lesson renders without errors.

- [x] [frontend] [P] TASK-008: Patch Lesson 1.4 — Add 5th Constraint "Compute Budget" (US-003)
      Agent: frontend
      Priority: P0
      Deps: TASK-005
      File: `src/data/curriculum.js` — locate lesson containing the 4-constraint model
      Spec ACs: US-003 AC-001
      Exit: The 4-constraint model lesson now contains a 5-constraint table with "Compute Budget" defined as "reasoning tokens budgeted per inference call; a dynamic variable set at runtime, not compile time." `meta.updatedAt` is set to `"2026-05-02"` on this lesson. The purple UPDATED badge fires in the app for this lesson after simulating a prior completion. (If the 4-constraint model lives in lesson 1.4, patch 1.4; if it lives elsewhere, locate and patch the correct lesson — do not assume the ID without reading the file first.)

### Wave A-2 (run 1 in parallel — only 1 remaining)

- [x] [frontend] [P] TASK-009: Patch Token Economics Lesson — Reasoning Token Cost Section (US-003)
      Agent: frontend
      Priority: P0
      Deps: TASK-005
      File: `src/data/curriculum.js` — locate Module 2 token economics lesson
      Spec ACs: US-003 AC-002, AC-004
      Exit: The token economics lesson (Module 2, likely lesson 2.1 or 2.2) contains: (1) reasoning token cost worked example — fast model at $1/1M vs. thinking model input $15 + output $60 + reasoning $80 per 1M for 1,000 daily calls, with break-even quality threshold framing, (2) "runaway thinking" failure mode with max-token budget as the guard. `meta.updatedAt: "2026-05-02"` set on this lesson. UPDATED badge fires for prior completions.

---

## Phase 3: Wave B — Important Content (1 new lesson + 3 patches)

> Prerequisite: Phase 2 complete. **Pre-flight required for TASK-010**: read Modules 3 and 4 in `curriculum.js` before writing — context engineering may already have a home there. All 4 tasks are parallel after the pre-flight.

- [x] [frontend] [S] TASK-010-PRE: Read Modules 3 and 4 in curriculum.js to locate context engineering coverage
      Agent: frontend
      Priority: P0
      Deps: TASK-009
      File: `src/data/curriculum.js` (read only)
      Exit: Confirm whether a context engineering lesson exists in Module 3 or 4. If yes → TASK-010 is a patch of that lesson. If no → TASK-010 creates Lesson 5.3. Document the finding in a one-line comment at the top of TASK-010's edit.

### Wave B-1 (run 3 in parallel after TASK-010-PRE)

- [x] [frontend] [P] TASK-010: Add/Patch Context Engineering as a Discipline (US-004)
      Agent: frontend
      Priority: P1
      Deps: TASK-010-PRE
      File: `src/data/curriculum.js` — patch existing Module 3/4 lesson OR create `id: "5.3"` in Module 5
      Spec ACs: US-004 AC-001 through AC-006
      Exit: A dedicated context engineering lesson exists with: (1) discipline definition (designing/structuring/managing model input — distinct from "prompting"), (2) system prompt as versioned artifact with versioning/testing framing, (3) prompt caching economics — 10K token system prompt × 1K requests/day → ~80% cost reduction worked example, (4) `CLAUDE.md`/`AGENTS.md` pattern reference with brief explanation, (5) system prompt audit exercise (cache vs. per-request vs. RAG-injected classification), (6) "lost-in-the-middle" failure mode and structural mitigation. `meta.updatedAt: "2026-05-02"`.

- [x] [frontend] [P] TASK-011: Patch Module 6 RAG Lesson — Advanced Patterns (US-005)
      Agent: frontend
      Priority: P1
      Deps: TASK-010-PRE
      File: `src/data/curriculum.js` — locate and patch the existing RAG lesson in Module 6
      Spec ACs: US-005 AC-001 through AC-005
      Exit: The RAG lesson contains 5 new sections: (1) hybrid search (BM25 + semantic vector) positioned as 2026 default with 1-sentence rationale for why pure vector underperforms on precise queries, (2) reranking — cross-encoder reranker explanation + when to apply (top-K → rerank → top-3) + PM metrics improved, (3) Long-Context vs. RAG decision table with 5 columns: corpus size / update frequency / cost per query / latency / privacy — recommendation per scenario, (4) Agentic RAG paragraph (2–3 paragraphs, PM implication: eval must cover retrieval decision quality), (5) "retrieved noise" failure mode + 3 PM-level levers (chunk size, top-K, reranking). `meta.updatedAt: "2026-05-02"`. UPDATED badge fires.

- [x] [frontend] [P] TASK-012: Add Lesson 6.3 — Fine-Tune vs. RAG vs. Prompt Decision (US-006)
      Agent: frontend
      Priority: P1
      Deps: TASK-010-PRE
      File: `src/data/curriculum.js` — append to Module 6 lessons array (after the patched RAG lesson)
      Spec ACs: US-006 AC-001 through AC-007
      Exit: Object `{ id: "6.3", title: "Fine-Tune vs. RAG vs. Prompt-Only: The Decision Framework", type: "framework", meta: { updatedAt: "2026-05-02", lastVerified: "2026-Q2", ... } }` in Module 6. Content: (1) 3-way decision matrix (task type / data / latency / cost-at-scale / update frequency → winner), (2) fine-tune criteria (format/style specificity, latency-critical, high call volume), (3) RAG criteria (live data, corpus >500K tokens, citations, cost control), (4) distillation section — frontier model → labeled examples → fine-tune smaller model with illustrative cost comparison, (5) synthetic data generation for fine-tuning, (6) 4-scenario classification exercise with answers, (7) fine-tune over-fit failure mode + RAG-with-fine-tune noise failure mode.

### Wave B-2 (run 1 in parallel after Wave B-1)

- [x] [frontend] [P] TASK-013: Patch Lesson 9.2 — EU AI Act Full Sub-Lesson (US-007)
      Agent: frontend
      Priority: P1
      Deps: TASK-010-PRE
      File: `src/data/curriculum.js` — locate and expand Lesson 9.2
      Spec ACs: US-007 AC-001 through AC-007
      Exit: Lesson 9.2 content is ≥800 words (verify character count). Contains: (1) GPAI Model rules + 4 risk tiers (prohibited / high-risk / limited-risk / minimal-risk) with PM-decision implications per tier, (2) Article 50 prohibited practices — ≥3 consumer AI examples: subliminal manipulation / real-time biometric surveillance / social scoring, (3) transparency obligations — when to disclose, what to say, which surfaces trigger, (4) Article 22 automated decision rights — human review trigger conditions + product categories most exposed, (5) risk-classification exercise — 5 product descriptions → tier classification with 1-line justification, (6) PM checklist artifact with 8–10 kickoff questions, (7) misclassification consequences table by tier. `meta.updatedAt: "2026-05-02"`. UPDATED badge fires.

---

## Phase 4: Wave C — Nice-to-Have Content (4 patches)

> Prerequisite: Phase 3 complete. All 4 tasks write to different lessons and are fully parallel. Split into 2 sub-waves of max 3.

### Wave C-1 (run 3 in parallel)

- [x] [frontend] [P] TASK-014: Add On-Device/Edge AI Primer — Module 8.4 or patch 8.2 (US-008)
      Agent: frontend
      Priority: P2
      Deps: TASK-013
      File: `src/data/curriculum.js` — new `id: "8.4"` in Module 8 OR patch existing 8.2 (read 8.2 first; if it already covers agents broadly, create 8.4)
      Spec ACs: US-008 AC-001 through AC-004
      Exit: On-device AI content exists in Module 8 with: (1) Apple Intelligence / Samsung Galaxy AI / Gemini Nano named as live 2026 product surfaces, (2) on-device vs. cloud decision table — 5 dimensions: privacy / latency / cost / capability / connectivity, (3) capability gap — on-device (1–7B params) vs. frontier cloud (hundreds of B) with task envelope examples, (4) OS firmware update cycle as PM release-cadence implication. `meta.updatedAt: "2026-05-02"`.

- [x] [frontend] [P] TASK-015: Patch Lesson 12.1 — Benchmark Literacy Sub-Section (US-009)
      Agent: frontend
      Priority: P2
      Deps: TASK-013
      File: `src/data/curriculum.js` — locate and patch Lesson 12.1 vendor strategy
      Spec ACs: US-009 AC-001 through AC-005
      Exit: Lesson 12.1 has a benchmark literacy section containing: (1) ≥6 benchmarks defined — MMLU / MATH / HumanEval / GPQA / SWE-Bench / Chatbot Arena Elo — with what each measures + PM-relevant interpretation, (2) vendor comparison exercise — 4 models × 3 benchmarks × 3 product scenarios, (3) benchmark gaming section — cherry-picking / contamination / why Chatbot Arena is harder to game, (4) benchmark-to-production gap section with domain-specific eval as remedy. `meta.updatedAt: "2026-05-02"`. UPDATED badge fires.

- [x] [frontend] [P] TASK-016: Patch Lesson 6.1 — AI Coding Agents in Build Loop (US-010)
      Agent: frontend
      Priority: P2
      Deps: TASK-013
      File: `src/data/curriculum.js` — locate and patch Lesson 6.1 (60-minute prototype rule)
      Spec ACs: US-010 AC-001 through AC-005
      Exit: Lesson 6.1 updated to state the 2026 prototype workflow: "PM writes spec → Claude Code / Cursor generates working PR → PM reviews PR — 60 minutes now produces a PR, not just a flow diagram." Contains: (1) PM-to-agent spec format checklist — ACs as test cases / data model / API contract / out-of-scope items, (2) PM-as-reviewer checklist — ACs fulfilled / no hardcoded secrets / no console.log in production / type errors cleared, (3) cross-link to micro-teams doc, (4) "agent hallucination in code" failure mode with well-written AC as mitigation. `meta.updatedAt: "2026-05-02"`. UPDATED badge fires.

### Wave C-2 (run 1 in parallel)

- [x] [frontend] [P] TASK-017: Patch Lesson 1.2 — Competitive Moats Sub-Section (US-011)
      Agent: frontend
      Priority: P2
      Deps: TASK-013
      File: `src/data/curriculum.js` — locate and patch Lesson 1.2 (AI Wedge/Core opportunity landscape)
      Spec ACs: US-011 AC-001 through AC-004
      Exit: Lesson 1.2 has a moats section containing: (1) commoditization framing — GPT-4o / Claude Sonnet / Gemini Flash at <$1/1M tokens with near-parity, (2) ≥4 moat sources defined: data flywheel / workflow integration depth / proprietary fine-tune / trust+brand capital — each with one-line build requirement, (3) moat-mapping exercise — 3 product concepts + student maps applicable moat source(s) + what product must do to build it, (4) "feature not product" failure mode — sole advantage is calling a better model → defensibility risk on next model release. `meta.updatedAt: "2026-05-02"`. UPDATED badge fires.

---

## Phase 5: Smoke Test & Index Update

> Prerequisite: All Phase 4 tasks complete.

- [x] [any] [S] TASK-018: Smoke-test all new/patched lessons render in the app
      Agent: any
      Priority: P0
      Deps: TASK-014, TASK-015, TASK-016, TASK-017
      Exit: App loads without JavaScript errors. Every new lesson ID (2.3, 6.3, 8.3, 8.4 if created) appears in the correct module's sidebar. Every patched lesson renders its existing content plus new sections without truncation or markdown parse errors. DevTools console: zero errors on page load and on navigating to each new/patched lesson.

- [x] [any] [S] TASK-019: End-to-end Updated badge smoke test
      Agent: any
      Priority: P0
      Deps: TASK-018
      Exit: Manual flow — (1) navigate to a patched lesson (e.g., 1.4 with `updatedAt: "2026-05-02"`), (2) advance lesson state to "Quiz completed" via the UI, (3) check localStorage `ai-pm-progress` for `lessonCompletedAt` entry, (4) confirm purple UPDATED badge is NOT shown yet (completedAt is now > updatedAt since the patch was just added — simulate by temporarily setting `completedAt` to a date before `updatedAt`), (5) confirm badge appears in both sidebar and lesson header, (6) confirm badge disappears after re-completing the lesson with a fresh `completedAt`. Badge displays correctly at 375px and 1024px viewport widths.

- [x] [any] [S] TASK-020: Verify `updatedAt` and `lastVerified` set on all 11 affected lessons
      Agent: any
      Priority: P0
      Deps: TASK-018
      Exit: Grep `curriculum.js` for `updatedAt`. Count confirms ≥11 entries (lessons 2.3, 8.3, and the 9 patched lessons). Grep for `lastVerified` on the same lessons confirms `"2026-Q2"` value present on all new/patched entries. FreshnessBadge shows FRESH on all new/patched lessons (not STALE or UNVERIFIED).

- [x] [any] [S] TASK-021: Update `docs/specs/README.md` — mark Spec 21 implemented
      Agent: any
      Priority: P1
      Deps: TASK-020
      Exit: `docs/specs/README.md` entry for `21-2026-curriculum-gap-remediation-spec.md` status updated from `📝 Ready for /plan` to `✅ Implemented`. No other entries modified.

- [x] [any] [S] TASK-022: Verify index position safety — confirm new lessons appended, not inserted
      Agent: any
      Priority: P0
      Deps: TASK-018
      Exit: Confirm in `curriculum.js` that new lessons 2.3, 6.3, 8.3 (and 8.4 if created) are appended at the END of their respective module lesson arrays. No lesson object was inserted at a position that shifts the array index of existing lessons. Verify by checking that the first and last lesson IDs in modules 2, 6, and 8 match expectations before and after the change. This protects saved `activeLesson` index state in localStorage from drifting.

---

## Parallelization Map

```
Phase 1 (sequential — same files):
  T-001 → T-002 → T-003 → T-004 → T-005

Phase 2 (parallel after T-005):
  Wave A-1: T-006 ║ T-007 ║ T-008  (max 3)
  Wave A-2: T-009

Phase 3 (parallel after T-009, with pre-flight gate):
  T-010-PRE (sequential read-only)
  Wave B-1: T-010 ║ T-011 ║ T-012  (max 3)
  Wave B-2: T-013

Phase 4 (parallel after T-013):
  Wave C-1: T-014 ║ T-015 ║ T-016  (max 3)
  Wave C-2: T-017

Phase 5 (sequential smoke tests):
  T-018 → T-019 → T-020 → T-021 → T-022
```

---

## AC Coverage Matrix

| Spec Story | ACs | Tasks |
|---|---|---|
| US-001 Thinking Models | AC-001 – AC-007 | TASK-006 |
| US-002 MCP | AC-001 – AC-007 | TASK-007 |
| US-003 Test-Time Compute | AC-001 – AC-004 | TASK-008, TASK-009 |
| US-004 Context Engineering | AC-001 – AC-006 | TASK-010 |
| US-005 RAG Advanced | AC-001 – AC-005 | TASK-011 |
| US-006 Fine-Tune/RAG/Prompt | AC-001 – AC-007 | TASK-012 |
| US-007 EU AI Act | AC-001 – AC-007 | TASK-013 |
| US-008 On-Device AI | AC-001 – AC-004 | TASK-014 |
| US-009 Benchmark Literacy | AC-001 – AC-005 | TASK-015 |
| US-010 AI Coding Agents | AC-001 – AC-005 | TASK-016 |
| US-011 Competitive Moats | AC-001 – AC-004 | TASK-017 |
| Updated Badge (all) | Storage, component, wiring | TASK-001 – TASK-005 |
| Smoke / integrity | Index safety, badge E2E, freshness | TASK-018 – TASK-022 |

All 52 ACs from the spec covered. ✅

---

## TASKS_GATE

- [x] Work divided into 5 dependency-aware phases
- [x] Tasks are atomic — single lesson or single component per task
- [x] All parallelizable tasks tagged `[P]`; sequential tagged `[S]`
- [x] Every task has a concrete, testable Exit Criteria traced to spec AC
- [x] All 52 acceptance criteria from spec covered by at least one task
- [x] Index position safety verified as an explicit task (TASK-022)
- [x] Pre-flight read gate for Module 3/4 explicit (TASK-010-PRE)

---

```
📋 PM BREAKDOWN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project:           2026 Curriculum Gap Remediation + Updated Badge
Total Phases:      5
Total Tasks:       22
Parallel Tasks:    14 (5 sub-waves of max 3)
Sequential Tasks:  8
Tasks Location:    docs/tasks/21-2026-curriculum-gap-remediation-tasks.md
Status:            ✅ Ready for the /implement workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
