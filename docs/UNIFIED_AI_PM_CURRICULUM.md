# UNIFIED AI PM CURRICULUM

<!-- AUTO-GENERATED FROM src/data/curriculum.js — DO NOT EDIT BY HAND. Run `npm run docs:unified` to regenerate. -->

**Source of truth:** `src/data/curriculum.js` · **Modules:** 13 · **Lessons:** 66

This document is regenerated from the JS curriculum data that drives the GitHub Pages site. If you find a discrepancy, the JS file wins. The companion audit `docs/curriculum-gap-analysis-2026-05-08.md` tracks the rationale for this single-source-of-truth approach.

## Table of Contents

- [MODULE 1 — AI Paradigm Shift & Business Strategy](#module-1-ai-paradigm-shift-business-strategy)
  - [Lesson 1.1 — 9 Shifts in AI Product Management](#lesson-11-9-shifts-in-ai-product-management)
  - [Lesson 1.2 — AI Opportunity Landscape & AI-Shaped Problems](#lesson-12-ai-opportunity-landscape-ai-shaped-problems)
  - [Lesson 1.3 — 5-A Framework, Crystallization & Learning Protocol](#lesson-13-5-a-framework-crystallization-learning-protocol)
  - [Lesson 1.4 — AI ROI, Unit Economics & Investment Memo](#lesson-14-ai-roi-unit-economics-investment-memo)
  - [Lesson 1.5 — Kill Criteria and Sunset Discipline](#lesson-15-kill-criteria-and-sunset-discipline)
- [MODULE 2 — Model Systems & Token Economics](#module-2-model-systems-token-economics)
  - [Lesson 2.1 — How LLMs Work: Tokens, Embeddings, Attention](#lesson-21-how-llms-work-tokens-embeddings-attention)
  - [Lesson 2.2 — GenAI Value Stack, Moats & Model Selection](#lesson-22-genai-value-stack-moats-model-selection)
  - [Lesson 2.3 — AI Product Metrics & the AI PRD](#lesson-23-ai-product-metrics-the-ai-prd)
  - [Lesson 2.4 — Machine-Readable Acceptance Criteria](#lesson-24-machine-readable-acceptance-criteria)
  - [Lesson 2.5 — AI PRD for Agent-Executed Features](#lesson-25-ai-prd-for-agent-executed-features)
  - [Lesson 2.6 — Model Routing by Task Type](#lesson-26-model-routing-by-task-type)
  - [Lesson 2.7 — Reasoning & Thinking Models: The PM Decision Framework](#lesson-27-reasoning-thinking-models-the-pm-decision-framework)
- [MODULE 3 — Context Engineering](#module-3-context-engineering)
  - [Lesson 3.1 — The Context Engineering Stack](#lesson-31-the-context-engineering-stack)
  - [Lesson 3.2 — Advanced Prompting & RAG Architecture](#lesson-32-advanced-prompting-rag-architecture)
  - [Lesson 3.3 — Tool Use, MCP & Optimization Ladder](#lesson-33-tool-use-mcp-optimization-ladder)
  - [Lesson 3.4 — Fine-Tune vs. RAG vs. Prompt-Only: The Decision Framework](#lesson-34-fine-tune-vs-rag-vs-prompt-only-the-decision-framework)
- [MODULE 4 — Discovery & Pain Quantification](#module-4-discovery-pain-quantification)
  - [Lesson 4.1 — AI Discovery: Cognitive Load & Service Blueprints](#lesson-41-ai-discovery-cognitive-load-service-blueprints)
  - [Lesson 4.2 — AI-Native User Research](#lesson-42-ai-native-user-research)
  - [Lesson 4.3 — Quantifying AI Pain: Override Rate, Time-to-Task & the Eval Threshold Bridge](#lesson-43-quantifying-ai-pain-override-rate-time-to-task-the-eval-threshold-bridge)
- [MODULE 5 — Trust Design & AI UX](#module-5-trust-design-ai-ux)
  - [Lesson 5.1 — 3P Framework, 4 Design Patterns & HITL Levels](#lesson-51-3p-framework-4-design-patterns-hitl-levels)
  - [Lesson 5.2 — Multilingual AI UX, Failure Design & Vendor Risk](#lesson-52-multilingual-ai-ux-failure-design-vendor-risk)
- [MODULE 6 — Build, Evaluate & Iterate](#module-6-build-evaluate-iterate)
  - [Lesson 6.1 — The Build Loop: Prototype → Evaluate → Iterate](#lesson-61-the-build-loop-prototype-evaluate-iterate)
  - [Lesson 6.2 — Multi-Layer Eval Systems & Golden Datasets](#lesson-62-multi-layer-eval-systems-golden-datasets)
  - [Lesson 6.3 — 5-Level Validation Pyramid](#lesson-63-5-level-validation-pyramid)
  - [Lesson 6.4 — Golden Dataset Operations](#lesson-64-golden-dataset-operations)
  - [Lesson 6.5 — Sprint 0 for AI-Native Teams](#lesson-65-sprint-0-for-ai-native-teams)
  - [Lesson 6.6 — Eval Debt and Post-Launch Maintenance](#lesson-66-eval-debt-and-post-launch-maintenance)
  - [Lesson 6.7 — AI Product Analytics and Instrumentation](#lesson-67-ai-product-analytics-and-instrumentation)
- [MODULE 7 — Production, Security & Governance](#module-7-production-security-governance)
  - [Lesson 7.1 — Guardrails, Observability & SLOs](#lesson-71-guardrails-observability-slos)
  - [Lesson 7.2 — AGENTS.md and Repo Policy](#lesson-72-agentsmd-and-repo-policy)
  - [Lesson 7.3 — Hallucination and Drift Monitoring](#lesson-73-hallucination-and-drift-monitoring)
  - [Lesson 7.4 — Kill-Switch Design by Repository](#lesson-74-kill-switch-design-by-repository)
  - [Lesson 7.5 — AI-Merge Cap Governance](#lesson-75-ai-merge-cap-governance)
  - [Lesson 7.6 — Audit-Trail PR Review](#lesson-76-audit-trail-pr-review)
  - [Lesson 7.7 — AI Risk Register Operations](#lesson-77-ai-risk-register-operations)
  - [Lesson 7.8 — Prompt and Context Versioning as Code](#lesson-78-prompt-and-context-versioning-as-code)
  - [Lesson 7.9 — AI FinOps: Cost Attribution and Runaway-Agent Defense](#lesson-79-ai-finops-cost-attribution-and-runaway-agent-defense)
  - [Lesson 7.10 — Multi-Tenant Safety for AI Systems](#lesson-710-multi-tenant-safety-for-ai-systems)
- [MODULE 8 — Agents, Voice & Multimodal](#module-8-agents-voice-multimodal)
  - [Lesson 8.1 — Agent Architecture: Sense → Plan → Act](#lesson-81-agent-architecture-sense-plan-act)
  - [Lesson 8.2 — Voice Agents, Multimodal & Computer-Use](#lesson-82-voice-agents-multimodal-computer-use)
  - [Lesson 8.3 — On-Device & Edge AI: The PM Decision Framework](#lesson-83-on-device-edge-ai-the-pm-decision-framework)
- [MODULE 8.5 — AI-Native Mobile Delivery Systems](#module-85-ai-native-mobile-delivery-systems)
  - [Lesson 8.5.1 — Design Tokens as Agent Context](#lesson-851-design-tokens-as-agent-context)
  - [Lesson 8.5.2 — UI Consistency via Token Injection](#lesson-852-ui-consistency-via-token-injection)
  - [Lesson 8.5.3 — Flutter Agent Orchestration](#lesson-853-flutter-agent-orchestration)
  - [Lesson 8.5.4 — Context Engineering for Flutter](#lesson-854-context-engineering-for-flutter)
  - [Lesson 8.5.5 — Multi-Agent Mobile Delivery](#lesson-855-multi-agent-mobile-delivery)
  - [Lesson 8.5.6 — BLE/IoT HITL Mapping for Mobile](#lesson-856-bleiot-hitl-mapping-for-mobile)
- [MODULE 9 — GTM, Ethics & AI Leadership](#module-9-gtm-ethics-ai-leadership)
  - [Lesson 9.1 — Go-to-Market Strategy for AI Features](#lesson-91-go-to-market-strategy-for-ai-features)
  - [Lesson 9.2 — AI Ethics, Bias & Responsible AI](#lesson-92-ai-ethics-bias-responsible-ai)
  - [Lesson 9.3 — Go/No-Go with AI Evidence](#lesson-93-gono-go-with-ai-evidence)
  - [Lesson 9.4 — Responsible AI Checklist for Consumer Products](#lesson-94-responsible-ai-checklist-for-consumer-products)
  - [Lesson 9.5 — AI Product Failure Anthology and Debrief Method](#lesson-95-ai-product-failure-anthology-and-debrief-method)
  - [Lesson 9.6 — Regulatory Readiness for AI Products](#lesson-96-regulatory-readiness-for-ai-products)
- [MODULE 10 — Capstone & Portfolio](#module-10-capstone-portfolio)
  - [Lesson 10.1 — Capstone: Ship a Production-Ready AI Product](#lesson-101-capstone-ship-a-production-ready-ai-product)
- [MODULE 11 — Arabic AI Systems](#module-11-arabic-ai-systems)
  - [Lesson 11.1 — Arabic Token Economics, Retrieval Quality, and E-commerce Localization](#lesson-111-arabic-token-economics-retrieval-quality-and-e-commerce-localization)
  - [Lesson 11.2 — MENA Privacy, Data Residency, and Cross-Border AI Risk](#lesson-112-mena-privacy-data-residency-and-cross-border-ai-risk)
- [MODULE 12 — Executive AI Leadership](#module-12-executive-ai-leadership)
  - [Lesson 12.1 — Vendor Strategy, Ecosystem Risk & Negotiation](#lesson-121-vendor-strategy-ecosystem-risk-negotiation)
  - [Lesson 12.2 — Org Design for AI Product Teams](#lesson-122-org-design-for-ai-product-teams)
  - [Lesson 12.3 — AI Portfolio Governance & Prioritization](#lesson-123-ai-portfolio-governance-prioritization)
  - [Lesson 12.4 — Budgeting, Risk Operating Model & Executive Controls](#lesson-124-budgeting-risk-operating-model-executive-controls)
  - [Lesson 12.5 — Build vs Buy vs Partner for AI Systems](#lesson-125-build-vs-buy-vs-partner-for-ai-systems)
  - [Lesson 12.6 — DORA Baselines Before Agent Adoption](#lesson-126-dora-baselines-before-agent-adoption)
  - [Lesson 12.7 — Org Design for AI-Native Teams](#lesson-127-org-design-for-ai-native-teams)
  - [Lesson 12.8 — Vendor Switching and Portability Strategy](#lesson-128-vendor-switching-and-portability-strategy)
  - [Lesson 12.9 — Communicating AI Ops Metrics to Leadership](#lesson-129-communicating-ai-ops-metrics-to-leadership)
  - [Lesson 12.10 — AI PM Portfolio, Leveling, and Interview Storytelling](#lesson-1210-ai-pm-portfolio-leveling-and-interview-storytelling)

## MODULE 1 — AI Paradigm Shift & Business Strategy

*WEEK 1 · Tag: Strategy*

### Lesson 1.1 — 9 Shifts in AI Product Management

*Type:* `concept`
*Last verified:* 2026-Q2

AI didn't reinvent product management. It **removed every safety net PMs used to hide behind**.

**Shift 1 — Mistakes are instantly visible**
SaaS features could hide behind onboarding and CS. An AI workflow either works or breaks trust. One hallucination = trust gone. Users don't debug AI — they abandon it.

**Shift 2 — Feature thinking → System thinking**
You now orchestrate systems of: Context / Memory / Retrieval / Reasoning / Tool Use / Failure Recovery / Autonomy & Control. A "feature" is now a pipeline with 6+ components.

**Shift 3 — Timelines collapsed**
Executives expect direction in hours, not weeks. Competitors replicate wrapper features overnight. The market punishes latency in decision-making.

**Shift 4 — The old PM hierarchy is dead**
PM → Design → Eng → QA → Launch is over. You must prototype, write system flows, generate evals, model token cost, design trust UX, AND architect context pipelines before eng plans a sprint.

**Shift 5 — Two types of PMs now exist**
Type A (AI-Adjacent): uses ChatGPT as convenience, collapses in technical conversations about context windows, token economics, or eval pipelines.
Type B (AI-Native): understands context engineering, failure modes, hallucination risk, memory policies, autonomy design, token costs, trust design, eval systems, tool orchestration. Can ship a working prototype solo.

**Shift 6 — AI amplified judgment, not creativity**
AI generates ideas and code. Only the PM decides: which idea matters, which output is trustworthy, what the business should bet on.

**Shift 7 — Distribution is now a PM responsibility**
Onboarding = positioning. Trust-building = distribution. Intelligent defaults = activation. Explanations = retention. The PM who controls how AI is introduced controls adoption.

**Shift 8 — The middle disappears**
You're either magical or disappointing. AI markets consolidate around winners faster than SaaS. There is no "decent AI product."

**Shift 9 — PMs now manage trust, not features**
Trust is built through: predictable behavior, transparent reasoning, recoverable failures, uncertainty disclosure, controlled autonomy, consistent tone, and explicit feedback loops.

**Case study — Klarna's AI Customer Service Agent**:
Klarna deployed an AI agent handling 2/3 of all customer service conversations in its first month. Key decisions: started at HITL Level 2 (human review on refunds), used structured outputs for all financial actions, built a 500-case golden dataset from historical chats, and implemented confidence thresholding — low-confidence responses routed to humans. Result: equivalent to 700 full-time agents, 25% fewer repeat inquiries, resolution time from 11 minutes to 2 minutes.

**Quiz.** What's the core difference between a Type A and Type B AI PM?
> Type B can ship a working AI prototype solo — they understand context engineering, evals, token economics, and tool orchestration, not just vocabulary.

**Apply.** **Self-audit**: Rate yourself 1–5 on each Type B skill (3 = can explain but haven't shipped):

| Skill | Score |
|---|---|
| Context engineering | |
| Failure mode awareness | |
| Memory policy decisions | |
| Autonomy level design | |
| Token cost modeling | |
| Trust UX design | |
| Eval suite building | |
| Tool orchestration | |

Any skill below 3 = priority target. Push to: `/docs/self-audit/type-b-skills.md`

**Key takeaways:**
- Type B PM = can ship a prototype, not just talk about AI
- Trust is the core deliverable, not features
- System thinking replaces feature thinking

- *Sources:* Product Faculty V3 Syllabus (Maven 2026); Klarna AI Agent Case Study 2024
- *Artifact:* `/docs/self-audit/type-b-skills.md`
- *Failure modes:* Rating 5 on skills never shipped; Skipping the audit entirely
- *Red-team:* Ask a teammate to independently rate you — compare scores

---

### Lesson 1.2 — AI Opportunity Landscape & AI-Shaped Problems

*Type:* `concept`
*Last verified:* 2026-Q2

**Where AI creates real value vs. where it creates hype**

**4 Opportunity Zones**:
- **Zone 1 — Automation** (high value, low risk): Repetitive, structured tasks. Document parsing, extraction, classification. Best: high-frequency, low-stakes.
- **Zone 2 — Augmentation** (high value, moderate risk): AI assists human judgment. Drafts, recommendations, summarization. Best: knowledge-intensive workflows.
- **Zone 3 — Transformation** (highest value, high risk): AI changes the product experience. Conversational interfaces, autonomous agents. Best: intelligence IS the differentiator.
- **Zone 4 — Hype** (low value, high investment): AI bolted on because leadership demanded it. "Smart" dashboards, chat buttons with no knowledge base.

**Is the problem AI-shaped?** Must involve:
- Ambiguity (no single correct answer)
- Variable pathways (different users need different paths)
- Cognitive load (reading, interpreting, synthesizing)
- Unstructured inputs (messy data, natural language)
- Frequency (happens often enough to justify cost)

If deterministic (same input → always same output), use rules/SQL/workflow tools. Don't LLM it.

**AI Wedge vs AI Core**:
- **Wedge**: AI gets users in the door, but value comes from the platform. Example: Jasper → AI copywriting wedge → content platform.
- **Core**: AI IS the product. Example: Cursor → code completion quality = product quality.

**Case study — Shopify's Sidekick**:
Shopify launched Sidekick as an AI assistant for merchants. Zone 2 (augmentation): helps with store setup, marketing copy, data analysis. Key insight: Shopify didn't make Sidekick autonomous. It suggests, the merchant decides. They started with the tasks that had highest frequency × highest cognitive load: "help me write a product description" (frequent, creative, tedious). Tasks with clear right answers (inventory math) were left to deterministic tools.

**Competitive Moats in the Commoditization Era (2026)**

GPT-4o, Claude Sonnet, and Gemini Flash are now near-parity on most general tasks and cost under $1/1M tokens. "We use a better model" is not a moat — it lasts until the next model release. Where do defensible AI products come from when the raw capability gap closes?

**4 Sources of Durable AI Moat**

**1. Data Flywheel**
Every user interaction generates labeled signal that improves your model — and competitors can't replicate your data without your users. The compounding effect: more users → better model → better product → more users.
*Build requirement*: Product must generate labeled feedback at every interaction (explicit: thumbs up/down, implicit: edit rate, abandonment, re-query). This data must flow back to model improvement.

**2. Workflow Integration Depth**
The AI is embedded so deeply in the user's daily workflow that switching means re-learning an entire system — not just a different chat interface. Standalone AI tools (chatboxes) have low switching cost. AI woven into a task graph has high switching cost.
*Build requirement*: Design the AI to operate on the user's own data (their documents, their history, their team's context), not just general knowledge.

**3. Proprietary Domain Model**
A fine-tuned or distilled model trained on your domain's data can outperform a frontier model on your specific task at 1/10th the cost. This takes time and proprietary data to build — and can't be replicated by a competitor without the same data.
*Build requirement*: Requires a flywheel (moat #1) plus fine-tuning investment. Not viable for early-stage products.

**4. Trust and Brand Capital**
Users share sensitive data (medical, financial, legal, personal) only with products they trust. Trust is built through consistent quality, transparent failure communication, and data handling credibility. It compounds slowly and erodes fast.
*Build requirement*: Invest in explainability UX, failure communication design, and privacy posture beyond legal minimum.

**The "Feature Not Product" Failure Mode**
A product whose sole AI advantage is "we call a better model" will be commoditized on the next model release. If a competitor can match your product quality by switching API keys, you have a feature, not a moat.

*Diagnostic question*: If GPT-5 matches your model quality for the same price tomorrow, does your product retain its value? If yes, you have a moat. If no, you have a model dependency.

**Moat Mapping Exercise**
For 3 AI product concepts, identify which moat source(s) apply and what the product must do to build it:
1. AI legal brief generator for law firms → moat: domain model + trust (but only if fine-tuned on firm's specific case history and citation style)
2. AI shopping assistant for a retailer → moat: data flywheel (purchase and preference data) + integration depth (personalized to the shopper's history)
3. General-purpose AI writing tool → no durable moat unless data flywheel is built; vulnerable to Notion/Google adding equivalent features

**Quiz.** A task always produces the same output from the same input. Should you use an LLM?
> No. Deterministic tasks should use rules-based automation, SQL queries, or workflow tools. LLMs add cost and non-determinism without benefit.

**Apply.** **Opportunity audit**: Classify every AI idea in your backlog:

| Idea | Zone | AI-shaped? | Wedge/Core | Pain Score | Verdict |
|---|---|---|---|---|---|
| ? | ? | ? | ? | ? | ? |

Kill anything in Zone 4. Kill Pain Score < 100. Push to: `/docs/discovery/opportunity-landscape.md`

**Key takeaways:**
- 4 zones — ruthlessly kill Zone 4
- AI-shaped = ambiguity + cognitive load + variable paths + frequency
- Wedge vs Core determines your long-term strategy

---

### Lesson 1.3 — 5-A Framework, Crystallization & Learning Protocol

*Type:* `framework`

**The 5-A Framework** — Product Faculty's core systematic method:

**A1 — Assess**: Is AI the right solution? Is this AI-shaped? Do we have the data? What's the cost of being wrong? What's the Overton Window (will users accept this level of autonomy)?

**A2 — Architect**: Design the system. Which model tier? What context strategy (long-context vs RAG vs memory)? What tools? What orchestration? What autonomy level?

**A3 — Acquire**: Get what you need. Training data, annotation, tooling (n8n, Langfuse, Promptfoo), team skills.

**A4 — Assemble**: Build it. Context engineering, RAG pipelines, agent wiring, tool integration, guardrails, product integration.

**A5 — Assess (ongoing)**: Evaluate. Golden dataset evals, A/B tests, user feedback, regression testing, drift detection, cost monitoring.

**Circular, not linear**: A5 feeds back to A1. AI products are never "shipped" — they're continuously re-assessed. Model updates, user behavior shifts, and data drift change quality even when you don't touch code.

**The Crystallization Framework** (Product Faculty's pedagogy):
- **Content**: Flipped classroom — consume async, pressure-test live
- **Context**: Apply to real company problems, not generic exercises
- **Confirmation**: Ship production-ready artifacts. Commits ARE the certification.

**The Overton Window for AI Products**:
Users have a range of AI autonomy they'll currently accept. A support chatbot that auto-resolves billing issues? Acceptable for many. An AI that auto-refunds without asking? Outside the window. Always introduce at an acceptable level and earn expansion through demonstrated reliability.

**Your learning protocol**:
1. Read the lesson (15 min)
2. Complete the Apply exercise (30–60 min)
3. Commit output to GitHub repo
4. Take the quiz (self-test)
5. Move to next lesson

**Setup your repo now**:
```bash
mkdir ai-pm-course && cd ai-pm-course && git init
mkdir -p docs/{self-audit,discovery,design,develop,deploy,live,gtm} evals/{promptfoo} projects capstone
echo "# AI PM Course — Applied Edition" > README.md
git add . && git commit -m "init: course structure"
```

**Quiz.** Why is the 5-A Framework circular instead of linear?
> Because A5 (ongoing assessment) feeds back into A1 (assess). AI products degrade from model updates, data drift, and user behavior changes — continuous re-assessment is required.

**Apply.** **Apply 5-A** to one planned AI feature. Write 2–3 sentences per step. Don't skip A5 — define eval cadence. Push to: `/docs/discovery/5a-framework-[feature].md`

**Key takeaways:**
- 5-A is circular: Assess → Architect → Acquire → Assemble → Assess
- Overton Window: earn autonomy, don't assume it
- Crystallization: Content → Context → Confirmation

---

### Lesson 1.4 — AI ROI, Unit Economics & Investment Memo

*Type:* `framework`
*Last verified:* 2026-Q2

**Most enterprise AI pilots fail ROI. The reason is never the model — it's missing financial rigor.**

**Why AI ROI is different**: SaaS has near-zero marginal cost. AI has variable cost per inference. Every call costs tokens. Every session has direct compute cost. AI products can lose money per interaction if not architected correctly.

**The AI ROI Formula**:
Value = (Time saved × Hourly cost) + Efficiency gains + Revenue increase + Risk mitigation
Cost = Tokens + Vector DB + Labor + Annotation + Observability + Human fallback
Net ROI % = ((Value - Cost) / Cost) × 100

**Critical nuances**:
- Token costs scale linearly with usage — Arabic text is 2–3x more expensive
- Human fallback costs must be included (when AI fails, humans handle it)
- Hallucination has measurable cost: wrong answers = support tickets, refunds, trust damage
- Include scenario analysis for varying hallucination rates

**The ROI Tree** — decompose value into branches:
- Cost Reduction: staff hours saved, error reduction, throughput increase
- Revenue: higher conversion (AI recs), faster response (less churn), new capabilities
- Risk Mitigation: compliance automation, fraud detection, data quality

**AI-Specific Pricing Models**:
- **Per-seat**: traditional, but doesn't reflect AI cost structure
- **Usage-based**: charges per action/query — aligns cost with value but unpredictable for customer
- **Outcome-based**: charges per successful resolution — highest alignment but hardest to measure
- **Tiered compute**: basic (fast/cheap model) vs premium (frontier model) — lets users self-select

**Adoption Strategy Phases**:
1. Shadow mode (Week 1–2): AI runs alongside human, outputs compared but not shown
2. Suggestion mode (Week 3–4): AI shown as suggestions, human decides
3. Supervised autonomy (Month 2+): AI acts, human reviews periodically
4. Full autonomy (Month 3+): if eval metrics justify
**THE AI CONSTRAINT MODEL**
Traditional PM balances Scope, Time, and Cost. AI PM balances **5 distinct constraints** (updated 2026):
- **Quality**: Eval pass rate and hallucination tolerance.
- **Latency**: Time to first token / total generation time.
- **Cost**: Token burn rate and compute expense.
- **Privacy/Security**: Data retention and context boundaries.
- **Compute Budget**: Reasoning tokens allocated per inference call — a dynamic variable you set at runtime, not compile time. Thinking models (Claude extended thinking, o3, Gemini 2.5 Pro) make this a first-class PM decision: how much compute do you budget to this task?

*Trade-off Example*: You can increase Quality by using a thinking model with a high Compute Budget, but it will degrade Latency (30–120s thinking time) and increase Cost (reasoning tokens are priced separately). The right Compute Budget is proportional to task complexity — don't spend thinking tokens on simple classification.

**When to kill**: Pain score < 100. No ROI path in 6 months. Data unavailable in 4 weeks. Problem is deterministic.

**Case study — Amazon's AI-powered product descriptions**:
Amazon uses LLMs to generate product listing descriptions at scale. ROI: reduced listing creation time from 30 min to 2 min. But the key lesson: they started in shadow mode — AI drafts were compared to human drafts for 6 weeks before any went live. Hallucination in a product listing (wrong specs) = customer returns = direct cost. They built a 2,000-case golden dataset of product descriptions with verified specs before deployment.

**Quiz.** Why must AI ROI calculations include human fallback cost?
> Because when AI fails (and it will), humans handle the escalation. That labor cost is real and recurring. Ignoring it inflates ROI projections.

**Apply.** **Write a 1-page AI investment memo** for your highest-priority feature:
1. Problem statement + pain score
2. ROI tree with specific numbers
3. Fully loaded cost estimate
4. 3 scenarios: optimistic / baseline / pessimistic
5. Kill criteria
6. Adoption phase plan

Push to: `/docs/discovery/ai-business-case.md`

**Key takeaways:**
- AI ROI includes per-inference cost + human fallback
- ROI Tree: cost reduction / revenue / risk mitigation
- Adoption: shadow → suggest → supervise → autonomous

---

### Lesson 1.5 — Kill Criteria and Sunset Discipline

*Type:* `framework`
*Last verified:* 2026-04-17

Shipping discipline is incomplete without shutdown discipline.

Teams should define kill criteria before launch to avoid sunk-cost escalation.

**Five kill-criteria dimensions**:
1. Value failure: target user outcomes are not improving.
2. Quality failure: eval pass rates or user correction rates miss threshold.
3. Economic failure: unit economics break beyond agreed tolerance.
4. Risk failure: unresolved compliance, safety, or trust red lines.
5. Adoption failure: repeated usage and retention stay below floor.

Each criterion needs:
- threshold
- measurement source
- accountable owner
- review cadence
- explicit sunset path

**Case references**:
- Google Stadia (sunset announced 2022): strong technical quality but weak sustained adoption.
- Zillow Offers (wind-down 2021): model error and volatility risk broke business assumptions.

Kill criteria are not pessimism; they are portfolio quality control. High-performing teams pre-commit exit triggers so resources can be reallocated quickly to better bets.

**Quiz.** Why should kill criteria be defined before launch rather than after problems appear?
> Because pre-committed thresholds prevent emotional decision-making and sunk-cost bias. Without them, teams keep funding low-signal products too long.

**Apply.** Create a kill-criteria register for one AI feature with at least 5 dimensions, thresholds, owners, and sunset actions. Push to: `/docs/templates/kill-criteria-register.md` and link the completed version in your capstone evidence pack.

**Key takeaways:**
- Kill criteria are pre-launch governance controls
- Every criterion needs threshold + owner + cadence
- Sunset discipline protects portfolio quality

---

## MODULE 2 — Model Systems & Token Economics

*WEEK 2 · Tag: Technical*

### Lesson 2.1 — How LLMs Work: Tokens, Embeddings, Attention

*Type:* `technical`
*Last verified:* 2026-Q2

**You don't build LLMs. You understand them well enough to make product decisions.**

**Tokens** — LLMs read tokens (~¾ English word). Arabic uses 2–3x more tokens. This affects cost, latency, and context budget. Mitigation for Arabic: AraToken normalization, diacritics removal → 30–50% token reduction.

**Embeddings** — vectors (768–12,288 dimensions) encoding semantic meaning. Foundation of semantic search, RAG, classification. For Arabic: use BGE-M3 or Multilingual-E5-large (default English models fail).

**Context window** — the model's working memory per call. Claude Opus: 200k tokens. GPT-4.1: 1M. Gemini 2.5: 1M. When exceeded, older content drops. PM decisions: what fits in context vs needs retrieval? How to manage budget across system prompt + chunks + history + tool outputs?

**Attention** — the mechanism that lets models weigh which tokens relate to each other. Key PM insight: attention fades in the middle of long contexts. Place critical instructions at the beginning AND end. This is the primacy/recency effect for LLMs.

**Transformer architecture in 30 seconds**: Input → tokenize → embed → attention layers (which tokens relate?) → predict next token → repeat. The "next token prediction" framing matters: LLMs don't "understand" — they predict likely continuations. This is why they hallucinate confidently.

**Reasoning Tokens: The 2026 Cost Dimension**
Standard models charge for input + output tokens only. Thinking models (Claude extended thinking, o3, Gemini 2.5 Pro) add a third cost bucket: **reasoning tokens** — the internal chain-of-thought generated before the answer.

Typical pricing structure:
- Input: ~$3–15/1M tokens
- Output: ~$15–60/1M tokens
- Reasoning: ~$60–80/1M tokens

**Worked cost comparison — 1,000 calls/day**:
| Approach | Tokens per call | Daily cost |
|---|---|---|
| Fast model (GPT-4o-mini) | 1K in + 500 out | ~$0.60 |
| Standard model (Sonnet) | 1K in + 500 out | ~$3.75 |
| Thinking model (extended) | 1K in + 8K reasoning + 500 out | ~$54 |

The break-even question: does the thinking model's quality improvement generate enough downstream value (reduced errors, better decisions, fewer human reviews) to justify 14× the standard model cost?

**The "runaway thinking" failure mode**: Thinking models given complex prompts on simple tasks can generate thousands of reasoning tokens on a $0.10 problem. Always set a `max_reasoning_tokens` budget ceiling. This is a PM architecture decision, not just an engineering parameter — it determines your unit economics floor.

**Quiz.** Where in a long prompt should you place your most critical instructions and why?
> At the beginning AND end. The attention mechanism exhibits primacy/recency bias — middle content receives less attention in very long contexts.

**Apply.** **Token cost calculator**: Estimate monthly cost of your Arabic email parser. Include: avg input tokens (use Anthropic tokenizer), volume (emails/day × 30), pricing (Sonnet: $3/1M in, $15/1M out). What if volume 3x's? Push to: `/docs/develop/token-cost-model.md`

**Key takeaways:**
- Arabic = 2–3x token penalty → use AraToken, BGE-M3
- Attention fades in middle → instructions at edges
- LLMs predict tokens, they don't understand — hallucination is inherent

---

### Lesson 2.2 — GenAI Value Stack, Moats & Model Selection

*Type:* `technical`

**5 layers**: Compute (commodity) → Foundation Models (commoditizing) → Infrastructure (emerging) → Applications (where you compete) → User Data (real moat).

**4 Sources of Durable AI Moat**: Proprietary data, Distribution, Trust, Learning loops.

**Contextual Moats** (2026): When everyone has the same APIs, your moat is proprietary context — domain data, interaction patterns, eval datasets, feedback loops. This compounds and resists replication.

**Model Selection System** — stop defaulting to one model:

| Task | Tier | Examples | Optimize |
|---|---|---|---|
| Classification, routing | Compact | Haiku, GPT-4o-mini, Flash | Latency + Cost |
| Drafting, RAG QA | Standard | Sonnet, GPT-4o, Gemini Pro | Quality + Balance |
| Multi-step reasoning, agents | Frontier | Opus, GPT-4.1, o3 | Quality + Depth |
| Regulated/private | Open-weight | LLaMA, Mistral, Qwen | Privacy + Control |

**Dynamic Compute Allocation**: Route by intent complexity. Simple → standard. Complex → extended thinking. Optimizes gross margin.

**Live Model Registry pattern**: Maintain `/docs/live/model-registry.md` — map task → model → pricing → last verified. Update quarterly. Never hardcode model names.

**Caching**: Prompt caching (90% savings on static prefixes), semantic caching (similar queries), response caching (deterministic outputs).

**Case study — Google's Gemini in Search**:
Google uses model routing extensively. Simple factual queries → Gemini Flash (fast, cheap). Complex reasoning → Gemini Pro. Research-grade → Gemini Ultra. The routing classifier itself is a small model optimized for speed. Result: 80% of queries handled by the cheapest model tier while maintaining quality.

**Quiz.** Why is 'we use GPT-4' not a moat?
> Because your competitor can use it too — models are commoditizing. Moats come from proprietary data, distribution, trust, and learning loops that compound over time.

**Apply.** **Build your model selection table** for every AI feature. Include task, tier, model, cost estimate, cache strategy. Push to: `/docs/live/model-registry.md`

**Key takeaways:**
- The model is NOT your moat — contextual moats are
- Dynamic compute: route by complexity to optimize margin
- Live model registry — never hardcode model names

---

### Lesson 2.3 — AI Product Metrics & the AI PRD

*Type:* `framework`

**Standard metrics don't work for AI products.**

**Output quality**: Task completion rate, accuracy/precision/recall, hallucination rate, **user correction rate** (THE leading indicator).

**System performance**: TTFT + total response time (p50/p95/p99), throughput, error rate, token efficiency.

**Business impact**: Time-to-value, engagement (% weekly AI users), retention impact, cost per AI interaction vs human interaction.

**The AI PRD — 6 additions beyond standard**:
1. Model selection rationale (tier, cost/quality tradeoff)
2. Data requirements (sources, quality, privacy, annotation)
3. Context strategy (instructions + grounding + tools + outputs)
4. Guardrails spec (all 4 types: input/output/tool/approval)
5. Eval criteria (golden dataset, judge rubric, regression suite, min quality bar)
6. Trust design (HITL level, error UX, explanations, feedback collection)

**AI Sprint Management**:
- Sprint 0: data audit + eval dataset creation + context strategy (most important, most skipped)
- Sprint 1–N: context iteration → eval → iterate
- Definition of Done: eval ≥ threshold AND latency ≤ target AND cost ≤ budget AND guardrails passing

**What makes an AI PRD different from a regular PRD**: Non-determinism. You must specify quality ranges, not exact behaviors. "The system will correctly extract order details from 85%+ of Arabic emails" not "The system will extract order details from all emails."

**Quiz.** What is the single most important metric for AI product quality in production?
> User correction rate — how often users edit or reject AI output. It's the leading indicator of perceived quality, captures issues evals miss, and generates free training data.

**Apply.** **Write your first AI PRD** with all 6 AI-specific sections + problem statement, success metrics, HITL level, launch criteria, kill criteria. Push to: `/docs/ai-prd-[feature].md`

**Key takeaways:**
- User correction rate = THE leading indicator
- AI PRD = standard PRD + 6 AI sections
- Sprint 0: eval dataset + context strategy FIRST

---

### Lesson 2.4 — Machine-Readable Acceptance Criteria

*Type:* `framework`

**If criteria are not machine-readable, AI delivery quality collapses.**

Agent-ready criteria must be:
- Binary (pass/fail)
- Scoped (exact input/output boundary)
- Observable (clear evidence source)
- Risk-aware (explicit failure condition)

**Recommended AC schema**:
- `id`
- `scenario`
- `input_contract`
- `expected_output_contract`
- `guardrail_expectation`
- `evidence_source`
- `pass_rule`
- `fail_rule`

**Anti-pattern**: "Should work well."  
**Better**: "For 50 golden cases in category A, pass rate >= 90%, no PII leakage, and p95 latency <= 3s."

Tie every AC to one evidence lane: deterministic check, eval score, trace, or human review result.

**Quiz.** What makes an acceptance criterion agent-executable?
> It is binary, scoped, observable, and has explicit pass/fail evidence that can be verified without human interpretation.

**Apply.** Convert one existing feature spec into 8 machine-readable acceptance criteria using the schema above. Push to: `/docs/specs/[feature]-agent-criteria.md`

**Key takeaways:**
- Binary ACs prevent scope ambiguity
- Every AC needs an evidence source
- Failure conditions must be explicit

---

### Lesson 2.5 — AI PRD for Agent-Executed Features

*Type:* `framework`

AI PRDs should be execution contracts, not narrative docs.

**Required sections for agent execution**:
1. Outcome and user-risk boundary
2. Context budget and grounding policy
3. Tool permissions and forbidden actions
4. Output schema and acceptance gates
5. Eval suite definition and release thresholds
6. HITL checkpoints and escalation policy

**Execution discipline**:
- If output schema is missing, do not ship.
- If eval thresholds are missing, do not launch.
- If escalation owner is missing, do not enable autonomy.

AI PRDs should be short, rigid, and test-linked. Anything not testable belongs in notes, not in launch gates.

**Quiz.** What is the biggest failure in traditional PRDs when used with coding agents?
> They describe intent but omit executable constraints like tool permissions, output schema, and objective gates.

**Apply.** Refactor one current PRD into the 6-section AI PRD format and link each gate to one measurable test. Push to: `/docs/ai-prd-[feature].md`

**Key takeaways:**
- AI PRDs are execution contracts
- No thresholds means no launch
- Schema + permissions + gates are mandatory

---

### Lesson 2.6 — Model Routing by Task Type

*Type:* `technical`

Model choice is a routing policy, not a preference.

**Task taxonomy baseline**:
- Classification/routing
- Extraction/normalization
- Drafting/rewrite
- Reasoning/planning
- Tool-use execution

**Routing policy fields**:
- primary_model
- fallback_model
- quality_floor
- latency_ceiling
- cost_ceiling
- downgrade_trigger
- escalation_trigger

Design routing so most traffic stays on lower-cost paths and only high-complexity requests escalate.

Track routing outcomes weekly:
- quality misses by task type
- fallback frequency
- cost per successful outcome
- latency percentile drift

**Quiz.** Why should routing policy be task-based instead of one-model-for-all?
> Because task complexity and risk differ; routing by task preserves quality while controlling latency and cost.

**Apply.** Create a routing policy table for five task types with fallback and escalation rules. Push to: `/docs/templates/model-routing-policy.md`

**Key takeaways:**
- Route by task, not by preference
- Fallbacks must be pre-defined
- Weekly routing telemetry is mandatory

---

### Lesson 2.7 — Reasoning & Thinking Models: The PM Decision Framework

*Type:* `technical`
*Last verified:* 2026-Q2

**Thinking models are a distinct product category — not just "better" models.**

Claude Sonnet extended thinking, o3/o4-mini, and Gemini 2.5 Pro represent a new tier. They spend additional compute *before* answering, working through a chain-of-thought internally. The PM decision tree is completely different from standard models.

**The Core Trade-off**
| Dimension | Fast Model | Thinking Model |
|---|---|---|
| Latency | 1–5s | 30–120s |
| Cost | Baseline | 5–15× more |
| Reasoning quality | Good | Excellent on complex tasks |
| Determinism | Higher | Lower (reasoning path varies) |
| UX pattern | Inline result | Progress indicator / async |

**When to Use a Thinking Model (all 3 must be true)**:
1. Task requires multi-step reasoning, decomposition, or judgment across ambiguous inputs (e.g., legal review, strategic analysis, complex code review)
2. Users can tolerate 30–120s latency — or the task runs async/in the background
3. Quality improvement justifies 5–15× cost premium at your expected call volume

**When NOT to use a thinking model**:
- Classification, extraction, short drafts — standard models match quality at 1/10th the cost
- Real-time UX requiring sub-5s response — users abandon at 8s
- High-volume, low-stakes tasks — cost explodes without quality benefit

**The 5-Constraint Decision Matrix**

When evaluating a thinking model for a feature, map it against all 5 constraints:

| Constraint | Question to answer |
|---|---|
| Quality | Does the task need reasoning depth that standard models miss? |
| Latency | Can UX design absorb 30–120s (progress bar, async, background job)? |
| Cost | Does quality gain justify 5–15× at current + projected volume? |
| Privacy | Do reasoning tokens traverse the same data boundary as standard tokens? |
| Compute Budget | What is the max reasoning token budget per call before cost is unacceptable? |

**Reasoning Token Cost Structure**
Thinking models price reasoning tokens separately from input and output tokens:
- Input: ~$3–15/1M tokens
- Output: ~$15–60/1M tokens
- Reasoning: ~$60–80/1M tokens (the expensive part)

**Worked example — 1,000 daily calls**:
- Fast model (Sonnet standard): 2K tokens in × $3 + 500 tokens out × $15 = ~$13.50/day
- Thinking model (same task): 2K in + 8K reasoning + 500 out = ~$54/day (4× cost)
- Break-even: only justified if task quality improvement drives measurable downstream value

**UX Patterns for 30–120s thinking time**
- Progress indicator: "Analyzing... (this may take up to 60s)" — never show raw elapsed time
- Streaming thinking tokens: show the reasoning trace to build trust — users feel the model is "working"
- Hidden chain-of-thought: for consumer UX, hide the reasoning and show only the result
- Async/background: fire-and-forget → notify when complete (email, notification, in-app badge)
- Never use thinking models for inline chat responses — latency kills the interaction

**When thinking models produce worse results**
- Simple tasks: over-reasoning introduces drift — the model second-guesses a correct answer
- Hallucinated reasoning chains: the thinking trace looks rigorous but the conclusion is wrong
- Eval coverage: your eval system must test reasoning quality, not just output correctness — a right answer via wrong reasoning is a latent risk

**Practice Exercise — classify 5 scenarios**:
Which of these warrant a thinking model? (Answer: 1, 3, 5)
1. Legal contract risk review for enterprise customers (yes — complex judgment, async OK)
2. Product recommendation in a live storefront (no — latency-critical, standard model sufficient)
3. Incident post-mortem analysis across 50 log files (yes — multi-step reasoning, batch OK)
4. Autocomplete in a search bar (no — sub-200ms required, reasoning model impossible)
5. Strategic market sizing for a PM investment memo (yes — depth matters, async acceptable)

**Quiz.** A PM wants to use a thinking model for all AI features to 'maximize quality.' What's wrong with this reasoning?
> Thinking models are 5–15× more expensive with 30–120s latency. For simple tasks (classification, extraction, short drafts), standard models match quality at a fraction of the cost. Using thinking models indiscriminately destroys unit economics and breaks real-time UX. The right model is the cheapest one that clears your quality bar for the task.

**Apply.** **Thinking model audit**: List your top 5 AI features. For each, score: reasoning depth required (1–5), latency tolerance (1–5 where 5 = async OK), cost headroom (1–5). Features scoring ≥ 12/15 are candidates. Push to: `/docs/develop/thinking-model-candidates.md`

**Key takeaways:**
- Thinking models: 30–120s / 5–15× cost / only for complex reasoning tasks
- 5-constraint model: add Compute Budget to Quality/Latency/Cost/Privacy
- UX: progress indicator or async — never inline chat

- *Sources:* Anthropic Extended Thinking Documentation 2026; OpenAI o3/o4-mini Launch Materials 2025; Google Gemini 2.5 Pro Technical Report 2026
- *Failure modes:* Using thinking models for all tasks (cost explosion); No async UX for 30–120s responses (user abandonment); Skipping compute budget ceiling (runaway cost)

---

## MODULE 3 — Context Engineering

*WEEK 3 · Tag: Core*

### Lesson 3.1 — The Context Engineering Stack

*Type:* `technical`
*Last verified:* 2026-Q2

**Prompt engineering is 2023. Context engineering is 2026.**

**Context engineering** = designing the entire information environment the model operates in:

**Layer 1 — Instructions**: System prompt, persona, constraints, output format, negative constraints ("do NOT hallucinate features"). XML tags for Claude: `<instructions>`, `<context>`, `<output_format>`.

**Layer 2 — Grounding** (3 patterns):
| Pattern | When | Pros | Cons |
|---|---|---|---|
| Long context | <100k tokens, high coherence | Simple, no infra | Expensive per-call |
| RAG | Large/dynamic knowledge | Scales, fresh data | Complex, chunking critical |
| Memory | Persistent state across sessions | Personalization | State management |

**Layer 3 — Tools**: Function calling → structured JSON → your code executes. Tool descriptions are prompts — quality in = quality out. Classify: Read (safe) / Write (confirm) / Delete (always approve).

**Layer 4 — Structured Outputs**: JSON schema enforcement (Anthropic: tool_choice, OpenAI: response_format). Eliminates 90%+ parsing errors.

**Layer 5 — Reasoning Control**: Standard for simple. Extended thinking for complex. Budget tokens to control cost.

**Minimum Viable Context (MVC)**: The smallest set of inputs needed for the current task. Overloading degrades quality. Starving causes hallucination. Finding the sweet spot IS the PM's job.

**Andrej Karpathy (2025)**: "Most agent failures are not model failures — they are context failures."

**System Prompts as Versioned Product Artifacts**
A system prompt is not a configuration string — it is a product artifact. Treat it like code:
- Version-control it (commit every change, tag releases)
- Test it (every system prompt change needs an eval run before deployment)
- Deploy it (staged rollout: shadow → canary → production)
- Monitor it (track quality metrics per system prompt version)

Breaking a system prompt change in production is as bad as a broken API deployment. Teams that version-control their system prompts ship 3× faster because they can roll back in seconds, not hours of prompt debugging.

**Prompt Caching Economics**
Most model providers (Anthropic, OpenAI) support prompt caching on static prefixes. If your system prompt is 10,000 tokens and you make 1,000 API calls per day:
- Without caching: 10,000 × $3/1M × 1,000 = $30/day in system prompt tokens alone
- With caching: first call full price, subsequent calls at ~10% of input price → ~$3/day
- **Savings: ~80%** on repeated context tokens

PM decision: structure your system prompt so the stable, cacheable part (persona, instructions, constraints) comes first, and the dynamic part (user-specific context, conversation history) comes last. This maximizes cache hit rate.

**The CLAUDE.md / AGENTS.md Pattern**
For agent systems and AI-native codebases, encode context rules as a machine-readable spec file at the root of your repository:
- `CLAUDE.md` / `AGENTS.md`: defines what the agent knows about the codebase, what it can and cannot do, quality standards, and tool permissions
- This file is injected into the agent's context on every run — it is the "system prompt as infrastructure"
- PM benefit: context rules become auditable, versionable, and reviewable like code

The AGENTS.md pattern is now the canonical way to manage persistent agent context in production codebases. It prevents agents from re-learning the same rules on every run and gives PMs a single artifact to update when policies change.

**Context Audit Exercise**
For your highest-priority AI feature, audit each context layer:
1. What is in the system prompt that should be cached? (static instructions, persona, constraints)
2. What changes per-request and cannot be cached? (user history, current query, dynamic data)
3. What should be retrieved via RAG rather than hardcoded? (large knowledge bases, live data)

Misallocating content across these three buckets is the most common source of both poor quality AND unnecessary cost.

**Quiz.** What is Minimum Viable Context and why does it matter?
> MVC is the smallest set of inputs the model needs for the current task. Too much context degrades quality (noise). Too little causes hallucination (no grounding). The PM's job is finding the sweet spot.

**Apply.** **Context audit**: Map every layer for your highest-priority feature. Identify the weakest layer — that's where quality improvement lives. Push to: `/docs/design/context-engineering-audit.md`

**Key takeaways:**
- Context engineering > prompt engineering
- 3 grounding patterns: long context / RAG / memory
- MVC: enough to be accurate, not so much it degrades

---

### Lesson 3.2 — Advanced Prompting & RAG Architecture

*Type:* `technical`
*Last verified:* 2026-Q2

**5 advanced prompting techniques** (still Layer 1 of context engineering):
1. **Chain-of-Thought**: "Think step by step before answering" — dramatic accuracy improvement
2. **Few-Shot**: 2–5 examples showing format + quality expected. Include normal, edge, error.
3. **XML Delimiters**: `<instructions>`, `<context>`, `<query>` — prevents conflation, mitigates injection
4. **Structured Output Spec**: Exact JSON schema with types + required fields
5. **Negative Constraints**: "Do NOT hallucinate. If unknown, say 'I don't know.'" — reduces hallucination more than positive instructions

**Context vs. Behavior Matrix**:
| | Behavior correct | Behavior wrong |
|---|---|---|
| Context sufficient | Ship ✓ | Fix instructions |
| Context missing | Add grounding | Fix both |

**RAG Pipeline**: Documents → Chunking → Embedding → Vector Store → Query → Retrieval → Reranking → Injection → LLM → Output

**Chunking** (critical): Sentence-aware (300–600 tokens, 50–100 overlap). MANDATORY for Arabic — naive character-based chunking destroys Arabic semantic embeddings.

**Hybrid search**: Semantic (0.7) + BM25 keyword (0.3) outperforms either alone.

**Reranking**: After initial top-20, reranker sorts by relevance → return top-3. Cohere Rerank or BGE Reranker. 15–30% quality improvement for near-zero cost.

**Citation systems**: Every AI claim should cite its source chunk. Trust UX pattern AND debugging tool.

**2026 RAG Baseline: What's Now Production-Standard**

**Hybrid search is the default, not an option.** Pure vector (semantic) search underperforms on precise queries — "what is the refund policy for order #12345?" needs keyword matching, not semantic similarity. Production baseline: semantic vectors (weight 0.7) + BM25 keyword (weight 0.3). Most vector DBs (Weaviate, Pinecone, Qdrant) support this natively.

**Reranking: the cheap step with a big payoff.** After initial retrieval returns top-20 candidates, a cross-encoder reranker (Cohere Rerank 3, BGE Reranker v2) sorts them by actual relevance to the query and returns the top 3–5. Cost: ~$0.001 per rerank batch. Quality improvement: 15–30% on answer relevance and hallucination rate.

**Long-Context vs. RAG Decision Framework**
With GPT-4.1 and Gemini at 1M-token context windows, "should I RAG or stuff it in context?" is now a real PM decision:

| Dimension | Use RAG | Use Long Context |
|---|---|---|
| Document corpus size | >500K tokens | <100K tokens |
| Update frequency | Live / daily updates | Static or rarely updated |
| Cost per query | Important to minimize | Cost is secondary |
| Latency requirement | <3s acceptable | Flexible |
| Privacy | Documents must not leave your infra | Cloud context OK |

**Agentic RAG**: Agents that self-direct retrieval — deciding what to query, when to re-query (if initial results are insufficient), and when context is already sufficient. PM implication: your eval system must cover retrieval decision quality, not just answer quality. An agent that retrieves irrelevant chunks and gives a confident wrong answer has passed output eval but failed retrieval eval.

**The "retrieved noise" failure mode**: RAG returns chunks that are topically adjacent but not actually relevant — the model hallucinates an answer from noisy context. Three PM-level levers: (1) reduce chunk size for precision-critical queries, (2) lower top-K (try top-3 instead of top-10), (3) add reranking to filter before the model sees results.

**Quiz.** Why is sentence-aware chunking mandatory for Arabic RAG systems?
> Naive character-based chunking splits Arabic mid-sentence, which destroys the semantic embedding entirely. Arabic sentence boundaries carry critical meaning — breaking them produces vectors that don't represent the original content.

**Apply.** **Rebuild your primary prompt** using the full context engineering stack. Checklist: XML delimiters, 3 few-shot examples, CoT, JSON schema, 3+ negative constraints, placement optimization. Compare 10 test results. Push to: `/docs/develop/context-engineering-v2.md`

**Key takeaways:**
- Context vs. Behavior Matrix: diagnose what's broken
- Arabic RAG: sentence-aware chunking + BGE-M3 + hybrid search
- Reranking: cheap step, 15–30% quality boost

---

### Lesson 3.3 — Tool Use, MCP & Optimization Ladder

*Type:* `technical`
*Last verified:* 2026-Q2

**Tool calling turns models from text generators into action takers.**

**MCP (Model Context Protocol)**: The de facto integration standard for AI tools as of 2026. Every major enterprise toolchain — Linear, Notion, Slack, Figma, GitHub, Jira, Salesforce — has published an MCP server. Linux Foundation governed. 97M+ monthly SDK downloads. Anthropic, OpenAI, Google, Microsoft all support it. One interface replaces hundreds of custom integrations.

**MCP is a PM decision, not just an engineering one.** Connecting an MCP server directly changes what your agent can see and do. Every server connection is a scope decision with blast radius implications.

**PM Tool-Scope Decision Framework**
For each MCP server you consider connecting to an agent, answer:
1. **Read scope**: What data will the agent be able to read? (All Notion pages? Specific databases? All Slack channels?)
2. **Action scope**: What can the agent do? (Read-only search? Create issues? Send messages? Delete records?)
3. **Blast radius**: If the agent makes an unintended action, what is the worst-case damage? (Spam 500 Slack users? Delete a Linear project? Expose a customer's data?)

**Principle of Least Capability**: Connect only the MCP servers whose read/write scope is necessary for the specific task. An agent that summarizes Notion docs does not need write access to Notion. An agent that creates Linear issues does not need access to your Slack DMs.

**MCP Security Model**:
- Tool call approval flows: require human confirmation before any Write or Delete action in production
- Audit logging: every MCP tool call should be logged with timestamp, inputs, and outcome
- Scope review: quarterly review of which MCP servers are connected and whether each connection is still justified

**The PM mental model shift**: Before MCP, the question was "how do I give my agent access to X?" After MCP, the question is "which MCP server exposes X, what scope does connecting it grant, and is that blast radius acceptable?"

**Over-grant failure mode**: Connecting a CRM MCP server with full write access to an agent that only needs to look up customer names. The agent can now update records, delete entries, or—if prompt-injected—exfiltrate customer data. Two illustrative cases: (1) a support agent given CRM write access accidentally updated 200 customer records during a prompt injection test; (2) a research agent given full Slack access leaked internal pricing discussions to an external API call.

**Tool description quality = tool selection quality**:
Bad: `"search": "searches stuff"`
Good: `"search_product_catalog": "Search product catalog by name, category, or SKU. Returns name, price, stock, description. Use for availability/pricing/specs queries."`

**Side-effect control taxonomy**:
| Type | Risk | HITL |
|---|---|---|
| Read (search, lookup) | Low | None |
| Write (create, update) | Medium | Confirm for new features |
| Delete/Refund | High | ALWAYS approve |

**The Optimization Escalation Ladder** (never skip steps):
1. Zero-shot prompt (try first, always)
2. Advanced prompting (CoT + few-shot + delimiters + negatives)
3. Context engineering (better grounding — RAG, expanded context, tools)
4. Model upgrade (Haiku → Sonnet → Opus / extended thinking)
5. Fine-tuning (LAST resort — behavior consistency only, NOT knowledge)
6. Architecture change (specialized models per sub-task)

**Updated fine-tuning guidance (2026)**: Fine-tuning is for behavioral tone/format consistency, not knowledge injection. Modern context engineering + RAG handles knowledge. Most teams that think they need fine-tuning actually need better RAG or structured outputs. Use fine-tuning only after exhausting Steps 1–4.

**Quiz.** An AI feature gives inconsistent output format. What's your first fix?
> Structured output specification (JSON schema enforcement) — Step 2 on the ladder. NOT fine-tuning. Structured outputs with tool_choice/response_format eliminates 90%+ format inconsistency at zero extra cost.

**Apply.** **Tool inventory**: List every tool your AI agent needs. Classify Read/Write/Delete. Define guardrails per tool. Then: pick one underperforming feature and walk through the escalation ladder. Push to: `/docs/design/tool-inventory.md` and `/docs/develop/optimization-log.md`

**Key takeaways:**
- MCP = universal standard for AI tool connections
- Read/Write/Delete taxonomy determines safety requirements
- Escalation ladder: prompt → context → RAG → model → fine-tuning (in order)

---

### Lesson 3.4 — Fine-Tune vs. RAG vs. Prompt-Only: The Decision Framework

*Type:* `framework`
*Last verified:* 2026-Q2

**Most teams that think they need fine-tuning actually need better RAG. Most teams that think they need RAG actually need better prompting. The decision matters because the cost and complexity increase dramatically at each tier.**

**The 3-Way Decision Matrix**

| Scenario | Best Approach | Why |
|---|---|---|
| Output format/style inconsistency | Fine-tune | Format is learned, not retrieved |
| Large/dynamic knowledge base | RAG | Knowledge changes; RAG stays fresh |
| Corpus fits in context window | Prompt-only (long context) | Simplest, cheapest at small scale |
| Latency-critical, no retrieval step | Fine-tune | Eliminates retrieval round-trip |
| Need live/recent data | RAG | Fine-tuning knowledge freezes at training |
| Cost at very high call volume | Fine-tune smaller model | Smaller fine-tuned model < frontier model per call |
| Source citations required | RAG | Citations come from retrieved chunks |
| General task, good base model | Prompt-only | Optimization ladder step 1 always first |

**When Fine-Tuning Wins**
Fine-tuning is justified when:
1. **Format/style specificity**: The output needs a precise tone, structure, or domain vocabulary that few-shot examples can't reliably produce
2. **Latency-critical**: Removing the retrieval step saves 200–500ms — meaningful for real-time UX
3. **Cost at scale**: At >10M calls/month, a fine-tuned Llama 3 70B can cost 80–90% less than GPT-4o with equivalent quality on a narrow task

Fine-tuning is NOT a substitute for knowledge injection. A fine-tuned model knows "how" to respond in your style but does not know "what" changed in your product last week. RAG handles the what.

**When RAG Wins**
RAG is justified when:
1. **Live or frequently updated data**: Customer orders, product inventory, support tickets — data changes faster than fine-tuning cycles
2. **Large document corpus**: >500K tokens of reference material can't fit in context and is impractical to fine-tune on
3. **Source citations required**: Every claim must be traceable to a source chunk — RAG provides this natively
4. **Cost control on long context**: Stuffing 200K tokens in context on every call at $15/1M is expensive; RAG retrieves the 3–5 relevant chunks instead

**Distillation: The Standard Cost Optimization Move (2026)**
Use a frontier model (GPT-4o, Claude Opus 4) to generate high-quality labeled examples for a narrow task, then fine-tune a smaller model (Llama 3 8B, Phi-4, Qwen 2.5) on those examples.

Illustrative economics — customer intent classification at 5M calls/month:
- Frontier model: 5M × $3/1M × 200 tokens avg = $3,000/month
- Fine-tuned small model (self-hosted or Bedrock): ~$300–600/month
- Distillation cost (one-time): 10K examples × frontier model cost ≈ $30–50

Result: 80–90% cost reduction with equivalent quality on the narrow task.

**Synthetic Data Generation**
When labeled training data is scarce, use the same frontier model to generate synthetic training pairs. Pattern:
1. Write 20–50 high-quality seed examples manually
2. Prompt the frontier model: "Generate 200 more examples in this exact format and quality level"
3. Filter outputs using automated quality checks (schema validation, length, format)
4. Use the verified synthetic dataset for fine-tuning

PM implication: synthetic data generation turns a "we don't have enough training data" blocker into a 48-hour sprint.

**Practice Exercise — classify 4 scenarios**:
1. E-commerce chatbot that needs to answer questions about today's inventory (RAG — live data)
2. Legal brief generator that must match your firm's citation format precisely (fine-tune — format)
3. Customer support triage routing to correct department (prompt-only first; if inconsistent → fine-tune)
4. Medical symptom checker needing citations from current clinical guidelines (RAG — citations + live)

**Failure Modes**
- **Fine-tune over-fit**: Model trained on narrow format loses general reasoning ability — degrades on edge cases outside the training distribution
- **RAG + fine-tune noise**: Combining fine-tuning with RAG can produce conflict — the fine-tuned behavior contradicts retrieved context. Test the combination explicitly in your eval suite

**Quiz.** A PM wants to fine-tune a model to 'know' their product catalog so customers can ask questions about it. What's wrong with this approach?
> Fine-tuning encodes knowledge at training time — it won't know about new products, price changes, or stock updates. This is RAG's job: retrieve current catalog data at query time. Fine-tuning is for learning format/style/behavior, not live knowledge.

**Apply.** **Architecture decision**: For your top AI feature, fill out the 3-way matrix. Write a one-paragraph justification for your choice. If RAG: define chunk strategy and retrieval tier. If fine-tune: identify training data source and model size target. Push to: `/docs/develop/model-architecture-decision.md`

**Key takeaways:**
- Fine-tune = format/style/latency/volume; RAG = live data/citations/scale
- Distillation: frontier model generates training data for cheap small model
- Default order: prompt-only → RAG → fine-tune — never skip steps

- *Sources:* Anthropic Fine-tuning Documentation 2026; LlamaIndex RAG vs Fine-tuning Benchmark 2025; HuggingFace Model Distillation Guide 2026
- *Failure modes:* Fine-tuning for knowledge injection (use RAG instead); RAG for format consistency (use fine-tuning instead); Skipping distillation cost analysis at scale

---

## MODULE 4 — Discovery & Pain Quantification

*WEEK 4 · Tag: Discovery*

### Lesson 4.1 — AI Discovery: Cognitive Load & Service Blueprints

*Type:* `framework`

**Discovery in AI PM = understanding how users think, not just what they do.**

You're identifying: cognitive load hotspots (hesitation, second-guessing), unstructured interpretation (reading, summarizing messy sources), variable workflows (judgment-dependent paths), ambiguous intent zones (user can't articulate steps), context assembly (switching tabs, gathering files).

**Discovery failure mode**: Assuming AI justifies an AI feature. Sometimes the problem just needs workflow automation or a better UI.

**6-question discovery interview**:
1. "Walk me through the last time this went wrong."
2. "What information do you gather before making this decision?"
3. "What would you do if you couldn't do this step?"
4. "Where do you spend the most mental energy?"
5. "What do you always check twice?"
6. "Show me the tabs/tools you have open right now for this task."

**Service Blueprint**: User Action → Frontstage (visible) → Backstage (AI processing) → Support Systems (APIs, DBs) → Failure Points. Reveals where human-AI boundary should be drawn.

**Pain Score**: Severity (1–10) × Frequency (daily) × Users. Kill below 100. The highest score is your next AI feature.

**Mapping pains to capabilities**:
| Pain | AI Capability |
|---|---|
| "I read 20 emails to find one order" | Semantic search + summarization |
| "I rewrite the same response 10x/day" | Template generation + personalization |
| "Data is always in different formats" | Extraction + normalization |
| "Not sure which product to recommend" | Recommendation with reasoning |

**AI TEAM RACI**
AI projects require explicit decision rights. Use a RACI matrix (Responsible, Accountable, Consulted, Informed) for high-stakes AI decisions:
- *Golden Dataset*: PM (Accountable), Data Sci (Responsible)
- *Eval Thresholds*: PM (Accountable), ML Eng (Consulted)
- *Guardrail Design*: ML Eng (Responsible), Legal (Consulted)

**STAKEHOLDER POWER GRID**
Map stakeholders by Power (influence on launch) vs Interest (impact from AI). 
- *High Power / High Interest*: Manage closely (e.g., Legal for GenAI features). 
- *High Power / Low Interest*: Keep satisfied (e.g., Infra team for compute budget).
AI shifts stakeholders frequently: Legal moves to High Interest when autonomy increases.

**Quiz.** A team wants to build an AI feature. The pain score is 14. What do you do?
> Kill it. Pain Score of 14 (e.g., severity 7 × frequency 2 × 1 user) is below the 100 threshold. Redirect effort to the highest-scoring pain point.

**Apply.** **Run 1 real discovery interview** with a team member. Map pains → AI capabilities. Score each. Draw a service blueprint for the #1 pain. Push to: `/docs/discovery/team-discovery.md`

---
**APPLY B — AI Team RACI**
Draft a RACI matrix for your highest-risk AI decision (e.g., eval thresholds or guardrail design). Push to: `/docs/discovery/ai-team-raci.md`

**Key takeaways:**
- Cognitive load hotspots = where AI adds most value
- Pain Score > 100 or kill it
- Service blueprint reveals human-AI boundary
- Map stakeholders by Power vs Interest for AI risk

---

### Lesson 4.2 — AI-Native User Research

*Type:* `framework`
*Last verified:* 2026-04-17

AI PMs should use AI to accelerate discovery without sacrificing evidence quality.

**AI-native research stack**:
1. Source-mapped thematic synthesis (every theme linked to interview evidence)
2. Adversarial persona generation (explicit anti-stereotype guardrails)
3. Wizard-of-Oz pilots (human-in-the-loop simulation before full AI build)

**Three failure modes to avoid**:
- fabricated themes without source anchors
- persona stereotypes mistaken for user truth
- undisclosed Wizard-of-Oz pilots (ethical breach)

**Wizard-of-Oz patterns**:
- PM-assisted response drafting in live support trials
- manual back-office decision simulation behind AI UI
- constrained prototype with explicit user disclosure and consent

**Quiz.** What is the non-negotiable rule when using AI for interview synthesis?
> Every synthesized theme must map back to real source evidence. If a theme cannot be traced, treat it as hypothesis, not insight.

**Apply.** Use AI to synthesize at least 5 interview notes into themes with source citations, generate 3 adversarial personas with anti-bias constraints, and draft one disclosed Wizard-of-Oz pilot plan. Push to: `/docs/templates/ai-discovery-prompt-library.md`

**Key takeaways:**
- AI should accelerate discovery, not replace evidence
- Adversarial personas require anti-bias constraints
- Wizard-of-Oz must include disclosure and consent

---

### Lesson 4.3 — Quantifying AI Pain: Override Rate, Time-to-Task & the Eval Threshold Bridge

*Type:* `framework`
*Last verified:* 2026-05-08

**Pain Score (Lesson 4.1) is a pre-launch estimate. To ship and scale AI features, you need live, quantitative pain signals that survive contact with real users.**

The three pain signals every AI PM must measure:

| Signal | When | What it tells you |
|---|---|---|
| **Pain Score** (Severity × Frequency × Users) | Pre-discovery | Is this worth building? |
| **Time-to-Task baseline** | Pre-launch (2–4 weeks) | What is the value ceiling if AI is perfect? |
| **Override Rate** | Post-launch (rolling 4-week) | Is the AI actually trusted in production? |

**Override Rate — the leading indicator of AI product health**

Override Rate = (# of AI outputs the user corrects, rejects, or ignores) ÷ (total AI outputs in window).

It captures something accuracy metrics miss: trust. An AI can be 95% technically correct and have a 60% override rate because users don't trust the framing, the tone, or the confidence display. Override rate is the single number that reveals whether you have a quality problem, a trust problem, or a UX problem.

**Override Rate thresholds** (general guidance — calibrate to your domain):

| Override Rate | Signal | Action |
|---|---|---|
| >40% | Broken trust or broken model | Stop scaling. Audit eval suite + UX. |
| 25–40% | Quality or framing issue | Instrument failure modes; do not increase autonomy. |
| 10–25% | Healthy with friction | Normal range for new features; focus on top 3 failure modes. |
| 5–10% | High trust | Candidate for autonomy increase (HITL Level 2 → 3). |
| <5% over 8 weeks | Saturated | Consider further automation or stop iterating. |

**The "silent override" failure mode**: Users abandon the AI without ever clicking "reject." If your override mechanism requires explicit action, you are undercounting. Instrument *both* explicit overrides (edits, rejects) and implicit ones (didn't accept the suggestion within N seconds, switched back to manual workflow, copy-pasted out of the AI surface).

**Time-to-Task — the value metric**

Pre-AI baseline: instrument the manual workflow for 2–4 weeks. Median + p90 task duration. *This is the number you will be held accountable to.*

Post-launch: measure the same task with AI assistance (including override and correction time — real workflows are measured end-to-end, not from prompt to first token).

**Net value formula**:
`Net Value = (T_baseline − T_with_AI) × Frequency × Affected Users × Hourly Cost − Inference Cost − Override Cost`

Override Cost is the time users spend correcting AI output; it is real and often ignored. A feature with a 30% override rate at 5 minutes of correction per override can erase the time savings entirely.

**The Discovery → Eval Threshold Bridge**

Discovery quantification directly sets the eval pass rate you need to launch:

- If the maximum tolerable override rate is **25%**, your eval suite must hit **≥75% pass rate** on representative cases before production exposure.
- If the workflow has a hard correctness floor (e.g., financial actions, medical), your eval pass rate must hit **≥99%** on the safety-critical slice — and the override rate target is effectively 0 for that slice.

This is the formal handoff from Module 4 (discovery) to Module 6 (evals): *the override rate threshold is the eval target.* Don't set them independently.

**Instrumentation checklist** (ship before the model, not after):
1. Event schema: `ai_suggestion_shown`, `ai_suggestion_accepted`, `ai_suggestion_edited`, `ai_suggestion_rejected`, `ai_suggestion_ignored`
2. Time-to-task instrumentation on the manual baseline path (4 weeks before launch)
3. Override-rate dashboard with rolling 4-week window
4. Failure-mode tagging on every override (free-text reason, then NLP-clustered weekly)
5. Kill criteria tied to override rate thresholds (see `/docs/templates/kill-criteria-register.md`)

**Quiz.** Your AI feature has 92% accuracy on the eval suite but a 38% override rate in production. Where is the gap most likely?
> Trust, framing, or UX — not raw accuracy. The model is technically correct most of the time, but users don't accept the output. Audit the failure-mode tags on overrides: typical causes are unhelpful tone, low-confidence outputs framed as authoritative, missing citations, or output format that doesn't fit the user's downstream task. Fix the trust UX before improving the model.

**Apply.** **Pain quantification baseline.** For one AI feature (live or candidate), establish: (1) Pain Score, (2) 2-week time-to-task baseline on the manual workflow, (3) override-rate event schema and dashboard plan, (4) eval pass-rate threshold derived from your override rate target, (5) kill criteria entries tied to override thresholds. Push to: `/docs/discovery/pain-quantification-baseline.md`

**Key takeaways:**
- Override Rate is the leading indicator — it captures trust, not just accuracy
- Time-to-Task delta is the value metric; include override cost or you will overstate value
- Discovery sets the eval threshold: tolerable override rate = (1 − required eval pass rate)
- Instrument the override dashboard before you ship the model

- *Sources:* AI PM Course capstone evidence pack 2026; kill-criteria-register template
- *Artifact:* `/docs/discovery/pain-quantification-baseline.md`
- *Failure modes:* Counting only explicit overrides (silent abandonment goes undetected); Setting eval thresholds independently of override rate targets; Skipping the manual time-to-task baseline (no defensible value claim at launch)

---

## MODULE 5 — Trust Design & AI UX

*WEEK 5 · Tag: Design*

### Lesson 5.1 — 3P Framework, 4 Design Patterns & HITL Levels

*Type:* `framework`

**3P Framework**: Prioritization (is this the highest-value AI problem?), Placement (where in the user journey?), Prominence (how visible? — scales with proven quality).

**4 AI Design Patterns**:
1. **Inputs**: User text, metadata, retrieved context, history, product state. Most under-invested.
2. **Instructions**: System persona, format, constraints, forbidden actions. Rarely changes per-request.
3. **Outputs**: Text, JSON, function calls. Design for display AND downstream consumption.
4. **Feedback Loops**: Thumbs up/down, edits, re-generations, corrections. **No feedback loop = no improvement. The feature decays.**

**HITL Levels**:
| Level | System | Human | Default |
|---|---|---|---|
| 0 | Suggests options | Selects + executes | High-stakes |
| 1 | Proposes action | Approves/rejects | **START HERE** |
| 2 | Executes batches | Supervises plan | Bulk ops |
| 3 | Autonomous within rules | Manages guardrails | After trust earned |
| 4 | Acts + informs after | Reviews logs | Mature features |

**Trust design patterns**: Show confidence scores, explain reasoning, offer alternatives, make corrections 1-tap, acknowledge uncertainty, design fallback chains (model → cache → human → self-service).

**Non-determinism in UX copy**: Don't promise "This will save 2 hours." Do: "Typically reduces review time." Don't: "Correct answer." Do: "Suggested response."

**The Edit UX** — most underrated trust pattern: Track which fields get edited (prompt weakness), what users change to (free training data), how long editing takes (if longer than manual, feature is net negative).

**Quiz.** Why must all new AI features start at HITL Level 1?
> Because you haven't earned trust yet. Starting with autonomy before demonstrating reliability = organizational rejection + user churn. Level 1 (human approves) lets you measure quality in production before earning autonomy progression.

**Apply.** **Trust design**: For your #1 feature, define: starting HITL level + 6-month progression plan, all 4 design patterns, 3 trust signals for UI, fallback chain, error copy. Push to: `/docs/design/trust-design-[feature].md`

**Key takeaways:**
- HITL: always start Level 1, earn progression with data
- No feedback loop = feature decay
- Edit tracking = free training data

---

### Lesson 5.2 — Multilingual AI UX, Failure Design & Vendor Risk

*Type:* `framework`

**Arabic-first AI UX has unique challenges beyond translation.**

**Arabic-specific UX considerations**:
- RTL layout: AI-generated content must respect RTL consistently — test mixed Arabic + English product names/codes in the same response
- Formality register: Egyptian Arabic vs MSA — the AI must match the audience (colloquial for support chat, MSA for formal docs)
- Confidence display: Arabic users may interpret uncertainty signals differently — test with real users before launch
- Token economics: Arabic responses cost 2–3x more — design for conciseness, use AraToken normalization

**Designing failure gracefully** — every AI feature needs a fallback chain with defined UX at each step:
1. Low-confidence output → show with warning + ask user to verify
2. No output / error → show cached similar response + "we couldn't generate a live response"
3. Cache unavailable → route to human with full context pre-filled (reduce human ramp-up time)
4. Human unavailable → show self-service path + estimated wait time

**The Edit UX** — most underrated trust + training pattern:
- Which fields get edited most → your prompt is weak there
- What the edit changes to → free training data for improvement
- How long editing takes → if longer than manual, the feature is net-negative

**Context compression techniques** (when context window fills up):
- **Summarization**: compress older conversation history into a summary, keep recent turns verbatim
- **Selective retrieval**: only inject the top-3 most relevant RAG chunks, not top-10
- **Token budget allocation**: system prompt (15%) + retrieved context (40%) + history (30%) + user query (15%)
- **Memory tier offloading**: move low-priority context to persistent memory, retrieve only when needed
- **Prompt caching**: cache static system prompt prefix — saves 90% on repeated tokens

**Vendor risk management** — what happens when your LLM provider fails:
- Provider outage → automatic fallback to secondary model (e.g., Claude primary → GPT-4o fallback)
- Pricing change → budget modeling with 2x and 3x scenario analysis built into ROI
- Model quality regression after provider update → regression suite catches it before users do
- Data policy change → review vendor data retention (Anthropic/OpenAI zero-retention API options)
- API deprecation → abstract model calls behind an interface layer, not direct API coupling

**Rollout strategies for AI features**:
- **Canary**: 5% of users → monitor 48h → 25% → 50% → 100%
- **Feature flags**: toggle AI on/off per user segment
- **Shadow mode**: AI runs but output not shown — compare to human output
- **Gradual autonomy**: L1 (approve all) → L2 (approve some) → L3 (approve exceptions only)

**Quiz.** Your AI provider announces a 3x price increase effective in 60 days. What should you already have in place?
> A vendor risk plan: budget scenarios modeled at 2x and 3x pricing, model calls abstracted behind an interface (not direct API coupling), a tested fallback to an alternative model, and a regression suite to validate the fallback model's quality matches your SLOs.

**Apply.** **Failure UX audit + vendor risk plan**:

1. Map failure modes for your AI feature:
| Failure Mode | Current UX | Ideal UX | Fallback |
|---|---|---|---|
| Low confidence | ? | Warning + verify | ? |
| No response | ? | Cached response | ? |
| Wrong language | ? | Detect + re-route | ? |
| Hallucinated data | ? | Grounding check | ? |

2. Document your vendor risk plan: fallback model, budget scenarios, abstraction layer, regression suite for fallback validation.

Push to: `/docs/design/failure-ux-audit.md` and `/docs/deploy/vendor-risk-plan.md`

**Key takeaways:**
- Arabic UX: RTL, dialect register, token cost, conciseness
- Context compression: summarize history, top-3 chunks, budget allocation, memory offloading
- Vendor risk: always have fallback model + budget scenarios + abstraction layer

---

## MODULE 6 — Build, Evaluate & Iterate

*WEEK 6 · Tag: Core*

### Lesson 6.1 — The Build Loop: Prototype → Evaluate → Iterate

*Type:* `framework`
*Last verified:* 2026-Q2

**Why most AI prototypes fail to reach production**: Wrong problem selected (not AI-shaped). No evaluation criteria defined before building. No path from demo to production.

**The AI Build Loop**:
```
Define problem → Build eval dataset → Build prototype → Run evals →
     ↑                                                       |
     └──────────── Iterate on context/RAG/arch ──────────────┘
                              |
                     Meets quality bar?
                        Yes → Production
                        No → Back to eval
```

**Why evals come before code**: You cannot know if your product is improving unless you defined "good" before building. Teams that skip this build in circles for weeks.

**Minimum viable eval**: 20–50 test cases before first iteration. Cover: normal (60%), edge (25%), adversarial (15%). Each: input + expected output + rubric.

**Your build default**: n8n for orchestration + Claude API for intelligence + Langfuse for observability + Promptfoo for eval. Fastest path from idea to production.

**The 60-minute prototype rule**: If you can't build a working prototype in 60 minutes with your current stack, the architecture is too complex. Simplify first, optimize later.

**CRITICAL PATH FOR AI BUILDS**
Do not parallelize AI R&D blindly. The critical path is strictly sequential:
1. Define Problem & Pain Score
2. Define Eval Criteria & Golden Dataset (Cannot start RAG/Prompting without this)
3. Build Prototype (Prompt/RAG/Context)
4. Evaluate Prototype against Dataset
*Engineering UI/Backend can happen in parallel, but AI logic must follow this sequence to avoid rework.*

**SCRUM → AI TEAM TRANSLATION**
Traditional Agile must adapt for non-deterministic AI builds.
- *Sprint Planning* → *Scope & Confidence Planning*: "Can the model do this yet?"
- *Sprint 0* → *AI Kickoff*: Frame problem, define evals, assign RACI.
- *Velocity* → *Eval Pass Rate Trend*: Features don't matter if pass rate drops.
- *Definition of Done* → *Passes Golden Dataset and Guardrails active.*

**The 2026 Build Loop: AI Coding Agents as First-Class Participants**

The 60-minute prototype rule has evolved. With AI coding agents (Claude Code, Cursor, GitHub Copilot Workspace), the 60 minutes now produces a working PR, not just an n8n flow diagram.

**2026 Build Loop Workflow**:
1. PM writes a spec (acceptance criteria as binary pass/fail tests, data model, API contract, out-of-scope items)
2. AI coding agent (Claude Code / Cursor) generates a working PR against the spec
3. PM reviews the PR against acceptance criteria
4. Iterate — spec → PR → review → spec update → PR

The PM's job shifts from "build the prototype" to "write a spec tight enough that the agent can build the prototype."

**PM-to-Agent Spec Format Checklist**
For a coding agent to execute a spec without clarification, it must contain:
- [ ] Acceptance criteria written as binary pass/fail test conditions (not "should work well")
- [ ] Data model or schema (what fields, what types, what constraints)
- [ ] API contract (endpoint, request body, response shape, error codes)
- [ ] Out-of-scope items (explicitly prevents agent from gold-plating)
- [ ] Auth and permission assumptions (what does the caller need to have?)

Specs missing these elements produce agents that either guess wrong or loop asking for clarification.

**PM as Reviewer Checklist**
When reviewing an agent-generated PR:
- [ ] Do the acceptance criteria pass? (check test results if the agent wrote tests)
- [ ] No hardcoded secrets (API keys, tokens, passwords in source code)
- [ ] No `console.log` in production paths
- [ ] No type errors in statically-typed files
- [ ] No new dependencies added without justification
- [ ] Failure paths handled (what does the code do when the API call fails?)

**The Agent Hallucination in Code Failure Mode**
Coding agents generate plausible-looking code that doesn't match the spec — especially for edge cases and error handling. The mitigation is acceptance criteria written as concrete, binary conditions. A spec that says "the API should handle errors gracefully" gives the agent no testable target. A spec that says "if the upstream API returns 503, the endpoint must return 503 with `{ error: 'upstream_unavailable' }` within 2s" is agent-executable.

**Quiz.** A team builds an AI prototype and says 'it looks good.' What's wrong?
> No eval criteria were defined before building. 'Looks good' is a vibe check, not a metric. Without a golden dataset and rubric defined upfront, you can't measure improvement or catch regressions.

**Apply.** **Build a prototype in 60 minutes**: Use n8n + Claude API. Must produce real output (not demo). Must have 10+ test cases (even manual). Push prototype export + eval log to: `/projects/sprint-0-prototype/`

---
**APPLY B — AI Sprint 0 Kickoff**
Run an AI Kickoff for your upcoming feature. Define problem, scope, RACI, eval criteria, context strategy, and HITL level. Push to: `/projects/sprint-0-kickoff-[feature].md`

**Key takeaways:**
- Evals before code — always
- Prototype in 60 minutes or simplify
- n8n + Claude + Langfuse + Promptfoo = your default stack
- AI workflows map to Agile: DoD = Passes Golden Dataset

---

### Lesson 6.2 — Multi-Layer Eval Systems & Golden Datasets

*Type:* `technical`

**6 eval layers** (from cheapest to most expensive):

**Layer 1 — Deterministic**: Schema valid? Length OK? Format correct? Run on EVERY request.

**Layer 2 — Golden Dataset**: 50–200 curated cases. Normal (60%), edge (25%), adversarial (15%). Weighted by real-world frequency. Domain expert reviewed. Version-controlled.

**Layer 3 — LLM-as-Judge**: Stronger model scores on rubric dimensions (accuracy, completeness, tone, safety). Prompt: "Score 1–5 on [dimension] using this rubric. Return JSON: {score, reasoning, pass_fail}."

**Layer 4 — Human Calibration**: Compare LLM-judge to human expert scores. If >10% divergence, recalibrate judge. Weekly → monthly.

**Layer 5 — Online Metrics**: User correction rate, re-generation rate, abandonment rate, escalation rate, task completion rate.

**Layer 6 — Regression Suite**: Every production bug → new test case. Prevents quality decay.

**Red Teaming**: Prompt injection, indirect injection (malicious retrieved docs), PII extraction, business rule violations, hallucination triggers (questions about non-existent data).

**Eval tooling — Promptfoo**: Compare prompts × models × test cases. CI integration — block deploys if scores drop. Run each test N times (AI is non-deterministic). Set threshold: "pass if ≥90% of runs pass."

**Eval cadence**: Pre-launch: 100% golden. Post-change: 100% regression. Weekly: 10% production sample. Monthly: human calibration. Quarterly: full red-team.

**Quiz.** Your LLM-as-judge average scores have been slowly increasing over 3 months without any product changes. What's happening?
> Judge calibration drift. The LLM judge is becoming less discerning over time. Solution: run human calibration — compare 10 judge scores to expert human scores. If >10% divergence, recalibrate the judge prompt.

**Apply.** **Build eval suite**: 50 test cases (30 normal, 12 edge, 8 adversarial). Implement Layer 1 deterministic checks. Run LLM-as-judge. Compare 10 judge scores to your own. Set up Promptfoo with 3 prompt variants + 10 assertions. Push to: `/evals/`

**Key takeaways:**
- 6 layers: deterministic → golden → judge → human → online → regression
- Every production bug → regression test case
- Promptfoo for systematic eval + CI integration

---

### Lesson 6.3 — 5-Level Validation Pyramid

*Type:* `framework`

A production AI feature needs layered validation, not one score.

**Validation pyramid**:
1. Contract checks (schema, policy, safety)
2. Golden dataset checks (core scenarios)
3. Adversarial checks (red-team and abuse paths)
4. Workflow checks (integration + end-to-end)
5. Human calibration checks (decision confidence)

Each level has independent pass thresholds. Failure at any level blocks promotion.

Implementation agents should not have access to holdout sets. Keep holdout ownership with evaluation or QA owners.

**Quiz.** Why is a single eval pass rate not enough for release readiness?
> Because it hides category-specific failure; contract, adversarial, and workflow checks can fail even when aggregate score looks acceptable.

**Apply.** Define one pass/fail threshold for each validation level and map owner + cadence. Push to: `/docs/deploy/validation-pyramid.md`

**Key takeaways:**
- Layered validation catches hidden regressions
- Any failed layer blocks promotion
- Holdout ownership must stay independent

---

### Lesson 6.4 — Golden Dataset Operations

*Type:* `technical`

Golden datasets are living production controls.

**Composition baseline**:
- Normal scenarios
- Edge scenarios
- Adversarial scenarios
- Segment coverage (language, workflow, device where relevant)

**Operational rules**:
- Version each dataset update
- Link each severe production incident to new test rows
- Keep a signed holdout split
- Recalibrate judge prompts on a fixed cadence

Quality trend matters more than one-time score. Watch drift and category regressions over time.

**Quiz.** What is the fastest way to make a golden dataset stale?
> Treating it as a one-time artifact and not adding new cases from real failures and product changes.

**Apply.** Draft a maintenance playbook with intake rules, review cadence, and holdout governance. Push to: `/docs/deploy/golden-dataset-ops.md`

**Key takeaways:**
- Datasets are operational assets
- Incidents must feed new test rows
- Holdout sets should remain isolated

---

### Lesson 6.5 — Sprint 0 for AI-Native Teams

*Type:* `framework`

Sprint 0 is where AI delivery quality is won or lost.

**Sprint 0 outcomes**:
- Problem boundary and non-goals
- RACI and decision rights
- Eval threshold definitions
- Risk register seed
- Tooling + observability baseline
- Rollout and kill-switch assumptions

No coding should start before these decisions are explicit and documented.

Sprint 0 ends when the team can answer:
1. What counts as success?
2. What blocks release?
3. Who can stop launch?
4. What evidence proves readiness?

**Quiz.** What is the minimum definition of a complete Sprint 0?
> A completed decision package for scope, ownership, eval thresholds, risk baseline, and launch gates before implementation starts.

**Apply.** Run a Sprint 0 dry run for one feature and publish outcomes using the team template. Push to: `/docs/templates/sprint-0-kickoff.md`

**Key takeaways:**
- Sprint 0 defines launch quality before build
- Decision rights must be explicit
- Evidence gates must exist before coding

---

### Lesson 6.6 — Eval Debt and Post-Launch Maintenance

*Type:* `systems`
*Last verified:* 2026-04-17

Eval quality decays unless you run maintenance as an operating system.

**Eval debt patterns**:
- Dataset rot: golden cases no longer represent real traffic.
- Drift blindness: model/prompt changes ship without comparative checks.
- Judge flakiness: LLM-as-judge scores vary without calibration tracking.
- Coverage gaps: incident categories never make it into regression suites.

**Maintenance loop**:
1. Two-week post-launch audit: compare launch assumptions vs live behavior.
2. Monthly variance review: rerun critical evals N times and track spread.
3. Quarterly debt audit: coverage gaps, stale rows, and holdout leakage checks.
4. Incident ingestion: every severe production issue adds a regression case.

Minimum operating controls:
- versioned eval suite change log
- named audit owner
- escalation threshold when quality trend degrades
- remediation SLA for critical eval debt

**Quiz.** What is the most dangerous eval debt signal after launch?
> A stable aggregate score with widening category variance, because hidden regressions can ship while the headline metric looks fine.

**Apply.** Run an eval-debt audit for one AI feature: include drift checks, judge variance, stale-case review, and remediation owners. Push to: `/docs/templates/eval-debt-audit.md`

**Key takeaways:**
- Eval debt accumulates silently without cadence
- Post-launch audit is mandatory, not optional
- Variance trends matter as much as aggregate score

---

### Lesson 6.7 — AI Product Analytics and Instrumentation

*Type:* `systems`
*Last verified:* 2026-04-17

Offline evals prove model quality; product analytics proves user value.

**AI product metrics that matter**:
- session success (non-deterministic completion definitions)
- containment rate
- regret rate
- edit distance / correction burden
- escalation avoidance

**Validation patterns**:
- shadow mode (hidden outputs, traffic replay)
- interleaved eval (A/B within comparable traffic windows)
- canary and production gating with failure isolation

**Survivor-bias traps**:
- relying only on thumbs-up users
- overfitting to frequent users
- ignoring silent abandonment and escalations

Every feature should ship with an event schema that links model behavior to user outcomes.

**Quiz.** Why is thumbs-up rate alone a weak AI product metric?
> It captures only a biased subset of users and misses silent failure signals like abandonment, escalations, and heavy edits.

**Apply.** Define a session-success specification and event taxonomy for one AI feature, then design a shadow-mode rollout and bias-aware sampling policy. Push to: `/docs/templates/session-success-spec.md` and `/docs/templates/ai-event-schema.md`

**Key takeaways:**
- Offline evals and product metrics serve different decisions
- Shadow mode reduces user-visible risk
- Bias-aware instrumentation is required for trustworthy conclusions

---

## MODULE 7 — Production, Security & Governance

*WEEK 7 · Tag: Production*

### Lesson 7.1 — Guardrails, Observability & SLOs

*Type:* `technical`

**4 guardrail types**:
1. **Input**: Injection detect, PII redact, off-topic filter, rate limit, language detect
2. **Output**: Grounding check, schema validate, toxicity filter, PII scan, confidence threshold
3. **Tool**: Write approval, amount limits, rate limits, scope limits, audit logging
4. **Human Approval**: Pre-execute (high risk), batch (medium), post-review (low)

**Fallback chain**: Model → output guardrails → confidence gate → retry with constrained prompt → cached response → human with pre-filled context → self-service path

**Observability**: Langfuse (traces), GCP Monitoring (metrics), alerts (budget, latency, errors). For n8n: add HTTP Request nodes to send trace data to Langfuse API after LLM calls.

**SLOs** (define before launch): Availability 99.5%, Latency p95 < 3s, Eval pass rate ≥ 85%, Cost per interaction < $X.

**Cost control**: Hard daily budget caps, token budget per conversation, prompt caching, model downgrading for simple queries, response length limits.

**Security**: Prompt injection detection, indirect injection (malicious RAG docs), PII handling (scan inputs AND outputs, redact before LLM, define retention policy), vendor zero-retention options.

**Rollout**: Canary (5% → 25% → 50% → 100%), feature flags, shadow mode, gradual autonomy (L1 → L2 → L3).

**Incident review**: Capture exact input + context + output + tool calls → Diagnose (context failure? model failure? guardrail gap?) → Fix (add to golden dataset, patch guardrail) → Verify (regression test) → Review monthly.

**AI QUALITY MANAGEMENT CYCLE (PDCA)**
For AI products, launch is just Day 0. Use the Plan-Do-Check-Act quality loop:
- *Plan*: Define new use case evals.
- *Do*: Deploy updated prompt/RAG.
- *Check*: Monitor Langfuse traces and user correction rates.
- *Act*: Add failures to the golden dataset and adjust guardrails.

**SCOPE INTEGRITY IN PRODUCTION**
LLMs are infinitely capable, which means users will try to make them do things you didn't design for (Scope Creep).
- *Control*: Use explicit negative guardrails ("Do NOT answer questions about X").
- *Monitor*: Cluster out-of-scope queries to identify new product opportunities.
- *Mitigate*: Fail gracefully with a rigid fallback ("I am only trained to assist with Y").

**Quiz.** Your AI agent accidentally included a customer's email address in a response to a different customer. Which guardrail types failed?
> Output guardrails (PII scan on outputs) and possibly input guardrails (PII redaction before sending context to LLM). Both layers should independently prevent PII leakage.

**Apply.** **Guardrail spec + observability setup**: Define all 4 guardrail types for your feature. Deploy Langfuse (cloud free tier). Instrument one n8n LLM call. Define SLOs. Set budget alerts. Push to: `/docs/deploy/`

---
**APPLY B — AI Production Risk Register**
Draft a 5-item risk register for your feature including both hallucination and operational failure modes. Push to: `/docs/deploy/ai-risk-register.md`

**Key takeaways:**
- 4 guardrails: input + output + tool + human approval
- SLOs defined BEFORE launch, not after
- Every incident → golden dataset + guardrail patch
- Scope control requires active negative guardrails

---

### Lesson 7.2 — AGENTS.md and Repo Policy

*Type:* `ops`

AGENTS.md is a runtime governance contract.

Minimum policy areas:
- allowed tools and write boundaries
- forbidden actions
- testing and validation requirements
- escalation conditions
- emergency stop protocol reference

Treat policy drift as a production risk. If repo policy and real workflow diverge, quality and safety controls become theater.

**Pattern recognition matters more than templates**:
- Study three annotated AGENTS.md examples: startup, YC-scale, and enterprise-guardrailed
- Compare risk posture, autonomy controls, kill-switch detail, and merge-cap policy
- Identify what each section is defending against before writing your own policy

**Quiz.** What is the most important property of AGENTS.md in production teams?
> It must be executable governance, not documentation; rules must match actual tooling and enforcement paths.

**Apply.** **Pattern-spot exercise**:
1. Review the anthology: `/docs/examples/agents-md/README.md`
2. Compare startup vs YC vs enterprise examples and list the top 5 governance differences.
3. Review the weak AGENTS sample in the anthology index and identify 5 critical gaps.
4. Propose two hardening updates for your own repo policy.

Push to: `/docs/deploy/agents-governance-audit.md`

**Key takeaways:**
- Policy must be executable
- Governance drift is a release risk
- Tool and boundary rules must be explicit

---

### Lesson 7.3 — Hallucination and Drift Monitoring

*Type:* `ops`

Drift is inevitable in AI systems. Monitoring must be proactive.

Track at least:
- hallucination rate by scenario
- correction rate by segment
- output contract failure rate
- latency and cost drift
- plan-vs-output divergence in traces

Define alert routes and owners before incident load appears.

Weekly operations review should include one drift narrative: what moved, why it moved, and what changed in controls.

**Quiz.** Why do teams miss drift until users complain?
> Because they monitor aggregate usage and uptime but not quality signals by scenario and segment.

**Apply.** Design a weekly drift report template with thresholds and escalation owners. Push to: `/docs/deploy/drift-monitoring-weekly.md`

**Key takeaways:**
- Drift is normal and must be managed
- Segment-level signals matter
- Alerts need clear owners

---

### Lesson 7.4 — Kill-Switch Design by Repository

*Type:* `ops`

Kill switches are recovery infrastructure, not panic buttons.

Trigger classes:
- quality threshold breach
- safety policy breach
- cost runaway
- abnormal failure-rate spikes
- manual executive override

A valid kill-switch design includes:
- trigger condition
- action level (throttle, pause, full stop)
- state capture behavior
- rollback path
- communication protocol

Test kill switches in drills. Unrehearsed kill switches fail when needed most.

**Quiz.** What makes a kill switch unreliable in real incidents?
> No drill history, unclear ownership, and undefined rollback behavior after trigger activation.

**Apply.** Create a kill-switch runbook with trigger matrix and drill cadence. Push to: `/docs/deploy/kill-switch-runbook.md`

**Key takeaways:**
- Kill switches require drills
- Triggers must map to action levels
- Rollback behavior must be predefined

---

### Lesson 7.5 — AI-Merge Cap Governance

*Type:* `ops`

Merge caps control adoption risk while teams build verification maturity.

Recommended pattern:
- start with strict cap
- measure defects and review throughput
- raise cap only when objective quality gates are stable
- tighten cap again if incident signals rise

Caps are not anti-AI; they are pacing controls for safe scale.

Track:
- AI-authored change ratio
- defect escape trend
- review latency
- rollback frequency

**Quiz.** When should an AI-merge cap be increased?
> Only after stable evidence shows quality and review systems can absorb more AI-authored changes without higher escape risk.

**Apply.** Draft a cap policy with raise/lower triggers and exemption rules. Push to: `/docs/deploy/ai-merge-cap-policy.md`

**Key takeaways:**
- Caps pace risk, not creativity
- Cap changes need evidence
- Rollback trends must inform cap policy

---

### Lesson 7.6 — Audit-Trail PR Review

*Type:* `practice`

Diff-only review misses AI-specific failure modes.

Review stack:
1. Intent plan (what was supposed to happen)
2. Execution log (what the agent actually did)
3. PR diff (what changed)
4. Evidence artifacts (eval, traces, policy checks)

Required reviewer questions:
- Does the diff match stated intent?
- Did execution shortcuts bypass safeguards?
- Are evidence links sufficient for release confidence?

This review style improves defect catch rate for generated code and config.

**Quiz.** Why is intent-plan review useful before reading a PR diff?
> It reveals whether implementation drifted from expected scope and helps detect hidden behavior changes early.

**Apply.** Use the audit-trail rubric on one AI-generated PR and log findings by severity. Push to: `/docs/deploy/ai-pr-audit-review.md`

**Key takeaways:**
- Diff-only is insufficient for AI-generated changes
- Intent and logs must be reviewed with code
- Evidence links are release-critical

---

### Lesson 7.7 — AI Risk Register Operations

*Type:* `framework`

Risk registers should operate like live control boards, not static docs.

Each risk entry needs:
- scenario
- likelihood
- impact
- owner
- mitigation
- trigger
- escalation path
- review cadence

Minimum recurring cadence:
- weekly top-risk review
- monthly full-register review
- immediate post-incident row updates

If risk ownership is unclear, incidents become coordination failures.

**Quiz.** What is the most common operational failure in AI risk registers?
> Entries exist but ownership and escalation triggers are missing, so nothing happens when risk materializes.

**Apply.** Refresh your risk register with owner, trigger, and cadence fields for each top risk. Push to: `/docs/templates/ai-risk-register.md`

**Key takeaways:**
- Registers need owners and triggers
- Risk review must be scheduled
- Post-incident updates are mandatory

---

### Lesson 7.8 — Prompt and Context Versioning as Code

*Type:* `ops`
*Last verified:* 2026-04-17

Prompts are production artifacts and need the same discipline as code.

**Prompt change minimum**:
- version bump (no silent in-place edits)
- semantic diff (what changed + expected behavior delta)
- eval delta before merge
- rollback window and owner

**Suggested structure**:
`/prompts/v1`, `/prompts/v2`, `/prompts/latest`, and `/prompts/CHANGELOG.md`

Prompt governance failure mode: untracked edits that regress quality without traceability.

**Quiz.** What makes a prompt PR production-safe?
> Semantic diff, eval delta, blast-radius note, and rollback plan tied to a versioned prompt change.

**Apply.** Create a prompt-change review for one production prompt using the standard template, including eval delta and rollback plan. Push to: `/docs/templates/prompt-change-review.md`

**Key takeaways:**
- Prompt edits require versioning
- Eval-before-merge is mandatory
- Rollback planning is part of prompt governance

---

### Lesson 7.9 — AI FinOps: Cost Attribution and Runaway-Agent Defense

*Type:* `systems`
*Last verified:* 2026-04-17

Design-time token math is not enough; production AI requires FinOps operations.

**Required attribution dimensions per call**:
- user
- feature
- tenant
- model/tier

**Runaway-agent failure modes**:
- unbounded retry loops
- recursive tool amplification
- degraded-model fallback storms

**Control layers**:
- per-request cap
- per-session budget cap
- per-tenant budget cap
- emergency kill switch with state capture

**Quiz.** What is the fastest way to lose AI margin in production?
> Missing attribution and budget caps, which lets runaway sessions consume cost without clear ownership or fast shutdown.

**Apply.** Draft a FinOps playbook with attribution schema, alert thresholds, and runaway-agent incident runbook. Push to: `/docs/templates/ai-finops-playbook.md`

**Key takeaways:**
- Attribution is required for margin control
- Budget caps must exist at multiple scopes
- Runaway-agent drills should be rehearsed

---

### Lesson 7.10 — Multi-Tenant Safety for AI Systems

*Type:* `systems`
*Last verified:* 2026-04-17

B2B AI systems must prove tenant isolation, not assume it.

**Isolation patterns**:
- per-tenant namespace/index in retrieval
- metadata-filtered query scoping
- per-tenant memory partitions with TTL and collision checks

**Leakage tests**:
- cross-tenant prompt probes
- retrieval contamination checks
- memory bleed simulation across sessions

Aggregate pass rates can hide tenant-specific safety failures. Audit per tenant shard.

**Quiz.** Why is one shared vector index risky in multi-tenant AI products?
> Without strict tenant scoping, retrieval can leak data across customers and create severe trust and compliance failures.

**Apply.** Design a multi-tenant safety audit for your AI feature with leakage tests and tenant-scoped eval shards. Push to: `/docs/templates/multi-tenant-safety-audit.md`

**Key takeaways:**
- Tenant isolation is a product trust requirement
- Leakage tests must be explicit and repeatable
- Per-tenant eval coverage is mandatory

---

## MODULE 8 — Agents, Voice & Multimodal

*WEEK 8 · Tag: Advanced*

### Lesson 8.1 — Agent Architecture: Sense → Plan → Act

*Type:* `technical`

**SENSE**: What the agent perceives — text, API responses, images, audio, tool outputs, session state.

**PLAN**: How it decides — ReAct (reason → act → observe → reason), Planning-first (full plan before executing), Reactive (respond immediately), Reflection (self-review before returning).

**ACT**: What it does — API calls, code execution, web browsing, file operations, human escalation.

**Multi-Agent Orchestration** (Orchestra pattern):
User Goal → Conductor (meta-reasoning) → specialized sub-agents (Research, Analysis, Execution, Review) → aggregated result.

**Why orchestration beats monolithic**: Prevents context overload, enables dynamic compute per sub-task, enables persistent memory across agents, easier debugging.

**Task Looping** (most common failure): Agent stuck in retry loop. Fix: track attempted actions in state, max 3 retries per tool, explicit termination conditions ("if 3 attempts fail, escalate"), "no progress" detector ("if 5 steps with no advancement, stop and summarize").

**Memory tiers**: Session (current conversation), Persistent (cross-session user state), Working (intermediate results from current task). Offload when context > 80%: summarize older items into compressed state.

**Case study — Cursor's AI Code Editor**:
Cursor uses multi-agent orchestration: a routing agent classifies intent (code gen vs. explanation vs. debugging), specialized agents handle each type, and a review agent checks output before presenting. They use prompt caching aggressively (system prompt + repo context cached). Their moat: the data flywheel from millions of code interactions training their suggestion quality.

**Quiz.** Your agent keeps retrying the same failed API call in a loop. What 3 things fix this?
> 1) Track attempted actions in agent state (memory of what was tried). 2) Set max retries per tool (3 max). 3) Define explicit termination: 'if 3 attempts fail, summarize state and escalate to human.'

**Apply.** **Design agent architecture**: Sense layer (inputs per agent), Plan layer (reasoning strategy), Act layer (tools per agent), Orchestration (routing), Termination conditions, Memory tiers. Push to: `/projects/agent-architecture.md`

**Key takeaways:**
- Sense → Plan → Act
- Orchestra pattern: conductor + specialized sub-agents
- Task looping fix: state tracking + retry limits + termination

---

### Lesson 8.2 — Voice Agents, Multimodal & Computer-Use

*Type:* `technical`

**Voice agents** — the frontier for MENA markets:
Pipeline: Audio → ASR (speech-to-text) → Intent classification → LLM reasoning → TTS (text-to-speech) → Audio output.

PM decisions: Latency < 1s (voice users expect near-instant), Egyptian dialect ASR (not MSA — accuracy varies hugely), interruption handling, silence detection, emotional tone detection → route frustrated users to humans faster.

**Multimodal capabilities**:
- **Vision**: Product defect photos → auto-ticket, document OCR, UI screenshot analysis
- **Audio**: Call center QA scoring, meeting → action item extraction
- **Computer-use agents** (2026 emerging): AI interacts with software UIs directly. Slow, expensive, error-prone. Use APIs when available. Computer-use = last resort for tools without APIs.

**When to go multimodal**: Users naturally want to send photos/voice → build for it. Task involves visual/audio analysis → multimodal is core. Adding because "cool" → Zone 4 (hype).

**Case study — Google's Multimodal Search**:
Google Lens processes 20B+ visual searches. PM lesson: they didn't launch as "search by photo." They launched as "identify this plant" and "translate this sign" — specific, high-confidence use cases. Multimodal features must start with the use case that has the highest confidence AND most obvious user intent.

**Quiz.** You're building a voice agent for Arabic-speaking customers. What's the most critical technical decision?
> Egyptian Arabic dialect ASR model selection. MSA-only models have significantly lower accuracy on Egyptian colloquial Arabic, which is what your actual users speak. This single decision determines whether the entire voice pipeline works or fails.

**Apply.** **Multimodal assessment**: Which capabilities add real value? Score each: value (1–10), feasibility (1–10), priority. Push to: `/docs/discovery/multimodal-assessment.md`

**Key takeaways:**
- Voice latency < 1s for acceptance
- Egyptian Arabic ASR ≠ MSA models
- Computer-use: last resort when no API exists

---

### Lesson 8.3 — On-Device & Edge AI: The PM Decision Framework

*Type:* `technical`
*Last verified:* 2026-Q2

**On-device AI is a real product surface in 2026 — not a future roadmap item.**

Apple Intelligence is embedded in every iPhone 16+ and Mac. Samsung Galaxy AI is on all Galaxy S24+ devices. Android runs Gemini Nano on supported Pixel and Galaxy devices. These are live product surfaces with real capability constraints that every PM building for consumer hardware or mobile must understand.

**On-Device vs. Cloud: The Decision Table**

| Dimension | On-Device | Cloud |
|---|---|---|
| Privacy | Data never leaves the device | Data traverses network; subject to retention policy |
| Latency | No network round-trip (50–200ms) | Network + inference (500ms–5s depending on model tier) |
| Cost | Zero per-call inference cost | API pricing at volume |
| Capability | Limited (1–7B parameter models) | Full frontier capability (hundreds of B parameters) |
| Connectivity | Works fully offline | Requires internet connection |
| Updates | Tied to OS/firmware release cycle | Update model without user action |

**The Capability Gap — What On-Device Models Can and Cannot Do**

On-device models (1–7B parameters) excel at:
- Text summarization (document → bullet points)
- Simple classification and routing (intent detection)
- Basic text rewriting and grammar correction
- Image description and OCR-adjacent tasks
- Short-context Q&A with provided context

On-device models struggle with:
- Multi-step reasoning across long documents
- Complex code generation or review
- Tasks requiring knowledge outside the training data
- Long-form synthesis across multiple sources

**The hybrid architecture**: Use on-device for latency-critical, privacy-sensitive, or offline-required tasks. Fall back to cloud for complex tasks where on-device quality is insufficient. The user should not notice the handoff.

**The OS Update Problem**
On-device models are embedded in the device firmware. When you need to update the model (new capability, quality fix, safety patch), you must ship an OS update — which means:
- iOS: Apple controls the release schedule and approval
- Android: OEM + carrier fragmentation means 6–18 months for updates to reach all users
- Enterprise devices: often on locked firmware versions

PM implication: on-device model quality is static between OS updates. You cannot A/B test, iterate, or patch the model independently of the OS release cycle. Design features accordingly — on-device handles stable, well-scoped tasks; cloud handles anything that needs rapid iteration.

**When to Choose On-Device**
- Feature handles sensitive personal data that users would not want to leave their device (health, messages, photos, location history)
- Feature requires sub-200ms response (live transcription, keyboard autocomplete, real-time object recognition)
- Feature must work offline (travel apps, remote work tools, areas with poor connectivity)
- API cost at projected scale is prohibitive and on-device quality is sufficient for the task

**When to Stay on Cloud**
- Task complexity exceeds on-device model capability (complex reasoning, multi-document synthesis)
- Feature requires up-to-date knowledge (real-time information, current events, live data)
- Quality must be consistent across all device generations (older devices have weaker on-device models)
- Feature needs rapid iteration (you cannot wait for an OS release cycle to fix a model bug)

**Quiz.** A PM wants to build a feature that summarizes private health data from a user's wearable. The summary should work offline. What architecture is appropriate?
> On-device AI. The data is sensitive (health data users don't want leaving the device), offline capability is required, and summarization is within the capability envelope of 1–7B on-device models. Cloud fallback is not appropriate here — the privacy requirement eliminates it.

**Apply.** **On-device viability assessment**: List 3 features from your product. For each, score: privacy sensitivity (1–5), latency requirement (1–5 where 5 = offline-required), task complexity (1–5 where 5 = frontier model required). Features with privacy+latency ≥ 8 and complexity ≤ 3 are on-device candidates. Push to: `/docs/discover/on-device-assessment.md`

**Key takeaways:**
- On-device: privacy + offline + zero cost, but 1–7B capability ceiling
- OS update cycle = no independent model iteration (plan for stability)
- Hybrid: on-device for sensitive/offline tasks, cloud fallback for complex reasoning

- *Sources:* Apple Intelligence Technical Overview 2024; Google Gemini Nano on-device Documentation 2026; Samsung Galaxy AI Product Spec 2025
- *Failure modes:* Building on-device features that exceed model capability; Assuming on-device models can be updated independently of OS; Skipping hybrid fallback design

---

## MODULE 8.5 — AI-Native Mobile Delivery Systems

*WEEK 8.5 · Tag: Specialization*

### Lesson 8.5.1 — Design Tokens as Agent Context

*Type:* `technical`

Design tokens are the shortest path from brand consistency to reliable generated UI.

For agent workflows, token context should include:
- semantic color roles
- typography scales and usage rules
- spacing and layout primitives
- interaction states
- platform constraints

Token bundles should be machine-readable and versioned. Screenshots alone are not enough context for consistent generation.

**Quiz.** Why are screenshots insufficient as the only UI context for coding agents?
> They show appearance but not reusable semantic rules; tokens encode the design system constraints agents can execute consistently.

**Apply.** Export your current token set and map each token category to one generation rule. Push to: `/docs/design/mobile-token-context.md`

**Key takeaways:**
- Tokens provide executable design constraints
- Semantic roles matter more than raw values
- Versioned token context improves UI consistency

---

### Lesson 8.5.2 — UI Consistency via Token Injection

*Type:* `practice`

Token injection means including a compact design-system contract in prompt context before code generation.

Injection checklist:
- include only active tokens for the surface
- include component-level usage rules
- include prohibited styles
- include accessibility constraints

Validation should compare output against token expectations, not visual preference alone.

**Quiz.** What is the biggest benefit of token injection in UI generation?
> It turns design consistency into a pre-generation constraint instead of post-generation cleanup.

**Apply.** Run one side-by-side generation with and without token injection and log consistency deltas. Push to: `/docs/design/token-injection-audit.md`

**Key takeaways:**
- Inject rules before generation
- Keep token context scoped
- Validate against rules, not taste

---

### Lesson 8.5.3 — Flutter Agent Orchestration

*Type:* `technical`

Flutter delivery benefits from explicit orchestration boundaries.

Suggested split:
- planner agent (task decomposition)
- UI agent (widget and layout work)
- integration agent (state and data contracts)
- reviewer agent (quality and regression checks)

Use narrow prompts per agent and pass structured handoff state between stages.

**Quiz.** Why is one monolithic prompt risky for complex Flutter tasks?
> It overloads context and mixes responsibilities, increasing inconsistency and rework.

**Apply.** Define a 4-agent Flutter orchestration map with handoff artifacts. Push to: `/docs/develop/flutter-agent-orchestration.md`

**Key takeaways:**
- Specialized agents reduce context overload
- Structured handoffs improve reliability
- Review stage should be explicit

---

### Lesson 8.5.4 — Context Engineering for Flutter

*Type:* `technical`

Flutter context packs should be layered and size-controlled.

Recommended assembly order:
1. task contract
2. design token subset
3. target file interfaces
4. state/data constraints
5. acceptance tests

Avoid dumping entire repos into context. Precision beats volume for generated mobile code quality.

**Quiz.** What usually causes low-quality generated Flutter code in large projects?
> Unscoped context overload that hides the task contract and critical constraints.

**Apply.** Build a context-pack template for one Flutter feature with explicit token budget allocation. Push to: `/docs/develop/flutter-context-pack.md`

**Key takeaways:**
- Context order impacts output quality
- Precision beats volume
- Acceptance tests should be in-context

---

### Lesson 8.5.5 — Multi-Agent Mobile Delivery

*Type:* `systems`

Conductor-plus-specialist patterns help mobile teams parallelize safely.

Core design points:
- clear agent ownership boundaries
- serialized state handoff
- explicit termination conditions
- escalation when no-progress loops appear

Measure outcome by quality and cycle time, not agent count.

**Quiz.** What makes multi-agent orchestration fail most often?
> Unclear ownership and missing termination/escalation rules.

**Apply.** Design a conductor-specialist workflow for one mobile feature and define failure escalation steps. Push to: `/docs/develop/mobile-multi-agent-workflow.md`

**Key takeaways:**
- Boundaries and handoffs are critical
- Termination rules prevent loops
- Velocity must be paired with quality evidence

---

### Lesson 8.5.6 — BLE/IoT HITL Mapping for Mobile

*Type:* `framework`

For hardware-adjacent features, autonomy must map to risk.

Map each task to a HITL level:
- low-risk read actions
- medium-risk configuration actions
- high-risk firmware or irreversible actions

For high-risk paths require:
- preflight checks
- explicit human approval
- staged rollout
- rollback validation

**Quiz.** Why should BLE/IoT actions use stricter HITL mapping than standard UI tasks?
> Because failures can affect physical devices, user safety, and irreversible hardware states.

**Apply.** Create a BLE/IoT HITL matrix with task type, level, approver, and rollback path. Push to: `/docs/templates/mobile-hitl-map.md`

**Key takeaways:**
- Map autonomy to physical risk
- High-risk actions require approvals
- Rollback readiness is mandatory

---

## MODULE 9 — GTM, Ethics & AI Leadership

*WEEK 9 · Tag: Strategy*

### Lesson 9.1 — Go-to-Market Strategy for AI Features

*Type:* `framework`

**Launching AI features is fundamentally different from launching traditional features.**

**Why AI GTM is different**:
- Non-deterministic outputs mean you can't guarantee the same experience for every user
- Trust must be built before distribution is expanded
- Usage-based costs mean scaling success = scaling costs
- AI features need education — users don't know what's possible or how to get value

**The AI Launch Playbook**:

**Phase 1 — Internal dogfooding** (Week -4 to -2): Your team uses it daily. Capture every failure. Build golden dataset from real usage. Fix the worst 20% of failures.

**Phase 2 — Closed beta** (Week -2 to 0): 10–20 power users. High-touch onboarding. Weekly feedback sessions. Track: time-to-first-value, correction rate, abandonment.

**Phase 3 — Guided rollout** (Week 0 to 4): 10% of users with feature flag. In-product education (tooltips, examples, "try it on this"). Track all launch metrics.

**Phase 4 — General availability** (Week 4+): Full rollout if metrics hold. Ongoing monitoring via observability stack.

**AI-specific launch metrics**:
- Time-to-first-value (how fast does user get first useful output?)
- Activation rate (% of exposed users who use it at least once)
- Repeated use rate (% who use it a second time within 7 days — THE signal for product-market fit)
- Correction rate (leading quality indicator)
- Net promoter score for AI feature specifically

**AI feature positioning** — how to talk about it:
- Lead with the user outcome, not the technology: "Draft emails 5x faster" not "GPT-4 powered email"
- Set expectations for non-determinism: "Drafts that you can review and edit"
- Make the first experience high-confidence: pick the use case where AI is most reliable
- Make the escape hatch visible: "Not what you wanted? [Edit] [Try again] [Do it manually]"

**Communicating AI to executives**:
- Frame as business outcomes, not technology: "Reduces support cost by 40%" not "Uses RAG with Claude"
- Show ROI tree with specific numbers
- Address risk proactively: "Here's our guardrail plan for hallucination"
- Show the eval results: "85% pass rate on our golden dataset of 200 real cases"
- Present the adoption phases: "We'll start with human review and earn autonomy"

**OKR FRAMEWORK FOR AI FEATURES**
AI success requires qualitative objectives bound by balancing key results:
- *Objective*: What user problem are we solving radically better?
- *KR (Adoption)*: E.g., Increase repeated use rate from X% to Y%.
- *KR (Efficiency)*: E.g., Reduce human correction rate from X% to Y%.
- *KR (Quality)*: E.g., Maintain eval pass rate ≥ 95%.
*Common Mistake*: Setting OKRs based on model accuracy instead of user outcomes.

**DATA-INFORMED AI PM DECISIONS**
Combine quantitative metrics with qualitative insights.
- Track behavioral cohorts: Do users who edit the AI output once return the next day?
- Instrument invisible drop-offs: Where does the user wait for generation but abandon before reading?
- Close the loop: Every thumbs-down rating must capture the full prompt and output for the golden dataset.

**Quiz.** Your AI feature has a 60% activation rate but only 15% repeated use rate. What does this tell you?
> Users are curious enough to try it (high activation) but the first experience didn't deliver enough value to return (low repeat). The problem is likely: output quality not meeting expectations, first use case not compelling enough, or too much friction to get value. Focus on time-to-first-value and first-session output quality.

**Apply.** **Write an AI launch plan** for your feature:
1. Dogfooding plan (who, how long, what to track)
2. Beta criteria (which users, what feedback mechanism)
3. Rollout gates (what metrics must pass for each phase expansion)
4. Positioning (user-facing copy for the feature)
5. Exec communication (1-slide pitch with ROI + risk + plan)

Push to: `/docs/gtm/ai-launch-plan.md`

---
**APPLY B — AI Feature OKRs**
Draft an Objective and 3 balancing Key Results (Adoption, Efficiency, Quality) for your feature. Push to: `/docs/gtm/ai-feature-okrs.md`

**Key takeaways:**
- Dogfood → Beta → Guided rollout → GA
- Repeated use rate = THE signal for AI product-market fit
- Lead with outcome, not technology. Show evals to execs.

---

### Lesson 9.2 — AI Ethics, Bias & Responsible AI

*Type:* `framework`
*Last verified:* 2026-Q2

**Ethics isn't a checkbox. It's a product design constraint that affects every decision.**

**Where bias enters AI products**:
- **Training data bias**: Model learned from biased internet data. Arabic content is underrepresented → worse performance on Arabic tasks.
- **Selection bias**: Your golden dataset may not represent all user segments.
- **Deployment bias**: Feature works great for your HQ users but fails for edge-market users.
- **Feedback loop bias**: If only satisfied users give feedback, you optimize for them and ignore struggling users.

**Responsible AI checklist for PMs** (not a legal doc — a product design constraint):
1. **Transparency**: Users know they're interacting with AI (don't pretend it's human)
2. **Explainability**: AI decisions can be understood ("Based on your last 3 orders...")
3. **Fairness**: Test performance across user segments (language, geography, device)
4. **Privacy**: PII handling is explicit and auditable
5. **Accountability**: Clear ownership of AI decisions (who reviews? who fixes?)
6. **Harm avoidance**: What's the worst case if the AI is wrong? Design for it.

**Fairness testing** — practical steps:
- Segment your golden dataset by user type (language, region, plan tier)
- Run evals per segment — is pass rate consistent across segments?
- If Arabic users get 70% accuracy and English users get 90%, that's a product-quality gap to fix, not a "known limitation"

**Regulatory landscape (2026)**:
- EU AI Act: risk classification for AI systems, transparency requirements, prohibited AI uses
- GDPR implications: right to explanation for automated decisions, data processing consent
- Egypt's AI strategy: developing but less prescriptive — focus on transparency and data sovereignty

**Harm modeling** — before launch, ask:
- What happens if the AI gives confidently wrong medical/legal/financial advice?
- What if the AI reinforces stereotypes in its recommendations?
- What if a user manipulates the AI to generate harmful content?
- What's the maximum damage from one wrong AI output? (lost revenue? health risk? legal liability?)

Design guardrails proportional to the harm potential.

---

**EU AI Act: A PM Classification Guide (In Force 2025–2026)**

The EU AI Act is now the world's first binding AI regulation. General Purpose AI (GPAI) Model rules entered into force in August 2025. High-risk AI system obligations apply from August 2026. If your product is used in the EU — or by EU citizens anywhere — this affects your feature decisions.

**The 4 Risk Tiers**

**Tier 1 — Prohibited (banned outright)**:
AI systems you cannot build or deploy:
- Subliminal manipulation that influences behavior without user awareness
- Exploitation of vulnerabilities (age, disability, economic hardship) to distort behavior
- Real-time biometric surveillance in publicly accessible spaces (with narrow law-enforcement exceptions)
- Social scoring systems by governments
- Emotion recognition in workplaces and educational institutions (with narrow exceptions)

PM checklist: Does your personalization engine change what users see based on inferred emotional state? Does your product use real-time facial recognition in a public-facing context? If yes to either: stop and consult legal.

**Tier 2 — High-Risk (conformity assessment required)**:
These categories require documentation, human oversight, and registration in the EU AI database before deployment:
- AI in hiring and HR decisions (screening, ranking candidates)
- Credit scoring and financial risk assessment
- AI for access to essential services (housing, insurance)
- AI in education for grading or admission decisions
- AI for law enforcement, border control, justice

If your product operates in any of these categories, you must: maintain technical documentation, conduct conformity assessments, enable human oversight and override capability, and register in the EU AI Act database.

**Tier 3 — Limited Risk (transparency obligations)**:
- Chatbots and AI that interacts with users: must disclose that users are interacting with AI (not a human)
- AI-generated images, video, audio: must be labeled as AI-generated (deepfake rules)
- Emotion recognition and biometric categorization: must inform users

PM decision point: Does your product use an AI persona that could be mistaken for a human? Your copy and UX must make AI identity clear.

**Tier 4 — Minimal Risk**:
Most AI features (spam filters, recommendation systems, AI-generated product descriptions) fall here. No specific obligations beyond existing consumer protection law.

**Article 50 — Prohibited Manipulation Practices (relevant for consumer AI)**
These specific practices are prohibited regardless of risk tier:
1. Subliminal techniques that influence behavior outside conscious awareness
2. Targeting vulnerabilities: serving addictive patterns to users identified as having addiction risk
3. AI-generated political messaging that deceives about its origin

Consumer app PMs: personalization that exploits identified psychological vulnerabilities (e.g., sending promotional messages to users your model identifies as having compulsive spending patterns) falls under Article 50. This affects recommendation and engagement systems.

**Article 22 — Automated Decision-Making Rights**
For high-risk automated decisions (credit, hiring, housing): EU individuals have the right to:
- Request human review of any automated decision
- Receive a meaningful explanation of how the decision was made
- Contest the decision

PM implication: if your product makes automated decisions in any of the high-risk categories, you must build a human review pathway into the product — not just into back-office operations.

**Risk Classification Exercise**
Classify each product using the 4-tier framework:
1. AI hiring screener that ranks candidates by resume match → **High-risk** (employment decisions, Tier 2)
2. E-commerce product recommendation engine → **Minimal risk** (Tier 4)
3. AI chatbot for customer support → **Limited risk** (Tier 3 — must disclose AI identity)
4. AI medical symptom checker with diagnosis suggestions → **High-risk** (safety-critical, Tier 2)
5. Real-time emotion detection dashboard for retail stores → **Prohibited** (emotion recognition in public spaces, Tier 1)

**PM Kickoff Checklist — EU AI Act Review Required?**
Answer at feature kickoff. If any answer is "yes," initiate a compliance review:
- [ ] Does this feature make or support decisions in hiring, credit, housing, education, or law enforcement?
- [ ] Does this feature interact with users via an AI persona that could be mistaken for human?
- [ ] Does this feature use real-time biometric or emotion recognition?
- [ ] Does this feature generate synthetic media (images, video, audio) presented as real?
- [ ] Does this feature recommend content or products using identified psychological vulnerability signals?
- [ ] Does this feature affect EU citizens (users located in or from EU member states)?
- [ ] Does this feature use inferred sensitive attributes (health, political opinion, sexual orientation)?
- [ ] Does the feature score, rank, or classify people in a way that affects their access to services?

**Misclassification Consequences**
- Prohibited practice (Tier 1 violation): up to €35M or 7% of global annual turnover (whichever is higher)
- High-risk non-compliance (Tier 2): up to €15M or 3% of global annual turnover
- Incorrect documentation / transparency failure: up to €7.5M or 1.5% of global annual turnover
- **Key risk**: Misclassifying a high-risk system as minimal-risk and skipping the conformity assessment — this is the most common PM-level error

**Quiz.** Your Arabic-language AI feature has 70% accuracy while the English version has 90%. Is this acceptable?
> No. This is a fairness gap, not a 'known limitation.' Arabic users deserve equivalent quality. Investigate: is it tokenization (try AraToken), embedding model (try BGE-M3), chunking (use sentence-aware), or training data underrepresentation? Fix the root cause.

**Apply.** **Responsible AI audit** for your AI feature:
1. Where could bias enter? (data, selection, deployment, feedback loop)
2. Segment your eval by user type — is performance equitable?
3. Harm model: what's the worst case from one wrong output?
4. Run the 6-point checklist (transparency, explainability, fairness, privacy, accountability, harm avoidance)

Push to: `/docs/deploy/responsible-ai-audit.md`

**Key takeaways:**
- Bias enters at data, selection, deployment, and feedback loops
- Segment evals by user type — gaps are bugs, not limitations
- Harm model: design guardrails proportional to max damage

---

### Lesson 9.3 — Go/No-Go with AI Evidence

*Type:* `framework`

Go/no-go decisions should be evidence-gated, not confidence-gated.

**Minimum go packet**:
- eval summary by scenario
- risk register status
- open incident list
- rollout readiness checklist
- ownership and on-call confirmation

**No-go triggers**:
- critical risk unresolved
- regression trend without mitigation
- missing escalation ownership
- insufficient evidence quality

Time-to-decision improves when evidence format is standardized before release week.

**Quiz.** What is the fastest way to reduce release decision ambiguity?
> Use a fixed go/no-go evidence packet with pre-agreed red-line triggers.

**Apply.** Run a mock release review and classify one feature as go or no-go with evidence. Push to: `/docs/templates/go-no-go-evidence.md`

**Key takeaways:**
- Go/no-go requires a fixed evidence packet
- Red-line triggers must be pre-defined
- Ownership clarity reduces launch confusion

---

### Lesson 9.4 — Responsible AI Checklist for Consumer Products

*Type:* `framework`

Consumer-facing AI features need practical trust controls.

Checklist domains:
- transparency and disclosure
- privacy and data minimization
- fairness across user segments
- failure UX and recovery
- escalation and human recourse
- auditability for critical decisions

Treat responsible AI as a release quality lane, not a post-launch policy task.

**Quiz.** Why should responsible AI checks be tied to release gates?
> Because trust failures are product failures; they must block launch just like critical defects.

**Apply.** Apply a responsible AI checklist to one live feature and log gaps with owners and due dates. Push to: `/docs/templates/responsible-ai-audit-template.md`

**Key takeaways:**
- Responsible AI is a release lane
- Checklists need owners and deadlines
- Failure UX is part of responsible design

---

### Lesson 9.5 — AI Product Failure Anthology and Debrief Method

*Type:* `systems`
*Last verified:* 2026-04-17

Pattern recognition improves fastest when teams study real failures.

This lesson uses a structured failure anthology with verified public incidents, mapped to operating frameworks used in this course.

Use each case to answer:
1. What signals were visible before failure?
2. Which launch gate should have blocked the outcome?
3. Which framework lane failed (eval, guardrails, ownership, rollout, or economics)?
4. What counterfactual design decision would likely have reduced harm?

Debrief outcomes should produce:
- one control update
- one metric threshold update
- one artifact update (risk register, eval suite, or kill-criteria register)

Treat failure analysis as operating practice, not postmortem theater.

**Quiz.** What separates a useful failure debrief from a storytelling recap?
> A useful debrief results in concrete control changes, threshold updates, and artifact-level follow-through, not just narrative summaries.

**Apply.** Select one anthology case and complete a structured debrief with timeline, decision audit, framework mapping, and counterfactual controls. Push to: `/docs/templates/failure-debrief-template.md`

**Key takeaways:**
- Failure analysis must produce operating changes
- Framework mapping exposes repeatable blind spots
- Case freshness and sourcing are required for credibility

---

### Lesson 9.6 — Regulatory Readiness for AI Products

*Type:* `framework`
*Last verified:* 2026-04-17

This lesson is educational and not legal advice.

AI PMs still need regulatory literacy to frame risk and evidence.

**EU AI Act tiers**:
- unacceptable risk
- high risk
- limited risk
- minimal risk

**NIST AI RMF functions**:
- Govern
- Map
- Measure
- Manage

**ISO 42001 relevance**:
- management-system discipline for AI governance
- documentation, accountability, and continual improvement expectations

Regulatory readiness means each obligation maps to concrete evidence and owner.

**Quiz.** What is the most useful first step in regulatory readiness work?
> Classify product risk tier, then map obligations to evidence artifacts and named owners.

**Apply.** Complete a regulatory readiness pass for one AI feature: EU AI Act tiering, NIST AI RMF mapping, and ISO 42001 control evidence links. Push to: `/docs/templates/regulatory-readiness-checklist.md`

**Key takeaways:**
- Regulatory readiness is evidence-driven
- Risk-tier classification should happen early
- NIST RMF helps operationalize governance work

---

## MODULE 10 — Capstone & Portfolio

*WEEK 10 · Tag: Ship*

### Lesson 10.1 — Capstone: Ship a Production-Ready AI Product

*Type:* `deliverable`

**Everything builds to this. Ship something real.**

**Capstone checklist** (12 parts):
1. **AI PRD** — all 6 AI sections
2. **Working prototype** — end-to-end (n8n + Claude API or equivalent)
3. **Context engineering spec** — documented 5-layer stack
4. **Eval suite** — 50+ test cases, Promptfoo config, LLM-as-judge
5. **Golden dataset** — with human calibration
6. **Guardrails** — all 4 types implemented
7. **Observability** — Langfuse with traces + dashboard
8. **SLOs** — latency, quality, cost, availability
9. **Launch plan** — dogfood → beta → rollout gates
10. **Responsible AI audit** — bias check, harm model, fairness segmentation
11. **Prompt registry** — versioned prompts + changelog + rollback plan
12. **Cost attribution dashboard** — per-feature or per-tenant trend + alerting

**Success criteria**:
- Eval pass rate ≥ 85%
- Latency < 5s end-to-end
- Runs 1 week without manual intervention
- 3+ real users have used it
- Cost within ROI model
- Responsible AI audit complete
- Prompt registry and cost dashboard reviewed in launch packet

**Weekly artifact system** (for the ENTIRE course, not just capstone):
Each module produces 4 artifacts:
1. **Decision memo** — what you decided and why
2. **Working build** — code/config that runs
3. **Eval report** — measured quality with scores
4. **Retrospective** — what you learned, what you'd do differently

**Commit milestones**:
- v0.1: PRD + architecture + context spec
- v0.2: Working prototype (no evals yet)
- v0.3: Eval suite (50 cases) + golden dataset
- v0.4: Guardrails + Langfuse + SLOs
- v0.5: Launch plan + responsible AI audit
- v1.0: Production — real users, metrics passing

**GitHub commits ARE the certification.** No shortcuts.

**Quiz.** What's the minimum viable capstone to prove AI PM competency?
> A working prototype with: AI PRD (6 sections), 50+ test case eval suite, all 4 guardrail types, observability traces, defined SLOs, launch plan with rollout gates, responsible AI audit, prompt registry with version history, and a cost attribution dashboard. Running in production with 3+ real users.

**Apply.** **Build the capstone.** All code, docs, evals in `/capstone/`. Follow the milestone schedule. Every module: push decision memo + build + eval report + retrospective.

This is your portfolio piece. This proves you're Type B.

---
**APPLY B — AI Feature Closeout**
Draft a Closeout & Retrospective for your Capstone project. Document final vs target metrics and transfer unresolved items to the Risk Register. Push to: `/docs/deploy/ai-feature-closeout-[feature].md`

---
**APPLY C — Weekly Artifact CI Setup**
Enable weekly artifact checks using:
- `/docs/ci/weekly-artifact-check.yml`
- `/docs/ci/verify-artifacts.js`
- `/docs/templates/weekly-artifact-setup-guide.md`

Start in advisory mode, then move to strict mode once your artifact cadence is stable.

**Key takeaways:**
- 10-part capstone = proof of AI PM competency
- Weekly: decision memo + build + eval + retro
- GitHub commits ARE the certification

---

## MODULE 11 — Arabic AI Systems

*WEEK 11 · Tag: Localization*

### Lesson 11.1 — Arabic Token Economics, Retrieval Quality, and E-commerce Localization

*Type:* `technical`

**Arabic AI systems need dedicated architecture, not translated defaults.**

**Why this module exists**:
- Arabic tokenization is often less efficient than English, increasing cost and latency.
- Retrieval quality drops fast when chunking ignores Arabic sentence boundaries.
- Trust breaks when RTL, bilingual product names, and dialect expectations are not explicitly designed.

**Production baseline for Arabic commerce workflows**:
1. Normalize Arabic input before embedding and retrieval.
2. Use sentence-aware chunking for retrieval indexes.
3. Evaluate multilingual embeddings on Arabic queries before production.
4. Add reranking for high-stakes product and policy answers.
5. Track Arabic-specific quality metrics separately from English.
6. Design bilingual fallback UX (Arabic + English identifiers).

**Localization risk patterns to audit**:
- SKU and product code corruption in mixed-language responses.
- Wrong dialect/register for customer support responses.
- Hallucinated product attributes in Arabic summaries.
- Retrieval mismatch caused by naive chunking.

**Arabic quality gate (minimum)**:
- Retrieval relevance @ top-3 meets threshold on Arabic test set.
- Hallucination rate for product facts below agreed limit.
- Human correction rate in Arabic flow is not worse than baseline target.
- RTL and mixed-language rendering passes UI checks.

**Quiz.** What is the most common retrieval mistake in Arabic AI systems?
> Naive chunking that breaks sentence meaning. Sentence-aware chunking is the baseline for preserving Arabic semantic quality.

**Apply.** **Arabic systems lab**:
1. Build a 30-case Arabic e-commerce evaluation set.
2. Compare two chunking strategies and record retrieval quality.
3. Add reranking and measure improvement.
4. Document token-cost comparison: Arabic vs English request set.
5. Write localization guardrails for bilingual output.

Push to: `/docs/localization/arabic-systems-lab.md`

**Key takeaways:**
- Arabic systems require dedicated token/retrieval optimization
- Sentence-aware chunking and reranking should be default in Arabic RAG
- Track Arabic quality and cost as first-class production metrics

---

### Lesson 11.2 — MENA Privacy, Data Residency, and Cross-Border AI Risk

*Type:* `framework`
*Last verified:* 2026-04-17

This lesson is educational and not legal advice.

MENA-facing products need explicit data-flow and residency decisions.

Focus jurisdictions:
- Saudi PDPL
- UAE PDPL
- Egypt Data Protection Law 151/2020

**Operational checks**:
- map end-to-end data flow, including model-provider routing
- define cross-border transfer controls and approvals
- apply Arabic-aware PII redaction (names, IDs, addresses, phone formats)
- set retention and breach-notification responsibilities

Treat regional privacy readiness as a release gate for MENA deployments.

**Quiz.** What is the most common data-residency blind spot in AI systems?
> Ignoring third-party model routing paths and assuming data stays in-region without explicit provider controls.

**Apply.** Create a MENA data-flow map and compliance checklist for one AI feature, including Arabic PII redaction tests. Push to: `/docs/templates/mena-privacy-compliance-checklist.md`

**Key takeaways:**
- Regional privacy constraints must be mapped before launch
- Arabic-aware redaction is required for accurate PII handling
- Third-party routing must be explicitly audited

---

## MODULE 12 — Executive AI Leadership

*WEEK 12 · Tag: Leadership*

### Lesson 12.1 — Vendor Strategy, Ecosystem Risk & Negotiation

*Type:* `framework`
*Last verified:* 2026-Q2

**AI leaders do not just pick models. They shape vendor power, switching cost, and strategic leverage.**

**Vendor strategy is now product strategy**:
- Your model provider affects margin, latency, privacy posture, regional availability, legal terms, and roadmap dependency.
- The wrong vendor decision can lock the org into pricing or capability constraints before the product matures.
- The right decision creates optionality: fallback providers, open-weight escape hatches, and stronger negotiation leverage.

**5 dimensions of vendor strategy**:
1. **Capability fit** — Which provider is strongest for your actual workloads: reasoning, coding, multilingual, voice, retrieval, or agents?
2. **Commercial fit** — What happens to unit economics if usage 5x's? Are there cached-input or batch advantages?
3. **Control fit** — What data retention, regional hosting, private deployment, and audit requirements must you satisfy?
4. **Roadmap fit** — Is this provider moving toward your needs or away from them?
5. **Exit fit** — Can you switch in 30 days if pricing, quality, or legal terms change?

**Leadership anti-patterns**:
- One-provider dependence with no fallback design
- Signing enterprise contracts before proving workload shape
- Confusing a model demo with a platform strategy
- Letting engineering optimize for convenience while finance absorbs the risk

**Negotiation posture**:
- Show volume scenarios, not just current usage
- Ask for roadmap alignment and migration support
- Preserve switching rights and portability where possible
- Tie procurement to real eval results, not sales promises

**Executive review question**:
"If this provider doubled price or degraded quality next quarter, how fast could we shift?" If the answer is "we don't know," strategy is incomplete.

---

**Foundation Model Benchmark Literacy**
PMs are now expected to evaluate vendor claims with benchmark evidence. "Model X scores best on reasoning benchmarks" should mean something to you — not just to your engineering team.

**The 6 Benchmarks You Must Know**

| Benchmark | Measures | Good Score | PM Use Case |
|---|---|---|---|
| **MMLU** | General knowledge breadth across 57 subjects | 85%+ frontier | Domain knowledge depth — medical, legal, finance |
| **MATH** | Competition-level quantitative reasoning (no retrieval) | 70%+ reasoning models | Quantitative analysis, pricing, financial modeling |
| **HumanEval** | Code generation — write correct Python from a docstring | 85%+ coding models | AI coding assistants, developer tools |
| **GPQA** | Graduate-level science Q&A requiring genuine reasoning | 60%+ (human experts ~65%) | Complex domain reasoning — not surface knowledge |
| **SWE-Bench** | Fix real GitHub issues end-to-end | 30%+ is strong (hard benchmark) | AI coding agents in engineering workflows |
| **Chatbot Arena Elo** | Human preference — blind A/B votes on real conversations | Higher Elo = humans prefer it | Overall conversational quality; hardest to game |

**Benchmark Literacy Exercise**
Three vendors submit these scores. Which model for each use case?

| Model | MMLU | HumanEval | SWE-Bench | Arena Elo |
|---|---|---|---|---|
| Model A | 88% | 92% | 38% | 1340 |
| Model B | 75% | 65% | 18% | 1210 |
| Model C | 82% | 78% | 29% | 1290 |

- *AI coding assistant for developers* → Model A (leads HumanEval + SWE-Bench)
- *General-purpose enterprise chatbot* → Model A or C (Arena Elo + MMLU balance)
- *Customer support chatbot* → Model C (Arena Elo reflects real user preference; code benchmarks irrelevant)

**Benchmark Gaming — What to Watch For**
- **Cherry-picking**: Vendor reports only benchmarks where their model leads — ask for full leaderboard comparison.
- **Contamination**: Training data may include benchmark test questions, inflating scores artificially.
- **Task mismatch**: MMLU leader ≠ your domain task leader. Use benchmarks as a filter, not a verdict — always follow up with your own domain-specific eval suite.
- **Why Arena Elo is hardest to game**: Real users, real questions, continuously updated test set — cannot be contaminated.

**Quiz.** What's the most dangerous vendor mistake in AI systems?
> Becoming operationally dependent on a single provider before you have fallback paths, cost scenarios, and an exit plan. That's not speed — it's unpriced strategic risk.

**Apply.** **Vendor strategy memo**:
1. Compare 3 provider paths (frontier API, gateway-routed multi-provider, open-weight fallback).
2. Score each on capability, cost, control, roadmap, and exit fit.
3. Document negotiation asks and switching triggers.

Push to: `/docs/executive/vendor-strategy.md`

**Key takeaways:**
- Vendor strategy is product strategy
- Optionality beats convenience
- Always design for provider exit before scale

---

### Lesson 12.2 — Org Design for AI Product Teams

*Type:* `framework`
*Last verified:* 2026-04-17

**Most AI programs fail because the org was designed for deterministic software delivery, not probabilistic systems.**

**Why org design matters**:
- AI PM work crosses product, design, engineering, data, security, operations, and legal faster than traditional product work.
- If ownership is unclear, eval quality, guardrails, and production monitoring get orphaned.
- AI programs need explicit operating cadence, not heroics.

**Core org models**:
- **Centralized AI platform team**: best for shared infra, standards, observability, gateways, and eval tooling.
- **Embedded AI pod**: best when domain expertise and workflow design must stay close to the product team.
- **Hybrid model**: central platform + embedded product pods. Usually the best operating model for large orgs.

**Decision rights to define explicitly**:
- Who owns eval quality thresholds?
- Who owns model/vendor selection?
- Who approves autonomy expansion?
- Who can stop a launch on trust/safety grounds?
- Who owns post-launch regression review?

**Leadership operating cadence**:
- Weekly: review quality drift, cost drift, critical failures
- Monthly: roadmap shifts, vendor changes, organizational bottlenecks
- Quarterly: portfolio rebalance, standards update, team capability review

**Key roles to design for**:
- AI Product Manager
- Platform / Applied AI Engineer
- Design lead for trust UX
- Evaluation owner
- Safety / governance reviewer
- Business / operations stakeholder

**If nobody owns the eval system, nobody owns the product quality.**

**AI TEAM DEVELOPMENT STAGES**
AI teams experience Tuckman's stages with higher volatility:
- *Forming*: High enthusiasm, naive assumptions about model capabilities.
- *Storming*: Frustration when evals fail, blame shifts between data/prompt/model.
- *Norming*: Team accepts non-determinism, establishes strict golden datasets.
- *Performing*: Shipped, scaling autonomy based on empirical trust.
*Warning*: Any major model swap or architecture rewrite sends the team back to Storming.

**Quiz.** What's the best default org design for serious AI product work in a mixed company?
> A hybrid model: central AI platform capabilities plus embedded product/domain teams. It balances shared standards with domain-specific execution.

**Apply.** **Org design working doc**:
1. Choose centralized, embedded, or hybrid.
2. Define decision rights for vendor choice, eval thresholds, autonomy approvals, and incident response.
3. Map roles and weekly/monthly operating cadence.

Push to: `/docs/executive/org-design.md`

**Key takeaways:**
- AI org design needs explicit decision rights
- Hybrid is often the strongest default
- Quality ownership must be named, not implied

---

### Lesson 12.3 — AI Portfolio Governance & Prioritization

*Type:* `framework`

**An AI portfolio is not a backlog. It is a managed investment system.**

**Why portfolio governance matters**:
- AI initiatives compete for scarce resources: data, applied AI talent, eval bandwidth, and executive attention.
- Without portfolio governance, orgs overfund visible demos and underfund operational infrastructure.

**Portfolio buckets**:
- **Core value expansion**: AI directly improves the main product experience
- **Operational efficiency**: AI reduces internal cost or cycle time
- **Strategic option bets**: experiments with future upside but current uncertainty
- **Platform enablers**: observability, eval tooling, data pipelines, governance systems

**Portfolio scoring dimensions**:
- Expected ROI
- Strategic importance
- Trust/safety risk
- Data readiness
- Technical feasibility
- Reuse potential across teams

**Governance rules**:
- Require kill criteria at approval time
- Require a measurable eval plan before scaling budget
- Fund platform enablers as first-class investments
- Separate pilot success from rollout approval

**Executive dashboard metrics**:
- Active AI bets by bucket
- % with eval suites
- % with observability configured
- % exceeding cost thresholds
- Portfolio-level value realized vs forecast

**Leadership mistake**:
Treating AI work like feature delivery rather than investment governance.

**Quiz.** What's the biggest AI portfolio prioritization error?
> Overweighting flashy user-facing bets while underfunding the shared infrastructure, eval systems, and governance mechanisms that make any AI portfolio scale reliably.

**Apply.** **Portfolio governance sheet**:
1. List all active AI bets.
2. Bucket them by core / efficiency / option / platform.
3. Score each on ROI, risk, readiness, feasibility, and reuse.
4. Kill or pause the bottom 20%.

Push to: `/docs/executive/ai-portfolio-governance.md`

**Key takeaways:**
- AI portfolio management is investment governance
- Platform enablers deserve explicit budget
- Every AI bet needs kill criteria and eval readiness

---

### Lesson 12.4 — Budgeting, Risk Operating Model & Executive Controls

*Type:* `systems`

**AI systems need a financial and risk operating model, not just engineering estimates.**

**Budget model layers**:
- Fixed platform/tooling cost
- Variable inference cost
- Human fallback cost
- Evaluation and annotation cost
- Incident and compliance overhead

**Risk operating model**:
- Define risk tiers by maximum downside
- Match review intensity to risk tier
- Add approval gates for side-effectful actions
- Escalate from pilot to production only when both metrics and controls pass

**Executive control mechanisms**:
- Budget caps and alerting thresholds
- Launch gates tied to eval and SLO floors
- Vendor concentration limits
- Incident review cadence
- Audit trail requirements

**Three executive dashboards every AI leader needs**:
1. **Quality dashboard**: pass rates, correction rates, regressions
2. **Economics dashboard**: cost per workflow, cache hit rates, fallback cost
3. **Risk dashboard**: incident count, prompt injection findings, policy breaches

**The goal is not zero risk. The goal is controlled, visible, and governable risk.**

**Quiz.** Why is an AI budget model incomplete if it only includes model API cost?
> Because the real operating cost also includes fallback labor, eval/annotation work, observability, governance, and incident handling. Ignoring those creates false ROI.

**Apply.** **Budget and risk operating model**:
1. Build a fully loaded cost model for one AI system.
2. Define 3 risk tiers and the control requirements for each.
3. Specify executive dashboards and alert thresholds.

Push to: `/docs/executive/budget-risk-operating-model.md`

**Key takeaways:**
- AI operating cost is broader than tokens
- Risk should be tiered and governed
- Leaders need quality, economics, and risk dashboards

---

### Lesson 12.5 — Build vs Buy vs Partner for AI Systems

*Type:* `framework`

**The wrong build/buy decision burns time twice: once in implementation, again in rework.**

**Use build when**:
- AI differentiation is core to product value
- Workflow and domain context are proprietary
- You need deeper control than vendors can provide

**Use buy when**:
- Capability is commodity
- Time-to-value matters more than proprietary advantage
- Compliance, maintenance, and support burden would distract the team

**Use partner when**:
- Capability is strategic but internal capability is not mature enough yet
- You need delivery acceleration plus internal knowledge transfer
- The path requires shared ownership over a limited period

**Decision framework**:
- Strategic importance
- Need for control
- Urgency
- Internal capability maturity
- Integration complexity
- Vendor lock-in risk
- Long-term economic advantage

**Leadership trap**:
Teams often say "build" to feel strategic or "buy" to move fast. The right answer is governed tradeoff, not identity.

**Good executive question**:
"What must become a capability of our org, and what only needs to become a capability of our product?"

**Quiz.** What's the strongest reason to build rather than buy an AI capability?
> When the capability is core to differentiated product value and depends on proprietary workflow, context, or learning loops that a generic vendor cannot provide.

**Apply.** **Build vs buy vs partner analysis**:
1. Choose one AI capability.
2. Score all 3 options across strategic importance, urgency, control, capability maturity, lock-in risk, and economics.
3. Recommend one path with explicit assumptions and revisit date.

Push to: `/docs/executive/build-buy-partner-analysis.md`

**Key takeaways:**
- Build when differentiation and proprietary context matter
- Buy when speed and commodity value dominate
- Partner when acceleration plus capability transfer is the goal

---

### Lesson 12.6 — DORA Baselines Before Agent Adoption

*Type:* `systems`

Agent adoption without baseline metrics creates false progress stories.

Capture baseline before scaling:
- deployment frequency
- lead time for changes
- change failure rate
- time to restore service

Add AI-specific overlays:
- AI-authored change ratio
- review latency
- escape-rate trend

Only compare post-adoption performance against a stable pre-adoption baseline window.

Supplementary reading: `/docs/reading/micro-teams-2026.md` (sections on DORA baselines and first 90-day transition controls).

**Quiz.** Why is baseline collection mandatory before introducing more AI-authored changes?
> Without baseline data you cannot attribute improvements or regressions to the adoption change.

**Apply.** Document a 4-week DORA baseline and define post-adoption comparison rules.

Then map your current org to one Micro-Teams transition path and list three early warning signals from the first 30 days.

Push to: `/docs/executive/dora-baseline-ai-transition.md`

**Key takeaways:**
- Baselines prevent false ROI claims
- DORA + AI overlays give real signal
- Comparisons need fixed windows

---

### Lesson 12.7 — Org Design for AI-Native Teams

*Type:* `framework`

AI-native org design reallocates effort from typing to verification and governance.

Define:
- role transitions
- decision rights by risk tier
- verification ownership
- incident governance
- cross-functional cadences

Good org design lowers coordination debt while increasing control clarity.

Use `/docs/reading/micro-teams-2026.md` to compare single-orchestrator, micro-team pod, and agency-style delivery models before selecting your transition map.

**Quiz.** What is the primary org design goal in AI-native teams?
> To increase delivery speed while preserving quality through explicit verification and governance ownership.

**Apply.** Create an org transition map from current roles to AI-native role boundaries.

Add a 90-day pilot appendix using `/docs/templates/90-day-micro-team-pilot.md` if you are running executive-track capstone work.

Push to: `/docs/executive/org-design-ai-native.md`

**Key takeaways:**
- Shift work from implementation to verification
- Decision rights must be explicit
- Cadence design matters

---

### Lesson 12.8 — Vendor Switching and Portability Strategy

*Type:* `framework`

Vendor strategy must include switch readiness, not just procurement quality.

Portability checklist:
- prompt/template portability
- schema compatibility
- observability continuity
- eval replayability across providers
- legal and data transfer readiness

Switching triggers should be explicit: quality degradation, pricing shock, reliability issues, or policy change.

**Quiz.** What is the most important capability for reducing model vendor lock-in?
> Maintaining portable prompts/evals and abstraction layers so provider migration can be validated quickly.

**Apply.** Draft a vendor-switch trigger matrix with migration readiness score. Push to: `/docs/executive/vendor-switch-readiness.md`

**Key takeaways:**
- Portability needs technical and legal readiness
- Triggers should be pre-defined
- Eval replayability enables safe migration

---

### Lesson 12.9 — Communicating AI Ops Metrics to Leadership

*Type:* `practice`

Leadership communication should convert technical signals into business decisions.

Translate:
- eval drift -> customer risk
- merge cap pressure -> execution capacity risk
- correction-rate trend -> product quality risk
- cost trend -> margin risk

Use one decision-oriented narrative:
1. What changed
2. Why it matters
3. What decision is needed
4. What happens if delayed

**Quiz.** Why do many AI metrics updates fail at executive level?
> They report telemetry without translating it into risk, impact, and decision requirements.

**Apply.** Prepare a one-page executive AI ops brief using the 4-part narrative format. Push to: `/docs/executive/ai-ops-brief-template.md`

**Key takeaways:**
- Translate metrics into decisions
- Use risk-impact language
- Keep reporting cadence consistent

---

### Lesson 12.10 — AI PM Portfolio, Leveling, and Interview Storytelling

*Type:* `framework`
*Last verified:* 2026-04-17

Capstone work creates value only if you can communicate decision quality clearly.

**Portfolio conversion framework**:
- problem and context
- decision log and trade-offs
- evidence (evals, telemetry, incidents, retrospectives)
- outcomes, misses, and what changed

**STAR for AI decisions**:
- Situation
- Task
- Action
- Result

Strong narratives include uncertainty, failed hypotheses, and course-correct decisions.

**Leveling signals (L4 to Principal)** should map to real artifacts and scope of influence.

**Quiz.** What makes an AI PM portfolio case study credible to a hiring panel?
> Transparent trade-offs, evidence-linked outcomes, and clear ownership of both wins and failures.

**Apply.** Build one interview-ready AI PM portfolio entry and self-assess your current level using artifact-backed evidence. Push to: `/docs/templates/ai-pm-portfolio-template.md` and `/docs/templates/ai-pm-leveling-matrix.md`

**Key takeaways:**
- Evidence-backed storytelling beats polished claims
- STAR framing should include uncertainty and corrections
- Leveling claims must tie to artifacts

---

