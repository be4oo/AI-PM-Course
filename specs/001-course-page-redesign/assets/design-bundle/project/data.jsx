/* Lightly-edited course data for the prototype.
   Keeps id/title/structure from the source curriculum; trims content
   to the lessons we render in detail. */

const MODULES = [
  { id: 1,  num: "01", week: "Week 1",  title: "AI Paradigm Shift & Business Strategy", tag: "Strategy",    accent: "#d18d4f" },
  { id: 2,  num: "02", week: "Week 2",  title: "Model Systems & Token Economics",      tag: "Technical",   accent: "#7ba1c7" },
  { id: 3,  num: "03", week: "Week 3",  title: "Context Engineering",                  tag: "Core",        accent: "#a584c7" },
  { id: 4,  num: "04", week: "Week 4",  title: "Discovery & Pain Quantification",      tag: "Discovery",   accent: "#7fb487" },
  { id: 5,  num: "05", week: "Week 5",  title: "Trust Design & AI UX",                 tag: "Design",      accent: "#d18d4f" },
  { id: 6,  num: "06", week: "Week 6",  title: "Build, Evaluate & Iterate",            tag: "Core",        accent: "#e0c46c" },
  { id: 7,  num: "07", week: "Week 7",  title: "Production, Security & Governance",    tag: "Production",  accent: "#e26b6b" },
  { id: 8,  num: "08", week: "Week 8",  title: "Agents, Voice & Multimodal",           tag: "Advanced",    accent: "#7ba1c7" },
  { id: 9,  num: "09", week: "Week 9",  title: "GTM, Ethics & AI Leadership",          tag: "Strategy",    accent: "#c089b4" },
  { id:10,  num: "10", week: "Week 10", title: "Capstone & Portfolio",                 tag: "Ship",        accent: "#7fb487" },
];

