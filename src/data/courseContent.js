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
