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
      {
        id: "2.4", title: "Machine-Readable Acceptance Criteria", type: "framework",
        content: `**If criteria are not machine-readable, AI delivery quality collapses.**

Agent-ready criteria must be:
- Binary (pass/fail)
- Scoped (exact input/output boundary)
- Observable (clear evidence source)
- Risk-aware (explicit failure condition)

**Recommended AC schema**:
- \`id\`
- \`scenario\`
- \`input_contract\`
- \`expected_output_contract\`
- \`guardrail_expectation\`
- \`evidence_source\`
- \`pass_rule\`
- \`fail_rule\`

**Anti-pattern**: "Should work well."  
**Better**: "For 50 golden cases in category A, pass rate >= 90%, no PII leakage, and p95 latency <= 3s."

Tie every AC to one evidence lane: deterministic check, eval score, trace, or human review result.`,
        quiz: { q: "What makes an acceptance criterion agent-executable?", a: "It is binary, scoped, observable, and has explicit pass/fail evidence that can be verified without human interpretation." },
        apply: `Convert one existing feature spec into 8 machine-readable acceptance criteria using the schema above. Push to: \`/docs/specs/[feature]-agent-criteria.md\``,
        keys: ["Binary ACs prevent scope ambiguity", "Every AC needs an evidence source", "Failure conditions must be explicit"],
      },
      {
        id: "2.5", title: "AI PRD for Agent-Executed Features", type: "framework",
        content: `AI PRDs should be execution contracts, not narrative docs.

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

AI PRDs should be short, rigid, and test-linked. Anything not testable belongs in notes, not in launch gates.`,
        quiz: { q: "What is the biggest failure in traditional PRDs when used with coding agents?", a: "They describe intent but omit executable constraints like tool permissions, output schema, and objective gates." },
        apply: `Refactor one current PRD into the 6-section AI PRD format and link each gate to one measurable test. Push to: \`/docs/ai-prd-[feature].md\``,
        keys: ["AI PRDs are execution contracts", "No thresholds means no launch", "Schema + permissions + gates are mandatory"],
      },
      {
        id: "2.6", title: "Model Routing by Task Type", type: "technical",
        content: `Model choice is a routing policy, not a preference.

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
- latency percentile drift`,
        quiz: { q: "Why should routing policy be task-based instead of one-model-for-all?", a: "Because task complexity and risk differ; routing by task preserves quality while controlling latency and cost." },
        apply: `Create a routing policy table for five task types with fallback and escalation rules. Push to: \`/docs/templates/model-routing-policy.md\``,
        keys: ["Route by task, not by preference", "Fallbacks must be pre-defined", "Weekly routing telemetry is mandatory"],
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
      {
        id: "6.3", title: "5-Level Validation Pyramid", type: "framework",
        content: `A production AI feature needs layered validation, not one score.

**Validation pyramid**:
1. Contract checks (schema, policy, safety)
2. Golden dataset checks (core scenarios)
3. Adversarial checks (red-team and abuse paths)
4. Workflow checks (integration + end-to-end)
5. Human calibration checks (decision confidence)

Each level has independent pass thresholds. Failure at any level blocks promotion.

Implementation agents should not have access to holdout sets. Keep holdout ownership with evaluation or QA owners.`,
        quiz: { q: "Why is a single eval pass rate not enough for release readiness?", a: "Because it hides category-specific failure; contract, adversarial, and workflow checks can fail even when aggregate score looks acceptable." },
        apply: `Define one pass/fail threshold for each validation level and map owner + cadence. Push to: \`/docs/deploy/validation-pyramid.md\``,
        keys: ["Layered validation catches hidden regressions", "Any failed layer blocks promotion", "Holdout ownership must stay independent"],
      },
      {
        id: "6.4", title: "Golden Dataset Operations", type: "technical",
        content: `Golden datasets are living production controls.

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

Quality trend matters more than one-time score. Watch drift and category regressions over time.`,
        quiz: { q: "What is the fastest way to make a golden dataset stale?", a: "Treating it as a one-time artifact and not adding new cases from real failures and product changes." },
        apply: `Draft a maintenance playbook with intake rules, review cadence, and holdout governance. Push to: \`/docs/deploy/golden-dataset-ops.md\``,
        keys: ["Datasets are operational assets", "Incidents must feed new test rows", "Holdout sets should remain isolated"],
      },
      {
        id: "6.5", title: "Sprint 0 for AI-Native Teams", type: "framework",
        content: `Sprint 0 is where AI delivery quality is won or lost.

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
4. What evidence proves readiness?`,
        quiz: { q: "What is the minimum definition of a complete Sprint 0?", a: "A completed decision package for scope, ownership, eval thresholds, risk baseline, and launch gates before implementation starts." },
        apply: `Run a Sprint 0 dry run for one feature and publish outcomes using the team template. Push to: \`/docs/templates/sprint-0-kickoff.md\``,
        keys: ["Sprint 0 defines launch quality before build", "Decision rights must be explicit", "Evidence gates must exist before coding"],
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
      {
        id: "7.2", title: "AGENTS.md and Repo Policy", type: "ops",
        content: `AGENTS.md is a runtime governance contract.

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
- Identify what each section is defending against before writing your own policy`,
        quiz: { q: "What is the most important property of AGENTS.md in production teams?", a: "It must be executable governance, not documentation; rules must match actual tooling and enforcement paths." },
        apply: `**Pattern-spot exercise**:
1. Review the anthology: \`/docs/examples/agents-md/README.md\`
2. Compare startup vs YC vs enterprise examples and list the top 5 governance differences.
3. Review the weak AGENTS sample in the anthology index and identify 5 critical gaps.
4. Propose two hardening updates for your own repo policy.

Push to: \`/docs/deploy/agents-governance-audit.md\``,
        keys: ["Policy must be executable", "Governance drift is a release risk", "Tool and boundary rules must be explicit"],
      },
      {
        id: "7.3", title: "Hallucination and Drift Monitoring", type: "ops",
        content: `Drift is inevitable in AI systems. Monitoring must be proactive.

Track at least:
- hallucination rate by scenario
- correction rate by segment
- output contract failure rate
- latency and cost drift
- plan-vs-output divergence in traces

Define alert routes and owners before incident load appears.

Weekly operations review should include one drift narrative: what moved, why it moved, and what changed in controls.`,
        quiz: { q: "Why do teams miss drift until users complain?", a: "Because they monitor aggregate usage and uptime but not quality signals by scenario and segment." },
        apply: `Design a weekly drift report template with thresholds and escalation owners. Push to: \`/docs/deploy/drift-monitoring-weekly.md\``,
        keys: ["Drift is normal and must be managed", "Segment-level signals matter", "Alerts need clear owners"],
      },
      {
        id: "7.4", title: "Kill-Switch Design by Repository", type: "ops",
        content: `Kill switches are recovery infrastructure, not panic buttons.

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

Test kill switches in drills. Unrehearsed kill switches fail when needed most.`,
        quiz: { q: "What makes a kill switch unreliable in real incidents?", a: "No drill history, unclear ownership, and undefined rollback behavior after trigger activation." },
        apply: `Create a kill-switch runbook with trigger matrix and drill cadence. Push to: \`/docs/deploy/kill-switch-runbook.md\``,
        keys: ["Kill switches require drills", "Triggers must map to action levels", "Rollback behavior must be predefined"],
      },
      {
        id: "7.5", title: "AI-Merge Cap Governance", type: "ops",
        content: `Merge caps control adoption risk while teams build verification maturity.

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
- rollback frequency`,
        quiz: { q: "When should an AI-merge cap be increased?", a: "Only after stable evidence shows quality and review systems can absorb more AI-authored changes without higher escape risk." },
        apply: `Draft a cap policy with raise/lower triggers and exemption rules. Push to: \`/docs/deploy/ai-merge-cap-policy.md\``,
        keys: ["Caps pace risk, not creativity", "Cap changes need evidence", "Rollback trends must inform cap policy"],
      },
      {
        id: "7.6", title: "Audit-Trail PR Review", type: "practice",
        content: `Diff-only review misses AI-specific failure modes.

Review stack:
1. Intent plan (what was supposed to happen)
2. Execution log (what the agent actually did)
3. PR diff (what changed)
4. Evidence artifacts (eval, traces, policy checks)

Required reviewer questions:
- Does the diff match stated intent?
- Did execution shortcuts bypass safeguards?
- Are evidence links sufficient for release confidence?

This review style improves defect catch rate for generated code and config.`,
        quiz: { q: "Why is intent-plan review useful before reading a PR diff?", a: "It reveals whether implementation drifted from expected scope and helps detect hidden behavior changes early." },
        apply: `Use the audit-trail rubric on one AI-generated PR and log findings by severity. Push to: \`/docs/deploy/ai-pr-audit-review.md\``,
        keys: ["Diff-only is insufficient for AI-generated changes", "Intent and logs must be reviewed with code", "Evidence links are release-critical"],
      },
      {
        id: "7.7", title: "AI Risk Register Operations", type: "framework",
        content: `Risk registers should operate like live control boards, not static docs.

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

If risk ownership is unclear, incidents become coordination failures.`,
        quiz: { q: "What is the most common operational failure in AI risk registers?", a: "Entries exist but ownership and escalation triggers are missing, so nothing happens when risk materializes." },
        apply: `Refresh your risk register with owner, trigger, and cadence fields for each top risk. Push to: \`/docs/templates/ai-risk-register.md\``,
        keys: ["Registers need owners and triggers", "Risk review must be scheduled", "Post-incident updates are mandatory"],
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
    id: "8.5", week: "WEEK 8.5", module: "MODULE 8.5", title: "AI-Native Mobile Delivery Systems", tag: "Specialization", accent: "#1F7AE0",
    lessons: [
      {
        id: "8.5.1", title: "Design Tokens as Agent Context", type: "technical",
        content: `Design tokens are the shortest path from brand consistency to reliable generated UI.

For agent workflows, token context should include:
- semantic color roles
- typography scales and usage rules
- spacing and layout primitives
- interaction states
- platform constraints

Token bundles should be machine-readable and versioned. Screenshots alone are not enough context for consistent generation.`,
        quiz: { q: "Why are screenshots insufficient as the only UI context for coding agents?", a: "They show appearance but not reusable semantic rules; tokens encode the design system constraints agents can execute consistently." },
        apply: `Export your current token set and map each token category to one generation rule. Push to: \`/docs/design/mobile-token-context.md\``,
        keys: ["Tokens provide executable design constraints", "Semantic roles matter more than raw values", "Versioned token context improves UI consistency"],
      },
      {
        id: "8.5.2", title: "UI Consistency via Token Injection", type: "practice",
        content: `Token injection means including a compact design-system contract in prompt context before code generation.

Injection checklist:
- include only active tokens for the surface
- include component-level usage rules
- include prohibited styles
- include accessibility constraints

Validation should compare output against token expectations, not visual preference alone.`,
        quiz: { q: "What is the biggest benefit of token injection in UI generation?", a: "It turns design consistency into a pre-generation constraint instead of post-generation cleanup." },
        apply: `Run one side-by-side generation with and without token injection and log consistency deltas. Push to: \`/docs/design/token-injection-audit.md\``,
        keys: ["Inject rules before generation", "Keep token context scoped", "Validate against rules, not taste"],
      },
      {
        id: "8.5.3", title: "Flutter Agent Orchestration", type: "technical",
        content: `Flutter delivery benefits from explicit orchestration boundaries.

Suggested split:
- planner agent (task decomposition)
- UI agent (widget and layout work)
- integration agent (state and data contracts)
- reviewer agent (quality and regression checks)

Use narrow prompts per agent and pass structured handoff state between stages.`,
        quiz: { q: "Why is one monolithic prompt risky for complex Flutter tasks?", a: "It overloads context and mixes responsibilities, increasing inconsistency and rework." },
        apply: `Define a 4-agent Flutter orchestration map with handoff artifacts. Push to: \`/docs/develop/flutter-agent-orchestration.md\``,
        keys: ["Specialized agents reduce context overload", "Structured handoffs improve reliability", "Review stage should be explicit"],
      },
      {
        id: "8.5.4", title: "Context Engineering for Flutter", type: "technical",
        content: `Flutter context packs should be layered and size-controlled.

Recommended assembly order:
1. task contract
2. design token subset
3. target file interfaces
4. state/data constraints
5. acceptance tests

Avoid dumping entire repos into context. Precision beats volume for generated mobile code quality.`,
        quiz: { q: "What usually causes low-quality generated Flutter code in large projects?", a: "Unscoped context overload that hides the task contract and critical constraints." },
        apply: `Build a context-pack template for one Flutter feature with explicit token budget allocation. Push to: \`/docs/develop/flutter-context-pack.md\``,
        keys: ["Context order impacts output quality", "Precision beats volume", "Acceptance tests should be in-context"],
      },
      {
        id: "8.5.5", title: "Multi-Agent Mobile Delivery", type: "systems",
        content: `Conductor-plus-specialist patterns help mobile teams parallelize safely.

Core design points:
- clear agent ownership boundaries
- serialized state handoff
- explicit termination conditions
- escalation when no-progress loops appear

Measure outcome by quality and cycle time, not agent count.`,
        quiz: { q: "What makes multi-agent orchestration fail most often?", a: "Unclear ownership and missing termination/escalation rules." },
        apply: `Design a conductor-specialist workflow for one mobile feature and define failure escalation steps. Push to: \`/docs/develop/mobile-multi-agent-workflow.md\``,
        keys: ["Boundaries and handoffs are critical", "Termination rules prevent loops", "Velocity must be paired with quality evidence"],
      },
      {
        id: "8.5.6", title: "BLE/IoT HITL Mapping for Mobile", type: "framework",
        content: `For hardware-adjacent features, autonomy must map to risk.

Map each task to a HITL level:
- low-risk read actions
- medium-risk configuration actions
- high-risk firmware or irreversible actions

For high-risk paths require:
- preflight checks
- explicit human approval
- staged rollout
- rollback validation`,
        quiz: { q: "Why should BLE/IoT actions use stricter HITL mapping than standard UI tasks?", a: "Because failures can affect physical devices, user safety, and irreversible hardware states." },
        apply: `Create a BLE/IoT HITL matrix with task type, level, approver, and rollback path. Push to: \`/docs/templates/mobile-hitl-map.md\``,
        keys: ["Map autonomy to physical risk", "High-risk actions require approvals", "Rollback readiness is mandatory"],
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
      {
        id: "9.3", title: "Go/No-Go with AI Evidence", type: "framework",
        content: `Go/no-go decisions should be evidence-gated, not confidence-gated.

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

Time-to-decision improves when evidence format is standardized before release week.`,
        quiz: { q: "What is the fastest way to reduce release decision ambiguity?", a: "Use a fixed go/no-go evidence packet with pre-agreed red-line triggers." },
        apply: `Run a mock release review and classify one feature as go or no-go with evidence. Push to: \`/docs/templates/go-no-go-evidence.md\``,
        keys: ["Go/no-go requires a fixed evidence packet", "Red-line triggers must be pre-defined", "Ownership clarity reduces launch confusion"],
      },
      {
        id: "9.4", title: "Responsible AI Checklist for Consumer Products", type: "framework",
        content: `Consumer-facing AI features need practical trust controls.

Checklist domains:
- transparency and disclosure
- privacy and data minimization
- fairness across user segments
- failure UX and recovery
- escalation and human recourse
- auditability for critical decisions

Treat responsible AI as a release quality lane, not a post-launch policy task.`,
        quiz: { q: "Why should responsible AI checks be tied to release gates?", a: "Because trust failures are product failures; they must block launch just like critical defects." },
        apply: `Apply a responsible AI checklist to one live feature and log gaps with owners and due dates. Push to: \`/docs/templates/responsible-ai-audit-template.md\``,
        keys: ["Responsible AI is a release lane", "Checklists need owners and deadlines", "Failure UX is part of responsible design"],
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
        meta: {
          lastVerified: "2026-04-17",
          supplementaryReading: ["/docs/reading/micro-teams-2026.md"],
        },
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
      {
        id: "12.6", title: "DORA Baselines Before Agent Adoption", type: "systems",
        content: `Agent adoption without baseline metrics creates false progress stories.

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

Supplementary reading: \`/docs/reading/micro-teams-2026.md\` (sections on DORA baselines and first 90-day transition controls).`,
        quiz: { q: "Why is baseline collection mandatory before introducing more AI-authored changes?", a: "Without baseline data you cannot attribute improvements or regressions to the adoption change." },
        apply: `Document a 4-week DORA baseline and define post-adoption comparison rules.

Then map your current org to one Micro-Teams transition path and list three early warning signals from the first 30 days.

Push to: \`/docs/executive/dora-baseline-ai-transition.md\``,
        keys: ["Baselines prevent false ROI claims", "DORA + AI overlays give real signal", "Comparisons need fixed windows"],
      },
      {
        id: "12.7", title: "Org Design for AI-Native Teams", type: "framework",
        content: `AI-native org design reallocates effort from typing to verification and governance.

Define:
- role transitions
- decision rights by risk tier
- verification ownership
- incident governance
- cross-functional cadences

Good org design lowers coordination debt while increasing control clarity.

Use \`/docs/reading/micro-teams-2026.md\` to compare single-orchestrator, micro-team pod, and agency-style delivery models before selecting your transition map.`,
        quiz: { q: "What is the primary org design goal in AI-native teams?", a: "To increase delivery speed while preserving quality through explicit verification and governance ownership." },
        apply: `Create an org transition map from current roles to AI-native role boundaries.

Add a 90-day pilot appendix using \`/docs/templates/90-day-micro-team-pilot.md\` if you are running executive-track capstone work.

Push to: \`/docs/executive/org-design-ai-native.md\``,
        keys: ["Shift work from implementation to verification", "Decision rights must be explicit", "Cadence design matters"],
      },
      {
        id: "12.8", title: "Vendor Switching and Portability Strategy", type: "framework",
        content: `Vendor strategy must include switch readiness, not just procurement quality.

Portability checklist:
- prompt/template portability
- schema compatibility
- observability continuity
- eval replayability across providers
- legal and data transfer readiness

Switching triggers should be explicit: quality degradation, pricing shock, reliability issues, or policy change.`,
        quiz: { q: "What is the most important capability for reducing model vendor lock-in?", a: "Maintaining portable prompts/evals and abstraction layers so provider migration can be validated quickly." },
        apply: `Draft a vendor-switch trigger matrix with migration readiness score. Push to: \`/docs/executive/vendor-switch-readiness.md\``,
        keys: ["Portability needs technical and legal readiness", "Triggers should be pre-defined", "Eval replayability enables safe migration"],
      },
      {
        id: "12.9", title: "Communicating AI Ops Metrics to Leadership", type: "practice",
        content: `Leadership communication should convert technical signals into business decisions.

Translate:
- eval drift -> customer risk
- merge cap pressure -> execution capacity risk
- correction-rate trend -> product quality risk
- cost trend -> margin risk

Use one decision-oriented narrative:
1. What changed
2. Why it matters
3. What decision is needed
4. What happens if delayed`,
        quiz: { q: "Why do many AI metrics updates fail at executive level?", a: "They report telemetry without translating it into risk, impact, and decision requirements." },
        apply: `Prepare a one-page executive AI ops brief using the 4-part narrative format. Push to: \`/docs/executive/ai-ops-brief-template.md\``,
        keys: ["Translate metrics into decisions", "Use risk-impact language", "Keep reporting cadence consistent"],
      },
    ],
  },
];
