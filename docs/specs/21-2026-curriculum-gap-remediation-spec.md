# 2026 Curriculum Gap Remediation — Executable Specification

**Spec ID**: 21  
**Version**: 1.0.0  
**Created**: 2026-05-02  
**Status**: 📝 Ready for /plan  
**Author**: Beshoy (CardoO) + Claude audit pass  

---

## Overview

A structured audit of the AI PM Course against the Q1–Q2 2026 model landscape identified 11 gaps ranging from complete omissions (reasoning models, MCP) to stale content (RAG patterns, token economics) to under-indexed topics (EU AI Act, competitive moats). This spec defines the full remediation scope as discrete, testable deliverables ready to route through the `/plan → /tasks → /implement` workflow.

---

## Actors

- **Course Author (Beshoy)**: Primary owner of content; approves all lesson drafts before publication.
- **AI PM Student (Learner)**: Mid-level PM seeking practitioner-grade AI fluency; target for every acceptance criterion below.
- **Course Reviewer (Claude)**: Drafts lesson content, validates against acceptance criteria, flags staleness.

---

## Current State Baseline

| Module | Current Coverage | Gap Severity |
|---|---|---|
| Module 1 — Foundations | AI Wedge/Core, 4-constraint model | 🔴 Missing compute budget as 5th constraint; missing moat design |
| Module 2 — Token Economics | Input/output token pricing | 🔴 Missing reasoning tokens, test-time compute |
| Module 3–4 | Unknown (truncated in audit read) | ⚠️ Likely home for context engineering — verify |
| Module 5 — Context Engineering | Term mentioned, not taught | 🟡 System prompt architecture, prompt caching missing |
| Module 6 — Build Loop | RAG basics, n8n prototypes | 🟡 Hybrid search, reranking, agentic RAG, fine-tune decision framework missing |
| Module 8 — Agents | Basic agent patterns | 🔴 MCP entirely absent |
| Module 9 — Governance | EU AI Act in 3 lines | 🟡 Needs full sub-lesson with classification exercise |
| Module 12 — Strategy | Build/Buy/Partner | 🟡 Benchmark literacy missing; fine-tune vs. RAG vs. prompt missing |

---

## In Scope

All 11 remediations below, grouped into three delivery waves matching existing priority framing.

## Out of Scope

- Rebuilding existing passing lessons (Modules 1–2 economics section is additive patch, not rewrite)
- Arabic localization pass (separate track — see Spec 07)
- Interactive quiz/assessment infrastructure (separate track — see Spec 01)
- Video/audio production for any new lesson (text-first; video layer is a separate workstream)

---

## User Stories

---

### US-001: Reasoning/Thinking Models — New Lesson 2.3

**As a** PM student evaluating AI model selection for a product feature,  
**I want to** understand when and how to use reasoning/thinking models vs. fast completion models,  
**so that** I can make a justified architectural recommendation with cost, latency, and UX tradeoffs quantified.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines the thinking model tier (Claude Sonnet extended thinking, o3/o4-mini, Gemini 2.5 Pro) and positions it as a distinct product category, not just a "better" model.
- [ ] AC-002: Lesson includes a decision flowchart covering: task complexity, latency tolerance, cost budget, and non-determinism tolerance — with a binary recommendation output for each combination.
- [ ] AC-003: Lesson covers the UX implications of 30–120s thinking time: streaming thinking tokens (show vs. hide), progress indicators, async/background task patterns.
- [ ] AC-004: Lesson updates the 4-constraint model (Quality/Latency/Cost/Privacy) to a **5-constraint model** by adding **Compute Budget** as a dynamic, per-inference variable.
- [ ] AC-005: Lesson explains reasoning token cost structure (input + output + reasoning tokens) with a worked cost comparison against a fast-model alternative for the same task.
- [ ] AC-006: A practice exercise asks the student to classify 5 realistic PM scenarios (content moderation, document Q&A, code review, customer support triage, strategic analysis) as "thinking model justified" or "fast model sufficient," with reasoning.
- [ ] AC-007: Error state — lesson explicitly addresses when thinking models produce worse results (over-reasoning on simple tasks, hallucinated reasoning chains) and what eval signals surface this.

