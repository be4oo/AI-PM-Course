export const MOBILE_TRACK_ID = "mobile";

export const TRACKS = [
  { id: "aipm", label: "AI PM Course" },
  { id: MOBILE_TRACK_ID, label: "Mobile App Lessons" },
];

export const mobileCurriculum = [
  {
    id: "mob-1",
    week: "MOBILE WEEK 1",
    module: "MOBILE 1",
    title: "How a hardware app is put together",
    tag: "Mobile",
    accent: "#1F7AE0",
    lessons: [
      {
        id: "mob-1.1",
        title: "The layer cake: views, state, services, models",
        type: "concept",
        content: "Placeholder — content lands in the next milestone.",
        quiz: { q: "Placeholder?", a: "Placeholder." },
        apply: "Placeholder.",
        keys: ["Placeholder"],
        meta: { lastVerified: "2026-08-17", sources: [] },
      },
    ],
  },
];
