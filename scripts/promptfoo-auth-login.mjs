import { spawn } from "node:child_process";
import { loadDotEnv } from "./env-loader.mjs";

loadDotEnv();

const key = process.env.PROMPTFOO_API_KEY;
if (!key) {
  console.error("Missing PROMPTFOO_API_KEY in .env");
  process.exit(1);
}

const child = spawn(
  "npx",
  ["promptfoo@latest", "auth", "login", "--host", "https://www.promptfoo.app", "--api-key", key],
  { stdio: "inherit", env: process.env }
);

child.on("exit", (code) => process.exit(code ?? 1));
