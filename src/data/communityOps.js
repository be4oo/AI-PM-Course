export const COMMUNITY_OPS = {
  version: "v1",
  objective:
    "Operate a real external cohort workflow with facilitator ownership, reviewer assignments, and recurring sync rituals.",
  requiredIntegrations: [
    "Community channel link (Slack/Discord/Forum)",
    "Office-hours link",
    "Demo-day link",
  ],
  weeklyRituals: [
    {
      id: "weekly-sync",
      title: "Weekly Cohort Sync",
      outcome: "Decisions, blockers, and next actions captured publicly.",
    },
    {
      id: "peer-review-assignment",
      title: "Peer Review Assignment",
      outcome: "Each learner has an assigned reviewer and due date.",
    },
    {
      id: "office-hours-queue",
      title: "Office Hours Queue",
      outcome: "Questions collected with artifact context before session.",
    },
    {
      id: "demo-day-slot",
      title: "Demo Day Slotting",
      outcome: "Demo order and feedback owners confirmed.",
    },
  ],
};
