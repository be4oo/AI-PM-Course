import { loadDotEnv } from "./env-loader.mjs";

loadDotEnv();

const required = [
  "LANGFUSE_PUBLIC_KEY",
  "LANGFUSE_SECRET_KEY",
  "LANGFUSE_BASE_URL",
];

const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  console.error("Copy observability/langfuse/langfuse.env.example and set values first.");
  process.exit(1);
}

const payload = {
  name: "ai-pm-course-smoke-test",
  input: { check: "langfuse connectivity" },
  output: { status: "ok" },
  metadata: { source: "ai-pm-course", timestamp: new Date().toISOString() },
};

const response = await fetch(`${process.env.LANGFUSE_BASE_URL}/api/public/traces`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
      `${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`
    ).toString("base64")}`,
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const text = await response.text();
  console.error(`Langfuse smoke test failed (${response.status}): ${text}`);
  process.exit(1);
}

console.log("Langfuse smoke test passed.");
