# AI-PM Course — Google PM Enrichment Plan

> **Purpose**: Audit of Google Project Management certificate notes (4 courses: Foundations, Initiation, Planning, Agile). Identifies high-value frameworks to integrate into the existing AI PM Course curriculum — filtering out outdated, generic, or already-covered material.
>
> **Source files analysed**:
> - `google-pm-Foundations_of_Project_Management.txt`
> - `google-pm-Project_Initiation__Starting_a_Successful_Project.txt`
> - `google-pm-Project_Planning__Putting_It_All_Together.txt`
> - `google-pm-Agile_Project_Management.txt`

---

## Executive Summary

The AI PM Course is already highly specialized and technically deep. It excels at LLM/agent architecture, context engineering, evals, and AI trust design. The Google PM material fills **4 structural gaps** that can meaningfully upgrade the course's practical utility:

| Gap | Google Concept | Target Module |
|---|---|---|
| Formal project scoping | Triple Constraint + Scope Creep controls | M1 / M4 |
| Stakeholder alignment | RACI charts + Power Grid + OKRs | M4 Discovery |
| Budget & risk management | Cost-Benefit Analysis, Risk matrix, Buffers | M1 / M6 |
| Agile-to-AI bridge | Scrum artifacts adapted for AI sprints | M6 Build Loop |

**Excluded (reasons below)**: Administrative PM career content, Waterfall-only workflows, paper-based documentation practices, generic scheduling software comparisons (Asana vs Sheets), and anything superseded by the existing AI-native curriculum.

---

## Section 1 — High-Priority Additions (Must Add)

### 🔴 1.1 — The Triple Constraint Model → Integrate into Module 1 (Lesson 1.4)

**Source**: Google PM Planning — Week 2 & Initiation — Week 2

**Why it matters for AI PMs**:  
The Triple Constraint (Scope / Time / Cost) is the most commonly misunderstood concept when AI features enter a roadmap. Executives often ask for more AI features without realizing they're implicitly requesting more cost (tokens + compute + annotation) or more time (eval iterations). AI projects have a "fourth dimension" the classic model ignores — **Quality / Eval pass rate** — making it even more urgent to teach.

**What to add** (as a new section inside Lesson 1.4 "AI ROI, Unit Economics & Investment Memo"):

```
**The Triple Constraint for AI Projects**:

Classic PM: any change to Scope, Time, or Cost impacts the other two.
AI PM extension: there is a fourth constraint — Eval Quality Pass Rate.

A "faster delivery" (reduced Time) almost always means:
- Fewer eval iterations → lower quality
- Skipped context engineering → more hallucinations
- Compressed golden dataset → untested edge cases

Make trade-offs explicit before committing to stakeholders:

| If you change...    | Then expect...                                |
|---|---|
| Reduce time         | Quality drops or scope shrinks               |
| Add scope (features)| Cost rises (more tokens, more evals)         |
| Cut cost (cheaper model) | Quality or latency degrades           |
| Raise quality bar   | Time and cost both increase                  |

**Always document the trade-off decision in your AI PRD**, not just the target.
```

**Action**: Add a `Triple Constraint for AI` callout box inside Lesson 1.4, before the "When to Kill" section.

---

### 🔴 1.2 — RACI Charts for AI Teams → Add to Module 4 (Discovery)

**Source**: Google PM Initiation — Week 3

**Why it matters for AI PMs**:  
Most AI feature failures involve unclear ownership — who approves the golden dataset? Who signs off on a model upgrade? Who owns hallucination incidents? RACI directly resolves this. It's absent from the current curriculum but critical for any AI PM working in a cross-functional org.

**What to add** (as a new Apply exercise inside Module 4 "Discovery & Pain Quantification"):

