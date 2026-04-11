# Tooling and Leadership Guide

Audit date: 2026-04-11

## Why Promptfoo and Langfuse are in this course

This course uses GitHub Pages as a static learning interface, but the professional AI PM workflow happens through local development and CI tools.

- `Promptfoo` is used for evaluation, regression checks, and red teaming.
- `Langfuse` is used for runtime observability, tracing, scoring, and post-launch review.

These tools are not injected into the static website runtime because GitHub Pages should not expose live API keys in browser code.

## Where they fit in the course

### Promptfoo
- `1.3` 5-A Framework
- `6.1` Build Loop
- `6.2` Multi-Layer Eval Systems
- `7.1` Guardrails, Observability & SLOs
- `10.1` Capstone

### Langfuse
- `1.3` 5-A Framework
- `6.1` Build Loop
- `7.1` Guardrails, Observability & SLOs
- `8.1` Agent Architecture
- `10.1` Capstone

## Similar tools leaders should know

- `Phoenix` for tracing, evaluation, and experiments
- `LangSmith` for observability and eval workflows
- `W&B Weave` for experiments, datasets, and tracing
- `Helicone` for provider gateway, routing, and cost tracking
- `Portkey` for gateway, guardrails, and governance

## Leadership positioning

This course is now broad enough for leaders operating:
- software products
- mobile apps
- ERP programs
- internal tools
- hardware-connected AI systems

It teaches the decisions leaders actually need:
- where AI belongs and where it does not
- how to govern quality and trust
- how to set launch gates
- how to reason about provider and architecture choices
- how to run an operating cadence around evals, risk, and observability

## Official sources used

- Promptfoo: https://www.promptfoo.dev/docs/intro/
- Langfuse observability: https://langfuse.com/docs/observability/overview
- Langfuse evaluation: https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge
- Phoenix docs: https://arize.com/docs/phoenix
- LangSmith docs: https://docs.smith.langchain.com/
- W&B Weave docs: https://docs.wandb.ai/weave
- Helicone gateway docs: https://docs.helicone.ai/gateway/overview
- Portkey AI gateway docs: https://portkey.ai/docs/product/ai-gateway
- Maven AI PM certification example: https://maven.com/theaiinternship/ai-pm-cert
