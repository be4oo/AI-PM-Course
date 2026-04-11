# Context Engineering v2

## Improvements from v1
- Split static policy context from dynamic order context
- Added citation requirement for policy claims
- Added fallback policy when retrieval confidence drops

## Current prompt structure
1. System intent and safety boundaries
2. User goal and constraints
3. Retrieved evidence chunks
4. Tool outputs
5. Structured response schema

## Next iteration
- Add automatic chunk relevance scoring
- Add stricter schema validation before user-visible output