```
**RACI for AI Feature Teams** — Responsible, Accountable, Consulted, Informed

Every AI feature should have a RACI for these decisions:

| Decision               | R (Does it)    | A (Owns it)   | C (Input)       | I (Informed)  |
|---|---|---|---|---|
| Golden dataset curation | ML Eng        | AI PM         | Domain Expert   | Stakeholder   |
| Model selection         | AI PM         | CTO / Lead    | ML Eng          | Product       |
| HITL level (L0–L4)      | AI PM         | Product Lead  | Legal, Ops      | All           |
| Guardrail design        | AI PM + Eng   | AI PM         | Legal, Security | VP            |
| Hallucination incident  | On-call Eng   | AI PM         | ML Lead         | Exec team     |
| Eval threshold (pass/fail)| AI PM       | AI PM         | Data Scientist  | Stakeholders  |

**Rules**:
- Exactly ONE accountable per row (ambiguity = ship failures)
- Consulted ≠ Informed — consulted people must be heard; informed just need updates
- Revisit RACI every sprint boundary as AI team roles shift

Push to: `/docs/discovery/ai-team-raci.md`
```

**Action**: Add as a second Apply exercise in Module 4, Lesson 4.1, after the current service blueprint exercise.

---

### 🔴 1.3 — OKRs for AI Projects → Enhance Module 4 & Module 9

**Source**: Google PM Initiation — Week 2

**Why it matters for AI PMs**:  
OKRs are already referenced in the course as "business outcomes" framing. But the Google material has specific mechanics — how to write *measurable* AI Key Results, how to track them, and how to run monthly OKR reviews — that would make the course materially more complete.

**What to add** (a structured OKR template for AI features):

```
**OKR Template for AI Features**:

Objective: [Aspirational, qualitative direction]
Key Result 1: [Specific metric + target + deadline]
Key Result 2: [Specific metric + target + deadline]
Key Result 3: [Specific metric + target + deadline]

**AI-specific OKR examples**:

Objective: Ship a reliable AI email parser for operations team.
- KR1: Eval pass rate ≥ 87% on 50-case Arabic golden dataset by Week 4.
- KR2: User correction rate < 12% by end of Month 2.
- KR3: P95 response latency < 4s in production by launch.

Objective: Reduce customer support cost via AI deflection.
- KR1: AI correctly handles ≥ 60% of Tier-1 tickets without escalation.
- KR2: Net CSAT for AI-deflected tickets ≥ 4.0/5.0.
- KR3: Cost per AI interaction < $0.04 (vs $1.20 human equivalent).

**Scoring** (use Google's 0.0–1.0 scale):
- 0.7 = met expectations (not failing, but not exceeding)
- 1.0 = set too easy
- 0.0 = set too hard or execution failed

**Avoid**: KRs written as tasks ("Build eval pipeline") — KRs measure outcomes, not actions.
```

**Action**: Integrate as a supplement to the "Communicating AI to Executives" section in Lesson 9.1, with a link back to Lesson 1.4's business case.

---

### 🔴 1.4 — Stakeholder Power Grid → Add to Module 4 Discovery

**Source**: Google PM Initiation — Week 3

**Why it matters for AI PMs**:  
AI features generate disproportionate organizational anxiety. Understanding who has high influence vs. high interest — and managing them differently — directly prevents blocked launches, veto-style escalations, and missed sign-offs. The Power Grid is missing from the current curriculum entirely.

**What to add** (a practical AI stakeholder mapping exercise):

```
**Stakeholder Power Grid for AI Features**

Map every stakeholder on two axes:
- Influence: Can they block, change, or kill this AI feature?
- Interest: How much does this AI output affect their work?

High Influence + High Interest (Manage closely):
  → Model lead, product head, key customer, legal/compliance
  → Weekly 1:1, show eval results, address risks proactively

High Influence + Low Interest (Keep satisfied):
  → CTO, CFO, VP-level approvers
  → Monthly exec summary: ROI + risk + metric snapshot only

Low Influence + High Interest (Keep informed):
  → Team members using the AI tool, CSMs
  → Weekly async update, solicit workflow feedback

Low Influence + Low Interest (Monitor):
  → External vendors, adjacent teams
  → Minimal comms, pull them in only for specific inputs

**AI-specific signals that a stakeholder is moving quadrants**:
- "Can you share your eval methodology?" → moving to High Influence
- "My team will be replacing/augmenting this" → stakes just rose
- Regulatory team asking questions → treat as High Influence immediately

Push to: `/docs/discovery/stakeholder-power-grid.md`
```

**Action**: Add as a new sub-section in Module 4, Lesson 4.1, alongside the 6-question discovery interview.

---

