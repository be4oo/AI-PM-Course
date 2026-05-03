# 2026 Curriculum Gap Remediation — Implementation Plan

**Spec**: `docs/specs/21-2026-curriculum-gap-remediation-spec.md`  
**Version**: 1.0.0  
**Created**: 2026-05-02  
**Status**: Ready for /tasks  

---

## Architecture Decision

All lessons are JavaScript objects embedded in `src/data/curriculum.js`. There are no standalone markdown files per lesson. All additions and patches go directly into this file's module/lesson arrays.

The "Updated" tag is a new first-class signal distinct from `FreshnessBadge` (which signals source staleness). It answers: "Did this lesson's content change *after* you completed it?" — requiring a new `updatedAt` meta field on lessons and a completion timestamp in the progress store.

---

## ADRs

### ADR-001: `updatedAt` vs. Reusing `lastVerified` for the Updated Tag

**Context**: We need a way to know if a lesson's content was meaningfully revised after a learner completed it.

**Options Considered**:
- **Option A — Reuse `lastVerified`**: Compare `lastVerified` against completion date. Simple, no new fields.  
  Trade-off: `lastVerified` means "sources are still accurate," not "lesson body changed." A quarterly source check would fire the badge even when content is untouched. Creates false positives and dilutes the signal.
- **Option B — New `updatedAt` field on `meta`**: Explicitly set `updatedAt: "YYYY-MM-DD"` only when lesson body, quiz, apply, or keys change meaningfully.  
  Trade-off: Requires discipline from the author to set the field. False negatives possible (author forgets to set it). But zero false positives — the badge fires only when explicitly authored.
- **Option C — `contentVersion` integer counter**: Increment a number; compare stored version at completion vs. current.  
  Trade-off: Requires storing the version number at completion time alongside the timestamp. More fragile — version has no semantic meaning without a changelog entry.

**Decision**: Option B — `updatedAt` field. The author-intent model is correct here: the "UPDATED" badge should fire when a human decides the content materially changed, not on every automated freshness check.

**Consequences**: Every new or patched lesson in this spec must include `meta.updatedAt`. Future lesson edits require the author to bump this field to activate learner notifications.

---

### ADR-002: Completion Timestamp Storage — New Field vs. Encoding in State String

**Context**: Currently `lessonStates[key]` stores a plain string (e.g., `"Quiz completed"`). To compare against `updatedAt`, we need to know *when* the learner reached a completed state.

**Options Considered**:
- **Option A — Encode timestamp in state string**: `"Quiz completed|2026-04-01"`. Parsed on read.  
  Trade-off: Brittle string parsing; breaks `LESSON_PROGRESS_STATES` enum comparisons throughout the codebase.
- **Option B — New `lessonCompletedAt` object in storage**: `{ [lessonKey]: "ISO timestamp" }` stored alongside existing `lessonStates`. Non-breaking addition — existing progress state strings are untouched.  
  Trade-off: Slightly larger storage payload. No behavioral change for lessons without `updatedAt`.
- **Option C — Derive from localStorage write timestamp**: Use `Date.now()` at write time but don't store a separate field.  
  Trade-off: No reliable way to reconstruct this later; each write overwrites and the timestamp is lost.

**Decision**: Option B — `lessonCompletedAt` object. It's a pure additive change to the storage schema, backward compatible, and makes the comparison logic trivially readable.

**Consequences**: `moduleStorage.js` must write `lessonCompletedAt[key] = new Date().toISOString()` the first time a lesson reaches any state ≥ "Quiz completed." Existing stored progress requires no migration — absent keys simply mean no recorded completion timestamp, and the badge will not fire (safe default).

---

### ADR-003: Updated Badge — New Component vs. Extending FreshnessBadge

**Context**: Where to render the "UPDATED" signal and whether to reuse the existing `FreshnessBadge` component.

**Options Considered**:
- **Option A — Add "UPDATED" as a new status in FreshnessBadge**: Pass a flag; `FreshnessBadge` renders a purple/blue "UPDATED" chip.  
  Trade-off: `FreshnessBadge` is purpose-built for source freshness; adding learner-state logic couples two unrelated concerns.
- **Option B — New `UpdatedBadge` component**: Standalone, receives `{ updatedAt, completedAt }`, renders a compact "UPDATED" chip only when `updatedAt > completedAt`.  
  Trade-off: One more component file. Keeps `FreshnessBadge` clean.

