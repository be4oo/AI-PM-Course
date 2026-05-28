/**
 * ReadingColumn — center column of the course shell.
 *
 * Spec refs:
 *   - FR-003: serif display title (Newsreader), calm sans body (Geist),
 *             typographic callouts (Takeaways / Leadership note / Case study)
 *             rendered WITHOUT bright accent-fill boxes
 *   - FR-004: module color only as 2px marker (border-inline-start), never as
 *             a background fill
 *   - FR-005: inline lesson actions (bookmark/listen/copy) live in the right rail
 *   - FR-017: single Mark-complete control lives at the bottom of this column
 *             (wired in T035; this v1 just leaves a slot for it)
 *   - FR-026: render every artifact link the lesson supplies (multi-artifact
 *             ordered to match the lesson body order or the artifact array)
 *   - FR-028a: `mena-note` is a first-class block kind, rendered as a
 *             typographic margin-note treatment (not a coloured box)
 *
 * Data shape — the existing curriculum is heterogeneous (`apply`, `quiz`,
 * `keyPoints`, free strings, …). This renderer is intentionally permissive:
 * it accepts a `body` array of blocks whose shape matches data-model.md's
 * RichContent union, AND falls back to rendering the lesson's well-known
 * legacy fields when `body` is missing, so US1 ships even before the
 * curriculum is normalized to the new shape (which is a separate workstream).
 *
 * Pure presentational. State lives in CourseShell / hooks.
 */

import { moduleColor } from "../lib/moduleColor.js";
import { outlineFromLesson, anchorIdFor } from "../lib/outlineFromLesson.js";

