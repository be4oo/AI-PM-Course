# Agent Architecture

## Topology
- Supervisor agent routes tasks.
- Specialist agents: retrieval, policy-check, response-drafting.
- Human checkpoint for high-risk actions.

## Shared state
- Conversation context
- Retrieved evidence bundle
- Risk level and escalation flags

## Loop prevention
- Max step count per run
- Duplicate-tool-call guard
- Timeout + safe fallback

## Observability
- Trace each step with inputs/outputs
- Log final decision and confidence
- Record escalation reasons
