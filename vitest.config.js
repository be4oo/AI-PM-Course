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
          exclude: ["src/**/*.dom.test.{js,jsx}"],
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
    ],
  },
});
