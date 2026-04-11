export const EXECUTIVE_TRACK = {
  title: "Executive and Leadership Track",
  audience:
    "Heads of product, engineering, operations, transformation, ERP, mobile, platform, and cross-functional AI programs.",
  promise:
    "Gives leaders enough AI product management depth to allocate budget, set quality bars, govern risk, and lead mixed hardware/software/ERP/mobile organizations without getting trapped in shallow AI hype.",
  modules: [
    {
      title: "AI Portfolio Strategy",
      lessons: ["1.2", "1.4", "2.2", "12.3", "12.5"],
      outcomes: [
        "Choose AI-shaped bets",
        "Separate wedge features from durable moats",
        "Allocate spend by ROI and risk",
      ],
    },
    {
      title: "Operating Model and Governance",
      lessons: ["2.3", "5.1", "7.1", "9.2", "12.1", "12.4"],
      outcomes: [
        "Set trust and HITL policies",
        "Define launch gates and rollback rules",
        "Create vendor, budget, and risk governance",
      ],
    },
    {
      title: "Org Capability and Delivery",
      lessons: ["1.3", "6.1", "6.2", "10.1", "12.2"],
      outcomes: [
        "Build the eval and review cadence",
        "Require artifacts instead of vague progress reports",
        "Lead capstone-quality delivery reviews",
      ],
    },
    {
      title: "Platform and Architecture Awareness",
      lessons: ["3.1", "3.3", "8.1", "11.1", "12.1", "12.5"],
      outcomes: [
        "Understand grounding, tools, and agents at decision level",
        "Review multilingual and Arabic system tradeoffs",
        "Lead cross-domain teams with consistent AI standards",
      ],
    },
  ],
  leadershipQuestions: [
    "Should we build, buy, or partner for this AI capability?",
    "What quality bar is required before launch?",
    "What runtime metrics tell us the system is degrading?",
    "Which AI work should stay centralized versus embedded in each product team?",
    "How do we govern vendor risk across mobile, ERP, hardware, and internal tooling?",
  ],
};
