# AGENTS.md Example: Enterprise Guardrailed (Annotated)

## Purpose
Large org enforcing reliability, compliance, and auditability before speed.
Annotation: protects against fragmented governance across business units.

## Environment Segmentation
- Strict separation of dev, staging, and production boundaries.
- Production actions require approval and ticket references.
Annotation: limits blast radius and enforces accountability.

## Security and Data Rules
- No secret handling in prompts or committed files.
- High-risk data paths require explicit reviewer sign-off.
Annotation: protects against accidental data leakage.

## Release Controls
- Required checklists for quality, risk, and rollback readiness.
- Failed controls block release regardless of schedule pressure.
Annotation: avoids policy exception drift during delivery crunches.

## Emergency Controls
- Named on-call approvers and rollback owner always defined.
- Kill-switch drills are required and logged quarterly.
Annotation: ensures operational readiness is tested, not assumed.
