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
