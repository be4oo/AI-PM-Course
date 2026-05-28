/**
 * ShortcutsModal — renders the keyboard contract as a help table.
 *
 * Spec/contract refs:
 *   - FR-019: documented keyboard layer
 *   - contracts/keyboard-shortcuts.md: authoritative for engineering;
 *     this modal is the user-facing list.
 *
 * The mapping below MUST stay in lock-step with the global handler that
 * lands in Phase 7 (T063 / useKeyboardShortcuts). The shortcuts here are
 * grouped by intent for readability; engineering order lives in the
 * keyboard-shortcuts.md contract.
 */

const SHORTCUTS = Object.freeze([
  Object.freeze({ keys: ["⌘K", "Ctrl+K"], action: "Open command palette" }),
  Object.freeze({ keys: ["?"],            action: "Open this help" }),
  Object.freeze({ keys: ["b"],            action: "Toggle bookmark on the current lesson" }),
  Object.freeze({ keys: ["j"],            action: "Go to next lesson (crosses module boundaries)" }),
  Object.freeze({ keys: ["k"],            action: "Go to previous lesson" }),
  Object.freeze({ keys: ["e"],            action: "Toggle Practice disclosure" }),
  Object.freeze({ keys: ["q"],            action: "Toggle Self-test disclosure" }),
  Object.freeze({ keys: ["r"],            action: "Open Adversarial review" }),
  Object.freeze({ keys: ["Esc"],          action: "Close the topmost modal" }),
]);

export function ShortcutsModal({ titleId, label = "Keyboard shortcuts", description, onClose }) {
  return (
    <div>
      <h2 id={titleId} style={titleStyle}>{label}</h2>
      {description ? <p style={subhintStyle}>{description}</p> : null}

      <p style={scopeNoteStyle}>
        Shortcuts fire only when no input or textarea is focused — except <kbd style={kbdStyle}>Esc</kbd>,
        which always closes the topmost modal.
      </p>

      <table style={tableStyle} data-testid="shortcuts-table">
        <thead>
          <tr>
            <th scope="col" style={thStyle}>Keys</th>
            <th scope="col" style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {SHORTCUTS.map((row, i) => (
            <tr key={i} style={trStyle}>
              <th scope="row" style={keysCellStyle}>
                {row.keys.map((k, j) => (
                  <span key={j}>
                    <kbd style={kbdStyle}>{k}</kbd>
                    {j < row.keys.length - 1 ? <span style={kbdSepStyle}> · </span> : null}
                  </span>
                ))}
              </th>
              <td style={actionCellStyle}>{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={actionsRowStyle}>
        <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="shortcuts-close">
          Close
        </button>
      </div>
    </div>
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
const scopeNoteStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
  color: "var(--ink-dim)",
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "0.75rem",
  margin: 0,
  marginBlockEnd: "1rem",
};
const tableStyle = {
  inlineSize: "100%",
  borderCollapse: "collapse",
};
const thStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  textAlign: "start",
  padding: "0.35rem 0",
  borderBlockEnd: "1px solid var(--rule)",
};
const trStyle = { borderBlockEnd: "1px solid var(--rule)" };
const keysCellStyle = {
  textAlign: "start",
  padding: "0.4rem 0",
  fontWeight: 400,
};
const actionCellStyle = {
  padding: "0.4rem 0",
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
};
const kbdStyle = {
  display: "inline-block",
  fontFamily: "var(--mono)",
  fontSize: "0.8rem",
  color: "var(--ink)",
  border: "1px solid var(--rule)",
  borderRadius: "0.2rem",
  padding: "0.1rem 0.4rem",
  background: "transparent",
};
const kbdSepStyle = { color: "var(--ink-dim)" };

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
