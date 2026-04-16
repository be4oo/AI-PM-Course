# AI FinOps Playbook

## Attribution baseline
- Required tags: user, feature, tenant, model_tier
- Ownership:

## Budget controls
- Per-request cap:
- Per-session cap:
- Per-tenant cap:
- Daily global cap:

## Alerting thresholds
- Cost spike threshold:
- Token spike threshold:
- Runaway loop threshold:
- Escalation channel:

## Runaway-agent incident runbook
1. Detect anomaly signal.
2. Throttle or pause affected scope.
3. Capture request/session state.
4. Escalate owner and comms.
5. Patch control and verify with regression.

## Dashboard requirements
- Per-feature trend
- Per-tenant trend
- Alert history
- Mitigation log

