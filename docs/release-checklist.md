# Release Checklist

Last updated: April 11, 2026

## Goal
Prevent stale bundle regressions by verifying that the deployed GitHub Pages build matches the latest commit and that browser caches are not serving old assets.

## Pre-Release

1. Confirm branch and commit
- Ensure deployment workflow is triggered from `main`.
- Record commit SHA in release notes.

2. Validate local build integrity
- Run `npm run lint`.
- Run `npm run build`.
- Confirm fresh hashed assets are generated under `dist/assets/`.

3. Review risky runtime changes
- Verify new constants/imports are referenced safely.
- Verify lesson navigation paths in `src/App.jsx` for scroll logic changes.

## Deployment Verification

1. Confirm GitHub Actions success
- Check `Deploy to GitHub Pages` workflow status is green.
- Ensure workflow run references the expected commit SHA.

2. Validate bundle hash freshness
- Open deployed `index.html` source.
- Confirm script/style hash filenames match the latest deployment artifact pattern.
- If hashes do not change after code changes, stop and inspect build output and workflow cache settings.

3. Runtime smoke checks
- Open the course page in normal window and incognito.
- Verify:
  - lesson load succeeds
  - no `ReferenceError` in app bundle
  - lesson navigation behavior is correct
  - "Back to top" appears only after scrolling down

## Cache-Busting Recovery Steps

If deployed page still serves stale assets:

1. Hard refresh browser cache
- macOS: `Cmd + Shift + R`

2. Force a cache-bust deploy
- Make a no-op commit with message `chore: force pages cache refresh`.
- Push to `main` and rerun deploy.

3. Validate service worker status
- If a service worker is ever introduced, ensure old worker is unregistered before release.

4. Verify CDN propagation
- Wait 2 to 5 minutes and reload in incognito.

## Release Sign-Off

Mark release complete only when all are true:
- Deploy workflow passed
- Deployed hash set matches latest artifact generation
- No app runtime reference errors
- Core navigation smoke tests passed
