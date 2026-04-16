# AGENTS.md Example: Startup (Annotated)

## Purpose
Small team optimizing for speed with explicit safety rails.
Annotation: protects against "fast but undefined" execution that creates hidden production risk.

## Tool Boundaries
- Allow code edits in product modules.
- Require explicit approval for infra/config or deployment edits.
Annotation: prevents accidental cross-boundary changes when one person carries many responsibilities.

## Validation Contract
- Run targeted tests for changed surfaces.
- Run lint/build before merge.
Annotation: protects against "works locally" merges that skip quality gates.

## Escalation Rules
- Pause and escalate on ambiguous acceptance criteria.
- Pause on any change involving customer data handling.
Annotation: limits unpriced risk from speed-first execution.

## Kill-Switch
- Stop autonomous actions after two consecutive critical failures.
- Hand control to human reviewer and preserve trace logs.
Annotation: ensures graceful degradation, not silent failure loops.
