export const LIVE_BASELINE_LAST_UPDATED = "2026-04-11";

export const LIVE_BASELINE = {
  version: "v1",
  status: "active",
  ownerRole: "Curriculum Operations Lead",
  verificationMethod: "monthly_manual_review",
  cadence: "monthly",
  objective:
    "Keep the technical baseline current without rewriting durable curriculum principles.",
  tracks: [
    {
      id: "foundation-models",
      title: "Foundation Models and Reasoning Controls",
      status: "active",
      cadence: "biweekly",
      ownerRole: "AI PM Instructor",
      verificationMethod: "official_vendor_docs_cross_check",
      checks: [
        "Model routing guidance is current",
        "Reasoning-effort controls are documented",
        "Structured output best practices are present",
      ],
      sources: [
        {
          provider: "OpenAI",
          label: "API pricing and model docs",
          url: "https://developers.openai.com/api/docs/pricing",
        },
        {
          provider: "Anthropic",
          label: "Agent and tool docs",
          url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
        },
        {
          provider: "Google",
          label: "Gemini API pricing and function calling",
          url: "https://ai.google.dev/gemini-api/docs/pricing",
        },
      ],
    },
    {
      id: "token-economics",
      title: "Token Economics and Cost Mitigation",
      status: "active",
      cadence: "monthly",
      ownerRole: "Technical PM",
      verificationMethod: "cost_notebook_recalculation",
      checks: [
        "Cached input economics are covered",
        "Batch and async processing economics are covered",
        "Tool-call cost tradeoffs are reflected in examples",
      ],
      artifacts: [
        "token_cost_model_v2",
        "arabic_vs_english_cost_comparison",
        "pricing_change_log",
      ],
    },
    {
      id: "orchestration-stack",
      title: "Orchestration and Agentic Runtime",
      status: "active",
      cadence: "monthly",
      ownerRole: "Staff Engineer",
      verificationMethod: "hands_on_reference_impl_review",
      checks: [
        "State and memory patterns are current",
        "Loop prevention and termination guards are current",
        "Human checkpoint patterns are included",
      ],
      referenceTools: ["LangGraph", "CrewAI", "Letta", "Vertex AI Agent tooling"],
    },
  ],
};