export function ReadingColumn({
  lesson,
  module: moduleObj,
  moduleIndex = 0,
  markCompleteSlot,
  className,
}) {
  if (!lesson) {
    return (
      <section
        data-course-reading-column=""
        aria-live="polite"
        className={className}
        style={emptyStyle}
      >
        Select a lesson from the sidebar to begin reading.
      </section>
    );
  }

  // Normalize body. Either a true RichContent array OR derive from legacy fields.
  const body = Array.isArray(lesson.body) ? lesson.body : deriveBodyFromLegacy(lesson);
  const outline = outlineFromLesson({ ...lesson, body });
  const titleAnchor = outline[0]?.id ?? anchorIdFor(lesson.id ?? lesson.title);
  const markerColor = moduleColor(moduleIndex);

  // Every artifact the lesson supplies (FR-026, clarified for multi-artifact).
  const artifacts = collectArtifacts(lesson);

  return (
    <section
      data-course-reading-column=""
      className={className}
      style={readingStyle}
    >
      {/* Title block — module marker is a 2px inline-start rule, never a fill. */}
      <header style={titleHeaderStyle}>
        <p style={moduleEyebrowStyle}>
          <span
            aria-hidden="true"
            style={{
              ...moduleMarkerDotStyle,
              borderInlineStartColor: markerColor,
            }}
          />
          {moduleObj?.name ?? `Module ${moduleIndex + 1}`}
        </p>
        <h1 id={titleAnchor} style={titleStyle}>
          {lesson.title ?? lesson.id ?? "Untitled lesson"}
        </h1>
        {lesson.subtitle ? <p style={subtitleStyle}>{lesson.subtitle}</p> : null}
      </header>

      {/* Body blocks. markerColor is intentionally NOT threaded into Block —
          FR-004 forbids using it as a fill, and block-level callouts use
          --accent / --rule instead. */}
      <div style={bodyStyle}>
        {body.map((block, idx) => (
          <Block key={blockKey(block, idx)} block={block} />
        ))}
      </div>

      {/* Artifact stripe (FR-026). */}
      {artifacts.length > 0 ? (
        <aside aria-label="Lesson artifacts" style={artifactStripeStyle}>
          <p style={artifactStripeLabelStyle}>Artifacts</p>
          <ul style={artifactListStyle}>
            {artifacts.map((art, i) => (
              <li key={`${art.href}-${i}`}>
                <a
                  href={art.href}
                  data-testid="course-artifact-link"
                  style={artifactLinkStyle}
                  {...(isExternal(art.href) ? { target: "_blank", rel: "noreferrer" } : null)}
                >
                  {art.label ?? art.href}
                </a>
                {art.description ? <span style={artifactDescStyle}>{art.description}</span> : null}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {/* Mark-complete affordance slot. FR-017's single completion control lands
          here in T035 — this v1 accepts an injected slot from CourseShell. */}
      {markCompleteSlot ? <footer style={markCompleteFooterStyle}>{markCompleteSlot}</footer> : null}
    </section>
  );
}

/* ===========================================================================
 * Block renderer — covers every RichContent kind PLUS the legacy fields.
 * Coloured fills are intentionally absent: every callout is a typographic
 * treatment (border-inline-start rule, italic pull-quote, marginal note).
 * ========================================================================= */

function Block({ block }) {
  if (!block) return null;
  if (typeof block === "string") return <p style={proseStyle}>{block}</p>;

  const kind = String(block.kind ?? block.type ?? "prose").toLowerCase();
  switch (kind) {
    case "heading":
    case "section":
    case "h2": {
      const id = block.id ?? anchorIdFor(block.label ?? block.text ?? "");
      return (
        <h2 id={id} style={h2Style}>
          {block.label ?? block.heading ?? block.text}
        </h2>
      );
    }
    case "h3": {
      const id = block.id ?? anchorIdFor(block.label ?? block.text ?? "");
      return (
        <h3 id={id} style={h3Style}>
          {block.label ?? block.heading ?? block.text}
        </h3>
      );
    }
    case "prose":
    case "paragraph":
      return <p style={proseStyle}>{block.text ?? block.body ?? ""}</p>;
    case "list":
    case "ul":
      return (
        <ul style={listStyle}>
          {(block.items ?? []).map((item, i) => (
            <li key={i} style={listItemStyle}>{stringFromItem(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol style={listStyle}>
          {(block.items ?? []).map((item, i) => (
            <li key={i} style={listItemStyle}>{stringFromItem(item)}</li>
          ))}
        </ol>
      );

    /* ------- Editorial callouts (typographic, NEVER coloured fills) ------- */
    case "takeaways": {
      const items = block.items ?? [];
      return (
        <section aria-label={block.label ?? "Takeaways"} style={takeawaysStyle}>
          <p style={calloutLabelStyle}>{block.label ?? "Takeaways"}</p>
          <ol style={takeawaysListStyle}>
            {items.map((it, i) => (
              <li key={i} style={takeawayItemStyle}>{stringFromItem(it)}</li>
            ))}
          </ol>
        </section>
      );
    }
    case "leadership-note":
    case "leadership_note":
    case "leadership": {
      // Italic pull-quote treatment with an inline-start hairline rule.
      return (
        <blockquote style={leadershipNoteStyle}>
          <p style={leadershipLabelStyle}>{block.label ?? "Leadership note"}</p>
          <p style={leadershipBodyStyle}>{block.text ?? block.body ?? ""}</p>
        </blockquote>
      );
    }
    case "case-study":
    case "case_study":
    case "casestudy": {
      // Indented marginal note treatment — not a colored box.
      return (
        <aside aria-label="Case study" style={caseStudyStyle}>
          <p style={calloutLabelStyle}>{block.label ?? "Case study"}</p>
          <div>{block.text ?? block.body ?? ""}</div>
        </aside>
      );
    }
    case "mena-note":
    case "mena_note":
    case "mena": {
      // FR-028a: per-lesson Arabic/RTL/MENA context callout.
      // Typographic margin-note treatment; never a colored box.
      return (
        <aside
          data-testid="mena-note"
          aria-label={block.label ?? "MENA context"}
          lang={block.lang ?? undefined}
          dir={block.dir ?? undefined}
          style={menaNoteStyle}
        >
          <p style={calloutLabelStyle}>{block.label ?? "MENA context"}</p>
          <div>{block.text ?? block.body ?? ""}</div>
        </aside>
      );
    }

    case "code":
    case "pre":
      return (
        <pre style={codeBlockStyle}>
          <code>{block.text ?? block.body ?? ""}</code>
        </pre>
      );
    case "image":
    case "figure":
      return (
        <figure style={figureStyle}>
          <img src={block.src} alt={block.alt ?? ""} style={imageStyle} />
          {block.caption ? <figcaption style={captionStyle}>{block.caption}</figcaption> : null}
        </figure>
      );

    case "artifact-link":
    case "artifact": {
      // Inline artifact link inside the body. Multi-artifact rendering also
      // happens in the ArtifactStripe at the bottom; this inline variant
      // exists so authors can place an artifact mid-flow.
      const { href, label, description } = block;
      if (!href) return null;
      return (
        <p style={artifactInlineWrapStyle}>
          <a
            href={href}
            data-testid="course-artifact-link"
            style={artifactLinkStyle}
            {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : null)}
          >
            {label ?? href}
          </a>
          {description ? <span style={artifactDescStyle}>{description}</span> : null}
        </p>
      );
    }

    default:
      // Unknown blocks fall back to plain prose so the page never crashes.
      return <p style={proseStyle}>{stringFromItem(block)}</p>;
  }
}

/* ===========================================================================
 * Helpers
 * ========================================================================= */

function blockKey(block, idx) {
  if (typeof block === "string") return `s-${idx}-${block.slice(0, 12)}`;
  return block.id ?? `${block.kind ?? block.type ?? "b"}-${idx}`;
}

function stringFromItem(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") return item.text ?? item.label ?? "";
  return String(item ?? "");
}

function isExternal(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

/** Collect artifacts from any of the supported lesson shapes. */
function collectArtifacts(lesson) {
  const out = [];
  if (lesson.artifact && lesson.artifact.href) out.push(lesson.artifact);
  if (Array.isArray(lesson.artifacts)) {
    for (const a of lesson.artifacts) if (a && a.href) out.push(a);
  }
  return out;
}

/** Fallback when curriculum hasn't been normalized to the new RichContent shape. */
function deriveBodyFromLegacy(lesson) {
  const body = [];
  if (lesson.summary) body.push({ kind: "prose", text: lesson.summary });
  if (Array.isArray(lesson.keyPoints) && lesson.keyPoints.length > 0) {
    body.push({ kind: "takeaways", label: "Key points", items: lesson.keyPoints });
  }
  if (lesson.content) body.push({ kind: "prose", text: lesson.content });
  return body;
}

/* ===========================================================================
 * Inline styles. Token-bound via CSS variables defined in tokens.css.
 * Inline styles are intentional here — they are *layout-bound to component
 * roles* (e.g., titleStyle) and would not benefit from CSS-module names.
 * No `background[-color]: var(--module-*)` anywhere: ESLint guards this.
 * ========================================================================= */

const readingStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--density-y, 1.5rem)",
  color: "var(--ink, #ece7d8)",
  fontFamily: "var(--sans)",
  fontSize: "1rem",
  lineHeight: 1.6,
};
const emptyStyle = {
  ...readingStyle,
  color: "var(--ink-dim, #b6ad97)",
  fontStyle: "italic",
};

const titleHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  marginBlockEnd: "1rem",
};
const moduleEyebrowStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "var(--ink-dim)",
  fontFamily: "var(--mono)",
  fontSize: "0.75rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  margin: 0,
};
// Module marker: 2px inline-start rule on the eyebrow's leading sigil.
// NEVER a background-color fill (FR-004, ESLint-guarded).
const moduleMarkerDotStyle = {
  display: "inline-block",
  inlineSize: "1.25rem",
  blockSize: "0.75rem",
  borderInlineStart: "2px solid var(--rule)",
};
const titleStyle = {
  fontFamily: "var(--display)",
  fontSize: "clamp(2rem, 4vw, 2.75rem)",
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
  margin: 0,
};
const subtitleStyle = {
  fontFamily: "var(--display)",
  fontStyle: "italic",
  color: "var(--ink-dim)",
  marginTop: "0.5rem",
  fontSize: "1.125rem",
};

const bodyStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--density-y, 1.5rem)",
};

const proseStyle = { margin: 0, fontSize: "1.0625rem", lineHeight: 1.65 };
const h2Style = {
  fontFamily: "var(--display)",
  fontSize: "1.5rem",
  lineHeight: 1.2,
  margin: "0.5rem 0 0",
};
const h3Style = {
  fontFamily: "var(--display)",
  fontSize: "1.125rem",
  lineHeight: 1.2,
  margin: "0.5rem 0 0",
};
const listStyle = {
  margin: 0,
  paddingInlineStart: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};
const listItemStyle = { fontSize: "1.0625rem", lineHeight: 1.6 };

/* ----- Callouts (typographic only) ----- */

const calloutLabelStyle = {
  fontFamily: "var(--mono)",
  fontSize: "0.7rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--ink-dim)",
  margin: 0,
};

const takeawaysStyle = {
  borderInlineStart: "2px solid var(--accent)",
  paddingInlineStart: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};
const takeawaysListStyle = {
  margin: 0,
  paddingInlineStart: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
};
const takeawayItemStyle = { fontSize: "1rem", lineHeight: 1.55 };

const leadershipNoteStyle = {
  margin: 0,
  borderInlineStart: "2px solid var(--rule)",
  paddingInlineStart: "1rem",
  fontStyle: "italic",
  color: "var(--ink-dim)",
};
const leadershipLabelStyle = { ...calloutLabelStyle, marginBottom: "0.25rem" };
const leadershipBodyStyle = {
  fontFamily: "var(--display)",
  fontSize: "1.125rem",
  lineHeight: 1.45,
  margin: 0,
};

const caseStudyStyle = {
  paddingInlineStart: "1rem",
  borderInlineStart: "2px solid var(--rule)",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};

const menaNoteStyle = {
  paddingInlineStart: "1rem",
  borderInlineStart: "2px solid var(--accent)",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};

const codeBlockStyle = {
  margin: 0,
  padding: "1rem",
  borderInlineStart: "2px solid var(--rule)",
  background: "transparent",
  overflowX: "auto",
  fontFamily: "var(--mono)",
  fontSize: "0.9rem",
  lineHeight: 1.5,
};
const figureStyle = { margin: 0 };
const imageStyle = { maxInlineSize: "100%", height: "auto" };
const captionStyle = { color: "var(--ink-dim)", fontStyle: "italic", marginTop: "0.5rem", fontSize: "0.9rem" };

/* ----- Artifacts ----- */

const artifactStripeStyle = {
  marginBlockStart: "1.5rem",
  paddingBlockStart: "1rem",
  borderBlockStart: "1px solid var(--rule)",
};
const artifactStripeLabelStyle = { ...calloutLabelStyle, marginBottom: "0.4rem" };
const artifactListStyle = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" };
const artifactLinkStyle = { color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" };
const artifactDescStyle = { marginInlineStart: "0.5rem", color: "var(--ink-dim)" };
const artifactInlineWrapStyle = { margin: 0, fontSize: "1.0625rem" };

const markCompleteFooterStyle = {
  marginBlockStart: "2rem",
  paddingBlockStart: "1rem",
  borderBlockStart: "1px solid var(--rule)",
};
