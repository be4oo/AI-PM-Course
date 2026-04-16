# AGENTS.md Example: YC-Scale Team (Annotated)

## Purpose
Multiple product pods share one governance backbone while keeping pod-level speed.
Annotation: protects against policy drift between pods.

## Role Routing
- Product tasks route to pod implementers.
- Cross-cutting risks route to designated reviewers.
Annotation: prevents ownership ambiguity when velocity increases.

## Merge-Cap Policy
- Cap AI-authored merges per engineer per day.
- Raise cap only after stable weekly escape-rate trend.
Annotation: protects quality while scaling throughput.

## Evidence Requirements
- Every PR links to tests and one release-risk note.
- High-risk changes require trace/eval artifact links.
Annotation: avoids confidence-only approvals under time pressure.

## Incident Handling
- Severity map and owner roster are mandatory.
- Post-incident controls update required within 48 hours.
Annotation: turns incidents into durable governance improvements.