const LESSONS = {
  1: [
    { id: "1.1", title: "Nine Shifts in AI Product Management", type: "concept",    readMin: 8, exMin: 25, updated: "3 days ago" },
    { id: "1.2", title: "AI Opportunity Landscape & AI-Shaped Problems", type: "concept", readMin: 7, exMin: 30, updated: "2 weeks ago" },
    { id: "1.3", title: "Competitive Moats in the Commoditization Era", type: "framework", readMin: 6, exMin: 20 },
    { id: "1.4", title: "AI ROI, Unit Economics & Investment Memo", type: "framework", readMin: 9, exMin: 45 },
    { id: "1.5", title: "Kill Criteria and Sunset Discipline", type: "framework", readMin: 5, exMin: 20 },
  ],
  2: [
    { id: "2.1", title: "How LLMs Work: Tokens, Embeddings, Attention", type: "technical", readMin: 11, exMin: 30 },
    { id: "2.2", title: "GenAI Value Stack, Moats & Model Selection",   type: "technical", readMin: 8, exMin: 25 },
    { id: "2.3", title: "AI Product Metrics & the AI PRD",              type: "framework", readMin: 9, exMin: 45 },
    { id: "2.4", title: "Machine-Readable Acceptance Criteria",         type: "framework", readMin: 6, exMin: 30 },
    { id: "2.5", title: "AI PRD for Agent-Executed Features",           type: "framework", readMin: 7, exMin: 30 },
    { id: "2.6", title: "Model Routing by Task Type",                   type: "technical", readMin: 6, exMin: 25 },
    { id: "2.7", title: "Reasoning Models: The PM Decision Framework",  type: "technical", readMin: 9, exMin: 30 },
  ],
  3: [
    { id: "3.1", title: "The Context Engineering Stack",                type: "technical", readMin: 10, exMin: 40 },
    { id: "3.2", title: "Advanced Prompting & RAG Architecture",        type: "technical", readMin: 12, exMin: 60 },
    { id: "3.3", title: "Tool Use, MCP & Optimization Ladder",          type: "technical", readMin: 9, exMin: 45 },
    { id: "3.4", title: "Fine-Tune vs. RAG vs. Prompt-Only",            type: "framework", readMin: 8, exMin: 30 },
  ],
  4: [
    { id: "4.1", title: "AI Discovery: Cognitive Load & Service Blueprints", type: "framework", readMin: 7, exMin: 30 },
    { id: "4.2", title: "AI-Native User Research",                          type: "framework", readMin: 6, exMin: 30 },
  ],
  5: [
    { id: "5.1", title: "Trust UX: Confidence, Citations & Affordances",        type: "framework", readMin: 8, exMin: 30 },
    { id: "5.2", title: "Multilingual AI UX, Failure Design & Vendor Risk",     type: "framework", readMin: 8, exMin: 30 },
  ],
  6: [
    { id: "6.1", title: "The Build Loop: Prototype → Evaluate → Iterate", type: "framework", readMin: 9, exMin: 60 },
    { id: "6.2", title: "Multi-Layer Eval Systems & Golden Datasets",     type: "technical", readMin: 10, exMin: 60 },
    { id: "6.4", title: "Golden Dataset Operations",                      type: "technical", readMin: 7, exMin: 30 },
    { id: "6.5", title: "Sprint 0 for AI-Native Teams",                   type: "framework", readMin: 8, exMin: 45 },
  ],
  7: [
    { id: "7.1", title: "Guardrails, Observability & SLOs",  type: "technical", readMin: 9, exMin: 45 },
    { id: "7.2", title: "AGENTS.md and Repo Policy",         type: "ops",       readMin: 6, exMin: 30 },
    { id: "7.3", title: "Hallucination and Drift Monitoring",type: "ops",       readMin: 7, exMin: 30 },
    { id: "7.4", title: "Kill-Switch Design by Repository",  type: "ops",       readMin: 6, exMin: 25 },
  ],
  8: [
    { id: "8.1", title: "Agent Architecture: Sense → Plan → Act",            type: "technical", readMin: 8, exMin: 45 },
    { id: "8.2", title: "Voice Agents, Multimodal & Computer-Use",           type: "technical", readMin: 9, exMin: 30 },
    { id: "8.3", title: "On-Device & Edge AI: The PM Decision Framework",    type: "technical", readMin: 8, exMin: 30 },
  ],
  9: [
    { id: "9.1", title: "Go-to-Market Strategy for AI Features",         type: "framework", readMin: 9, exMin: 45 },
    { id: "9.2", title: "AI Ethics, Bias & Responsible AI",              type: "framework", readMin: 10, exMin: 30 },
    { id: "9.3", title: "Go/No-Go with AI Evidence",                     type: "framework", readMin: 6, exMin: 30 },
    { id: "9.5", title: "AI Product Failure Anthology & Debrief Method", type: "systems",   readMin: 8, exMin: 30 },
  ],
  10: [
    { id: "10.1", title: "Capstone: Ship a Production-Ready AI Product", type: "deliverable", readMin: 5, exMin: 240 },
  ],
};

