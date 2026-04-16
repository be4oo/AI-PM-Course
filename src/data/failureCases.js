export const FAILURE_CASES = [
  {
    id: "zillow-offers-2021",
    name: "Zillow Offers Wind-Down",
    incidentDate: "2021-11-02",
    lastVerified: "2026-04-17",
    sourceUrl: "https://investors.zillowgroup.com/investors/news-and-events/news/news-details/2021/Zillow-Group-Reports-Third-Quarter-2021-Financial-Results/default.aspx",
    summary:
      "Forecasting error and operational volatility broke home-flipping economics, forcing shutdown of the Offers line.",
    harm:
      "Large inventory write-downs, layoffs, and strategic reset.",
    frameworkLanes: ["economics", "kill-criteria", "rollout-governance"],
    debriefPrompts: [
      "Which leading indicators should have triggered a launch stop earlier?",
      "How would a kill-criteria register have changed decision timing?",
    ],
  },
  {
    id: "google-stadia-2022",
    name: "Google Stadia Consumer Shutdown",
    incidentDate: "2022-09-29",
    lastVerified: "2026-04-17",
    sourceUrl: "https://blog.google/products/stadia/message-on-stadia-streaming-strategy/",
    summary:
      "Strong technology failed to reach sustained adoption, and consumer service was discontinued.",
    harm:
      "User trust loss and ecosystem disruption despite refund commitments.",
    frameworkLanes: ["adoption", "portfolio-governance", "kill-criteria"],
    debriefPrompts: [
      "What adoption floor should have been contractually defined at launch?",
      "Which portfolio review cadence would have reduced sunk-cost exposure?",
    ],
  },
  {
    id: "air-canada-chatbot-2024",
    name: "Air Canada Chatbot Fare Dispute",
    incidentDate: "2024-02-14",
    lastVerified: "2026-04-17",
    sourceUrl: "https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html",
    summary:
      "Customer-facing bot gave incorrect fare-policy information, and the company was held responsible.",
    harm:
      "Financial payout, legal visibility, and trust damage around AI guidance.",
    frameworkLanes: ["trust-ux", "guardrails", "ownership"],
    debriefPrompts: [
      "What output-policy control would have prevented policy hallucination?",
      "Where should human escalation have been mandatory in the flow?",
    ],
  },
  {
    id: "cnet-ai-articles-2023",
    name: "CNET AI-Generated Article Corrections",
    incidentDate: "2023-01-25",
    lastVerified: "2026-04-17",
    sourceUrl: "https://www.theverge.com/2023/1/25/23571082/cnet-ai-written-stories-errors-corrections-red-ventures",
    summary:
      "Automated publishing shipped factual errors and required extensive post-publication corrections.",
    harm:
      "Editorial credibility impact and additional review overhead.",
    frameworkLanes: ["eval-discipline", "release-gates", "risk-controls"],
    debriefPrompts: [
      "Which pre-publish eval gate should have blocked weak articles?",
      "What minimum evidence packet should have been mandatory before release?",
    ],
  },
  {
    id: "nyc-chatbot-legal-risk-2024",
    name: "NYC AI Chatbot Incorrect Legal Guidance",
    incidentDate: "2024-03-26",
    lastVerified: "2026-04-17",
    sourceUrl: "https://www.thecity.nyc/2024/03/26/mycity-chatbot-misinformation/",
    summary:
      "A public-service chatbot reportedly delivered incorrect legal and policy guidance in sensitive scenarios.",
    harm:
      "Potential user harm through misleading compliance advice.",
    frameworkLanes: ["harm-modeling", "responsible-ai", "go-no-go"],
    debriefPrompts: [
      "Which scenarios required hard refusal instead of generative responses?",
      "What fairness and harm checks were missing before deployment?",
    ],
  },
  {
    id: "replika-safety-rollbacks-2023",
    name: "Replika Safety and Behavior Reversal",
    incidentDate: "2023-02-03",
    lastVerified: "2026-04-17",
    sourceUrl: "https://www.theverge.com/2023/2/3/23584240/replika-romantic-ai-chatbot-update-removed",
    summary:
      "Major behavior changes after safety updates created user backlash and trust instability.",
    harm:
      "User retention damage and emotional-trust concerns in high-intimacy use cases.",
    frameworkLanes: ["change-management", "trust-design", "rollout-governance"],
    debriefPrompts: [
      "How should expectation-setting and staged rollout have been handled?",
      "Which rollback and communication controls should have existed?",
    ],
  },
];

