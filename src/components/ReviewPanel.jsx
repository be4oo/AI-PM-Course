import { useMemo, useState } from "react";
import {
  buildPersonaWeightRows,
  getReviewerPersona,
  REVIEWER_PERSONAS,
} from "../data/reviewerPersonas";

function getContextLabel(context = {}) {
  if (context.capstoneMilestoneId) return `Capstone · ${context.capstoneMilestoneId}`;
  if (context.lessonId) return `Lesson ${context.lessonId}`;
  return "General review";
}

export function ReviewPanel({
  draft,
  setDraft,
  context,
  onBack,
  onSubmit,
  isSubmitting,
  submissionError,
  latestEntry,
  velocity,
  VelocityChartComponent,
}) {
  const [localMessage, setLocalMessage] = useState("");
  const persona = getReviewerPersona(draft.personaId);
  const weightRows = useMemo(() => buildPersonaWeightRows(draft.personaId), [draft.personaId]);

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLocalMessage("");
    const result = await onSubmit?.();
    if (result?.ok) setLocalMessage("Review stored in local history.");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#FF9470", color: "#1B0B04" }}>SIMULATOR</span>
          <span className="brand-title">Adversarial Cohort Review</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>
      <div className="content-area">
        <div className="content-wrapper" style={{ maxWidth: 1020 }}>
          <div className="exercise-box" style={{ borderLeftColor: "#FF9470", marginBottom: 12 }}>
            <div className="exercise-title" style={{ color: "#FF9470" }}>Review Context</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {getContextLabel(context)}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-muted)" }}>
              The first implementation runs a deterministic local reviewer so we can validate the full feedback loop before adding a live model provider.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(320px, 0.85fr)", gap: 14 }}>
            <div>
              <div className="exercise-box" style={{ marginBottom: 12 }}>
                <div className="exercise-title">Artifact Intake</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {[
                    { id: "paste", label: "Paste markdown" },
                    { id: "url", label: "GitHub raw URL" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      className="btn-outline"
                      onClick={() => updateField("sourceType", option.id)}
                      style={{
                        color: draft.sourceType === option.id ? "#fff" : "#B7C1D9",
                        borderColor: draft.sourceType === option.id ? "#FF947077" : "var(--border-light)",
                        background: draft.sourceType === option.id ? "rgba(255, 148, 112, 0.12)" : "transparent",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Artifact title</span>
                    <input
                      value={draft.artifactTitle}
                      onChange={(event) => updateField("artifactTitle", event.target.value)}
                      placeholder="AI support assistant PRD"
                      style={inputStyle}
                    />
                  </label>

                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Artifact type</span>
                    <select
                      value={draft.artifactType}
                      onChange={(event) => updateField("artifactType", event.target.value)}
                      style={inputStyle}
                    >
                      <option value="prd">PRD</option>
                      <option value="design">Trust or system design</option>
                      <option value="eval">Eval suite</option>
                      <option value="ops">Ops or launch packet</option>
                      <option value="memo">Decision memo</option>
                      <option value="strategy">Strategy artifact</option>
                    </select>
                  </label>

                  {draft.sourceType === "url" ? (
                    <label style={{ display: "grid", gap: 6 }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Artifact URL</span>
                      <input
                        value={draft.artifactUrl}
                        onChange={(event) => updateField("artifactUrl", event.target.value)}
                        placeholder="https://raw.githubusercontent.com/..."
                        style={inputStyle}
                      />
                    </label>
                  ) : (
                    <label style={{ display: "grid", gap: 6 }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Artifact markdown</span>
                      <textarea
                        value={draft.content}
                        onChange={(event) => updateField("content", event.target.value)}
                        placeholder="Paste the artifact or a representative excerpt here."
                        style={{ ...inputStyle, minHeight: 220, resize: "vertical" }}
                      />
                    </label>
                  )}

                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Learner notes</span>
                    <textarea
                      value={draft.learnerNotes}
                      onChange={(event) => updateField("learnerNotes", event.target.value)}
                      placeholder="What kind of critique do you want? What changed since the last submission?"
                      style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                    />
                  </label>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                  <button
                    className="btn-outline"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{
                      color: "#FFD6C7",
                      borderColor: "#FF947077",
                      background: "rgba(255, 148, 112, 0.14)",
                    }}
                  >
                    {isSubmitting ? "RUNNING REVIEW..." : "RUN ADVERSARIAL REVIEW"}
                  </button>
                  {(submissionError || localMessage) && (
                    <div style={{ fontSize: 12, color: submissionError ? "#FFB8A5" : "#7BE0AD", alignSelf: "center" }}>
                      {submissionError || localMessage}
                    </div>
                  )}
                </div>
              </div>

              {latestEntry?.result?.status === "complete" && (
                <div className="exercise-box" style={{ borderLeftColor: "#7BE0AD", marginBottom: 12 }}>
                  <div className="exercise-title" style={{ color: "#7BE0AD" }}>Latest Review Output</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>
                    {latestEntry.result.summary}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 12 }}>
                    {weightRows.map((row) => (
                      <div key={row.id} style={{ border: "1px solid var(--border-light)", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>{row.label}</div>
                        <div style={{ fontSize: 18, color: "#EAFBF2", fontWeight: 700 }}>
                          {latestEntry.result.scores?.[row.id] ?? 0}/4
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <ListBlock title="Top strengths" items={latestEntry.result.strengths} color="#7BE0AD" />
                    <ListBlock title="Top gaps" items={latestEntry.result.gaps} color="#FFB8A5" />
                  </div>
                  <ListBlock
                    title="Required actions"
                    items={(latestEntry.result.requiredActions || []).map(
                      (action) => `${action.action} — ${action.owner}${action.evidence ? ` — ${action.evidence}` : ""}`
                    )}
                    color="#8FB9FF"
                  />
                </div>
              )}

              {latestEntry?.result?.status === "error" && (
                <div className="exercise-box" style={{ borderLeftColor: "#FF6B35", marginBottom: 12 }}>
                  <div className="exercise-title" style={{ color: "#FF6B35" }}>Structured Review Error</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>
                    {latestEntry.result.message}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {latestEntry.result.remediation}
                  </div>
                </div>
              )}

              {VelocityChartComponent ? (
                <VelocityChartComponent snapshot={velocity.snapshot} velocityScore={velocity.score} />
              ) : null}
            </div>

            <div>
              <div className="exercise-box" style={{ marginBottom: 12 }}>
                <div className="exercise-title">Reviewer Persona</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {REVIEWER_PERSONAS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => updateField("personaId", item.id)}
                      style={{
                        textAlign: "left",
                        background: draft.personaId === item.id ? "rgba(255, 148, 112, 0.12)" : "transparent",
                        border: "1px solid",
                        borderColor: draft.personaId === item.id ? "#FF947077" : "var(--border-light)",
                        color: "var(--text-primary)",
                        borderRadius: 8,
                        padding: "10px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
                        {item.description}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        Best for: {item.artifactTypes.join(" | ")}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="exercise-box">
                <div className="exercise-title">Weighting Preview</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 10 }}>
                  {persona?.systemPromptAnchor}
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {weightRows.map((row) => (
                    <div key={row.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>
                        <span>{row.label}</span>
                        <span>{row.weight.toFixed(2)}x</span>
                      </div>
                      <div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,0.08)" }}>
                        <div
                          style={{
                            width: `${Math.min(100, (row.weight / 1.5) * 100)}%`,
                            height: "100%",
                            borderRadius: 999,
                            background: "linear-gradient(90deg, #FF9470 0%, #FFD166 100%)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListBlock({ title, items, color }) {
  if (!items?.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 12, color, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      {items.map((item) => (
        <div key={`${title}-${item}`} className="takeaway-item">
          <span style={{ color, fontSize: 12 }}>•</span>
          <span style={{ color: "var(--text-secondary)" }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "var(--bg-surface)",
  color: "var(--text-primary)",
  border: "1px solid var(--border-light)",
  borderRadius: 6,
  padding: "10px 12px",
  fontFamily: "inherit",
  fontSize: 13,
};
