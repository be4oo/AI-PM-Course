/**
 * AdversarialReviewModal — persona picker + paste/link artifact → scored rubric.
 *
 * Spec ref: FR-013 — "MUST present a persona picker, a paste-or-link artifact
 * field, and a scored rubric verdict on submission."
 *
 * Scoring is local (Plan R8) — uses the lib extracted in T013. No model
 * call; constitution Principle III is intentionally NOT triggered.
 *
 * Flow:
 *   1. Compose: pick a persona, paste or supply a URL.
 *   2. Scoring (transient): show a brief "scoring…" state while
 *      resolveArtifactContent() awaits.
 *   3. Verdict: render scored rubric (strengths, gaps, required actions).
 *
 * Errors (per spec Edge Case): malformed URL or fetch failure shows a
 * non-fatal error inside the modal with a retry; the modal does NOT close.
 */

import { useState } from "react";
import {
  REVIEWER_PERSONAS,
  DEFAULT_REVIEWER_PERSONA_ID,
  getReviewerPersona,
  REVIEW_DIMENSIONS,
} from "../../data/reviewerPersonas.js";
import {
  scoreArtifactAgainstRubric,
  buildReviewNarrative,
  resolveArtifactContent,
} from "../lib/adversarialScoring.js";

const MAX_CHARS = 12_000;