**Priority**: P0 | **Dependencies**: Module 2 token economics lesson (additive, not blocking)

---

### US-002: MCP Fundamentals — New Lesson 8.3

**As a** PM designing an AI agent product,  
**I want to** understand what MCP is and how to make tool-scope decisions for agent integrations,  
**so that** I can define agent permissions, blast radius, and integration architecture without delegating the entire decision to engineering.

**Acceptance Criteria:**
- [ ] AC-001: Lesson defines MCP (Model Context Protocol) as the de facto integration standard, explains its client/server model, and names ≥5 major enterprise tools that have published MCP servers (Linear, Notion, Slack, Figma, GitHub, etc.).
- [ ] AC-002: Lesson covers the PM tool-scope decision framework: for each MCP server a PM considers connecting, they must evaluate (a) what data the agent can read, (b) what actions the agent can take, (c) what the blast radius of an unintended action is.
- [ ] AC-003: Lesson introduces the **Principle of Least Capability** as an MCP design default: connect only the MCP servers whose read/write scope is necessary for the specific task.
- [ ] AC-004: Lesson covers the MCP security model: tool call approval flows, human-in-the-loop checkpoints for destructive actions, and audit logging requirements.
- [ ] AC-005: Lesson explicitly replaces the "how do I give my agent access to X?" framing with "which MCP server exposes X and what scope does connecting it grant?"
- [ ] AC-006: A practice exercise presents a PM scenario (e.g., building a customer support agent for an e-commerce brand) and asks the student to produce a 1-page MCP tool-scope decision with justified read/write permissions for each proposed server.
- [ ] AC-007: Error state — lesson covers what happens when MCP server scope is over-granted (data leakage, unintended mutations) with ≥2 real or illustrative case examples.

**Priority**: P0 | **Dependencies**: Module 8 agents lesson (additive)

---

### US-003: Test-Time Compute Economics Patch

**As a** PM student learning token economics,  
**I want to** understand test-time compute as a cost dimension distinct from input/output tokens,  
**so that** I can build accurate cost models for AI features that use thinking models.

**Acceptance Criteria:**
- [ ] AC-001: Lesson 1.4 (or 2.1 — wherever the 4-constraint model lives) is updated to show a **5-constraint model** table with Compute Budget as the 5th constraint, with a definition: "The number of reasoning tokens budgeted per inference call; a dynamic variable set at runtime, not compile time."
- [ ] AC-002: Lesson 2.x token economics section adds a worked example contrasting: (a) fast model at $1/1M tokens for 1,000 API calls/day, vs. (b) thinking model at $15/1M input + $60/1M output + reasoning tokens at $80/1M for the same 1,000 calls/day, with a break-even quality threshold.
- [ ] AC-003: The existing cost calculator artifact (if one exists) is updated with a "thinking model" toggle that activates reasoning token cost fields.
- [ ] AC-004: Error state — lesson addresses the "runaway thinking" failure mode where reasoning tokens spike on simple tasks and how to set max-token budgets as a guard.

**Priority**: P0 | **Dependencies**: US-001 (Lesson 2.3 should reference this patch)

---

### US-004: Context Engineering as a Taught Discipline

**As a** PM student who has heard the term "context engineering" but received no structured instruction,  
**I want to** understand system prompt architecture as a product artifact and prompt caching as a cost lever,  
**so that** I can treat prompts with the same versioning, testing, and deployment rigor as code.

