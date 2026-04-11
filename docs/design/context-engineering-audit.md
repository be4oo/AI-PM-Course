# Context Engineering Audit

## Instruction layer
- System instruction is explicit about boundaries and citations.
- Response format is structured and predictable.

## Grounding layer
- Retrieval uses trusted policy and order data.
- Citation requirement is enabled for policy claims.

## Tool layer
- Order lookup tool limited to user-authorized records.
- Refund action remains human-approved.

## Output layer
- Confidence and next-step suggestion included.
- Fallback path shown when confidence is low.

## Gaps
- Need stricter context-window budget enforcement.
- Need automated checks for missing citations.