export function AdversarialReviewModal({
  titleId,
  label = "Adversarial review",
  description,
  onClose,
}) {
  const [personaId, setPersonaId] = useState(DEFAULT_REVIEWER_PERSONA_ID);
  const [sourceType, setSourceType] = useState("paste"); // "paste" | "url"
  const [content, setContent] = useState("");
  const [artifactUrl, setArtifactUrl] = useState("");
  const [phase, setPhase] = useState("compose"); // compose | scoring | verdict
  const [verdict, setVerdict] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event?.preventDefault?.();
    setError(null);
    setPhase("scoring");

    const submission = sourceType === "paste"
      ? { sourceType: "paste", content }
      : { sourceType: "url", artifactUrl };

    const resolved = await resolveArtifactContent(submission);
    if (!resolved.ok) {
      setError(resolved.error);
      setPhase("compose");
      return;
    }

    const persona = getReviewerPersona(personaId);
    const scores = scoreArtifactAgainstRubric(resolved.content, personaId);
    const narrative = buildReviewNarrative(scores, persona);
    setVerdict({ persona, scores, narrative });
    setPhase("verdict");
  }

  function reset() {
    setPhase("compose");
    setVerdict(null);
    setError(null);
  }

  /* ===== verdict ===== */
  if (phase === "verdict" && verdict) {
    return (
      <div>
        <Title id={titleId}>{label} · verdict</Title>
        <p style={subhintStyle}>{verdict.persona.name} read your artifact.</p>

        <ScoreTable scores={verdict.scores} />

        <Section label="Strengths" testid="adv-strengths">
          <ul style={listStyle}>
            {verdict.narrative.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Section>

        <Section label="Gaps" testid="adv-gaps">
          <ul style={listStyle}>
            {verdict.narrative.gaps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Section>

        <Section label="Required actions" testid="adv-actions">
          <ul style={listStyle}>
            {verdict.narrative.requiredActions.map((a, i) => (
              <li key={i}>{a.action}</li>
            ))}
          </ul>
        </Section>

        <div style={actionsRowStyle}>
          <button type="button" onClick={reset} style={secondaryButtonStyle} data-testid="adv-restart">
            Review another
          </button>
          <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="adv-close">
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ===== compose / scoring ===== */
  return (
    <form onSubmit={onSubmit}>
      <Title id={titleId}>{label}</Title>
      {description ? <p style={subhintStyle}>{description}</p> : null}

      <Section label="Persona" testid="adv-persona-section">
        <div role="radiogroup" aria-label="Reviewer persona" style={personaGridStyle}>
          {REVIEWER_PERSONAS.map((p) => (
            <button
              type="button"
              key={p.id}
              role="radio"
              aria-checked={personaId === p.id}
              onClick={() => setPersonaId(p.id)}
              data-testid={`adv-persona-${p.id}`}
              style={personaId === p.id ? personaPickedStyle : personaButtonStyle}
            >
              <span style={personaNameStyle}>{p.name}</span>
              <span style={personaHintStyle}>{p.description}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section label="Artifact" testid="adv-artifact-section">
        <div role="radiogroup" aria-label="Source type" style={tabRowStyle}>
          <button
            type="button"
            role="radio"
            aria-checked={sourceType === "paste"}
            onClick={() => setSourceType("paste")}
            data-testid="adv-source-paste"
            style={sourceType === "paste" ? tabPickedStyle : tabButtonStyle}
          >
            Paste content
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={sourceType === "url"}
            onClick={() => setSourceType("url")}
            data-testid="adv-source-url"
            style={sourceType === "url" ? tabPickedStyle : tabButtonStyle}
          >
            Link (raw URL)
          </button>
        </div>

        {sourceType === "paste" ? (
          <label style={fieldLabelStyle}>
            <span style={fieldLabelTextStyle}>Paste up to {MAX_CHARS.toLocaleString()} characters</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
              data-testid="adv-paste-input"
              style={textareaStyle}
              rows={8}
            />
          </label>
        ) : (
          <label style={fieldLabelStyle}>
            <span style={fieldLabelTextStyle}>Raw URL (e.g. https://raw.githubusercontent.com/…)</span>
            <input
              type="url"
              value={artifactUrl}
              onChange={(e) => setArtifactUrl(e.target.value)}
              data-testid="adv-url-input"
              style={inputStyle}
              placeholder="https://"
            />
          </label>
        )}
      </Section>

      {error ? (
        <p role="alert" style={errorStyle} data-testid="adv-error">
          {error?.message ?? "Could not score the artifact."}
        </p>
      ) : null}

      <div style={actionsRowStyle}>
        <button type="button" onClick={onClose} style={secondaryButtonStyle} data-testid="adv-cancel">
          Cancel
        </button>
        <button
          type="submit"
          disabled={phase === "scoring" || isSubmitDisabled(sourceType, content, artifactUrl)}
          style={primaryButtonStyle}
          data-testid="adv-submit"
        >
          {phase === "scoring" ? "Scoring…" : "Score artifact"}
        </button>
      </div>
    </form>
  );
}

function isSubmitDisabled(sourceType, content, url) {
  if (sourceType === "paste") return content.trim().length === 0;
  return !url || !/^https?:\/\//i.test(url);
}

/* ===========================================================================
 * Subcomponents + styles
 * ========================================================================= */

function Title({ id, children }) {
  return <h2 id={id} style={titleStyle}>{children}</h2>;
}

function Section({ label, testid, children }) {
  return (
    <section data-testid={testid} style={sectionStyle}>
      <p style={sectionLabelStyle}>{label}</p>
      {children}
    </section>
  );
}

function ScoreTable({ scores }) {
  return (
    <table style={scoreTableStyle} data-testid="adv-scores">
      <thead>
        <tr>
          <th scope="col" style={scoreTHStyle}>Dimension</th>
          <th scope="col" style={{ ...scoreTHStyle, textAlign: "end" }}>Score</th>
        </tr>
      </thead>
      <tbody>
        {REVIEW_DIMENSIONS.map((d) => (
          <tr key={d.id}>
            <th scope="row" style={scoreRowLabelStyle}>{d.label}</th>
            <td style={scoreRowValueStyle}>{scores[d.id] ?? 0}<span style={scoreOutOfStyle}> / 4</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const titleStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.5rem",
  margin: 0,
  marginBottom: "0.4rem",
};
const subhintStyle = {
  fontFamily: "var(--sans)",
  fontStyle: "italic",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "1rem",
};

const sectionStyle = { marginBottom: "1rem" };
const sectionLabelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "0.5rem",
};

const personaGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "0.4rem",
};
const personaButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink)",
  padding: "0.5rem 0.65rem",
  borderRadius: "0.3rem",
  textAlign: "start",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
};
const personaPickedStyle = { ...personaButtonStyle, borderColor: "var(--accent)" };
const personaNameStyle = { fontFamily: "var(--sans)", fontSize: "0.95rem", fontWeight: 500 };
const personaHintStyle = { fontFamily: "var(--sans)", fontSize: "0.78rem", color: "var(--ink-dim)", lineHeight: 1.4 };

const tabRowStyle = { display: "flex", gap: "0.4rem", marginBlockEnd: "0.5rem" };
const tabButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink-dim)",
  padding: "0.35rem 0.7rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontFamily: "var(--mono)",
  fontSize: "0.8rem",
};
const tabPickedStyle = { ...tabButtonStyle, color: "var(--ink)", borderColor: "var(--accent)" };

const fieldLabelStyle = { display: "flex", flexDirection: "column", gap: "0.3rem" };
const fieldLabelTextStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
  color: "var(--ink-dim)",
};
const textareaStyle = {
  inlineSize: "100%",
  background: "transparent",
  color: "var(--ink)",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  padding: "0.5rem 0.6rem",
  fontFamily: "var(--mono)",
  fontSize: "0.85rem",
  resize: "vertical",
};
const inputStyle = {
  inlineSize: "100%",
  background: "transparent",
  color: "var(--ink)",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  padding: "0.45rem 0.6rem",
  fontFamily: "var(--mono)",
  fontSize: "0.85rem",
};

const actionsRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.4rem",
  marginTop: "1rem",
};
const primaryButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--accent)",
  color: "var(--ink)",
  padding: "0.5rem 0.85rem",
  borderRadius: "0.3rem",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
};
const secondaryButtonStyle = { ...primaryButtonStyle, border: "1px solid var(--rule)" };

const errorStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  color: "var(--ink)",
  borderInlineStart: "2px solid var(--accent)",
  paddingInlineStart: "0.75rem",
  margin: 0,
  marginBlockStart: "0.5rem",
};

const scoreTableStyle = {
  inlineSize: "100%",
  borderCollapse: "collapse",
  marginBlock: "0.5rem",
};
const scoreTHStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  textAlign: "start",
  padding: "0.35rem 0",
  borderBlockEnd: "1px solid var(--rule)",
};
const scoreRowLabelStyle = {
  textAlign: "start",
  padding: "0.35rem 0",
  fontFamily: "var(--sans)",
  fontWeight: 400,
};
const scoreRowValueStyle = {
  textAlign: "end",
  padding: "0.35rem 0",
  fontFamily: "var(--mono)",
};
const scoreOutOfStyle = { color: "var(--ink-dim)", marginInlineStart: "0.2rem" };

const listStyle = {
  margin: 0,
  paddingInlineStart: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
  lineHeight: 1.5,
};
