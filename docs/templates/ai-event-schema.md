# AI Event Schema (Reference)

## Required dimensions per event
- `timestamp`
- `request_id`
- `session_id`
- `user_id`
- `tenant_id`
- `feature_id`
- `model_tier`
- `event_type`

## Outcome fields
- `session_success` (boolean)
- `containment` (boolean)
- `regret_flag` (boolean)
- `escalation` (boolean)
- `edit_distance` (number)

## Cost and reliability fields
- `input_tokens`
- `output_tokens`
- `cost_usd`
- `latency_ms`
- `fallback_triggered`

## Event types
- `ai_request_started`
- `ai_response_returned`
- `user_edit_submitted`
- `user_regenerated`
- `human_escalation`
- `session_closed`