## Section 2 — Medium-Priority Additions (Should Add)

### 🟡 2.1 — Scope Creep Controls → Module 4 / Module 7

**Source**: Google PM Initiation — Week 2 & Planning — Week 1

**Why it matters for AI PMs**:  
Scope creep in AI projects is uniquely dangerous because each unscoped addition has compounding cost: new training cases, re-evaluation, model re-assessment, and potential context window restructuring. The course mentions "kill criteria" but lacks a formal scope control process.

**What to add** (practical scope creep prevention checklist):

```
**AI Feature Scope Creep — Signs and Controls**

**Early warning signs in AI projects**:
- "Can we also make it work in French?" (language scope creep)
- "What if we also added citations?" (output scope creep)
- "Let's include the PDF uploads too" (input scope creep)
- "Can it remember previous conversations?" (memory scope creep)
Each unscoped addition = new golden dataset cases + re-eval + latency risk.

**Controls**:
1. Document the in-scope and out-of-scope boundaries in the AI PRD before Sprint 0.
2. Use a formal change request: requester must quantify impact on eval suite,
   token cost, and timeline before you approve.
3. Add any new scope to your Pain Score filter — if Pain Score < 100, reject it.
4. Treat model upgrades triggered by scope changes as scope changes themselves.

**Triple Constraint impact table** (fill per request):
| Scope Change    | Time delta | Cost delta | Quality delta | Decision |
|---|---|---|---|---|
| Add French support | +2 weeks | +$X/mo tokens | -5% eval needed | Y/N |
```

**Action**: Add as a callout inside Lesson 7.1 ("Guardrails, Observability & SLOs"), under a new heading "Scope Integrity in Production".

---

### 🟡 2.2 — Kickoff Meeting Structure → Module 6 (Build Loop)

**Source**: Google PM Planning — Week 1

**Why it matters for AI PMs**:  
Sprint 0 for AI features often fails because the kickoff is not structured: assumptions are not captured, eval criteria are not agreed upon, and HITL levels are not decided before work starts. Google's kickoff structure maps almost 1:1 to a Sprint 0 kickoff for AI.

**What to add** (AI Sprint 0 Kickoff Template, as an artifact in Lesson 6.1):

```
**AI Sprint 0 Kickoff Agenda** (60–90 minutes)

[10 min] — Problem framing
  - Pain score review
  - Is this AI-shaped? (Confirm decision together)

[10 min] — Scope boundaries
  - What's in scope for v0.1?
  - What's explicitly out of scope?

[10 min] — Team roles (review RACI)
  - Who owns golden dataset curation?
  - Who owns model selection?
  - Who owns HITL level decision?

[10 min] — Eval criteria (MUST be decided before build)
  - What task are we measuring?
  - What is the minimum quality bar to ship? (e.g., ≥ 85% eval pass rate)
  - How many test cases in v0 golden dataset? (minimum 20)

[10 min] — Context strategy
  - Grounding pattern: long context / RAG / memory?
  - Context budget allocation

[10 min] — HITL level
  - Starting level and 6-week progression plan

[10 min] — Q&A + next steps
  - Send follow-up within 24h with recorded decisions

Push to: `/projects/sprint-0-kickoff-[feature].md`
```

**Action**: Add as a second Apply exercise in Module 6, Lesson 6.1.

---

### 🟡 2.3 — Critical Path for AI Sprints → Module 6

**Source**: Google PM Planning — Week 2

**Why it matters for AI PMs**:  
The critical path concept applies directly to AI build sequences. The eval pipeline cannot be built until the golden dataset exists. The RAG index cannot be tested until chunking is complete. Identifying the critical path prevents teams from starting work in the wrong order.

**What to add**:

```
**Critical Path for AI Features**

The critical path is the sequence of tasks that directly constrains your launch date.
Any delay in a critical path item = launch delays.

**Typical AI feature critical path**:

[Day 1]   Problem validated + scope defined
    ↓
[Day 2-3] Golden dataset curation begins (50 cases, min)
    ↓
[Day 3-5] Context strategy documented + grounding pattern decided
    ↓
[Day 5-7] First prototype built (n8n + Claude or equivalent)
    ↓
[Day 7-9] First eval run against golden dataset
    ↓ (loop back if eval < threshold)
[Day 10-14] Guardrails implemented + observability live
    ↓
[Day 14]  Production readiness review (SLOs, cost, latency)
    ↓
[Launch]

**Non-critical path (run in parallel)**:
- UI design (doesn't block eval)
- Marketing/positioning copy
- Internal documentation

**Float** = time a non-critical task can slip without delaying launch.
Protect float — it's your buffer for eval iteration cycles.
```

