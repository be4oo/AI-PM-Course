import { EXECUTIVE_TRACK } from "../data/executiveTrack";
import { responsiveMaxWidth } from "./viewLayout";

export function ExecutiveTrackView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#7A5CFF" }}>LEAD</span>
          <span className="brand-title">Executive and leadership track</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(960) }}>
          <div className="exercise-box" style={{ borderLeftColor: "#7A5CFF", marginBottom: 12 }}>
            <div className="exercise-title" style={{ color: "#7A5CFF" }}>{EXECUTIVE_TRACK.title}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>
              {EXECUTIVE_TRACK.audience}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              {EXECUTIVE_TRACK.promise}
            </div>
          </div>
          {EXECUTIVE_TRACK.modules.map((module) => (
            <div key={module.title} className="exercise-box" style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{module.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Lessons: {module.lessons.join(" | ")}
              </div>
              {module.outcomes.map((outcome) => (
                <div key={outcome} className="takeaway-item"><span>→</span><span>{outcome}</span></div>
              ))}
            </div>
          ))}
          <div className="exercise-box">
            <div className="exercise-title">Leadership questions this course should answer</div>
            {EXECUTIVE_TRACK.leadershipQuestions.map((question) => (
              <div key={question} className="takeaway-item"><span>•</span><span>{question}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
