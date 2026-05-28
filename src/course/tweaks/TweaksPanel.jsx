/**
 * TweaksPanel — accent / display / density controls.
 *
 * Spec refs:
 *   - FR-025: exactly four enumerated accent variants (copper, sage, ink-blue,
 *             iron); two display options (serif, sans); two density options
 *             (roomy, compact).
 *   - Plan R3: tokens.css drives the live swap; this component is a thin UI
 *             over the existing CSS variables.
 *
 * The panel does NOT own state — `tweaks` and `setTweaks` flow in from
 * CourseShell's `useTweaks` hook. This keeps the live-swap path single-sourced.
 */

import {
  ACCENT_VARIANTS,
  ACCENT_VARIANT_IDS,
  DISPLAY_OPTIONS,
  DENSITY_OPTIONS,
} from "../lib/designTokens.js";

const DISPLAY_LABELS = Object.freeze({
  serif: "Serif (Newsreader)",
  sans:  "Sans (Geist)",
});
const DENSITY_LABELS = Object.freeze({
  roomy:   "Roomy",
  compact: "Compact",
});

export function TweaksPanel({
  titleId,
  label = "Display & settings",
  description,
  tweaks,
  onChange,
  onClose,
}) {
  const current = tweaks ?? { accent: "copper", display: "serif", density: "roomy" };

  return (
    <div>
      <h2 id={titleId} style={titleStyle}>{label}</h2>
      {description ? <p style={subhintStyle}>{description}</p> : null}

      <Group label="Accent" testid="tweaks-accent-group">
        <div role="radiogroup" aria-label="Accent" style={swatchRowStyle}>
          {ACCENT_VARIANT_IDS.map((id) => {
            const v = ACCENT_VARIANTS[id];
            const active = current.accent === id;
            return (
              <button
                type="button"
                key={id}
                role="radio"
                aria-checked={active}
                onClick={() => onChange?.({ accent: id })}
                data-testid={`tweaks-accent-${id}`}
                title={v.label}
                style={{
                  ...swatchStyle,
                  ...(active ? swatchActiveStyle : null),
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    ...swatchDotStyle,
                    // Sole place where a swatch shows the actual color: this is
                    // a *swatch* (a UI affordance for selecting the accent),
                    // not a *module marker*, so FR-004 does not apply.
                    background: v.value,
                  }}
                />
                <span style={swatchLabelStyle}>{v.label}</span>
              </button>
            );
          })}
        </div>
      </Group>

      <Group label="Display typeface" testid="tweaks-display-group">
        <div role="radiogroup" aria-label="Display typeface" style={pillRowStyle}>
          {DISPLAY_OPTIONS.map((id) => {
            const active = current.display === id;
            return (
              <button
                type="button"
                key={id}
                role="radio"
                aria-checked={active}
                onClick={() => onChange?.({ display: id })}
                data-testid={`tweaks-display-${id}`}
                style={active ? pillActiveStyle : pillStyle}
              >
                {DISPLAY_LABELS[id]}
              </button>
            );
          })}
        </div>
      </Group>

      <Group label="Density" testid="tweaks-density-group">
        <div role="radiogroup" aria-label="Density" style={pillRowStyle}>
          {DENSITY_OPTIONS.map((id) => {
            const active = current.density === id;
            return (
              <button
                type="button"
                key={id}
                role="radio"
                aria-checked={active}
                onClick={() => onChange?.({ density: id })}
                data-testid={`tweaks-density-${id}`}
                style={active ? pillActiveStyle : pillStyle}
              >
                {DENSITY_LABELS[id]}
              </button>
            );
          })}
        </div>
      </Group>

      <p style={hintStyle}>Changes apply live and persist on this device.</p>

      <div style={actionsRowStyle}>
        <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="tweaks-close">
          Done
        </button>
      </div>
    </div>
  );
}

function Group({ label, testid, children }) {
  return (
    <section style={groupStyle} data-testid={testid}>
      <p style={groupLabelStyle}>{label}</p>
      {children}
    </section>
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

const groupStyle = { marginBlockEnd: "1rem" };
const groupLabelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
  marginBottom: "0.5rem",
};

const swatchRowStyle = { display: "flex", flexWrap: "wrap", gap: "0.4rem" };
const swatchStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink-dim)",
  borderRadius: "999px",
  padding: "0.3rem 0.6rem 0.3rem 0.4rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
};
const swatchActiveStyle = {
  borderColor: "var(--accent)",
  color: "var(--ink)",
};
const swatchDotStyle = {
  inlineSize: "0.65rem",
  blockSize: "0.65rem",
  borderRadius: "999px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};
const swatchLabelStyle = { fontFamily: "var(--sans)" };

const pillRowStyle = { display: "inline-flex", gap: "0.3rem" };
const pillBaseStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  color: "var(--ink-dim)",
  padding: "0.3rem 0.7rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontFamily: "var(--mono)",
  fontSize: "0.8rem",
};
const pillStyle = { ...pillBaseStyle };
const pillActiveStyle = {
  ...pillBaseStyle,
  borderColor: "var(--accent)",
  color: "var(--ink)",
};

const hintStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
  color: "var(--ink-dim)",
  margin: 0,
  marginBlockStart: "0.5rem",
};
const actionsRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
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
