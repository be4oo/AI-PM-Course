/**
 * Vitest config — course shell test ergonomics.
 *
 * The legacy `src/utils/`, `src/data/` tests are pure-node logic; they
 * default to vitest's node environment. The `src/course/**` and
 * `src/test-utils/**` test files need jsdom, so we set an environment
 * override that flips the environment based on file path.
 *
 * Without this override, every course test has to carry an explicit
 * `@vitest-environment jsdom` pragma — fine for tests that exist today,
 * but fragile for the future. Centralising it here keeps the test contract
 * uniform.
 *
 * Spec refs:
 *   - tasks.md T070 — wires vitest config + adds npm run test:course
 *   - SC-003, SC-004 — viewport/jsdom-driven assertions live here
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environmentMatchGlobs: [
      ["src/course/**", "jsdom"],
      ["src/test-utils/**", "jsdom"],
    ],
  },
});
