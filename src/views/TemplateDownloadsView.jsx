import { responsiveMaxWidth } from "./viewLayout";

const TEMPLATES = [
  { title: "AI PRD Template", file: "/templates/ai-prd-template.md" },
  { title: "Evaluation Rubric Template", file: "/templates/eval-rubric-template.md" },
  { title: "Rollout Checklist Template", file: "/templates/rollout-checklist-template.md" },
  { title: "Responsible AI Audit Template", file: "/templates/responsible-ai-audit-template.md" },
];

export function TemplateDownloadsView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#F5C542", color: "#2E2300" }}>TEMPLATES</span>
          <span className="brand-title">Downloadable implementation templates</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(760) }}>
          {TEMPLATES.map((template) => (
            <div key={template.file} className="exercise-box" style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{template.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>{template.file}</div>
              <a href={template.file} download className="btn-outline" style={{ display: "inline-block", textDecoration: "none" }}>
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
