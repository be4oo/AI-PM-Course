# Building a Production-Grade AI-Native Mobile Micro‑Team That Ships Safely at Speed

## Executive Summary

The transition to a production-grade, AI-native mobile development team operating under the micro-team paradigm requires a comprehensive and disciplined framework built on post-2025 principles [executive_summary[29]][1]. This model redefines traditional roles, introducing specialized functions like Agent Ops to govern the agent lifecycle, while Builders shift focus from writing code to designing and verifying the AI systems that do [executive_summary[57]][2]. 

Governance is codified directly into the repository through critical artifacts. `AGENTS.md` serves as a canonical, machine-readable instruction set defining agent persona, commands, and boundaries [executive_summary[0]][3]. `KILLSWITCH.md` provides a parseable, version-controlled emergency stop protocol with defined triggers and escalation paths [executive_summary[1]][4]. The CI/CD pipeline becomes a critical enforcement point, implementing AI-merge caps, agent audit gates that emit SARIF for policy violations, and strict provenance checks requiring links to Langfuse traces and Promptfoo evaluation results for every AI-generated change [executive_summary[2]][5] [executive_summary[4]][6]. 

Quality is systematically managed through a multi-level validation pyramid, including isolated holdout test suites and the construction of golden datasets for mobile features [executive_summary[9]][7]. Agent execution disciplines are highly structured, employing cost-capability model routing, a conductor-specialist orchestration pattern, and Flutter-specific context engineering [executive_summary[15]][8]. For applications with physical interactions, such as BLE/IoT, a Human-in-the-Loop (HITL) mapping defines strict levels of required human oversight [executive_summary[25]][9]. 

## 1) Operating Model — Micro-Team Roles and Decision Rights

Centralize agent governance in Agent Ops; distribute artifact ownership across Builder, Product Owner (PO), UI/UX Designer, and CTO with crisp cadences and metrics.

### Role-to-Artifact-to-Cadence Map

| Artifact | Schema/Config Highlights | Primary Owner | Required Reviewers | Failure Modes if Absent/Misconfigured | Measurable Impact | Review Cadence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AGENTS.md** | YAML frontmatter, persona, tools, commands, paths, version pins | Agent Ops | Security, Mobile Lead | Unsafe edits, secrets exposure, non-reproducible builds | ↑agent_pr_failure_rate, ↑PR churn | Quarterly + triggered by SDK upgrades |
| **KILLSWITCH.md** | TRIGGERS, FORBIDDEN, ESCALATION (3 levels), AUDIT, OVERRIDE | Agent Ops (CTO sign-off) | Security, Legal | Runaway cost, unsafe ops continue | ↑MTTR, ↑incident cost | Monthly drills; quarterly audits |
| **Promptfoo config** | Providers, langfuse:// prompt refs, schema/assertions | Agent Ops | PO, Builder | Drift undetected, regressions ship | ↑escape-rate | Nightly + PR runs |
| **Langfuse project** | Tracing metadata, LLM-as-judge, anomaly rules | Agent Ops | Platform/SRE | Unattributable incidents | No root-cause traceability | Daily checks; weekly triage |
| **Golden datasets** | Scenario manifests, schemas, device/OS matrix, holdout 10–20% | PO (UI owns visuals) | Builder, AO | UX drift, false green | Visual defects, support tickets | Nightly; per-release |
| **DORA tagging** | Agent-origin flag, model/version, session IDs | Platform/SRE | CTO | No before/after attribution | Blind ROI | Continuous |

This structured ownership prevents agent drift and cost blowouts while reducing the escape rate of defective code [ai_native_team_operating_model.failure_modes_and_impact[0]][3].

## 2) Repository-Governed Safety

Encode agent boundaries where they matter: in code. Schema-complete `AGENTS.md` and `KILLSWITCH.md` create enforceable, auditable guardrails.

