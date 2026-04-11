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
