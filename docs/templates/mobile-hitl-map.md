# Mobile HITL Mapping Template

## Feature
- Name:
- Owner:
- Date:

## HITL Matrix

| Task | Risk Level | HITL Level | Approver | Preconditions | Rollback Plan |
|---|---|---|---|---|---|
| Example: Device pairing | Medium | L1 | PM + Mobile Lead | Device online, firmware compatible | Revert pairing state and reset token |
| Example: Firmware update | High | L0/L1 | Domain Expert | Battery > 40%, stable network, signed package | Restore previous firmware snapshot |

## Escalation Rules
- Any `High` risk action without preconditions met -> block execution.
- Repeated failure on the same device class -> pause rollout and open incident review.
- Any rollback failure -> escalate to incident commander immediately.

## Review Cadence
- Weekly: top high-risk flows
- Monthly: full matrix update
- Post-incident: update matrix within 24 hours
