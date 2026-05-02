# 5A Framework — Screen Monitoring → Workflow Automation

**Date**: 2026-05-02
**Feature**: Passive screen observation → AI-inferred automation generation

---

## A1 Assess

Knowledge workers spend 2–4 hours/day on repetitive multi-app sequences (e.g., copy data from email → paste into CRM → update spreadsheet) that they have never documented because scripting traditional RPA requires manual effort they don't have. AI is the right fit because the pattern recognition required to infer those sequences from raw screen recordings is non-deterministic — rule-based RPA requires manual scripting, which is exactly the bottleneck we are solving. The cost of being wrong is generating an automation that corrupts data or skips steps silently, which can cause more damage than no automation at all.

---

## A2 Architect

Model routing: a vision-capable model (Gemini 1.5 Pro or Claude 3.5) handles screen recording analysis and step extraction; a code generation model handles automation script output. Context strategy: each inference window contains the last N recorded screen steps as structured action objects — no full video is passed, only extracted intent events (click target, typed value, app context) to keep token cost bounded. HITL boundary: the AI proposes the automation and a human approves it before the first execution; after 3 successful unmodified runs the automation may execute unattended, and any destructive action (delete, overwrite) always requires explicit confirmation regardless of run count.

---

## A3 Acquire

Data needed: screen recordings segmented into action events (click, type, navigate) enriched with app context metadata (window title, URL, field name); this is captured by a lightweight desktop agent the employee installs with explicit opt-in consent. Tools: screen capture SDK (ScreenPipe or a custom Electron agent) for recording, a vision LLM for step extraction, and n8n or Power Automate as the execution runtime for the generated workflows. Skills required: prompt engineering for action extraction and code generation, UX design for the consent and human-review flow, and data privacy expertise to ensure recordings are processed locally and never stored on a central server without user control.

---

## A4 Assemble

MVP scope: record one complete workflow per session (e.g., employee processes a new order — opens email, copies order ID, enters it into CRM), extract the discrete steps, and generate a single n8n workflow JSON that replicates the sequence end-to-end. Guardrails: the automation cannot execute destructive actions (delete, overwrite, send) without explicit human confirmation; all generated scripts are previewed in plain language before the first run, and a one-click rollback is available for any automation that has run fewer than 5 times. Eval setup: manual review of the first 20 generated automations by the PM and one engineer, scoring step accuracy and completeness before any wider rollout.

---

## A5 Assess (ongoing)

Weekly metrics: automation accuracy rate (steps generated correctly / total steps ≥ 90%), time-to-first-automation per new user (target < 20 minutes), and human override rate (target < 20% — if users are correcting the AI more than 1 in 5 times, the extraction prompt or model needs work). Regression cadence: run the 20-automation eval suite after every model upgrade or prompt change; a drop of more than 5 percentage points in accuracy blocks the release. Refresh cadence: retrain or tune the step-extraction prompt monthly using override corrections as the primary signal, and re-audit the full opportunity landscape score quarterly as the product matures.
