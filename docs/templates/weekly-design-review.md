# Weekly Design Review Template (AI PM Course)

## 1) Session Metadata
- Week:
- Module:
- Product/Feature:
- Team:
- Date (YYYY-MM-DD):
- Review Lead:
- Attendees:

## 2) Problem and Outcome
- User problem statement (1-2 lines):
- AI-shaped reason (why AI, not rules-only):
- Success metric(s) this week:
- Failure metric(s) this week:

## 3) Scope Snapshot
- In scope:
- Out of scope:
- Key assumptions:
- Decision to validate this week:

## 4) Experience and Trust Design
- Primary flow:
- Human-in-the-loop checkpoint:
- Uncertainty handling in UI:
- Fallback path when model fails:
- Editability and user override:

## 5) System Design (Current)
- Model(s) used:
- Grounding pattern (long context, retrieval, memory):
- Tool calls and side effects:
- Guardrails (input/output/tool/human):
- Logging and observability plan:

## 6) Evidence Reviewed
- Demo link:
- PRD/Decision memo link:
- Eval report link:
- Trace/log dashboard link:
- User feedback/interview notes link:

## 7) Design Review Checklist
- [ ] Problem is specific and user-backed.
- [ ] Success and failure metrics are measurable.
- [ ] AI behavior boundary is clear (auto vs supervised).
- [ ] Trust UX handles non-deterministic output.
- [ ] Side-effecting actions require explicit confirmation.
- [ ] Prompt/context strategy is documented.
- [ ] At least one negative/failure path is designed.
- [ ] Localization/accessibility impact is considered.

## 8) Pass/Fail Gates
- Gate A: Problem and metric quality
- Pass criteria: clear user pain, measurable KPI, kill criteria defined.
- Result: Pass / Fail
- Evidence:

- Gate B: Trust and UX safety
- Pass criteria: uncertainty, fallback, and override are implemented or explicitly scheduled.
- Result: Pass / Fail
- Evidence:

- Gate C: Technical readiness
- Pass criteria: grounding/tool/guardrail strategy documented and testable.
- Result: Pass / Fail
- Evidence:

## 9) Decisions and Actions
- Decision 1:
- Why:
- Owner:
- Due date:

- Decision 2:
- Why:
- Owner:
- Due date:

## 10) Exit Decision
- Final status: Pass / Conditional Pass / Fail
- If Conditional Pass or Fail, blockers:
- Required fixes before next weekly review:

