export function VelocityChart({ snapshot, velocityScore }) {
  if (!snapshot?.hasEnoughHistory) {
    return (
      <div className="exercise-box" style={{ borderLeftColor: "#7BE0AD", marginBottom: 12 }}>
        <div className="exercise-title" style={{ color: "#7BE0AD" }}>Iteration Velocity</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{snapshot?.message}</div>
      </div>
    );
  }

  const maxAverage = Math.max(...snapshot.points.map((point) => point.average), 0.1);

  return (
    <div className="exercise-box" style={{ borderLeftColor: "#7BE0AD", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
        <div className="exercise-title" style={{ color: "#7BE0AD", marginBottom: 0 }}>Iteration Velocity</div>
        <div style={{ fontSize: 12, color: "#BDEACF" }}>{velocityScore?.label}</div>
      </div>
      {velocityScore?.reason && (
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
          {velocityScore.reason}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", gap: 10, alignItems: "end", minHeight: 170 }}>
        {snapshot.points.map((point, index) => (
          <div key={point.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "center", minHeight: 110 }}>
              <div
                title={`Submission ${index + 1}: ${point.average.toFixed(2)}`}
                style={{
                  width: 34,
                  height: `${Math.max(16, (point.average / maxAverage) * 108)}px`,
                  borderRadius: 8,
                  background: "linear-gradient(180deg, #7BE0AD 0%, #00D2FF 100%)",
                  boxShadow: "0 10px 24px rgba(0, 210, 255, 0.18)",
                }}
              />
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-secondary)" }}>
              Review {index + 1}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: "#DFF7EA", fontWeight: 700 }}>
              {point.average.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
      {snapshot.remediationTargets?.length > 0 ? (
        <div style={{ marginTop: 14, fontSize: 12, color: "#FFB8A5" }}>
          Remediation targets: {snapshot.remediationTargets.join(" | ")}
        </div>
      ) : (
        <div style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
          No dimensions are currently stuck below the remediation threshold.
        </div>
      )}
    </div>
  );
}
