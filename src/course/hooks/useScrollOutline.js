/**
 * useScrollOutline — track which lesson section is currently in view.
 *
 * Spec/plan refs:
 *   - FR-005 right rail scroll-tracking outline
 *   - Plan R2: IntersectionObserver with rootMargin "-30% 0% -65% 0%"
 *   - SC-004 / User Story 1 #2: outline updates within 200ms of heading
 *     crossing viewport's top third
 *
 * Strategy:
 *   - State holds whichever section the IntersectionObserver last reported as
 *     entering the active band. Updates happen inside the observer callback
 *     (external system → React), never synchronously inside the effect body.
 *   - At render time we derive an "effective id": if the stored id is still
 *     in `entries`, use it; otherwise fall back to the first entry. This
 *     handles the entries-changed case without a state-syncing effect.
 *   - rootMargin `-30% 0% -65% 0%` yields a top-third active stripe.
 */

import { useEffect, useState } from "react";

const DEFAULT_ROOT_MARGIN = "-30% 0% -65% 0%";

/**
 * @param {object} params
 * @param {Array<{ id: string }>} params.entries
 * @param {HTMLElement | null} [params.root]
 * @param {string} [params.rootMargin]
 * @returns {string | null}
 */
export function useScrollOutline({ entries, root = null, rootMargin = DEFAULT_ROOT_MARGIN }) {
  const [observedId, setObservedId] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;
    if (!entries || entries.length === 0) return undefined;

    const elements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const visible = new Set();
    const orderedIds = entries.map((e) => e.id);

    const observer = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) visible.add(r.target.id);
          else                  visible.delete(r.target.id);
        }
        if (visible.size === 0) return; // keep previous active between sections
        const inView = orderedIds.filter((id) => visible.has(id));
        const next = inView[inView.length - 1] ?? orderedIds[0];
        // Setter inside an asynchronous browser callback — not synchronous
        // inside the effect body, so the react-hooks rule is satisfied.
        setObservedId((prev) => (prev === next ? prev : next));
      },
      { root, rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries, root, rootMargin]);

  // Derive the effective id at render time so entries-changes don't require
  // an extra state-syncing effect.
  if (!entries || entries.length === 0) return null;
  if (observedId !== null && entries.some((e) => e.id === observedId)) return observedId;
  return entries[0].id;
}
