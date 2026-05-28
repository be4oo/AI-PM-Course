import { MUST_ADD_TOOLS, TOOLING_SELECTION_GUIDE } from "../data/toolingGuide";
import { responsiveMaxWidth } from "./viewLayout";

export function MustAddToolsView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF7A59" }}>STACK</span>
          <span className="brand-title">Must-add AI PM tools</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(960) }}>
          <div className="exercise-box" style={{ borderLeftColor: "#FF7A59", marginBottom: 12 }}>
            <div className="exercise-title" style={{ color: "#FF7A59" }}>Selection guide</div>
            {TOOLING_SELECTION_GUIDE.map((item) => (
              <div key={item} className="takeaway-item"><span>•</span><span>{item}</span></div>
            ))}
          </div>
          {MUST_ADD_TOOLS.map((tool) => (
            <div key={tool.name} className="exercise-box" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontWeight: 700 }}>{tool.name}</span>
                <span className="tag-badge">{tool.category}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
                Use case: {tool.useCase}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
                Why it matters: {tool.whyItMatters}
              </div>
              <a href={tool.source} target="_blank" rel="noreferrer" style={{ color: "#8FB9FF", fontSize: 12 }}>
                {tool.source}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
