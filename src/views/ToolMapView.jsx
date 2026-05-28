import { TOOL_MAP_BY_LESSON } from "../data/toolingGuide";
import { responsiveMaxWidth } from "./viewLayout";

export function ToolMapView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#20C997", color: "#032219" }}>TOOL MAP</span>
          <span className="brand-title">Which tools belong in which lessons</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(960) }}>
          {TOOL_MAP_BY_LESSON.map((entry) => (
            <div key={entry.lessonId} className="exercise-box" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{entry.lessonId}</span>
                <span style={{ color: "var(--text-primary)" }}>{entry.lessonTitle}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Tools: {entry.tools.join(" | ")}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
                Why: {entry.why}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                How: {entry.how}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
