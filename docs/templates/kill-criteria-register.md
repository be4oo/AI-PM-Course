# Kill Criteria Register

## Feature Metadata
- **Feature**: AI Support Assistant — ecommerce order handling via social media chats
- **Owner**: Beshoy Ageeb (PM)
- **Review start date**: 2026-05-02
- **Review cadence**: Weekly for first 90 days, monthly thereafter
- **Decision board**: PM + Operations Lead + Engineering Lead

---

## Kill Criteria Table

| # | Dimension | Threshold | Measurement Source | Owner | Review Cadence | Sunset Action |
|---|---|---|---|---|---|---|
| 1 | **Quality — Hallucination rate** | > 8% wrong or fabricated answers after the first hardening sprint | Manual spot-check of 50 random responses/week + customer complaint log | PM | Weekly | Roll back to fully human-handled chat; run prompt audit before any relaunch |
| 2 | **Economics — Net monthly value** | Negative for 2 consecutive months (AI cost > measurable labor savings) | Finance: AI runtime invoice vs. agent hours freed × $200/agent/month | Operations Lead | Monthly | Pause AI tier; revert to 7-agent manual flow; reassess tooling cost |
| 3 | **Adoption — Agent override rate** | Agents manually override or discard AI suggestions > 40% of the time for 4 consecutive weeks | Chat platform logs: AI suggestions accepted vs. overridden per agent | Engineering Lead | Weekly | Trigger prompt redesign sprint; if still > 40% after sprint, suspend AI assist mode |
| 4 | **Trust — Customer escalation rate** | Escalations citing wrong AI information > 5% of total monthly chat volume | Support ticket tags: "wrong info" or "AI error" filter | Operations Lead | Weekly | Immediately enable human-review gate on all AI responses; notify affected customers within 24 h |
| 5 | **Risk — Regulatory / privacy incident** | Any confirmed case of AI exposing a customer's order data to a different customer | Incident log; GDPR/data breach protocol | PM + Legal | Triggered (not scheduled) | Immediate full suspension; data breach protocol activated; no relaunch without security audit sign-off |
| 6 | **Performance — Response latency** | AI-assisted response time exceeds human baseline (> 3 min avg) for 2 consecutive weeks | Chat platform: time-to-first-response per conversation, AI vs. human | Engineering Lead | Weekly | Investigate model latency or context size; if unresolved in one sprint, disable AI for peak hours |

---

## Trigger Handling Rules

1. **Confirmation window**: A single bad week does not trigger kill. Two consecutive measurement periods at or beyond threshold = confirmed trigger — except for dimension 5 (privacy incident), which triggers immediately on first confirmed case.
2. **Escalation path**: Engineering Lead flags threshold breach → PM convenes decision board within 48 hours → decision recorded in this file with date and rationale.
3. **Launch hold conditions**: Any open trigger on dimensions 1, 4, or 5 blocks expansion to new channels or markets until resolved.
4. **Stakeholder notification SLA**: Operations team notified within 24 hours of a confirmed trigger. Customer communication within 48 hours if the trigger affects response quality visible to customers.

---

## Sunset Execution Checklist

- [ ] Customer impact scope reviewed and documented
- [ ] Agents notified and retrained on manual fallback flow
- [ ] AI suggestion UI disabled or hidden in chat platform
- [ ] Data retention and deletion plan approved by Legal
- [ ] Fallback workflow tested and confirmed operational
- [ ] Support runbook updated to remove AI-specific steps
- [ ] Post-sunset retrospective scheduled within 2 weeks
- [ ] Lessons captured in `docs/discovery/ai-business-case.md` and 5A framework

