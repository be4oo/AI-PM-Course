# AI Business Case

## Feature

Screen monitoring → pattern recognition → automation generation for knowledge workers

## ROI tree

- **Cost reduction**: eliminate hours/day spent on repetitive multi-app manual sequences
- **Revenue protection**: faster task completion = more orders or cases handled per agent per day
- **Risk mitigation**: consistent, documented automation replaces undocumented tribal-knowledge workflows

## Baseline assumptions

- Target company size: 20–50 knowledge workers
- Estimated repetitive task time per worker: 2 hours/day × 20 days/month = 40 hours/month
- Workers affected at launch: 10 (pilot cohort)
- Total manual hours targeted: 10 × 40 = 400 hours/month
- Worker loaded cost: $8/hour (mid-market, conservative)
- Target automation coverage: 60% of captured workflows at launch → 80% after 90 days
- AI runtime + tooling cost/month: $600 (vision LLM calls + n8n hosting)

## Estimated impact

- Hours automated/month at 60% coverage: 400 × 60% = 240 hours
- Direct labor value recovered: 240 × $8 = $1,920/month
- AI runtime + tooling cost/month: $600
- Net monthly value (pilot cohort): ~$1,320
- Projected at full 50-worker rollout (80% coverage): ~$9,600/month net

## Kill criteria

- Net value negative for 2 consecutive months
- Automation accuracy below 85% after hardening sprint (steps generated correctly / total steps)
- Worker adoption below 30% of pilot cohort after 60 days