**Action**: Add as a new callout inside Module 6, Lesson 6.1, after the build loop diagram.

---

### 🟡 2.4 — Risk Management Plan Structure → Module 7

**Source**: Google PM Planning — Week 4

**Why it matters for AI PMs**:  
Module 7 covers guardrails and SLOs but does not formalize a risk register or mitigation planning. The Google PM risk framework (Identify → Analyze → Prioritize → Treat → Monitor) maps cleanly to AI production risks.

**What to add** (AI Risk Register Template):

```
**AI Production Risk Register**

Maintain as a living document. Update at every sprint review.

| Risk              | Likelihood | Impact | Inherent Rating | Mitigation Plan               | Owner   |
|---|---|---|---|---|---|
| Model provider outage | Medium | High   | HIGH | Fallback model configured + tested | AI PM |
| Hallucination spike after model update | High | High | HIGH | Regression suite auto-runs on deploy | ML Eng |
| Token cost 3x on traffic surge | Medium | Medium | MED | Hard daily budget cap + 80% alert | Eng |
| Golden dataset drift | Medium | High | HIGH | Monthly human calibration review | AI PM |
| GDPR violation on new data source | Low | High | MED | Legal review gating new data sources | Legal |

**Risk treatment strategies**:
- Avoid: Eliminate (e.g., never store PII in context)
- Minimize: Reduce likelihood (e.g., semantic caching)
- Transfer: Shift responsibility (e.g., zero-retention API)
- Accept: Document and monitor (e.g., latency variance in peak hours)

**Review cadence**:
- Weekly: Top 3 HIGH risks reviewed at sprint review
- Monthly: Full register review with stakeholders
- Post-incident: Add new risk item immediately

Push to: `/docs/deploy/ai-risk-register.md`
```

**Action**: Add to Module 7, Lesson 7.1, after the current "Incident Review" section.

---

### 🟡 2.5 — Scrum Adapted for AI Teams → Enhance Module 6

**Source**: Google PM Agile — Module 2 (Implementing Scrum)

**What to add** (a translation layer: Scrum roles → AI team reality):

```
**Scrum for AI Teams — Role Translation**

Product Owner (AI PM):
  - Owns the Product Backlog of AI features and improvements
  - Prioritizes by Pain Score × strategic value
  - Makes the call on HITL level, eval threshold, and kill criteria
  - Writes the AI PRD — the "definition of done" for the AI team

Scrum Master (AI PM or ML Lead):
  - Runs Sprint 0: ensures eval criteria exist before build starts
  - Removes blockers: annotation bottlenecks, data access, compute limits
  - Enforces "definition of done" = eval pass rate ≥ threshold

Development Team (Eng + ML + Domain Expert):
  - Owns context engineering implementation
  - Builds and maintains the eval pipeline
  - Responsible for guardrail implementation

**AI-specific Scrum artifacts**:
| Scrum Artifact     | AI Equivalent                                            |
|---|---|
| Product Backlog    | Prioritized AI feature backlog (scored by Pain × ROI)   |
| Sprint Backlog     | Eval iterations + context improvements for current sprint|
| Increment          | Deployed AI feature with eval scores documented          |
| Definition of Done | Eval ≥ threshold + latency ≤ target + guardrails passing |
| Sprint Review      | Eval results demo + user correction rate review          |
| Retrospective      | What degraded this sprint? What context change improved? |
```

**Action**: Add as a supplementary frame at the end of Module 6, Lesson 6.1. Link to Sprint Management in Lesson 2.3.

---

## Section 3 — Low-Priority / Optional Enhancements

### 🟢 3.1 — AI Project Charter Template

**Source**: Google PM Initiation — Week 4

A 1-page AI project charter as the intake document *before* writing a full AI PRD.

