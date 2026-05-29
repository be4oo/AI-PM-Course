/**
 * useMediaQuery — subscribe to a CSS media query and return its current match.
 *
 * SSR/jsdom-safe: when `window.matchMedia` is unavailable the hook returns
 * `defaultValue` (so server render + older jsdom don't throw). It re-reads on
 * mount and listens for changes so viewport-tier decisions in CourseShell track
 * live resizes and orientation changes.
 *
 * Used to pick the layout tier (mobile / tablet / desktop) so the shell can
 * surface the sidebar + outline as off-canvas drawers below their inline
 * breakpoints (FR-024).
 */

import { useEffect, useState } from "react";

export function useMediaQuery(query, defaultValue = false) {
  const read = () => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(read);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    // Re-sync immediately in case the query changed between render and effect.
    onChange();
    // Modern browsers: addEventListener; older Safari: addListener fallback.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}
