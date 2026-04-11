import { spawn } from "node:child_process";
import { loadDotEnv } from "./env-loader.mjs";

loadDotEnv();

const hasGeminiKey = !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY);
if (!process.env.GOOGLE_API_KEY && process.env.GEMINI_API_KEY) {
  process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
}

const required = ["PROMPTFOO_API_KEY"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length || !hasGeminiKey) {
  const missingList = [...missing];
  if (!hasGeminiKey) missingList.push("GOOGLE_API_KEY (or GEMINI_API_KEY)");
  console.error(`Missing env vars: ${missingList.join(", ")}`);
  process.exit(1);
}

const child = spawn(
  "npx",
  ["promptfoo@latest", "eval", "-c", "evals/promptfoo/promptfooconfig.yaml"],
  { stdio: "inherit", env: process.env }
);

child.on("exit", (code) => process.exit(code ?? 1));
