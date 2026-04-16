# UNIFIED AI PM CURRICULUM & ENRICHMENT

This document consolidates all learning materials, frameworks, and templates from the AI-PM-Course repository.

## Table of Contents

- [Core Curriculum - Lesson Data](#core-curriculum---lesson-data)
- [Course Content & Glossary](#course-content-&-glossary)
- [Applied Tooling Guide](#applied-tooling-guide)
- [Lesson Enhancements](#lesson-enhancements)
- [Capstone Project Dashboard](#capstone-project-dashboard)
- [Google PM: Foundations](#google-pm-foundations)
- [Google PM: Project Initiation](#google-pm-project-initiation)
- [Google PM: Project Planning](#google-pm-project-planning)
- [Google PM: Agile PM](#google-pm-agile-pm)
- [Course Audit & Benchmarking](#course-audit-&-benchmarking)
- [Google PM Enrichment Spec](#google-pm-enrichment-spec)
- [Product Discovery: 5a-framework-[feature].md](#product-discovery-5a-framework-[feature]md)
- [Product Discovery: 5a-framework-support-assistant.md](#product-discovery-5a-framework-support-assistantmd)
- [Product Discovery: ai-business-case.md](#product-discovery-ai-business-casemd)
- [Product Discovery: multimodal-assessment.md](#product-discovery-multimodal-assessmentmd)
- [Product Discovery: opportunity-landscape.md](#product-discovery-opportunity-landscapemd)
- [Product Discovery: team-discovery.md](#product-discovery-team-discoverymd)
- [Design & Trust: context-engineering-audit.md](#design-&-trust-context-engineering-auditmd)
- [Design & Trust: failure-ux-audit.md](#design-&-trust-failure-ux-auditmd)
- [Design & Trust: tool-inventory.md](#design-&-trust-tool-inventorymd)
- [Design & Trust: trust-design-[feature].md](#design-&-trust-trust-design-[feature]md)
- [Design & Trust: trust-design-support-assistant.md](#design-&-trust-trust-design-support-assistantmd)
- [Executive & Strategy: ai-portfolio-governance.md](#executive-&-strategy-ai-portfolio-governancemd)
- [Executive & Strategy: budget-risk-operating-model.md](#executive-&-strategy-budget-risk-operating-modelmd)
- [Executive & Strategy: build-buy-partner-analysis.md](#executive-&-strategy-build-buy-partner-analysismd)
- [Executive & Strategy: org-design.md](#executive-&-strategy-org-designmd)
- [Executive & Strategy: vendor-strategy.md](#executive-&-strategy-vendor-strategymd)
- [Applied Template (Public): ai-prd-template.md](#applied-template-(public)-ai-prd-templatemd)
- [Applied Template (Public): eval-rubric-template.md](#applied-template-(public)-eval-rubric-templatemd)
- [Applied Template (Public): responsible-ai-audit-template.md](#applied-template-(public)-responsible-ai-audit-templatemd)
- [Applied Template (Public): rollout-checklist-template.md](#applied-template-(public)-rollout-checklist-templatemd)
- [Applied Template (Docs): ai-feature-closeout.md](#applied-template-(docs)-ai-feature-closeoutmd)
- [Applied Template (Docs): ai-prd-template.md](#applied-template-(docs)-ai-prd-templatemd)
- [Applied Template (Docs): ai-risk-register.md](#applied-template-(docs)-ai-risk-registermd)
- [Applied Template (Docs): ai-team-raci.md](#applied-template-(docs)-ai-team-racimd)
- [Applied Template (Docs): assessment-rubric-operations.md](#applied-template-(docs)-assessment-rubric-operationsmd)
- [Applied Template (Docs): eval-rubric-template.md](#applied-template-(docs)-eval-rubric-templatemd)
- [Applied Template (Docs): okr-ai-features.md](#applied-template-(docs)-okr-ai-featuresmd)
- [Applied Template (Docs): responsible-ai-audit-template.md](#applied-template-(docs)-responsible-ai-audit-templatemd)
- [Applied Template (Docs): rollout-checklist-template.md](#applied-template-(docs)-rollout-checklist-templatemd)
- [Applied Template (Docs): sprint-0-kickoff.md](#applied-template-(docs)-sprint-0-kickoffmd)
- [Applied Template (Docs): stakeholder-power-grid.md](#applied-template-(docs)-stakeholder-power-gridmd)
- [Applied Template (Docs): weekly-demo-release-note.md](#applied-template-(docs)-weekly-demo-release-notemd)
- [Applied Template (Docs): weekly-design-review.md](#applied-template-(docs)-weekly-design-reviewmd)
- [Applied Template (Docs): weekly-red-team.md](#applied-template-(docs)-weekly-red-teammd)

---

<a name="core-curriculum---lesson-data"></a>
## Core Curriculum - Lesson Data

**Source**: `curriculum.js`

```javascript
/* Curriculum data extracted from App.jsx for maintainability */
export const curriculum = [
  {
    id: 1, week: "WEEK 1", module: "MODULE 1", title: "AI Paradigm Shift & Business Strategy", tag: "Strategy", accent: "#FF4D00",
    lessons: [
      {
        id: "1.1", title: "9 Shifts in AI Product Management", type: "concept",
        content: `AI didn't reinvent product management. It **removed every safety net PMs used to hide behind**.

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
Klarna deployed an AI agent handling 2/3 of all customer service conversations in its first month. Key decisions: started at HITL Level 2 (human review on refunds), used structured outputs for all financial actions, built a 500-case golden dataset from historical chats, and implemented confidence thresholding — low-confidence responses routed to humans. Result: equivalent to 700 full-time agents, 25% fewer repeat inquiries, resolution time from 11 minutes to 2 minutes.`,
        quiz: { q: "What's the core difference between a Type A and Type B AI PM?", a: "Type B can ship a working AI prototype solo — they understand context engineering, evals, token economics, and tool orchestration, not just vocabulary." },
        apply: `**Self-audit**: Rate yourself 1–5 on each Type B skill (3 = can explain but haven't shipped):

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

Any skill below 3 = priority target. Push to: \`/docs/self-audit/type-b-skills.md\``,
        keys: ["Type B PM = can ship a prototype, not just talk about AI", "Trust is the core deliverable, not features", "System thinking replaces feature thinking"],
        meta: { sources: ["Product Faculty V3 Syllabus (Maven 2026)", "Klarna AI Agent Case Study 2024"], lastVerified: "2026-Q2", artifact: "/docs/self-audit/type-b-skills.md", rubric: ["Honest self-assessment (no inflated scores)", "All 8 skills rated", "Priority targets identified"], failureModes: ["Rating 5 on skills never shipped", "Skipping the audit entirely"], redTeam: ["Ask a teammate to independently rate you — compare scores"] },
      },
      {
        id: "1.2", title: "AI Opportunity Landscape & AI-Shaped Problems", type: "concept",
        content: `**Where AI creates real value vs. where it creates hype**

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
Shopify launched Sidekick as an AI assistant for merchants. Zone 2 (augmentation): helps with store setup, marketing copy, data analysis. Key insight: Shopify didn't make Sidekick autonomous. It suggests, the merchant decides. They started with the tasks that had highest frequency × highest cognitive load: "help me write a product description" (frequent, creative, tedious). Tasks with clear right answers (inventory math) were left to deterministic tools.`,
        quiz: { q: "A task always produces the same output from the same input. Should you use an LLM?", a: "No. Deterministic tasks should use rules-based automation, SQL queries, or workflow tools. LLMs add cost and non-determinism without benefit." },
        apply: `**Opportunity audit**: Classify every AI idea in your backlog:

| Idea | Zone | AI-shaped? | Wedge/Core | Pain Score | Verdict |
|---|---|---|---|---|---|
| ? | ? | ? | ? | ? | ? |

Kill anything in Zone 4. Kill Pain Score < 100. Push to: \`/docs/discovery/opportunity-landscape.md\``,
        keys: ["4 zones — ruthlessly kill Zone 4", "AI-shaped = ambiguity + cognitive load + variable paths + frequency", "Wedge vs Core determines your long-term strategy"],
      },
      {
        id: "1.3", title: "5-A Framework, Crystallization & Learning Protocol", type: "framework",
        content: `**The 5-A Framework** — Product Faculty's core systematic method:

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
\`\`\`bash
mkdir ai-pm-course && cd ai-pm-course && git init
mkdir -p docs/{self-audit,discovery,design,develop,deploy,live,gtm} evals/{promptfoo} projects capstone
echo "# AI PM Course — Applied Edition" > README.md
git add . && git commit -m "init: course structure"
\`\`\``,
        quiz: { q: "Why is the 5-A Framework circular instead of linear?", a: "Because A5 (ongoing assessment) feeds back into A1 (assess). AI products degrade from model updates, data drift, and user behavior changes — continuous re-assessment is required." },
        apply: `**Apply 5-A** to one planned AI feature. Write 2–3 sentences per step. Don't skip A5 — define eval cadence. Push to: \`/docs/discovery/5a-framework-[feature].md\``,
        keys: ["5-A is circular: Assess → Architect → Acquire → Assemble → Assess", "Overton Window: earn autonomy, don't assume it", "Crystallization: Content → Context → Confirmation"],
      },
      {
        id: "1.4", title: "AI ROI, Unit Economics & Investment Memo", type: "framework",
        content: `**Most enterprise AI pilots fail ROI. The reason is never the model — it's missing financial rigor.**

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
Traditional PM balances Scope, Time, and Cost. AI PM balances 4 distinct constraints:
- **Quality**: Eval pass rate and hallucination tolerance.
- **Latency**: Time to first token / total generation time.
- **Cost**: Token burn rate and compute expense.
- **Privacy/Security**: Data retention and context boundaries.

*Trade-off Example*: You can increase Quality by using a heavier model and complex RAG, but it will degrade Latency and increase Cost.

**When to kill**: Pain score < 100. No ROI path in 6 months. Data unavailable in 4 weeks. Problem is deterministic.

**Case study — Amazon's AI-powered product descriptions**:
Amazon uses LLMs to generate product listing descriptions at scale. ROI: reduced listing creation time from 30 min to 2 min. But the key lesson: they started in shadow mode — AI drafts were compared to human drafts for 6 weeks before any went live. Hallucination in a product listing (wrong specs) = customer returns = direct cost. They built a 2,000-case golden dataset of product descriptions with verified specs before deployment.`,
        quiz: { q: "Why must AI ROI calculations include human fallback cost?", a: "Because when AI fails (and it will), humans handle the escalation. That labor cost is real and recurring. Ignoring it inflates ROI projections." },
        apply: `**Write a 1-page AI investment memo** for your highest-priority feature:
1. Problem statement + pain score
2. ROI tree with specific numbers
3. Fully loaded cost estimate
4. 3 scenarios: optimistic / baseline / pessimistic
5. Kill criteria
6. Adoption phase plan

Push to: \`/docs/discovery/ai-business-case.md\``,
        keys: ["AI ROI includes per-inference cost + human fallback", "ROI Tree: cost reduction / revenue / risk mitigation", "Adoption: shadow → suggest → supervise → autonomous"],
      },
    ],
  },
  {
    id: 2, week: "WEEK 2", module: "MODULE 2", title: "Model Systems & Token Economics", tag: "Technical", accent: "#0066FF",
    lessons: [
      {
        id: "2.1", title: "How LLMs Work: Tokens, Embeddings, Attention", type: "technical",
        content: `**You don't build LLMs. You understand them well enough to make product decisions.**

**Tokens** — LLMs read tokens (~¾ English word). Arabic uses 2–3x more tokens. This affects cost, latency, and context budget. Mitigation for Arabic: AraToken normalization, diacritics removal → 30–50% token reduction.

**Embeddings** — vectors (768–12,288 dimensions) encoding semantic meaning. Foundation of semantic search, RAG, classification. For Arabic: use BGE-M3 or Multilingual-E5-large (default English models fail).

**Context window** — the model's working memory per call. Claude Opus: 200k tokens. GPT-4.1: 1M. Gemini 2.5: 1M. When exceeded, older content drops. PM decisions: what fits in context vs needs retrieval? How to manage budget across system prompt + chunks + history + tool outputs?

**Attention** — the mechanism that lets models weigh which tokens relate to each other. Key PM insight: attention fades in the middle of long contexts. Place critical instructions at the beginning AND end. This is the primacy/recency effect for LLMs.

**Transformer architecture in 30 seconds**: Input → tokenize → embed → attention layers (which tokens relate?) → predict next token → repeat. The "next token prediction" framing matters: LLMs don't "understand" — they predict likely continuations. This is why they hallucinate confidently.`,
        quiz: { q: "Where in a long prompt should you place your most critical instructions and why?", a: "At the beginning AND end. The attention mechanism exhibits primacy/recency bias — middle content receives less attention in very long contexts." },
        apply: `**Token cost calculator**: Estimate monthly cost of your Arabic email parser. Include: avg input tokens (use Anthropic tokenizer), volume (emails/day × 30), pricing (Sonnet: $3/1M in, $15/1M out). What if volume 3x's? Push to: \`/docs/develop/token-cost-model.md\``,
        keys: ["Arabic = 2–3x token penalty → use AraToken, BGE-M3", "Attention fades in middle → instructions at edges", "LLMs predict tokens, they don't understand — hallucination is inherent"],
      },
      {
        id: "2.2", title: "GenAI Value Stack, Moats & Model Selection", type: "technical",
        content: `**5 layers**: Compute (commodity) → Foundation Models (commoditizing) → Infrastructure (emerging) → Applications (where you compete) → User Data (real moat).

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

**Live Model Registry pattern**: Maintain \`/docs/live/model-registry.md\` — map task → model → pricing → last verified. Update quarterly. Never hardcode model names.

**Caching**: Prompt caching (90% savings on static prefixes), semantic caching (similar queries), response caching (deterministic outputs).

**Case study — Google's Gemini in Search**:
Google uses model routing extensively. Simple factual queries → Gemini Flash (fast, cheap). Complex reasoning → Gemini Pro. Research-grade → Gemini Ultra. The routing classifier itself is a small model optimized for speed. Result: 80% of queries handled by the cheapest model tier while maintaining quality.`,
        quiz: { q: "Why is 'we use GPT-4' not a moat?", a: "Because your competitor can use it too — models are commoditizing. Moats come from proprietary data, distribution, trust, and learning loops that compound over time." },
        apply: `**Build your model selection table** for every AI feature. Include task, tier, model, cost estimate, cache strategy. Push to: \`/docs/live/model-registry.md\``,
        keys: ["The model is NOT your moat — contextual moats are", "Dynamic compute: route by complexity to optimize margin", "Live model registry — never hardcode model names"],
      },
      {
        id: "2.3", title: "AI Product Metrics & the AI PRD", type: "framework",
        content: `**Standard metrics don't work for AI products.**

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

**What makes an AI PRD different from a regular PRD**: Non-determinism. You must specify quality ranges, not exact behaviors. "The system will correctly extract order details from 85%+ of Arabic emails" not "The system will extract order details from all emails."`,
        quiz: { q: "What is the single most important metric for AI product quality in production?", a: "User correction rate — how often users edit or reject AI output. It's the leading indicator of perceived quality, captures issues evals miss, and generates free training data." },
        apply: `**Write your first AI PRD** with all 6 AI-specific sections + problem statement, success metrics, HITL level, launch criteria, kill criteria. Push to: \`/docs/ai-prd-[feature].md\``,
        keys: ["User correction rate = THE leading indicator", "AI PRD = standard PRD + 6 AI sections", "Sprint 0: eval dataset + context strategy FIRST"],
      },
    ],
  },
  {
    id: 3, week: "WEEK 3", module: "MODULE 3", title: "Context Engineering", tag: "Core", accent: "#8B00FF",
    lessons: [
      {
        id: "3.1", title: "The Context Engineering Stack", type: "technical",
        content: `**Prompt engineering is 2023. Context engineering is 2026.**

**Context engineering** = designing the entire information environment the model operates in:

**Layer 1 — Instructions**: System prompt, persona, constraints, output format, negative constraints ("do NOT hallucinate features"). XML tags for Claude: \`<instructions>\`, \`<context>\`, \`<output_format>\`.

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

**Andrej Karpathy (2025)**: "Most agent failures are not model failures — they are context failures."`,
        quiz: { q: "What is Minimum Viable Context and why does it matter?", a: "MVC is the smallest set of inputs the model needs for the current task. Too much context degrades quality (noise). Too little causes hallucination (no grounding). The PM's job is finding the sweet spot." },
        apply: `**Context audit**: Map every layer for your highest-priority feature. Identify the weakest layer — that's where quality improvement lives. Push to: \`/docs/design/context-engineering-audit.md\``,
        keys: ["Context engineering > prompt engineering", "3 grounding patterns: long context / RAG / memory", "MVC: enough to be accurate, not so much it degrades"],
      },
      {
        id: "3.2", title: "Advanced Prompting & RAG Architecture", type: "technical",
        content: `**5 advanced prompting techniques** (still Layer 1 of context engineering):
1. **Chain-of-Thought**: "Think step by step before answering" — dramatic accuracy improvement
2. **Few-Shot**: 2–5 examples showing format + quality expected. Include normal, edge, error.
3. **XML Delimiters**: \`<instructions>\`, \`<context>\`, \`<query>\` — prevents conflation, mitigates injection
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

**Citation systems**: Every AI claim should cite its source chunk. Trust UX pattern AND debugging tool.`,
        quiz: { q: "Why is sentence-aware chunking mandatory for Arabic RAG systems?", a: "Naive character-based chunking splits Arabic mid-sentence, which destroys the semantic embedding entirely. Arabic sentence boundaries carry critical meaning — breaking them produces vectors that don't represent the original content." },
        apply: `**Rebuild your primary prompt** using the full context engineering stack. Checklist: XML delimiters, 3 few-shot examples, CoT, JSON schema, 3+ negative constraints, placement optimization. Compare 10 test results. Push to: \`/docs/develop/context-engineering-v2.md\``,
        keys: ["Context vs. Behavior Matrix: diagnose what's broken", "Arabic RAG: sentence-aware chunking + BGE-M3 + hybrid search", "Reranking: cheap step, 15–30% quality boost"],
      },
      {
        id: "3.3", title: "Tool Use, MCP & Optimization Ladder", type: "technical",
        content: `**Tool calling turns models from text generators into action takers.**

**MCP (Model Context Protocol)**: Universal standard for AI-to-tool connections. Linux Foundation governed. 97M+ monthly SDK downloads. Anthropic, OpenAI, Google, Microsoft all support it. One interface instead of custom integrations.

**Tool description quality = tool selection quality**:
Bad: \`"search": "searches stuff"\`
Good: \`"search_product_catalog": "Search product catalog by name, category, or SKU. Returns name, price, stock, description. Use for availability/pricing/specs queries."\`

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

**Updated fine-tuning guidance (2026)**: Fine-tuning is for behavioral tone/format consistency, not knowledge injection. Modern context engineering + RAG handles knowledge. Most teams that think they need fine-tuning actually need better RAG or structured outputs. Use fine-tuning only after exhausting Steps 1–4.`,
        quiz: { q: "An AI feature gives inconsistent output format. What's your first fix?", a: "Structured output specification (JSON schema enforcement) — Step 2 on the ladder. NOT fine-tuning. Structured outputs with tool_choice/response_format eliminates 90%+ format inconsistency at zero extra cost." },
        apply: `**Tool inventory**: List every tool your AI agent needs. Classify Read/Write/Delete. Define guardrails per tool. Then: pick one underperforming feature and walk through the escalation ladder. Push to: \`/docs/design/tool-inventory.md\` and \`/docs/develop/optimization-log.md\``,
        keys: ["MCP = universal standard for AI tool connections", "Read/Write/Delete taxonomy determines safety requirements", "Escalation ladder: prompt → context → RAG → model → fine-tuning (in order)"],
      },
    ],
  },
  {
    id: 4, week: "WEEK 4", module: "MODULE 4", title: "Discovery & Pain Quantification", tag: "Discovery", accent: "#00A86B",
    lessons: [
      {
        id: "4.1", title: "AI Discovery: Cognitive Load & Service Blueprints", type: "framework",
        content: `**Discovery in AI PM = understanding how users think, not just what they do.**

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
AI shifts stakeholders frequently: Legal moves to High Interest when autonomy increases.`,
        quiz: { q: "A team wants to build an AI feature. The pain score is 14. What do you do?", a: "Kill it. Pain Score of 14 (e.g., severity 7 × frequency 2 × 1 user) is below the 100 threshold. Redirect effort to the highest-scoring pain point." },
        apply: `**Run 1 real discovery interview** with a team member. Map pains → AI capabilities. Score each. Draw a service blueprint for the #1 pain. Push to: \`/docs/discovery/team-discovery.md\`

---
**APPLY B — AI Team RACI**
Draft a RACI matrix for your highest-risk AI decision (e.g., eval thresholds or guardrail design). Push to: \`/docs/discovery/ai-team-raci.md\``,
        keys: ["Cognitive load hotspots = where AI adds most value", "Pain Score > 100 or kill it", "Service blueprint reveals human-AI boundary", "Map stakeholders by Power vs Interest for AI risk"],
      },
    ],
  },
  {
    id: 5, week: "WEEK 5", module: "MODULE 5", title: "Trust Design & AI UX", tag: "Design", accent: "#FF6B35",
    lessons: [
      {
        id: "5.1", title: "3P Framework, 4 Design Patterns & HITL Levels", type: "framework",
        content: `**3P Framework**: Prioritization (is this the highest-value AI problem?), Placement (where in the user journey?), Prominence (how visible? — scales with proven quality).

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

**The Edit UX** — most underrated trust pattern: Track which fields get edited (prompt weakness), what users change to (free training data), how long editing takes (if longer than manual, feature is net negative).`,
        quiz: { q: "Why must all new AI features start at HITL Level 1?", a: "Because you haven't earned trust yet. Starting with autonomy before demonstrating reliability = organizational rejection + user churn. Level 1 (human approves) lets you measure quality in production before earning autonomy progression." },
        apply: `**Trust design**: For your #1 feature, define: starting HITL level + 6-month progression plan, all 4 design patterns, 3 trust signals for UI, fallback chain, error copy. Push to: \`/docs/design/trust-design-[feature].md\``,
        keys: ["HITL: always start Level 1, earn progression with data", "No feedback loop = feature decay", "Edit tracking = free training data"],
      },
      {
        id: "5.2", title: "Multilingual AI UX, Failure Design & Vendor Risk", type: "framework",
        content: `**Arabic-first AI UX has unique challenges beyond translation.**

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
- **Gradual autonomy**: L1 (approve all) → L2 (approve some) → L3 (approve exceptions only)`,
        quiz: { q: "Your AI provider announces a 3x price increase effective in 60 days. What should you already have in place?", a: "A vendor risk plan: budget scenarios modeled at 2x and 3x pricing, model calls abstracted behind an interface (not direct API coupling), a tested fallback to an alternative model, and a regression suite to validate the fallback model's quality matches your SLOs." },
        apply: `**Failure UX audit + vendor risk plan**:

1. Map failure modes for your AI feature:
| Failure Mode | Current UX | Ideal UX | Fallback |
|---|---|---|---|
| Low confidence | ? | Warning + verify | ? |
| No response | ? | Cached response | ? |
| Wrong language | ? | Detect + re-route | ? |
| Hallucinated data | ? | Grounding check | ? |

2. Document your vendor risk plan: fallback model, budget scenarios, abstraction layer, regression suite for fallback validation.

Push to: \`/docs/design/failure-ux-audit.md\` and \`/docs/deploy/vendor-risk-plan.md\``,
        keys: ["Arabic UX: RTL, dialect register, token cost, conciseness", "Context compression: summarize history, top-3 chunks, budget allocation, memory offloading", "Vendor risk: always have fallback model + budget scenarios + abstraction layer"],
      },
    ],
  },
  {
    id: 6, week: "WEEK 6", module: "MODULE 6", title: "Build, Evaluate & Iterate", tag: "Core", accent: "#FFB800",
    lessons: [
      {
        id: "6.1", title: "The Build Loop: Prototype → Evaluate → Iterate", type: "framework",
        content: `**Why most AI prototypes fail to reach production**: Wrong problem selected (not AI-shaped). No evaluation criteria defined before building. No path from demo to production.

**The AI Build Loop**:
\`\`\`
Define problem → Build eval dataset → Build prototype → Run evals →
     ↑                                                       |
     └──────────── Iterate on context/RAG/arch ──────────────┘
                              |
                     Meets quality bar?
                        Yes → Production
                        No → Back to eval
\`\`\`

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
- *Definition of Done* → *Passes Golden Dataset and Guardrails active.*`,
        quiz: { q: "A team builds an AI prototype and says 'it looks good.' What's wrong?", a: "No eval criteria were defined before building. 'Looks good' is a vibe check, not a metric. Without a golden dataset and rubric defined upfront, you can't measure improvement or catch regressions." },
        apply: `**Build a prototype in 60 minutes**: Use n8n + Claude API. Must produce real output (not demo). Must have 10+ test cases (even manual). Push prototype export + eval log to: \`/projects/sprint-0-prototype/\`

---
**APPLY B — AI Sprint 0 Kickoff**
Run an AI Kickoff for your upcoming feature. Define problem, scope, RACI, eval criteria, context strategy, and HITL level. Push to: \`/projects/sprint-0-kickoff-[feature].md\``,
        keys: ["Evals before code — always", "Prototype in 60 minutes or simplify", "n8n + Claude + Langfuse + Promptfoo = your default stack", "AI workflows map to Agile: DoD = Passes Golden Dataset"],
      },
      {
        id: "6.2", title: "Multi-Layer Eval Systems & Golden Datasets", type: "technical",
        content: `**6 eval layers** (from cheapest to most expensive):

**Layer 1 — Deterministic**: Schema valid? Length OK? Format correct? Run on EVERY request.

**Layer 2 — Golden Dataset**: 50–200 curated cases. Normal (60%), edge (25%), adversarial (15%). Weighted by real-world frequency. Domain expert reviewed. Version-controlled.

**Layer 3 — LLM-as-Judge**: Stronger model scores on rubric dimensions (accuracy, completeness, tone, safety). Prompt: "Score 1–5 on [dimension] using this rubric. Return JSON: {score, reasoning, pass_fail}."

**Layer 4 — Human Calibration**: Compare LLM-judge to human expert scores. If >10% divergence, recalibrate judge. Weekly → monthly.

**Layer 5 — Online Metrics**: User correction rate, re-generation rate, abandonment rate, escalation rate, task completion rate.

**Layer 6 — Regression Suite**: Every production bug → new test case. Prevents quality decay.

**Red Teaming**: Prompt injection, indirect injection (malicious retrieved docs), PII extraction, business rule violations, hallucination triggers (questions about non-existent data).

**Eval tooling — Promptfoo**: Compare prompts × models × test cases. CI integration — block deploys if scores drop. Run each test N times (AI is non-deterministic). Set threshold: "pass if ≥90% of runs pass."

**Eval cadence**: Pre-launch: 100% golden. Post-change: 100% regression. Weekly: 10% production sample. Monthly: human calibration. Quarterly: full red-team.`,
        quiz: { q: "Your LLM-as-judge average scores have been slowly increasing over 3 months without any product changes. What's happening?", a: "Judge calibration drift. The LLM judge is becoming less discerning over time. Solution: run human calibration — compare 10 judge scores to expert human scores. If >10% divergence, recalibrate the judge prompt." },
        apply: `**Build eval suite**: 50 test cases (30 normal, 12 edge, 8 adversarial). Implement Layer 1 deterministic checks. Run LLM-as-judge. Compare 10 judge scores to your own. Set up Promptfoo with 3 prompt variants + 10 assertions. Push to: \`/evals/\``,
        keys: ["6 layers: deterministic → golden → judge → human → online → regression", "Every production bug → regression test case", "Promptfoo for systematic eval + CI integration"],
      },
    ],
  },
  {
    id: 7, week: "WEEK 7", module: "MODULE 7", title: "Production, Security & Governance", tag: "Production", accent: "#FF3366",
    lessons: [
      {
        id: "7.1", title: "Guardrails, Observability & SLOs", type: "technical",
        content: `**4 guardrail types**:
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
- *Mitigate*: Fail gracefully with a rigid fallback ("I am only trained to assist with Y").`,
        quiz: { q: "Your AI agent accidentally included a customer's email address in a response to a different customer. Which guardrail types failed?", a: "Output guardrails (PII scan on outputs) and possibly input guardrails (PII redaction before sending context to LLM). Both layers should independently prevent PII leakage." },
        apply: `**Guardrail spec + observability setup**: Define all 4 guardrail types for your feature. Deploy Langfuse (cloud free tier). Instrument one n8n LLM call. Define SLOs. Set budget alerts. Push to: \`/docs/deploy/\`

---
**APPLY B — AI Production Risk Register**
Draft a 5-item risk register for your feature including both hallucination and operational failure modes. Push to: \`/docs/deploy/ai-risk-register.md\``,
        keys: ["4 guardrails: input + output + tool + human approval", "SLOs defined BEFORE launch, not after", "Every incident → golden dataset + guardrail patch", "Scope control requires active negative guardrails"],
      },
    ],
  },
  {
    id: 8, week: "WEEK 8", module: "MODULE 8", title: "Agents, Voice & Multimodal", tag: "Advanced", accent: "#00C8FF",
    lessons: [
      {
        id: "8.1", title: "Agent Architecture: Sense → Plan → Act", type: "technical",
        content: `**SENSE**: What the agent perceives — text, API responses, images, audio, tool outputs, session state.

**PLAN**: How it decides — ReAct (reason → act → observe → reason), Planning-first (full plan before executing), Reactive (respond immediately), Reflection (self-review before returning).

**ACT**: What it does — API calls, code execution, web browsing, file operations, human escalation.

**Multi-Agent Orchestration** (Orchestra pattern):
User Goal → Conductor (meta-reasoning) → specialized sub-agents (Research, Analysis, Execution, Review) → aggregated result.

**Why orchestration beats monolithic**: Prevents context overload, enables dynamic compute per sub-task, enables persistent memory across agents, easier debugging.

**Task Looping** (most common failure): Agent stuck in retry loop. Fix: track attempted actions in state, max 3 retries per tool, explicit termination conditions ("if 3 attempts fail, escalate"), "no progress" detector ("if 5 steps with no advancement, stop and summarize").

**Memory tiers**: Session (current conversation), Persistent (cross-session user state), Working (intermediate results from current task). Offload when context > 80%: summarize older items into compressed state.

**Case study — Cursor's AI Code Editor**:
Cursor uses multi-agent orchestration: a routing agent classifies intent (code gen vs. explanation vs. debugging), specialized agents handle each type, and a review agent checks output before presenting. They use prompt caching aggressively (system prompt + repo context cached). Their moat: the data flywheel from millions of code interactions training their suggestion quality.`,
        quiz: { q: "Your agent keeps retrying the same failed API call in a loop. What 3 things fix this?", a: "1) Track attempted actions in agent state (memory of what was tried). 2) Set max retries per tool (3 max). 3) Define explicit termination: 'if 3 attempts fail, summarize state and escalate to human.'" },
        apply: `**Design agent architecture**: Sense layer (inputs per agent), Plan layer (reasoning strategy), Act layer (tools per agent), Orchestration (routing), Termination conditions, Memory tiers. Push to: \`/projects/agent-architecture.md\``,
        keys: ["Sense → Plan → Act", "Orchestra pattern: conductor + specialized sub-agents", "Task looping fix: state tracking + retry limits + termination"],
      },
      {
        id: "8.2", title: "Voice Agents, Multimodal & Computer-Use", type: "technical",
        content: `**Voice agents** — the frontier for MENA markets:
Pipeline: Audio → ASR (speech-to-text) → Intent classification → LLM reasoning → TTS (text-to-speech) → Audio output.

PM decisions: Latency < 1s (voice users expect near-instant), Egyptian dialect ASR (not MSA — accuracy varies hugely), interruption handling, silence detection, emotional tone detection → route frustrated users to humans faster.

**Multimodal capabilities**:
- **Vision**: Product defect photos → auto-ticket, document OCR, UI screenshot analysis
- **Audio**: Call center QA scoring, meeting → action item extraction
- **Computer-use agents** (2026 emerging): AI interacts with software UIs directly. Slow, expensive, error-prone. Use APIs when available. Computer-use = last resort for tools without APIs.

**When to go multimodal**: Users naturally want to send photos/voice → build for it. Task involves visual/audio analysis → multimodal is core. Adding because "cool" → Zone 4 (hype).

**Case study — Google's Multimodal Search**:
Google Lens processes 20B+ visual searches. PM lesson: they didn't launch as "search by photo." They launched as "identify this plant" and "translate this sign" — specific, high-confidence use cases. Multimodal features must start with the use case that has the highest confidence AND most obvious user intent.`,
        quiz: { q: "You're building a voice agent for Arabic-speaking customers. What's the most critical technical decision?", a: "Egyptian Arabic dialect ASR model selection. MSA-only models have significantly lower accuracy on Egyptian colloquial Arabic, which is what your actual users speak. This single decision determines whether the entire voice pipeline works or fails." },
        apply: `**Multimodal assessment**: Which capabilities add real value? Score each: value (1–10), feasibility (1–10), priority. Push to: \`/docs/discovery/multimodal-assessment.md\``,
        keys: ["Voice latency < 1s for acceptance", "Egyptian Arabic ASR ≠ MSA models", "Computer-use: last resort when no API exists"],
      },
    ],
  },
  {
    id: 9, week: "WEEK 9", module: "MODULE 9", title: "GTM, Ethics & AI Leadership", tag: "Strategy", accent: "#E040FB",
    lessons: [
      {
        id: "9.1", title: "Go-to-Market Strategy for AI Features", type: "framework",
        content: `**Launching AI features is fundamentally different from launching traditional features.**

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
- Close the loop: Every thumbs-down rating must capture the full prompt and output for the golden dataset.`,
        quiz: { q: "Your AI feature has a 60% activation rate but only 15% repeated use rate. What does this tell you?", a: "Users are curious enough to try it (high activation) but the first experience didn't deliver enough value to return (low repeat). The problem is likely: output quality not meeting expectations, first use case not compelling enough, or too much friction to get value. Focus on time-to-first-value and first-session output quality." },
        apply: `**Write an AI launch plan** for your feature:
1. Dogfooding plan (who, how long, what to track)
2. Beta criteria (which users, what feedback mechanism)
3. Rollout gates (what metrics must pass for each phase expansion)
4. Positioning (user-facing copy for the feature)
5. Exec communication (1-slide pitch with ROI + risk + plan)

Push to: \`/docs/gtm/ai-launch-plan.md\`

---
**APPLY B — AI Feature OKRs**
Draft an Objective and 3 balancing Key Results (Adoption, Efficiency, Quality) for your feature. Push to: \`/docs/gtm/ai-feature-okrs.md\``,
        keys: ["Dogfood → Beta → Guided rollout → GA", "Repeated use rate = THE signal for AI product-market fit", "Lead with outcome, not technology. Show evals to execs."],
      },
      {
        id: "9.2", title: "AI Ethics, Bias & Responsible AI", type: "framework",
        content: `**Ethics isn't a checkbox. It's a product design constraint that affects every decision.**

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

Design guardrails proportional to the harm potential.`,
        quiz: { q: "Your Arabic-language AI feature has 70% accuracy while the English version has 90%. Is this acceptable?", a: "No. This is a fairness gap, not a 'known limitation.' Arabic users deserve equivalent quality. Investigate: is it tokenization (try AraToken), embedding model (try BGE-M3), chunking (use sentence-aware), or training data underrepresentation? Fix the root cause." },
        apply: `**Responsible AI audit** for your AI feature:
1. Where could bias enter? (data, selection, deployment, feedback loop)
2. Segment your eval by user type — is performance equitable?
3. Harm model: what's the worst case from one wrong output?
4. Run the 6-point checklist (transparency, explainability, fairness, privacy, accountability, harm avoidance)

Push to: \`/docs/deploy/responsible-ai-audit.md\``,
        keys: ["Bias enters at data, selection, deployment, and feedback loops", "Segment evals by user type — gaps are bugs, not limitations", "Harm model: design guardrails proportional to max damage"],
      },
    ],
  },
  {
    id: 10, week: "WEEK 10", module: "MODULE 10", title: "Capstone & Portfolio", tag: "Ship", accent: "#00E676",
    lessons: [
      {
        id: "10.1", title: "Capstone: Ship a Production-Ready AI Product", type: "deliverable",
        content: `**Everything builds to this. Ship something real.**

**Capstone checklist** (10 parts):
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

**Success criteria**:
- Eval pass rate ≥ 85%
- Latency < 5s end-to-end
- Runs 1 week without manual intervention
- 3+ real users have used it
- Cost within ROI model
- Responsible AI audit complete

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

**GitHub commits ARE the certification.** No shortcuts.`,
        quiz: { q: "What's the minimum viable capstone to prove AI PM competency?", a: "A working prototype with: AI PRD (6 sections), 50+ test case eval suite, all 4 guardrail types, observability traces, defined SLOs, launch plan with rollout gates, and responsible AI audit. Running in production with 3+ real users." },
        apply: `**Build the capstone.** All code, docs, evals in \`/capstone/\`. Follow the milestone schedule. Every module: push decision memo + build + eval report + retrospective.

This is your portfolio piece. This proves you're Type B.

---
**APPLY B — AI Feature Closeout**
Draft a Closeout & Retrospective for your Capstone project. Document final vs target metrics and transfer unresolved items to the Risk Register. Push to: \`/docs/deploy/ai-feature-closeout-[feature].md\``,
        keys: ["10-part capstone = proof of AI PM competency", "Weekly: decision memo + build + eval + retro", "GitHub commits ARE the certification"],
      },
    ],
  },
  {
    id: 11, week: "WEEK 11", module: "MODULE 11", title: "Arabic AI Systems", tag: "Localization", accent: "#00BFA5",
    lessons: [
      {
        id: "11.1", title: "Arabic Token Economics, Retrieval Quality, and E-commerce Localization", type: "technical",
        content: `**Arabic AI systems need dedicated architecture, not translated defaults.**

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
- RTL and mixed-language rendering passes UI checks.`,
        quiz: { q: "What is the most common retrieval mistake in Arabic AI systems?", a: "Naive chunking that breaks sentence meaning. Sentence-aware chunking is the baseline for preserving Arabic semantic quality." },
        apply: `**Arabic systems lab**:
1. Build a 30-case Arabic e-commerce evaluation set.
2. Compare two chunking strategies and record retrieval quality.
3. Add reranking and measure improvement.
4. Document token-cost comparison: Arabic vs English request set.
5. Write localization guardrails for bilingual output.

Push to: \`/docs/localization/arabic-systems-lab.md\``,
        keys: ["Arabic systems require dedicated token/retrieval optimization", "Sentence-aware chunking and reranking should be default in Arabic RAG", "Track Arabic quality and cost as first-class production metrics"],
      },
    ],
  },
  {
    id: 12, week: "WEEK 12", module: "MODULE 12", title: "Executive AI Leadership", tag: "Leadership", accent: "#FF8A00",
    lessons: [
      {
        id: "12.1", title: "Vendor Strategy, Ecosystem Risk & Negotiation", type: "framework",
        content: `**AI leaders do not just pick models. They shape vendor power, switching cost, and strategic leverage.**

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
"If this provider doubled price or degraded quality next quarter, how fast could we shift?" If the answer is "we don't know," strategy is incomplete.`,
        quiz: { q: "What's the most dangerous vendor mistake in AI systems?", a: "Becoming operationally dependent on a single provider before you have fallback paths, cost scenarios, and an exit plan. That's not speed — it's unpriced strategic risk." },
        apply: `**Vendor strategy memo**:
1. Compare 3 provider paths (frontier API, gateway-routed multi-provider, open-weight fallback).
2. Score each on capability, cost, control, roadmap, and exit fit.
3. Document negotiation asks and switching triggers.

Push to: \`/docs/executive/vendor-strategy.md\``,
        keys: ["Vendor strategy is product strategy", "Optionality beats convenience", "Always design for provider exit before scale"],
      },
      {
        id: "12.2", title: "Org Design for AI Product Teams", type: "framework",
        content: `**Most AI programs fail because the org was designed for deterministic software delivery, not probabilistic systems.**

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
*Warning*: Any major model swap or architecture rewrite sends the team back to Storming.`,
        quiz: { q: "What's the best default org design for serious AI product work in a mixed company?", a: "A hybrid model: central AI platform capabilities plus embedded product/domain teams. It balances shared standards with domain-specific execution." },
        apply: `**Org design working doc**:
1. Choose centralized, embedded, or hybrid.
2. Define decision rights for vendor choice, eval thresholds, autonomy approvals, and incident response.
3. Map roles and weekly/monthly operating cadence.

Push to: \`/docs/executive/org-design.md\``,
        keys: ["AI org design needs explicit decision rights", "Hybrid is often the strongest default", "Quality ownership must be named, not implied"],
      },
      {
        id: "12.3", title: "AI Portfolio Governance & Prioritization", type: "framework",
        content: `**An AI portfolio is not a backlog. It is a managed investment system.**

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
Treating AI work like feature delivery rather than investment governance.`,
        quiz: { q: "What's the biggest AI portfolio prioritization error?", a: "Overweighting flashy user-facing bets while underfunding the shared infrastructure, eval systems, and governance mechanisms that make any AI portfolio scale reliably." },
        apply: `**Portfolio governance sheet**:
1. List all active AI bets.
2. Bucket them by core / efficiency / option / platform.
3. Score each on ROI, risk, readiness, feasibility, and reuse.
4. Kill or pause the bottom 20%.

Push to: \`/docs/executive/ai-portfolio-governance.md\``,
        keys: ["AI portfolio management is investment governance", "Platform enablers deserve explicit budget", "Every AI bet needs kill criteria and eval readiness"],
      },
      {
        id: "12.4", title: "Budgeting, Risk Operating Model & Executive Controls", type: "systems",
        content: `**AI systems need a financial and risk operating model, not just engineering estimates.**

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

**The goal is not zero risk. The goal is controlled, visible, and governable risk.**`,
        quiz: { q: "Why is an AI budget model incomplete if it only includes model API cost?", a: "Because the real operating cost also includes fallback labor, eval/annotation work, observability, governance, and incident handling. Ignoring those creates false ROI." },
        apply: `**Budget and risk operating model**:
1. Build a fully loaded cost model for one AI system.
2. Define 3 risk tiers and the control requirements for each.
3. Specify executive dashboards and alert thresholds.

Push to: \`/docs/executive/budget-risk-operating-model.md\``,
        keys: ["AI operating cost is broader than tokens", "Risk should be tiered and governed", "Leaders need quality, economics, and risk dashboards"],
      },
      {
        id: "12.5", title: "Build vs Buy vs Partner for AI Systems", type: "framework",
        content: `**The wrong build/buy decision burns time twice: once in implementation, again in rework.**

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
"What must become a capability of our org, and what only needs to become a capability of our product?"`,
        quiz: { q: "What's the strongest reason to build rather than buy an AI capability?", a: "When the capability is core to differentiated product value and depends on proprietary workflow, context, or learning loops that a generic vendor cannot provide." },
        apply: `**Build vs buy vs partner analysis**:
1. Choose one AI capability.
2. Score all 3 options across strategic importance, urgency, control, capability maturity, lock-in risk, and economics.
3. Recommend one path with explicit assumptions and revisit date.

Push to: \`/docs/executive/build-buy-partner-analysis.md\``,
        keys: ["Build when differentiation and proprietary context matter", "Buy when speed and commodity value dominate", "Partner when acceleration plus capability transfer is the goal"],
      },
    ],
  },
];

```

---

<a name="course-content-&-glossary"></a>
## Course Content & Glossary

**Source**: `courseContent.js`

```javascript
/* Course content constants extracted from App.jsx */
export const GLOSSARY = [
  { term: "Context Engineering", def: "Designing the entire information environment an LLM operates in — system prompts, memory, retrieved docs, tool definitions, conversation history, and user state. Superset of prompt engineering." },
  { term: "RAG", def: "Retrieval-Augmented Generation. Grounding LLM outputs by retrieving relevant documents from a knowledge base and injecting them into the prompt context before generation." },
  { term: "Golden Dataset", def: "A curated benchmark of inputs with verified correct outputs used to evaluate model/prompt changes. 50–200 examples covering normal, edge, and adversarial cases." },
  { term: "HITL", def: "Human-in-the-Loop. A design pattern where humans review, approve, or edit AI outputs before they reach the end user. Levels 0 (full human control) to 5 (full autonomy)." },
  { term: "TTFT", def: "Time-to-First-Token. The latency between sending a request and receiving the first token of the response. Critical for user-perceived speed." },
  { term: "Token", def: "The smallest unit LLMs process. ~¾ of an English word. Arabic uses 2–3x more tokens per word. Tokens determine cost, latency, and context window usage." },
  { term: "Embedding", def: "A high-dimensional vector (768–12,288 dimensions) encoding the semantic meaning of text. Foundation of semantic search, RAG, and classification." },
  { term: "Hallucination", def: "When an LLM generates confident but factually incorrect output. Not a bug — it's inherent to probabilistic generation. Managed through grounding, evals, and guardrails." },
  { term: "MCP", def: "Model Context Protocol. Universal standard (Linux Foundation) for connecting AI agents to external tools. 97M+ monthly SDK downloads. Think USB-C for AI tool connections." },
  { term: "Guardrails", def: "Runtime safety filters applied to inputs, outputs, tool calls, and human approvals. Prevent prompt injection, PII leakage, hallucination propagation, and unauthorized actions." },
  { term: "LLM-as-Judge", def: "Using a stronger model to evaluate outputs from your primary model on rubric dimensions (accuracy, tone, safety). Scales evaluation beyond manual review." },
  { term: "Contextual Moat", def: "Competitive advantage from proprietary context: domain-specific data, user interaction patterns, eval datasets, and feedback loops that compound over time and resist replication." },
  { term: "Fine-Tuning", def: "Training a model on curated examples to adjust behavior/format. Last resort after prompt engineering, context engineering, and RAG. For behavior consistency, NOT knowledge injection." },
  { term: "ReAct", def: "Reason + Act pattern for agents. The model reasons about what to do, takes an action (tool call), observes the result, then reasons again. Core loop for tool-using agents." },
  { term: "Eval Suite", def: "A systematic testing framework with deterministic checks, golden datasets, LLM-as-judge scoring, human calibration, online metrics, and regression tests." },
  { term: "Prompt Caching", def: "Reusing cached static system prompt prefixes across API calls. Reduces cost by up to 90% on cached tokens. Supported by Anthropic and OpenAI." },
  { term: "Structured Outputs", def: "Enforcing JSON schema compliance on LLM responses. Eliminates 90%+ parsing errors. Anthropic: tool_choice. OpenAI: response_format. Critical for production pipelines." },
  { term: "Dynamic Compute", def: "Routing requests to different reasoning modes based on complexity. Simple queries → standard inference. Complex → extended thinking. Optimizes cost while maintaining quality." },
  { term: "Red Teaming", def: "Adversarial testing to find failure modes before launch. Includes prompt injection, PII extraction, hallucination triggers, and business rule violations." },
  { term: "AI Wedge", def: "AI as initial hook to acquire users, but long-term value comes from the platform built around it. Contrasted with AI Core where model quality IS the product." },
  { term: "Pain Score", def: "Severity (1–10) × Frequency (daily) × User Count. Quantifies which problems deserve AI investment. Kill anything below 100." },
  { term: "Overton Window", def: "The range of AI autonomy that users and organizations will currently accept. Features must debut within this window and earn expanded autonomy through reliability." },
  { term: "Service Blueprint", def: "Maps User Action → Frontstage (visible) → Backstage (AI processing) → Support Systems → Failure Points. Reveals where human-AI boundary should be drawn." },
  { term: "Promptfoo", def: "Open-source eval tool. Compare prompt variants × models × test cases systematically. CI integration blocks deploys if scores drop. The standard for AI eval pipelines." },
];

export const CHEATSHEETS = [
  { title: "Context Engineering Stack", items: ["Layer 1: Instructions (system prompt, persona, constraints)", "Layer 2: Grounding (long context / RAG / memory)", "Layer 3: Tools (function calling, MCP, side-effect control)", "Layer 4: Structured Outputs (JSON schema enforcement)", "Layer 5: Reasoning Control (standard / extended thinking)"] },
  { title: "Model Selection", items: ["Low complexity → Haiku/GPT-4o-mini/Gemini Flash", "Medium → Sonnet/GPT-4o/Gemini Pro", "High → Opus/GPT-4.1/o3", "Regulated/Private → LLaMA/Mistral/Qwen (open-weight)", "Always: prompt caching + dynamic compute routing"] },
  { title: "Eval Layers", items: ["1. Deterministic (schema, format, length)", "2. Golden Dataset (50–200 curated cases)", "3. LLM-as-Judge (rubric scoring)", "4. Human Calibration (weekly→monthly)", "5. Online Metrics (correction rate, abandonment)", "6. Regression (every bug → test case)"] },
  { title: "Guardrail Types", items: ["Input: injection detect, PII redact, off-topic filter", "Output: grounding check, schema validate, PII scan", "Tool: write approval, amount limits, rate limits, audit log", "Human: pre-execute (high risk), batch (medium), review (low)"] },
  { title: "AI PRD Additions", items: ["1. Model selection rationale", "2. Data requirements + privacy", "3. Context strategy (instructions + grounding + tools)", "4. Guardrails spec (all 4 types)", "5. Eval criteria (golden dataset + judge rubric)", "6. Trust design (HITL level + error UX + feedback)"] },
  { title: "HITL Autonomy Levels", items: ["L0: AI suggests options → Human selects + executes", "L1: AI proposes action → Human approves (DEFAULT START)", "L2: AI executes batches → Human supervises plan", "L3: AI autonomous within boundaries → Human manages guardrails", "L4: AI acts + informs post-action → Human reviews logs", "L5: Full autonomy → Almost never appropriate"] },
  { title: "ROI Formula", items: ["Value = Time savings + Efficiency gains + Revenue increase + Risk mitigation", "Cost = Tokens + VectorDB + Labor + Annotation + Observability + Fallback humans", "Net ROI % = ((Value - Cost) / Cost) × 100", "Kill if: Pain Score < 100, no ROI path in 6mo, no data in 4wk"] },
  { title: "Arabic AI Checklist", items: ["Tokenizer: AraToken or multilingual (2–3x penalty)", "Embeddings: BGE-M3 or Multilingual-E5-large", "Chunking: sentence-aware (mandatory for Arabic)", "ASR: Egyptian dialect model, not MSA-only", "RTL: test mixed Arabic+English layout", "Cost: budget 2.5x vs English equivalent"] },
  { title: "Lesson Metadata Schema", items: ["sources: [references used — verify quarterly]", "lastVerified: YYYY-QN (when content was last fact-checked)", "artifact: /path/to/github/output.md", "rubric: [grading criteria for the exercise]", "failureModes: [common ways to do this exercise wrong]", "redTeam: [adversarial checks to stress-test your output]", "Pattern: add meta to every lesson as you complete it"] },
];

export const TOOLS = [
  { name: "Promptfoo", cat: "Eval & Testing", free: true, url: "https://promptfoo.dev", setup: "npm install -g promptfoo", desc: "Compare prompt variants × models × test cases. CI integration blocks deploys if scores drop. THE standard for AI eval pipelines.", usedIn: ["6.1 Build Loop", "6.2 Eval Systems", "10.1 Capstone"], practice: "Create promptfooconfig.yaml with 3 prompt variants, 10 test cases, 3 assertion types. Run promptfoo eval. Compare results across Claude Sonnet vs GPT-4o." },
  { name: "Langfuse", cat: "Observability", free: true, url: "https://cloud.langfuse.com", setup: "Sign up free → Get API keys → pip install langfuse", desc: "Open-source LLM observability. Traces every call: input, output, latency, cost, model. Self-hostable on GCP Cloud Run or use free cloud tier.", usedIn: ["7.1 Guardrails & Observability", "10.1 Capstone"], practice: "Instrument one n8n LLM call with Langfuse trace. Build a dashboard showing cost/day, latency p95, error rate." },
  { name: "n8n", cat: "Orchestration", free: true, url: "https://n8n.io", setup: "Already in your stack at ai.cardoo.co", desc: "Workflow automation with AI nodes. Your primary build tool for prototypes and production AI pipelines. Webhook triggers, HTTP nodes, code nodes, AI nodes.", usedIn: ["3.3 Tool Use & MCP", "6.1 Build Loop", "8.1 Agent Architecture", "10.1 Capstone"], practice: "Build a complete AI pipeline: webhook trigger → Claude API call → structured output parse → Odoo API write → Langfuse trace log. Under 60 minutes." },
  { name: "Anthropic API", cat: "LLM Provider", free: false, url: "https://console.anthropic.com", setup: "Sign up → Get API key → pip install anthropic", desc: "Claude models (Haiku/Sonnet/Opus). Best for: XML-structured prompts, extended thinking, tool use, structured outputs. Your primary intelligence layer.", usedIn: ["2.1 Tokens & Embeddings", "3.1 Context Engineering", "6.1 Build Loop", "10.1 Capstone"], practice: "Build a token cost calculator: paste 10 real Arabic emails, count tokens, calculate monthly cost at different volume tiers." },
  { name: "Anthropic Tokenizer", cat: "Token Counting", free: true, url: "https://console.anthropic.com/tokenizer", setup: "No setup — browser tool", desc: "Paste text, see exact token count. Essential for cost modeling, context budget planning, and Arabic token penalty estimation.", usedIn: ["2.1 Tokens & Embeddings", "1.4 ROI & Unit Economics"], practice: "Paste 10 Arabic emails + 10 English equivalents. Compare token counts. Calculate the actual Arabic multiplier for your domain." },
  { name: "pgvector", cat: "Vector Database", free: true, url: "https://github.com/pgvector/pgvector", setup: "Already on GCP Cloud SQL — CREATE EXTENSION vector;", desc: "PostgreSQL extension for vector similarity search. Your RAG vector store. No separate infra needed — runs in your existing Postgres.", usedIn: ["3.2 RAG Architecture", "10.1 Capstone"], practice: "Create a products table with vector column. Embed 50 product descriptions with BGE-M3. Build a hybrid search query (semantic + keyword). Measure retrieval accuracy on 10 test queries." },
  { name: "Claude Code", cat: "AI Code Editor", free: false, url: "https://docs.anthropic.com/en/docs/claude-code", setup: "npm install -g @anthropic-ai/claude-code", desc: "Terminal-based AI coding agent. Ideal for building agent workflows, MCP integrations, and n8n custom nodes. Fastest path from spec to code.", usedIn: ["6.1 Build Loop", "8.1 Agent Architecture", "10.1 Capstone"], practice: "Use Claude Code to scaffold your capstone agent: 'Build an n8n workflow that classifies Arabic emails into order/inquiry/complaint and extracts structured data.'" },
  { name: "OpenClaw", cat: "No-Code Agent Builder", free: true, url: "https://openclaw.com", setup: "Browser-based — sign up free", desc: "No-code agent builder with tool chaining. Good for rapid prototyping before moving to n8n for production. Visual agent orchestration.", usedIn: ["6.1 Build Loop"], practice: "Build a 3-tool agent chain: search product catalog → format response → log to sheet. Compare output quality vs your n8n equivalent." },
  { name: "Lovable", cat: "Web App Prototyping", free: true, url: "https://lovable.dev", setup: "Browser-based — sign up free", desc: "AI-powered web app prototyping. Useful for quickly building trust UX mockups, feedback collection interfaces, and admin dashboards for AI features.", usedIn: ["5.1 Trust Design", "6.1 Build Loop"], practice: "Build a trust UX prototype: AI response card with confidence score, 'Edit' button, thumbs up/down, and 'Show reasoning' expandable section." },
  { name: "Dyad", cat: "Data Product Builder", free: true, url: "https://dyad.sh", setup: "Browser-based", desc: "AI-powered data product builder. Useful for building eval dashboards, golden dataset management UIs, and AI ops monitoring views.", usedIn: ["6.2 Eval Systems", "7.1 Observability"], practice: "Build an eval results dashboard: upload golden dataset JSON, display pass/fail rates by category, trend chart over time." },
  { name: "Google Sheets → JSON", cat: "Dataset Management", free: true, url: "https://sheets.google.com", setup: "No setup needed", desc: "Low-tech but effective for golden datasets. Build test cases in Sheets (input | expected output | category | rubric), export as CSV/JSON for Promptfoo.", usedIn: ["6.2 Eval Systems"], practice: "Create a 50-row golden dataset: columns for input, expected_output, category (normal/edge/adversarial), rubric_score. Export as JSON for Promptfoo." },
  { name: "Hugging Face", cat: "Models & Embeddings", free: true, url: "https://huggingface.co", setup: "pip install sentence-transformers", desc: "Host for open-weight models and embedding models. Download BGE-M3 or Multilingual-E5-large for Arabic embeddings. Also: model comparison, dataset hosting.", usedIn: ["2.2 Model Selection", "3.2 RAG Architecture"], practice: "Download BGE-M3. Embed 20 Arabic product descriptions. Test cosine similarity between related vs unrelated products. Verify semantic quality." },
  { name: "LangSmith / Braintrust", cat: "Eval Platform", free: true, url: "https://smith.langchain.com", setup: "Sign up free tier", desc: "Alternative to Promptfoo for teams wanting a hosted eval platform. Dataset management, experiment tracking, prompt versioning. Free tier available.", usedIn: ["6.2 Eval Systems"], practice: "Upload your golden dataset. Run 3 prompt variants. Compare scores side-by-side. Set up an alert for score regression." },
];

export const COURSE_BENCHMARK = {
  auditDate: "April 11, 2026",
  target: "Product Faculty AI Product Management Certification on Maven",
  targetShape: "Publicly framed as 12 live sessions and 19 lessons with hands-on application and capstone work.",
  matchPoints: [
    "Covers AI paradigm shift, AI product stack, build systems, trust, evaluation, and capstone delivery.",
    "Exceeds the public benchmark on operational depth: evals, guardrails, observability, and production rollout.",
    "Adds Arabic, RTL, and MENA market considerations rarely covered in general AI PM courses.",
  ],
  upgrades: [
    "Self-serve course product with progress tracking, bookmarks, search, map, glossary, references, and tools lab.",
    "Artifact-first learning model so each module leads to portfolio-grade outputs.",
    "Explicit audit and source transparency so learners know what is benchmarked and when it was verified.",
  ],
};

export const EXPERIENCE_PILLARS = [
  { title: "Strategy", text: "Opportunity sizing, ROI, AI-shaped problems, market wedge vs. core strategy." },
  { title: "Systems", text: "Models, context engineering, RAG, tools, agents, multimodal, and optimization ladders." },
  { title: "Trust", text: "HITL, UX, failure design, guardrails, fairness, privacy, and governance." },
  { title: "Shipping", text: "Eval suites, observability, rollout, capstone delivery, and portfolio-ready artifacts." },
];

export const ARTIFACT_TRACKS = [
  "Decision memo: what you decided and why",
  "Working build: workflow, prompt, config, or prototype",
  "Eval report: quality score, failure modes, and regression logic",
  "Retrospective: what improved, what still fails, what to test next",
];

export const SOURCE_LIBRARY = [
  {
    title: "Product Faculty course page",
    kind: "Benchmark",
    verified: "2026-04-11",
    url: "https://www.productfaculty.com/ai-certification-v3",
    note: "Used to calibrate audience, time commitment, and certification positioning.",
  },
  {
    title: "Maven course page",
    kind: "Benchmark",
    verified: "2026-04-11",
    url: "https://maven.com/product-faculty/ai-product-management-certification",
    note: "Used to calibrate public syllabus shape, lesson count framing, and cohort structure.",
  },
  {
    title: "OpenAI platform docs",
    kind: "Primary source",
    verified: "Review regularly",
    url: "https://platform.openai.com/docs",
    note: "Use for model behavior, structured outputs, eval patterns, and production guidance.",
  },
  {
    title: "Anthropic docs",
    kind: "Primary source",
    verified: "Review regularly",
    url: "https://docs.anthropic.com",
    note: "Use for Claude prompting, tool use, prompt caching, and context guidance.",
  },
  {
    title: "Promptfoo docs",
    kind: "Tooling",
    verified: "Review regularly",
    url: "https://promptfoo.dev",
    note: "Reference for eval workflow and CI-based prompt testing.",
  },
  {
    title: "Langfuse docs",
    kind: "Tooling",
    verified: "Review regularly",
    url: "https://langfuse.com/docs",
    note: "Reference for tracing, observability, and production monitoring.",
  },
];

```

---

<a name="applied-tooling-guide"></a>
## Applied Tooling Guide

**Source**: `toolingGuide.js`

```javascript
export const TOOL_MAP_BY_LESSON = [
  {
    lessonId: "1.3",
    lessonTitle: "5-A Framework, Crystallization & Learning Protocol",
    tools: ["Promptfoo", "Langfuse"],
    why: "Introduces the operating loop of evaluate, observe, and improve.",
    how: "Use Promptfoo to define baseline evals and Langfuse to trace early prototypes.",
  },
  {
    lessonId: "2.2",
    lessonTitle: "GenAI Value Stack, Moats & Model Selection",
    tools: ["Helicone", "Portkey"],
    why: "Teaches model routing, cost controls, and provider abstraction.",
    how: "Compare provider economics, fallback strategies, and budget controls through an AI gateway.",
  },
  {
    lessonId: "2.3",
    lessonTitle: "AI Product Metrics & the AI PRD",
    tools: ["Promptfoo", "Langfuse", "W&B Weave"],
    why: "Connects quality metrics to real evaluation and trace evidence.",
    how: "Attach eval outputs and trace links to PRDs and launch-readiness reviews.",
  },
  {
    lessonId: "3.3",
    lessonTitle: "Tool Use, MCP & Optimization Ladder",
    tools: ["Portkey", "Helicone"],
    why: "Covers tool-calling, routing, caching, and gateway patterns.",
    how: "Use gateways for retries, caching, and cross-provider experimentation.",
  },
  {
    lessonId: "6.1",
    lessonTitle: "The Build Loop: Prototype → Evaluate → Iterate",
    tools: ["Promptfoo", "Langfuse", "Phoenix"],
    why: "This is the heart of practical AI iteration.",
    how: "Run Promptfoo regressions, inspect Langfuse traces, or compare experiments in Phoenix.",
  },
  {
    lessonId: "6.2",
    lessonTitle: "Multi-Layer Eval Systems & Golden Datasets",
    tools: ["Promptfoo", "Phoenix", "W&B Weave"],
    why: "Formalizes offline evals, LLM judges, and dataset-driven testing.",
    how: "Use Promptfoo for CI-style evals, Phoenix/Weave for richer experiment and dataset workflows.",
  },
  {
    lessonId: "7.1",
    lessonTitle: "Guardrails, Observability & SLOs",
    tools: ["Langfuse", "Portkey", "Helicone", "LangSmith"],
    why: "This lesson is about production reliability and runtime governance.",
    how: "Trace behavior in Langfuse/LangSmith and use gateway controls for budgets, fallbacks, and guardrails.",
  },
  {
    lessonId: "8.1",
    lessonTitle: "Agent Architecture: Sense → Plan → Act",
    tools: ["Langfuse", "LangSmith", "CrewAI", "Phoenix"],
    why: "Agent systems need state, debugging, and failure visibility.",
    how: "Trace multi-step agent runs and inspect loops, retries, and tool outcomes.",
  },
  {
    lessonId: "10.1",
    lessonTitle: "Capstone: Ship a Production-Ready AI Product",
    tools: ["Promptfoo", "Langfuse", "Portkey", "Phoenix"],
    why: "Capstone should prove evaluation, observability, and production controls.",
    how: "Submit eval reports, trace evidence, and gateway/guardrail policies as part of final delivery.",
  },
];

export const MUST_ADD_TOOLS = [
  {
    name: "Promptfoo",
    category: "Evaluation and red teaming",
    useCase: "Regression tests, rubric scoring, RAG/agent evals, CI-friendly red teaming.",
    whyItMatters: "Best fit for repeatable eval workflows and launch gates.",
    source: "https://www.promptfoo.dev/docs/intro/",
  },
  {
    name: "Langfuse",
    category: "Observability and application tracing",
    useCase: "Trace LLM calls, sessions, tools, token usage, latency, and scores.",
    whyItMatters: "Strong default observability platform for AI PM operating reviews.",
    source: "https://langfuse.com/docs/observability/overview",
  },
  {
    name: "Phoenix",
    category: "Observability plus evaluation and experiments",
    useCase: "Trace, evaluate, replay, and compare AI app changes on datasets.",
    whyItMatters: "Useful when you want open tooling with stronger experiment workflows.",
    source: "https://arize.com/docs/phoenix",
  },
  {
    name: "LangSmith",
    category: "Observability, evals, prompt iteration",
    useCase: "Trace apps, configure metrics, and evaluate production traffic.",
    whyItMatters: "Strong option for teams already using LangChain/LangGraph or wanting hosted observability.",
    source: "https://docs.smith.langchain.com/",
  },
  {
    name: "W&B Weave",
    category: "Tracing, evals, experiments",
    useCase: "Track LLM inputs/outputs, build evaluations, version objects and prompts.",
    whyItMatters: "Great for teams that want experimentation depth and versioned iteration.",
    source: "https://docs.wandb.ai/weave",
  },
  {
    name: "Helicone",
    category: "AI gateway, routing, caching, observability",
    useCase: "One API for many providers with routing, caching, cost tracking, and fallbacks.",
    whyItMatters: "Useful for teaching provider abstraction and token economics in practice.",
    source: "https://docs.helicone.ai/gateway/overview",
  },
  {
    name: "Portkey",
    category: "AI gateway, guardrails, governance",
    useCase: "Universal API, cache, guardrails, fallbacks, budgets, and model catalog.",
    whyItMatters: "Best fit for production governance and enterprise controls.",
    source: "https://portkey.ai/docs/product/ai-gateway",
  },
];

export const TOOLING_SELECTION_GUIDE = [
  "Use Promptfoo when you need repeatable offline evals and red-team checks.",
  "Use Langfuse when you need trace-level observability across requests, sessions, and tools.",
  "Use Phoenix or Weave when you want stronger experiment, replay, or dataset workflows.",
  "Use Helicone or Portkey when the leadership problem is provider routing, cost control, and production reliability.",
  "Teach categories first, then tools, so the course stays general for mobile, ERP, hardware-connected, and internal software teams.",
];

```

---

<a name="lesson-enhancements"></a>
## Lesson Enhancements

**Source**: `lessonEnhancements.js`

```javascript
export const LESSON_ENHANCEMENTS = {
  "1.3": {
    leadershipNote:
      "Leaders should require an explicit Assess->Architect->Acquire->Assemble->Assess cadence in weekly operating reviews, not ad hoc AI experimentation.",
    toolingLab: {
      title: "Tooling Lab: Baseline Eval + Trace",
      tools: ["Promptfoo", "Langfuse"],
      steps: [
        "Run one Promptfoo baseline eval for a target workflow.",
        "Capture one Langfuse trace for the same workflow.",
        "Attach both artifacts to your 5-A document and define weekly review cadence.",
      ],
      artifactPath: "/docs/discovery/5a-framework-[feature].md",
    },
  },
  "1.4": {
    leadershipNote:
      "Constraint trade-offs are executive decisions, not engineering details. Leadership must explicitly approve the acceptable balance between Quality, Latency, and Cost for every AI feature before launch.",
  },
  "2.2": {
    leadershipNote:
      "Model selection is a portfolio decision. Leadership should govern routing policy, vendor concentration risk, and margin impact together.",
    toolingLab: {
      title: "Tooling Lab: Gateway Routing Exercise",
      tools: ["Helicone", "Portkey"],
      steps: [
        "Define one low-cost route and one high-quality route.",
        "Set fallback behavior for provider timeout and quality drops.",
        "Document cost and latency tradeoffs for executive sign-off.",
      ],
      artifactPath: "/docs/executive/vendor-strategy.md",
    },
  },
  "2.3": {
    leadershipNote:
      "AI PRDs should be release-control documents. No rollout should proceed without explicit eval criteria, trust boundaries, and operating metrics.",
    toolingLab: {
      title: "Tooling Lab: PRD Evidence Attachment",
      tools: ["Promptfoo", "Langfuse", "W&B Weave"],
      steps: [
        "Link one eval run summary to the PRD.",
        "Link one production-like trace to the PRD.",
        "Define launch-blocking thresholds for quality and risk.",
      ],
      artifactPath: "/docs/ai-prd-[feature].md",
    },
  },
  "3.3": {
    leadershipNote:
      "Tooling decisions should be governed like architecture decisions: ownership, reliability targets, and rollback controls must be explicit.",
    toolingLab: {
      title: "Tooling Lab: Tool Reliability Playbook",
      tools: ["Portkey", "Helicone"],
      steps: [
        "Catalog tools and side effects by risk level.",
        "Add retry, timeout, and fallback strategy per tool.",
        "Define approval gates for any side-effectful action.",
      ],
      artifactPath: "/docs/design/tool-inventory.md",
    },
  },
  "6.1": {
    leadershipNote:
      "Iteration speed is only valuable with control. Executives should track iteration quality, not just deployment velocity. Require a formal Sprint 0 Kickoff to align on eval thresholds before funding engineering.",
    toolingLab: {
      title: "Tooling Lab: Build Loop Operating Run",
      tools: ["Promptfoo", "Langfuse", "Phoenix"],
      steps: [
        "Ship one prompt/context change.",
        "Run eval before and after the change.",
        "Compare trace-level behavior and record what improved or regressed.",
      ],
      artifactPath: "/docs/develop/optimization-log.md",
    },
  },
  "6.2": {
    leadershipNote:
      "A golden dataset is an executive control mechanism, not just an ML artifact. It protects quality consistency during fast releases.",
    toolingLab: {
      title: "Tooling Lab: Multi-layer Evaluation Pack",
      tools: ["Promptfoo", "Phoenix", "W&B Weave"],
      steps: [
        "Create one deterministic rule check and one rubric check.",
        "Add one human calibration checkpoint.",
        "Record regression thresholds and fail conditions.",
      ],
      artifactPath: "/evals/promptfoo/promptfooconfig.yaml",
    },
  },
  "7.1": {
    leadershipNote:
      "Observability is governance infrastructure. If leaders cannot see quality, cost, and failure behavior in near real time, they cannot govern AI risk.",
    toolingLab: {
      title: "Tooling Lab: Production Controls Drill",
      tools: ["Langfuse", "Portkey", "Helicone", "LangSmith"],
      steps: [
        "Define three SLOs: latency, quality, and cost.",
        "Add one alert threshold per SLO.",
        "Simulate one incident and verify escalation path.",
        "Update the AI Risk Register with the findings.",
      ],
      artifactPath: "/docs/deploy/ai-risk-register.md",
    },
  },
  "8.1": {
    leadershipNote:
      "Agent architectures require governance on loop limits, handoff rules, and stop conditions. Autonomy without control is liability.",
    toolingLab: {
      title: "Tooling Lab: Agent Loop Safety",
      tools: ["Langfuse", "LangSmith", "CrewAI", "Phoenix"],
      steps: [
        "Define max-iteration and termination conditions.",
        "Trace one multi-step run and inspect failure path.",
        "Add one human checkpoint for high-risk tasks.",
      ],
      artifactPath: "/projects/agent-architecture.md",
    },
  },
  "9.1": {
    leadershipNote:
      "AI OKRs must pair adoption metrics with quality metrics to prevent teams from scaling a broken or hallucination-prone feature purely to hit usage targets.",
  },
  "10.1": {
    leadershipNote:
      "Capstone readiness should be assessed like a launch board review: evidence-backed quality, economics, risk, and operations all required.",
    toolingLab: {
      title: "Tooling Lab: Launch Readiness Bundle",
      tools: ["Promptfoo", "Langfuse", "Portkey", "Phoenix"],
      steps: [
        "Attach latest eval report.",
        "Attach latest observability trace summary.",
        "Attach guardrail and incident-readiness checks.",
      ],
      artifactPath: "/capstone/",
    },
  },
  "12.1": {
    leadershipNote:
      "Vendor strategy should be reviewed as a recurring leadership discipline, not a one-time procurement task.",
    toolingLab: {
      title: "Tooling Lab: Vendor Scenario Matrix",
      tools: ["Helicone", "Portkey"],
      steps: [
        "Model best/base/worst-case spend scenarios.",
        "Document fallback path across two providers.",
        "Set switching trigger thresholds.",
      ],
      artifactPath: "/docs/executive/vendor-strategy.md",
    },
  },
  "12.2": {
    leadershipNote:
      "Organization design determines execution quality more than model choice at scale.",
    toolingLab: {
      title: "Tooling Lab: Role and Decision Rights Mapping",
      tools: ["Langfuse", "Promptfoo"],
      steps: [
        "Assign ownership for eval thresholds and incident response.",
        "Define weekly and monthly review rhythms.",
        "Map escalation and launch-stop authority.",
      ],
      artifactPath: "/docs/executive/org-design.md",
    },
  },
  "12.3": {
    leadershipNote:
      "Portfolio governance must fund enablers (eval/observability/governance) alongside user-facing bets.",
    toolingLab: {
      title: "Tooling Lab: Portfolio Scorecard Run",
      tools: ["Promptfoo", "Langfuse", "Phoenix"],
      steps: [
        "Score active initiatives by ROI, risk, readiness, and reuse.",
        "Require eval/trace readiness before budget expansion.",
        "Identify bottom 20% bets to pause or kill.",
      ],
      artifactPath: "/docs/executive/ai-portfolio-governance.md",
    },
  },
  "12.4": {
    leadershipNote:
      "Budget governance for AI must include fallback labor, eval overhead, and incident costs, not just model inference.",
    toolingLab: {
      title: "Tooling Lab: Budget and Risk Dashboard Design",
      tools: ["Langfuse", "Helicone", "Portkey"],
      steps: [
        "Define cost, quality, and risk dashboards.",
        "Set alert thresholds and response owners.",
        "Run one tabletop incident simulation.",
      ],
      artifactPath: "/docs/executive/budget-risk-operating-model.md",
    },
  },
  "12.5": {
    leadershipNote:
      "Build vs buy decisions should be revisited at fixed intervals because vendor capabilities and economics change rapidly.",
    toolingLab: {
      title: "Tooling Lab: Build-Buy-Partner Decision Review",
      tools: ["Promptfoo", "Portkey", "Langfuse"],
      steps: [
        "Score one capability across build, buy, and partner paths.",
        "Attach evidence from eval quality and operating cost.",
        "Define a revisit date and invalidation triggers.",
      ],
      artifactPath: "/docs/executive/build-buy-partner-analysis.md",
    },
  },
};

```

---

<a name="capstone-project-dashboard"></a>
## Capstone Project Dashboard

**Source**: `capstoneDashboard.js`

```javascript
export const CAPSTONE_MILESTONES = [
  {
    id: "problem-brief",
    title: "Problem brief and ROI memo",
    description: "AI-shaped problem selected, quantified, and approved.",
    weight: 10,
  },
  {
    id: "solution-architecture",
    title: "System architecture and model routing",
    description: "Context, tools, memory, and model strategy documented.",
    weight: 15,
  },
  {
    id: "working-build",
    title: "Working AI workflow",
    description: "Core build is functional with reproducible demo flow.",
    weight: 20,
  },
  {
    id: "eval-suite",
    title: "Evaluation suite baseline",
    description: "Golden set + LLM judge/human checks + regression protocol.",
    weight: 20,
  },
  {
    id: "guardrails-observability",
    title: "Guardrails and observability",
    description: "Safety controls and trace/metrics instrumentation configured.",
    weight: 15,
  },
  {
    id: "launch-readiness",
    title: "Rollout and launch readiness",
    description: "Rollout checklist, failure modes, and incident plan complete.",
    weight: 10,
  },
  {
    id: "final-demo",
    title: "Final demo and decision memo",
    description: "Demo artifact, retrospective, and go/no-go decision submitted.",
    weight: 10,
  },
];

export const CAPSTONE_READINESS_BANDS = [
  { min: 90, label: "Launch Ready", color: "#00E676" },
  { min: 75, label: "Pilot Ready", color: "#12C48B" },
  { min: 60, label: "Needs Hardening", color: "#FFB800" },
  { min: 0, label: "Not Ready", color: "#FF6B35" },
];

```

---

<a name="google-pm-foundations"></a>
## Google PM: Foundations

**Source**: `google-pm-Foundations_of_Project_Management.txt`

Foundations of Project Management TOC \h \u \z \t &quot;Heading 1,1,Heading 2,2,Heading 3,3,Heading 4,4,Heading 5,5,Heading 6,6,&quot; What is project management? PAGEREF _s885mwv2pq0q \h 2 What is a project? PAGEREF _38zuo1ck6ae5 \h 2 What is project management? PAGEREF _4g29yxr7cxww \h 2 Why is project management? PAGEREF _t8opfyssgum \h 2 What does a project manager do? PAGEREF _azukc8gq7v7k \h 2 A project manager's daily responsibilities PAGEREF _od8b5ib3dgx3 \h 2 ● Planning and organizing: PAGEREF _3sy09so5eoas \h 2 ● Managing tasks: PAGEREF _k2auqknox166 \h 3 ● Managing budgeting and controlling costs and other factors: PAGEREF _w41nk9vqsvd9 \h 3 Project manager roles: PAGEREF _okzc2ctfu3sh \h 3 Introductory-level project management roles PAGEREF _w4361j3nlu4d \h 3 Traditional project management roles: PAGEREF _bigcyw154ztm \h 4 Operational management roles PAGEREF _4wjwzatyb39x \h 4 Agile roles PAGEREF _by184nagvoq \h 5 Q/ What are some of the parts of project management that you're drawn to? PAGEREF _xd2y6whl1a2a \h 5 These duties are nearly a perfect match for your project management skills: PAGEREF _ooh5veopq2eu \h 5 Becoming an effective project manager PAGEREF _v8tmx94tfh7x \h 6 Learning Objectives PAGEREF _drov7dqh9df3 \h 6 The value of a project manager PAGEREF _t34he7zev0vr \h 6 Key project manager roles and responsibilities PAGEREF _zhe03xymyzv5 \h 7 A project manager’s role within a team PAGEREF _eovbp2a0rnqp \h 7 The core skills of a project manager PAGEREF _3kyhb5eo4sf \h 7 Leadership and team dynamics PAGEREF _ujz33dtqcpvz \h 8 The project management life cycle and methodologies PAGEREF _9ie45uyqrckf \h 9 Learning Objectives PAGEREF _uyehqjvmnjg2 \h 9 The project life cycle PAGEREF _ucpvlf57en3p \h 10 Initiate the project PAGEREF _a8xeep2prikg \h 10 Make a plan PAGEREF _ubg3ssxwl575 \h 10 Execute the project PAGEREF _ge7g15qjsi \h 10 Close the project PAGEREF _t1zgtv3a40g8 \h 11 Key takeaway PAGEREF _9thev2rl193v \h 11 Waterfall and Agile Comparison PAGEREF _mr6qk6eeai2x \h 12 Lean PAGEREF _plsgemu6j9w5 \h 13 Six Sigma PAGEREF _spssn70l7rz \h 13 Lean Six Sigma PAGEREF _s9tc3w3g8c2u \h 13 Common project management approaches and how to select one PAGEREF _x6dk628klaws \h 14 What is project management? What is a project? “A project is a unique endeavor, and usually includes a set of unique deliverables.” “A temporary pursuit. It has a defined beginning and an end.” “A project is a series of tasks that need to be completed to reach a desired outcome. Reaching that desired outcome takes collaboration and careful planning that keeps the project on track and on budget.” What is project management? “Project management is the application of knowledge, skills, tools, and techniques to meet the project requirements and achieve the desired outcome.” Why is project management? “Project management helps ensure that a project delivers the expected outcomes, both on time and within budget. This takes collaboration and careful planning.” Example: My job adds value to Google through the core aspects of project management is planning and organizing, managing tasks, and budgeting and controlling costs. What does a project manager do? Project managers usually follow a process that involves planning and organizing , managing tasks , budgeting , controlling costs and other factors. If I'm a project manager: How do I add value to an organization every day? What does the day-to-day life of a project manager look like? A project manager's daily responsibilities Planning and organizing: An example of that might be: Gathering requirements from teammates or customers. This means figuring out what exactly your project's trying to accomplish. You might have a kickoff meeting or send a survey. From here you may also work on creating project plans. Creating project plans is a key part of project management. It helps set the tone of the project, keeps everyone on pace and aligned, and helps move tasks along. Managing tasks: The project manager helps manage tasks for the team members and communicates key milestones to the larger team or customers. This helps keep team members, and customers updated on how the project is progressing. Managing budgeting and controlling costs and other factors: It is a common responsibility that project managers have to understand to keep the project on track and within budget. Project manager roles: C onstruction project manager. IT project manager. Engineering project manager. Operations manager. Program manager. Operations Assistant Project Assistant Project Coordinator Program Assistant Introductory-level project management roles Junior Project Manager: Performs all aspects of being a project manager alongside a more experienced professional. Project Administrator: Assists the rest of the project team with administrative tasks. Project/Program Assistant: Supports team members working on a project and offers administrative support. May perform research or create training documents along with other jobs as assigned by program leaders. Project/Program Coordinator: Participates in hands-on project work and administrative tasks. Works under a project manager to make sure projects are completed on time and within budget. Project Support Specialist: Works alongside a project manager and team members to oversee assigned projects. May also be responsible for training and developing employees to perform designated tasks. Traditional project management roles: Project Manager: Responsible for the initiating, planning, executing, monitoring, and closing of a project. Includes industry-specific titles like IT project manager, construction project manager, or engineering project manager, which utilize skills that are transferable among industries. Project Analyst: Moves a project along by sharing information, providing support through data analysis, and contributing to strategy and performance. Project Leader/Director: Drives core decision-making and sets the direction for the project. Usually knowledgeable about the product or deliverable. Project Controller: Primarily responsible for project planning. You are likely to see this job title in industries like engineering and construction. Technical Project Manager: Conducts project planning and management for identified goals within a company. Ensures that projects are completed to the requirements within a defined time frame and budget. Project Management Office (PMO) Analyst: Manages the progress of complex projects to ensure timely execution and completion. Program managers: Manage a group of projects that are related or similar to one another and handle the coordination of these projects. They facilitate effective communication between individual project managers and provide support where necessary. They also help create and manage long-term goals for their organization. Portfolio managers: Responsible for managing a group of related programs within the same organization. They coordinate various programs in order to ensure they are on track and that the organization is meeting its strategic initiatives. Portfolio managers look at all projects and programs within the organization and prioritize work as necessary. Operational management roles Operations Analyst: Manages and coordinates research, investigates workflows, creates business procedures, and recommends changes to improve the project and company. Operations Manager: Oversees strategic decision-making and rolls out plans of action based on financial, schedule, and resource reporting. Chief Operating Officer: Responsible for overseeing the day-to-day administrative and operational functions of a business. Agile roles Scrum Master: Coordinates and guides the Scrum team. Knowledgeable in Agile framework and Scrum and is able to teach others about the Scrum values and principles. May also be listed as a Technical Program Manager or Technical Project Manager. Product Owner: Drives the direction of product development and progress. Q/ What are some of the parts of project management that you're drawn to? Hint/ While you may not have the answer just yet, thinking about these things can help you find suitable roles later. These duties are nearly a perfect match for your project management skills: Like Creating Monthly Status Reports, Helping To Implement New And Necessary Technologies, Tracking Work Plans And Performance Metrics, Assisting Other Members Of The Operations Team On Given Projects Ensuring Timely Responses To Requests for information. Using buzzwords in your job search Interviews questions: Tell me about a time when you had to juggle several tasks at once? Tell me about a time when you had to influence a customer or a teammate? Becoming an effective project manager Learning Objectives Detail the core skills to be a successful project manager. Describe the role and day-to-day responsibilities of a project manager. Discuss when and why it is necessary to have a project manager. Explain the unique value a project manager brings to their team. Describe a project manager's roles and responsibilities, and list their core skills. The value of a project manager Project managers: Shepherd projects from start to finish and serve as guides for their team, using their impeccable organizational and interpersonal skills every step of the way. Project managers add value to their teams and organizations in key ways that include: Prioritization: Project managers add value to their teams and organizations through effective prioritization of tasks required to complete a project. They're experts at helping team members identify and break down large tasks into smaller steps. There'll be times when a project manager may not know which task to prioritize . To determine which ones are the most critical to the success of the project, they'll connect with their teams and with stakeholders to gather information and make a plan. Stakeholders: are people who are interested in and affected by the project's completion and success, like the leader of an organization. Delegation: Project managers use delegation to add value to their teams and organizations by matching tasks to individuals who can best complete the work. Effective communication: Project managers deliver value through effective communication , both with their team and with key stakeholders. Project managers keep in regular contact with their team about the progress of the work and help identify areas where a teammate may need support. How project managers impact organizations F ocusing on the customer. Building a great project team. Fostering relationships and communication. Managing the project. Breaking down barriers. Key project manager roles and responsibilities Project managers usually follow a process that involves planning and organizing, managing tasks, budgeting, and controlling costs, and other factors, so that the project can be completed within the approved budget and timeframe. P lanning and organizing is making use of productivity tools and creating processes. create plans, timelines, schedules, and other forms of documentation to track project completion Budgeting and controlling costs, and other factors monitor and manage the budget, track issues and risks as they arise, and manage quality by mitigating those issues and risks. removing unforeseen barriers that come up. A project task is an activity that needs to be accomplished within a set period of time by you, your team, or your stakeholders. A project manager’s role within a team How does a project manager go about doing that? hold all team members accountable for their assigned tasks. ensure that issues and risks are tracked and visible, and be able to establish escalation paths. understand and help teammates adopt the right workflows and project management styles. collaborate with other teams at the organization to meet the requirements based on project, scope, schedule, and budget. Working with cross-functional teams The core skills of a project manager enabling decision-making, communicating and escalating, flexibility, and strong organizational skills. Planning and scheduling software (templates, workflows, calendars) Collaboration tools (email, collaboration software, dashboards) Documentation (files, plans, spreadsheets) Quality assurance tools (evaluations, productivity trackers, reports) Leadership and team dynamics Key interpersonal skills communication, negotiation, conflict mediation, and understanding motivations The project management life cycle and methodologies Learning Objectives Explain why it is important to understand and follow the life cycle of a project. Define and outline a project’s phases and each phase’s tasks. Compare different program management methodologies and determine which is most effective for a given project. The main phases of a project are initiating the project, identify the budget and resources you'll need, the people involved in your project, and any other details that can impact the successful completion of your project. Define project goals Determine resources, people, and other project details Get project approval making a plan, your plan needs to include a lot of things for example budget, a breakdown of all the tasks that you need to be completed, ways to communicate team roles and responsibilities, a schedule, resources, and what to do in case your project encounters problems or needs to change. Create a budget Set the schedule Establish your team Determine roles and responsibilities Plan for risk and change Establish communications execute and complete tasks, Your role's a little different. While you might be in charge of completing certain tasks in the project, your primary tasks as the project manager are to monitor progress and keep your team motivated. You also remove any obstacles that might come up so that the tasks are executed well and on time. Manage the process Communicate Make adjustments closing the project. Ensure all tasks have been completed Confirm acceptance of the project outcome Reflect on lessons learned Communicate results with stakeholders Celebrate completing the project Formally move on from the project Closing the project is also a chance to evaluate how the project went. You can make notes of what worked and what didn't so you can plan better for next time. The project life cycle Initiate the project In this phase, ask questions to help set the foundation for the project, such as: Who are the stakeholders? What are the client’s or customer’s goals? What is the purpose and mission of the project? What are the measurable objectives for the team? What is the project trying to improve? When does this project need to be completed? What skills and resources will the project require? What will the project cost? What are the benefits? Make a plan In this phase, make a plan to get your project from start to finish. Create a detailed project plan. What are the major milestones? What tasks or deliverables make up each milestone? Build out the schedule so you can properly manage the resources, budget, materials, and timeline. Here, you will create an itemized budget. Execute the project In this phase, put all of your hard work from the first two phases into action. Monitor your project team as they complete project tasks. Break down any barriers that would slow or stop the team from completing tasks. Help keep the team aware of schedule and deliverable expectations. Address weaknesses in your process or examine places where your team may need additional training to meet the project’s goals. Adapt to changes in the project as they arise. Close the project In this phase, close out the project. Identify that your team has completed all of the requested outcomes. Release your team so they can support other projects within the company. Take time with your team to celebrate your successes! Pass off all remaining deliverables and get stakeholder approval. Document the lessons you and your team learned during the project. Reflect on ways to improve in the future. Key takeaway Each phase of the project life cycle has its own significance and reason for existing. By following the project life cycle, you’re ensuring that you are: Capturing the expectations of your customer Setting your project up for success with a plan Executing project tasks and addressing any issues that arise Closing out your project to capture any lessons learned Waterfall and Agile Comparison Waterfall Agile Project manager's role Project manager serves as an active leader by prioritizing and assigning tasks to team members. Agile project manager (or Scrum Master) acts primarily as a facilitator, removing any barriers the team faces. Team shares more responsibility in managing their own work. Scope Project deliverables and plans are well-established and documented in the early stages of initiating and planning. Changes go through a formal change request process. Planning happens in shorter iterations and focuses on delivering value quickly. Subsequent iterations are adjusted in response to feedback or unforeseen issues. Schedule Follows a mostly linear path through the initiating, planning, executing, and closing phases of the project. Time is organized into phases called Sprints. Each Sprint has a defined duration, with a set list of deliverables planned at the start of the Sprint. Cost Costs are kept under control by careful estimation up front and close monitoring throughout the life cycle of the project. Costs and schedule could change with each iteration. Quality Project manager makes plans and clearly defines criteria to measure quality at the beginning of the project. Team solicits ongoing stakeholder input and user feedback by testing products in the field and regularly implementing improvements. Communication Project manager continually communicates progress toward milestones and other key indicators to stakeholders, ensuring that the project is on track to meet the customer’s expectations. Team is customer-focused, with consistent communication between users and the project team. Stakeholders Project manager continually manages and monitors stakeholder engagement to ensure the project is on track. Team frequently provides deliverables to stakeholders throughout the project. Progress toward milestones is dependent upon stakeholder feedback. Lean The Lean methodology focuses on eliminating waste in an operation to add value at each phase of production. The eight types of waste in manufacturing are defects, excess processing, overproduction, waiting, inventory, transportation, motion, and non-utilized talent. To implement Lean project management, use the 5S method to clean up and organize the workplace and the Kanban scheduling system to optimize the flow of work. 2057400 447675 The 5S method has five steps: sort, set in order, shine, standardize, and sustain. The Kanban board is a visualization tool that uses cards to show progress and coordinate work. Six Sigma Six Sigma is a methodology that aims to reduce variations and ensure quality processes are followed, with a 99.9996% quality standard. Its seven key principles focus on customer satisfaction, understanding work processes, smooth flow, waste reduction, variation removal, team collaboration, and systematic improvement. This methodology involves finding measurable aspects of a product or process, inspecting them, and rejecting any items that do not meet the Six Sigma standard. Lean Six Sigma Lean Six Sigma is a combination of two methodologies that promote efficiency, productivity, and quality in processes and products. Lean streamlines processes by building quality in them while Six Sigma reduces variation in products by building in quality from the beginning and inspecting products to ensure quality standards are met. The use of both methods together can improve project efficiency and lead to better-quality products. Common project management approaches and how to select one Waterfall: a traditional, linear approach with clear quality criteria and a focus on task prioritization and assignment Agile: a collaborative, iterative approach with short phases, frequent testing, and shared responsibility for managing work Scrum: an Agile framework with a focus on developing and delivering complex projects through collaboration, accountability, and Sprints Kanban: a tool used in Agile and Lean approaches to provide visual feedback on work progress through Kanban boards or charts Lean: an approach that eliminates waste and streamlines processes using the 5S quality tool and a Kanban scheduling system Six Sigma: an approach that reduces variations and ensures quality processes are followed using the DMAIC process which stands for define, measure, analyze, improve, and control. Lean Six Sigma: a combination of Lean and Six Sigma approaches that is often used in complex or high-risk projects, with a focus on saving money, improving quality, and moving through processes quickly.

---

<a name="google-pm-project-initiation"></a>
## Google PM: Project Initiation

**Source**: `google-pm-Project_Initiation__Starting_a_Successful_Project.txt`

Project Initiation: Starting a Successful Project TOC \h \u \z \t &quot;Heading 1,1,Heading 2,2,Heading 3,3,Heading 4,4,Heading 5,5,Heading 6,6,&quot; Fundamentals of project initiation - Week 1 3 Learning Objectives 3 Why is project initiation essential? 3 Key components of project initiation 3 Performing a Cost-Benefit Analysis 4 Benefits of a Cost-Benefit Analysis 4 Guiding Questions for a Cost-Benefit Analysis 5 Calculating Costs and Benefits 5 Key Takeaway 6 Defining project goals, scope, and success criteria - Week 2 7 Learning Objectives 7 Determining project goals and deliverables 7 How to set SMART goals 8 Introduction to OKRs 8 Creating OKRs for your project 9 Determining a project's scope 10 Gathering information to define scope 11 Monitoring and maintaining a project's scope 11 Strategies for controlling scope creep 12 Managing changes to a project's scope 13 Launching and landing a project 14 Don't forget to land: Measuring project success 14 Defining success criteria 14 Tracking and communicating success criteria 15 Key Factors for Success: 15 Communication and Alignment: 16 Benefits of Tracking and Communicating Success: 16 Key Points: 16 Same Project, Different Perspectives PDF 16 Using OKRs to evaluate progress 17 Working effectively with stakeholders - Week 3 19 Learning Objectives 19 Introduction: Working effectively with stakeholders 19 Accessibility for project managers 19 Choosing a project team 20 The building blocks of a project dream team 21 Team Size 21 Required Skills 21 Availability and Pre-assignment 21 Diversity 21 Motivation 21 Key Takeaway 21 Defining project roles 22 Key Roles and Responsibilities: 22 Example: Office Green Project Launch 22 Essential project roles 23 Project Manager: 23 Stakeholders: 23 Project Team Members: 23 Project Sponsor: 23 Completing a stakeholder analysis 24 Stakeholder Analysis: A Visual Representation 24 Key Steps for Stakeholder Analysis: 24 Power Grid for Stakeholder Analysis: 24 Stakeholder Management Techniques: 24 Steering Committee: 25 Stakeholder Engagement: 25 Prioritizing stakeholders and generating their buy-in 25 Power Grid for Stakeholder Visualization: 25 Prioritizing Stakeholder Buy-In: 25 Tips for Gaining Stakeholder Buy-In: 25 Steps to Identify and Prioritize Stakeholders | PMI 26 Suggested questions for stakeholders 26 Elements of a RACI chart 27 RACI Chart Benefits: 27 RACI Chart Breakdown: 27 Creating a RACI Chart: 27 Example: 27 RACI Advantages: 27 Building out a RACI chart 28 RACI Chart – An Overview 28 RACI Chart Roles: 28 Organizing a RACI Chart: 28 Assigning the Responsible Role: 28 Assigning the Accountable Role: 28 Assigning the Consulted Role: 29 Assigning the Informed Role: 29 RACI Chart Benefits: 29 Creating an Effective RACI Chart: 29 Getting the most out of a RACI chart 29 Why projects fail: Initiation missteps 30 Factors Leading to Project Failure: 30 Initiation Phase Best Practices: 30 Importance of a Strong Initiation Phase: 30 Additional Tips: 31 How to Maximize Opportunities from Failed Projects 31 Utilizing resources and tools for project success - Week 4 32 Learning Objectives 32 Essential project resources 32 The value of project documentation 33 Project proposals and charters 101 33 Project Proposal 33 Project Charter 34 Project Charter Benefits: 34 Project Charter: A Living Document 34 Project charters: Elements and formats 34 Key Elements of a Project Charter: 34 Formats for Project Charters: 35 Developing a project charter 35 Utilizing tools for effective project management 36 Why Use Project Management Tools? 36 Benefits of Using the Right Tools: 37 Choosing the Right Tools: 37 Types of Project Management Tools: 37 Introducing new tools to a team 37 Key Considerations for Introducing New Tools: 37 Steps to Successful Tool Introduction: 37 Addressing Pushback: 38 Exploring types of project management tools 38 Common project management tools 39 Asana: 39 Spreadsheets: 39 Choosing the Right Tool: 39 Using Google Sheets for project management 39 Demonstrating your knowledge of project management tools 40 Fundamentals of project initiation - Week 1 Learning Objectives Explain the Project Management Certificate program structure and course functionality. Explain the significance of the initiation phase. Describe the key components of the initiation phase. Determine a project’s benefits and costs. Why is project initiation essential? Foundation for Success: A well-planned initiation phase sets the project up for success by establishing a strong foundation. Identifying the Why: Initiation begins after identifying a problem or opportunity within an organization, often initiated by stakeholders like senior leaders. Project Manager's Role: Collaborate with stakeholders to define goals, resources, and other project details. Ask clarifying questions, conduct research, and determine resources. Clearly document key project components to solidify the project scope. Consequences of Poor Initiation: Underestimating resources, timelines, or success criteria. Disagreement with stakeholders about project goals and outcomes. Wasting time and resources throughout the project lifecycle. Cost-Benefit Analysis: Weighing the project's expected value (benefits) against its financial costs. Benefits: Increased value, cost savings, revenue generation, improved user experience, etc. Costs: Time commitment, one-time costs, ongoing costs, long-term costs. Effective initiation ensures the project's benefits outweigh the costs, saving time and resources throughout the project lifecycle. Key components of project initiation Goals: Defined by senior leaders with your input, representing what the project aims to achieve. Scope: Defining the boundaries of the project, and outlining the work required for completion. Deliverables: Tangible (e.g., product features) or intangible (e.g., staff training) products or services created for the project's stakeholders. Success Criteria: Standards used to measure how effectively the project achieves its goals. Stakeholders: Individuals or groups impacted by the project, play a crucial role in defining goals, deliverables, and success criteria. Resources: Budget, people, materials, and other elements required to complete the project. 2711775 390525 Project Charter: A document summarizing project details, including goals, scope, and resources, and serving as a communication tool for stakeholders. Benefits of Effective Initiation: Lays a strong foundation for project success. Ensures clarity on project goals and expectations. Minimizes risks associated with resource constraints or misaligned stakeholder expectations. Performing a Cost-Benefit Analysis A cost-benefit analysis involves calculating the expected value of a project and comparing it to the costs to determine its viability. Cost-benefit analysis compares the benefits of a project to the dollar costs. It is used to evaluate the expected value of a project. Benefits of a Cost-Benefit Analysis Conducting a cost-benefit analysis can help in risk minimization and gain maximization, clear communication with stakeholders, and objective decision-making. Helps minimize risks and maximize gains. Facilitates clear communication with stakeholders and keeps projects on track. Reduces biases and prevents stakeholder self-interest from influencing decisions. Assists in making a strong business case for stakeholders and leadership. Encourages responsible resource investment and waste reduction. Guiding Questions for a Cost-Benefit Analysis To ensure the benefits of a project outweigh the costs, certain guiding questions should be considered for both tangible and intangible aspects. Determine project benefits by asking about value creation, cost savings, revenue generation, time savings, and customer experience improvement. Assess project costs by considering time investment, one-time costs, ongoing costs, and long-term costs. Evaluate intangible benefits like customer satisfaction, employee satisfaction, productivity, and brand perception. Consider intangible costs that may affect customer retention, employee morale, or brand perception. Assign values to costs and benefits by referencing past projects, conducting research, or consulting experts. Calculating Costs and Benefits Calculating return on investment (ROI) involves comparing the upfront and ongoing costs of a project to its benefits over time using a common formula. ROI calculation compares financial gains (G) to the upfront and ongoing investment costs (C). An example! You've accurately calculated the ROI (Return on Investment) of the project and correctly interpreted the result. Here's a breakdown of the steps you took: Identified costs and benefits: Cost: $6,000 upfront + ($25/month * 12 months) = $6,300 Benefit: $10,000 in revenue Assigned values: Cost: $6,300 Benefit: $10,000 Calculated ROI: ROI = (Benefits - Costs) / Costs ROI = ($10,000 - $6,300) / $6,300 ≈ 0.5873 Interpreted ROI: Convert the decimal to a percentage: 0.5873 * 100% = 58.7% Compared the ROI to a benchmark (e.g., 10%): 58.7% &gt; 10% Since the ROI is positive (58.7%) and exceeds the benchmark, it suggests that the project's potential benefits outweigh the costs. This aligns with your decision to pursue the project. Key Takeaway A cost-benefit analysis is crucial for determining the feasibility of new projects by ensuring that benefits outweigh costs, using guiding questions and an ROI formula as references. Cost-benefit analysis is essential for project evaluation. Use the provided guiding questions and ROI formula to assess project viability. Defining project goals, scope, and success criteria - Week 2 Learning Objectives Define and create measurable project goals and deliverables. Define project scope and differentiate among tasks that are in-scope and out-of-scope. Explain how to manage scope creep to avoid impacting project goals Define and measure a project’s success criteria. Determining project goals and deliverables Project Goals: Desired outcomes of a project, what you are trying to achieve (e.g., improve customer response time by 20%). Importance of Well-Defined Goals: Provide direction and a roadmap for the project. Facilitate clear communication with stakeholders and team members. Enable measurement of progress towards success. Characteristics of Well-Defined Goals: Specific: Clearly define what needs to be achieved. Measurable: Quantify success through metrics (e.g., percentages, timelines). Agreed-Upon: Ensure alignment with stakeholder expectations. Realistic: Consider available resources and time constraints. Time-Bound: Set a clear deadline for achieving the goal. (SMART Goals) Project Deliverables: Tangible outputs or results produced during the project (e.g., reports, website, email templates). Importance of Well-Defined Deliverables: Clearly communicate project outputs to stakeholders. Facilitate measurement of progress towards goals. Ensure everyone is accountable for achieving goals. Examples: Goal: Improve customer response time by 20%. Deliverable: Create email templates for frequently asked questions. Goal: Increase Office Green revenue by 5%. Deliverables: Launch plant service, and create a website to showcase new plants. How to set SMART goals SMART Goals: A framework for creating well-defined project goals. Benefits: Improve goal clarity and focus. Facilitate measurement of progress. Increase the likelihood of achieving goals. SMART Criteria: Specific: Clearly define what needs to be achieved (answer who, what, when, where, and why). Measurable: Establish metrics to track progress and determine success. Attainable: Set goals that are achievable but challenging. Relevant: Ensure goals align with overall project objectives and priorities. Time-Bound: Set deadlines for achieving goals. Example: Unclear Goal: Improve customer service response time. SMART Goal: Reduce average customer email response time by 20% within 3 months. Introduction to OKRs OKR is an acronym for objectives and key results. Objectives define what needs to be achieved and describe a desired outcome. Key results define how the project team knows whether or not they have met their objective. OKR (Objectives and Key Results): A goal-setting framework combining objectives with measurable outcomes. Benefits: Improved focus and alignment on organizational goals across different levels. Establishment of ambitious yet achievable goals. Clear definition of success metrics for goal achievement. Components: Objectives: Define what needs to be achieved (desired outcomes). Key Results: Measurable metrics used to track progress toward objectives and determine success. Example: Company Objective: Increase customer retention by adapting to changing workplace environments. Project Objective (Plant Pals): Enroll existing customers in the Plant Pals service. Key Result: 25% of existing customers signed up for the Plant Pals pilot. 19051 114300 Creating OKRs for your project OKR (Objectives and Key Results): A goal-setting framework used to define ambitious yet achievable goals with measurable outcomes. Benefits for Project Management: Clarify project goals and deliverables. Establish project scope and manage project requests. Motivate project teams by setting challenging goals. Components: Objectives: Define what the project aims to achieve (desired outcomes). They should be: Ambitious and aspirational. Aligned with organizational goals. Action-oriented. Concrete and specific. Significant and impactful. Key Results: Measurable metrics used to track progress towards objectives and determine success. They should be: Time-bound (with deadlines). Results-oriented, not focused on tasks. Measurable and verifiable. Specific and avoid ambiguity. Aggressive yet achievable (challenging but attainable). Creating OKRs for Your Project: Set Objectives: Consider the project vision and goals. Ask: Does the objective contribute to achieving overall project goals? Does it align with company and department OKRs? Is it inspiring and motivating for the team? Will achieving it have a significant impact? Develop Key Results: Create 2-3 key results per objective. Ask: What defines success for the objective? What metrics indicate successful achievement of the objective? Best Practices: Objectives: Motivational and inspiring. Key Results: Tactical and specific. Develop 2-3 key results per objective. Document OKRs and link them to the project plan. Determining a project's scope Project Scope: Defines the boundaries and deliverables of a project. Importance: Ensures clarity and avoids confusion about project goals and deliverables. Minimizes risks associated with project changes. Facilitates better project planning and resource allocation. Components: Deliverables: Products, services, or outcomes produced by the project. Timeline: The timeframe for project completion. Budget: The allocated financial resources for the project. Resources: People, equipment, materials, and other assets required for the project. Stakeholders: Individuals or groups impacted by or interested in the project. Questions to help you determine the scope: Where did the project come from? Why is it needed? What is the project expected to achieve? What does the project sponsor have in mind? Who approves the final results? Defining Project Scope: Involve project sponsors and stakeholders in discussions. Identify project goals and objectives. Determine deliverables, timeline, budget, and resources. Establish what is included and excluded from the project. Document the project scope statement for reference. Best Practices: Define scope early in the project planning stage. Continuously monitor and manage scope throughout the project lifecycle. Use clear and concise language in the project scope statement. Obtain formal approval for any scope changes. Example: Project: Launch of a new plant delivery service (Plant Pals) by Office Green. Scope Considerations: Replacement plants included/excluded? Customer segments targeted. Online catalog format (website, app, or both). Customer purchase methods (phone, PC, Mac, iPhone, Android). Paper catalog dimensions, color, and paper type. Gathering information to define scope Key Questions to Define Scope: Stakeholders: Who requested the project? Who approves the scope? Goals: What is the reason for the project? What are the desired outcomes? Deliverables: What specific products or services will be produced? Resources: What materials, equipment, and people are needed? Budget: What are the allocated financial resources for the project? Schedule: What is the timeframe for project completion? Flexibility: How much flexibility is there in terms of budget, schedule, and quality? Example: Renovating a restaurant dining space. Questions to Ask: Who requested the update (owner, customers, etc.)? What are the reasons for the update (improvements needed, etc.)? Which specific area(s) need updating? What type of renovation is needed (remodel, furniture update, etc.)? What materials, equipment, and labor are required? What is the budget for the project? What is the deadline for completion? What is the priority (budget, schedule, or quality)? Best Practices: Ask questions to clarify missing information about the project scope. Ensure understanding of the &quot;who, what, when, where, why, and how&quot; of the project. Define scope during the project initiation phase to set a strong foundation. Monitoring and maintaining a project's scope In-Scope vs. Out-of-Scope: In-Scope: Tasks that directly contribute to the project's goals and are included in the project plan. Out-of-Scope: Tasks that are not included in the project plan and fall outside the project's boundaries. Scope Creep: Uncontrolled changes in project scope after the project begins. It can negatively impact project timelines, budgets, resources, and risks. Causes of Scope Creep: External: Changes requested by stakeholders. Shifting business environment. Changes in the underlying technology. Internal: Unclear project requirements before defining scope. Team member suggestions or process changes. Preventing Scope Creep: External: Stakeholder visibility into project details. Clear requirements and expectations before the project starts. Defined change request process and approval procedures. Written agreements on project scope and expectations. Internal: Clear communication with the project team about scope boundaries. Understanding that any changes impact budget, schedule, and risk. Best Practices: Monitor project scope throughout the project lifecycle. Proactively manage scope creep to protect project success. Clearly define in-scope and out-of-scope tasks. Strategies for controlling scope creep Best Practices for Scope Management: Define Project Requirements: Clearly document project goals and deliverables during initiation. Set a Clear Project Schedule: Outline tasks and milestones to manage time effectively. Communicate Scope Boundaries: Ensure stakeholders understand what's in and out of scope. Provide Alternatives: Offer alternative solutions or highlight potential risks of scope changes. Establish a Change Control Process: Define a process for reviewing and approving changes. Learn to Say No: Explain how out-of-scope requests impact budget, timeline, and resources. Track Costs of Out-of-Scope Work: Document costs associated with any unplanned work. Importance of Scope Management: Reduces project stress and risk. Protects project budget, timeline, and resources. Improves communication and expectation management. Increases the likelihood of project success. Managing changes to a project's scope Project Scope Management: Delivering the project according to agreed-upon scope, timeline, and budget. Triple Constraint Model: The three interrelated limitations of any project: Scope: Features and functionalities of the project. Time: Project schedule and deadlines. Cost: Budgetary resources for the project. 657225 304800 Impact of Changes: Changes to one constraint impact the others. Reducing costs might require extending time or limiting scope. Increasing time might require reducing scope or increasing cost. Making Trade-Offs: Prioritize project goals (scope, time, cost) to make informed decisions. Example: If a strict deadline exists, prioritize time and limit scope changes to meet it. Project Management Role: Evaluate scope change requests considering the triple constraint and stakeholder input. Scenario Examples: Adding self-watering pots to Plant Pals (increased scope, extended timeline, but no budget increase). Reducing Plant Pals budget without scope changes (extended timeline). Tightening Plant Pals delivery timeline (reduced scope, e.g., fewer shipping options, but no budget increase). Meeting a strict Plant Pals deadline (increased budget and scope changes allowed). Importance of the Triple Constraint Model: Helps navigate project changes while achieving project goals. Provides a framework for project planning and communication. Offers tools to evaluate and manage scope changes. Launching and landing a project Project Launch: Delivering the final project deliverables (e.g., website, product). Project Landing: Measuring the project's success against predefined criteria. Importance of Landing: Landing goes beyond just launching the project. It ensures the project achieves the desired outcome. It measures project success based on established criteria. Example: Launching the Plant Pals service (website, catalogs) is not enough for success. Landing requires measuring customer satisfaction, plant health, and revenue growth after launch. Success Criteria: Specific details and goals used to measure project success. Benefits of Success Criteria: Defines standards for project evaluation. Increases the likelihood of a smooth project landing. Don't forget to land: Measuring project success Project Launch vs. Landing: Launch: Delivering the final project deliverables (e.g., website, product). Landing: Measuring the project's success against predefined criteria. Importance of Landing: Landing ensures the project achieves the desired outcome, not just a product launch. It requires measuring project success based on established success criteria and goals (SMART goals). Example: Launching a recycling training program isn't enough. Landing requires measuring a 20% increase in recycling rates over five years. Common Mistake: &quot;Launch and Forget&quot; - Failing to measure project success after launch. Project Landing Benefits: Improves team alignment on project goals. Increases visibility on achieving project success. Key Takeaway: Both launch and landing are crucial for project success. Measure success using defined metrics and revisit project goals after launch. Defining success criteria Project Landing: Measuring project success against predefined criteria. Success Criteria: Specific details and goals used to measure project achievement. Creating Success Criteria: Review project goals, deliverables, scope, and budget/schedule. Get stakeholder input on project requirements and success expectations. Document and share success criteria for reference. Metrics for Success: Measurable aspects that track project progress: Happiness Metrics: User satisfaction, perceived ease of use (surveys). Adoption Metrics: User acceptance and initial product/service use. Engagement Metrics: Frequency and quality of user interaction over time. Business Metrics: Sales, revenue growth, customer retention/renewal. Tracking Success: Use appropriate tools (spreadsheets, dashboards, surveys, project management software). Establish data collection methods for each success criterion. Conduct regular reviews (e.g., monthly) to monitor progress. Communication and Alignment: Share success criteria with stakeholders for review and approval. Ensure a clear understanding of project goals, tasks, and responsibilities. Maintain project visibility and communicate progress to the team. Benefits of Defined Success Criteria: Improved team alignment and focus on measurable goals. Increased visibility into project success and areas for improvement. Prioritization of efforts based on user impact. Tracking and communicating success criteria This passage discusses how to measure and communicate the success of a project after it's launched (landing). Key Factors for Success: Product Quality: Attributes like completeness, quality of features, and usability. Use a checklist of product requirements to ensure all necessary features are included (e.g., saving, and printing for a word processor). Track metrics like the number of features delivered, defect rates, and completion of priority requirements. Customer/Stakeholder Satisfaction: Fulfilling their needs and expectations. Consider strategic goals like user adoption or exceeding existing products' features (e.g., collaborative word processing). Track metrics like user engagement, customer satisfaction surveys, and sales data reflecting user adoption. Communication and Alignment: Involve stakeholders in defining success criteria (what success looks like for the project). Document and share success criteria with all stakeholders for alignment and to avoid misunderstandings. Regularly report on progress towards success criteria throughout the project lifecycle. Benefits of Tracking and Communicating Success: Helps identify areas for improvement. Ensures everyone involved is on the same page regarding project goals. Reduces the risk of scope creep (uncontrolled project changes) and unmet expectations. Key Points: Project success involves both product quality and user/stakeholder satisfaction. Track relevant metrics to measure progress towards success criteria. Clear communication and ongoing alignment are crucial for a successful project landing. Same Project, Different Perspectives PDF How to manage the expectations of stakeholders when defining success criteria. This passage describes a common challenge for project managers (PMs): dealing with various stakeholders who have different perspectives and priorities for a project. The Problem: Stakeholders have conflicting views on project goals, deliverables, and success criteria. New PMs might struggle to understand these differences and manage them effectively. The Solution (3 Steps): Understand: Identify each stakeholder's position and the reasoning behind it. Consider their interests, concerns, and potential biases. Analyze how their position aligns with others and the overall project goals. Assess: Determine the relative importance of each stakeholder's perspective. Sponsor's view is typically significant but might have its own biases. Consider the motivations and priorities of all stakeholders throughout the project. Adapt: Tailor your approach based on stakeholder needs. Communication adjustments are key: Provide targeted communication addressing each stakeholder's interests (e.g., finance focuses on budget updates). Offer context and explanations for project decisions. Not all adaptations require project management changes. Additional Tips: Avoid generic status updates; personalize communication for each stakeholder group. Stakeholders are an inherent challenge in project delivery, but understanding their needs leads to better management. Key Points: Successful project management requires considering diverse stakeholder perspectives. Effective communication is crucial for aligning stakeholders and managing expectations. Using OKRs to evaluate progress OKRs (Objectives and Key Results) are a goal-setting framework that combines qualitative objectives with measurable key results to define success criteria for projects. Objectives: Define what you want to achieve (desired outcome). Key Results: Measurable metrics that define achieving the objective. Benefits of OKRs: Define, communicate, and measure shared success criteria for project teams. Improve focus and alignment of team efforts toward project goals. Track progress and identify areas for improvement. Using OKRs in Projects: Create OKRs: Define objectives and key results specific to your project. Communicate OKRs: Share OKRs with your team so everyone understands project goals. Assign Owners: Assign ownership to each key result for clear accountability. Measure Progress: Track progress and score OKRs regularly (e.g., monthly). Scoring methods: Simple Yes/No for completion of key results. Percentage completion or scale (e.g., 0-10) for progress. Google's 0.0-1.0 scale with an average target of 0.6-0.7. Schedule Checkpoints: Hold regular meetings (e.g., monthly) to discuss progress and address issues. Key Points: OKRs are a valuable tool for setting measurable goals and tracking project success. Effective OKR usage requires clear communication, ownership assignment, progress tracking, and regular check-ins. Scoring helps assess progress but shouldn't be the sole indicator of project success. Feature OKRs Project Landing Purpose Define measurable goals and track progress towards project success criteria. Measure overall project achievement against predefined criteria. Focus Goal Setting: What do we want to achieve? Outcome Measurement: Did we achieve what we set out to do? Components * Objectives (qualitative) * Key Results (measurable metrics) * Success Criteria (specific details and goals) * Metrics (measurable aspects to track progress) Example * Objective: Improve customer satisfaction. * Key Result 1: Increase customer satisfaction score by 10% within 6 months. * Key Result 2: Reduce customer churn rate by 5% within 6 months. * Success Criteria: Launch a new loyalty program with 20% customer signup within the first month. * Metric: Track the number of customer sign ups for the new loyalty program. Timeline Established throughout the project lifecycle, with regular reviews and adjustments. Defined at the beginning of the project and measured upon completion. Communication Shared with the project team to ensure alignment and focus efforts. Shared with stakeholders to demonstrate project success and value. Working effectively with stakeholders - Week 3 Learning Objectives Define project roles and responsibilities. Complete a stakeholder analysis and explain its significance. Utilize RACI charts to define and communicate project team member responsibilities. Introduction: Working effectively with stakeholders This module dives into the world of project stakeholders, the individuals and groups with a vested interest in your project's success. Understanding Stakeholders: Stakeholders are anyone who can be impacted by or influence the project. They encompass a wide range of people, including project sponsors, customers, team members, and the project manager. Each stakeholder has a unique perspective and level of involvement in the project. Importance of Stakeholder Management: Effective stakeholder management is crucial for project success. By understanding stakeholder needs and expectations, you can: Improve communication and collaboration. Manage risks more effectively. Secure resources and funding. Increase overall project buy-in. Stakeholder Analysis and Tools: Stakeholder mapping helps visualize stakeholders and their relationships to the project. RACI charts (Responsible, Accountable, Consulted, Informed) clarify roles and responsibilities for each task. This module will equip you with the skills to identify, understand, and manage stakeholders, ensuring a smooth and successful project journey. Accessibility for project managers This session introduces the concept of accessibility in project management, led by accessibility instructor Holly. Why Accessibility Matters: Everyone benefits from accessible design, including people with disabilities, those with temporary limitations, and the broader population. Over 1 billion people globally have a disability. Accessibility removes barriers to information, technology, and experiences, creating a more level playing field for everyone. P roject Management and Accessibility: Project managers are responsible for creating an inclusive environment where everyone can contribute. Accessible project management practices ensure everyone on the team can participate effectively, regardless of ability. Considering accessibility from the outset leads to better project outcomes and benefits everyone. Examples of Accessibility Features: Features originally designed for accessibility, like voice control or closed captions, benefit everyone. Learning Objectives: Understand the importance of accessibility in project management. Recognize how accessible design benefits a wider audience. Learn best practices for incorporating accessibility into project management. Accessibility is an ongoing process, and this course will equip you with the knowledge and skills to make your projects inclusive and successful. Choosing a project team This video explores how to identify and assign project team roles and responsibilities. Key Considerations: Project Needs: Identify the tasks required to complete the project and the skill sets needed for each task. Team Size: Determine the optimal team size based on project complexity and communication needs. Individual Skills and Availability: Match team members with the appropriate skills and experience for their assigned roles. Consider each team member's availability and workload on other projects. Recognize that skills can be learned, and a positive attitude and attention to detail are valuable assets. Motivation: Select team members who are enthusiastic and motivated to contribute to the project's success. If team members are assigned by others, focus on maximizing your project's outcome with the available resources. Example: An Office Green project manager needs to assemble a team to launch a new service. The project manager considers factors like team member experience, location, and workload to determine who is best suited for each role. Tips: Ask yourself key questions: How many people are needed at each project stage? When are specific team members needed? Who has decision-making authority regarding project resources? There's no one-size-fits-all approach. Different projects require unique combinations of skills, experience, and perspectives. By carefully considering these factors, you can build a strong, well-rounded project team that is well-positioned for success. The building blocks of a project dream team Team Size Balance the team size with the complexity of the project. Project managers need to find the right balance in team size based on the project's requirements. Required Skills Projects have multiple roles, which can be filled by one person in smaller teams. Technical skills are essential for specialized projects, while interpersonal skills are necessary for collaboration. Problem-solving skills and leadership skills are underrated yet crucial skill sets for project team members. Availability and Pre-assignment Availability is a significant concern, especially in matrix organizations. Pre-assignment occurs when the sponsor assigns team members to the project. Diversity Diversity is a valuable asset for project teams, as it encourages creativity and better decision-making. Encourage conversations about differences to build trust and foster a safe environment for sharing perspectives. Motivation Note the motivation levels of team members and their impact on the project. As a project manager, engage and motivate the team, maintaining a positive outlook during adversity. Key Takeaway The building blocks of a project dream team are team size, skills, availability, and motivation. Project managers create dream teams through collaboration and leadership, not just by selecting them. By considering these factors, project managers can effectively build, lead, and engage their project dream teams. Defining project roles This video emphasizes the importance of well-defined project team roles for successful project execution. Key Roles and Responsibilities: Project Sponsor: Approves project budget and ensures alignment with vision. Provides leadership and resources throughout the project. Example: In the Office Green project, the Director of Product is the sponsor. Team Members: Execute the project tasks on a day-to-day basis. May wear multiple hats in smaller organizations. Example: The Office Green marketing department supports the launch by creating customer awareness campaigns. Customers: The end users who benefit from the project's deliverables. Their needs define project requirements. Example: Office managers or procurement teams who purchase Office Green's plant services. Users: The individuals who directly utilize the project's output. May differ from customers in certain scenarios. Example: Employees who enjoy the improved work environment created by Office Green's plants. Stakeholders: Anyone with a vested interest in the project's success. Can be primary (directly impacted) or secondary (indirectly impacted). Example: Primary Stakeholders: Office Green investors funding the launch, employees who benefit from the plants. Secondary Stakeholders: Office Green receptionist answering customer inquiries about the new service. Project Manager: Plans, organizes, and oversees the entire project lifecycle. You! Example: Office Green Project Launch SMART Goal: Roll out a new plant service to top clients by year-end. Project Sponsor: Director of Product Team Members: Marketing department for customer awareness, landscape designer (also website designer). Customers: Office managers or procurement teams. Users: Employees who enjoy the plants in the office. Stakeholders: Investors, receptionist, and anyone else impacted by the project's success. Key Takeaway: Clearly defining project roles and responsibilities from the outset ensures a well-coordinated team effort and a higher chance of project success. Essential project roles This lesson dives deeper into core project roles and their associated responsibilities. Project Manager: Overall Project Success: Responsible for the entire project's outcome and team dynamics. Team Management: Utilizes various skills like team-building, motivation, communication, and conflict resolution to ensure a strong team environment. Project Management Plan: Develops and oversees the project management plan, including directing work, documenting reports, controlling changes, and monitoring quality. Stakeholder Engagement: Manages project scope, schedule, and cost while effectively engaging stakeholders. This requires strong communication, negotiation, and conflict management skills. Stakeholders: Individuals or Groups Invested in Project Success: Have varying levels of impact and influence on the project. Primary Stakeholders (Key Stakeholders): Directly affected by the project's outcome. Examples: Team members, senior leaders, customers. Secondary Stakeholders: Indirectly affected by the project's outcome. Example: A project's legal point of contact who processes contracts. Project Team Members: Primary Stakeholders: Crucial for project execution. Team Composition: Varies depending on project type, complexity, and size. Selection Considerations: Technical skills, interpersonal skills, and team diversity. Project Sponsor: Primary Stakeholder: Initiates the project and secures resources. Responsibilities: Presents a business case for the project. Signs the project charter. Allocates resources to the project manager. Frequent Communication: Essential throughout all project phases. Key Takeaways: Every project has a project manager and primary stakeholders (team members, senior leaders, customers, sponsor) directly impacted by the outcome. Secondary stakeholders with an indirect impact may also be involved. Understanding these roles is essential for effective project management. Completing a stakeholder analysis This video explains how to conduct a stakeholder analysis to effectively manage project stakeholders. Stakeholder Analysis: A Visual Representation Helps identify all project stakeholders. Mitigates surprises, fosters partnerships, and ensures the right people are involved at the right time. Benefits: Improved understanding of success opportunities and potential risks. Clarification of stakeholder responsibilities. Informed decisions about stakeholder involvement in key discussions. Key Steps for Stakeholder Analysis: Identify Stakeholders: List everyone impacted by the project. Assess Interest and Influence: Interest: How much a stakeholder's needs are affected by the project. Influence: How much power a stakeholder has to impact the project outcome. Participation Assessment: Evaluate stakeholder ability to participate in the project. Determine how to involve them effectively. Power Grid for Stakeholder Analysis: A tool to categorize stakeholders based on interest and influence. High influence and high interest = Key Stakeholders (critical for project success). Different quadrants of the grid suggest appropriate stakeholder management techniques. Stakeholder Management Techniques: Key Players (Top Right): Closely partner with them to achieve desired outcomes. Monitor and Manage (Top Left): Consult with them and address their needs. Keep Informed (Bottom Right): Provide regular updates to maintain their awareness. Monitor (Bottom Left): Keep them informed but minimize active involvement. Steering Committee: Composed of high-influence and high-interest stakeholders. Most senior decision-making body for the project. Approves project changes and updates. Project manager facilitates discussions and presents information to the committee. Stakeholder Engagement: Tailored communication strategies for different stakeholder groups. Frequency and detail of communication vary depending on stakeholder needs. Goal: Achieve stakeholder buy-in through informed decision-making and shared goals. Key Takeaways: Stakeholder analysis is crucial for understanding project stakeholders and their impact. The power grid helps categorize stakeholders for effective management. Communication strategies should be tailored to each stakeholder group. Prioritizing stakeholders and generating their buy-in Power Grid for Stakeholder Visualization: Plots stakeholders based on interest vs. influence (four quadrants). Helps determine appropriate stakeholder management techniques. High Influence, High Interest (Upper Right): Manage closely, involve in decision-making, provide regular communication. High Influence, Low Interest (Upper Left): Provide executive summaries, periodic updates, focus on organizational impact. Low Influence, High Interest (Bottom Right): Provide regular updates, address concerns, seek feedback. Low Influence, Low Interest (Bottom Left): Provide general communication, address specific questions, minimal engagement. Prioritizing Stakeholder Buy-In: 3067050 181431 Analyze stakeholders and determine who requires buy-in for project success. Key stakeholder buy-in is crucial for securing resources and preventing project deprioritization. Tips for Gaining Stakeholder Buy-In: Align project work with stakeholder goals. Explain project alignment with stakeholder department/team goals. Listen to and incorporate stakeholder feedback into the project charter (when appropriate). Manage expectations by presenting a realistic view of team capabilities (avoid over-promising). Key Takeaways: Stakeholder analysis is crucial for prioritizing stakeholders and managing expectations. The power grid helps categorize stakeholders for tailored communication and engagement strategies. Gaining key stakeholder buy-in is essential for project success. Steps to Identify and Prioritize Stakeholders | PMI Here are key takeaways for identifying and prioritizing stakeholders at project kickoff: Brainstorm with your team to create a comprehensive stakeholder list (internal/external). Leverage project documents (scope, benefits plan, etc.) to identify stakeholders. Develop a standard set of questions to guide stakeholder discovery. How can I approach stakeholder identification as a discovery process, continuously seeking new leads? What set of questions, tailored to each project, can help reveal various project aspects, including stakeholders? Which personnel from enabling areas (purchasing, legal, audit, etc.) should I involve to capture all stakeholders? How can I balance the importance of stakeholder analysis for building trust and buy-in with time constraints? Create a stakeholder matrix to categorize them based on influence and impact: Manage Closely: Key stakeholders involved throughout the project. Keep Satisfied: Address their needs, but avoid overwhelming communication. Monitor: Track their involvement as the project progresses. Keep Informed: Share need-to-know information to manage anxieties. Utilize governance forums to validate your stakeholder list and potentially identify new ones. By following these strategies, project managers can effectively identify stakeholders and prioritize their engagement, leading to project success. Suggested questions for stakeholders What are your most important priorities/goals? How will this initiative/project support you and your most important priorities? What role would you like to play within this initiative/project? Here’s how I plan to keep people informed; does that work for you? What can I clarify for you? What are your expectations? What would you like for the project to accomplish? What would success look like for you? Who else do you recommend I reach out to about this initiative? What information or insights do you have that might be challenging for me to find? Where do you see me getting support for this initiative? Facing resistance? What additional thoughts/questions do you have? Elements of a RACI chart This video explains RACI charts, a tool to define project roles and responsibilities for efficient task completion. RACI Chart Benefits: Clarifies roles and assigns clear direction for each team member. Defines four participation types: Responsible, Accountable, Consulted, Informed (RACI). RACI Chart Breakdown: Responsible (R): Performs the task. Accountable (A): Owns the task's completion. (Only one accountable per task) Consulted (C): Provides feedback and expertise. Informed (I): Kept up-to-date on progress and decisions. Creating a RACI Chart: List project tasks or deliverables. List project roles or people's names (use roles if applicable). Assign RACI designations for each task/role combination: Ask: Who does the work (Responsible)? Who's accountable for completion (Accountable)? Who should be consulted for input (Consulted)? Who needs to be informed (Informed)? Assign RACI letters (R, A, C, I) based on answers. Example: Project: Office Green's new service launch Task: Create price points for packages and delivery frequencies. R: Financial Analyst (performs the analysis) A: Head of Finance (owns keeping the project within budget) C: Director of Product (provides input on product offerings) I: Sales Team (needs to know final pricing) RACI Advantages: Prevents confusion by clearly defining ownership (one accountable per task). Avoids unbalanced workloads, unclear hierarchy, overlapping work, and excessive communication. Conclusion: Proactive RACI analysis helps ensure project success by resolving or preventing role and communication issues. Building out a RACI chart This guide explores RACI charts, their components, and how project managers use them to define roles and responsibilities. RACI Chart – An Overview RACI stands for Responsible, Accountable, Consulted, Informed. A RACI chart clarifies roles and assigns direction for each project team member and stakeholder. It can also be called a Responsibility Assignment Matrix (RAM) or RACI diagram/matrix. RACI Chart Roles: Responsible (R): Performs the task (can have multiple people assigned). Accountable (A): Owns task completion (only one accountable per task). Consulted (C): Provides input and feedback. Informed (I): Kept up-to-date on progress and decisions (can have many people assigned). Organizing a RACI Chart: There's no single format; it can vary based on preference, project size, and people involved. Assigning the Responsible Role: Consider the department and individual performing the work. Example: Assigning &quot;Financial Analyst&quot; to develop price points for Office Green's project. Assigning the Accountable Role: Identify who ensures task completion and has final approval authority. Example: Assigning &quot;Head of Finance&quot; for Office Green's price points (responsible for budget). Assigning the Consulted Role: Include those with valuable input or subject matter expertise (SMEs). Example: Assigning &quot;Director of Product&quot; for Office Green's price points (impacted by product offerings). Assigning the Informed Role: Identify those who need to know the final decisions and task completion status. Example: Assigning &quot;Sales Team&quot; for Office Green's price points (needs information for selling). RACI Chart Benefits: Defines and documents project roles and responsibilities. Provides direction for each team member and stakeholder. Ensures efficient work completion. Helps analyze and balance team workload. Creating an Effective RACI Chart: Refining the chart with revisions may be necessary. Upfront effort in creating a RACI chart saves time and prevents communication issues later. Consider using a view-only project plan or meeting notes to efficiently keep the &quot;informed&quot; group updated. Conclusion: A RACI chart is a valuable project management tool that promotes clarity, direction, and efficiency by ensuring everyone understands their roles and responsibilities. Getting the most out of a RACI chart Balance Workload: A RACI chart helps avoid overloading team members and promotes even distribution. Stakeholder Buy-in: Share the RACI chart to get approval and alignment, documenting acknowledgment. Clear Expectations: RACI charts streamline communication and decision-making. Evaluate Usage: Consider the project's complexity and team size when deciding to use a RACI chart. Creating a RACI chart contributes to your project management experience, even if it's not used. Why projects fail: Initiation missteps This passage discusses common project failures caused by mistakes made during the initiation phase. Factors Leading to Project Failure: Unclear Expectations: Omitted questions about goals, deliverables, schedules, budgets, and stakeholders at project initiation. Unrealistic Expectations: Setting unrealistic deadlines or agreeing to them without understanding project requirements. Miscommunication: Ineffective communication regarding risks, decisions, scope changes, and stakeholder involvement. Lack of Resources: Insufficient team members, budget, or materials due to poor planning. Scope Creep: Unmanaged project scope growth that impacts budgets, schedules, and quality. Initiation Phase Best Practices: Clearly define project goals, deliverables, schedules, budgets, and stakeholders. Avoid setting unrealistic deadlines by gathering information before making commitments. Develop a communication plan outlining communication methods and stakeholder involvement. Ensure the availability of necessary team members, budget, and materials. Define the project scope and have a plan for managing scope creep. Importance of a Strong Initiation Phase: Increased project success rates through clear expectations and planning. Opportunity to learn and improve project management skills from failures. Additional Tips: Document all decisions and discussions during the initiation phase. Establish a process for approving scope changes and managing their impact. Conduct a stakeholder analysis to understand communication needs. Use a RACI chart to assign communication roles (Responsible, Accountable, Consulted, Informed). By following these best practices and focusing on clear communication and planning during project initiation, project managers can significantly increase their chances of project success. 7 Project Failures and What We Can Learn from Them (project-management.com) How to Maximize Opportunities from Failed Projects Projects don't always go according to plan. Here's how to turn those setbacks into learning experiences for you and your team: Stop Blaming, Start Learning: Don't point fingers. Instead, honestly assess what went wrong and what you could control. This helps you improve next time. Teamwork Makes the Dream Work: Mistakes happen. Support your team and work together to learn from them. Everyone can grow from the experience. Don't Let It Get You Down: Failing is normal! Don't take it personally. Believe in yourself and your team's ability to improve. Turn Lessons into Action: Don't just talk about what went wrong. Make changes! Fix your processes and be more careful next time. By following these tips, you can turn project failures into valuable learning experiences that will make you and your team stronger in the future. Utilizing resources and tools for project success - Week 4 Learning Objectives Outline the typical resources needed to manage a project. Identify the key components of project charters and develop a project charter for project initiation. Evaluate various project management tools to meet project needs. Essential project resources Project Resources: Budget, People, Materials Importance of Resource Planning: Ensures everyone has what they need to complete tasks on time and within budget. Prevents understaffing, delays, and budget shortfalls. Types of Resources: Budget: Estimated project cost (materials, software, vendors, marketing). Created during the initiation phase through stakeholder and team discussions. Includes hidden costs (taxes, fees). Used for vendor proposals, cost tracking, and project charter approval. People: Project team members (internal and external with unique skills). Example: Project manager, marketing manager creating project advertisements. Materials: Physical items required for project completion. Example: Lumber for construction projects. Project Management Tools: Assist in managing resources and organizing work (tasks, budgets, collaboration). Examples: Google Docs, and Asana (work management software). Determining Resources During Initiation: Example: Launching Plant Pal Service at Office Green (revenue increase goal of 5%). Research costs: website development, promotional materials, shipping/delivery. Budget for project management software. Identify project team members and external vendors (client communication manager, plant supplier). The value of project documentation Why Documentation Matters: Ensures transparency and clear communication across the project team. Provides a reference point for past decisions and future project phases. Helps identify potential issues related to tasks, timelines, or costs. Creates a historical record for future project learning and improvement. Types of Project Documentation: Project Proposals: Used to gain approval for a project by outlining its goals, deliverables, and resource needs. Project Charters: Formal documents that authorize a project and define its key aspects (goals, scope, stakeholders, resources). Benefits of Clear Documentation: Sets the stage for the project by addressing key questions: Problem to be solved Project goals Scope and deliverables Stakeholders involved Resources needed Preserves decisions made early in the project for future reference. Improves team member onboarding by providing a knowledge base. Document Examples: Emails Presentations Digital documents Overall, project documentation is a key tool for project managers to ensure everyone is aligned and has the information they need for success. Project proposals and charters 101 Project Proposal Created at Project Initiation: A persuasive document to secure stakeholder approval for a project. Authored by Senior Leaders: Typically created by senior organizational leaders. Content: Project goals and desired impact Presented as a formal document, presentation, or even an email. Project Charter Created Later in Initiation: A formal document outlining a project's key aspects for successful execution. Purpose: Defines project goals, scope, stakeholders, and resources. Provides a framework and communication tool for project details. Key Differences: Timing: Project proposals come before project charters. Purpose: Proposals focus on gaining approval, and charters focus on defining project details. Use: Charters serve as a reference point throughout the project lifecycle, while proposals are primarily used during the initiation phase. Project Charter Benefits: Cost-Benefit Analysis: Ensures project benefits outweigh costs by including: Project value creation Cost savings for the organization Time commitment required Stakeholder Alignment: Promotes agreement on project value and details. Project Authorization: Secures management support and ensures project alignment with organizational needs. Flexibility: Can be adapted to different project needs, audiences, and stakeholders. Project Charter: A Living Document Continuously reviewed and refined by the project manager as the project progresses. Overall, both project proposals and project charters are crucial for setting the stage for a successful project by clearly defining goals, securing stakeholder buy-in, and establishing a framework for project execution. Project charters: Elements and formats Key Elements of a Project Charter: Introduction/Project Summary: Briefly describe the project and its purpose. Goals/Objectives: Defines what the project aims to achieve. Business Case/Benefits and Costs: Explains the project's justification, outlining anticipated benefits and costs. Project Team: Identifies key individuals involved in the project. Scope: Defines the project's boundaries and what's included/excluded. Success Criteria: Establishes how success will be measured. Major Requirements or Key Deliverables: Outlines the project's main outputs. Budget: Estimates the project's financial resources. Schedule/Timeline or Milestones: Defines the project timeframe and key milestones. Constraints and Assumptions: Identifies any limitations or underlying conditions. Risks: Highlights potential challenges and mitigation plans. OKRs (Objectives and Key Results): (Optional) Establishes measurable goals for the project. Approvals: Lists required approvals for project initiation. Formats for Project Charters: Condensed/Simplified: Suitable for smaller, less complex projects. Detailed with Appendices: Can link to supplementary documents for intricate projects. Organization-Specific Templates: These may be provided by your organization. Remember: Project charters are living documents, evolving alongside the project. Regular reviews and revisions ensure continued alignment throughout the project lifecycle. By effectively utilizing project charters, you can set your project up for success from the very beginning. Developing a project charter Project Name: Project Plant Pals Project Summary: Offer high-volume customers small, low-maintenance plants suitable for office environments. Project Goals (SMART): Increase revenue by 5% by rolling out a new plant service to top clients by year-end. Project Deliverables: Send 1,000 plants to 100 customers. Launch a new website for orders and customer support. Business Case: Justification: Top requested service by customers, improves customer satisfaction and retention. Cost-Benefit Analysis: Benefits: Improved customer satisfaction, increased revenue. Costs: Sourcing products, website development, marketing materials. Estimated Budget: $250,000 (Note: Perform a more detailed analysis for real projects) Project Scope: In Scope: Creating a service to deliver small plants to last year's top clients. Out of Scope: Plant care after delivery. Project Team: Project Sponsor: Office Green's Director of Product Project Lead: You (the project manager) Additional Team Members (examples): Marketing associates, website developers, external plant vendors Additional Stakeholders: Vice President of Customer Success (customer feedback and requests) Account Manager (relationships with top clients) Fulfillment Manager (acquiring plants) Success Criteria: Increase revenue by 5% by year-end. Achieve 95% customer satisfaction rate within 3 months of launch. Conclusion: A well-developed project charter lays the foundation for project success by outlining key details, fostering stakeholder alignment, and guiding project execution. Utilizing tools for effective project management Why Use Project Management Tools? Improved Tracking: Tools help track detailed information about tasks, resources, and progress. Enhanced Communication: They facilitate communication among team members and stakeholders. Increased Efficiency: Shared online documents eliminate the need for constant in-person updates. Transparency and Visibility: Tools promote transparency by providing a central location for project information. Benefits of Using the Right Tools: Improved Collaboration: Team members can easily update project leads on progress. Early Identification of Issues: Delays or roadblocks become apparent quickly, allowing for prompt corrective actions. Effective Resource Management: Tools can assist with budget management, creating charts, managing contracts, and keeping stakeholders informed. Choosing the Right Tools: Project Complexity: Consider the project's scope and complexity when selecting tools. Team and Stakeholder Familiarity: Opt for user-friendly tools for smaller projects or if team members are unfamiliar with complex software. Organizational Standards: Adhere to any existing organizational standards regarding project management tools. Types of Project Management Tools: Simple Tools: Spreadsheets, documents, email Sophisticated Tools: Scheduling software, work management software Conclusion: Effective project management tools empower project managers to communicate, collaborate, and manage projects more efficiently. The right tools can significantly contribute to project success. Introducing new tools to a team Key Considerations for Introducing New Tools: Project Benefit: Ensure the new tool genuinely improves project outcomes. Team and Stakeholder Buy-In: Communicate the benefits clearly to gain buy-in. Existing Tool Comparison: Highlight how the new tool offers advantages over the existing one. Steps to Successful Tool Introduction: Early Communication: Inform the team about the upcoming change as early as possible. Stakeholder Feedback: Solicit input on functionalities and prioritize features. Stakeholder Involvement: Include key stakeholders in tool demonstrations and trials. Internal Testing: Involve key users in testing and familiarization with the new tool. Tool Functionality: Ensure the tool is fully functional and accessible before team introduction. Training: Provide training sessions to address different comfort levels with technology. Addressing Pushback: Acknowledge resistance as normal; take steps to mitigate friction. Transition Period: Consider a period where both old and new tools operate concurrently (if applicable). Overall: By carefully planning and executing the introduction of new tools, project managers can minimize disruption, foster team acceptance, and ultimately achieve project success. Exploring types of project management tools Scheduling and Work Management Software Benefits: Assign tasks to team members. Track progress and visualize the workflow. Identify potential roadblocks and delays. Use Cases: Larger projects with numerous tasks and team members. Productivity Tools Examples: Word processing tools (e.g., Docs, Word), spreadsheets (e.g., Sheets, Excel), and presentation tools (e.g., Slides, PowerPoint). Benefits: Create and share documents collaboratively (project charters, meeting agendas, etc.). Develop project plans and charts. Package project information in an easily digestible format (presentations). Use Cases: All project sizes. Collaboration Tools Examples: Email, and chat applications. Benefits: Facilitate communication among team members. Address questions, comments, and project-related topics promptly. Use Cases: Smaller projects with fewer tasks and team members. Choosing the Right Tool: Consider project size, complexity, and team dynamics when selecting tools. Simple tools like spreadsheets and email might suffice for smaller projects. Larger projects benefit from scheduling and work management software for enhanced organization and tracking. Common project management tools Asana: A work management platform facilitating project planning, coordination, and communication. Key Features: Project plan creation Task assignment and automation Progress tracking Stakeholder communication Shared workspace for project information Benefits: Improved clarity and transparency around project tasks and ownership. Streamlined workflow management. Efficient communication with internal and external stakeholders. Spreadsheets: Versatile tools offering a wide range of project management functionalities. Examples: Creating timelines and budget charts. Managing tasks and tracking progress. Visualizing information through sorting, filtering, and highlighting. Benefits: Flexibility for various project needs. Easy data manipulation and visualization. Choosing the Right Tool: Consider project complexity and team dynamics when selecting a tool. Asana caters well to complex projects with a need for collaborative features. Spreadsheets suffice for smaller projects or as supplementary tools. Familiarity with a core set of project management tools allows for adaptation to new software. Conclusion: Understanding popular project management tools like Asana and spreadsheets empowers project managers to make informed decisions when selecting the right tool for a project's specific requirements. Using Google Sheets for project management This guide explores how Google Sheets can be a valuable tool for project management. Collaboration Features: Shared spreadsheets allow for real-time collaboration with teammates. Permission levels control editing, commenting, or viewing access. Comments and task assignments facilitate communication within the spreadsheet. Formatting and Organization: Create lists for tasks, notes, or other criteria. Freeze rows or columns to keep headers visible while scrolling. Group and hide content for better manageability. Data Management: Add checkboxes for easy progress tracking. Use dropdown lists to ensure consistent data entry. Apply color coding with conditional formatting for visual progress indications. Data Analysis and Visualization: Sort and filter data to focus on specific details or order information. Create pivot tables to summarize data and identify relationships between data points. Generate charts and graphs for visually presenting project information. Calculations: Utilize built-in functions to perform calculations, automate tasks, and generate reports. Templates: Pre-made Google Sheets templates offer a starting point for project timelines, tracking, Gantt charts, and event marketing timelines. Benefits: Cost-effective and readily available solution. Collaborative features facilitate teamwork. Easy to format, organize, and analyze data. Offers a variety of templates for common project management needs. Overall, Google Sheets can be a powerful tool for project management, especially for smaller projects, or as a supplement to other project management software. Demonstrating your knowledge of project management tools Showcase Your Tool Knowledge in Interviews Project management tools are dynamic, so interviewers assess your adaptability. Discussing tools demonstrates your skills. Talk about familiar tools and how you've used them. Briefly mention the evolving landscape. If you lack experience with specific tools, use relatable examples to showcase transferable skills (e.g., planning a move) and highlight how you've used general-purpose tools (e.g., spreadsheets) for project tasks. Discuss popular work management tools (Asana, Monday.com) and their benefits (comprehensive management, clear interfaces, efficiency). By effectively communicating your knowledge of project management tools, you can impress potential employers.

---

<a name="google-pm-project-planning"></a>
## Google PM: Project Planning

**Source**: `google-pm-Project_Planning__Putting_It_All_Together.txt`

Project Planning: Putting It All Together TOC \h \u \z \t &quot;Heading 1,1,Heading 2,2,Heading 3,3,Heading 4,4,Heading 5,5,Heading 6,6,&quot; Course Overview and Objectives 4 Week 1 5 Learning Objectives 5 The Importance of the Planning Phase in Project Management 5 Benefits of Thorough Project Planning 5 Key Elements of the Planning Phase 5 Facilitating a project kick-off 7 Suggested Kickoff Meeting Agenda Structure 7 Follow-Up After the Kickoff Meeting 7 Kick-off meeting best practices 7 Understanding Project Milestones and Tasks 8 The Role of Milestones and Tasks in Project Management 8 Project Plant Pals at Office Green: An Example 8 The Importance of Setting Milestones 8 Identifying Milestones and Setting Deadlines 8 Set tasks to identify milestones 9 Here are some questions that I ask to help me decide which tasks should be considered milestones: 9 Understanding Work Breakdown Structure (WBS) 9 Creating a Work Breakdown Structure 9 Assigning Tasks 9 Benefits of Assigning Tasks 9 Week 2 11 Learning Objectives 11 Components of a project plan 11 How project plan components are connected 11 Making realistic time estimates 12 Understanding Time vs. Effort Estimation 12 Example of Time and Effort Estimation 12 The Impact of Unrealistic Effort Estimates 12 Avoiding Unrealistic Effort Estimates 12 The Role of Buffers in Planning 12 Types of Buffers and Their Usage 13 Practical Application of Buffers at Google 13 Conclusion: 13 Case study: Run fast, pay later 13 Kendra's Missteps in Project Planning 13 Impact of Inaccurate Time Estimation 13 Lessons Learned and Corrective Actions 14 Overcoming the planning fallacy 15 Real-World Implications of the Planning Fallacy 15 Balancing Optimism and Realism in Project Management 15 Case Study: David's Home Construction Project 15 Key Takeaways for Project Managers 16 Capacity planning and the critical Path 16 Implementing Capacity Planning 16 Understanding Individual Capacity 16 Prioritizing Work with the Critical Path 16 Determining the Critical Path 17 Factors Affecting Capacity and Planning 17 Best Practices for Capacity Planning 17 Steps to Create a Critical Path 17 Step 1: Capture All Tasks 17 Step 2: Set Dependencies 17 Step 3: Create a Network Diagram 18 Step 4: Make Time Estimates 18 Step 5: Find the Critical Path 18 Getting accurate time estimates from your team 18 Asking the Right Questions 19 Negotiating Effectively 19 Practicing Empathy 19 Application in Project Planning 19 Developing a project schedule 20 Project Schedules and Keeping Your Team on Track 20 Building a Project Schedule with Gantt Charts 20 Using Spreadsheets for Project Management 20 Alternative Tools for Project Schedules 20 Key Components of a Project Plan 20 Project plan best practices 20 Creating a project plan: Tools and templates 21 Choosing the Right Tools for Your Project Plan 21 Spreadsheets for Project Planning 21 Spreadsheet templates 21 Work management tools 21 Introduction to Kanban boards 22 Kanban Boards: A Visual Tool for Project Management 22 Using Kanban Boards 22 Creating Kanban Cards 22 Week 3 23 Learning Objectives 23 The importance of budget setting 23 Key components of a project budget 24 Project budgeting 101 25 Creating a project budget 26 Techniques for Building a Project Budget 26 Project Budget Breakdown with Plant Pals Example 26 Project Budget Goals 26 Key Takeaways 26 Helpful budget templates 27 Spreadsheet Skills for Budgeting 27 Maintaining a project budget 27 Project Budget Monitoring 27 Cost Control Techniques 27 Managing Budget Changes 27 Impact of Budget Variances 27 Ideal Budget Management 27 Overcoming budgeting challenges 28 Challenge 1: Pre-allocated Budget 28 Challenge 2: Inaccurate TCO Calculation 28 Challenge 3: Scope Creep 28 Introduction to budgeting terms 28 Understanding procurement 29 The procurement process 29 Agile vs Traditional Procurement 29 Tips for the procurement process 29 Initiating: 29 Selecting: 30 Contract Writing: 30 Controlling: 30 Completing: 30 Key Takeaways: 30 Common procurement documentation 30 ● Non-Disclosure Agreement (NDA): 30 ● Request for Proposal (RFP): 30 ● Statement of Work (SOW): 31 Creating a Statement of Work 31 Obtaining procurement support 31 Ethics in the procurement process 32 ● Importance: 32 ● Project Manager's Role: 32 ● Safeguarding Methods: 32 ● Examples of Unethical Practices: 32 ● Ensuring Ethical Procurement Throughout the Project Lifecycle: 32 ● Key Takeaway: 33 Avoiding ethical traps in procurement 33 Week 4: Managing risks effectively 34 Learning Objectives 34 The importance of risk management 34 Phases of risk management 34 Uncover opportunities using risk management 35 Tools to help identify risks 35 How to create a fishbone diagram 35 Steps to Create a Fishbone Diagram: 35 Types of risk 36 Managing single point of failure risks 37 Single Point of Failure Risks 37 Mitigating Single Point of Failure Risks 37 Visualizing dependency relationships 38 Dependency Relationships in Projects 38 Risk mitigation strategies 38 Building a risk management plan 39 Communicating risks to stakeholders 39 Week 5: Organizing communication and documentation 41 Learning Objectives 41 Why communication is critical 41 Tips for Effective Communication 41 Starting a communication plan 42 Key Elements of a Communication Plan: 42 Benefits of a Communication Plan: 42 Developing a communication plan 42 What (Type of Communication): 43 Who (Recipients): 43 When (Frequency &amp; Timing): 43 How (Delivery Method): 43 Why (Goal of Communication): 43 Best practices for building a communication plan 44 Identify Audience and Needs: 44 Develop and Document the Plan: 44 Continuously Improve: 44 The value of project documentation 44 Effective Documentation Practices: 45 Benefits of Effective Documentation: 45 Organizing project documentation 45 Course 3 Glossary | PM Terms and Definitions - Google Docs 46 Course Overview and Objectives The course focuses on the second phase of the project life cycle: the project planning phase. Key components of a project plan, time estimates, milestones, budget management, procurement processes, risk management, and communication plans are covered. Hands-on approaches and project management tools and resources are provided by current Google project managers Week 1 Learning Objectives Explain the Project Management Certificate program structure and course functionality. Explain why milestones are important and how to set them. Explain the difference between tasks and milestones and how they are related. Describe the components of the planning phase and their significance. The Importance of the Planning Phase in Project Management Planning follows the initiation phase where preliminary information is gathered and stakeholder approval is obtained. The project manager is responsible for defining project goals, scope, deliverables, and team roles. Planning is essential for mapping out the project, understanding the work required, and coordinating with teams and vendors. Benefits of Thorough Project Planning Planning aids in identifying and preparing for potential project risks and brainstorming mitigation strategies. It helps in gaining buy-in from team members and stakeholders, demonstrating careful preparation. Teamwork is enhanced during the planning phase, leading to a stronger team by the time execution begins. Key Elements of the Planning Phase The schedule, budget, and risk management plan are the three primary components addressed during planning. The schedule outlines the project timeline, including start and end dates, and key milestones. The budget accounts for the total cost and allocates funds to different project elements. Risk management involves identifying potential problems and planning to mitigate their impact on the project. In this exercise , you will read a scenario and answer questions about a project's schedule, budget, and potential risks. Start by reading the scenario: Imagine that you’re a project manager helping a restaurant owner launch an updated menu with a few new food items at 15 locations. The owner would like you to oversee the redesign of the menu and distribution to all locations. You're preparing for your project’s eventual kickoff meeting. Right now, you’re thinking through the three main planning activities: building the schedule, assessing the budget, and considering potential risks. Did you consider these ideas in your schedule? When working through a potential schedule for a project, you should include several key dates. The dates may include important constraints from vendors, kickoffs dates, and when to complete certain tasks. Make sure to include a target date for the product (menu) launch, and validate that with the client. Remember, the schedule isn’t permanent. While you would like to stick to the schedule as closely as possible, it may change. Did you consider these ideas in your budget? Call vendors and get quotes of items you may need to purchase. Include any pay for teammates or fees for outside consultants or service-based vendors. Include any software costs you may need to help you organize and manage your project. What if the project is delayed—are any fees associated with the delay? Did you consider these ideas in your potential risks? Budget items that are likely to increase in cost. Think about days off for team members, and consider any holidays or vacation days. What about tasks and deliverables that could delay the project? Feedback from stakeholders could also cause delays. Facilitating a project kick-off A kickoff meeting is the first meeting with the project team to establish a shared vision and understanding of the project's goals, scope, and individual roles. It is essential for aligning the team, building rapport, and setting clear expectations for the project. Suggested Kickoff Meeting Agenda Structure Introductions (10 minutes): Team members introduce themselves and share a fun fact. Project Background (5 minutes): Overview of how the project came to be and its significance. Goals and Scope (5 minutes): Clarification of in-scope and out-of-scope work, important milestones, and target launch date. Roles (5 minutes): Discussion of individual responsibilities throughout the project. Collaboration (10 minutes): Review of tools and communication methods for team collaboration. Next Steps (10 minutes): Setting expectations for upcoming actions by team members. Q&amp;A Session (15 minutes): This opportunity for team members to ask questions and provide feedback. Follow-Up After the Kickoff Meeting Document the meeting agenda and send it to attendees in advance. Assign a teammate to take notes during the meeting and record action items. Consider recording the meeting for future reference, with attendees' permission. Send a follow-up email summarizing the meeting's key points, outcomes, and action items. Kick-off meeting best practices Set the right time Set the right length Invite the right people Designate a notetaker Set the agenda Share the agenda Stick to the agenda Follow up after the meeting Understanding Project Milestones and Tasks Milestones are significant checkpoints within the project schedule, indicating progress and usually signifying the completion of a deliverable or project phase. Tasks are activities that need to be accomplished within a set period of time to reach a milestone, involving multiple steps or actions. The Role of Milestones and Tasks in Project Management Milestones help ensure the project is on schedule to meet its goals and serve as crucial points for project tracking. Tasks are the individual efforts required to reach each milestone, contributing to the overall progress of the project. Project Plant Pals at Office Green: An Example The project's deliverables include launching a website for a new service, with milestones such as securing website design approval and implementing user feedback. Tasks to achieve these milestones include creating website design mockups, reviewing them, and implementing feedback. The Importance of Setting Milestones Setting milestones provides a clear understanding of the project workload, helps keep the project on track, and uncovers areas needing scope, timeline, or resource adjustments. Achieving milestones motivates the team and demonstrates progress to stakeholders, with the sequential and timely completion of milestones being critical. Milestones should be set for the most important events in the project, identified by reviewing the project schedule and pinpointing moments where major goals will be achieved. Identifying Milestones and Setting Deadlines Identifying milestones involves evaluating the project as a whole, referring to the project charter, and distinguishing between major progress points (milestones) and smaller tasks. Deadlines for each milestone are set based on task completion times, stakeholder needs, and the overall project timeline, ensuring regular progress updates. Set tasks to identify milestones Setting tasks can help you clearly define milestones. You can do this in two ways: Top-down scheduling: In this approach, the project manager lays out the higher-level milestones, and then works to break down the effort into project tasks. The project manager works with their team to ensure that all tasks are captured. Bottom-up scheduling: In this approach, the project manager looks at all of the individual tasks that need to be completed and then rolls those tasks into manageable chunks that lead to a milestone. Here are some questions that I ask to help me decide which tasks should be considered milestones: Does the task signify the completion of a major deliverable or project phase? Does the task require the completion of multiple smaller tasks? Will the task require approval or sign-off from stakeholders or customers? Is the task a moment of celebration or a point of reflection for the project team? Understanding Work Breakdown Structure (WBS) A WBS is a tool that sorts the milestones and tasks of a project in a hierarchy, in the order they need to be completed. It helps break down the sometimes intimidating challenges of a project into more manageable chunks. A WBS is typically represented as a tree diagram of project tasks. Creating a Work Breakdown Structure The top of the diagram is the name of the project. The second level of the diagram breaks the project down into milestones. The third level of the diagram breaks each milestone down into a series of project tasks. Assigning Tasks Tasks are typically assigned according to a person's role in the project. When assigning tasks, consider each teammate's workload and ensure that workloads are balanced. Use project management tools like Asana to assign tasks, add an assignee and a due date to each task, and include as much detail surrounding the task as possible to avoid miscommunication. Benefits of Assigning Tasks Assigning tasks creates a sense of personal responsibility for members of the team. It makes team members feel more invested in the project and supports their personal growth. It also supports your own skill-building as a manager who's a supportive delegator. It keeps your team motivated and invested in completing their work on time. 19051 220582 Activity Template: Use a WBS to create project tasks and milestones - Part 1 Activity Template: Use a WBS to create project tasks and milestones - Part 2 Week 2 Learning Objectives Examine tools and best practices to build a project plan. Learn how to make accurate time estimates and describe techniques for acquiring them from team members. Explain why a project plan is necessary and what components it contains. Components of a project plan Tasks: Activities with set timeframes, assigned based on team member skills. Milestones: Key progress points marking deliverables or project phases. People: Team members and their roles for clear understanding and responsibility. Documentation: Links to relevant documents like RACI charts, charters, budgets, and risk management plans. Time: Estimated project duration, forming the schedule's foundation. Time estimates include: Start and completion dates for tasks and milestones. Project start and end dates for resource allocation and planning. How project plan components are connected Component Description How it connects to other components Scope and goals Defines what the project is trying to achieve. The scope and goals should be reflected in the WBS, budget, and management plans. Work Breakdown Structure (WBS) Breaks down the project into smaller, more manageable tasks. The WBS should be linked to the budget and schedule. Budget Estimates the cost of the project. The budget should be informed by the WBS and should be used to track project spending. Management plans Outline how the project will be managed, including how risks will be mitigated and how communication will take place. The management plans should be informed by the WBS, budget, and schedule. Making realistic time estimates Project managers are responsible for task assignment and time estimation to create an overall project schedule. Project managers do not complete tasks but assign them and estimate completion time. Time estimation involves predicting the total duration of a task. Effort estimation predicts the active work time required for a task. Understanding Time vs. Effort Estimation Time and effort estimation are distinct concepts that are crucial for efficient resource management. Effort estimation measures the time taken to actively work on a task. Time estimation includes both active and inactive durations. Differentiating between the two helps in utilizing resources during inactive periods. Example of Time and Effort Estimation An example illustrates the difference between time and effort estimation. Painting a wall may have an effort estimation of 30 minutes of active work. Time estimation for the same task could be 24 hours, including drying time. The Impact of Unrealistic Effort Estimates Unrealistic effort estimates can negatively affect project schedules. Optimism can lead to underestimating the time required for tasks. Overlooking potential risks due to optimism can cause schedule delays. Accurate effort estimates are essential for maintaining project timelines. Avoiding Unrealistic Effort Estimates Communicating with team members is key to obtaining realistic effort estimates. Teammates can provide the most accurate work estimates. Considering sub-tasks is important for a comprehensive estimate. Estimates are subject to change due to unforeseen circumstances. The Role of Buffers in Planning Buffers is a strategic tool used to accommodate inaccuracies in effort estimates. Buffers add extra time to tasks or projects to account for delays. Task buffers are added to individual tasks, especially those outside the team's control. Project buffers add time to the overall project schedule to manage missed deadlines. Types of Buffers and Their Usage Different types of buffers serve specific purposes in project planning. Task buffers should be used sparingly and strategically. Project buffers provide flexibility for the entire project timeline. Using buffers can prevent a project from derailing due to unexpected delays. Practical Application of Buffers at Google Real-world examples from Google demonstrates the effective use of buffers. Buffers are used to accommodate new hires' learning curves and missed deadlines. Understanding team members' workloads and task complexities helps in buffer allocation. Realistic timelines are crucial for the perceived success of a project. Conclusion: The Importance of Accurate Time and Effort Estimation Accurate estimations and the use of buffers are vital for successful project management. Time and effort estimations contribute to realistic project planning. Buffers safeguard against the inevitable inaccuracies in estimates. The goal is to achieve project objectives within an acceptable timeframe. Case study: Run fast, pay later Kendra's Missteps in Project Planning Kendra's approach to project planning led to several critical errors that impacted the project's success. Kendra did not communicate her concerns about the project timeline to management. She rushed the planning phase without seeking input from her team or stakeholders. Kendra instructed her team to work faster instead of addressing their concerns about the timeline. Impact of Inaccurate Time Estimation The consequences of not accurately estimating time were significant for Kendra's project. The project faced delays and required rework due to unaccounted tasks and stressed team members. Stakeholders were concerned, and the project ultimately missed its deadline. Inaccurate time estimation led to a lack of realistic planning and an unsustainable work pace. Lessons Learned and Corrective Actions Reflecting on the project, several lessons and corrective actions emerge to prevent similar issues in the future. Escalating Concerns: Kendra should have communicated her concerns about the timeline to management with supporting information. Working Carefully: A thorough planning process could have identified unnecessary tasks, potential for increasing team size, and opportunities for streamlining activities. Gathering Input from the Team: Involving team members, peers, and management in building and reviewing the project plan is crucial, especially when facing challenging timelines. Key Takeaway: Realistic time and effort estimation is essential. Project managers should evaluate potential risks, discuss challenges with team members, and not hesitate to escalate concerns to management. By addressing these areas, project managers can avoid the pitfalls of inaccurate time estimation and set their projects up for success. Consider the following scenario: You are to oversee the project for a new textbook release for the fall semester. You’ve done something similar before, so you feel confident speaking with the stakeholders, project sponsor, and faculty director. You assure them the project will meet the 6-month deadline. Around three months into the project, you notice that your writers consistently miss the writing deadlines you assign. Then you learn that a printer upgrade may delay printing the textbooks. Unfortunately, you forgot to include this delay in your time estimation. Now you have to tell the stakeholders that the project may not launch in time for fall. What might you do differently next time to improve the outcome of this situation? Write three to four sentences. 1 / 1 point Adding buffer time to the whole project deadline to have time for this issue, Engage the writers in the planning and setting the deadlines so they set time and Effort Estimation right and work on meeting them. Set connections with suppliers for when a printing issue occurs. Correct Review your response to check if you considered these steps to improve the outcome of the situation: Before the project launch, the project manager should speak to the writers to more accurately determine how long it takes to do their tasks. The project manager might identify the printer technology as a task that is out of the team’s control and add a task buffer. Additionally, when the project manager first learns about the printer issue, they should immediately update the time estimation and inform stakeholders. The project manager can also look towards potential time-saving activities, including eliminating tasks, increasing the team size to get more work done and meet the deadline, and streamlining any of the activities in order to complete them in parallel with other tasks. All-in-all, it’s important to perform time estimation, effort estimation, and add buffers to build realistic plans for reaching the project goal and ultimately, success! Overcoming the planning fallacy The planning fallacy is a cognitive bias that leads to underestimating the time, costs, and risks of future actions due to optimism. Introduced by Kahneman and Tversky, the planning fallacy describes our tendency to underestimate task completion times. Optimism bias is a related concept where individuals believe they are less likely to face negative outcomes. This bias affects both novices and experts in project management and other areas. Real-World Implications of the Planning Fallacy The planning fallacy can have tangible consequences in project management and everyday tasks. Failing to account for potential delays, like a dog getting distracted during a walk, can lead to missed meetings or deadlines. In project management, this bias can result in unrealistic timelines and increased pressure on teams. Balancing Optimism and Realism in Project Management Project managers should strive for an &quot;optimistically realistic&quot; approach to planning and time estimation. Being aware of the planning fallacy can help maintain a balance between optimism and realism. Project managers should plan for the best outcomes while also considering the proper time needed for task completion. Case Study: David's Home Construction Project A case study of a project manager, David, illustrates the importance of recognizing the planning fallacy in practice. David's initial time estimates for a construction project did not account for potential risks and delays. By being mindful of the planning fallacy, David adjusted his plan to include buffers for unforeseen issues. Key Takeaways for Project Managers Project managers can mitigate the effects of the planning fallacy by actively considering potential risks and involving their team. Being vigilant about &quot;what-ifs&quot; is crucial for successful project management. Utilizing the project team as a resource can help identify and plan for possible risks. The goal is to be &quot;optimistically realistic&quot; in planning to achieve the best possible project outcomes within a realistic timeframe. Capacity planning and the critical Path Capacity planning is essential for determining if a project has the necessary resources to meet deadlines. Capacity refers to the maximum amount of work team members can complete in a set period. Capacity planning involves allocating people and resources to tasks and assessing if the project's resource needs are met. Implementing Capacity Planning The process of capacity planning helps in identifying the number of resources needed to complete a project on time. It may reveal the need for additional resources, such as more developers or writers. For example, in the Plant Pals project, calculating the number of deliveries a driver can make helps determine how many drivers are needed. Understanding Individual Capacity Each team member's capacity is limited by their available work time and other daily responsibilities. Even dedicated team members have a finite capacity due to meetings, urgent tasks, and typical workday elements. Recognizing individual capacity is crucial when assigning tasks. Prioritizing Work with the Critical Path The critical path method prioritizes tasks that are essential to meet project milestones on schedule. The critical path includes the minimum number of tasks and milestones needed to reach the project goal. Delays in critical path tasks can lead to project delays. Non-critical tasks, such as adding flowers to a product lineup, do not impact the project's success as significantly. Determining the Critical Path Identifying the critical path involves listing all tasks, determining dependencies, and estimating task durations. A work breakdown structure (WBS) helps organize tasks and milestones hierarchically. Dependencies are tasks that cannot start until another is completed. The longest path of tasks from start to finish is the critical path. Factors Affecting Capacity and Planning Several factors influence capacity planning, including the ability to identify parallel and sequential tasks. Parallel tasks can be completed simultaneously, while sequential tasks must follow a specific order. Recognizing tasks with fixed start dates or earliest start dates aids in planning and prioritizing work. Float, or slack , indicates the leeway available before a task delay affects the project schedule. Best Practices for Capacity Planning Identifying float and understanding task prioritization are best practices in capacity planning. Tasks on the critical path should have zero float to avoid delays. Tasks with float are not on the critical path and have more scheduling flexibility. By understanding and applying these concepts, project managers can create more accurate project plans and use their resources effectively. Steps to Create a Critical Path Creating a critical path involves several steps to ensure all essential tasks are captured and properly sequenced. Step 1: Capture All Tasks The first step is to identify all tasks required for project completion, focusing on essential tasks. Use key planning documents like the work breakdown structure (WBS) to ensure no critical task is overlooked. Distinguish &quot;need to do&quot; tasks from &quot;nice to do&quot; tasks that are not essential. Step 2: Set Dependencies After listing critical tasks, determine the order of completion by identifying dependencies. Dependencies dictate which tasks must be completed before others can start. Questions to ask include which tasks precede, coincide with or follow a given task. Step 3: Create a Network Diagram A network diagram visually sequences tasks based on dependencies and identifies the critical path. It shows the work path from start to finish and which tasks can occur in parallel or sequence. Non-essential tasks not on the critical path are also identified. Step 4: Make Time Estimates Accurate time estimates for each task are crucial for determining the critical path. Consult stakeholders for precise time estimates. Time estimates should be reviewed and adjusted as the project progresses. Step 5: Find the Critical Path Calculate the longest path of essential tasks to determine the critical path. Only include tasks that affect the project's finish date if left incomplete. Use forward pass and backward pass techniques to identify the earliest and latest start dates and task slack. The forward pass is a technique used to calculate the earliest possible start and finish times for each task in a project. Begin at the start of the project task list and sequentially add task durations. Start with the initial task that must be completed before subsequent tasks can begin. The backward pass is used to determine the latest possible start and finish times for each task without delaying the project. Begin with the final task or milestone and work backward through the schedule. Useful for identifying which tasks are critical when there is a firm project deadline. Allows for the identification of tasks that can be delayed or cut to meet deadlines. By following these steps, project managers can establish a critical path that ensures project tasks are completed in an efficient and timely manner. Getting accurate time estimates from your team In project management, integrating soft skills with technical planning processes like time estimation, effort estimation, and capacity planning is crucial. These soft skills facilitate effective communication and collaboration with your team, ensuring that project schedules are realistic and achievable. Here's how you can apply soft skills to gather accurate estimates from your teammates. Asking the Right Questions Effective communication begins with asking the right questions. This involves framing inquiries in a way that elicits detailed and useful responses. Open-ended questions: These are essential for gathering comprehensive information about task durations and complexities. For example, instead of asking if a task can be completed in a specific timeframe, inquire about the steps involved and the typical time required for similar tasks. Follow-up questions: Delve deeper into the task specifics by asking about potential risks, complexities, and realistic completion timelines. Negotiating Effectively Negotiation is a key skill in aligning team members' estimates with project goals while considering their workload and priorities. Understanding priorities: Recognize that team members may have commitments to other projects. Effective negotiation helps in prioritizing tasks without overburdening team members. Flexibility in estimates: If an estimate exceeds your expectations, explore the possibility of adjusting the scope or resources to meet project timelines. This might involve breaking down tasks into smaller, more manageable parts or reallocating resources. Practicing Empathy Empathy allows project managers to understand and respect team members' capacities and personal commitments, fostering a supportive work environment. Workload awareness: Inquire about each team member's current workload, including tasks outside the project, to avoid unrealistic expectations. Personal commitments: Consider team members' scheduled vacations, holidays, and work-life balance to ensure tasks are assigned when they can realistically be completed. Appreciation: Always express gratitude for the team's efforts and contributions. Acknowledging their hard work builds trust and motivates continued collaboration. Application in Project Planning By applying these soft skills, project managers can obtain more accurate and reliable estimates from their team, which are essential for creating a viable project plan. This approach not only improves the accuracy of project schedules but also enhances team cohesion and morale by demonstrating respect for team members' time and contributions. Integration with technical planning: Combine soft skills with technical planning tools like work breakdown structures (WBS) and critical path methods to refine project schedules. Continuous improvement: Use insights gained from applying these soft skills to refine future planning processes, making them more efficient and effective. In summary, the integration of soft skills with project planning techniques is essential for developing realistic project schedules. By asking the right questions, negotiating effectively, and practicing empathy, project managers can foster a collaborative environment that respects team members' capacities and contributions, leading to successful project outcomes. Developing a project schedule Project Schedules and Keeping Your Team on Track Clear schedules with tasks, owners, and deadlines are crucial for project plans. Tools like spreadsheets and Asana can be used to build project plans around a schedule. Building a Project Schedule with Gantt Charts Gantt charts visually represent project schedules with tasks, owners, and deadlines. They offer a clear view of project tasks and dependencies. Spreadsheets are a common tool for creating Gantt charts. Using Spreadsheets for Project Management Spreadsheets offer functionalities beyond Gantt charts, allowing you to link to other project documents. Using a single spreadsheet saves time, improves organization, and reduces the need to search emails. Alternative Tools for Project Schedules Gantt charts are not the only option; consider digital documents or Kanban boards depending on your needs. Key Components of a Project Plan A well-defined project plan should include goals, tasks, owners, deadlines, and relevant documents. A clear plan keeps everyone on the team informed and aligned. Project plan best practices Detailed Breakdown: Break down project deliverables into clear milestones and manageable tasks. This ensures everyone understands the steps required to achieve goals. Time for Planning: Allocate sufficient time for planning, especially for complex projects. This allows for a realistic assessment of workload and buffer time for unforeseen circumstances. Embrace the Inevitable: Plan for potential risks and build in buffer time to address them. The Power of Curiosity: Ask questions during planning to gather valuable insights from teammates and stakeholders. This builds trust and strengthens the plan. Champion Your Plan: Choose a user-friendly tool and actively promote the plan to your team, explaining its benefits. This encourages everyone to stay on track and update the plan regularly. By following these steps, you can create a concise yet effective project plan that sets your team up for success. Creating a project plan: Tools and templates Choosing the Right Tools for Your Project Plan Project plan complexity: Simple projects: Use spreadsheets for their ease of use and customization. Complex projects: Utilize project management software for advanced features and collaboration. Key project plan information: Task identification: Assign unique IDs or names to each task for easy reference. Task duration: Estimate the time required to complete each task. Start and finish dates: Define the timeframe for each task. Task ownership: Assign responsible individuals for each task. Spreadsheets for Project Planning Suitable for: Less complex projects with clear task assignments. Benefits: User-friendly and customizable. Offers control over project plan structure. Considerations: Requires manual data entry. Example: A website launch project plan in a spreadsheet. Pro Tip: Integrate your Work Breakdown Structure (WBS) numbers for consistency. Spreadsheet templates It is helpful to try online tutorials so that you can get used to the different functionalities and user interfaces of each tool. We have included links to some project plan templates below: Smartsheet: Project Plan Templates for Microsoft Word Smartsheet: Project Plan Templates for Google Sheets Google Project Plan Timeline Template Microsoft Gantt Chart Template Work management tools There are many work management tool options available for you to utilize when planning your project. We covered some of these in previous videos, but as a refresher, it is important to keep in mind that every company, project manager, and customer has a work management tool preference. You may come across tools like Smartsheet , Asana , Jira , Trello , and many more. These tools allow for collaboration and communication at a task level. Introduction to Kanban boards Kanban Boards: A Visual Tool for Project Management Definition: Visual tools used to manage tasks and workflows. Formats: Whiteboards, magnetic boards, software, etc. Applications: Suitable for various projects, especially Agile methodologies. Provides a quick visual understanding of work progress. Facilitates task handoffs and improves workflows. Using Kanban Boards Preparation: Gather information like tasks, statuses, dates, and durations before creating a board. Example: Each colored rectangle on the board represents a task. Columns indicate task progress (e.g., To Do, In Progress, Done). Customization: Adapt columns and cards based on your needs and chosen tool. Creating Kanban Cards Content: Front: Title, ID, brief description, effort estimation, assignee. Back: Start date, blocked days, finish date. Note: This is a general overview. Specific details and layouts may vary depending on your chosen tool and project requirements. Week 3 Learning Objectives Creating and managing realistic project budgets. Budget components and stakeholder involvement. Procurement in project management (acquiring goods and services). Agile vs. traditional methodologies. Legal and contractual concepts: NDAs (Non-Disclosure Agreements), RFPs (Requests for Proposals), SoWs (Statements of Work). Vendor management. Role of legal teams and ethics in procurement. Using templates to create project budget documents. The importance of budget setting Definition: A project budget estimates the financial resources required to complete a project's goals and objectives. Breakdown: Milestone-based: Costs associated with project phases or deliverables. Forecasted: Estimated expenses over time. Components: Labor costs Operating costs Material costs (hardware, software, equipment) Importance: Communication tool for stakeholders Financial health indicator Success metric Creation Process: Collaborative effort during the initiation phase Subject to adjustments throughout the project lifecycle Involves cost estimation, stakeholder review, and approval Key Takeaways: Project budgeting is crucial for responsible resource allocation and financial management. Budgets are dynamic and require ongoing monitoring and adjustments. Effective budgeting practices ensure project success and secure future funding. Key components of a project budget Budget Complexity: Project budgets go beyond simple cost allocation and involve understanding stakeholder needs, managing unexpected costs, and adapting to changing circumstances. Budget Components: Resource costs: Labor, tools, equipment, materials, software, etc. Contingency budget: Buffer funds for unforeseen events. Reserve analysis: Identifying potential risks and allocating buffer funds. Cost of quality: Costs associated with preventing quality issues (prevention, appraisal, internal/external failure). Project Management Budget Examples: Contingency Budget: Scenario: You're managing a project to renovate a kitchen. Budget: You've budgeted for materials, labor, and permits. However, you include a contingency line item of 10% of the total budget to cover unforeseen expenses. Example: During demolition, you discover unexpected structural damage requiring additional materials and labor. The contingency budget helps cover these unplanned costs without derailing the project. Reserve Analysis: Scenario: You're leading a software development project. Analysis: You identify potential risks like delayed code reviews, third-party vendor issues, and scope creep. Action: Based on the likelihood and impact of each risk, you allocate buffer funds in the reserve to address potential issues. Example: A code review delay occurs, requiring additional developer hours. The reserve funds allocated for this risk can be used to cover the extra costs without impacting other project areas. Cost of Quality: Scenario: You're managing a project to launch a new marketing campaign. Costs: You budget for ad costs, creative design, and content development. Quality Focus: You also consider prevention costs (training for quality control), appraisal costs (testing and reviewing campaign materials), and potential failure costs (re-running the campaign due to errors). Example: During testing, you discover a critical error in the campaign messaging. The cost of fixing this error and re-running the campaign would be considered an external failure cost. By investing in thorough appraisal costs (testing) upfront, you can help minimize the risk and potential cost of such failures. Budget Dynamics: Review and reforecast: Regularly assess and revise the budget based on project progress. Reallocation: Adjust funds between budget categories as needed. Key Takeaways: Effective budgeting requires considering various factors beyond initial estimates. Proactive planning for unexpected costs and quality control is crucial. Budgets are adaptable and should be reviewed and adjusted throughout the project lifecycle. Project budgeting 101 Project Budget: An estimate of the financial resources required to achieve project goals. Budget Creation: Initiation and planning phases: Establish cost estimates and secure approvals. Ongoing review and control: Monitor progress and adjust as needed. Budget Functions: Communication tool: Informs stakeholders of project costs. Progress tracker: Monitors adherence to financial plans. Cost control mechanism: Manages project spending. Best Practices: Reference historical data: Learn from past projects' successes and failures. Collaborate with your team: Get input and ensure accuracy. Time-phase your budget: Allocate costs across the project timeline. Double-check for errors: Ensure your calculations and assumptions are correct. Categorize cost types: Separate direct and indirect costs. Budget Components: Direct costs: Expenses directly related to project completion (e.g., labor, materials, equipment, software, travel). Indirect costs: Overhead expenses supporting the project team (e.g., administrative costs, utilities, insurance, office supplies). Baseline Budget: Initial cost estimate used for comparison throughout the project. Updated only with significant changes and approvals. Monitoring and Adjustments: Continuously monitor project budget and performance. Make adjustments as needed, following approval procedures. Re-baseline the budget for significant scope changes. Reserve Analysis: Plan for unexpected costs by identifying potential risks and allocating buffer funds. Cost of Quality: Consider costs associated with preventing and addressing quality issues. Key Takeaways: Project budgeting requires ongoing collaboration, planning, and adaptation. Utilize best practices to manage costs effectively and ensure project success. Effective budgeting contributes to informed decision-making and stakeholder confidence. Creating a project budget Importance: Project budgets control costs and ensure financial viability. Techniques for Building a Project Budget Historical Data: Review past projects to understand costs and identify successes/failures. Expert Leverage: Consult colleagues or external experts for their insights. Bottom-Up Approach: List all project components (materials, resources, labor) and estimate costs. Confirmation and Baseline: Double-check estimates and set a baseline for measuring project progress. Continuous Adjustments: Regularly re-evaluate and update the budget based on project developments. Project Budget Breakdown with Plant Pals Example Task Breakdown: Divide the project into tasks and estimate costs for each. Material Costs: Account for equipment, software, supplies, and accessibility modifications for team members. Fixed Costs: Include one-time expenses like job board postings. Variable Costs: Factor in travel, meals, and other ongoing expenses. Buffer and Reserves: Allocate a percentage for unexpected costs. Planned vs. Actual Costs: Track spending throughout the project. Project Budget Goals Minimize the Gap: Aim for an estimated cost close to the final project cost. Continuous Improvement: Learn from past projects to refine future estimates. Key Takeaways Project budgets are crucial for project success. Various techniques help create accurate project budgets. Budgets require ongoing monitoring and adjustments. The goal is to minimize the difference between estimated and final costs. Helpful budget templates Budget Templates: Pre-formatted spreadsheets for project budget creation. Microsoft Excel offers various templates applicable to different projects. Google Sheets also provides budget templates (requires a Google account). Spreadsheet Skills for Budgeting Essential Skills: Mastering basic spreadsheet functions is crucial for efficient budget management. Formulas: Learn to use formulas like SUM and AVERAGE to automate calculations. Tables: Utilize tables for organization and data manipulation. Filters: Employ filters to focus on specific budget elements. Additional Resources: Access course materials for a comprehensive introduction to these spreadsheet skills. Maintaining a project budget Project Budget Monitoring Importance: Regular monitoring ensures plans are on track financially and operationally. Milestones as Checkpoints: Use project milestones to review and adjust the budget as needed. Milestones may also be tied to payment schedules in fixed contracts. Cost Control Techniques Proactive Approach: Identify and address potential cost variances to stay within budget. Sign-Off Plan: Establish a process for approving contractor timesheets, invoices, and budget changes. Secure stakeholder approval before incurring new costs not in the original scope. Managing Budget Changes Communication: Update forecasts and communicate changes to stakeholders. Acceptable Limits: Collaborate with stakeholders to define acceptable cost overrun limits. Impact of Budget Variances Over Budget: May reduce funds available for other company initiatives. Under Budget: This may indicate inaccurate initial estimates, missed opportunities, or tighter future budgets. Ideal Budget Management Balanced Approach: Account for and manage risks to achieve a realistic budget. Overcoming budgeting challenges Challenge 1: Pre-allocated Budget Description: The budget is set before the project scope is finalized. Solution: Collaborate with the client to manage expectations on deliverables within the allocated budget. Action: Detailed planning and continuous monitoring of expenses against the pre-allocated budget. Challenge 2: Inaccurate TCO Calculation Description: Underestimating the total cost of ownership (TCO) of project resources. Solution: Factor in all costs associated with a resource over its lifetime, not just upfront costs. Example: Consider maintenance, warranties, upgrades, etc. when budgeting for software. Challenge 3: Scope Creep Description: Unplanned changes and growth in project scope after it begins. Causes: Vague project scope, undocumented agreements, unrealistic timelines, and last-minute requests. Prevention: Clearly define project scope upfront, document all agreements, set realistic timelines, and manage stakeholder expectations. Introduction to budgeting terms Cash Flow: The movement of money into and out of a project. Inflow (cash coming in) is used to pay for resources, materials, and services. Monitoring cash flow helps assess project health and identify potential funding shortfalls. CAPEX (Capital Expenses): Major, long-term, upfront expenses for assets (buildings, equipment, vehicles) with expected future benefits. OPEX (Operating Expenses): Short-term, recurring expenses for daily operations (wages, rent, utilities). Contingency Reserves (Buffers): Funds allocated to cover identified project risks and potential cost overruns. Determined through risk management processes. Management Reserves: Funds set aside to address unforeseen risks not identified during planning. Typically a percentage of the total project budget (5-10%). Require project sponsor approval for use. Understanding procurement Definition: Obtaining goods, services, and vendors necessary to complete a project. Vendors are individuals or businesses providing essential project resources. Vendor Management: Activities associated with sourcing and managing vendors. Includes researching, obtaining quotes, selecting vendors, negotiating contracts, setting deadlines, evaluating performance, and ensuring payments. Focuses on acquiring specialized skills or services not available within a company. Example: Office Green hiring a contract copywriter for Project Plant Pals due to a lack of internal resources. The procurement process Steps: Initiating: Identifying needs, justifying procurement, and planning the process. Selecting: Choosing vendors and the supplies/services required. Contract Writing: Developing, reviewing, and signing contracts. Controlling: Managing payments, logistics, quality control, and ensuring adherence to the agreement. Completing: Evaluating the success of the procurement process. Agile vs Traditional Procurement Agile: More collaborative with vendors. Emphasis on relationships and continuous evaluation. Living contracts that adapt to project needs. Requires supplier flexibility and communication of Agile methodology. Traditional: Focuses on standard contracts with clear terms and deliverables. The project manager may handle procurement independently. Lengthy contracts with detailed requirements and deliverables. Offers clearer workstreams, and deadlines, and may minimize unforeseen costs. Negotiation can be trickier, requiring more upfront detail and planning. Tips for the procurement process Initiating: Identify project needs and required materials/resources. Compare item specifications with project requirements to avoid unnecessary features. Selecting: Research and assess vendors based on quality and timeliness. Conduct interviews and potentially visit vendor sites to gain a deeper understanding. Contract Writing: Pay close attention to inclusions/exclusions in vendor offers. Identify areas where in-house resources can be used to reduce costs (storage, equipment, labor). Carefully review contracts (written by you or the vendor) and consult legal/compliance teams. Controlling: Monitor vendor performance and quality of work. Maintain clear communication with vendors to ensure adherence to project requirements and deadlines. Build strong relationships with vendors to facilitate adjustments and revisions. Conduct regular check-in meetings to keep projects on track. Completing: Evaluate the success of procurements (material quality, labor contracts, vendor relationships). Document lessons learned for future projects. Key Takeaways: Procurement is iterative and may be repeated throughout a project lifecycle. Continuously evaluate vendors and consider new options if necessary. Revise contracts as needed throughout the procurement process. Common procurement documentation Non-Disclosure Agreement (NDA): Protects confidential information within an organization. Used when working with external vendors on sensitive projects (e.g., proprietary technology, new product launches). Example: Project Plant Pals (new, not public yet) requires vendors to sign an NDA. Request for Proposal (RFP): Solicits bids from vendors to identify the best fit for a project. Used across various industries and departments. Typically includes: Overview (project purpose, goals) Desired outcomes Budget, deadlines, milestones Contact information Submission requirements (format, prototypes) Questions for vendors (potential issues, cost breakdown) Example: RFP for Project Plant Pals to find plant providers (best price, quality, value). Statement of Work (SOW): Detailed description of project requirements and deliverables. Sent to the selected vendor and evolves as the project progresses. Discussed in more detail in the next video. Creating a Statement of Work Definition: A document outlining project requirements, deliverables, and responsibilities. Purpose: Clearly defines expectations for all parties involved (client, vendor, contractor). Creation: Developed by project manager with input from SMEs and legal advisors. Includes page headers, stakeholder information, revision table. Sections: Purpose: Explains desired outcomes and target audience. Scope: Defines services provided, in-scope items (e.g., plant types), and out-of-scope items (e.g., custom orders). Deliverables: Lists project outputs (e.g., maintenance guides, support page). Milestones: Tracks project progress (e.g., completing first quarter of orders, customer surveys). Schedule: Specifies timeframe for project completion. Terms and Conditions: Includes disclaimers for revisions and unforeseen circumstances. Payment Terms: Defines payment schedule for vendors/contractors (e.g., upon delivery, milestones). Example: SoW for Project Plant Pals (Office Green) Deliverables: Plant maintenance guides, website support page. In-Scope Plants: Ferns, cacti, bonsai trees. Out-of-Scope Services: Annual reporting, custom plant orders. Obtaining procurement support Performance Tracking: Use performance trackers and meetings (quarterly business reviews) to monitor vendor performance against the contract. Legal Team: Assists with reviewing contracts and unfamiliar legal terminology. Involvement depends on company size (in-house team, outsourced team, advisors). Reviews ensure adherence to laws (manufacturing, consumerism) and company ethics/values. Compliance Team: Ensures adherence to company policies, government regulations, and ethical practices (fair trade, discrimination prevention, social responsibility). Project managers keep stakeholders informed of relevant compliance meetings and approvals. Example: Project Plant Pals Legal review is crucial to avoid liability (e.g., non-toxic plants for pet-friendly offices). Contract review is good business practice regardless of company legal structure. Key Takeaway: Project managers should leverage legal and compliance teams for support throughout the procurement process. Ethics in the procurement process Importance: Avoids scandals and legal issues. Ensures responsible business practices. Reduces project risks. Project Manager's Role: Research and mitigate ethical risks (safety, economic, environmental). Monitor and evaluate project ethics throughout the lifecycle. Safeguarding Methods: Understand legal requirements and professional codes of ethics (e.g., PMI Code of Ethics). Identify unethical practices (bribery, corruption, unfair labor practices). Consult the legal team for complex situations. Examples of Unethical Practices: Bribery or corruption. Unfair labor practices (low wages, poor working conditions). Sole-supplier sourcing without justification. Unethical interactions with government entities. Ensuring Ethical Procurement Throughout the Project Lifecycle: Initiating: Evaluate the project against business ethics and environmental regulations. Assess potential risks. Build a diverse and ethical team. Selecting: Research vendor ethics and fair pricing. Understand the supply chain (if applicable). Contracting: Perform audits and quality control. Approve invoices. Controlling: Maintain positive vendor relationships. Monitor progress and identify ethical concerns. Key Takeaway: Project managers play a crucial role in ensuring ethical procurement practices. Trust your judgment and seek guidance when necessary. Avoiding ethical traps in procurement Ethical Traps: Dilemmas causing decisions that disregard ethical principles. Common Traps: Corruption &amp; Bribery: Vendors offer unfair advantages (money, gifts) to win contracts. Sole-Supplier Sourcing: Bypassing competitive bidding for familiar vendors. Interactions with State-Owned Entities: Unfamiliarity with stricter ethical regulations. Avoiding Traps: Understand Legal Requirements: Research regulations for your project and location. Stick to Ethical Codes: Follow professional codes (e.g., PMI Code of Ethics). Test Your Ethics (When Facing a Dilemma): Shame Test: Would you be ashamed if others knew? Community Test: Would you want your friends to know? Legal Test: Could you face legal repercussions? Situation Test: Are your actions justified in this specific situation? Consequence Test: Are the potential negative outcomes worth it? Key Takeaway: Informed decision-making based on legal and ethical principles helps you navigate procurement ethically. Week 4: Managing risks effectively Learning Objectives Communicate and resolve identified issues in a risk management plan. Identify types of risks and measure their impact on a project. Examine tools for identifying, assessing, and managing risks. Explain what risk management is and how it can help prevent project failure. The importance of risk management Risk: Potential event that could impact a project. Issue: Known problem affecting a project's tasks. Risk Management: Identifying, evaluating, and planning for potential risks. Importance of Risk Management: Proactive planning for potential problems. Improves chances of project success (meeting goals, timelines). Increases flexibility and adaptability. Reduces impact of unforeseen events. Example: Project Plant Pals Risk: Launch delayed due to web page not being live. Risk: Fulfillment shortage of cacti and ferns. Phases of risk management Risk management is a continuous process throughout a project lifecycle, typically involving these five steps: 4333875 390525 Identify the Risk: Brainstorm potential issues with your team. You can't manage risks you don't know exist. Analyze the Risk: Assess the likelihood of each risk occurring and the potential impact it could have on your project. Prioritize risks based on severity. Evaluate the Risk: Determine which risks require the most attention based on the risk analysis. Treat the Risk: Develop plans to address each risk. This may involve mitigation strategies (reducing impact), avoidance (completely eliminating the risk), or acceptance (deciding to live with the risk). Monitor and Control the Risk: Assign team members to track identified risks and take action if necessary. This ensures continuous risk management throughout the project. Uncover opportunities using risk management Risk management isn't just about identifying and mitigating negative impacts. It can also be used to uncover and capitalize on positive outcomes: opportunities. Opportunity Definition: A potential positive consequence of a risk. Importance of Identifying Opportunities: Achieve project goals faster, cheaper, or with less effort. Maximize project benefits. Recognizing Opportunities: Use the same risk management phases (identify, analyze, evaluate, treat, control). Techniques like brainstorming and past project experience can be helpful. Example: Risk: Supplier price increase for materials. Opportunity: Identify alternative, potentially cheaper suppliers beforehand. By proactively considering opportunities, project managers can position their projects for greater success. Tools to help identify risks Risk Identification Techniques: Brainstorming: Group discussion for identifying potential risks. Cause-and-Effect Diagram (Fishbone Diagram): Shows potential causes of a risk. Risk Assessment: Estimating the qualities (likelihood and impact) of a risk. Risk Register: A list of identified project risks. Probability and Impact Matrix: Tool to prioritize risks based on likelihood and impact. Impact: Potential damage caused by a risk (high, medium, low). Probability: Likelihood of a risk occurring (high, medium, low). Inherent Risk Rating: Risk severity based on probability and impact (high, medium, low). Risk Appetite: An organization's tolerance for risk. How to create a fishbone diagram A fishbone diagram (Ishikawa diagram) is a visual tool used to identify causes of a problem or risk. Purpose: Identify root causes of potential problems in projects. Steps to Create a Fishbone Diagram: Define the Problem: Clearly state the problem at the head of the fishbone. Identify the Categories: Brainstorm relevant categories that could contribute to the problem (e.g., people, materials, environment). Add these as branches stemming from the main spine. Brainstorm the Causes: For each category, brainstorm potential causes that could contribute to the problem. Analyze the Causes: Evaluate each cause to identify the root cause of the problem. Example: Delivery Delays at Office Supply Inc. Problem: Trouble delivering products to downtown office buildings on time. Categories: People, Technology, Materials, Transportation, Environment. Causes: (Examples) People: Lack of training, distractions, lack of personnel. Technology: Overcomplicated or outdated delivery software. Materials: Fragile packaging, lack of forklifts. Transportation: Trucks too small/big, lack of trucks. Environment: City traffic, busy elevators, long distances. Analysis: 208125 200025 Root cause may not be the first identified cause (e.g., lack of forklifts may not significantly reduce delivery time). Analyze causes to identify the underlying issue (e.g., no set delivery schedule during rush hour traffic). Additional Tips: Brainstorming should be a judgment-free zone. Focus on behaviors, not individuals, when considering human factors. Fishbone diagrams can be used for risk planning (identifying potential causes) and issue resolution (finding root causes). Types of risk Time Risk: Project tasks taking longer than expected (impacts budget and stakeholders). Budget Risk: Project costs exceeding planned budget (due to poor planning or scope creep). Scope Risk: Project deliverables not meeting goals (may not meet stakeholder expectations). External Risks: Events outside your control that can impact the project (e.g., environmental, legal). Single Point of Failure: Risk with catastrophic potential to halt the project (e.g., database outage). Dependency Risk : Delays caused by interrelated project tasks requiring completion in a specific order. Internal Dependency: Within your control (e.g., design approval before development). External Dependency: Outside your control (e.g., supplier inventory dependence on weather). Managing single point of failure risks Single Point of Failure Risks Definition: A risk with catastrophic potential to halt the project (e.g., database outage, key personnel loss). Importance of Mitigating: High potential for disruption, so prioritize planning for these risks early. Example: Relying on a single supplier for critical materials. Mitigating Single Point of Failure Risks Strategies: Avoid: Eliminate the risk altogether (e.g., find alternative suppliers). Minimize: Reduce the impact of the risk (e.g., use multiple suppliers for part of the needs). Transfer: Shift responsibility to another party (e.g., outsource the critical task). Accept: Acknowledge the risk and its potential consequences (e.g., budget additional funds for alternative solutions). 1371600 216061 Case Study: Office Green Risk: Seed supplier price increase due to new export tax. Mitigation Strategies: Avoid: Use alternative, widely available seeds. Minimize: Use multiple suppliers from different locations. Transfer: Find a supplier in North America that sources seeds from South America. Accept: Absorb the cost increase or find alternative plants. Visualizing dependency relationships Dependency Relationships in Projects Definition: Relationships between project tasks where one task relies on another to begin or finish. Types of Dependencies: Finish to Start (FS): Most common, Task A must finish before Task B can start (e.g., writing a report before printing it). Finish to Finish (FF): Less common, Task A must finish before Task B can finish (e.g., baking a cake before decorating it). Start to Start (SS): Tasks A and B can begin at the same time (e.g., paying for a train ticket and boarding the train). Start to Finish (SF): Task A must begin before Task B can be completed (e.g., a coworker starting a shift before another coworker can finish theirs). Dependency Graphs: Visual representations of the flow of work in a project using dependencies. Example: Making Peanut Butter and Jelly Sandwiches: Task A: Gather Materials (After Starting the Project). Task B: Put Jelly on Bread (After A). Task C: Put Peanut Butter on Bread (After A). Task D: Put Bread Together (After B and C). Task E: Serve to Kids (After D). Key Takeaways: Understanding dependencies helps identify potential risks. Dependency graphs help visualize task flow and dependencies. Risk mitigation strategies Risk Mitigation Planning: Finding ways to eliminate or reduce the impact of project risks. Common Strategies (using Office Green as an example): Avoid: Select a different contractor with a good reputation if a potential contractor has a history of missing deadlines. Accept: Acknowledge a low probability, low impact risk, such as a potential two-day delay due to a backordered planter style. Reduce/Control: Implement actions to minimize the risk, such as daily check-in meetings to address a risk of missed deadlines by a contractor. Use a decision tree to visualize these actions and their impact. Transfer: Shift responsibility to another party, such as outsourcing plant production to local suppliers to reduce the risk of growing plants on-site and facing issues like bad weather or pests. Choosing the Right Strategy: Selecting the most appropriate strategy depends on the specific risk and project context. Building a risk management plan Importance: A risk management plan documents how to address potential project risks. Content: Project name, author, creation date, last update date. Document objective (e.g., outline mitigation plans for Project X). Executive summary (brief project overview and potential risks). Risk register: Table containing identified risks. Risk description (e.g., vendor falling behind schedule). Inherent risk rating (probability and impact combined). Mitigation plan (actions to reduce/eliminate the risk). Example: Project Plant Pals risk management plan. Risk: Vendor falling behind deadline. Mitigation plan: Daily meetings with the vendor. Benefits: Improves communication and stakeholder alignment. Ensures everyone is aware of potential problems and solutions. Provides a central location for risk management information. Allows for updates as the project progresses. Communicating risks to stakeholders Importance: Stakeholders need to be aware of potential risks to make informed decisions and provide support. Communication Methods: Low-Level Risks: Include them in routine project updates (e.g., weekly emails). Medium-Level Risks: Send dedicated emails with more details and mitigation plans. Mark as &quot;urgent&quot; if necessary. High-Level Risks: Discuss them in meetings and presentations, including mitigation plans. Solicit stakeholder feedback and suggestions. Benefits: Improved stakeholder alignment and ability to help during issues. Sets expectations for potential challenges. Demonstrates proactive risk management. Identifies additional risks through stakeholder insights. Example: A program manager discussing potential risks of a new product with a stakeholder from another team. The stakeholder raises concerns about potential resource risks to their team. Week 5: Organizing communication and documentation Learning Objectives Draft a simple communication plan and explain how to manage it Examine the elements of a communication plan that are vital to project success. Explain the value of documentation in creating visibility and accountability for team members. Organize project documents in one centralized place. Prepare for a job search by documenting career-relevant experience and highlighting transferable skills. (Optional) Why communication is critical Example: A project manager identified a communication gap between a designer, their manager, and themselves. This almost caused delays due to the designer's workload. Effective Communication: It's the flow of information, clear, honest, relevant, and frequent (avoiding overload). Benefits: Keeps projects on track, utilizes communication tools effectively, and avoids issues through clear goal setting and progress updates. Project Manager's Role: Establish consistent communication, set the communication tone, and ensure everyone stays aligned. Tips for Effective Communication Effective communication is crucial for project success. Here are four key tips: Recognize Differences: Respect and understand your team's diverse backgrounds and perspectives. Avoid biases and use inclusive language. Craft Clear Messages: Tailor your message to your audience (consider their needs and the purpose of communication). Be clear, concise, and stay on topic. Choose the Right Delivery Method: Select the most appropriate method (in-person, email, etc.) considering the message, audience, and potential time zone differences. Obtain Feedback and Adapt: Ensure clarity by checking for understanding and actively solicit feedback. Respond promptly and adapt future communication based on insights gained. Following these tips will help project managers foster effective communication, leading to better project outcomes and a healthy team environment. Starting a communication plan A communication plan is a crucial tool for organizing and documenting project communication strategies. It ensures everyone involved is informed and aligned throughout the project lifecycle. Key Elements of a Communication Plan: What (Type of Communication): Define the types of communication needed (e.g., status updates, issue reports, user feedback). Who (Recipients): Identify who needs to receive each communication (e.g., stakeholders, project team). When (Frequency &amp; Timing): Determine the communication frequency (e.g., daily, monthly) and key dates (e.g., deadlines, meetings). Tailor the frequency to recipient needs (e.g., stakeholders receive high-level summaries less often, while core teams get more frequent detailed updates). How (Delivery Method): Choose the most appropriate method for each communication (e.g., email, in-person meetings, presentations). Why (Goal of Communication): Specify the purpose of each communication (e.g., progress updates, risk identification, action planning, lesson learned sharing). Where (Storage Location): Ensure clear and easy access to communication resources (e.g., meeting notes, documents) for all stakeholders and team members. Benefits of a Communication Plan: Continuity: Enables smooth handover to new project managers by providing access to past communication and documentation. Change Management: Facilitates successful project implementation by keeping stakeholders informed and prepared for changes. Efficiency: Streamlines communication processes by avoiding information overload and ensuring everyone receives the right information at the right time. Note: The size and complexity of the communication plan will vary depending on the specific project. Developing a communication plan A communication plan is a roadmap for effective project communication, ensuring everyone involved stays informed and aligned. Here's how to build a communication plan: What (Type of Communication): Identify the types of communication needed (e.g., status reports, issue reports, user feedback). Consider using RACI charts and stakeholder maps to determine the best communication methods for each recipient group. Who (Recipients): Determine who needs to receive each communication (e.g., stakeholders, project team). Categorize recipients based on their level of involvement and interest (highly involved, informed of milestones). When (Frequency &amp; Timing): Establish communication frequency (e.g., daily, monthly) and key dates (e.g., deadlines, meetings). Tailor frequency to recipient needs (e.g., less frequent high-level summaries for stakeholders, more frequent detailed updates for core teams). How (Delivery Method): Choose the most appropriate method for each communication (e.g., email, in-person meetings, presentations). Consider factors like recipient availability and attention spans (e.g., concise emails for busy executives, presentations for visual learners). Why (Goal of Communication): Specify the purpose of each communication (e.g., progress updates, risk identification, action planning, lesson sharing). Ensure communication is focused and delivers the information most relevant to the recipient. Additional Considerations: Contact Information &amp; Time Zones: Include contact information and time zones for all recipients to facilitate communication scheduling. Key Dates: List key dates and times for meetings, presentations, or product launches. Delivery Methods: Select delivery methods for each communication type (e.g., email, meetings, shared documents). Goals: Clearly define the goal of each communication (e.g., status update, identify blockers, determine next steps). Sender/Owner: Assign a sender or owner responsible for initiating each communication. Gathering Feedback: Regularly solicit feedback from recipients to ensure communication methods and content meet their needs. Benefits of a Communication Plan: Improves overall communication effectiveness. Keeps people engaged and motivated throughout the project. Gets stakeholders involved in productive conversations. Ensures smooth handover to new project managers. Facilitates successful project implementation through effective change management. Best practices for building a communication plan An effective communication plan is a roadmap for successful project communication. Here are key tips to remember when creating yours: Identify Audience and Needs: Stakeholders: Identify all project stakeholders using a RACI chart or stakeholder map. Communication Needs: Determine who needs information at each project stage, preferred communication methods, and the level of detail required. Communication Goals: Define the purpose of each communication (e.g., progress update, action items, decision making). Barriers: Consider potential barriers like time zones, language differences, accessibility limitations, and response times. Develop and Document the Plan: Choose a Tool/Template: Select a tool or template to document your communication needs. Include a Notes Column: Add notes for reminders, backup plans, or additional details. Use Formatting: Highlight key details (e.g., deadlines) with different fonts or sizes. Share with Your Team: Grant your team access to the plan for review and feedback. Test the Plan: Test communication methods (e.g., emails, presentations) to ensure they work properly. Continuously Improve: Check-in with Audience: Regularly assess the plan's effectiveness through surveys, feedback sessions, or one-on-one conversations. Evaluate Communication: Identify areas for improvement (e.g., over-communicating, under-communicating, missing stakeholders). By following these best practices, you can build a communication plan that ensures clear and efficient communication throughout your project lifecycle. The value of project documentation Documentation is a crucial aspect of project management, serving as a communication tool for various purposes: Centralized Knowledge Repository: Stores project plans, reports, and other materials in one place for easy access by all team members. Eliminates wasted time searching for information. Improved Communication and Collaboration: Facilitates knowledge sharing between teams (e.g., research findings). Enables efficient communication by providing a central reference point. Visibility and Accountability: Project plans with assigned owners and deadlines promote transparency and responsibility. Serves as a reference for stakeholders and team members for timelines and milestones. Continuity and Knowledge Transfer: Ensures smooth project handover if a team member leaves or needs to be replaced. Provides historical context for future projects and decision-making. Effective Documentation Practices: Clear Labeling and Organization: Use clear labels and folder structures for efficient information retrieval. Permission Management: Restrict access to sensitive documents based on roles and permissions (e.g., need-to-know basis). Focus on Key Information: Tailor document content to the specific needs of the recipient. Avoid information overload. Security for Sensitive Data: Implement access controls to protect sensitive data (e.g., PII). Summarize or present findings in reports without including sensitive details. Benefits of Effective Documentation: Streamlined communication and collaboration Improved project visibility and accountability Ensures smooth project continuity and knowledge transfer Informs future project planning and decision-making Organizing project documentation A well-organized project information system is key to efficient project management. Here's how to create a centralized location for all your project resources: Centralized Storage: Use a shared file drive (e.g., Google Drive) to store all project files in a dedicated folder. Consider creating subfolders for further organization by category (e.g., documents, reports, images). Centralized Planning Document: Create a document or spreadsheet that links to all the project files for easy reference. Include a brief project overview, instructions for using the document, and communication expectations. Link each resource name within the document to its corresponding file. Grouping Spreadsheets: If your project uses multiple spreadsheets, consider grouping them into one master sheet with tabs for each specific spreadsheet. This eliminates the need to open multiple files and provides a consolidated view of project data. Benefits of Organization: Easier access to project information for all team members. Reduced confusion and improved communication. Increased efficiency and productivity. Improved ability to showcase project management skills. Remember, this is a general approach, and you can adapt it to fit your specific project management style or system. Course 3 Glossary | PM Terms and Definitions - Google Docs

---

<a name="google-pm-agile-pm"></a>
## Google PM: Agile PM

**Source**: `google-pm-Agile_Project_Management.txt`

Agile Project Management Summarize this in points, headings, and subheadings: Summarize this in points, headings, and subheadings starting with header 3: TOC \h \u \z \t &quot;Heading 1,1,Heading 2,2,Heading 6,6,&quot; The Fundamentals of Agile - Module 1 1 Learning Objectives 1 A Brief History of Agile 1 Distinguishing Agile from Waterfall 1 The four values of the Agile Manifesto 2 The 12 Principles of the Agile Manifesto 3 Adopting an Agile Mindset 5 Applying Agile in a VUCA environment 7 Introduction to Scrum 7 The founding principles of Scrum 9 Introduction to Kanban, XP, and Lean 10 Blending project management approaches 12 Scrum 101 - Module 2 17 Learning Objectives 17 Introduction: Scrum 101 17 The three pillars of Scrum 18 The five values of Scrum 19 Essential Scrum Roles 20 Traits of an Effective Scrum Master 21 Pete: What makes an effective Scrum Master 22 Traits of an Effective Product Owner 23 Traits of an Effective Development Team 25 Characteristics of a Great Scrum Team 26 The Fundamentals of Agile - Module 1 Learning Objectives Explain the Project Management certificate program structure and course functionality. Describe the history and motivation behind the emergence of Agile and Scrum. Explain the Agile project management approach and philosophy, including values and principles. Explain why Agile is best suited for industries or projects that are susceptible to or that encourage change and uncertainty. Discuss the origins of Scrum and the basics of Scrum theory. Differentiate Agile frameworks and explain when and why to blend approaches. A Brief History of Agile This video dives into Agile project management, its history, and how it contrasts with the Waterfall method. Waterfall vs. Agile Waterfall follows a linear structure, completing phases sequentially without revisiting previous steps. Agile, true to its name, emphasizes flexibility, iteration, and adapting to changes throughout the project. Agile Origins Agile arose from the software boom of the 1990s, driven by companies like Google seeking faster, more efficient development methods. The Agile Manifesto, created in 2001, emphasizes flexibility and prioritizes people (team and users) over rigid processes. Agile Beyond Software While born in the tech world, Agile's principles have found success in diverse industries, from manufacturing and healthcare to finance and education. This adaptability highlights Agile's effectiveness in navigating complex projects across various sectors. Distinguishing Agile from Waterfall This lecture clarifies the differences between Agile and Waterfall project management by examining how each approach handles three key aspects: requirements, documentation, and deliverables. Agile's Dynamic Nature Agile views requirements as fluid and evolving, encouraging continuous collaboration with stakeholders to refine and prioritize them throughout the project. It favors streamlined documentation that is essential and fit for purpose, prioritizing real-time communication and collaboration over extensive paperwork. Waterfall's Linear Approach Waterfall relies on comprehensive, upfront planning and documentation, with a formal process for managing changes to meticulously defined requirements. It follows a linear sequence of phases, with deliverables typically presented as a single, comprehensive product at the end. Let's imagine a software development team working on a mobile app for a local coffee shop: Waterfall Approach: The team spends weeks gathering detailed requirements for every feature of the app, from loyalty programs to online ordering. They create extensive documentation and get it formally approved by various stakeholders. Months later, they delivered the completed app, only to find that the coffee shop now wants to integrate with a food delivery service, a feature not initially considered. This requires significant rework and delays. Agile Approach: The team starts with the core features of the app, like a simple menu and location finder. They release a basic version of the app quickly and gather feedback from the coffee shop owners and customers. Based on the feedback, they prioritize features like online ordering and loyalty programs for the next iteration. When the food delivery service integration request comes in, they can easily adapt and include it in the next sprint. This example highlights how Agile's iterative approach and focus on feedback allow for flexibility and adaptation to changing requirements, unlike the rigid structure of Waterfall. The four values of the Agile Manifesto This video explores the Agile Manifesto, emphasizing its importance in understanding the core principles of Agile project management. Values of the Agile Manifesto Individuals and interactions over processes and tools: Prioritize communication and collaboration within the team. Working software over comprehensive documentation: Focus on delivering a functional product over extensive documentation. Importance of Customer Collaboration and Adaptability Customer collaboration over contract negotiation: Value customer feedback and adapt to their needs throughout the project. Responding to change by following a plan: Embrace change and remain flexible to incorporate new information. Remember, the Agile Manifesto guides us towards a more adaptable and customer-centric approach to project management. Feel free to ask if you have any questions about these values! Let's imagine you are working on a marketing campaign for a new product launch. Initial Plan: You diligently create a detailed marketing plan, outlining timelines, channels, content, and budget allocation. Everything looks perfect on paper. Unexpected Change: A week before the launch, a competitor unexpectedly releases a very similar product with a huge marketing blitz. This directly impacts your projected market share and overall campaign success. Rigid Approach (Non-Agile): Sticking rigidly to the initial plan might mean you launch your campaign as scheduled, but risk being overshadowed by the competitor and not meeting your goals. Agile Response: Instead of panicking, an Agile approach would be to: Acknowledge the change: Recognize that the competitive landscape has shifted and your initial plan needs adjustment. Collaborate: Gather your team, including stakeholders, to brainstorm solutions and revise the strategy. Adapt: Perhaps you reallocate budget towards more impactful channels, adjust messaging to highlight your unique selling points, or even consider a slight delay to refine your approach. Outcome: By responding to the change, you are more likely to launch a successful campaign that considers the new market reality, even if it deviates from the initial plan. This example highlights how being flexible and adaptive is crucial in project management. While plans are important, being able to respond effectively to unexpected changes can ultimately determine the success of your project. The 12 Principles of the Agile Manifesto Principles behind the Agile Manifesto Value Delivery Our highest priority is to satisfy the customer through early and continuous delivery of valuable software. Focus on delivering value to customers as quickly as possible. Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale. Emphasizes the importance of frequent delivery to gather feedback and adjust accordingly. Working software is the primary measure of progress. Progress is measured by the delivery of functional, valuable software. Simplicity—the art of maximizing the amount of work not done—is essential. Focus on simplicity to avoid unnecessary work and deliver what truly matters. Continuous attention to technical excellence and good design enhances agility. Maintaining high standards in technical work and design helps in delivering value more effectively. Business Collaboration Business people and developers must work together daily throughout the project. Close collaboration between business stakeholders and developers ensures alignment and quick decision-making. Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage. Flexibility in responding to changes ensures that the product remains aligned with business needs. Team Dynamics and Culture Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done. Empowering and trusting the team is crucial for success. The best architectures, requirements, and designs emerge from self-organizing teams. Self-organizing teams are more effective in creating optimal solutions. Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely. Sustainable work practices ensure long-term productivity and team well-being. The most efficient and effective method of conveying information to and within a development team is face-to-face conversation. Direct communication fosters better understanding and collaboration within the team. Retrospectives and Continuous Learning At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly. Continuous reflection and adaptation are key to improving team performance and processes. Adopting an Agile Mindset Real-Life Example: Adopting Agile and VUCA Organizational Context Company : A global pharmaceutical company. Setting : Diverse cultures, business objectives, and industry dynamics. Agile Mindset Objective : Deliver value in a world with high uncertainty, risk, and competition. Approach : React quickly to new information, market opportunities, and technologies. Industries Susceptible to Change Biotechnology : Scenario : Development of a new vaccine. Agile Application : Rapid iterations and testing to adapt to emerging research and regulatory changes. Media : Scenario : Launching a new streaming platform. Agile Application : Continuous updates and feature releases based on user feedback and market trends. Food Industry : Scenario : Introducing a new food product. Agile Application : Quick adaptation to consumer preferences and food safety regulations. Fashion : Scenario : Seasonal fashion line. Agile Application : Fast design and production cycles to keep up with trends. Stable Industries Adapting to Change Agriculture : Scenario : Implementing new farming technology. Agile Application : Adapting to new regulations and environmental conditions. Aerospace : Scenario : Developing a new aircraft model. Agile Application : Iterative design and testing to meet safety standards and technological advancements. Manufacturing : Scenario : Streamlining production processes. Agile Application : Continuous improvement and adaptation to supply chain disruptions. Mining : Scenario : Adopting sustainable mining practices. Agile Application : Adjusting operations to comply with new environmental laws. VUCA Concept Definition Developed by : US Military War College. Purpose : Describe conditions affecting organizations in a changing, complex world. Acronym : Volatility, Uncertainty, Complexity, Ambiguity. Components Volatility : Example : Pharmaceutical companies facing rapid changes in drug approval processes. Uncertainty : Example : Media company launching a new platform without clear market predictions. Complexity : Example : The food industry manages a global supply chain with diverse suppliers. Ambiguity : Example : Fashion brand struggling to identify the root cause of production delays. Application of VUCA Tool : Helps determine the best project management approach. Decision-Making : Useful for various projects and business settings. Recap VUCA : Volatility, Uncertainty, Complexity, Ambiguity. Purpose : Handle forces in a changing world. Agile Approach : Increases success despite uncertainty. Broader Application : Concepts apply to the business world at large, not just projects. Applying Agile in a VUCA environment Importance of VUCA in Project Management Assessment : Examine the environment and conditions of the project. Agile Approach : Consider Agile if the project environment has high VUCA levels. Benefits : Mitigate risks presented by VUCA. Agile Values and Principles : Proven solution to VUCA challenges. Office Green Scenario Company : Office Green LLC, a commercial landscaping company. New Opportunity : Shift to home office setups due to market changes. Project : Virtual Verde, a new service for home offices. VUCA Factors Faced by Office Green Volatility : Major disruptive change to business plans. Uncertainty : Lack of predictability, and difficulty in creating concrete plans. Complexity : Interrelated factors like suppliers and the economy. Ambiguity : Inability to determine or control future changes. Agile Approach in Office Green Adaptation : Addressed high VUCA factors. Flexibility : Embraced changing market conditions. Outcome : Maintained business viability and adapted to new opportunities. Course Continuation Follow Along : Track the progress of Virtual Verde and the Agile approach throughout the course. Introduction to Scrum Introduction to Agile and Scrum Agile Overview History : Brief exploration of Agile history. Agile Manifesto : Core values and principles. Project Types : Types of projects benefiting from Agile. Introduction to Scrum Origins of Scrum Not an Acronym : Scrum is not an acronym. Rugby Analogy : Derived from a rugby formation where players work as a unit. Basics of Scrum Methodology Team Formation : Teams work together to develop and test deliverables quickly. Short Cycles : Work is completed in short cycles called Sprints. Daily Meetings : Teams meet daily to discuss tasks and resolve blockers. Key Scrum Concepts Artifacts Backlog : Central artifact capturing all ideas, deliverables, features, and tasks. Sprint : Time-boxed period (1-4 weeks) for completing work. Practices Daily Scrum/Stand-up : 15-minute daily meetings to inspect progress. Scrum Roles Scrum Master Responsibilities : Ensures adherence to Agile values and principles, facilitates processes and helps the team focus. Product Owner Responsibilities : Maximizes product value, prioritizes work and manages the backlog. Owning the Product Backlog: They create and manage the prioritized list of features, enhancements, and bug fixes that the team will work on. Defining and Communicating Vision: The Product Owner clearly articulates the product vision and what success looks like to the development team. Prioritizing for Value: They determine the order in which items in the backlog are worked on, ensuring the most valuable features are delivered first. Stakeholder Management: The Product Owner collaborates with stakeholders (customers, users, business representatives) to understand their needs and gather feedback. Ensuring Transparency: They make the product backlog and its progress visible and understandable to everyone involved. Development Team Responsibilities : Delivers the product. Popularity and Benefits of Scrum Clear Roles and Responsibilities Team Emphasis : Focus on team collaboration and clear roles. Regular Meetings and Schedules Predictability : Regular meetings with predefined agendas and outcomes. Support for Agile Values Structure : Adds structure to Agile principles, aiding both new and experienced teams. Accessibility Free and Open : Available for all to use with extensive online support and training. Ideal Scrum Projects and Teams Team Size Cross-Functional Teams : Ideally 3-9 The founding principles of Scrum Introduction Definition : Characteristics of Scrum and its uniqueness. Origin : The term “Scrum” from rugby, was first used in the Agile context in 1986. Key Characteristics Built-in Instability Freedom : Teams have the freedom to achieve outcomes with challenging requirements. Tension : Necessary element to carry out strategic projects. Self-Organizing Teams Autonomy : Teams operate like start-ups with no true hierarchy. Collaboration : Continuous growth and collaboration. Overlapping Development Phases Synchronization : Team members synchronize their pace to meet deadlines. Collective Pace : Individual paces overlap, forming a collective team pace. Multi-Learning Trial and Error : Framework relies on trial and error. Adaptability : Teams stay updated with market conditions and respond quickly. Subtle Control Checkpoints : Regular checkpoints to analyze interactions and progress. Creativity : Maintains control without hindering creativity. Organizational Transfer of Learning Skill Development : Encourages learning new skills and supporting team members. Conclusion Holistic Impact : Each element alone doesn’t bring speed and flexibility, but together they create a powerful dynamic. Relevance : Concepts introduced in 1986 remain true for Scrum Teams today. Introduction to Kanban, XP, and Lean Popular Agile Methodologies Introduction Agile Origins : Agile methodologies from the 90s share values and principles but have specific practices and applications. Kanban Definition : Derived from Japanese words “Kan” (sign) and “ban” (board). Visual Feedback : Kanban boards display project progress (to do, in progress, done). WIP Limit : Teams limit in-progress tasks to what they can handle, ensuring a sustainable pace. Flow : Focus on maximizing efficiency by prioritizing tasks and minimizing work in progress. Extreme Programming (XP) Origin : Emerged from the software industry, named for taking development practices to extreme levels. Core Activities : Designing : Start with simple designs, and add features after the basic model is tested. Coding : Clear and concise code for easy understanding and troubleshooting. Testing : Extensive testing to eliminate flaws before building features. Listening : Incorporate customer feedback and requirements. Innovative Practices : Pair Programming : Two team members work together on one task. Continuous Integration : Merge changes frequently for quick feedback. Avoid Big Design Up Front : Design just enough to start, and improve continuously. Write Tests, Not Requirements : Test plans guide development and validate outcomes. Lean Principles : Define Value : Focus on customer wants and include them in the process. Map Value Stream : Identify and eliminate wasteful steps in the process. Create Flow : Ensure efficient product flow, and remove interruptions and delays. Establish Pull : Allow customers to request features and deliveries as needed. Pursue Perfection : Continuously improve the first four principles. Conclusion Blending Methods : Teams often blend methodologies to create effective tools and processes. Next Steps : Further discussion on blending methodologies in the next video. Blending project management approaches Review of Agile and Waterfall Methods Introduction Previous Video Recap : Reviewed popular Agile methods: Kanban, XP, Lean. Comparison : Compare Agile to Waterfall to understand values, goals, and suitable projects. Agile Project Management Agile Thinking : Focus on values and principles from the Agile Manifesto. Frameworks and Methods : Explored Kanban, XP, Lean, and Scrum. Mindset : The agile mindset differs from traditional Waterfall models. Waterfall Project Management Phases : Initiation, planning, executing, completing tasks, closing out. Tasks : Identifying goals, scope, scheduling, budgeting, risk management. Blending Agile and Waterfall Reasons for Blending : Stakeholders prefer traditional approaches. Regulatory requirements. Vendor integration. Examples : XP and Scrum : Pair programming and retrospectives. Scrum and Kanban : Using Kanban boards in Scrum teams. Office Green Case Study Considerations : Vendor buy-in for Agile approaches. Traditional budget management controls. Key Points Agile as a Mindset : Values and principles from the Agile Manifesto. Frameworks and Methods : Scrum, Kanban, XP, Lean. Blending Styles : Adds value by combining Agile and Waterfall methods. Conclusion Next Steps : Learning about Scrum Teams and using Scrum for successful projects. The Spotify Model Introduction Flexible Approach : Spotify is renowned in Agile project management for its flexible approach. Learning Objective : Understand the Spotify model and the importance of flexibility when scaling an Agile team. Achieving Scalability Success Factors : Agile coaches Henrik Kniberg and Anders Ivarsson emphasize the constant blending of methods and adaptation. Organizational Structure Innovation and Collaboration : Encourages innovation, collaboration, and productivity while maintaining autonomy, quality, and communication. Unique System : Features Squads, Tribes, Chapters, and Guilds. Squads 47626 191088 Definition : Similar to Scrum Teams, self-organizing and collocated. Mission : Work on long-term missions like improving app usability or providing payment solutions. Leadership : No formal leader, but has a Product Owner. Support : Access to Agile coaches for continuous improvement. Tribes Definition : Collections of Squads working in a specific area. Size : Typically less than 100 people. Chapters Definition : Small groups across a Tribe with similar skills and competencies. Guilds Definition : Largest group, sharing knowledge, tools, code, and practices across the organization. Adaptation and Flexibility Customization Avoid Copying : Each team requires different workflows and systems. Trial and Error : Be open to adjusting methods if they don’t fit perfectly. Continuous Improvement Never Done Improving : Always look for changes that can be made for the better. Key Takeaways Adaptability : Adapt based on team preferences and goals. Balance : Find the right balance of collaboration and ownership. Project Needs : Examine the needs of your project and organization. Inspiration : Be inspired by the Spotify model but tailor it to your team’s needs. Framework Key Principles Roles Artifacts Ceremonies Metrics Best For Scrum Iterative, incremental development Scrum Master, Product Owner, Development Team Product Backlog, Sprint Backlog, Increment Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective Velocity, Burndown Chart Complex projects with changing requirements Kanban Visualize work, limit WIP, manage flow No specific roles Kanban Board, Work Items No required ceremonies, optional daily stand-ups Lead Time, Cycle Time, Throughput Continuous delivery, operational environments XP (Extreme Programming) Customer satisfaction, technical excellence Coach, Customer, Developer, Tracker User Stories, Task Cards Planning Game, Small Releases, Pair Programming, Test-Driven Development Code Quality, Test Coverage Projects requiring high-quality code and frequent releases Lean Eliminate waste, optimize whole No specific roles Value Stream Map No required ceremonies, continuous improvement meetings Lead Time, Cycle Time Manufacturing, process improvement SAFe (Scaled Agile Framework) Alignment, built-in quality, transparency Release Train Engineer, Product Manager, System Architect Program Backlog, Solution Backlog PI Planning, ART Sync, System Demo, Inspect &amp; Adapt Feature Progress, Program Predictability Large organizations with multiple teams LeSS (Large-Scale Scrum) Simplification, customer-centric Scrum Master, Product Owner, Teams Product Backlog, Sprint Backlog, Increment Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective Velocity, Burndown Chart Scaling Scrum for multiple teams DA (Disciplined Agile) Context-driven, hybrid approach Team Lead, Product Owner, Architecture Owner Work Items, Backlog Coordination Meetings, Retrospectives Cycle Time, Lead Time Tailoring Agile practices to specific needs Scrum 101 - Module 2 Learning Objectives Identify and compare the essential roles in a Scrum team and what makes them effective. Explain the pillars of Scrum and how they support Scrum values. Introduction: Scrum 101 Overview of Agile Mindset Agile Manifesto : Four values and 12 principles Agile Methodologies : Various methods to manage projects Introduction to Scrum Scrum Guide : Main source of truth for Scrum Teams, available at Scrumguides.org Scrum vs. Agile : Agile: Foundational philosophy and mindset Scrum: Framework that brings Agile philosophy to life Scrum’s Popularity : Widely used, especially at Google Scrum Theory Three Pillars of Scrum : Transparency : Open communication and visibility 1 Inspection : Regular checks to ensure progress 2 Adaptation : Making necessary changes based on inspections 2 Scrum Values Five Scrum Values : To be discussed in detail Importance of Team Mission Set Mission : Importance for team alignment and focus Roles within a Scrum Team Product Owner : Manages the product backlog Scrum Master : Facilitates the Scrum process Development Team : Executes the work Office Green Project Virtual Verde : New project by Office Green Scrum Master Role : Typically taken by project managers in Scrum projects Scrum Artifacts and Events Scrum Artifacts : To be introduced Scrum Events : To be introduced The three pillars of Scrum Scrum Pillars and Theory Introduction to Scrum Pillars Scrum Pillars : Foundation for Scrum Teams Three Pillars : Transparency, Inspection, Adaptation What is Scrum? Definition : Framework for developing, delivering, and sustaining complex products Approach : Iterative and incremental Iterative : Project processes are repeated in time boxes or iterations Incremental : Work is divided into smaller chunks that build on each other Importance of Iterations and Increments Increment : Each instance of the product Benefits : Allows for regular progress checks, predictability, and managing uncertainty Empiricism in Scrum Definition : True knowledge comes from actual, lived experience Application : Decisions based on real experience and hard data Mini-Experiments : Each iteration and increment as a learning opportunity Three Pillars of Scrum Transparency Definition : Making significant aspects of work visible to those responsible for the outcome Internal Transparency : Within the Scrum Team (3-9 people) External Transparency : With stakeholders, including customers, sponsors, and management Benefits : Builds trust, encourages collaboration, reduces mistakes Inspection Definition : Conducting timely checks towards the outcome of a Sprint goal Purpose : Detect undesirable variances and ensure progress Stakeholder Review : Necessary for growth and progress Benefits : More inspections lead to more improvement Adaptation Definition : Continuously adjusting projects, products, or processes to minimize deviations Embrace Change : Always improving and adapting Implementation : Immediate fixes and long-term changes to avoid repeating past mistakes Conclusion Foundation of Scrum : Transparency, Inspection, Adaptation Next Steps : Exploring the five values of Scrum teams in the next video The five values of Scrum Summary of Scrum Values and Their Relation to the Three Pillars Introduction Previous video: Discussed Scrum theory and the three pillars of Scrum. Current video: Focus on the five values of Scrum and their relation to the three pillars. The Five Values of Scrum Commitment Definition: Personally committing to achieving the goals of the Scrum Team. Example: Helping a teammate struggling with a new technology. Courage Definition: Having the courage to do the right thing and work on tough problems. Examples: Taking on a hard task requires new skills. Asking for help when stuck. Addressing negative behavior within the team. Focus Definition: Concentrating on the necessary work within the Sprint and overall goals. Example: Allowing a team member to focus on a difficult part of the solution to speed up progress. Openness Definition: Being open about all work and challenges. Example: Sharing issues with the team to find quick solutions or valuable insights. Respect Definition: Respecting the opinions, skills, and independence of teammates. Importance: Encourages listening and feedback, which is crucial for success. Relation to the Three Pillars of Scrum Transparency : Requires openness and focus to share relevant information. Inspection : Needs the courage to offer difficult feedback and respect to listen to others. Adaptation : Involves courage to make changes and commitment to follow through on adaptations. Conclusion Covered the foundational pillars and values behind a Scrum Team. Next video: Discussion on specific Scrum roles on a team. Essential Scrum Roles Scrum Team Roles and Mission Introduction Focus: Three Scrum roles, their traits, and the Scrum Team’s mission. Team Sports Analogy Comparison to soccer/football: Each position has specific responsibilities. Similarity to rugby: The team works towards a specific objective. Product Vision and Mission Agile Principle : Build projects around motivated individuals. Mission : A constant short statement guiding the team. Product Vision : Clarifies outcomes and team boundaries. Example : Office Green’s Virtual Verde project. Mission : Improves users’ health and happiness by enhancing home workspaces. Product Vision : A living marketplace transforming home offices. Scrum Team Roles Product Owner Responsible for what the team builds. Ensures everyone understands the “why”. Example: Capturing and promoting ideas for Virtual Verde. Development Team Responsible for how the product is delivered. Example: Building websites, integrating systems, fixing issues. Scrum Master Responsible for when the team delivers value. Role similar to a project manager. Example: Unblocking the team, prioritizing issues, organizing demos. Collaboration and Skills The entire team works together to achieve goals. Cross-functional: Team members from various specialties contribute. Self-organizing: Teams manage their tasks and updates independently. The five Scrum values are important: Commitment, courage, focus, openness, and respect. Conclusion Understanding of Scrum Team roles. Next focus: Traits of an effective Scrum Master. Traits of an Effective Scrum Master Scrum Master Role Introduction Scrum Master is often played by the project manager. Definition and responsibilities of a Scrum Master. Role of a Scrum Master Promotes and supports the Scrum process. Helps team understand and implement Scrum practices, rules, and values. Coaches team to manage external forces and maximize internal potential. Example Virtual Verde’s shopping cart errors. Scrum Master identifies patterns and helps find better solutions. Responsibilities Coaching on Agile and Scrum practices. Managing the Product Backlog. Facilitating Scrum events like Sprint Retrospectives. Removing blockers to progress. Preventing unhelpful interactions or interruptions. Required Traits Organizational Skills : Manage project artifacts and Scrum events. Supportive Leadership : Focus on team needs over individual needs. Facilitation : Ensure every team member’s voice is heard. Coaching : Encourage dialogue and discussion. Communication : Engage with diverse stakeholders. Differences from Project Manager Scrum Master as facilitator and coach. Project managers may handle traditional tasks like budget management and risk spreadsheets. Similar skill sets but different primary responsibilities. Conclusion Scrum Master skills: organization, leadership, facilitation, coaching, and stakeholder management. The role may differ from the project manager but can be played by the same individual. Pete: What makes an effective Scrum Master Role of a Technical Program Manager Introduction Pete, Technical Program Manager at Google. Responsible for end-to-end execution of programs. Agile Framework A core part of daily deliveries. Allows iterative process and faster product delivery. Scrum Framework Overview Implementation of Agile methodology. Focuses on delivering rapid value through iterative work. Self-Organizing Team Brings individuals together with clear roles and responsibilities. Requires a leader, the Scrum Master, to ensure alignment toward goals. Qualities of an Effective Scrum Master Teaching and Communication Instills Scrum values throughout the team. Influence Leads through influence, not managerial authority. Ensures team operates effectively and maintains motivation. Leadership Provides direction and ensures progress toward Sprint goals. Sprints are focused efforts towards well-defined goals. Personal Reflection Enjoys working with people towards common goals. Finds satisfaction in collaborative efforts despite challenges. Traits of an Effective Product Owner Understanding the Role of the Product Owner Introduction Review of the Scrum Master’s role. Introduction to the Product Owner’s role and their relationship with the Development Team. Responsibilities of the Product Owner Ensuring the Right Product : Tasked with ensuring the team builds the right product or service. Ensures the product meets user needs. Maximizing Product Value : Continuously maximizes the value of the product delivered by the Scrum Team. Acts as the voice of the customer within the team. Owns the Product Backlog, the authoritative source for project tasks. Prioritizing and Transparency : Helps the Scrum Team understand the importance of their work. Prioritizes the Product Backlog to optimize goal delivery and customer value. Ensures the Product Backlog is visible and transparent to all. Ensures the product fulfills customer needs. Key Traits of a Product Owner Customer-Focused : Understands customer needs and industry. Decisive : Makes and defends decisions to the team. Flexible : Open to new information that can lead to profitable changes. Optimistic and Positive : Delivers the product vision and inspires the team. Available : Regularly helps inspect, adapt, and plan iterations. Collaborative : Works with the team and stakeholders to meet customer needs. Example: Virtual Verde Scenario : Product Owner prioritizes features: flower arrangements, potted succulents, large potted plants, and herb gardens. Development Team suggests focusing on herb gardens first due to vendor availability. Flexible Product Owner adjusts priorities based on new information. Recap The Product Owner acts as the voice of the customer. Key traits: customer-focused, decisive, flexible, optimistic, available, and collaborative. Next topic: Role and traits of the Development Team. Traits of an Effective Development Team The Development Team in Scrum Composition and Size Made up of people who build the product Team size ranges from 3 to 9 people Ensures nimbleness and significant work completion Characteristics Cross-functional Self-organizing Customer-oriented Operates as a team, not individuals Team Location Co-located Teams Work in the same physical space Benefits: Higher-quality work Faster improvement Easier collaboration Virtual Teams Work in different locations or time zones Benefits: Flexibility Access to global talent Example: Virtual Verde Team Scenario: Issue with plant vendor Challenge: Quality assurance specialist needed on-site Solution comparison: Co-located: Quick huddle and problem-solving Virtual: Collaboration via phone, email, or video conferencing Scrum Team Roles Recap Product Owner: &quot;Building the right thing&quot; Development Team: &quot;Building the thing right&quot; Scrum Master: &quot;Building the thing fast&quot; Team Dynamics All roles are equally important Work together to create value for users and customers Characteristics of a Great Scrum Team Overview Scrum Framework : Addresses complex problems, develops high-value products, and increases organizational agility. Team Composition : Self-organizing, cross-functional, highly productive teams creating valuable product increments. Team Roles Product Owner : Maximizes value. Scrum Master : Enables continuous improvement. Development Team : Delivers high-quality product increments. Product Owner Responsibilities Product Vision : Develops and maintains vision and market strategy. Product Management : Orders and manages the Product Backlog. Stakeholder Involvement : Engages stakeholders and end-users in backlog refinement and management. Alignment : Coordinates with other Product Owners for overall product, company, or customer perspective. Characteristics Visionary : Embraces and shares the product vision. Customer-Centric : Exceeds customer expectations. Empowered : Makes swift, important decisions. Organized : Orders the product backlog considering priority, risk, value, learning opportunities, and dependencies. Communicative : Prefers face-to-face communication. Knowledgeable : Knows modeling techniques and shares experiences. User-Story Mapping : Masters user-story mapping for backlog visualization. Functionality Focused : Prioritizes functionality and non-functional aspects. Domain Expert : Understands the business domain and environment. Multi-Level Actor : Acts on strategic, tactical, and operational levels. Agile Planner : Knows the 5 levels of Agile planning. Available : Accessible to stakeholders, customers, development team, and Scrum Master. Decisive : Able to say ‘No’ when necessary. Mini-CEO : Acts as a mini-CEO, focusing on business value and ROI. Backlog Expert : Understands different types of valid Product Backlog items. Refinement Focused : Takes backlog refinement seriously, involving stakeholders and the development team. Scrum Master Overview Role : Ensures Scrum is understood and enacted. Responsibility : Ensures the Scrum Team adheres to Scrum theory, practices, and rules. Servant-Leader : Helps the Scrum Team and those outside it to maximize value. Stances of a Scrum Master Servant Leader : Focuses on team members’ needs and achieving results aligned with organizational values. Facilitator : Sets the stage and provides clear boundaries for team collaboration. Coach : Coaches individuals on mindset and behavior, the team on continuous improvement, and the organization on collaboration. Conflict Navigator : Addresses unproductive attitudes and dysfunctional behaviors. Manager : Manages impediments, eliminates waste, manages the process, team’s health, self-organization boundaries, and culture. Mentor : Transfers Agile knowledge and experience to the team. Teacher : Ensures Scrum and other relevant methods are understood and enacted. Characteristics of a Great Scrum Master Involves the Team : Ensures the team supports the Scrum process and understands the value of every event. Understands Team Development : Aware of Tuckman’s stages of team development. Principles Over Practices : Emphasizes understanding Agile principles over merely implementing practices. Recognizes and Acts on Conflict : Identifies and resolves team conflicts early. Dares to be Disruptive : Enforces necessary changes within the organization. Cultural Impact : Influences organizational culture positively. Dispensable Yet Wanted : Supports team growth to the point of not being needed daily but remains a valuable advisor. Allows Failure : Knows when to let the team fail for valuable lessons. Encourages Ownership : Coaches the team to take ownership of their process and environment. Faith in Self-Organization : Promotes self-organization within the team. Values Rhythm : Maintains a steady sprint rhythm. Power of Silence : Listens effectively and uses different levels of listening. Observes : Observes team activities without always being actively involved. Shares Experiences : Shares knowledge and experiences with peers. Retrospective Formats : Uses various retrospective formats to keep events engaging. Professional Coaching : Skilled in professional coaching techniques. Organizational Influence : Motivates and influences at tactical and strategic levels. Prevents Impediments : Proactively prevents impediments. Unobtrusive Presence : Supports the team without unnecessary interference. Partnership with Product Owner : Forms a strong partnership with the Product Owner. Leadership Encouragement : Foster's leadership within the team. Gamification : Uses game mechanics to engage and solve problems. Beyond Scrum : Knowledgeable in XP, Kanban, and Lean. Leads by Example : Inspires the team through desired behavior. Born Facilitator : Naturally skilled in facilitation, making meetings effective and enjoyable. Development Team Overview Role : Deliver a potentially releasable Increment of “Done” product at the end of each Sprint. Responsibility : Organize and manage their own work to optimize efficiency and effectiveness. Characteristics Self-organizing : Decide how to turn Product Backlog Items into working solutions. Cross-functional : Possess all necessary skills to create the product Increment. No titles : Everyone is a Developer, no special titles. No sub-teams : The entire team works together. Commitment : Achieve the Sprint Goal and deliver a high-quality increment. Attributes of a Great Development Team Pursues Technical Excellence : Uses Extreme Programming (XP) practices like refactoring, pair programming, continuous integration, unit testing, and acceptance testing. Applies Team Swarming : Works on a few items at a time, finishing them quickly with collective effort. Uses Spike Solutions : Conducts time-boxed activities to solve challenging problems. Refines Product Backlog as a Team : Considers backlog refinement a team effort. Respect the Boy Scout Rule : Always leave the code base in a better state. Criticizes Ideas, Not People : Focuses on constructive criticism. Shares Experiences : Shares knowledge within the organization and at seminars. Understand the Importance of Slack : Includes slack time in sprints for relaxation and handling emergencies. Has Fun : Ensures a healthy dose of fun and collaboration. Considers Scrum Events as Conversations : Uses events for planning, alignment, and reflection. Knows Their Customer : Maintains direct contact with customers to understand their needs. Explains Non-Functional Requirements : Communicates the business value of performance, security, and scalability. Trusts Each Other : Builds trust within the team. Keeps Retrospectives Fun : Thinks of creative retrospective formats. Delivers Features Continuously : Provides continuous delivery without needing sprints. Doesn’t Need a Sprint 0 : Delivers business value from the first sprint. Acts Cross-Functionally : Focuses on delivering a releasable product as a team. Updates Scrum Board : Keeps the Scrum/team board up-to-date. Spends Time on Innovation : Allocates time for technical and architectural innovation. Understands ‘Done’ : Knows what ‘done’ means without needing a written Definition of Done. Gives Feedback : Provides honest and respectful feedback using the ‘Situation - Behavior - Impact Feedback Tool’. Manages Team Composition : Collaborates with other teams to manage skills and composition. Practices Collective Ownership : Rotates developers across modules to encourage ownership. Fixes Dependencies : Manages dependencies with other teams. Doesn’t Need Story Points : Focuses on the number of stories rather than story points. Implementing Scrum - Module 2 Learning Objectives Apply communication tools to help plan and visualize sprint workflow and progress. Develop and break down user stories and epics. Perform Product Backlog refinement by relative effort estimation, determining acceptance criteria, and prioritization. Describe the five important Scrum events and how to set up each event for a Scrum Team. Explain how to build and manage a Product Backlog. Introduction: Implementing Scrum 2020-Scrum-Guide-US.pdf (scrumguides.org) Overview of Scrum Introduction Recap of Scrum values and essential roles for Scrum Teams. Setup and Day-to-Day Execution Detailed overview of setting up and executing a Scrum Team. Insights beyond the official Scrum Guide. Popular tools, methods, tips, and tricks for working with a Scrum Team. Managing the Product Backlog Contains all features, requirements, and activities for project deliverables. Critical artifact for Scrum Teams. Estimation Techniques Relative Effort Estimation : T-shirt sizes. Story points. Important Scrum Events Sprint : The core development cycle. Sprint Planning : Planning the tasks for the Sprint. Daily Scrum : Daily team meeting to discuss progress. Sprint Review : Reviewing the work done during the Sprint. Sprint Retrospective : Reflecting on the Sprint to improve future Sprints. Velocity and Progress Management Understanding velocity. Using burndown charts to manage progress. Useful Tools for Scrum Teams Google Docs : For documentation and collaboration. JIRA : For issue and project tracking. Asana : For task management. Trello : For visual task management. Kanban Boards : For workflow visualization and management. Building a Product Backlog Review of Project Management Artifacts Introduction Overview of various project management artifacts: project plans, statements of work, RACI charts, etc. Product Backlog in Scrum Definition The single authoritative source for team tasks. Contains all features, requirements, and activities for project deliverables. Equivalent to traditional project requirements in non-agile frameworks. Key Features Living Artifact : Items can be added at any time. Evolves throughout the project lifecycle. Central guide for the team. Ownership : Owned and adjusted by the Product Owner. Prioritization : Always a prioritized list of features. New information or features are added in order of importance. Specific and well-defined items are at the top, and vague items are at the bottom. Best Practices for Product Backlogs Fields to Capture Description : Clear and detailed item descriptions. Example: “As a Virtual Verde client, I plan to grow my choice of vegetables while I work from home in my New York City apartment.” Value : Indicates business value to customers, teams, or users. Value can be indicated using dollar signs (e.g., $ for low value, $$$$ for high value). Estimate : Effort is required to complete the item. Owned by the Development Team. Order : Prioritized based on importance. Helps in an efficient team operation. Example: Prioritizing succulents over orchids based on user preference. Creating Backlog Items Include as much detail as possible without stressing about unknowns. Document assumptions for items with unknown details. Conclusion Understanding the Product Backlog and its ownership. Identifying and describing each field in a Product Backlog. Managing the Backlog throughout Scrum practices. Writing user stories Understanding Product Backlogs and User Stories Introduction Importance of considering descriptions, value, order, and estimations in building a Product Backlog. User Stories Definition Short, simple descriptions of a feature from the user’s perspective. Helps create user-centered solutions. Elements of User Stories User : The person interacting with the product. Action : What the user wants to do. Benefit : The value the user gains. Format Common format: “As a [user role], I want [action] so that I can [value].” Creating User Personas Leo : Plant vendor managing supply chain and logistics. Felicity : Gardening expert providing customer support. Zach : Amateur vegetable gardener. Nia : Management consultant setting up a home office backdrop. Reena : Flower aficionado wanting weekly arrangements. Criteria for Effective User Stories (I.N.V.E.S.T.) Independent : Can be started and finished by itself. Negotiable : Open for discussion and changes. Valuable : Delivers value upon completion. Estimable : Clear Definition of Done for estimation. Small : Fits within a planned Sprint. Testable : Can be tested against acceptance criteria. Epics Groups or collections of user stories. Examples: Live plant delivery, office plant advice service, vendor management, and client data management. Sample User Story Example : “As a Virtual Verde client, I would like to acquire a bonsai tree so that I can have a beautiful plant and meditate as I trim the branches.” Acceptance Criteria Checklist to determine if a user story is complete. Example for bonsai tree user story: Browse for three types of bonsai trees. Compare trees based on ease of growth. Purchase bonsai care packages. Access online and packaged care booklets. Find troubleshooting information on the FAQ page. Conclusion Importance of detailed and prioritized user stories. Next steps: Backlog refinement, relative effort estimation, T-shirt sizes, and story points. The Elements of User Stories and Epics Introduction User Stories : Short, simple descriptions of a deliverable from the user’s perspective. Epics : Collections of related user stories. User Stories Importance Ensures customer satisfaction by centering on user needs and experience. Provides insight into user goals, enables collaboration, inspires creative solutions, and creates momentum. Elements User Persona : Description of the user, their relation to the project, and their goals. Definition of Done : Agreed set of items that must be completed for the user story to be considered complete. Tasks : Key activities needed to complete the user story. Feedback : Consider any feedback from previous iterations. I.N.V.E.S.T. Criteria Independent : Completion is not dependent on another story. Negotiable : Open for discussion and changes. Valuable : Delivers value upon completion. Estimable : Clear Definition of Done for estimation. Small : Fits within a planned Sprint. Testable : Can be tested against acceptance criteria. Example Template : “As a [user role], I want [action] so that I can [value].” Example : “As an avid reader, I want to read reviews before checking out a book so that I know I am getting a book I am interested in.” Epics 474825 389776 Purpose Helps manage related user stories. Larger user stories may need to be split into smaller stories. Example Website Creation Epic : User stories about reading reviews and adding books to the cart. Organization of Physical Space Epic : User stories about finding sections in the library. Key Takeaway Epics : Track large, loosely-defined ideas. User Stories : Smaller units of work inspired by the end-user or customer. Both ensure teams deliver value to the customer.

---

<a name="course-audit-&-benchmarking"></a>
## Course Audit & Benchmarking

**Source**: `course-audit.md`

# Course Audit

## Audit objective

Evaluate the current project against the public positioning of the Product Faculty / Maven AI Product Management Certification, then improve the repo so it delivers a stronger self-serve learning experience.

Audit date: April 11, 2026

## Target benchmark used

- Product Faculty course page: https://www.productfaculty.com/ai-certification-v3
- Maven course page: https://maven.com/product-faculty/ai-product-management-certification

Public pages indicated:

- 12 live sessions
- 19 lessons
- emphasis on AI paradigm shift, AI product stack, building AI products, and capstone work
- hands-on learning, case studies, and real-world application

## Current project strengths

- Strong applied orientation with exercises that push learners to produce artifacts
- Better-than-average practical depth on evals, guardrails, RAG, tools, and observability
- Useful Arabic and MENA-specific product management considerations
- Capstone framing is stronger than most course clones because it expects real deliverables
- Glossary, cheat sheets, and tool references already exist

## Gaps found before improvement

1. Product credibility gap
- The repo still used the default Vite README, which weakened trust immediately.

2. Benchmark transparency gap
- The app did not clearly state how it maps to the target certification or what it improves beyond it.

3. Source transparency gap
- Learners could not easily see what was benchmarked, when it was verified, or which sources informed the course.

4. Learning scaffolding gap
- The content was rich, but the product experience behaved like a long content viewer rather than a guided certification-style program.

5. Artifact system visibility gap
- The course talks about shipping artifacts, but the app did not foreground the artifact system as a central learning mechanic.

6. Technical maintainability gap
- Nearly the entire course product lives in one large `src/App.jsx` file, which makes future curriculum updates slower and riskier.

## Improvement standard

To be "same and better" than the target public experience, this project should:

- cover the core strategic and technical domains a modern AI PM needs
- preserve a clear capstone and delivery orientation
- include more explicit operational knowledge for 2026 AI product work
- make auditability and source freshness visible
- help learners produce reusable portfolio artifacts, not just consume lessons

## Improvements implemented

1. Repo trust upgrade
- Replaced the default README with project-specific documentation.

2. Audit artifact
- Added this audit document so the benchmark and improvement logic live in the repo.

3. In-product benchmark visibility
- Added an audit view summarizing how the course compares with the target certification.

4. In-product source transparency
- Added a sources view so learners can inspect benchmark references and current knowledge areas.

5. Stronger certification-style scaffolding
- Added explicit experience pillars and artifact tracks in the product UI.

## Recommended next upgrades

1. Break `src/App.jsx` into:
- curriculum data
- shared renderers
- top-level views
- progress helpers

2. Add downloadable templates for:
- AI PRD
- eval rubric
- rollout checklist
- responsible AI audit
- capstone scorecard

3. Add lesson-level source arrays consistently
- especially for model guidance, governance, and tooling references that can change over time

4. Add a capstone dashboard
- milestone checklist
- artifact completeness
- launch readiness score

5. Add assessment depth
- scenario-based quizzes
- rubric-scored submissions
- comparative case reviews

## Bottom line

The project already had unusually strong substance. The main problem was not lack of knowledge density, but lack of product framing, source transparency, and guided-learning scaffolding. The changes in this pass move it much closer to a credible, benchmarked, self-serve AI PM certification experience.


---

<a name="google-pm-enrichment-spec"></a>
## Google PM Enrichment Spec

**Source**: `google-pm-enrichment-spec.md`

# Google PM Certificate Enrichment — Executable Specification

**Version**: 1.0.0  
**Created**: 2026-04-11  
**Status**: ✅ Implemented
**Source Courses**: All 6 Google Project Management Certificate courses
- Course 1: Foundations of Project Management *(notes available)*
- Course 2: Project Initiation: Starting a Successful Project *(notes available)*
- Course 3: Project Planning: Putting It All Together *(notes available)*
- Course 4: Project Execution: Running the Project *(researched online — no local notes)*
- Course 5: Agile Project Management *(notes available)*
- Course 6: Capstone: Applying PM in the Real World *(researched online — no local notes)*

---

## Overview

The AI-PM-Course is a React 19 + Vite SPA containing 11 AI product management modules with 40+ lessons. This specification defines the enrichment of that curriculum with high-value, modern frameworks extracted from the full 6-course Google Project Management Certificate — filtered specifically for AI PM practitioners.

The AI PM course already excels at: LLM architecture, context engineering, evals, HITL design, token-cost modeling, guardrails. The Google PM material fills **structural gaps** in project rigor, stakeholder management, execution quality, and team dynamics that AI PMs face in real organizations.

---

## Actors

- **AI PM Course Learner**: A product manager or technical professional learning to ship AI-powered features in a real organization.
- **Course Author (Beshoy)**: Maintains `src/data/curriculum.js` and the React SPA. Reviews and approves all enrichment content before shipping.
- **AI PM Course App**: The React SPA rendering content from `curriculum.js` through `CourseViews.jsx` and `App.jsx`.

---

## Scope

### In Scope
- Auditing all 6 Google PM Certificate courses for transferable frameworks
- Mapping each extracted framework to a specific existing AI PM module and lesson
- Adding enrichment content (explanations, templates, Apply exercises, callout blocks) to `curriculum.js`
- Creating reusable template files in `docs/templates/`
- Updating `docs/specs/README.md` with this spec entry

### Out of Scope
- UI redesign or changes to React component architecture
- Adding new top-level modules (the 11-module structure stays fixed)
- Integrating Google-specific tooling (Asana, Sheets, Gantt) as course requirements
- Translating any Capstone scenario directly (the "Sauce & Spoon" case)
- PMP/CAPM certification preparation content
- Waterfall-only project lifecycle frameworks

---

## User Stories

### US-001: Triple Constraint for AI Projects

**As an** AI PM learner,  
**I want to** understand the Triple Constraint (Scope/Time/Cost) extended with an AI-specific fourth constraint (Eval Quality),  
**so that** I can communicate trade-off decisions to executives before committing to deadlines.

**Acceptance Criteria:**
- [ ] AC-001: A "Triple Constraint for AI" conceptual block is added to Lesson 1.4 (AI ROI & Investment Memo), before the "When to Kill" section
- [ ] AC-002: The block explicitly defines the 4-constraint model: Scope, Time, Cost, and Eval Quality Pass Rate
- [ ] AC-003: A 4-row trade-off reference table is included (change Scope → Cost rises, change Time → Quality drops, etc.)
- [ ] AC-004: A callout note states that trade-off decisions must be documented in the AI PRD
- [ ] AC-005: Error state — If no trade-off table is documented in AI PRD, the lesson text must flag this as a delivery risk

**Priority**: P0 | **Dependencies**: None (standalone content addition)

---

### US-002: RACI Charts for AI Feature Teams

**As an** AI PM learner,  
**I want to** learn how to create a RACI chart specifically for AI feature decisions,  
**so that** I avoid unclear ownership over golden datasets, model selection, and hallucination incidents.

**Acceptance Criteria:**
- [ ] AC-001: A RACI Apply exercise is added to Module 4, Lesson 4.1 (Discovery & Pain Quantification)
- [ ] AC-002: The RACI table covers at minimum 6 AI-specific decisions: golden dataset curation, model selection, HITL level, guardrail design, hallucination incident response, eval threshold
- [ ] AC-003: The exercise includes "Rules" — exactly one Accountable per row, distinction between Consulted and Informed
- [ ] AC-004: The exercise outputs a file path artifact: `/docs/discovery/ai-team-raci.md`
- [ ] AC-005: Error state — If a RACI row has 0 or 2+ Accountable entries, the exercise must flag this as an ambiguity risk

**Priority**: P0 | **Dependencies**: None

---

### US-003: OKR Template for AI Features

**As an** AI PM learner,  
**I want to** write Objectives and Key Results specifically calibrated for AI feature quality metrics,  
**so that** I can report progress in real business outcomes — not implementation tasks.

**Acceptance Criteria:**
- [ ] AC-001: An OKR content block is added to Lesson 9.1 (Communicating AI to Executives)
- [ ] AC-002: The OKR template includes: Objective (qualitative), 3 Key Results (measurable, deadline-bound), and Google's 0.0–1.0 scoring scale
- [ ] AC-003: At least 2 AI-specific OKR examples are provided (e.g., eval pass rate, user correction rate, cost per interaction, CSAT)
- [ ] AC-004: A "common mistake" callout explicitly warns against writing KRs as tasks ("Build eval pipeline" is not a KR)
- [ ] AC-005: A back-link connects the OKR block to the AI ROI content in Lesson 1.4

**Priority**: P0 | **Dependencies**: US-001 (Lesson 1.4 must exist before back-linking)

---

### US-004: Stakeholder Power Grid

**As an** AI PM learner,  
**I want to** map stakeholders on an Influence × Interest grid before launching an AI feature,  
**so that** I know which stakeholders require weekly syncs vs. monthly reports, and can prevent blocked launches.

**Acceptance Criteria:**
- [ ] AC-001: A Stakeholder Power Grid sub-section is added to Module 4, Lesson 4.1
- [ ] AC-002: The 2×2 grid is defined: High Influence / High Interest, High Influence / Low Interest, Low Influence / High Interest, Low Influence / Low Interest
- [ ] AC-003: Each quadrant has an explicit AI PM communication strategy (e.g., "Weekly 1:1 with eval results" for High/High)
- [ ] AC-004: At least 3 AI-specific "movement signals" are provided (e.g., "Regulatory team asking questions → move to High Influence")
- [ ] AC-005: The section includes a file artifact path: `/docs/discovery/stakeholder-power-grid.md`

**Priority**: P0 | **Dependencies**: None

---

### US-005: PDCA / Quality Management for AI Outputs

**As an** AI PM learner,  
**I want to** apply a Plan-Do-Check-Act quality management cycle to AI feature evaluation loops,  
**so that** I have a structured improvement process rather than ad hoc iteration.

**Acceptance Criteria:**
- [ ] AC-001: A "AI Quality Management Cycle" block is added to Module 7, Lesson 7.1 (Guardrails & SLOs)
- [ ] AC-002: The PDCA cycle is explicitly re-labeled for AI: Plan (define eval criteria), Do (run eval suite), Check (analyze pass rate + user correction rate), Act (update prompt/context/guardrails)
- [ ] AC-003: A note connecting PDCA to DMAIC (Define, Measure, Analyze, Improve, Control) is included for learners from Six Sigma backgrounds
- [ ] AC-004: The section explains how to measure "Customer Satisfaction" for AI outputs using proxies (correction rate, thumbs-up/down signals, escalation rate)
- [ ] AC-005: Error state — If eval pass rate drops and no PDCA cycle is initiated, the section must define this as an SLO breach trigger

**Priority**: P1 | **Dependencies**: US-001 (constraint model context)

---

### US-006: AI Sprint 0 Kickoff Template

**As an** AI PM learner,  
**I want to** run a structured AI Sprint 0 kickoff meeting,  
**so that** eval criteria, RACI, scope, and HITL level are decided before any build work starts.

**Acceptance Criteria:**
- [ ] AC-001: An "AI Sprint 0 Kickoff Agenda" Apply exercise is added to Module 6, Lesson 6.1 (Build Loop)
- [ ] AC-002: The agenda covers 7 blocks: Problem framing, Scope boundaries, Team roles (RACI), Eval criteria, Context strategy, HITL level, Q&A
- [ ] AC-003: A follow-up email template is included for recording decisions within 24 hours
- [ ] AC-004: The exercise notes that eval criteria MUST be captured before coding begins (not as a soft recommendation)
- [ ] AC-005: The artifact file path is provided: `/projects/sprint-0-kickoff-[feature].md`

**Priority**: P1 | **Dependencies**: US-002 (RACI must be introduced before referencing it in kickoff)

---

### US-007: Critical Path for AI Feature Builds

**As an** AI PM learner,  
**I want to** identify the critical path in an AI feature build,  
**so that** I know which tasks block launch and protect float for eval iteration cycles.

**Acceptance Criteria:**
- [ ] AC-001: A "Critical Path for AI Features" callout block is added to Module 6, Lesson 6.1
- [ ] AC-002: The critical path is illustrated as a day-by-day sequence from problem validation to production readiness review (minimum 7 steps)
- [ ] AC-003: "Float" is defined as the time buffer protecting eval retry cycles — with a clear statement that float must be protected
- [ ] AC-004: Non-critical path tasks are listed explicitly (UI design, marketing copy, internal docs)
- [ ] AC-005: Error state — A warning callout states that cutting float is equivalent to accepting lower eval quality

**Priority**: P1 | **Dependencies**: US-006 (Sprint 0 kickoff sets the starting point)

---

### US-008: AI Production Risk Register

**As an** AI PM learner,  
**I want to** maintain a structured Risk Register for AI feature production risks,  
**so that** known risks have documented owners and mitigation plans before they become incidents.

**Acceptance Criteria:**
- [ ] AC-001: An "AI Production Risk Register" template block is added to Module 7, Lesson 7.1
- [ ] AC-002: The register includes columns: Risk, Likelihood, Impact, Inherent Rating, Mitigation Plan, Owner, Status
- [ ] AC-003: At least 5 pre-populated example rows are included (model outage, hallucination spike, token cost surge, dataset drift, GDPR violation)
- [ ] AC-004: Four risk treatment strategies are defined: Avoid, Minimize, Transfer, Accept — with an AI-specific example for each
- [ ] AC-005: A review cadence is specified: Weekly (top 3 HIGH), Monthly (full register), Post-incident (add new row immediately)
- [ ] AC-006: The artifact file path is provided: `/docs/deploy/ai-risk-register.md`

**Priority**: P1 | **Dependencies**: None

---

### US-009: Scrum → AI Team Role Translation

**As an** AI PM learner working inside a traditional Scrum org,  
**I want to** understand how classic Scrum roles map to an AI feature team,  
**so that** I can operate effectively without creating parallel structures or terminology confusion.

**Acceptance Criteria:**
- [ ] AC-001: A "Scrum for AI Teams" supplementary frame is added at the end of Module 6, Lesson 6.1
- [ ] AC-002: Product Owner is translated to AI PM with AI-specific responsibilities listed (Pain Score prioritization, HITL decisions, eval threshold ownership)
- [ ] AC-003: Scrum Master is translated with AI-specific responsibilities (removes annotation bottlenecks, enforces definition of done = eval pass rate)
- [ ] AC-004: Development Team is translated with cross-functional AI composition (Eng + ML + Domain Expert)
- [ ] AC-005: A 6-row Scrum artifact table maps standard artifacts to AI equivalents (e.g., Sprint Backlog → eval iterations + context improvements)
- [ ] AC-006: A back-link connects to Sprint Management content in Lesson 2.3

**Priority**: P1 | **Dependencies**: None

---

### US-010: Scope Creep Controls for AI Projects

**As an** AI PM learner,  
**I want to** recognize and control scope creep patterns specific to AI features,  
**so that** I don't commit to unscoped additions that add hidden cost and quality risk.

**Acceptance Criteria:**
- [ ] AC-001: A "Scope Integrity in Production" callout is added to Module 7, Lesson 7.1
- [ ] AC-002: At least 4 AI-specific scope creep warning patterns are listed (language scope creep, output scope creep, input scope creep, memory scope creep)
- [ ] AC-003: A formal change request process is described: requester must quantify eval impact, token cost delta, and timeline delta
- [ ] AC-004: A scope change impact table template is provided (columns: Scope Change, Time delta, Cost delta, Quality delta, Decision)
- [ ] AC-005: Error state — A warning note states: every unscoped addition = new golden dataset cases + re-evaluation overhead

**Priority**: P1 | **Dependencies**: US-001 (Triple Constraint language must be established first)

---

### US-011: Tuckman's Team Development Stages for AI Teams

**As an** AI PM learner,  
**I want to** understand how AI feature teams progress through Forming, Storming, Norming, Performing, and Adjourning,  
**so that** I can apply the right leadership approach at each stage and maintain team health.

**Acceptance Criteria:**
- [ ] AC-001: A "AI Team Development Stages" block is added to Module 10 (or appended to Module 6 as a leadership supplement)
- [ ] AC-002: All 5 Tuckman stages are defined with AI-team specific behaviors (e.g., Storming = disagreement over eval methodology or HITL level)
- [ ] AC-003: A recommended PM action is provided for each stage
- [ ] AC-004: A note explains that AI teams often regress to Storming when a major model change or capability shift occurs
- [ ] AC-005: Error state — If team is stuck in Storming, the section must flag this as a blocker-level risk requiring explicit facilitation

**Priority**: P2 | **Dependencies**: US-009 (Scrum team translation provides context)

---

### US-012: Project Closeout & Retrospective Template

**As an** AI PM learner,  
**I want to** run a structured project closeout for a completed AI feature,  
**so that** lessons learned are documented, quality data is captured, and the team doesn't repeat the same mistakes.

**Acceptance Criteria:**
- [ ] AC-001: A "AI Feature Closeout" template is added to Module 11 (or the final module covering deployment/GTM)
- [ ] AC-002: Closeout includes: final eval score vs. target, user correction rate at 30/60/90 days, cost-per-interaction actual vs. projected, incident count, top 3 lessons learned
- [ ] AC-003: A Sprint Retrospective format is included: What went well, What degraded, What will we do differently
- [ ] AC-004: A note explains that closeout documentation feeds the next project's Risk Register (US-008)
- [ ] AC-005: The artifact file path is provided: `/docs/deploy/ai-feature-closeout-[feature].md`

**Priority**: P2 | **Dependencies**: US-008 (Risk Register must exist to receive closeout learnings)

---

### US-013: Data-Informed Decision Making (Capstone Skill)

**As an** AI PM learner,  
**I want to** apply data analysis principles to AI feature metrics — not just intuition — when making roadmap decisions,  
**so that** I can distinguish signal from noise in eval results and user feedback.

**Acceptance Criteria:**
- [ ] AC-001: A "Data-Informed AI PM Decisions" supplement is added to Module 9 (Communicating AI / GTM)
- [ ] AC-002: The supplement defines the difference between data-informed and data-driven decision making (human judgment still applies)
- [ ] AC-003: At least 4 key AI PM metrics are defined with their decision implications: eval pass rate trend, user correction rate, cost-per-interaction, escalation rate
- [ ] AC-004: A "data storytelling" note explains how to present AI metrics to executives (trend + context + recommended action — not raw numbers)
- [ ] AC-005: A data ethics note warns against cherry-picking eval runs to show inflated quality to stakeholders

**Priority**: P2 | **Dependencies**: US-003 (OKR template provides the outcomes framework)

---

## Non-Functional Requirements

- **Performance**: All content additions are static data in `curriculum.js`. No new API calls, network requests, or async operations. Zero impact on page load time.
- **Accessibility**: All new content follows existing `curriculum.js` schema patterns used in `CourseViews.jsx`. No custom HTML markup in content strings that would break screen readers.
- **Security**: No new external dependencies or API keys required.
- **Maintainability**: Each enrichment block must follow the existing lesson object schema. No one-off data shapes.
- **Testing**: Each new lesson block must be covered by the existing Vitest suite after content is added. No new test files are required — existing tests verify schema integrity.

---

## Data Model

The enrichment targets the existing `curriculum.js` lesson object schema. Per analysis of the current file, each lesson object follows this shape:

```js
{
  id: "lesson-id",
  title: "Lesson Title",
  duration: "X min",
  type: "lesson" | "apply" | "quiz" | "resource",
  content: {
    overview: "...",
    keyPoints: ["...", "..."],
    callouts: [{ type: "warning|tip|info", text: "..." }],
    applyExercise: { title: "...", steps: ["..."] },
    templates: [{ name: "...", path: "..." }]
  }
}
```

**New fields required**: None — enrichments fit the existing schema. If a lesson block uses the `applyExercise` key, it will render in the existing Apply exercise UI component.

---

## Out of Scope

- No changes to React component architecture or `CourseViews.jsx` rendering logic
- No new top-level modules (the 11-module structure is frozen for this enrichment)
- No Gantt charts, Asana integrations, or legacy Waterfall planning templates
- No Six Sigma DMAIC as a standalone module (referenced only as a contextual note in US-005)
- No PMP/CAPM exam preparation content
- No changes to the test suite structure (Vitest config remains as-is)
- No content from the Capstone "Sauce & Spoon" restaurant scenario

---

## SPEC_GATE Checklist

- [x] All user stories cover actors, actions, and benefits
- [x] Every acceptance criterion is binary (testable pass/fail)
- [x] Error/edge-case acceptance criteria included in every user story
- [x] Out-of-scope items explicitly listed
- [x] No implementation details leaked (no "using useEffect" or "in a div" in spec)
- [x] All 6 Google PM courses represented in the audit scope

---

*Status: ✅ SPEC_GATE PASSED — Ready for `/plan` workflow*


---

<a name="product-discovery-5a-framework-[feature]md"></a>
## Product Discovery: 5a-framework-[feature].md

**Source**: `5a-framework-[feature].md`

# 5A Framework - [feature]

## A1 Assess
- Problem:
- Why AI-shaped:
- Cost of being wrong:

## A2 Architect
- Model routing:
- Context strategy:
- HITL boundary:

## A3 Acquire
- Data needed:
- Tools needed:
- Skills needed:

## A4 Assemble
- MVP scope:
- Guardrails:
- Eval setup:

## A5 Assess (ongoing)
- Weekly metrics:
- Regression cadence:
- Refresh cadence:


---

<a name="product-discovery-5a-framework-support-assistantmd"></a>
## Product Discovery: 5a-framework-support-assistant.md

**Source**: `5a-framework-support-assistant.md`

# 5A Framework - Support Assistant

## A1 Assess
- Problem: 38% of tickets are repetitive status/refund-policy questions.
- Why AI-shaped: Unstructured text, variable intent, high frequency.
- Cost of being wrong: Bad policy answer can trigger refunds and trust loss.

## A2 Architect
- Model routing: Compact for classification, standard for answer generation.
- Context strategy: Retrieval + policy snippets + recent order facts.
- HITL boundary: Escalate refunds/compensation decisions to humans.

## A3 Acquire
- Data needed: Historical tickets, policy docs, FAQ, order-status API.
- Tools needed: Promptfoo, Langfuse, vector store, routing service.
- Skills needed: Prompt/guardrail design, eval design, retrieval tuning.

## A4 Assemble
- MVP scope: Status lookup + FAQ + policy explanation with citations.
- Guardrails: Prompt-injection checks, policy-only responses, confidence threshold.
- Eval setup: Golden set (200 tickets), rubric + human review sample.

## A5 Assess (ongoing)
- Weekly metrics: correction rate, escalation rate, p95 latency, cost/ticket.
- Regression cadence: every release + weekly red-team run.
- Refresh cadence: model/tool baseline reviewed monthly.


---

<a name="product-discovery-ai-business-casemd"></a>
## Product Discovery: ai-business-case.md

**Source**: `ai-business-case.md`

# AI Business Case

## Feature
AI support assistant for ecommerce order and policy queries.

## ROI tree
- Cost reduction: lower agent handling time
- Revenue protection: fewer churn-causing unresolved tickets
- Risk mitigation: consistent policy answers with citations

## Baseline assumptions
- Tickets/month: 12,000
- Avg handling time: 6 minutes
- Agent loaded cost/hour: $18
- Target automation assist rate: 45%

## Estimated impact
- Hours saved/month: 540
- Direct labor value/month: $9,720
- Initial AI runtime + tooling cost/month: $2,400
- Net monthly value (rough): $7,320

## Kill criteria
- Net value negative for 2 consecutive months
- Hallucination rate above 8% after hardening sprint


---

<a name="product-discovery-multimodal-assessmentmd"></a>
## Product Discovery: multimodal-assessment.md

**Source**: `multimodal-assessment.md`

# Multimodal Assessment

## Use cases considered
- OCR from customer-uploaded receipts
- Screenshot-based issue diagnosis
- Voice inquiry intake for mobile support

## Feasibility decision
- OCR receipts: Yes (high value, manageable complexity)
- Screenshot diagnosis: Pilot only (requires robust safety checks)
- Voice intake: Later phase (latency and QA overhead)

## Risks
- Image quality variability
- Sensitive data extraction and storage
- Misclassification without confidence UI


---

<a name="product-discovery-opportunity-landscapemd"></a>
## Product Discovery: opportunity-landscape.md

**Source**: `opportunity-landscape.md`

# Opportunity Landscape

## Candidate ideas
| Idea | Zone | AI-shaped? | Pain score | Verdict |
|---|---|---|---:|---|
| AI support assistant for order/status questions | Augmentation | Yes | 180 | Prioritize |
| Daily KPI narrative summary for managers | Augmentation | Yes | 120 | Validate quickly |
| Auto-refund without human review | Transformation | Yes | 150 | Delay until guardrails mature |

## Why selected idea is AI-shaped
- High ambiguity in user phrasing
- High cognitive load for support team
- Variable resolution paths
- Repeated, high-frequency workload

## Kill criteria
- If correction rate stays above 25% after 3 iterations
- If no ROI improvement within 8 weeks


---

<a name="product-discovery-team-discoverymd"></a>
## Product Discovery: team-discovery.md

**Source**: `team-discovery.md`

# Team Discovery

## Stakeholders
- PM owner: You
- Engineering lead: TBD
- Design lead: TBD
- Safety reviewer: TBD

## Discovery interview summary
1. Agents currently answer repetitive order and delivery questions.
2. Escalations are mostly caused by missing context and low confidence.
3. Team wants faster first response without harming trust.

## Core assumptions to validate
- Retrieval quality is sufficient for policy-sensitive answers.
- Confidence and fallback UX reduce user frustration.
- Human handoff can be done under 30 seconds.


---

<a name="design-&-trust-context-engineering-auditmd"></a>
## Design & Trust: context-engineering-audit.md

**Source**: `context-engineering-audit.md`

# Context Engineering Audit

## Instruction layer
- System instruction is explicit about boundaries and citations.
- Response format is structured and predictable.

## Grounding layer
- Retrieval uses trusted policy and order data.
- Citation requirement is enabled for policy claims.

## Tool layer
- Order lookup tool limited to user-authorized records.
- Refund action remains human-approved.

## Output layer
- Confidence and next-step suggestion included.
- Fallback path shown when confidence is low.

## Gaps
- Need stricter context-window budget enforcement.
- Need automated checks for missing citations.


---

<a name="design-&-trust-failure-ux-auditmd"></a>
## Design & Trust: failure-ux-audit.md

**Source**: `failure-ux-audit.md`

# Failure UX Audit

## Failure modes reviewed
1. Hallucinated policy answer
2. Missing order context
3. Tool timeout
4. Unsafe request pattern

## UX behavior requirements
- Explain uncertainty in plain language.
- Offer one-click escalation to human support.
- Preserve user message context after fallback.
- Show what evidence was used.

## Current quality score (1-5)
- Clarity: 4
- Recovery speed: 3
- Trust signaling: 4
- Consistency: 3


---

<a name="design-&-trust-tool-inventorymd"></a>
## Design & Trust: tool-inventory.md

**Source**: `tool-inventory.md`

# Tool Inventory

| Layer | Tool | Purpose | Status |
|---|---|---|---|
| LLM provider | OpenAI/Anthropic/Gemini | Generation and routing tiers | Active |
| Eval | Promptfoo | Offline regression and rubric checks | Active |
| Observability | Langfuse | Trace and quality monitoring | Active |
| Orchestration | LangGraph/CrewAI | Multi-step flows | Pilot |
| Workflow automation | GitHub Actions | Scheduled freshness checks | Active |

## Notes
- Keep one primary stack and one fallback per layer.
- Avoid introducing tools without explicit ownership.


---

<a name="design-&-trust-trust-design-[feature]md"></a>
## Design & Trust: trust-design-[feature].md

**Source**: `trust-design-[feature].md`

# Trust Design - [feature]

## Trust objectives
- Predictable output quality
- Clear uncertainty communication
- Safe action boundaries

## HITL boundary
- AI can suggest
- Human approves high-risk actions

## User-facing trust patterns
- Confidence indicator
- Evidence/citation display
- Editable draft before action
- Clear fallback path


---

<a name="design-&-trust-trust-design-support-assistantmd"></a>
## Design & Trust: trust-design-support-assistant.md

**Source**: `trust-design-support-assistant.md`

# Trust Design - Support Assistant

## Trust objectives
- Reduce correction rate below 12%
- Keep unsafe answer rate below 2%
- Keep escalation experience under 30 seconds

## HITL boundary
- AI handles status lookup and policy explanation.
- Human required for refunds, compensation, and legal-sensitive cases.

## UX patterns
- Always show source/citation for policy text.
- Show confidence phrase: high/medium/low.
- Provide "Review before send" mode for sensitive outputs.
- One-click "Escalate to human" with transcript carryover.


---

<a name="executive-&-strategy-ai-portfolio-governancemd"></a>
## Executive & Strategy: ai-portfolio-governance.md

**Source**: `ai-portfolio-governance.md`

# AI Portfolio Governance

## Portfolio inventory
| Initiative | Bucket | ROI | Risk | Readiness | Reuse | Decision |
|---|---|---:|---:|---:|---:|---|
|  |  |  |  |  |  |  |

## Governance rules
- Kill criteria required before approval:
- Eval readiness required before scale:
- Platform investments ring-fenced:

## Executive dashboard
- Active bets by bucket:
- % with eval suites:
- % with observability:
- Value realized vs forecast:


---

<a name="executive-&-strategy-budget-risk-operating-modelmd"></a>
## Executive & Strategy: budget-risk-operating-model.md

**Source**: `budget-risk-operating-model.md`

# Budget and Risk Operating Model

## Cost model
- Fixed platform/tooling:
- Variable inference:
- Human fallback:
- Eval/annotation:
- Governance/compliance:

## Risk tiers
| Tier | Example | Review intensity | Required controls |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |

## Executive controls
- Budget cap:
- Alert thresholds:
- Launch gates:
- Audit trail requirement:

## Dashboards
- Quality:
- Economics:
- Risk:


---

<a name="executive-&-strategy-build-buy-partner-analysismd"></a>
## Executive & Strategy: build-buy-partner-analysis.md

**Source**: `build-buy-partner-analysis.md`

# Build vs Buy vs Partner Analysis

## Capability under review
- Capability:
- Review date:
- Revisit date:

## Scoring
| Option | Strategic importance | Urgency | Need for control | Capability maturity | Lock-in risk | Economics | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| Build |  |  |  |  |  |  |  |
| Buy |  |  |  |  |  |  |  |
| Partner |  |  |  |  |  |  |  |

## Recommendation
- Chosen path:
- Why:
- Main assumption:
- Main risk:


---

<a name="executive-&-strategy-org-designmd"></a>
## Executive & Strategy: org-design.md

**Source**: `org-design.md`

# Org Design

## Target model
- Chosen model: centralized / embedded / hybrid
- Why:

## Decision rights
- Vendor selection owner:
- Eval threshold owner:
- Autonomy approval owner:
- Launch stop authority:
- Incident owner:

## Operating cadence
- Weekly:
- Monthly:
- Quarterly:

## Role map
- AI PM:
- Platform/Applied AI:
- Design:
- Evaluation:
- Governance:


---

<a name="executive-&-strategy-vendor-strategymd"></a>
## Executive & Strategy: vendor-strategy.md

**Source**: `vendor-strategy.md`

# Vendor Strategy

## Options compared
| Option | Capability fit | Commercial fit | Control fit | Exit fit | Verdict |
|---|---|---|---|---|---|
| Single frontier API |  |  |  |  |  |
| Multi-provider gateway |  |  |  |  |  |
| Open-weight fallback path |  |  |  |  |  |

## Negotiation asks
- Pricing protections:
- Migration/support clause:
- Data and retention terms:
- Roadmap asks:

## Switching triggers
- Cost increase threshold:
- Quality degradation threshold:
- Legal/compliance trigger:


---

<a name="applied-template-(public)-ai-prd-templatemd"></a>
## Applied Template (Public): ai-prd-template.md

**Source**: `ai-prd-template.md`

# AI PRD Template

## Problem
- User:
- Pain:
- Why AI-shaped:

## Design
- Model routing:
- Context strategy:
- Tooling:

## Evaluation
- Golden set:
- Judge rubric:
- Human review:

## Safety and launch
- Guardrails:
- HITL:
- Rollout phases:


---

<a name="applied-template-(public)-eval-rubric-templatemd"></a>
## Applied Template (Public): eval-rubric-template.md

**Source**: `eval-rubric-template.md`

# Evaluation Rubric Template

## Score dimensions
1. Problem quality
2. Technical decision quality
3. Evaluation rigor
4. Trust and safety
5. Operational readiness

## Pass rules
- Average >= 4.0
- No dimension below 3.0


---

<a name="applied-template-(public)-responsible-ai-audit-templatemd"></a>
## Applied Template (Public): responsible-ai-audit-template.md

**Source**: `responsible-ai-audit-template.md`

# Responsible AI Audit Template

- Intended use and misuse boundaries
- Data quality and localization checks
- Prompt injection and abuse testing
- Human oversight and escalation
- Governance owner and review cadence


---

<a name="applied-template-(public)-rollout-checklist-templatemd"></a>
## Applied Template (Public): rollout-checklist-template.md

**Source**: `rollout-checklist-template.md`

# Rollout Checklist Template

- [ ] Shadow mode validated
- [ ] Suggestion mode validated
- [ ] Supervised autonomy validated
- [ ] Rollback trigger documented
- [ ] Incident owner assigned
- [ ] 7-day post-launch review scheduled


---

<a name="applied-template-(docs)-ai-feature-closeoutmd"></a>
## Applied Template (Docs): ai-feature-closeout.md

**Source**: `ai-feature-closeout.md`

# AI Feature Closeout & Retrospective

## Project Snapshot
- **Feature**: [Feature Name]
- **Release Date**: [Date]

## Final Quality Metrics vs Target
- **Eval Pass Rate**: [X]% (Target: [Y]%)
- **P95 Latency**: [X]ms (Target: [Y]ms)
- **Cost per Interaction**: $[X] (Target: $[Y])
- **Correction Rate**: [X]% (Target: [Y]%)
- **Repeated Use Rate**: [X]% (Target: [Y]%)

## Retrospective

### What went well (Sustains)
- ...

### What degraded / surprised us (Improves)
- ...

### What we'd do differently (Learnings)
- ...

*Note: Any unresolved risks must be transferred to the ongoing AI Risk Register.*


---

<a name="applied-template-(docs)-ai-prd-templatemd"></a>
## Applied Template (Docs): ai-prd-template.md

**Source**: `ai-prd-template.md`

# AI PRD Template

## 1) Problem and user
- User segment:
- Pain statement:
- Why AI-shaped (ambiguity/cognitive load/variable paths):

## 2) Success metrics
- Quality metrics:
- Trust metrics:
- Business metrics:

## 3) System design
- Model routing policy:
- Context strategy (long context / retrieval / memory):
- Tooling and orchestration:

## 4) Evaluation plan
- Golden dataset:
- LLM-as-judge rubric:
- Human calibration:
- Regression protocol:

## 5) Safety and trust
- Input guardrails:
- Output guardrails:
- HITL boundaries:
- Fallback behavior:

## 6) Launch plan
- Rollout phases:
- Kill criteria:
- Incident owner:


---

<a name="applied-template-(docs)-ai-risk-registermd"></a>
## Applied Template (Docs): ai-risk-register.md

**Source**: `ai-risk-register.md`

# AI Production Risk Register

| Risk Description | Probability | Impact | Risk Category | Owner | Treatment Strategy | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Primary foundation model outage | Medium | High | Operational | Engineering Lead | **Mitigate**: Portkey automated fallback routing to secondary model | Active |
| Hallucination spike on new domain | High | High | Quality | AI PM | **Mitigate**: RAG context injection + strict prompt grounding | Active |
| Token cost surge during peak traffic | Medium | Medium | Financial | Ops Lead | **Mitigate**: Implement token budget alerts + max-token limits | Active |
| Concept drift in golden dataset | High | Medium | Quality | Data Sci | **Accept**: Scheduled monthly recalibration of eval suite | Active |
| GDPR/PII leakage in model output | Low | Critical | Security | Legal/Security | **Avoid**: Strict PII scrubbing on input + output guardrails | Active |

## Treatment Strategies
- **Avoid**: Change plan to eliminate risk (e.g., don't launch feature)
- **Mitigate**: Reduce likelihood or impact (e.g., add guardrails)
- **Transfer**: Shift risk to third party (e.g., vendor SLAs)
- **Accept**: Acknowledge risk and budget for it


---

<a name="applied-template-(docs)-ai-team-racimd"></a>
## Applied Template (Docs): ai-team-raci.md

**Source**: `ai-team-raci.md`

# AI Team RACI Matrix

## Rules of Engagement
- Only one 'A' (Accountable) per row.
- 'R' (Responsible) does the work.
- 'C' (Consulted) has input that must be considered before decision.
- 'I' (Informed) gets the output after decision.

## Matrix

| Decision/Deliverable | AI PM | ML Engineer | Data Scientist | Legal/Compliance | Executive Sponsor |
| --- | --- | --- | --- | --- | --- |
| Golden Dataset Definition | A | C | R | I | I |
| Model Selection & Routing | C | A/R | C | I | I |
| Human-in-the-Loop Level | A | C | C | C | I |
| Guardrail Design | C | R | A | C | I |
| Hallucination Incident Response | A | R | C | I | I |
| Eval Pass/Fail Thresholds | A | C | R | I | I |


---

<a name="applied-template-(docs)-assessment-rubric-operationsmd"></a>
## Applied Template (Docs): assessment-rubric-operations.md

**Source**: `assessment-rubric-operations.md`

# Assessment Rubric Operations Template (AI PM Course)

## 1) Assessment Metadata
- Week:
- Module:
- Team/Learner:
- Assessor:
- Date (YYYY-MM-DD):
- Artifact set reviewed:

## 2) Required Artifacts (Hard Requirement)
- [ ] Decision memo
- [ ] Working build or prototype
- [ ] Evaluation report
- [ ] Red team result
- [ ] Demo and release note
- [ ] Retrospective

If any box is unchecked, overall result is `Fail (incomplete evidence)`.

## 3) Scoring Rubric (0-4 per dimension)
- 0 = Missing
- 1 = Weak
- 2 = Basic
- 3 = Strong
- 4 = Exceptional

### Dimension A: Problem Framing and Value
- Score:
- Evidence:
- Notes:

### Dimension B: AI System Design and Grounding
- Score:
- Evidence:
- Notes:

### Dimension C: Trust UX and HITL Design
- Score:
- Evidence:
- Notes:

### Dimension D: Evaluation Quality
- Score:
- Evidence:
- Notes:

### Dimension E: Safety and Risk Controls
- Score:
- Evidence:
- Notes:

### Dimension F: Operational Readiness
- Score:
- Evidence:
- Notes:

## 4) Gate Rules
- Gate 1 (Minimum Quality):
- Pass criteria: no dimension below 2.
- Result: Pass / Fail

- Gate 2 (Safety Threshold):
- Pass criteria: Dimension E is 3 or higher.
- Result: Pass / Fail

- Gate 3 (Evaluation Threshold):
- Pass criteria: Dimension D is 3 or higher with reproducible evidence.
- Result: Pass / Fail

- Gate 4 (Operational Threshold):
- Pass criteria: Dimension F is 3 or higher with rollback and monitoring.
- Result: Pass / Fail

## 5) Outcome Logic
- If any gate fails: `Fail`
- If all gates pass and average score < 3.0: `Conditional Pass`
- If all gates pass and average score >= 3.0: `Pass`

- Average score:
- Final result: Pass / Conditional Pass / Fail

## 6) Required Feedback Output
- Top 3 strengths:
1.
2.
3.

- Top 3 gaps:
1.
2.
3.

- Required actions before next milestone:
1. Action:
- Owner:
- Due date:
- Evidence expected:

2. Action:
- Owner:
- Due date:
- Evidence expected:

3. Action:
- Owner:
- Due date:
- Evidence expected:

## 7) Assessor Sign-off
- Assessor name:
- Role:
- Signature/Approval:



---

<a name="applied-template-(docs)-eval-rubric-templatemd"></a>
## Applied Template (Docs): eval-rubric-template.md

**Source**: `eval-rubric-template.md`

# Evaluation Rubric Template

## Score scale
- 1 = poor
- 3 = acceptable
- 5 = production-ready

## Dimensions
1. Problem quality
2. Technical decision quality
3. Evaluation rigor
4. Trust and safety
5. Operational readiness

## Pass threshold
- Minimum average: 4.0
- Any dimension below 3.0 = fail

## Evidence links
- Promptfoo report:
- Dataset version:
- Human review notes:
- Observability traces:


---

<a name="applied-template-(docs)-okr-ai-featuresmd"></a>
## Applied Template (Docs): okr-ai-features.md

**Source**: `okr-ai-features.md`

# OKR Framework for AI Features

> **Common Mistake**: Setting OKRs based on model accuracy instead of user outcomes.

## Template
**Objective**: [Qualitative, inspiring goal focused on the user or business outcome]

**Key Results**:
- **KR1 (Adoption/Value)**: [e.g., Increase repeated use rate from X% to Y%]
- **KR2 (Efficiency/Cost)**: [e.g., Reduce human correction rate from X% to Y%]
- **KR3 (Quality/Trust)**: [e.g., Maintain eval pass rate ≥ Z% across all cohorts]

## Scoring Scale
- **0.0 - 0.3**: Failed to deliver value
- **0.4 - 0.6**: Progress made, but missed target
- **0.7 - 0.9**: Strong success
- **1.0**: Moonshot achieved

## Examples

**Objective**: Make support agents superhuman at answering complex billing inquiries.
- **KR1**: Reduce average handling time (AHT) for billing tickets by 40%.
- **KR2**: AI draft acceptance rate (zero edits) reaches 65%.
- **KR3**: Keep API cost per resolved ticket under $0.05.

**Objective**: Launch a trustworthy AI design copilot that designers actually use daily.
- **KR1**: Reach 30% weekly active user (WAU) adoption among the design cohort.
- **KR2**: Achieve a ≥85% pass rate on the design-system adherence eval suite.
- **KR3**: 40% of generated designs make it to a saved/exported state.


---

<a name="applied-template-(docs)-responsible-ai-audit-templatemd"></a>
## Applied Template (Docs): responsible-ai-audit-template.md

**Source**: `responsible-ai-audit-template.md`

# Responsible AI Audit Template

## Intended use
- Primary use case:
- Non-intended use:

## Data and localization
- Training/retrieval data sources:
- Arabic/RTL handling:
- Bias and representational checks:

## Safety and abuse risk
- Prompt injection tests:
- Harmful output controls:
- Tool misuse prevention:

## Human oversight
- HITL checkpoints:
- Escalation path:
- Override authority:

## Governance
- Audit owner:
- Last review date:
- Next review date:


---

<a name="applied-template-(docs)-rollout-checklist-templatemd"></a>
## Applied Template (Docs): rollout-checklist-template.md

**Source**: `rollout-checklist-template.md`

# Rollout Checklist Template

## Pre-launch
- [ ] Feature flag in place
- [ ] Budget/rate limits configured
- [ ] Guardrails enabled
- [ ] Alerting thresholds configured

## Launch phases
- [ ] Shadow mode completed
- [ ] Suggestion mode validated
- [ ] Supervised autonomy signed off

## Failure readiness
- [ ] Rollback trigger defined
- [ ] Incident owner assigned
- [ ] Customer communication template ready

## Post-launch
- [ ] 24h review complete
- [ ] 7d metric review complete
- [ ] Improvement backlog updated


---

<a name="applied-template-(docs)-sprint-0-kickoffmd"></a>
## Applied Template (Docs): sprint-0-kickoff.md

**Source**: `sprint-0-kickoff.md`

# AI Sprint 0 Kickoff Agenda

## Context
Sprint 0 aligns the team on the unique constraints of an AI bet before any engineering starts.

## 7-Block Agenda
1. **Problem Framing**: Is this an AI-shaped problem?
2. **Scope**: What is explicitly out of scope for v1?
3. **RACI**: Who owns the golden dataset and eval thresholds?
4. **Eval Criteria**: What does "good enough" look like numerically?
5. **Context Strategy**: Where does the intelligence come from (RAG, prompt, base model)?
6. **HITL Level**: What is the Human-in-the-Loop expectation for launch?
7. **Q&A / Risks**: What are we most afraid of?

## Follow-up Action Items
- Write the AI PRD
- Define the Golden Dataset
- Establish the Risk Register


---

<a name="applied-template-(docs)-stakeholder-power-gridmd"></a>
## Applied Template (Docs): stakeholder-power-grid.md

**Source**: `stakeholder-power-grid.md`

# Stakeholder Power Grid

## Quadrant Map

| High Power / Low Interest (Keep Satisfied) | High Power / High Interest (Manage Closely) |
| --- | --- |
| *Strategy: Brief on risk and ROI* | *Strategy: Partner on eval thresholds & launch gates* |
| e.g., CISO, Legal Counsel | e.g., VP Product, AI Tech Lead |

| Low Power / Low Interest (Monitor) | Low Power / High Interest (Keep Informed) |
| --- | --- |
| *Strategy: Minimal updates, standard comms* | *Strategy: Leverage for dogfooding, share wins* |
| e.g., Adjacent product teams | e.g., Power users, Beta testers |

## AI Movement Signals
Watch for these shifts during the AI lifecycle:
1. **Legal/Compliance**: Moves from *Low Interest* to *High Interest* when autonomous actions are introduced.
2. **Sales/Support**: Moves from *Low Power* to *High Power* if adoption metrics become launch blockers.
3. **Executive Sponsor**: Moves from *High Interest* to *Low Interest* if the time-to-first-value takes too long.


---

<a name="applied-template-(docs)-weekly-demo-release-notemd"></a>
## Applied Template (Docs): weekly-demo-release-note.md

**Source**: `weekly-demo-release-note.md`

# Weekly Demo and Release Note Template (AI PM Course)

## 1) Release Metadata
- Week:
- Module:
- Product/Feature:
- Version/Tag:
- Date (YYYY-MM-DD):
- Demo Owner:

## 2) What Changed This Week
- New capability:
- Updated capability:
- Removed/deprecated behavior:
- User-visible impact:

## 3) Demo Script (5-10 min)
- Scenario 1 (happy path):
- Scenario 2 (edge case):
- Scenario 3 (failure and recovery path):
- Human-in-the-loop checkpoint shown:

## 4) Quality and Operations Snapshot
- KPI trend this week:
- Eval score change this week:
- Token/cost trend this week:
- Incident(s) and status:
- Open risk(s):

## 5) Evidence Links
- Demo recording link:
- Release PR(s):
- Eval report link:
- Red team report link:
- Observability dashboard link:
- User feedback link:

## 6) Release Note (User Facing)
- Summary (2-4 lines):
- What is new:
- Known limitations:
- How to give feedback:

## 7) Internal Ops Note
- Model/tool changes:
- Prompt/context changes:
- Guardrail changes:
- Rollback plan:

## 8) Checklist
- [ ] Demo includes happy path and failure path.
- [ ] Claims in release note are backed by evidence links.
- [ ] Cost and quality impact are reported.
- [ ] Known limitations are explicitly listed.
- [ ] Red team status is referenced.
- [ ] Rollback plan is current and tested.

## 9) Pass/Fail Gates
- Gate A: Evidence completeness
- Pass criteria: all required evidence links are present and valid.
- Result: Pass / Fail
- Evidence:

- Gate B: Release transparency
- Pass criteria: release note includes capabilities, limitations, and feedback path.
- Result: Pass / Fail
- Evidence:

- Gate C: Operational readiness
- Pass criteria: eval baseline met, no unresolved blocker risk, rollback documented.
- Result: Pass / Fail
- Evidence:

## 10) Sign-off
- PM:
- Tech Lead:
- Safety/QA:
- Final decision: Release / Hold



---

<a name="applied-template-(docs)-weekly-design-reviewmd"></a>
## Applied Template (Docs): weekly-design-review.md

**Source**: `weekly-design-review.md`

# Weekly Design Review Template (AI PM Course)

## 1) Session Metadata
- Week:
- Module:
- Product/Feature:
- Team:
- Date (YYYY-MM-DD):
- Review Lead:
- Attendees:

## 2) Problem and Outcome
- User problem statement (1-2 lines):
- AI-shaped reason (why AI, not rules-only):
- Success metric(s) this week:
- Failure metric(s) this week:

## 3) Scope Snapshot
- In scope:
- Out of scope:
- Key assumptions:
- Decision to validate this week:

## 4) Experience and Trust Design
- Primary flow:
- Human-in-the-loop checkpoint:
- Uncertainty handling in UI:
- Fallback path when model fails:
- Editability and user override:

## 5) System Design (Current)
- Model(s) used:
- Grounding pattern (long context, retrieval, memory):
- Tool calls and side effects:
- Guardrails (input/output/tool/human):
- Logging and observability plan:

## 6) Evidence Reviewed
- Demo link:
- PRD/Decision memo link:
- Eval report link:
- Trace/log dashboard link:
- User feedback/interview notes link:

## 7) Design Review Checklist
- [ ] Problem is specific and user-backed.
- [ ] Success and failure metrics are measurable.
- [ ] AI behavior boundary is clear (auto vs supervised).
- [ ] Trust UX handles non-deterministic output.
- [ ] Side-effecting actions require explicit confirmation.
- [ ] Prompt/context strategy is documented.
- [ ] At least one negative/failure path is designed.
- [ ] Localization/accessibility impact is considered.

## 8) Pass/Fail Gates
- Gate A: Problem and metric quality
- Pass criteria: clear user pain, measurable KPI, kill criteria defined.
- Result: Pass / Fail
- Evidence:

- Gate B: Trust and UX safety
- Pass criteria: uncertainty, fallback, and override are implemented or explicitly scheduled.
- Result: Pass / Fail
- Evidence:

- Gate C: Technical readiness
- Pass criteria: grounding/tool/guardrail strategy documented and testable.
- Result: Pass / Fail
- Evidence:

## 9) Decisions and Actions
- Decision 1:
- Why:
- Owner:
- Due date:

- Decision 2:
- Why:
- Owner:
- Due date:

## 10) Exit Decision
- Final status: Pass / Conditional Pass / Fail
- If Conditional Pass or Fail, blockers:
- Required fixes before next weekly review:



---

<a name="applied-template-(docs)-weekly-red-teammd"></a>
## Applied Template (Docs): weekly-red-team.md

**Source**: `weekly-red-team.md`

# Weekly Red Team Template (AI PM Course)

## 1) Session Metadata
- Week:
- Module:
- Product/Feature:
- Date (YYYY-MM-DD):
- Red Team Lead:
- Builders Present:

## 2) Threat Focus for This Week
- Priority risk area (prompt injection, data leak, unsafe action, hallucination, abuse):
- Why this area now:
- User harm scenario:

## 3) Test Setup
- Model(s) and version:
- System/context version:
- Tools enabled:
- Guardrails enabled:
- Test dataset or attack prompts link:

## 4) Attack Plan
- Attack 1:
- Expected safe behavior:
- Observed behavior:
- Severity (Low/Med/High/Critical):

- Attack 2:
- Expected safe behavior:
- Observed behavior:
- Severity (Low/Med/High/Critical):

- Attack 3:
- Expected safe behavior:
- Observed behavior:
- Severity (Low/Med/High/Critical):

## 5) Evidence
- Run logs/traces link:
- Prompt and output samples link:
- Screenshot/video link:
- Incident ticket(s):

## 6) Red Team Checklist
- [ ] Injection and instruction override tested.
- [ ] Data exfiltration/path leakage tested.
- [ ] Tool abuse and unauthorized actions tested.
- [ ] Hallucination and fabricated citation tested.
- [ ] Toxic/sensitive output handling tested.
- [ ] Arabic/localized input edge cases tested (if applicable).
- [ ] Monitoring alerts fired for high-risk failures.

## 7) Pass/Fail Gates
- Gate A: Critical safety
- Pass criteria: zero unresolved Critical findings.
- Result: Pass / Fail
- Evidence:

- Gate B: High severity closure
- Pass criteria: all High findings have approved mitigation plan and owner/date.
- Result: Pass / Fail
- Evidence:

- Gate C: Production controls
- Pass criteria: logging, alerting, and rollback path validated for tested risks.
- Result: Pass / Fail
- Evidence:

## 8) Findings and Mitigations
- Finding:
- Severity:
- Root cause:
- Mitigation:
- Owner:
- Due date:
- Retest date:

## 9) Ship Decision
- Status: Ship / Ship with controls / Block release
- Required controls before ship:
- Executive risk note (1-3 lines):



---

