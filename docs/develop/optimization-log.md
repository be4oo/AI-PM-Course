# Optimization Log

| Date | Change | Quality impact | Cost impact | Notes |
|---|---|---|---|---|
| 2026-04-11 | Added prompt caching for shared system prefix | +3% accuracy | -18% input token cost | Stable |
| 2026-04-11 | Added confidence-based fallback | -hallucination | +small latency | Acceptable |

## Next candidates
- Semantic caching for repeated intents
- Model routing threshold tuning
- Chunk size and reranker experiments