### AGENTS.md Authoring Conventions
Machine-parsable schema reduces PR failures and review churn. `AGENTS.md` is a Markdown file placed at the root of a repository that provides AI coding agents with persistent, project-specific operational guidance [agents_md_authoring_framework.schema_definition[1]][10]. It must include required fields: `name`, `applyTo`, `version`, `persona.summary`, `tools.allowed`, `commands.setup`, `paths.allowed`, and `version_pins` [agents_md_authoring_framework.schema_definition[0]][11].

### KILLSWITCH.md Protocol
The `KILLSWITCH.md` file is a parseable, YAML-like repository file that defines an emergency stop protocol for AI agents [kill_switch_governance_protocol.schema_definition[0]][4]. 
* **TRIGGERS:** `cost_limit_usd: 50.00`, `tokens_per_minute: 100000`, `error_rate_threshold: 0.25`.
* **ESCALATION:** Level 1 `reduce_rate`; Level 2 `pause_and_notify`; Level 3 `full_stop` with `save_state: true` [kill_switch_governance_protocol.escalation_levels[0]][4].

## 3) CI/CD Merge Governance

Turn every PR into a policy checkpoint. An eight-stage pipeline enforces merge caps, evaluations, and provenance before artifacts ship.

### Pipeline Stages and Gates

| Stage | Purpose | Pass/Fail Criteria | Outputs/Attestations |
| :--- | :--- | :--- | :--- |
| 1. Repo Health | Check AGENTS.md/KILLSWITCH.md | Present, parse clean | Gate result |
| 2. SAST/Security | CodeQL, secret scanning, red-team | No High/Critical | SARIF, SLSA attestations |
| 3. Agent-Origin Analysis | Compute AI % and cap | ≤10% (≤5% sensitive) or exemption | JSON with AI line count, trace links |
| 4. LLM-Eval | Promptfoo suite | ≥95% pass; no critical fail | SARIF eval report |
| 5. Governance Policy | Agent tool-call rules | Allow or owner exemption | Audit log |
| 6. Human Approval | Risk-based signoff | Valid Ed25519 receipt if needed | Signed artifact |
| 7. Build & Attest | Reproducible builds | Build success | SLSA attestation, SBOM |
| 8. Post-Merge | Telemetry/DORA | Tags applied | DORA data |

You can generate signed SBOM attestations for workflow artifacts to establish build provenance [ci_cd_and_merge_governance.pipeline_stages[1]][12]. 

### AI-Merge Cap and Exemptions

| Code Area | Default Cap | Exemption Signers | Notes |
| :--- | :--- | :--- | :--- |
| General | 10% | 1 owner | For routine refactors |
| Protected branches | 5–10% | 1–2 owners | Stricter on main |
| Actuation (/ble, native) | 5% | 2 signers incl. domain expert | Always HITL |

## 4) Validation & Monitoring

Automated, versioned evaluations with isolated holdouts and drift alerts prevent silent regressions.

### Golden Dataset Construction
A golden dataset is a curated set of real user questions paired with verified correct answers [automated_evaluation_and_monitoring_system.golden_dataset_construction[0]][7]. It includes scenario catalogs with JSON Schemas, a device/OS matrix, and a 10–20% signed holdout.

### Thresholds-to-Actions

| Metric | Threshold | Automated Action |
| :--- | :--- | :--- |
| Promptfoo pass_rate | <0.95 | Quarantine prompt; block promotion |
| Hallucination_rate | P0 threshold crossed | Page AO; throttle to zero; rollback |
| CFR (agent) | +10% over baseline | Exec alert; change freeze on risk areas |

## 5) Agent Execution Disciplines

Route the right task to the right model at the right cost. Decision tables, conductor–specialist orchestration, and strict Flutter context packs minimize errors and cost.

### Model Routing Decision Table

