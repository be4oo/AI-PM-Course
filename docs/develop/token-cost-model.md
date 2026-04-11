# Token Cost Model

## Baseline assumptions
- Input tokens/request: 1,200
- Output tokens/request: 300
- Requests/day: 4,000
- Days/month: 30

## Cost worksheet
- Monthly input tokens: 144,000,000
- Monthly output tokens: 36,000,000
- Apply provider pricing from live registry (`/docs/live/model-registry.md`)

## Optimization levers
- Prompt caching for static prefixes
- Cheaper model tier for routing/classification
- Response truncation and structured outputs
- Arabic normalization before tokenization
