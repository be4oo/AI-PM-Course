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
  "1.5": {
    leadershipNote:
      "Kill criteria are governance commitments, not optional cleanup tasks. Leaders should pre-commit threshold ownership and sunset pathways before funding scale.",
    toolingLab: {
      title: "Tooling Lab: Kill Criteria Register Draft",
      tools: ["Portfolio scorecard", "Decision memo"],
      steps: [
        "Define at least 5 kill dimensions with measurable thresholds.",
        "Assign one accountable owner for each dimension.",
        "Set cadence and a concrete sunset action per trigger.",
      ],
      artifactPath: "/docs/templates/kill-criteria-register.md",
    },
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
    reviewerHint:
      "Use the Senior AI PM reviewer first, then the Executive Sponsor reviewer if the artifact will be used for stakeholder buy-in.",
    recommendedPersonas: ["senior-ai-pm", "executive-sponsor"],
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
  "2.4": {
    leadershipNote:
      "Machine-readable acceptance criteria are a governance boundary. If criteria cannot be verified automatically, quality claims are not board-ready.",
    toolingLab: {
      title: "Tooling Lab: Executable AC Design",
      tools: ["Promptfoo", "Langfuse"],
      steps: [
        "Define 8 binary acceptance criteria for one feature.",
        "Map each criterion to one evidence source.",
        "Flag any criterion that cannot be objectively tested.",
      ],
      artifactPath: "/docs/specs/[feature]-agent-criteria.md",
    },
  },
  "2.5": {
    leadershipNote:
      "AI PRDs should be release-control contracts. Missing permissions, thresholds, or escalation owners should block launch approval.",
  },
  "2.6": {
    leadershipNote:
      "Routing policy is margin policy. Leadership should review quality, latency, and cost outcomes by task class, not model brand.",
    toolingLab: {
      title: "Tooling Lab: Routing Policy Review",
      tools: ["Helicone", "Portkey", "Langfuse"],
      steps: [
        "Define task-based routing lanes and fallbacks.",
        "Set downgrade and escalation thresholds.",
        "Review weekly routing outcomes for drift.",
      ],
      artifactPath: "/docs/templates/model-routing-policy.md",
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
  "4.2": {
    leadershipNote:
      "AI-native research should accelerate insight generation while preserving source-traceability and ethical disclosure standards.",
    toolingLab: {
      title: "Tooling Lab: AI Discovery Sprint",
      tools: ["Interview transcript set", "Prompt library"],
      steps: [
        "Run source-mapped thematic synthesis on at least five interviews.",
        "Generate adversarial personas with anti-bias constraints.",
        "Draft a disclosed Wizard-of-Oz pilot and consent language.",
      ],
      artifactPath: "/docs/templates/ai-discovery-prompt-library.md",
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
    reviewerHint:
      "Use the Eval Engineer reviewer to stress-test coverage quality, then rerun with the Red-Team Attacker if adversarial slices are still thin.",
    recommendedPersonas: ["eval-engineer", "red-team-attacker"],
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
  "6.3": {
    leadershipNote:
      "Validation layering protects release quality under scale. A single aggregate pass rate should never be treated as sufficient release evidence.",
  },
  "6.4": {
    leadershipNote:
      "Golden datasets are operating controls, not static assets. Governance should require versioning, holdout discipline, and post-incident updates.",
  },
  "6.5": {
    leadershipNote:
      "Sprint 0 decisions are executive risk controls. If ownership, thresholds, and escalation paths are unclear, implementation should not start.",
  },
  "6.6": {
    leadershipNote:
      "Eval maintenance is a standing reliability budget item. Treat drift and judge variance review as routine operations, not ad hoc incident response.",
    toolingLab: {
      title: "Tooling Lab: Eval Debt Audit Run",
      tools: ["Promptfoo", "W&B Weave", "Langfuse"],
      steps: [
        "Run one variance check with repeated judge scoring.",
        "Tag stale or low-coverage dataset slices.",
        "Publish owner, remediation window, and next audit date.",
      ],
      artifactPath: "/docs/templates/eval-debt-audit.md",
    },
  },
  "6.7": {
    leadershipNote:
      "Offline eval confidence is necessary but not sufficient; leaders should demand product instrumentation that captures user-level success and regret patterns.",
    toolingLab: {
      title: "Tooling Lab: AI Product Instrumentation Blueprint",
      tools: ["Event schema", "Shadow-mode plan"],
      steps: [
        "Define session success for one non-deterministic feature.",
        "Map regret and containment metrics to event fields.",
        "Design a shadow-mode rollout with bias-aware sampling.",
      ],
      artifactPath: "/docs/templates/ai-event-schema.md",
    },
  },
  "7.1": {
    leadershipNote:
      "Observability is governance infrastructure. If leaders cannot see quality, cost, and failure behavior in near real time, they cannot govern AI risk.",
    reviewerHint:
      "Route launch packets through the Safety Reviewer when observability and incident ownership are still emerging.",
    recommendedPersonas: ["safety-reviewer", "senior-ai-pm"],
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
  "7.2": {
    leadershipNote:
      "Repository policy is only useful when it is enforceable. Leadership should require periodic policy-to-runtime audits.",
    toolingLab: {
      title: "Tooling Lab: AGENTS Pattern Contrast",
      tools: ["Repository policy diff", "Review checklist"],
      steps: [
        "Compare startup, YC-scale, and enterprise AGENTS patterns.",
        "Score your current policy against kill-switch and merge-cap clarity.",
        "Identify five weaknesses in the deliberately weak example and propose fixes.",
      ],
      artifactPath: "/docs/examples/agents-md/README.md",
    },
  },
  "7.3": {
    leadershipNote:
      "Quality drift should be reviewed like financial drift: regularly, with thresholds and accountable owners.",
  },
  "7.4": {
    leadershipNote:
      "Kill-switch readiness is a resilience metric. Untested shutdown protocols are operational debt.",
  },
  "7.5": {
    leadershipNote:
      "AI-merge caps are governance pacing tools; increase only with evidence of stable review quality.",
  },
  "7.6": {
    leadershipNote:
      "Audit-trail review prevents hidden scope drift and unsafe automation shortcuts that diff-only reviews miss.",
  },
  "7.7": {
    leadershipNote:
      "A risk register without owners and escalation triggers is a documentation artifact, not a control mechanism.",
  },
  "7.8": {
    leadershipNote:
      "Prompt assets should be reviewed with the same rigor as code changes, including versioning, blast radius, and rollback windows.",
    toolingLab: {
      title: "Tooling Lab: Prompt Change Governance",
      tools: ["Prompt registry", "Eval diff"],
      steps: [
        "Create a semantic diff for one prompt update.",
        "Attach eval delta and rollback plan.",
        "Record the change in prompt changelog.",
      ],
      artifactPath: "/docs/templates/prompt-change-review.md",
    },
  },
  "7.9": {
    leadershipNote:
      "FinOps is a reliability function for AI systems; budget ownership and runaway-agent controls should be reviewed like safety controls.",
    toolingLab: {
      title: "Tooling Lab: FinOps Incident Drill",
      tools: ["Cost dashboard", "Incident runbook"],
      steps: [
        "Define user, feature, tenant, and model attribution tags.",
        "Set request/session/tenant budget caps.",
        "Run a simulated runaway-agent response drill.",
      ],
      artifactPath: "/docs/templates/ai-finops-playbook.md",
    },
  },
  "7.10": {
    leadershipNote:
      "Multi-tenant trust fails catastrophically with a single isolation miss. Tenant-scoped retrieval and memory controls should be explicitly audited before release.",
    toolingLab: {
      title: "Tooling Lab: Tenant Isolation Audit",
      tools: ["Cross-tenant probe suite", "Eval shards"],
      steps: [
        "Define retrieval namespace/filter strategy.",
        "Design memory isolation and TTL controls.",
        "Run cross-tenant leakage test cases and log outcomes.",
      ],
      artifactPath: "/docs/templates/multi-tenant-safety-audit.md",
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
  "8.5.1": {
    leadershipNote:
      "Design token governance is a product consistency control. Without token-level constraints, UI quality drifts as generation velocity increases.",
  },
  "8.5.2": {
    leadershipNote:
      "Token injection shifts UI consistency from review-time cleanup to generation-time prevention.",
  },
  "8.5.3": {
    leadershipNote:
      "Flutter orchestration should enforce role boundaries and quality checkpoints, not rely on one oversized prompt.",
  },
  "8.5.4": {
    leadershipNote:
      "Context size is a budget decision. Leadership should require evidence that context packs are scoped and quality-effective.",
  },
  "8.5.5": {
    leadershipNote:
      "Multi-agent speed gains only matter when coupled to measurable quality controls and escalation discipline.",
  },
  "8.5.6": {
    leadershipNote:
      "Physical-adjacent features require stricter HITL governance than standard app workflows because failure impact is materially higher.",
    toolingLab: {
      title: "Tooling Lab: Mobile HITL Risk Map",
      tools: ["Promptfoo", "Langfuse"],
      steps: [
        "Map BLE/IoT actions to HITL levels.",
        "Define approver and rollback owner for high-risk paths.",
        "Attach preflight checks before autonomous actions.",
      ],
      artifactPath: "/docs/templates/mobile-hitl-map.md",
    },
  },
  "9.1": {
    leadershipNote:
      "AI OKRs must pair adoption metrics with quality metrics to prevent teams from scaling a broken or hallucination-prone feature purely to hit usage targets.",
  },
  "9.3": {
    leadershipNote:
      "Go/no-go decisions should be governed by pre-agreed evidence packets and red-line triggers, not meeting-room confidence.",
  },
  "9.4": {
    leadershipNote:
      "Responsible AI is a release-quality lane. Missing trust controls should block rollout the same way critical defects do.",
  },
  "9.5": {
    leadershipNote:
      "Failure anthologies build pattern memory across teams. Leadership should require case debriefs to produce control updates, not just lessons learned notes.",
    toolingLab: {
      title: "Tooling Lab: Failure Debrief Conversion",
      tools: ["Case timeline worksheet", "Risk register", "Eval backlog"],
      steps: [
        "Select one public case and map it to framework failure lanes.",
        "Define one counterfactual control and one launch-gate adjustment.",
        "Publish follow-through tasks with owners and due dates.",
      ],
      artifactPath: "/docs/templates/failure-debrief-template.md",
    },
  },
  "9.6": {
    leadershipNote:
      "Regulatory readiness should be treated as operating design, not legal afterthought. Teams should tie obligations to concrete evidence owners before launch.",
    toolingLab: {
      title: "Tooling Lab: Regulatory Mapping Pass",
      tools: ["EU AI Act tier map", "NIST AI RMF worksheet"],
      steps: [
        "Classify one feature by EU AI Act risk tier.",
        "Map controls to Govern/Map/Measure/Manage.",
        "Link each obligation to an owner and evidence artifact.",
      ],
      artifactPath: "/docs/templates/regulatory-readiness-checklist.md",
    },
  },
  "10.1": {
    leadershipNote:
      "Capstone readiness should be assessed like a launch board review: evidence-backed quality, economics, risk, and operations all required.",
    reviewerHint:
      "Use the Adversarial Cohort Simulator here before marking a milestone complete. Start with Senior AI PM, then escalate to Safety Reviewer or Executive Sponsor depending on the open risk.",
    recommendedPersonas: ["senior-ai-pm", "safety-reviewer", "executive-sponsor"],
    toolingLab: {
      title: "Tooling Lab: Launch Readiness Bundle",
      tools: ["Promptfoo", "Langfuse", "Portkey", "Phoenix"],
      steps: [
        "Attach latest eval report.",
        "Attach latest observability trace summary.",
        "Attach guardrail and incident-readiness checks.",
        "Enable weekly artifact CI in advisory mode before strict enforcement.",
      ],
      artifactPath: "/capstone/",
    },
  },
  "11.2": {
    leadershipNote:
      "MENA privacy posture is a release-critical trust boundary. Cross-border routing and Arabic PII handling should be audited before regional rollout.",
    toolingLab: {
      title: "Tooling Lab: MENA Data Residency Review",
      tools: ["Data-flow map", "PII test set"],
      steps: [
        "Map provider routing and storage locations.",
        "Validate Arabic-aware PII masking across names and IDs.",
        "Define retention and breach escalation owners by jurisdiction.",
      ],
      artifactPath: "/docs/templates/mena-privacy-compliance-checklist.md",
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
        "Use the Micro-Teams reading to compare micro-team, single-orchestrator, and agency models.",
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
  "12.6": {
    leadershipNote:
      "DORA baselines are required before scaling agent-authored change; otherwise reported gains are statistically ungrounded.",
    toolingLab: {
      title: "Tooling Lab: Baseline and Transition Scorecard",
      tools: ["DORA worksheet", "Transition checklist"],
      steps: [
        "Capture deployment frequency, lead time, change failure rate, and MTTR baseline.",
        "Overlay AI-authored change ratio, review latency, and escape-rate trends.",
        "Attach one Micro-Teams transition path with 30/60/90-day checkpoints.",
      ],
      artifactPath: "/docs/executive/dora-baseline-ai-transition.md",
    },
  },
  "12.7": {
    leadershipNote:
      "Org design is the multiplier on AI execution. Clarity in ownership and escalation creates both speed and control.",
    toolingLab: {
      title: "Tooling Lab: 90-Day Micro-Team Pilot",
      tools: ["Org map", "Pilot rubric"],
      steps: [
        "Select one delivery topology for pilot scope.",
        "Define role transitions, decision rights, and risk triggers.",
        "Complete the 90-day pilot template and attach kill criteria.",
      ],
      artifactPath: "/docs/templates/90-day-micro-team-pilot.md",
    },
  },
  "12.8": {
    leadershipNote:
      "Vendor portability is a strategic resilience control. Migration readiness should be measured before lock-in becomes expensive.",
  },
  "12.9": {
    leadershipNote:
      "Executive reporting must convert telemetry into decisions, risks, and explicit asks.",
  },
  "12.10": {
    leadershipNote:
      "Portfolio storytelling should demonstrate judgment under uncertainty, not a polished list of wins. Hiring-signal quality comes from trade-off clarity and evidence links.",
    toolingLab: {
      title: "Tooling Lab: Interview Story Rehearsal",
      tools: ["STAR worksheet", "Leveling matrix"],
      steps: [
        "Write one STAR narrative tied to a real capstone decision.",
        "Attach evidence links for eval and outcome claims.",
        "Self-assess current level and gap to next level.",
      ],
      artifactPath: "/docs/templates/ai-pm-portfolio-template.md",
    },
  },
};
