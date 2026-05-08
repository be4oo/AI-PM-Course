import { SOURCE_LIBRARY } from "../data/courseContent";
import { responsiveMaxWidth } from "./viewLayout";

export function SourcesView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF6B35" }}>SOURCE LIBRARY</span>
          <span className="brand-title">Verification and reference points</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(760) }}>
          {SOURCE_LIBRARY.map((s) => (
            <div key={s.title} className="exercise-box" style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 700 }}>{s.title}</div>
                <span className="tag-badge">{s.kind}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>verified {s.verified}</span>
              </div>
              <a href={s.url} target="_blank" rel="noreferrer" style={{ color: "#8FB9FF", fontSize: 12 }}>{s.url}</a>
              <div style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 13 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
