import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   AI PM COURSE v3.5 — THE DEFINITIVE EDITION
   Based on Product Faculty Certification (Maven)
   Enriched with ChatGPT + Gemini audit feedback
   ═══════════════════════════════════════════ */

const GLOSSARY = [
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

const CHEATSHEETS = [
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

const TOOLS = [
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

const COURSE_BENCHMARK = {
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

const EXPERIENCE_PILLARS = [
  { title: "Strategy", text: "Opportunity sizing, ROI, AI-shaped problems, market wedge vs. core strategy." },
  { title: "Systems", text: "Models, context engineering, RAG, tools, agents, multimodal, and optimization ladders." },
  { title: "Trust", text: "HITL, UX, failure design, guardrails, fairness, privacy, and governance." },
  { title: "Shipping", text: "Eval suites, observability, rollout, capstone delivery, and portfolio-ready artifacts." },
];

const ARTIFACT_TRACKS = [
  "Decision memo: what you decided and why",
  "Working build: workflow, prompt, config, or prototype",
  "Eval report: quality score, failure modes, and regression logic",
  "Retrospective: what improved, what still fails, what to test next",
];

const SOURCE_LIBRARY = [
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

const curriculum = [
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
| "Not sure which product to recommend" | Recommendation with reasoning |`,
        quiz: { q: "A team wants to build an AI feature. The pain score is 14. What do you do?", a: "Kill it. Pain Score of 14 (e.g., severity 7 × frequency 2 × 1 user) is below the 100 threshold. Redirect effort to the highest-scoring pain point." },
        apply: `**Run 1 real discovery interview** with a team member. Map pains → AI capabilities. Score each. Draw a service blueprint for the #1 pain. Push to: \`/docs/discovery/team-discovery.md\``,
        keys: ["Cognitive load hotspots = where AI adds most value", "Pain Score > 100 or kill it", "Service blueprint reveals human-AI boundary"],
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

**The 60-minute prototype rule**: If you can't build a working prototype in 60 minutes with your current stack, the architecture is too complex. Simplify first, optimize later.`,
        quiz: { q: "A team builds an AI prototype and says 'it looks good.' What's wrong?", a: "No eval criteria were defined before building. 'Looks good' is a vibe check, not a metric. Without a golden dataset and rubric defined upfront, you can't measure improvement or catch regressions." },
        apply: `**Build a prototype in 60 minutes**: Use n8n + Claude API. Must produce real output (not demo). Must have 10+ test cases (even manual). Push prototype export + eval log to: \`/projects/sprint-0-prototype/\``,
        keys: ["Evals before code — always", "Prototype in 60 minutes or simplify", "n8n + Claude + Langfuse + Promptfoo = your default stack"],
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

**Incident review**: Capture exact input + context + output + tool calls → Diagnose (context failure? model failure? guardrail gap?) → Fix (add to golden dataset, patch guardrail) → Verify (regression test) → Review monthly.`,
        quiz: { q: "Your AI agent accidentally included a customer's email address in a response to a different customer. Which guardrail types failed?", a: "Output guardrails (PII scan on outputs) and possibly input guardrails (PII redaction before sending context to LLM). Both layers should independently prevent PII leakage." },
        apply: `**Guardrail spec + observability setup**: Define all 4 guardrail types for your feature. Deploy Langfuse (cloud free tier). Instrument one n8n LLM call. Define SLOs. Set budget alerts. Push to: \`/docs/deploy/\``,
        keys: ["4 guardrails: input + output + tool + human approval", "SLOs defined BEFORE launch, not after", "Every incident → golden dataset + guardrail patch"],
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
- Present the adoption phases: "We'll start with human review and earn autonomy"`,
        quiz: { q: "Your AI feature has a 60% activation rate but only 15% repeated use rate. What does this tell you?", a: "Users are curious enough to try it (high activation) but the first experience didn't deliver enough value to return (low repeat). The problem is likely: output quality not meeting expectations, first use case not compelling enough, or too much friction to get value. Focus on time-to-first-value and first-session output quality." },
        apply: `**Write an AI launch plan** for your feature:
1. Dogfooding plan (who, how long, what to track)
2. Beta criteria (which users, what feedback mechanism)
3. Rollout gates (what metrics must pass for each phase expansion)
4. Positioning (user-facing copy for the feature)
5. Exec communication (1-slide pitch with ROI + risk + plan)

Push to: \`/docs/gtm/ai-launch-plan.md\``,
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

This is your portfolio piece. This proves you're Type B.`,
        keys: ["10-part capstone = proof of AI PM competency", "Weekly: decision memo + build + eval + retro", "GitHub commits ARE the certification"],
      },
    ],
  },
];

const ACCENT_DEF = "#FF4D00";

export default function AIPMCourseV3() {
  const [activeMod, setActiveMod] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [showApply, setShowApply] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizA, setShowQuizA] = useState(false);
  const [view, setView] = useState("learn"); // learn | outline | glossary | cheatsheets
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const mainRef = useRef(null);

  // Storage persistence
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage?.get("ai-pm-progress");
        if (r?.value) {
          const d = JSON.parse(r.value);
          if (d.completed) setCompleted(new Set(d.completed));
          if (d.bookmarks) setBookmarks(new Set(d.bookmarks));
          if (d.activeMod !== undefined) setActiveMod(d.activeMod);
          if (d.activeLesson !== undefined) setActiveLesson(d.activeLesson);
        }
      } catch {
        // Storage is optional in this runtime.
      }
    })();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await window.storage?.set("ai-pm-progress", JSON.stringify({
          completed: [...completed], bookmarks: [...bookmarks], activeMod, activeLesson
        }));
      } catch {
        // Ignore persistence failures and keep the course usable.
      }
    };
    save();
  }, [completed, bookmarks, activeMod, activeLesson]);

  const mod = curriculum[activeMod];
  const lesson = mod.lessons[activeLesson];
  const totalLessons = curriculum.reduce((s, m) => s + m.lessons.length, 0);
  const totalExercises = curriculum.reduce((s, m) => s + m.lessons.filter(l => l.apply).length, 0);
  const lessonTypeCounts = curriculum.reduce((acc, m) => {
    m.lessons.forEach((l) => {
      acc[l.type] = (acc[l.type] || 0) + 1;
    });
    return acc;
  }, {});
  const pct = Math.round((completed.size / totalLessons) * 100);
  const lk = (mi, li) => `${curriculum[mi].id}-${curriculum[mi].lessons[li].id}`;
  const isDone = (mi, li) => completed.has(lk(mi, li));
  const isBm = () => bookmarks.has(`${mod.id}-${lesson.id}`);

  const advance = () => {
    setCompleted(p => new Set([...p, lk(activeMod, activeLesson)]));
    setShowApply(false); setShowQuiz(false); setShowQuizA(false);
    if (activeLesson < mod.lessons.length - 1) setActiveLesson(l => l + 1);
    else if (activeMod < curriculum.length - 1) { setActiveMod(m => m + 1); setActiveLesson(0); }
    mainRef.current?.scrollTo(0, 0);
  };

  const goTo = (mi, li) => { setActiveMod(mi); setActiveLesson(li); setShowApply(false); setShowQuiz(false); setShowQuizA(false); setView("learn"); setSidebarOpen(false); mainRef.current?.scrollTo(0, 0); };

  const toggleBm = () => {
    const k = `${mod.id}-${lesson.id}`;
    setBookmarks(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  };

  const doSearch = (q) => {
    if (!q.trim()) { setSearchResults([]); return; }
    const t = q.toLowerCase();
    const results = [];
    curriculum.forEach((m, mi) => m.lessons.forEach((l, li) => {
      if (l.title.toLowerCase().includes(t) || l.content.toLowerCase().includes(t) || (l.keys && l.keys.some(k => k.toLowerCase().includes(t)))) {
        results.push({ mi, li, title: l.title, mod: m.title, id: l.id });
      }
    }));
    setSearchResults(results);
  };

  const renderText = (text) => {
    const lines = text.split("\n");
    const out = [];
    let tableBuffer = [];
    let codeBuffer = [];
    let inCode = false;

    const flushTable = () => {
      if (!tableBuffer.length) return;
      const rows = tableBuffer.filter(r => !r.match(/^\\|[\\s:|-]+\\|$/)).map(r => r.split("|").filter((_, i, a) => i > 0 && i < a.length - 1).map(c => c.trim()));
      out.push(
        <div key={`t${out.length}`} style={{ overflowX: "auto", margin: "24px 0", WebkitOverflowScrolling: "touch" }}>
          <table className="content-table">
            <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const Tag = ri === 0 ? "th" : "td";
                  return <Tag key={ci} style={{ color: ri === 0 ? mod.accent : undefined }}>{cell}</Tag>;
                })}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = [];
    };

    const flushCode = () => {
      if (!codeBuffer.length) return;
      out.push(<pre key={`c${out.length}`} className="content-code">{codeBuffer.join("\\n")}</pre>);
      codeBuffer = [];
    };

    const renderInline = (line) => {
      const parts = line.split(/\\*\\*(.*?)\\*\\*/g);
      return parts.map((p, j) => {
        if (j % 2 === 1) return <strong key={j}>{p}</strong>;
        const cp = p.split(/`(.*?)`/g);
        return cp.map((c, k) => k % 2 === 1 ? <code key={`${j}-${k}`} className="inline-code">{c}</code> : c);
      });
    };

    lines.forEach((line, i) => {
      if (line.startsWith("```") && !inCode) { flushTable(); inCode = true; return; }
      if (line.startsWith("```") && inCode) { inCode = false; flushCode(); return; }
      if (inCode) { codeBuffer.push(line); return; }
      if (line.startsWith("|")) { tableBuffer.push(line); return; }
      flushTable();
      if (!line.trim()) { out.push(<div key={i} style={{ height: 16 }} />); return; }
      if (line.startsWith("**") && line.endsWith("**") && line.slice(2, -2).indexOf("**") === -1)
        return out.push(<div key={i} style={{ fontWeight: 600, color: mod.accent, marginTop: 24, marginBottom: 8, fontSize: 16 }}>{line.replace(/\\*\\*/g, "")}</div>);
      if (line.startsWith("- ") || line.match(/^\\d+\\. /)) {
        const content = line.replace(/^- /, "").replace(/^\\d+\\. /, "");
        return out.push(<div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, paddingLeft: 12 }}><span style={{ color: mod.accent, flexShrink: 0, marginTop: 2, fontSize: 14 }}>›</span><span className="content-text" style={{ marginBottom: 0 }}>{renderInline(content)}</span></div>);
      }
      out.push(<div key={i} className="content-text">{renderInline(line)}</div>);
    });
    flushTable(); flushCode();
    return out;
  };

  // ──── VIEWS ────

  if (view === "glossary") return (
    <div className="main-content">
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div><span style={{ fontSize: 8, color: "#E040FB", letterSpacing: 2 }}>GLOSSARY</span><div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>AI PM Key Terms ({GLOSSARY.length})</div></div>
          <button onClick={() => setView("learn")} style={{ background: "#E040FB", border: "none", color: "#fff", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 8, fontWeight: 700, letterSpacing: 1 }}>BACK</button>
        </div>
        {GLOSSARY.map((g, i) => (
          <div key={i} style={{ borderBottom: "1px solid #151515", padding: "10px 0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E8E8E0", marginBottom: 3 }}>{g.term}</div>
            <div style={{ fontSize: 10, color: "#888", lineHeight: 1.6 }}>{g.def}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (view === "cheatsheets") return (
    <div className="main-content">
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div><span style={{ fontSize: 8, color: "#FFB800", letterSpacing: 2 }}>REFERENCE</span><div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>Cheat Sheets</div></div>
          <button onClick={() => setView("learn")} style={{ background: "#FFB800", border: "none", color: "#000", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 8, fontWeight: 700, letterSpacing: 1 }}>BACK</button>
        </div>
        {CHEATSHEETS.map((c, i) => (
          <div key={i} style={{ border: "1px solid #1A1A1A", marginBottom: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#FFB800", marginBottom: 8 }}>{c.title}</div>
            {c.items.map((item, j) => <div key={j} style={{ fontSize: 10, color: "#B0B0A8", lineHeight: 1.7, paddingLeft: 8, borderLeft: "1px solid #252525", marginBottom: 2 }}>{item}</div>)}
          </div>
        ))}
      </div>
    </div>
  );

  if (view === "tools") return (
    <div className="main-content">
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div><span style={{ fontSize: 8, color: "#00E676", letterSpacing: 2 }}>PRACTICE LAB</span><div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>Tools & Setup ({TOOLS.length})</div></div>
          <button onClick={() => setView("learn")} style={{ background: "#00E676", border: "none", color: "#000", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 8, fontWeight: 700, letterSpacing: 1 }}>BACK</button>
        </div>
        <div style={{ background: "#0A0F0A", border: "1px solid #152515", padding: "10px 12px", marginBottom: 16, fontSize: 10, color: "#88C888", lineHeight: 1.6 }}>
          All tools below are free or have free tiers. Each includes a specific practice exercise tied to course lessons. Do the exercises, push results to your GitHub repo.
        </div>
        {TOOLS.map((t, i) => (
          <div key={i} style={{ border: "1px solid #1A1A1A", marginBottom: 12, padding: "12px 14px", borderLeft: `3px solid ${t.free ? "#00E676" : "#FFB800"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#E8E8E0" }}>{t.name}</span>
              <span style={{ fontSize: 7, padding: "1px 6px", border: "1px solid #333", color: "#888", letterSpacing: 1 }}>{t.cat}</span>
              <span style={{ fontSize: 7, padding: "1px 6px", background: t.free ? "#00E67622" : "#FFB80022", color: t.free ? "#00E676" : "#FFB800", letterSpacing: 1, marginLeft: "auto" }}>{t.free ? "FREE" : "PAID"}</span>
            </div>
            <div style={{ fontSize: 10, color: "#999", lineHeight: 1.6, marginBottom: 6 }}>{t.desc}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 9, color: "#666" }}>
                <span style={{ color: "#00E676", marginRight: 6 }}>SETUP:</span>
                <code style={{ background: "#111", padding: "1px 5px", color: "#88C888", fontSize: 9 }}>{t.setup}</code>
              </div>
              <div style={{ fontSize: 9, color: "#666" }}>
                <span style={{ color: "#0066FF", marginRight: 6 }}>USED IN:</span>
                {t.usedIn.join(" · ")}
              </div>
            </div>
            <div style={{ marginTop: 8, padding: "8px 10px", background: "#0A0F0A", border: "1px solid #152015", fontSize: 10, color: "#88C888", lineHeight: 1.6 }}>
              <span style={{ fontSize: 8, color: "#00E676", letterSpacing: 1.5, display: "block", marginBottom: 4 }}>PRACTICE EXERCISE</span>
              {t.practice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (view === "audit") return (
    <div className="main-content">
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, gap: 12 }}>
          <div>
            <div style={{ fontSize: 8, color: "#00C8FF", letterSpacing: 2 }}>COURSE AUDIT</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Benchmark, gaps, and upgrades</div>
          </div>
          <button onClick={() => setView("learn")} style={{ background: "#00C8FF", border: "none", color: "#00141A", padding: "6px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 8, fontWeight: 700, letterSpacing: 1 }}>BACK</button>
        </div>

        <div style={{ border: "1px solid #15303A", background: "#081015", padding: "14px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 8, color: "#00C8FF", letterSpacing: 2, marginBottom: 8 }}>TARGET</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#E8E8E0", marginBottom: 6 }}>{COURSE_BENCHMARK.target}</div>
          <div style={{ fontSize: 10, color: "#9BB7C2", lineHeight: 1.7 }}>{COURSE_BENCHMARK.targetShape}</div>
          <div style={{ fontSize: 9, color: "#6C8B96", marginTop: 8 }}>Benchmarked against public pages on {COURSE_BENCHMARK.auditDate}.</div>
        </div>

        <div style={{ display: "grid", gap: 12, marginBottom: 14 }}>
          <div style={{ border: "1px solid #1A1A1A", padding: "12px 14px" }}>
            <div style={{ fontSize: 8, color: "#00E676", letterSpacing: 2, marginBottom: 8 }}>WHERE THIS COURSE MATCHES</div>
            {COURSE_BENCHMARK.matchPoints.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: "#00E676", fontSize: 10 }}>+</span>
                <span style={{ fontSize: 10, color: "#C0C0B8", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ border: "1px solid #1A1A1A", padding: "12px 14px" }}>
            <div style={{ fontSize: 8, color: "#FFB800", letterSpacing: 2, marginBottom: 8 }}>WHERE THIS COURSE GOES FURTHER</div>
            {COURSE_BENCHMARK.upgrades.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: "#FFB800", fontSize: 10 }}>→</span>
                <span style={{ fontSize: 10, color: "#C0C0B8", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 14 }}>
          <div style={{ border: "1px solid #1A1A1A", padding: "10px 12px" }}>
            <div style={{ fontSize: 7, color: "#666", letterSpacing: 2, marginBottom: 6 }}>MODULES</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{curriculum.length}</div>
          </div>
          <div style={{ border: "1px solid #1A1A1A", padding: "10px 12px" }}>
            <div style={{ fontSize: 7, color: "#666", letterSpacing: 2, marginBottom: 6 }}>LESSONS</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{totalLessons}</div>
          </div>
          <div style={{ border: "1px solid #1A1A1A", padding: "10px 12px" }}>
            <div style={{ fontSize: 7, color: "#666", letterSpacing: 2, marginBottom: 6 }}>APPLIED EXERCISES</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{totalExercises}</div>
          </div>
          <div style={{ border: "1px solid #1A1A1A", padding: "10px 12px" }}>
            <div style={{ fontSize: 7, color: "#666", letterSpacing: 2, marginBottom: 6 }}>DELIVERABLE TRACKS</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{ARTIFACT_TRACKS.length}</div>
          </div>
        </div>

        <div style={{ border: "1px solid #1A1A1A", padding: "12px 14px" }}>
          <div style={{ fontSize: 8, color: "#E040FB", letterSpacing: 2, marginBottom: 8 }}>LEARNING EXPERIENCE PILLARS</div>
          {EXPERIENCE_PILLARS.map((pillar) => (
            <div key={pillar.title} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#E8E8E0", marginBottom: 2 }}>{pillar.title}</div>
              <div style={{ fontSize: 10, color: "#AFA7BF", lineHeight: 1.6 }}>{pillar.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (view === "sources") return (
    <div className="main-content">
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, gap: 12 }}>
          <div>
            <div style={{ fontSize: 8, color: "#FF6B35", letterSpacing: 2 }}>SOURCE LIBRARY</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Verification and reference points</div>
          </div>
          <button onClick={() => setView("learn")} style={{ background: "#FF6B35", border: "none", color: "#190700", padding: "6px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 8, fontWeight: 700, letterSpacing: 1 }}>BACK</button>
        </div>

        <div style={{ background: "#140D09", border: "1px solid #2B1A10", padding: "12px 14px", marginBottom: 14, fontSize: 10, color: "#D8B7A6", lineHeight: 1.7 }}>
          The benchmark links below were used to calibrate scope and freshness. For fast-moving technical topics, treat this view as a maintenance queue and re-verify regularly.
        </div>

        {SOURCE_LIBRARY.map((source) => (
          <div key={source.title} style={{ border: "1px solid #1A1A1A", padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#E8E8E0" }}>{source.title}</div>
              <span style={{ fontSize: 7, border: "1px solid #3A2A20", color: "#FF6B35", padding: "1px 6px", letterSpacing: 1 }}>{source.kind}</span>
              <span style={{ fontSize: 8, color: "#666" }}>verified {source.verified}</span>
            </div>
            <a href={source.url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: "#8FB9FF", textDecoration: "none", display: "inline-block", marginBottom: 6 }}>{source.url}</a>
            <div style={{ fontSize: 10, color: "#BFA897", lineHeight: 1.6 }}>{source.note}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (view === "outline") return (
    <div className="main-content">
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 8, color: "#FF4D00", letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>AI PM COURSE v4.0</div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3 }}>{curriculum.length} Modules · {totalLessons} Lessons</div>
          </div>
          <button onClick={() => setView("learn")} style={{ background: mod.accent, border: "none", color: "#fff", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 8, fontWeight: 700, letterSpacing: 1 }}>RESUME</button>
        </div>
        {bookmarks.size > 0 && (
          <div style={{ marginBottom: 20, padding: "10px 12px", border: "1px solid #FFB80033", borderLeft: "3px solid #FFB800" }}>
            <div style={{ fontSize: 8, color: "#FFB800", letterSpacing: 2, marginBottom: 6 }}>BOOKMARKS ({bookmarks.size})</div>
            {[...bookmarks].map(bk => {
              const [mid, lid] = bk.split("-");
              const mi = curriculum.findIndex(m => m.id === +mid);
              if (mi < 0) return null;
              const li = curriculum[mi].lessons.findIndex(l => l.id === lid);
              if (li < 0) return null;
              return <button key={bk} onClick={() => goTo(mi, li)} style={{ display: "block", background: "none", border: "none", color: "#D0D0C8", fontSize: 10, cursor: "pointer", padding: "3px 0", textAlign: "left", fontFamily: "inherit" }}>★ {curriculum[mi].lessons[li].title}</button>;
            })}
          </div>
        )}
        {curriculum.map((m, mi) => (
          <div key={m.id} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 7, color: m.accent, letterSpacing: 2, fontWeight: 700, marginBottom: 2 }}>{m.module} · {m.week}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>{m.title}</span>
              <span style={{ fontSize: 8, border: `1px solid ${m.accent}`, color: m.accent, padding: "1px 6px", letterSpacing: 1 }}>{m.tag}</span>
            </div>
            {m.lessons.map((l, li) => (
              <button key={l.id} onClick={() => goTo(mi, li)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "5px 0 5px 14px", cursor: "pointer", borderLeft: `1px solid ${isDone(mi, li) ? m.accent : "#1A1A1A"}` }}>
                <div style={{ width: 12, height: 12, border: `1px solid ${isDone(mi, li) ? m.accent : "#2A2A2A"}`, background: isDone(mi, li) ? m.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#fff", flexShrink: 0 }}>{isDone(mi, li) ? "✓" : ""}</div>
                <span style={{ fontSize: 10, color: isDone(mi, li) ? "#444" : "#D0D0C8" }}>{l.id} — {l.title}</span>
                <span style={{ fontSize: 8, color: "#333", marginLeft: "auto" }}>{l.type}</span>
              </button>
            ))}
          </div>
        ))}
        <div style={{ marginTop: 24, display: "flex", gap: 16, fontSize: 10, color: "#333", flexWrap: "wrap" }}>
          <span>{completed.size}/{totalLessons} complete</span><span>·</span><span>{pct}%</span>
        </div>
      </div>
    </div>
  );

  // ──── MAIN LEARN VIEW ────
  return (
    <div className="app-container">
      {/* Header */}
      <div className="top-bar">
        <div className="top-bar-controls">
          <button onClick={() => setSidebarOpen(s => !s)} className="btn-pill" style={{ fontSize: 16, padding: '2px 8px', borderColor: 'transparent' }}>☰</button>
          <span style={{ background: mod.accent, color: "#fff", padding: "2px 8px", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, borderRadius: 4 }}>v4.0</span>
        </div>
        <div className="top-bar-controls">
          <button onClick={() => setShowSearch(s => !s)} className="btn-pill" style={{fontSize: 16}}>⌕</button>
          <button onClick={() => setView("audit")} className="btn-pill" style={{color: '#00C8FF', borderColor: '#00C8FF44'}}>AUDIT</button>
          <button onClick={() => setView("sources")} className="btn-pill" style={{color: '#FF6B35', borderColor: '#FF6B3544'}}>SRC</button>
          <button onClick={() => setView("cheatsheets")} className="btn-pill">REF</button>
          <button onClick={() => setView("tools")} className="btn-pill" style={{color: '#00E676', borderColor: '#00E67644'}}>LAB</button>
          <button onClick={() => setView("glossary")} className="btn-pill">ABC</button>
          <button onClick={() => setView("outline")} className="btn-pill">MAP</button>
          <div style={{ width: 80, height: 4, background: "#141414", position: "relative", borderRadius: 2, overflow: 'hidden', marginLeft: 8 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: mod.accent, transition: "width 0.4s" }} />
          </div>
          <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{pct}%</span>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="search-bar-container">
          <input value={searchTerm} onChange={e => { setSearchTerm(e.target.value); doSearch(e.target.value); }} placeholder="Search lessons..." className="search-input" autoFocus />
          {searchResults.length > 0 && (
            <div style={{ marginTop: 12, maxHeight: 200, overflowY: "auto" }}>
              {searchResults.slice(0, 8).map((r, i) => (
                <button key={i} onClick={() => { goTo(r.mi, r.li); setShowSearch(false); setSearchTerm(""); setSearchResults([]); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 0", cursor: "pointer", fontFamily: "inherit", borderBottom: '1px solid #1A1A1A' }}>
                  <span style={{ fontSize: 12, color: "#888", marginRight: 8, fontFamily: 'var(--font-mono)' }}>{r.id}</span> <span style={{ fontSize: 14, color: "#D0D0C8" }}>{r.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden", position: 'relative' }}>
        {/* Sidebar overlay */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>✕ Close</button>
          <div style={{paddingTop: 16}}>
            {curriculum.map((m, mi) => (
              <div key={m.id} style={{marginBottom: 16}}>
                <div style={{ padding: "0 16px", fontSize: 11, color: activeMod === mi ? m.accent : "#555", letterSpacing: 1.5, fontWeight: 700, marginBottom: 4 }}>{m.module}</div>
                <div style={{ padding: "0 16px", fontSize: 13, color: activeMod === mi ? "#E0E0D8" : "#888", marginBottom: 8, fontWeight: 600 }}>{m.title}</div>
                {m.lessons.map((l, li) => (
                  <button key={l.id} onClick={() => goTo(mi, li)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", background: activeMod === mi && activeLesson === li ? "#161616" : "transparent", border: "none", borderLeft: activeMod === mi && activeLesson === li ? `3px solid ${m.accent}` : "3px solid transparent", padding: "8px 16px", cursor: "pointer", transition: 'background 0.2s', fontFamily: 'inherit' }}>
                    <div style={{ width: 14, height: 14, flexShrink: 0, border: `1px solid ${isDone(mi, li) ? m.accent : "#333"}`, background: isDone(mi, li) ? m.accent : "transparent", fontSize: 10, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>{isDone(mi, li) ? "✓" : ""}</div>
                    <span style={{ fontSize: 13, color: activeMod === mi && activeLesson === li ? "#fff" : "#999", lineHeight: 1.4, fontWeight: activeMod === mi && activeLesson === li ? 500 : 400 }}>{l.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="main-content" ref={mainRef}>
          <div style={{ background: "#0B0B10", border: "1px solid #171726", padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 8, color: mod.accent, letterSpacing: 2 }}>BENCHMARKED COURSE PRODUCT</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700, marginTop: 4 }}>{COURSE_BENCHMARK.target}</div>
              </div>
              <div style={{ fontSize: 8, color: "#667", textAlign: "right" }}>Verified against public pages on {COURSE_BENCHMARK.auditDate}</div>
            </div>
            <div style={{ fontSize: 10, color: "#B5B5C7", lineHeight: 1.7, marginBottom: 10 }}>
              {COURSE_BENCHMARK.targetShape}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
              <div style={{ border: "1px solid #1E1E2E", padding: "8px 10px" }}>
                <div style={{ fontSize: 7, color: "#666", letterSpacing: 1.6, marginBottom: 4 }}>COURSE SHAPE</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700 }}>{curriculum.length} modules / {totalLessons} lessons</div>
              </div>
              <div style={{ border: "1px solid #1E1E2E", padding: "8px 10px" }}>
                <div style={{ fontSize: 7, color: "#666", letterSpacing: 1.6, marginBottom: 4 }}>ARTIFACT SYSTEM</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700 }}>{ARTIFACT_TRACKS.length} repeatable outputs</div>
              </div>
              <div style={{ border: "1px solid #1E1E2E", padding: "8px 10px" }}>
                <div style={{ fontSize: 7, color: "#666", letterSpacing: 1.6, marginBottom: 4 }}>LESSON MIX</div>
                <div style={{ fontSize: 11, color: "#E8E8E0", fontWeight: 700 }}>{Object.keys(lessonTypeCounts).length} learning modes</div>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <span style={{ color: mod.accent, fontWeight: 600 }}>{mod.module}</span><span>›</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{lesson.id}</span>
            <span style={{ padding: "2px 8px", border: `1px solid ${mod.accent}55`, color: mod.accent, fontSize: 10, letterSpacing: 1, marginLeft: 8, borderRadius: 4, fontWeight: 600 }}>{lesson.type.toUpperCase()}</span>
            <button onClick={toggleBm} style={{ marginLeft: "auto", background: "none", border: "none", color: isBm() ? "#FFB800" : "#555", cursor: "pointer", fontSize: 20, padding: 0 }}>{isBm() ? "★" : "☆"}</button>
          </div>

          <h1>{lesson.title}</h1>

          <div style={{ marginBottom: 16 }}>{renderText(lesson.content)}</div>

          {/* Key takeaways */}
          {lesson.keys?.length > 0 && (
            <div className="takeaways-panel" style={{ border: `1px solid ${mod.accent}33`, borderLeft: `4px solid ${mod.accent}` }}>
              <div style={{ fontSize: 11, color: mod.accent, letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>KEY TAKEAWAYS</div>
              {lesson.keys.map((k, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: mod.accent, fontSize: 14, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 14, color: "#E0E0E0", fontWeight: 500, lineHeight: 1.6 }}>{k}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ background: "#0B100C", border: "1px solid #18221A", padding: "10px 12px", marginBottom: 14 }}>
            <div style={{ fontSize: 7, color: "#00E676", letterSpacing: 2, marginBottom: 8 }}>THIS COURSE'S REPEATING OUTPUT SYSTEM</div>
            {ARTIFACT_TRACKS.map((track, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 4 }}>
                <span style={{ color: "#00E676", fontSize: 9 }}>{i + 1}.</span>
                <span style={{ fontSize: 10, color: "#9FD5A6", lineHeight: 1.55 }}>{track}</span>
              </div>
            ))}
          </div>

          {/* Lesson metadata panel */}
          {lesson.meta && (
            <div className="metadata-panel">
              <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 2, marginBottom: 10, fontWeight: 700 }}>LESSON METADATA</div>
              <div style={{ display: 'grid', gap: 6 }}>
                {lesson.meta.sources && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Sources:</span> {lesson.meta.sources.join(" · ")}</div>}
                {lesson.meta.lastVerified && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Verified:</span> {lesson.meta.lastVerified}</div>}
                {lesson.meta.rubric && <div><span style={{ color: "#8080C0", fontWeight: 600 }}>Rubric:</span> {lesson.meta.rubric.join(" | ")}</div>}
                {lesson.meta.failureModes && <div><span style={{ color: "#C06060", fontWeight: 600 }}>Failure modes:</span> {lesson.meta.failureModes.join(" | ")}</div>}
                {lesson.meta.redTeam && <div><span style={{ color: "#C06060", fontWeight: 600 }}>Red team:</span> {lesson.meta.redTeam.join(" | ")}</div>}
              </div>
            </div>
          )}

          {/* Quiz */}
          {lesson.quiz && (
            <button onClick={() => { setShowQuiz(s => !s); setShowQuizA(false); }} className="btn-pill" style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', background: showQuiz ? "#1A0A2A" : "transparent", border: `1px solid ${showQuiz ? "#8B00FF" : "#1E1E1E"}`, color: showQuiz ? "#b571ff" : "#888", marginBottom: 16 }}>
              <span style={{ marginRight: 8 }}>{showQuiz ? "▼" : "▶"}</span> SELF-TEST QUIZ
            </button>
          )}
          {showQuiz && lesson.quiz && (
            <div className="quiz-panel" style={{ borderLeft: "4px solid #8B00FF" }}>
              <div style={{ fontSize: 16, color: "#D0C8E8", lineHeight: 1.6, marginBottom: 12, fontWeight: 500 }}>{lesson.quiz.q}</div>
              {!showQuizA ? (
                <button onClick={() => setShowQuizA(true)} className="btn-pill" style={{ background: "#8B00FF", color: "#fff", border: 'none', padding: '8px 16px' }}>REVEAL ANSWER</button>
              ) : (
                <div style={{ fontSize: 15, color: "#A088C8", lineHeight: 1.6, borderTop: "1px solid #251A35", paddingTop: 12 }}>{lesson.quiz.a}</div>
              )}
            </div>
          )}

          {/* Apply */}
          <button onClick={() => setShowApply(s => !s)} className="btn-pill" style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px 16px', background: showApply ? `${mod.accent}11` : "transparent", border: `1px solid ${showApply ? mod.accent : "#1E1E1E"}`, color: showApply ? mod.accent : "#888", marginBottom: 16 }}>
            <span style={{ marginRight: 8 }}>{showApply ? "▼" : "▶"}</span> APPLY → PUSH TO GITHUB
          </button>
          {showApply && (
            <div className="exercise-panel" style={{ borderLeft: "4px solid #00A86B" }}>
              <div style={{ fontSize: 11, color: "#00A86B", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>EXERCISE</div>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: "#88C888" }}>{renderText(lesson.apply)}</div>
            </div>
          )}

          {/* Nav */}
          <div style={{ display: "flex", gap: 16, marginTop: 40, paddingTop: 20, borderTop: "1px solid #1A1A1A" }}>
            <button onClick={() => {
              if (activeLesson > 0) { setActiveLesson(l => l - 1); }
              else if (activeMod > 0) { setActiveMod(m => m - 1); setActiveLesson(curriculum[activeMod - 1].lessons.length - 1); }
              setShowApply(false); setShowQuiz(false); setShowQuizA(false); mainRef.current?.scrollTo(0, 0);
            }} className="btn-pill" style={{ padding: '12px 16px', fontSize: 14 }}>← PREV</button>
            
            <button onClick={advance} className="btn-pill" style={{ flex: 1, padding: '12px 16px', fontSize: 14, background: mod.accent, color: '#fff', borderColor: 'transparent' }}>
              {isDone(activeMod, activeLesson) ? "NEXT →" : "COMPLETE + NEXT →"}
            </button>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 14, fontSize: 9, color: "#252525", flexWrap: "wrap" }}>
            <span>{completed.size}/{totalLessons}</span><span>·</span><span>{curriculum.length} modules</span><span>·</span><span>Capstone: {completed.has(`10-10.1`) ? "✓ SHIPPED" : "pending"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