| Task | Model Class | Temp | Mode | Eval | Fallback | Cost Control |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Small lint/edit | Small deterministic (1–2B) | 0.0–0.1 | JSON edit ops | Compile/lint/tests | Retry → mid-tier → human | Per-edit token cap |
| Unit-test gen | Mid-tier | 0.0–0.2 | JSON test-spec | Run tests/coverage | Rephrase → specialist | Token cap |
| Flutter UI widget | High-capability | 0.0–0.2 | Patch + golden spec | Compile/widget/golden | HITL for visual mismatch | Token cap |
| Cross-module refactor | High-capability | 0.0–0.15 | JSON plan + patches | Full compile/regression | Owner sign-off | Budget per PR |
| Dependency upgrade | Mid-tier | 0.0 | Structured PR | Security/license/build | Human for native | Budget per PR |

By instrumenting the SDK with Langfuse, you can capture detailed traces of agent execution, including planning, function calls, and multi-agent orchestration [agent_execution_and_orchestration_disciplines.model_routing_logic[0]][13].

## 6) Physical Interaction Governance (BLE/IoT)

Privileged actuation requires multi-signer approvals, user consent, preflight checks, and staged rollouts. At HITL Level 3, agents are permitted to perform high-impact operations (firmware updates, reboots) but these actions are never fully autonomous [physical_interaction_governance_protocol.hitl_level[0]][4]. They require cryptographic approvals, battery/network preflight checks, and canary rollouts with automated rollback [physical_interaction_governance_protocol.required_guardrails[0]][4].

## 7) AI Code Review & Audit

Make every AI change explain itself. Mandatory provenance and safety metadata enable auto-merge for low-risk and force HITL for high-risk.

### PR Gate Matrix

| Criterion | Auto-Merge Allowed? | Human Review Trigger | Rejection Condition |
| :--- | :--- | :--- | :--- |
| Provenance block (trace_link, model, eval) | Required | Missing fields | Missing → Reject |
| Compilation + unit tests | Must pass | Any failure | Fail → Reject |
| Static analysis | No new High/Critical | New Medium+ in sensitive | Critical → Reject |
| Sensitive code touched | No | Yes | N/A |
| Hallucinated APIs | No | N/A | Evidence → Reject |

When you run your updated workflows, they will build your artifacts and generate an artifact attestation that establishes build provenance [ai_code_review_and_audit_rubric.required_pr_metadata[3]][12].

## 8) Product & Design Disciplines

Machine-readable specs power automated go/no-go. Acceptance criteria schemas, AI-PRDs, and token enforcement convert product intent into verifiable gates. The Product Owner (PO) is the designated owner responsible for defining and signing off on all AI-native product management artifacts [ai_native_product_management_disciplines.owner_role[0]][14].

## 9) Organizational Transition

Staffing and costs shift from typing to verifying. A hybrid model (30–50% agent merges) needs AO/SRE/QA uplift and strong automation to cap verification costs.

### FTE and Impact

| Function | FTE (Hybrid) | Responsibility Uplift | Cost/Impact |
| :--- | :--- | :--- | :--- |
| Product Engineers | 10 | Orchestration/verification | Throughput +30–80% |
| Agent Ops | 2–3 | Prompts, evals, drift, kill-switch | Prevent drift/cost spikes |
| SRE/Platform | 1.5–2 | Observability, DORA, cost ops | Tooling 25–60% costs |
| QA/Verification | 1.5 | Automation, Promptfoo | Reduce overhead 10–30% |

Deploying three-person teams (micro teams) can improve efficiency, accelerate product delivery and boost overall team morale [organizational_transition_framework.required_fte_breakdown[0]][1].

## 10) Technology & Vendor Strategy

Portability by design avoids future taxes. Contracts, abstraction, and rehearsed switchbacks make model changes routine. The assessment checklist verifies the presence of clauses ensuring data and prompt portability, the right to reproduce evaluations, API neutrality, and clear exit/transfer assistance terms [technology_and_vendor_strategy.vendor_lock_in_assessment_checklist[0]][6].

## 11) Regulatory Compliance & Auditing

