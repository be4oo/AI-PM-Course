// Shared responsive maxWidth helper for top-level views. Wraps the desired
// pixel width in a CSS min() so narrow viewports (mobile) get 95vw instead of
// overflowing.
export function responsiveMaxWidth(px) {
  return `min(${px}px, 95vw)`;
}
