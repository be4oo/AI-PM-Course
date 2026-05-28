/**
 * ImportProgressModal — drag/drop or browse a progress JSON, validate, apply.
 *
 * Spec/contract refs:
 *   - FR-010: Import progress MUST accept drag-and-drop or browse upload of
 *             the export JSON shape and apply it to the in-app state.
 *   - Edge Case: malformed JSON → reject with human-readable error, leave
 *                state untouched.
 *   - Edge Case: imported progress references unknown lesson IDs → ignore
 *                with a count surfaced in the import summary; known IDs are
 *                applied.
 *   - SC-005: round-trip equality (proved via progressSnapshot tests in T022).
 *
 * The modal does NOT mutate global state directly. It validates the file,
 * shows the dropped-IDs count, then on confirm calls `onApply(state)` with
 * the parsed `LearnerState`. CourseShell owns the actual state writes.
 */

import { useState, useRef } from "react";
import { parseSnapshot } from "../lib/progressSnapshot.js";

export function ImportProgressModal({
  titleId,
  label = "Import progress",
  description,
  /** Set<string> of valid lesson IDs in the current curriculum, for unknown-id detection. */
  knownLessonIds,
  /** Called with the parsed LearnerState when the user confirms. */
  onApply,
  onClose,
}) {
  const [phase, setPhase] = useState("drop"); // drop | preview | error | applied
  const [result, setResult] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setFileName(file.name || "");
    let text;
    try {
      text = await file.text();
    } catch (err) {
      setErrorText(`Could not read the file: ${err.message}`);
      setPhase("error");
      return;
    }
    const parsed = parseSnapshot(text, { knownLessonIds });
    if (!parsed.ok) {
      setErrorText(parsed.error ?? "The file is not a valid course progress export.");
      setPhase("error");
      return;
    }
    setResult(parsed);
    setPhase("preview");
  }

  function onDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  }
  function onPickFromInput(e) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }
  function applyAndClose() {
    if (!result?.ok) return;
    onApply?.(result.state);
    setPhase("applied");
  }
  function reset() {
    setResult(null);
    setErrorText("");
    setFileName("");
    setPhase("drop");
  }

  /* ===== applied confirmation ===== */
  if (phase === "applied") {
    return (
      <div>
        <h2 id={titleId} style={titleStyle}>{label}</h2>
        <p style={confirmStyle} data-testid="import-applied">
          Progress imported. {result?.droppedLessons > 0
            ? `${result.droppedLessons} unknown lesson${result.droppedLessons === 1 ? "" : "s"} were dropped.`
            : ""}
        </p>
        <div style={actionsRowStyle}>
          <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="import-close">
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ===== preview / confirm ===== */
  if (phase === "preview" && result?.ok) {
    const { state, droppedLessons } = result;
    return (
      <div>
        <h2 id={titleId} style={titleStyle}>{label} · preview</h2>
        <p style={subhintStyle}>
          {fileName ? <span style={{ fontStyle: "normal" }}>{fileName}</span> : "Selected file"}
          {" "}is ready to apply.
        </p>

        <dl style={previewListStyle} data-testid="import-preview">
          <PreviewRow term="Completed lessons" desc={`${state.completedLessonIds.length}`} />
          <PreviewRow term="Bookmarks" desc={`${state.bookmarkedLessonIds.length}`} />
          <PreviewRow term="Last read" desc={state.lastReadLessonId ?? "—"} />
          <PreviewRow term="Study mode" desc={state.studyMode} />
          <PreviewRow term="Streak (current / best)" desc={`${state.streak.current} / ${state.streak.best}`} />
          <PreviewRow term="Accent" desc={state.tweaks.accent} />
          {droppedLessons > 0 ? (
            <PreviewRow
              term="Unknown lessons"
              desc={`${droppedLessons} dropped`}
              hint="Lesson IDs in the file that no longer exist in this build."
              testid="import-dropped-count"
            />
          ) : null}
        </dl>

        <div style={actionsRowStyle}>
          <button type="button" onClick={reset} style={secondaryButtonStyle} data-testid="import-cancel">
            Pick another file
          </button>
          <button type="button" onClick={applyAndClose} style={primaryButtonStyle} data-testid="import-confirm">
            Apply
          </button>
        </div>
      </div>
    );
  }

  /* ===== error ===== */
  if (phase === "error") {
    return (
      <div>
        <h2 id={titleId} style={titleStyle}>{label}</h2>
        <p role="alert" style={errorStyle} data-testid="import-error">
          {errorText}
        </p>
        <p style={subhintStyle}>Your existing progress has NOT been touched.</p>
        <div style={actionsRowStyle}>
          <button type="button" onClick={reset} style={secondaryButtonStyle} data-testid="import-retry">
            Try again
          </button>
          <button type="button" onClick={onClose} style={primaryButtonStyle} data-testid="import-close">
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ===== drop / browse ===== */
  return (
    <div>
      <h2 id={titleId} style={titleStyle}>{label}</h2>
      {description ? <p style={subhintStyle}>{description}</p> : null}

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
        style={isDragOver ? dropZoneActiveStyle : dropZoneStyle}
        data-testid="import-dropzone"
      >
        <p style={dropPromptStyle}>Drag a progress JSON here</p>
        <p style={dropSeparatorStyle}>or</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={primaryButtonStyle}
          data-testid="import-browse"
        >
          Browse for a file
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          onChange={onPickFromInput}
          style={{ display: "none" }}
          data-testid="import-file-input"
        />
      </div>

      <div style={actionsRowStyle}>
        <button type="button" onClick={onClose} style={secondaryButtonStyle} data-testid="import-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}

function PreviewRow({ term, desc, hint, testid }) {
  return (
    <div style={previewRowStyle} data-testid={testid}>
      <dt style={previewTermStyle}>{term}</dt>
      <dd style={previewDescStyle}>
        {desc}
        {hint ? <span style={previewHintStyle}> · {hint}</span> : null}
      </dd>
    </div>
  );
}

/* ===== styles ===== */

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
const confirmStyle = {
  fontFamily: "var(--sans)",
  fontSize: "1rem",
  color: "var(--ink)",
  borderInlineStart: "2px solid var(--accent)",
  paddingInlineStart: "0.75rem",
  margin: 0,
  marginBlockEnd: "1rem",
};
const errorStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.95rem",
  color: "var(--ink)",
  borderInlineStart: "2px solid var(--accent)",
  paddingInlineStart: "0.75rem",
  margin: 0,
  marginBlockEnd: "0.5rem",
};

const dropZoneStyle = {
  border: "1px dashed var(--rule)",
  borderRadius: "0.4rem",
  padding: "1.5rem",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
  marginBlock: "1rem",
};
const dropZoneActiveStyle = {
  ...dropZoneStyle,
  borderColor: "var(--accent)",
};
const dropPromptStyle = {
  fontFamily: "var(--sans)",
  fontSize: "1rem",
  margin: 0,
  color: "var(--ink)",
};
const dropSeparatorStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  color: "var(--ink-dim)",
  margin: 0,
};

const previewListStyle = {
  marginBlock: "0.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
};
const previewRowStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 0.45fr) minmax(0, 1fr)",
  gap: "0.5rem",
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "0.75rem",
  paddingBlock: "0.25rem",
};
const previewTermStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  color: "var(--ink-dim)",
  margin: 0,
};
const previewDescStyle = {
  fontFamily: "var(--sans)",
  fontSize: "0.9rem",
  margin: 0,
};
const previewHintStyle = { color: "var(--ink-dim)" };

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
