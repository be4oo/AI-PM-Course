# Langfuse Starter

## 1) Configure env

Copy:

`observability/langfuse/langfuse.env.example`

Set valid values for:
- `LANGFUSE_PUBLIC_KEY`
- `LANGFUSE_SECRET_KEY`
- `LANGFUSE_BASE_URL`

## 2) Run smoke test

```bash
source observability/langfuse/langfuse.env.example
npm run observability:langfuse:smoke
```

## 3) Use starter event schema

Use:

`observability/langfuse/langfuse-trace-event.json`

as the default structure for capstone evaluation traces.
