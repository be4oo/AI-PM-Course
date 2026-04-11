# 5A Framework - Support Assistant

## A1 Assess
- Problem: 38% of tickets are repetitive status/refund-policy questions.
- Why AI-shaped: Unstructured text, variable intent, high frequency.
- Cost of being wrong: Bad policy answer can trigger refunds and trust loss.

## A2 Architect
- Model routing: Compact for classification, standard for answer generation.
- Context strategy: Retrieval + policy snippets + recent order facts.
- HITL boundary: Escalate refunds/compensation decisions to humans.

## A3 Acquire
- Data needed: Historical tickets, policy docs, FAQ, order-status API.
- Tools needed: Promptfoo, Langfuse, vector store, routing service.
- Skills needed: Prompt/guardrail design, eval design, retrieval tuning.

## A4 Assemble
- MVP scope: Status lookup + FAQ + policy explanation with citations.
- Guardrails: Prompt-injection checks, policy-only responses, confidence threshold.
- Eval setup: Golden set (200 tickets), rubric + human review sample.

## A5 Assess (ongoing)
- Weekly metrics: correction rate, escalation rate, p95 latency, cost/ticket.
- Regression cadence: every release + weekly red-team run.
- Refresh cadence: model/tool baseline reviewed monthly.
