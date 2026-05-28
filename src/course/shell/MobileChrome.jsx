/**
 * MobileChrome — narrow-viewport affordances.
 *
 * Spec refs:
 *   - FR-024 (clarified): below 768px the layout MUST collapse to a single
 *     reading column with both the sidebar and outline accessible via toggles.
 *   - FR-022: every interactive element MUST be operable by keyboard alone
 *     with a visible focus ring.
 *   - Edge Case "narrow viewport": Practice rail + account menu remain
 *     reachable in one tap each. Account menu lands in Phase 6 (US4); this
 *     component owns the sidebar + outline toggles only.
 *
 * Structure:
 *   - A header bar pinned to the top of the page with a Menu (☰) button on
 *     the inline-start and an Outline (≡) button on the inline-end.
 *   - Two off-canvas panels, each anchored to its respective inline edge.
 *   - Esc closes the open panel; backdrop click closes it.
 *
 * The component does NOT render the sidebar / outline content itself — it
 * takes them as `sidebar` and `outline` props. CourseShell decides which
 * components fill those slots.
 *
 * Pure presentational state is local (which panel is open); persistence is
 * not required for this v1.
 */

import { useEffect, useRef, useState } from "react";

export function MobileChrome({ sidebar, outline, label = "Course" }) {
  const [openPanel, setOpenPanel] = useState(null); // "sidebar" | "outline" | null
  const lastTriggerRef = useRef(null);

  // Esc closes the open panel and restores focus to the trigger.
  useEffect(() => {
    if (!openPanel) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
        // Restore focus to the trigger if it still exists.
        if (lastTriggerRef.current && document.contains(lastTriggerRef.current)) {
          lastTriggerRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPanel]);

  const open = (panel, event) => {
    lastTriggerRef.current = event?.currentTarget ?? null;
    setOpenPanel(panel);
  };
  const close = () => {
    setOpenPanel(null);
    if (lastTriggerRef.current && document.contains(lastTriggerRef.current)) {
      lastTriggerRef.current.focus();
    }
  };

  return (
    <div data-course-mobile-chrome="" style={hostStyle}>
      <header style={headerStyle} aria-label={`${label} navigation`}>
        <button
          type="button"
          onClick={(e) => open("sidebar", e)}
          aria-expanded={openPanel === "sidebar"}
          aria-controls="course-mobile-sidebar"
          data-testid="course-mobile-hamburger"
          style={triggerButtonStyle}
        >
          <span aria-hidden="true" style={glyphStyle}>☰</span>
          <span style={triggerLabelStyle}>Menu</span>
        </button>
        <span style={titleStyle}>{label}</span>
        <button
          type="button"
          onClick={(e) => open("outline", e)}
          aria-expanded={openPanel === "outline"}
          aria-controls="course-mobile-outline"
          data-testid="course-mobile-outline-toggle"
          style={triggerButtonStyle}
        >
          <span style={triggerLabelStyle}>Outline</span>
          <span aria-hidden="true" style={glyphStyle}>≡</span>
        </button>
      </header>

      {openPanel ? (
        <div
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          style={backdropStyle}
          data-testid="course-mobile-backdrop"
        />
      ) : null}

      <aside
        id="course-mobile-sidebar"
        aria-label="Course navigation"
        aria-hidden={openPanel !== "sidebar"}
        data-testid="course-mobile-sidebar"
        // Off-canvas inline-start. Visually hidden when closed but kept in the
        // DOM so focus order is predictable and screen readers can still find
        // it via aria-controls.
        style={{
          ...panelStyle,
          insetInlineStart: 0,
          transform: openPanel === "sidebar" ? "translateX(0)" : "translateX(-100%)",
          // For RTL: logical translate flips automatically via dir mirroring
          // only if we use logical insets; transform values stay numeric.
          // jsdom doesn't observe layout, so this is purely a cosmetic concern
          // for real browsers.
        }}
      >
        {sidebar}
      </aside>

      <aside
        id="course-mobile-outline"
        aria-label="On this lesson"
        aria-hidden={openPanel !== "outline"}
        data-testid="course-mobile-outline"
        style={{
          ...panelStyle,
          insetInlineEnd: 0,
          transform: openPanel === "outline" ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {outline}
      </aside>
    </div>
  );
}

/* ===========================================================================
 * Styles
 * ========================================================================= */

const hostStyle = {
  position: "relative",
  inlineSize: "100%",
};
const headerStyle = {
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: "0.5rem",
  paddingBlock: "0.5rem",
  paddingInline: "0.75rem",
  borderBlockEnd: "1px solid var(--rule)",
  background: "var(--bg)",
  color: "var(--ink)",
  fontFamily: "var(--sans)",
};
const titleStyle = {
  fontFamily: "var(--display)",
  fontSize: "1rem",
  textAlign: "center",
  color: "var(--ink-dim)",
};
const triggerButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  color: "var(--ink)",
  padding: "0.35rem 0.6rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
};
const triggerLabelStyle = { fontWeight: 500 };
const glyphStyle = { fontFamily: "var(--mono)", lineHeight: 1 };

const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(8, 7, 6, 0.5)",
  backdropFilter: "blur(1px)",
  zIndex: 900,
};

const panelStyle = {
  position: "fixed",
  insetBlockStart: 0,
  insetBlockEnd: 0,
  inlineSize: "min(82vw, 360px)",
  background: "var(--bg-elev)",
  color: "var(--ink)",
  borderInline: "1px solid var(--rule)",
  padding: "1rem",
  overflow: "auto",
  transition: "transform 200ms ease",
  zIndex: 950,
};