**Decision**: Option B — `UpdatedBadge` component at `src/components/UpdatedBadge.jsx`. Single-responsibility; easy to test; `FreshnessBadge` is not modified.

**Consequences**: `App.jsx` imports `UpdatedBadge` and renders it in two locations: sidebar lesson button and main content lesson header. Placement is additive — no existing markup removed.

---

## Phase Breakdown

### Phase 1 — Updated Badge Infrastructure
**Dependencies**: None — no curriculum content required  
**Files touched**: `src/utils/moduleStorage.js`, `src/components/UpdatedBadge.jsx` (new), `src/App.jsx`

**Tasks**:
- [ ] [P] **T-01** — Add `lessonCompletedAt: {}` to the initial storage state object in `moduleStorage.js` and include it in the serialization/deserialization round-trip (save/load functions). — *Exit: `loadProgress()` returns `lessonCompletedAt` without throwing; default value is `{}`.*
- [ ] [P] **T-02** — Update the lesson state-change handler in `App.jsx` (wherever `lessonStates` is written) to also write `lessonCompletedAt[key] = new Date().toISOString()` the first time a lesson's state reaches `"Quiz completed"`, `"Artifact started"`, or `"Artifact completed"`. Do not overwrite if a timestamp already exists (first-completion semantics). — *Exit: Completing a lesson for the first time stores an ISO timestamp; re-completing does not overwrite it.*
- [ ] **T-03** — Create `src/components/UpdatedBadge.jsx`. Props: `{ updatedAt: string | undefined, completedAt: string | undefined }`. Render a compact chip only when both values are present and `new Date(updatedAt) > new Date(completedAt)`. Style: background `#7C3AED` (purple), white text, label `UPDATED`, same size/padding as the type tag badge. — *Exit: Component renders "UPDATED" chip when `updatedAt = "2026-05-02"` and `completedAt = "2026-04-01"`; renders nothing when either is absent or `updatedAt ≤ completedAt`.*
- [ ] **T-04** — Wire `UpdatedBadge` into the sidebar lesson list (`App.jsx` ~line 1390): import the component, look up `lessonCompletedAt[lk]`, pass `lesson.meta?.updatedAt` and the stored timestamp as props. Render the badge inline after the FreshnessBadge. — *Exit: A lesson with `updatedAt` set and a recorded completion timestamp shows the purple "UPDATED" chip in the sidebar.*
- [ ] **T-05** — Wire `UpdatedBadge` into the main content lesson header (`App.jsx` ~line 1472): same prop pattern, render alongside the type tag. — *Exit: Purple "UPDATED" chip appears in the lesson header when conditions are met; disappears after the learner re-reads and re-completes the lesson (new `completedAt` will be > `updatedAt`).*

> **Note on badge clearing**: The badge clears naturally when the learner completes the lesson again — because T-02 records only the *first* completion. To support *re-clearing* after viewing updated content, T-02 must overwrite `completedAt` when the learner explicitly resets their lesson state. Verify whether a "reset lesson" action exists; if so, clear `lessonCompletedAt[key]` there too. If no reset action exists, badge clears on next full re-completion.

---

### Phase 2 — Wave A: Critical Curriculum Content
**Dependencies**: Phase 1 complete (so `updatedAt` fields render correctly on new lessons)  
**Files touched**: `src/data/curriculum.js`

