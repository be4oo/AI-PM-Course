import { GLOSSARY } from "../data/courseContent";
import { responsiveMaxWidth } from "./viewLayout";

export function GlossaryView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#E040FB" }}>GLOSSARY</span>
          <span className="brand-title">AI PM Key Terms ({GLOSSARY.length})</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(760) }}>
          {GLOSSARY.map((g, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border-light)", padding: "12px 0" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{g.term}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{g.def}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
