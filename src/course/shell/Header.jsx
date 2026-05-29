/**
 * Header — editorial italic-roman wordmark + ⌘K + streak + avatar.
 *
 * Spec refs:
 *   - FR-008: wordmark ("ai" italic copper / hairline divider / "PM" roman cream
 *             in Newsreader), cohort subtitle at viewports ≥ 1024px, ⌘K
 *             command palette trigger, streak chip, avatar — none of which
 *             wrap to a second line at 375/768/1024/1440.
 *   - FR-009: avatar click opens the AccountMenu (T050) with six items.
 *   - SC-003: no horizontal scroll across the four target widths.
 *
 * The header is sized to fit comfortably at 375px AND show a cohort
 * subtitle at ≥1024px. The wordmark + cohort + chip + avatar use logical
 * properties throughout so RTL parity is automatic.
 */

import { useEffect, useRef, useState } from "react";
import { AccountMenu } from "../account/AccountMenu.jsx";

export function Header({
  cohortLabel,
  streakDays,
  onOpenPalette,
  onSelectAccountItem,
  // Mobile chrome (FR-024): a hamburger appears when the sidebar is offscreen
  // (<768px) and an outline toggle when the right rail is offscreen (<1024px).
  // CourseShell owns the drawers; the Header only triggers them.
  showNavButton = false,
  onOpenNav,
  showOutlineButton = false,
  onOpenOutline,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  // Below 1024px the header is a touch surface — enlarge tap targets to ~44px.
  const touch = showNavButton || showOutlineButton;

  // Close the menu on outside click or Esc.
  useEffect(() => {
    if (!menuOpen) return undefined;
    function onDocClick(event) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) setMenuOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isMac =
    typeof navigator !== "undefined" && /mac/i.test(navigator.platform ?? "");
  const paletteShortcutLabel = isMac ? "⌘K" : "Ctrl+K";

  // Cohort subtitle is desktop-only (≥1024px) — compute per render so test
  // viewport changes are honoured, and so the value tracks live resize.
  const showCohort = typeof window === "undefined" ? true : (window.innerWidth ?? 0) >= 1024;

  return (
    <header
      ref={containerRef}
      style={headerStyle}
      data-testid="course-header"
    >
      {/* Lead cluster: mobile hamburger (when sidebar is offscreen) + wordmark. */}
      <div style={leadStyle}>
        {showNavButton ? (
          <button
            type="button"
            onClick={onOpenNav}
            aria-label="Open course navigation"
            data-testid="course-nav-toggle"
            style={iconButtonStyle}
          >
            <span aria-hidden="true" style={glyphStyle}>☰</span>
          </button>
        ) : null}
        <a href="#" style={brandWrapStyle} aria-label="AI PM home">
          <span style={wordmarkStyle} data-testid="course-wordmark">
            <span style={wordmarkAiStyle}>ai</span>
            <span aria-hidden="true" style={wordmarkDividerStyle} />
            <span style={wordmarkPmStyle}>PM</span>
          </span>
          {cohortLabel ? (
            <span
              style={{ ...cohortStyle, display: showCohort ? "inline" : "none" }}
              data-testid="course-cohort"
            >
              {cohortLabel}
            </span>
          ) : null}
        </a>
      </div>

      {/* Right-side cluster */}
      <div style={actionsStyle}>
        {showOutlineButton ? (
          <button
            type="button"
            onClick={onOpenOutline}
            aria-label="Open lesson outline"
            data-testid="course-outline-toggle"
            style={iconButtonStyle}
          >
            <span aria-hidden="true" style={glyphStyle}>≡</span>
          </button>
        ) : null}
        <button
          type="button"
          onClick={onOpenPalette}
          data-testid="course-palette-trigger"
          aria-label="Open command palette"
          style={touch ? { ...paletteTriggerStyle, ...touchTargetStyle } : paletteTriggerStyle}
        >
          <span aria-hidden="true" style={paletteIconStyle}>⌕</span>
          <span style={paletteLabelStyle}>Search</span>
          <kbd style={paletteKbdStyle}>{paletteShortcutLabel}</kbd>
        </button>

        {typeof streakDays === "number" ? (
          <span
            data-testid="course-streak-chip"
            style={streakChipStyle}
            title={`${streakDays}-day streak`}
            aria-label={`${streakDays}-day streak`}
          >
            <span aria-hidden="true" style={streakGlyphStyle}>✦</span>
            {streakDays}
          </span>
        ) : null}

        <div style={avatarWrapStyle}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="course-account-menu"
            data-testid="course-avatar"
            style={touch ? { ...avatarButtonStyle, ...touchTargetStyle } : avatarButtonStyle}
            title="Account"
          >
            <span aria-hidden="true" style={avatarInitialsStyle}>You</span>
          </button>
          {menuOpen ? (
            <div id="course-account-menu" style={menuPopoverStyle}>
              <AccountMenu
                onSelect={(id) => {
                  setMenuOpen(false);
                  onSelectAccountItem?.(id);
                }}
                onDismiss={() => setMenuOpen(false)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/* ===========================================================================
 * Styles — the header is intentionally tight. Three explicit grid cells —
 * brand (auto), spacer (1fr), actions (auto) — let everything stay on one
 * row across 375 / 768 / 1024 / 1440 (FR-008 + SC-003 guarantee).
 *
 * Cohort subtitle hides under 1024 via a CSS-side query expressed inline
 * with a `data-` attribute; for jsdom-driven tests we read the literal
 * presence/absence via window.innerWidth in Header.test.jsx.
 * ========================================================================= */

const headerStyle = {
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: "0.75rem",
  paddingBlock: "0.4rem",
  paddingInline: "0.5rem",
  borderBlockEnd: "1px solid var(--rule)",
  color: "var(--ink)",
  fontFamily: "var(--sans)",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
};

// Lead cluster holds the (mobile-only) hamburger + the wordmark in grid col 1.
const leadStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  minInlineSize: 0,
};
// Touch-target overlay merged onto header buttons below 1024px (WCAG 2.5.5).
const touchTargetStyle = {
  minBlockSize: "44px",
  minInlineSize: "44px",
};
// Square icon button for hamburger / outline toggle.
const iconButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  color: "var(--ink)",
  cursor: "pointer",
  minInlineSize: "44px",
  minBlockSize: "44px",
  display: "inline-grid",
  placeItems: "center",
  flexShrink: 0,
};
const glyphStyle = { fontFamily: "var(--mono)", fontSize: "1.05rem", lineHeight: 1 };

const brandWrapStyle = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "0.65rem",
  textDecoration: "none",
  color: "var(--ink)",
  minInlineSize: 0,
};
const wordmarkStyle = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "0.25rem",
  lineHeight: 1,
};
const wordmarkAiStyle = {
  fontFamily: "var(--serif)",
  fontStyle: "italic",
  color: "var(--accent)",
  fontSize: "1.25rem",
  fontWeight: 400,
};
const wordmarkDividerStyle = {
  display: "inline-block",
  inlineSize: "1px",
  blockSize: "1rem",
  background: "var(--rule)",
  marginInline: "0.15rem",
};
const wordmarkPmStyle = {
  fontFamily: "var(--serif)",
  color: "var(--ink)",
  fontSize: "1.25rem",
  fontWeight: 500,
};

// FR-008: cohort subtitle is desktop-only (≥1024px). The component computes
// the effective `display` per render and merges it into this base style,
// so test viewport changes (and live resizes) are honoured.
const cohortStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
};

const actionsStyle = {
  gridColumn: 3,
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
};

const paletteTriggerStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  borderRadius: "0.3rem",
  color: "var(--ink)",
  padding: "0.3rem 0.55rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
};
const paletteIconStyle = { fontFamily: "var(--mono)", color: "var(--ink-dim)" };
const paletteLabelStyle = { display: "inline" };
const paletteKbdStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  border: "1px solid var(--rule)",
  borderRadius: "0.15rem",
  padding: "0 0.3rem",
  color: "var(--ink-dim)",
};

const streakChipStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontFamily: "var(--mono)",
  fontSize: "0.78rem",
  color: "var(--ink)",
  padding: "0.2rem 0.5rem",
  border: "1px solid var(--rule)",
  borderRadius: "999px",
};
const streakGlyphStyle = { color: "var(--accent)" };

const avatarWrapStyle = { position: "relative" };
const avatarButtonStyle = {
  appearance: "none",
  background: "transparent",
  border: "1px solid var(--rule)",
  borderRadius: "999px",
  color: "var(--ink)",
  padding: "0.25rem 0.55rem",
  cursor: "pointer",
  fontFamily: "var(--sans)",
  fontSize: "0.85rem",
  display: "inline-flex",
  alignItems: "center",
};
const avatarInitialsStyle = { lineHeight: 1, fontWeight: 500 };

const menuPopoverStyle = {
  position: "absolute",
  insetBlockStart: "calc(100% + 0.4rem)",
  insetInlineEnd: 0,
  zIndex: 800,
};