**Tasks**:
- [ ] **T-06** — **New Lesson 2.3 — Reasoning/Thinking Models** (US-001). Insert after the last lesson in Module 2. Full lesson object with `id: "2.3"`, `type: "technical"`, `meta.updatedAt: "2026-05-02"`, `meta.lastVerified: "2026-Q2"`. Content must satisfy all 7 ACs from the spec: decision flowchart, UX patterns for 30–120s latency, 5-constraint model introduction, reasoning token cost worked example, 5-scenario classification exercise, failure mode coverage. — *Exit: Lesson 2.3 appears in Module 2 in the sidebar; all 7 AC content sections are present and non-empty.*
- [ ] **T-07** — **New Lesson 8.3 — MCP Fundamentals** (US-002). Insert after the last lesson in Module 8. `id: "8.3"`, `type: "technical"`, `meta.updatedAt: "2026-05-02"`. Content satisfies all 7 ACs: MCP definition + ≥5 tool examples, tool-scope decision framework, Principle of Least Capability, security/audit model, conceptual reframe, PM practice exercise, over-grant failure modes. — *Exit: Lesson 8.3 appears in Module 8; all 7 AC content sections present.*
- [ ] **T-08** — **Patch Lesson 1.4 — 5-Constraint Model** (US-003). Locate the lesson containing the 4-constraint model (Quality/Latency/Cost/Privacy). Add "Compute Budget" as the 5th constraint with definition. Add `meta.updatedAt: "2026-05-02"` to this lesson's meta. — *Exit: Lesson 1.4 (or whichever lesson holds the 4-constraint model) contains the 5-constraint table and has `updatedAt` set; learners who previously completed it will see the purple "UPDATED" badge.*
- [ ] **T-09** — **Patch Lesson 2.x — Reasoning Token Cost** (US-003). Locate the token economics lesson in Module 2. Add reasoning token cost structure: worked cost comparison (fast model vs. thinking model for 1,000 calls/day), break-even quality threshold, "runaway thinking" guard pattern. Add `meta.updatedAt: "2026-05-02"`. — *Exit: The economics lesson contains the worked cost comparison and `updatedAt` is set.*

---

### Phase 3 — Wave B: Important Curriculum Content
**Dependencies**: Phase 2 complete  
**Files touched**: `src/data/curriculum.js`

**Pre-flight required**: Read Modules 3 and 4 in `curriculum.js` to confirm whether a context engineering lesson already exists before T-10. If it does, T-10 becomes a patch; if not, create Lesson 5.3.

**Tasks**:
- [ ] **T-10** — **Context Engineering as a Discipline** (US-004). After pre-flight: create `id: "5.3"` (or patch existing Module 3/4 lesson). Content: system prompt architecture as versioned artifact, prompt caching economics worked example (10K tokens × 1K requests/day = 80% savings), `CLAUDE.md`/`AGENTS.md` pattern reference, context structure exercise, "lost-in-the-middle" failure mode. `meta.updatedAt: "2026-05-02"`. — *Exit: A dedicated context engineering lesson exists; all 6 ACs present.*
- [ ] **T-11** — **RAG Advanced Patterns Patch** (US-005). Patch the existing Module 6 RAG lesson. Add: hybrid search as 2026 default, reranking section, Long-Context vs. RAG decision table (5 dimensions), Agentic RAG paragraph (2–3 paragraphs), "retrieved noise" failure mode. `meta.updatedAt: "2026-05-02"`. — *Exit: The RAG lesson contains all 5 new AC sections; `updatedAt` triggers the "UPDATED" badge for prior completions.*
- [ ] **T-12** — **New Lesson 6.3 — Fine-Tune vs. RAG vs. Prompt Decision** (US-006). `id: "6.3"`, `type: "framework"`, `meta.updatedAt: "2026-05-02"`. 3-way decision matrix, fine-tune criteria, RAG criteria, distillation pattern, synthetic data generation, 4-scenario exercise, failure modes. — *Exit: Lesson 6.3 in Module 6; all 7 ACs present.*
- [ ] **T-13** — **EU AI Act Sub-Lesson Expansion** (US-007). Patch Lesson 9.2. Replace 3-line mention with ≥800 words covering: 4 risk tiers, Article 50 prohibited practices (≥3 examples), transparency obligations, Article 22 automated decision rights, 5-product risk-classification exercise, 8-question PM checklist artifact, misclassification consequence table. `meta.updatedAt: "2026-05-02"`. — *Exit: Lesson 9.2 contains all 7 AC sections; `updatedAt` triggers badge for prior completions.*

---

### Phase 4 — Wave C: Nice-to-Have Curriculum Content
**Dependencies**: Phase 3 complete  
**Files touched**: `src/data/curriculum.js`