**Acceptance Criteria:**
- [ ] AC-001: A dedicated lesson (expand Module 3 if it exists; create Lesson 5.3 if not) defines context engineering as the discipline of designing, structuring, and managing the information fed to a model — distinct from "prompting."
- [ ] AC-002: Lesson covers system prompt architecture as a versioned product artifact: what goes in the system prompt vs. user turn vs. tool results; how to version and test system prompt changes.
- [ ] AC-003: Lesson covers prompt caching economics with a worked example: a system prompt of 10,000 tokens cached across 1,000 daily requests saves ~80% of repeated token cost vs. sending the full prompt each call.
- [ ] AC-004: Lesson introduces the `CLAUDE.md` / `AGENTS.md` spec pattern as the canonical way to encode agent context rules, with a link to or excerpt from the existing micro-teams doc.
- [ ] AC-005: A practice exercise asks the student to audit an example system prompt for (a) information that should be cached, (b) information that changes per-request, and (c) information that should be injected via RAG rather than hardcoded.
- [ ] AC-006: Error state — lesson covers the "lost-in-the-middle" problem (model attention degrades for content at the middle of long contexts) and how context structure mitigates it.

**Priority**: P1 | **Dependencies**: Verify Modules 3–4 content before creating new lesson (may be expansion, not net-new)

---

### US-005: RAG Advanced Patterns Patch

**As a** PM student who learned basic RAG (chunking + embedding + retrieval),  
**I want to** understand hybrid search, reranking, and the long-context vs. RAG decision,  
**so that** I can make an informed architecture recommendation when scoping a knowledge-retrieval feature in 2026.

**Acceptance Criteria:**
- [ ] AC-001: Module 6 RAG lesson is updated to position **hybrid search** (BM25 keyword + semantic vector) as the 2026 production default, not an advanced option — with a 1-sentence explanation of why pure vector search underperforms on precise queries.
- [ ] AC-002: Lesson adds a **reranking** section explaining cross-encoder rerankers (e.g., Cohere Rerank 3), when to apply them (top-K candidates → rerank → top-3 to model), and what PM metrics improve (answer relevance, hallucination rate).
- [ ] AC-003: Lesson adds a **Long-Context vs. RAG Decision Framework** table covering: document corpus size, update frequency, cost per query, latency requirement, and privacy constraints — with a recommended architecture for each scenario.
- [ ] AC-004: Lesson adds an **Agentic RAG** section (2–3 paragraphs) covering agents that self-direct retrieval: deciding what to query, when to re-query, and when context is sufficient — with a PM-relevant implication (eval coverage must include retrieval decision quality, not just answer quality).
- [ ] AC-005: Error state — lesson addresses the "retrieved noise" failure mode (retrieval returns irrelevant chunks that degrade answer quality) and names the three PM-level levers: chunk size, top-K, and reranking.

**Priority**: P1 | **Dependencies**: Existing Module 6 RAG lesson

---

### US-006: Fine-Tune vs. RAG vs. Prompt-Only Decision Framework — New Lesson 6.3

**As a** PM choosing between fine-tuning, RAG, and prompt-only approaches for a new AI feature,  
**I want to** apply a structured decision framework with clear thresholds,  
**so that** I can justify the recommendation to engineering and finance without guessing.

**Acceptance Criteria:**
- [ ] AC-001: Lesson presents a 3-way decision matrix covering: task type, data characteristics, latency requirement, cost-at-scale, and update frequency — with a clear winner column for each combination.
- [ ] AC-002: Lesson covers fine-tune justification criteria: task-specific output format/style (not just quality), latency-critical inference (no retrieval step), and cost at very high call volume.
- [ ] AC-003: Lesson covers RAG justification criteria: live or frequently updated data, document corpus > 500K tokens, need for source citations, and cost control on long-context alternatives.
- [ ] AC-004: Lesson covers **distillation** as a standard cost optimization: using a frontier model (GPT-4o, Claude Opus) to generate high-quality training examples, then fine-tuning a smaller model (Llama 3, Phi-4) for production — with an illustrative cost comparison.
- [ ] AC-005: Lesson covers **synthetic data generation** for fine-tuning: using the same frontier model to create labeled training pairs when real labeled data is scarce.
- [ ] AC-006: A practice exercise presents 4 PM scenarios and asks the student to select and justify the architecture choice using the matrix.
- [ ] AC-007: Error state — lesson addresses the fine-tune failure mode (model forgets general reasoning when over-fitted to format) and the RAG failure mode (retrieved noise degrades fine-tuned quality when combined naively).

