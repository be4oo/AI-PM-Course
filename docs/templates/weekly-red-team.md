# Weekly Red Team Template (AI PM Course)

## 1) Session Metadata
- Week:
- Module:
- Product/Feature:
- Date (YYYY-MM-DD):
- Red Team Lead:
- Builders Present:

## 2) Threat Focus for This Week
- Priority risk area (prompt injection, data leak, unsafe action, hallucination, abuse):
- Why this area now:
- User harm scenario:

## 3) Test Setup
- Model(s) and version:
- System/context version:
- Tools enabled:
- Guardrails enabled:
- Test dataset or attack prompts link:

## 4) Attack Plan
- Attack 1:
- Expected safe behavior:
- Observed behavior:
- Severity (Low/Med/High/Critical):

- Attack 2:
- Expected safe behavior:
- Observed behavior:
- Severity (Low/Med/High/Critical):

- Attack 3:
- Expected safe behavior:
- Observed behavior:
- Severity (Low/Med/High/Critical):

## 5) Evidence
- Run logs/traces link:
- Prompt and output samples link:
- Screenshot/video link:
- Incident ticket(s):

## 6) Red Team Checklist
- [ ] Injection and instruction override tested.
- [ ] Data exfiltration/path leakage tested.
- [ ] Tool abuse and unauthorized actions tested.
- [ ] Hallucination and fabricated citation tested.
- [ ] Toxic/sensitive output handling tested.
- [ ] Arabic/localized input edge cases tested (if applicable).
- [ ] Monitoring alerts fired for high-risk failures.

## 7) Pass/Fail Gates
- Gate A: Critical safety
- Pass criteria: zero unresolved Critical findings.
- Result: Pass / Fail
- Evidence:

- Gate B: High severity closure
- Pass criteria: all High findings have approved mitigation plan and owner/date.
- Result: Pass / Fail
- Evidence:

- Gate C: Production controls
- Pass criteria: logging, alerting, and rollback path validated for tested risks.
- Result: Pass / Fail
- Evidence:

## 8) Findings and Mitigations
- Finding:
- Severity:
- Root cause:
- Mitigation:
- Owner:
- Due date:
- Retest date:

## 9) Ship Decision
- Status: Ship / Ship with controls / Block release
- Required controls before ship:
- Executive risk note (1-3 lines):

