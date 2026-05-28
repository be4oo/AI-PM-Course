import { responsiveMaxWidth } from "./viewLayout";

const COMMANDS = [
  "npm run check:freshness",
  "npm run eval:promptfoo",
  "npm run observability:langfuse:smoke",
];

export function OpsStarterView({ onBack }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#8FB9FF", color: "#001B3D" }}>OPS STARTERS</span>
          <span className="brand-title">Promptfoo + Langfuse + freshness automation</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: responsiveMaxWidth(900) }}>
          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Runnable commands</div>
            {COMMANDS.map((c) => (
              <div key={c} style={{ fontSize: 13, marginBottom: 6 }}><code>{c}</code></div>
            ))}
          </div>
          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Promptfoo starter</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/evals/promptfoo/promptfooconfig.yaml</code></div>
          </div>
          <div className="exercise-box" style={{ marginBottom: 12 }}>
            <div className="exercise-title">Langfuse starter</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/observability/langfuse/README.md</code></div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/observability/langfuse/langfuse.env.example</code></div>
          </div>
          <div className="exercise-box">
            <div className="exercise-title">Freshness reminders</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}><code>/.github/workflows/freshness-check.yml</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}
