/**
 * Test-only helpers for ToolModal.
 *
 * Co-located with `ToolModal.jsx` but in a non-component file so React Fast
 * Refresh doesn't complain about mixed exports. The module-level counter
 * lives here — `ToolModal.jsx` imports the mutators it needs.
 */

let __OPEN_MODAL_COUNT = 0;

export function bumpOpenModalCount() {
  __OPEN_MODAL_COUNT += 1;
  return __OPEN_MODAL_COUNT;
}

export function decrementOpenModalCount() {
  __OPEN_MODAL_COUNT = Math.max(0, __OPEN_MODAL_COUNT - 1);
  return __OPEN_MODAL_COUNT;
}

/** Read-only access for tests. */
export function getOpenModalCount() {
  return __OPEN_MODAL_COUNT;
}

/** Test cleanup between cases. */
export function resetOpenModalCount() {
  __OPEN_MODAL_COUNT = 0;
}
