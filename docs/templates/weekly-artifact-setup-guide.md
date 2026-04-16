# Weekly Artifact CI Setup Guide

## Goal
Enforce the weekly artifact system with clear diagnostics:
- decision memo
- working build
- eval report
- retrospective

## Files
- Workflow: `/docs/ci/weekly-artifact-check.yml`
- Verifier: `/docs/ci/verify-artifacts.js`
- Example manifest: `/docs/ci/artifact-manifest.example.json`

## Step 1: Copy the Workflow
Copy `docs/ci/weekly-artifact-check.yml` into `.github/workflows/weekly-artifact-check.yml`.

## Step 2: Create Your Manifest
Copy `docs/ci/artifact-manifest.example.json` to `docs/ci/artifact-manifest.json` and update paths.

## Step 3: Start in Advisory Mode
Run verifier with:
`node docs/ci/verify-artifacts.js --manifest docs/ci/artifact-manifest.json --mode advisory`

Advisory mode warns but does not fail CI.

## Step 4: Switch to Strict Mode
After one stable week, switch to:
`--mode strict`

Strict mode fails CI when required artifacts are missing.

## First Push Troubleshooting
- "Manifest not found": create `docs/ci/artifact-manifest.json`.
- "Artifact missing": verify file path and commit status.
- "Invalid manifest": check JSON syntax and required fields.