**Tasks**:
- [ ] **T-14** — **On-Device / Edge AI Primer** (US-008). New Lesson 8.4 or patch 8.2. Cover Apple Intelligence / Samsung Galaxy AI / Gemini Nano as real product surfaces, on-device vs. cloud decision table (5 dimensions), capability gap framing, OS update release-cycle implication for PMs. `meta.updatedAt: "2026-05-02"`. — *Exit: On-device AI content exists in Module 8; 4 ACs covered.*
- [ ] **T-15** — **Benchmark Literacy Sub-Section** (US-009). Patch Lesson 12.1 vendor strategy. Add ≥6 benchmark definitions, PM-relevant interpretation for each, vendor comparison exercise (4 models × 3 benchmarks × 3 scenarios), benchmark gaming section. `meta.updatedAt: "2026-05-02"`. — *Exit: Lesson 12.1 has benchmark literacy section; all 5 ACs present.*
- [ ] **T-16** — **AI Coding Agents in Build Loop Patch** (US-010). Patch Lesson 6.1. Update the 60-minute prototype rule: PM spec → Claude Code PR → PM review. Add PM-to-agent spec format checklist, PM-as-reviewer checklist, cross-link to micro-teams doc (Spec 15). `meta.updatedAt: "2026-05-02"`. — *Exit: Lesson 6.1 prototype rule reflects 2026 agent-assisted workflow; 5 ACs present.*
- [ ] **T-17** — **Competitive Moats Sub-Section** (US-011). Patch Lesson 1.2. Add commoditization reality framing (<$1/1M tokens, near-parity), ≥4 moat sources, moat-mapping exercise, "feature not product" failure mode. `meta.updatedAt: "2026-05-02"`. — *Exit: Lesson 1.2 contains moat section; all 4 ACs present.*

---

## Breaking Changes & Migrations

| Change | Impact | Safe? |
|---|---|---|
| New `lessonCompletedAt` key in `ai-pm-progress` localStorage | Absent on existing stored progress objects | ✅ Default `{}` — reads as empty, no badge fires |
| New lessons 2.3, 8.3, 6.3, 8.4 added to module arrays | Existing lesson indices shift if inserted mid-array | ✅ Lessons use ID-based lookup not index-based; verify `activeLesson` index logic doesn't rely on positional assumptions |
| `meta.updatedAt` field added to patched lessons | FreshnessBadge ignores unknown meta fields | ✅ Additive — no existing rendering broken |

**Index safety check**: Before executing Phase 2, verify that `App.jsx` lesson navigation uses `lesson.id` for routing, not positional array index. If positional: append new lessons at the end of their module array (never insert mid-array) to avoid off-by-one in saved `activeLesson` state.

---

## Non-Functional Considerations

- **Performance**: `lessonCompletedAt` is a flat key-value map; no performance impact on the progress load/save cycle.
- **Freshness**: Every new/patched lesson must include `meta.lastVerified: "2026-Q2"` to prevent a STALE badge appearing immediately.
- **Lesson length**: All new full lessons target ≤1,200 words of `content`. Patches are additive; existing content is not trimmed.
- **`updatedAt` discipline**: Going forward, any edit to a lesson's `content`, `quiz`, `apply`, or `keys` fields requires bumping `meta.updatedAt` to the current date. This is the author contract that makes the "UPDATED" badge reliable.
- **Accessibility**: The "UPDATED" chip (`#7C3AED` on white text) must meet 4.5:1 contrast. Verify: #7C3AED on white = 5.0:1 ✅.

---

## Task Execution Order (for /tasks)

```
Wave A (this sprint, parallelizable after T-01/T-02 done):
T-01 → T-02 → T-03 → T-04 → T-05  [Phase 1: infra, sequential]
T-06, T-07, T-08, T-09             [Phase 2: content, parallel after Phase 1]

Wave B (next sprint):
Pre-flight Module 3/4 read → T-10, T-11, T-12, T-13  [parallel]

Wave C (sprint 3+):
T-14, T-15, T-16, T-17             [parallel]
```

---

## PLAN_GATE

- [x] Architecture covers ALL acceptance criteria from spec (52 ACs mapped across 17 tasks)
- [x] Breaking changes explicitly called out (index safety, storage migration)
- [x] Rejected alternatives documented as ADRs (3 ADRs logged)
- [x] Every task has an Exit Criteria
- [x] Parallelizable tasks tagged `[P]`
- [x] `updatedAt` author contract documented

---

```
📋 PLANNING COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           2026 Curriculum Gap Remediation + Updated Badge
Architecture:      Additive patches to curriculum.js + new UpdatedBadge component
Approach Chosen:   updatedAt meta field + lessonCompletedAt storage object (ADR-001, ADR-002, ADR-003)
ADRs Logged:       3
Phase Count:       4 (17 tasks total)
Plan Location:     docs/plans/21-2026-curriculum-gap-remediation-plan.md
Status:            ✅ Ready for the /tasks workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
