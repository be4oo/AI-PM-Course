# Live Model Registry

Last verified: 2026-04-11

| Task | Primary model | Fallback model | Why | Verification cadence |
|---|---|---|---|---|
| Intent classification | Compact tier | Compact fallback | Lowest latency and cost | Biweekly |
| Retrieval QA synthesis | Standard tier | Standard fallback | Better factual balance | Biweekly |
| Complex planning | Frontier tier | Standard safe mode | Higher reasoning depth | Monthly |

## Update protocol
1. Verify pricing + model behavior changes.
2. Run regression suite.
3. Update this table and changelog note.