Prove control with logs, labels, and drills. The EU AI Act and MENA regulations require disclosures, documentation, localization, and repeatable evidence.

### Region-to-Requirement

| Region/Rule | Requirement | Evidence/Artifact | Cadence/Owner |
| :--- | :--- | :--- | :--- |
| EU AI Act Art. 50 | AI user disclosures | In-app notices/screenshots | Release gates / Product Lead |
| EU AI Act Art. 53 (GPAI) | Tech docs, training data summaries | System description, data summaries | Quarterly audits / Compliance |
| MENA (PDPL, UAE/KSA sandbox) | Data localization, Arabic disclosures | Data residency configs, localized notices | Per deployment / Legal + Platform |

Article 50 of the AI Act sets out transparency obligations for providers and deployers of certain AI systems [regulatory_compliance_and_auditing_framework.eu_ai_act_specifics[0]][15].

## 12) Executive & Board Communications

Translate engineering truth into business decisions. Pair DORA with escape-rate, cost/MAU, and decision velocity. The Metrics API enables you to retrieve customized analytics from your Langfuse data to build these dashboards [executive_and_board_communication_framework.key_metrics_for_reporting[0]][16].

## 13) Sprint 0 Onboarding

Make new builders safe and productive in week one. Sandbox first, governance literacy second, CI familiarity third. A good `AGENTS.md` answers only one question: “If I were a new engineer with no context, how would I safely make a small change?” [sprint_zero_onboarding_protocol.checklist_category[0]][17].

## References

1. *Enhancing Agility And Throughput In The AI Era With Micro Teams*. https://www.forbes.com/councils/forbestechcouncil/2025/05/15/enhancing-agility-and-throughput-in-the-ai-era-with-micro-teams/
2. *Building AI-Native Engineering Teams: From Coding to Verification*. https://larridin.com/blog/building-ai-native-engineering-teams-from-coding-to-verification
3. *AGENTS.md*. https://agents.md/
4. *KILLSWITCH.md — The AI Agent Emergency Stop Standard*. https://killswitch.md/
5. *Langfuse integration | Promptfoo*. https://www.promptfoo.dev/docs/integrations/langfuse/
6. *CI/CD Integration for LLM Eval and Security*. https://www.promptfoo.dev/docs/integrations/ci-cd/
7. *Golden Datasets: The Essential First Step for AI-Powered Apps | Diana Pfeil*. http://dianapfeil.com/ai/2026/01/20/golden-datasets.html
8. *GitHub - hesreallyhim/awesome-claude-code: A curated list of awesome skills, hooks, slash-commands, agent orchestrators, applications, and plugins for Claude Code by Anthropic · GitHub*. https://github.com/hesreallyhim/awesome-claude-code
9. *AI Agent Guardrails: Kill Switches, Escalation Paths, and Recovery | Codebridge*. https://www.codebridge.tech/articles/ai-agent-guardrails-for-production-kill-switches-escalation-paths-and-safe-recovery
10. *Agents.md best practices · GitHub*. https://gist.github.com/0xfauzi/7c8f65572930a21efa62623557d83f6e
11. *How to write a great agents.md: Lessons from over 2,500 repositories - The GitHub Blog*. https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/
12. *Using artifact attestations to establish provenance for builds*. https://docs.github.com/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds
13. *AI Agent Observability, Tracing & Evaluation with Langfuse*. https://langfuse.com/blog/2024-07-ai-agent-observability-with-langfuse
14. *Version Control - Langfuse*. https://langfuse.com/docs/prompt-management/features/prompt-version-control
15. *Guidelines and Code of Practice on transparent AI systems | Shaping Europe’s digital future*. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-and-code-practice-transparent-ai-systems
16. *Metrics API*. https://langfuse.com/docs/metrics/features/metrics-api
17. *Agent‑Ready Repo Structure (2026) | by Huseyin Kaplan | Medium*. https://medium.com/@huseyinkaplandev/agent-ready-repo-structure-2026-90af2ac8aed2