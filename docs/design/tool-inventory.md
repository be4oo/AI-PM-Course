# Tool Inventory

| Layer | Tool | Purpose | Status |
|---|---|---|---|
| LLM provider | OpenAI/Anthropic/Gemini | Generation and routing tiers | Active |
| Eval | Promptfoo | Offline regression and rubric checks | Active |
| Observability | Langfuse | Trace and quality monitoring | Active |
| Orchestration | LangGraph/CrewAI | Multi-step flows | Pilot |
| Workflow automation | GitHub Actions | Scheduled freshness checks | Active |

## Notes
- Keep one primary stack and one fallback per layer.
- Avoid introducing tools without explicit ownership.