**Fields**: Problem statement · Success criteria · Scope (in/out) · Stakeholders + roles · Budget estimate · Kill criteria · Sponsor sign-off.

**Placement**: `TemplateDownloadsView` as a new downloadable template.

---

### 🟢 3.2 — Communication Plan for AI Launches

**Source**: Google PM Planning — Week 5

Add a lightweight comms cadence template inside Module 9, Lesson 9.1:
- Internal stakeholder updates (eval results, cost metrics) — weekly
- Beta user communication cadence — bi-weekly
- Exec reporting format — monthly 1-pager (ROI + risk + quality)
- Incident communication protocol — immediate + 24h post-mortem

---

### 🟢 3.3 — Contingency vs. Management Reserves

**Source**: Google PM Planning — Week 3

One-paragraph addition to Lesson 1.4:
- **Contingency reserve**: for known AI risks (hallucination incidents, eval failures)
- **Management reserve**: 5–10% compute budget buffer for unknown drift and provider changes

---

## Section 4 — Explicitly Excluded (and Why)

| Google PM Topic | Reason Excluded |
|---|---|
| Waterfall project lifecycle phases | Superseded by AI-native iterative build loop (Module 6) |
| Paper-based Gantt charts | Tracked via n8n / Langfuse / Promptfoo — not applicable |
| Generic PM career paths | Not relevant to the course's practical focus |
| Six Sigma / Lean manufacturing | Better covered in dedicated ops courses |
| Excel budgeting templates | Outpaced by AI ROI model + token cost calculators |
| "Introducing tools to a team" change mgmt | Covered by AI adoption phases (shadow → suggest → autonomous) |
| Asana vs. Sheets comparison | Tool selection is not a course learning objective |
| Agile Spotify model | Organizational design, out of scope |
| XP Pair Programming | Engineering practice, not AI PM practice |

---

## Section 5 — Implementation Order

| Priority | Addition | Target Location | Estimated effort |
|---|---|---|---|
| 1 | Triple Constraint for AI | Lesson 1.4 | 1 content block |
| 2 | AI Feature RACI chart | Lesson 4.1 (new Apply) | 1 Apply exercise |
| 3 | OKR Template for AI | Lesson 9.1 supplement | 1 content block |
| 4 | Stakeholder Power Grid | Lesson 4.1 sub-section | 1 content block |
| 5 | Scope Creep Controls | Lesson 7.1 callout | 1 callout block |
| 6 | AI Sprint 0 Kickoff Template | Lesson 6.1 Apply | 1 Apply exercise |
| 7 | Critical Path for AI sprints | Lesson 6.1 callout | 1 callout |
| 8 | AI Risk Register | Lesson 7.1 section | 1 template block |
| 9 | Scrum → AI translation | Lesson 6.1 supplement | 1 supplement frame |
| 10 | AI Project Charter template | TemplateDownloadsView | 1 template file |

---

## Appendix: Mapping Matrix

| Google PM Framework | Mapped To | Integration Type |
|---|---|---|
| Triple Constraint (Scope/Time/Cost) | M1 Lesson 1.4 | Content addition |
| Cost-Benefit Analysis / ROI | M1 Lesson 1.4 (already present) | Enhancement only |
| SMART Goals | M4 / M9 | OKR template |
| OKRs | M4 + M9 | New template |
| Stakeholder Analysis | M4 Lesson 4.1 | New section |
| RACI Chart | M4 Lesson 4.1 | New Apply exercise |
| Power Grid | M4 Lesson 4.1 | New sub-section |
| Scope Creep Controls | M7 Lesson 7.1 | New callout |
| Project Charter | Templates view | New template |
| Kickoff Meeting structure | M6 Lesson 6.1 | New Apply exercise |
| Milestones & WBS | M6 (already: build loop) | No addition needed |
| Critical Path | M6 Lesson 6.1 | New callout |
| Risk Register | M7 Lesson 7.1 | New template block |
| Communication Plan | M9 Lesson 9.1 | New supplement |
| Scrum artifacts | M6 Lesson 6.1 | New supplement |
| Contingency / Management reserves | M1 Lesson 1.4 | One-paragraph addition |

---

*Last updated: 2026-04-11 | Status: Ready for implementation review*
