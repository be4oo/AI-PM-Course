/**
 * Vitest config — merges main's project-split convention with the
 * course-shell test ergonomics from specs/001-course-page-redesign.
 *
 * Three projects:
 *   - "unit"   — node env, default `.test.{js,jsx}` files OUTSIDE
 *                src/course/** + src/test-utils/** (legacy logic tests)
 *   - "dom"    — jsdom env, `.dom.test.{js,jsx}` files (main's convention
 *                for legacy DOM-touching component tests)
 *   - "course" — jsdom env, all `.test.{js,jsx}` under src/course/** and
 *                src/test-utils/** (the editorial-dark course-shell suite)
 *
 * All three share `./vitest.setup.js` so @testing-library/jest-dom
 * matchers + cleanup work identically across projects.
 *
 * Spec refs:
 *   - tasks.md T070 — vitest config wiring + npm run test:course
 *   - SC-003, SC-004 — viewport / jsdom assertions live in the course suite
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{js,jsx}"],
          exclude: [
            "src/**/*.dom.test.{js,jsx}",
            "src/course/**",
            "src/test-utils/**",
          ],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          include: ["src/**/*.dom.test.{js,jsx}"],
          environment: "jsdom",
          setupFiles: ["./vitest.setup.js"],
        },
      },
      {
        extends: true,
        test: {
          name: "course",
          include: [
            "src/course/**/*.test.{js,jsx}",
            "src/test-utils/**/*.test.{js,jsx}",
          ],
          environment: "jsdom",
          setupFiles: ["./vitest.setup.js"],
        },
      },
    ],
  },
});
