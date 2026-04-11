import { spawn } from "node:child_process";
import { loadDotEnv } from "./env-loader.mjs";

loadDotEnv();

const required = ["PROMPTFOO_API_KEY", "OPENAI_API_KEY"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const child = spawn(
  "npx",
  ["promptfoo@latest", "eval", "-c", "evals/promptfoo/promptfooconfig.yaml"],
  { stdio: "inherit", env: process.env }
);

child.on("exit", (code) => process.exit(code ?? 1));
