# AI PRD - Support Assistant

## 1) Problem
- User: Ecommerce support agents and end customers.
- Pain: High volume repetitive tickets delay response and increase cost.
- Why AI-shaped: Unstructured language, variable intents, policy reasoning.

## 2) Success metrics
- Quality: >= 85% resolution-quality score on golden set.
- Trust: correction rate < 12%, unsafe output < 2%.
- Business: 25% reduction in average handling time.

## 3) System architecture
- Routing: compact model for intent, standard model for response.
- Context: retrieval from policy docs + order data + short memory.
- Tools: order status lookup, escalation logger, citation formatter.

## 4) Evaluation
- Dataset: 200 curated tickets (Arabic + English mix).
- Judge rubric: correctness, policy alignment, clarity, actionability.
- Human calibration: weekly sample review of 30 responses.

## 5) Safety
- Guardrails: prompt injection defense, policy-only answers, schema checks.
- HITL: refund and compensation flows require human approval.
- Rollback: disable autonomous actions if hallucination > 8%.

## 6) Launch
- Phase 1: shadow mode
- Phase 2: suggestion mode
- Phase 3: supervised autonomy
- Owner: AI PM + support lead
