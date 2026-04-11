# AI Production Risk Register

| Risk Description | Probability | Impact | Risk Category | Owner | Treatment Strategy | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Primary foundation model outage | Medium | High | Operational | Engineering Lead | **Mitigate**: Portkey automated fallback routing to secondary model | Active |
| Hallucination spike on new domain | High | High | Quality | AI PM | **Mitigate**: RAG context injection + strict prompt grounding | Active |
| Token cost surge during peak traffic | Medium | Medium | Financial | Ops Lead | **Mitigate**: Implement token budget alerts + max-token limits | Active |
| Concept drift in golden dataset | High | Medium | Quality | Data Sci | **Accept**: Scheduled monthly recalibration of eval suite | Active |
| GDPR/PII leakage in model output | Low | Critical | Security | Legal/Security | **Avoid**: Strict PII scrubbing on input + output guardrails | Active |

## Treatment Strategies
- **Avoid**: Change plan to eliminate risk (e.g., don't launch feature)
- **Mitigate**: Reduce likelihood or impact (e.g., add guardrails)
- **Transfer**: Shift risk to third party (e.g., vendor SLAs)
- **Accept**: Acknowledge risk and budget for it