**Priority**: P1 | **Dependencies**: US-005 (RAG patch should be complete first for coherence)

---

### US-007: EU AI Act — Full Sub-Lesson with Classification Exercise

**As a** PM building AI products that may be distributed in the EU,  
**I want to** understand how to classify my product under the EU AI Act and what obligations apply,  
**so that** I can make feature decisions that are compliant at design time rather than retrofitted post-launch.

**Acceptance Criteria:**
- [ ] AC-001: Lesson 9.2 EU AI Act section is expanded from 3 lines to a full sub-lesson (≥800 words) covering: GPAI Model rules in force as of 2025, the four risk tiers (prohibited, high-risk, limited-risk, minimal-risk), and what each tier means for a PM's feature decisions.
- [ ] AC-002: Lesson covers the Article 50 prohibited practices list with ≥3 examples directly relevant to consumer AI products: subliminal manipulation, real-time biometric surveillance in public spaces, social scoring.
- [ ] AC-003: Lesson covers transparency obligations: when AI-generated content must be disclosed, what the disclosure must contain, and which product surfaces trigger the obligation.
- [ ] AC-004: Lesson covers Article 22 automated decision-making rights: when users must be able to request human review of an AI decision, and which product categories (recommendation systems, credit scoring, hiring tools) are most exposed.
- [ ] AC-005: A **risk-classification exercise** provides 5 product descriptions (e.g., AI hiring screener, product recommendation engine, medical symptom checker, content moderation system, customer support chatbot) and asks the student to classify each by EU AI Act tier with a one-line justification.
- [ ] AC-006: Lesson includes a "PM checklist" artifact: 8–10 questions a PM should answer at feature kickoff to determine if EU AI Act review is required.
- [ ] AC-007: Error state — lesson covers the consequence of misclassification: what regulatory fines and feature withdrawal obligations apply at each tier.

**Priority**: P1 | **Dependencies**: Existing Lesson 9.2 (replacement/expansion, not new file)

---

### US-008: On-Device / Edge AI Primer — Module 8.2 Expansion

**As a** PM working on consumer hardware or mobile products,  
**I want to** understand when to use on-device AI vs. cloud inference,  
**so that** I can make an informed architecture recommendation that balances privacy, latency, cost, and capability.

**Acceptance Criteria:**
- [ ] AC-001: Module 8.2 (or new Lesson 8.4) adds a section on on-device AI covering: Apple Intelligence, Samsung Galaxy AI, Android Gemini Nano as real 2026 product surfaces — not future speculation.
- [ ] AC-002: Lesson includes a decision table for on-device vs. cloud covering: privacy (data never leaves device), latency (no network round-trip), cost (no inference API cost), capability (smaller model = lower task ceiling), and connectivity (offline-first use cases).
- [ ] AC-003: Lesson explicitly covers the capability gap: on-device models (1–7B parameters) vs. frontier cloud models (hundreds of billions) and what task categories fall within vs. outside the on-device capability envelope.
- [ ] AC-004: Error state — lesson covers the on-device update problem: when a model is embedded in a shipped device, updating it requires an OS/firmware update cycle, which changes the PM's release and iteration calculus.

**Priority**: P2 | **Dependencies**: Module 8 agent architecture lesson

---

### US-009: Foundation Model Benchmark Literacy — Lesson 12.1 Addition

**As a** PM evaluating AI model vendors,  
**I want to** read and interpret standard model benchmarks,  
**so that** I can assess vendor claims with evidence rather than accepting marketing copy at face value.

