import { TOOLS } from "../data/courseContent";
import { responsiveMaxWidth } from "./viewLayout";

export function ToolsView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#00E676", color: "#002A12" }}>PRACTICE LAB</span>
          <span className="brand-title">Tools and Setup ({TOOLS.length})</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(760) }}>
          <div className="exercise-box" style={{ borderLeftColor: "#00E676", marginBottom: 24 }}>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              All tools below are free or have free tiers. Each includes a specific practice exercise tied to course lessons.
            </p>
          </div>
          {TOOLS.map((t, i) => (
            <div key={i} className="exercise-box" style={{ borderLeftColor: t.free ? "#00E676" : "#FFB800", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{t.name}</span>
                <span className="tag-badge">{t.cat}</span>
                <span className="tag-badge" style={{ marginLeft: "auto", color: t.free ? "#00E676" : "#FFB800", borderColor: t.free ? "#00E67655" : "#FFB80055" }}>
                  {t.free ? "FREE" : "PAID"}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{t.desc}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                Setup: <code>{t.setup}</code>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Used in: {t.usedIn.join(" | ")}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{t.practice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
