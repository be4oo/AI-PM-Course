# Opportunity Landscape

**Last updated**: 2026-05-02
**Kill rules**: Zone 4 = kill. Pain Score < 100 = kill.

---

## Candidate Ideas

| Idea | Zone | AI-shaped? | Wedge / Core | Pain Score | Verdict |
|---|---|---|---|---:|---|
| AI support assistant for order/status questions | Zone 1 | Yes | Wedge | 180 | ✅ Prioritize |
| Daily KPI narrative summary for managers | Zone 1 | Yes | Wedge | 120 | 🔍 Validate quickly |
| Auto-refund without human review | Zone 1 | Yes | Core | 150 | ⏳ Delay until guardrails mature |
| Screen monitoring → pattern learning → automation | Zone 1 | Yes — strongly | Wedge | 567 | ✅ Pursue |

---

## Why selected idea is AI-shaped (original support assistant)
- High ambiguity in user phrasing
- High cognitive load for support team
- Variable resolution paths
- Repeated, high-frequency workload

---

## Idea Deep-Dive: Screen Monitoring → Automation

### One-sentence description
Passively observe employee screen activity, infer repeated patterns using AI, then generate automation scripts from those patterns.

### Zone rationale
**Zone 1** (high pain + AI is the best solution).
Pattern recognition from unstructured screen data is exactly where AI outperforms rule-based RPA — a human cannot watch 50 employees' screens and infer automation opportunities at scale.

### AI-shaped rationale
Yes. Extracting structured workflow patterns from noisy screen recordings is a pattern recognition problem AI solves better than deterministic rules. Automation generation from those patterns is a code synthesis problem — also AI-native.

### Wedge → Core path
- **Wedge**: Screen observation → first automation suggestion per employee
- **Core**: A company-specific automation library that grows with usage, trained on the org's actual workflows — a moat legacy RPA tools cannot replicate

### Pain Score calculation
| Factor | Score (1–10) | Reasoning |
|---|---|---|
| Frequency | 9 | Repetitive tasks happen every workday |
| Severity | 7 | Wastes hours/week per employee |
| Breadth | 9 | Every knowledge worker in every industry |

**Total: 9 × 7 × 9 = 567**

### Hard design requirement
The product must be **opt-in, transparent, and employee-controlled** from day one. Covert monitoring violates GDPR, CCPA, and enterprise procurement requirements. Consent-first framing is also the correct sales motion for HR and legal-conscious buyers.

### Existing market (proof of pain)
| Tool | What it does | Differentiation opportunity |
|---|---|---|
| UiPath Task Mining | Screen + keystrokes → automation suggestions | Closest incumbent; enterprise-heavy, expensive |
| Celonis | Process mining from system logs | Needs structured data, not raw screen |
| MS Power Automate + Process Advisor | Screen recording → flow suggestions | Generic; inside M365 but lacks deep pattern learning |
| Rewind.ai / Recall.ai | Screen capture + semantic search | Individual only, not enterprise automation |

**Recommended stack**: Screen capture SDK → pattern recognition model → automation generation → output to Power Automate or UiPath as the execution runtime. Do not rebuild the execution layer.

### Open questions before building
1. Who is the buyer — IT, HR, or Operations?
2. What is the consent and data handling model?
3. What automation type to target first — browser, desktop app, or cross-app?
4. How is the automation validated before deployment — human review or AI-confidence gated?

---

## Kill Criteria (all ideas)
- Correction rate stays above 25% after 3 iterations
- No ROI improvement within 8 weeks
- Pain Score drops below 100 on re-audit after discovery interviews
