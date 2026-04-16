import { FAILURE_CASES } from "../data/failureCases";
import { getFreshnessBadgeData } from "../utils/freshness";

export function FailureCaseView() {
  const now = new Date();

  return (
    <div className="exercise-box" style={{ borderLeftColor: "#FF7A59", marginBottom: 14 }}>
      <div className="exercise-title" style={{ color: "#FF7A59" }}>
        FAILURE ANTHOLOGY ({FAILURE_CASES.length} CASES)
      </div>
      {FAILURE_CASES.map((item) => {
        const freshness = getFreshnessBadgeData({ lastVerified: item.lastVerified }, now);
        return (
          <div key={item.id} style={{ borderTop: "1px solid var(--border-light)", paddingTop: 12, marginTop: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{item.name}</span>
              <span className="tag-badge">{item.incidentDate}</span>
              <span
                className="tag-badge"
                style={{
                  color: freshness.color,
                  borderColor: `${freshness.color}55`,
                }}
              >
                {freshness.label}
              </span>
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
              {item.summary}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
              Harm: {item.harm}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
              Framework lanes: {item.frameworkLanes.join(" | ")}
            </div>
            {item.debriefPrompts.map((prompt) => (
              <div key={prompt} className="takeaway-item">
                <span style={{ color: "#FF7A59", fontSize: 12, marginTop: 2 }}>•</span>
                <span style={{ color: "var(--text-secondary)" }}>{prompt}</span>
              </div>
            ))}
            <a href={item.sourceUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#8FB9FF" }}>
              Source
            </a>
          </div>
        );
      })}
    </div>
  );
}