/* Full content for the lessons we render fully. */
const LESSON_CONTENT = {
  "1.1": {
    lede: "AI didn't reinvent product management. It removed every safety net PMs used to hide behind.",
    sections: [
      {
        kind: "shift", n: 1, title: "Mistakes are instantly visible",
        body: "SaaS features could hide behind onboarding and CS. An AI workflow either works or breaks trust. One hallucination and trust is gone — users don't debug AI, they abandon it."
      },
      {
        kind: "shift", n: 2, title: "Feature thinking → System thinking",
        body: "You now orchestrate systems of context, memory, retrieval, reasoning, tool use, failure recovery, and autonomy. A \"feature\" is a pipeline with six or more components."
      },
      {
        kind: "shift", n: 3, title: "Timelines collapsed",
        body: "Executives expect direction in hours, not weeks. Competitors replicate wrapper features overnight. The market punishes latency in decision-making."
      },
      {
        kind: "shift", n: 4, title: "The old PM hierarchy is dead",
        body: "PM → Design → Eng → QA → Launch is over. You must prototype, write system flows, generate evals, model token cost, design trust UX, and architect context pipelines before eng plans a sprint."
      },
      {
        kind: "shift", n: 5, title: "Two types of PMs now exist",
        body: "Type A uses ChatGPT as a convenience and collapses in conversations about context windows or eval pipelines. Type B understands context engineering, failure modes, token economics, trust design, evals, and tool orchestration — and can ship a working prototype solo."
      },
      {
        kind: "pull",
        body: "The middle disappears. You're either magical or disappointing — there is no \"decent AI product.\""
      },
      {
        kind: "shift", n: 6, title: "AI amplified judgment, not creativity",
        body: "AI generates ideas and code. Only the PM decides which idea matters, which output is trustworthy, and what the business should bet on."
      },
      {
        kind: "shift", n: 7, title: "Distribution is now a PM responsibility",
        body: "Onboarding is positioning. Trust-building is distribution. Intelligent defaults are activation. Explanations are retention. The PM who controls how AI is introduced controls adoption."
      },
      {
        kind: "shift", n: 8, title: "The middle disappears",
        body: "You're either magical or disappointing. AI markets consolidate around winners faster than SaaS. There is no \"decent AI product.\""
      },
      {
        kind: "shift", n: 9, title: "PMs now manage trust, not features",
        body: "Trust is built through predictable behavior, transparent reasoning, recoverable failures, uncertainty disclosure, controlled autonomy, consistent tone, and explicit feedback loops."
      },
      {
        kind: "case",
        title: "Klarna's AI Customer Service Agent",
        body: "Klarna deployed an AI agent handling two-thirds of all customer service conversations in its first month. Key decisions: started at HITL Level 2 (human review on refunds), used structured outputs for all financial actions, built a 500-case golden dataset from historical chats, and routed low-confidence responses to humans. Result: equivalent to 700 full-time agents, 25% fewer repeat inquiries, resolution time from 11 minutes to 2.",
        source: "Klarna AI Agent Case Study, 2024"
      },
    ],
    takeaways: [
      "Type B PMs ship working prototypes solo — they don't just talk about AI.",
      "Trust is the core deliverable, not features.",
      "System thinking replaces feature thinking. You orchestrate pipelines, not screens.",
      "Distribution and activation are now PM responsibilities, not GTM hand-offs.",
    ],
    leadership: "If you can only do one thing this week, run an honest self-audit against the eight Type B skills below. Rate yourself 1–5; anything under 3 is a priority target. Bring the audit to your 1:1 — your manager can't help you level up if they don't know where the gaps are.",
    apply: {
      title: "Self-audit: Type B skills",
      body: "Rate yourself 1–5 on each Type B skill (3 = can explain but haven't shipped). Push the artifact to /docs/self-audit/type-b-skills.md.\n\n• Context engineering\n• Failure-mode awareness\n• Memory policy decisions\n• Autonomy-level design\n• Token-cost modeling\n• Trust UX design\n• Eval suite building\n• Tool orchestration\n\nFor any skill below 3, write a one-sentence plan to ship something against it this month.",
    },
    quiz: {
      q: "What's the core difference between a Type A and Type B AI PM?",
      a: "Type B can ship a working AI prototype solo. They understand context engineering, evals, token economics, and tool orchestration — not just the vocabulary."
    },
    review: {
      personas: ["Skeptical CTO", "Bias auditor", "Frontier-model engineer"],
      hint: "Submit your self-audit and let the panel poke holes in your honesty score and your priority targets."
    },
    metadata: {
      sources: ["Product Faculty V3 Syllabus, Maven 2026", "Klarna AI Agent Case Study, 2024"],
      verified: "2026-Q2",
      artifact: "/docs/self-audit/type-b-skills.md",
    },
  },
};

/* Outline is generated per-lesson but we hand-tune 1.1 */
const LESSON_OUTLINE = {
  "1.1": [
    { id: "lede",       label: "Opening" },
    { id: "shifts",     label: "The nine shifts" },
    { id: "pull",       label: "The middle disappears" },
    { id: "case",       label: "Case: Klarna" },
    { id: "takeaways",  label: "Key takeaways" },
    { id: "leadership", label: "Leadership note" },
    { id: "apply",      label: "Practice" },
    { id: "quiz",       label: "Self-test" },
    { id: "review",     label: "Adversarial review" },
  ],
};

const DUE_REVIEW = {
  count: 4,
  next: { lessonId: "2.3", title: "AI Product Metrics & the AI PRD", due: "Due today" },
};

window.AIPM = { MODULES, LESSONS, LESSON_CONTENT, LESSON_OUTLINE, DUE_REVIEW };
