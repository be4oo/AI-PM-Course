# Kill Criteria Register

## Feature Metadata
- **Feature**: Screen monitoring → pattern recognition → automation generation
- **Owner**: Beshoy Ageeb (PM)
- **Review start date**: 2026-05-02
- **Review cadence**: Weekly for first 90 days, monthly thereafter
- **Decision board**: PM + Engineering Lead + one pilot-cohort worker representative

---

## Kill Criteria Table

| # | Dimension | Threshold | Measurement Source | Owner | Review Cadence | Sunset Action |
|---|---|---|---|---|---|---|
| 1 | **Quality — Automation accuracy** | Steps generated correctly / total steps < 85% after the first hardening sprint | Manual review of 20 generated automations/week by PM + engineer | PM | Weekly | Halt new automation generation; run prompt and model audit; no relaunch until accuracy > 85% on eval set |
| 2 | **Economics — Net monthly value** | AI runtime cost exceeds measurable labor hours recovered for 2 consecutive months | Finance: $600 runtime invoice vs. hours automated × $8/hour worker cost | PM | Monthly | Pause AI tier for pilot cohort; reassess model choice and tooling cost before re-engaging |
| 3 | **Adoption — Worker activation rate** | Fewer than 30% of pilot cohort have generated at least one accepted automation after 60 days | Product analytics: users with ≥ 1 approved automation / total pilot users | Engineering Lead | Bi-weekly | Trigger UX and onboarding redesign sprint; if still below 30% after sprint, suspend pilot and interview non-adopters |
| 4 | **Trust — Worker override rate** | Workers reject or manually rewrite AI-generated automations > 50% of the time for 4 consecutive weeks | Product logs: automations approved as-is vs. modified or discarded per user | Engineering Lead | Weekly | Treat as signal of prompt or model failure; trigger extraction prompt redesign; block rollout to additional workers until resolved |
| 5 | **Risk — Data privacy incident** | Any confirmed case of screen recording data accessed by an unauthorized party, or recordings stored outside the worker's local device without explicit consent | Incident log; data handling audit | PM + Legal | Triggered (not scheduled) | Immediate full suspension of all recording; notify affected workers within 24 hours; no relaunch without independent privacy audit sign-off |
| 6 | **Performance — Time-to-automation** | Average time from first recording to first deployable automation exceeds 30 minutes for > 50% of workers | Product analytics: session start timestamp to automation approval timestamp | Engineering Lead | Weekly | Investigate pipeline latency and UX friction; if unresolved in one sprint, simplify MVP scope to single-app workflows only |

---

## Trigger Handling Rules

1. **Confirmation window**: Two consecutive measurement periods at or beyond threshold = confirmed trigger — except dimension 5 (privacy incident), which triggers immediately on first confirmed case.
2. **Escalation path**: Engineering Lead flags threshold breach → PM convenes decision board within 48 hours → decision and rationale recorded in this file with date.
3. **Launch hold conditions**: Any open trigger on dimensions 1, 4, or 5 blocks expansion beyond the pilot cohort until resolved.
4. **Stakeholder notification SLA**: Pilot workers notified within 24 hours of a confirmed trigger. If dimension 5 is triggered, legal counsel notified simultaneously.

---

## Sunset Execution Checklist

- [ ] Pilot worker impact scope reviewed and documented
- [ ] All screen recordings deleted from processing pipeline per data handling policy
- [ ] Desktop recording agent uninstalled from pilot machines
- [ ] Data retention and deletion plan approved by Legal
- [ ] Workers briefed on manual fallback workflows
- [ ] Engineering runbook updated to remove automation pipeline steps
- [ ] Post-sunset retrospective scheduled within 2 weeks
- [ ] Lessons captured in `docs/discovery/ai-business-case.md` and 5A framework