**Acceptance Criteria:**
- [ ] AC-001: A sub-section added to Lesson 12.1 (vendor strategy) covers ≥6 standard benchmarks: MMLU (knowledge breadth), MATH (quantitative reasoning), HumanEval (code), GPQA (graduate-level science), SWE-Bench (real software engineering), and Chatbot Arena Elo (human preference).
- [ ] AC-002: For each benchmark, lesson explains: what it measures, what a "good" score looks like, and what PM decision it informs (e.g., "HumanEval > 90% is a signal that the model can assist with code generation tasks in your developer tool").
- [ ] AC-003: Lesson includes a **benchmark literacy exercise**: present a vendor comparison table with 4 models and scores across 3 benchmarks, ask the student to select the best model for 3 different product scenarios.
- [ ] AC-004: Lesson addresses benchmark gaming: how vendors cherry-pick favorable benchmarks, what contamination means, and why Chatbot Arena Elo (live human preference) is harder to game than static evals.
- [ ] AC-005: Error state — lesson covers the benchmark-to-production gap: a model that tops MMLU may underperform on a specific domain task; lesson names the remedy (domain-specific evals, covered in Module eval track).

**Priority**: P2 | **Dependencies**: Existing Lesson 12.1 vendor strategy

---

### US-010: AI Coding Agents Integration into Module 6 Build Loop

**As a** PM student learning the 60-minute prototype rule,  
**I want to** understand how AI coding agents (Claude Code, Cursor, etc.) change the PM's role in the build loop,  
**so that** I can write specs that are immediately actionable by a coding agent and review the resulting PR with appropriate depth.

**Acceptance Criteria:**
- [ ] AC-001: Lesson 6.1 "60-minute prototype rule" is updated to reflect the 2026 workflow: PM writes a spec → Claude Code / Cursor generates a working PR → PM reviews the PR — the 60 minutes now produces a PR, not just a flow diagram.
- [ ] AC-002: Lesson provides a "PM-to-Agent spec format" checklist: what a spec must contain for a coding agent to execute without clarification (acceptance criteria as test cases, data model, API contract, out-of-scope items).
- [ ] AC-003: Lesson includes a "PM as reviewer" section: what a PM should check in an agent-generated PR (acceptance criteria fulfilled, no hardcoded secrets, no `console.log` in production, type errors cleared).
- [ ] AC-004: Lesson cross-links the existing micro-teams doc (or Spec 15 once implemented) as the canonical reference for PM-in-micro-team workflows.
- [ ] AC-005: Error state — lesson covers the "agent hallucination in code" failure mode: when the agent generates plausible-looking code that doesn't match the spec, and how well-written acceptance criteria surface this immediately vs. a vague spec that lets it slip through.

**Priority**: P2 | **Dependencies**: Spec 15 (micro-teams integration) — coordinate sequencing

---

### US-011: Competitive Moats in the Commoditization Era — Lesson 1.2 Addition

**As a** PM student learning AI product strategy,  
**I want to** understand where defensible AI products come from when frontier models are near-parity and cheap,  
**so that** I can design product strategies with durable moats rather than temporary model advantages.

**Acceptance Criteria:**
- [ ] AC-001: A sub-section added to Lesson 1.2 (AI Wedge/Core opportunity landscape) explicitly addresses the 2026 commoditization reality: GPT-4o, Claude Sonnet, Gemini Flash at <$1/1M tokens with near-parity on most general tasks.
- [ ] AC-002: Lesson covers ≥4 moat sources for AI products: (a) data flywheel (proprietary data generated by product usage that improves the model over time), (b) workflow integration depth (the AI is embedded in the user's daily workflow, not a standalone chat box), (c) fine-tuned domain model (proprietary capability gap vs. general models), (d) trust and brand capital (users share sensitive data or rely on high-stakes outputs).
- [ ] AC-003: Lesson includes a moat-mapping exercise: present 3 AI product concepts and ask the student to identify which moat source(s) apply and what the product must do to build that moat (e.g., "for data flywheel: the product must generate labeled feedback signal at every interaction").
- [ ] AC-004: Error state — lesson covers the "feature, not product" failure mode: when a product's sole advantage is calling a better model, and what that means for defensibility when the next model release closes the capability gap.

**Priority**: P2 | **Dependencies**: Existing Lesson 1.2 (additive sub-section)

---

## Data Model

No new data models required. All deliverables are markdown lesson files added to or replacing content in the existing module structure.

**Affected File Paths (estimated):**

| Story | Target File(s) |
|---|---|
| US-001 | `content/module-02/lesson-2-3-thinking-models.md` (new) |
| US-002 | `content/module-08/lesson-8-3-mcp.md` (new) |
| US-003 | `content/module-01/lesson-1-4*.md` + `content/module-02/lesson-2-1*.md` (patch) |
| US-004 | `content/module-03/` or `content/module-05/lesson-5-3-context-engineering.md` (verify first) |
| US-005 | `content/module-06/lesson-6-2*.md` (patch) |
| US-006 | `content/module-06/lesson-6-3-finetune-rag-decision.md` (new) |
| US-007 | `content/module-09/lesson-9-2*.md` (expand) |
| US-008 | `content/module-08/lesson-8-4-edge-ai.md` (new) or patch 8-2 |
| US-009 | `content/module-12/lesson-12-1*.md` (patch) |
| US-010 | `content/module-06/lesson-6-1*.md` (patch) |
| US-011 | `content/module-01/lesson-1-2*.md` (patch) |

> **Pre-flight required**: Verify exact filenames by listing `content/` before executing patches. Modules 3–4 must be read before US-004 placement is finalized.

---

## Non-Functional Requirements

- **Freshness**: Every new lesson must include a `**Last verified**: YYYY-MM-DD` footer and a one-line "what would make this stale" note for Spec 20 (Freshness Score system).
- **Length**: Full lessons ≤ 1,200 words (readable in ~8 minutes). Sub-sections ≤ 400 words.
- **Practice exercises**: Every full lesson includes ≥ 1 exercise with a worked answer or rubric.
- **Accessibility**: All decision tables must have a text-only alternative description for screen readers.
- **Cross-links**: Every new lesson must link back to at least one existing lesson it extends, and forward to the eval/test coverage module where the PM can validate the new concept.

---

## Delivery Waves

### Wave A — Critical (this sprint)
- US-001 (Thinking Models, Lesson 2.3)
- US-002 (MCP, Lesson 8.3)
- US-003 (Test-Time Compute patch)

### Wave B — Important (next sprint)
- US-004 (Context Engineering — after Modules 3–4 verified)
- US-005 (RAG advanced patterns patch)
- US-006 (Fine-tune vs. RAG decision, Lesson 6.3)
- US-007 (EU AI Act sub-lesson expansion)

### Wave C — Nice-to-Have (sprint 3+)
- US-008 (On-device AI)
- US-009 (Benchmark literacy)
- US-010 (AI coding agents in build loop)
- US-011 (Competitive moats)

---

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Modules 3–4 content already covers US-004 scope | Medium | Pre-flight file read before drafting — may reduce US-004 to a patch |
| MCP standard evolves rapidly; Lesson 8.3 may date within 6 months | High | Add "Last verified" footer; schedule Freshness Score review (Spec 20) at 3-month mark |
| Wave A lessons bloat existing modules beyond 1,200-word limit | Medium | Treat all Wave A items as new files; only patch existing files in Wave B+ |
| EU AI Act interpretation is jurisdiction-specific | Low | Scope lesson to EU market explicitly; add a "consult legal counsel" callout for high-risk classifications |

---

## Completion Report Template

```
📋 SPECIFICATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Feature:           2026 Curriculum Gap Remediation
User Stories:      11 (US-001 through US-011)
Acceptance Tests:  52 total ACs
Out of Scope:      Arabic localization, quiz infrastructure, video production
Spec Location:     docs/specs/21-2026-curriculum-gap-remediation-spec.md
Status:            ✅ Ready for /plan workflow.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
