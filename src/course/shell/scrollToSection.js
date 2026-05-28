/**
 * scrollToSection — smooth scroll to a section anchor with FR-023a downgrade.
 *
 * Spec ref: FR-007 (outline click smooth-scrolls) + FR-023a (reduced motion
 * forces `scroll-behavior: auto`).
 *
 * Kept in its own file (not RightRail.jsx) so React Fast Refresh doesn't
 * complain about non-component exports living next to components.
 */

export function scrollToSection(id, { reduceMotion } = {}) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced =
    reduceMotion ??
    (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}
