# Persistence Modes: Local vs Cloud

Last updated: April 11, 2026

## Local Mode (Current)

- Runtime: GitHub Pages + browser/local storage
- Benefits:
  - zero backend setup
  - fast iteration
  - privacy by default on learner device
- Limits:
  - no cross-device sync
  - no multi-user cohort analytics
  - local data can be lost if browser storage is cleared

## Cloud Mode (Planned)

- Runtime: Supabase Auth + Postgres + optional storage buckets
- Benefits:
  - cross-device progress sync
  - cohort and reviewer workflows
  - admin analytics and readiness dashboards
- Additional responsibilities:
  - authentication and session management
  - RLS policies
  - migration and backup policies

## Switching Strategy

1. Keep local snapshot export/import active as fallback.
2. Introduce login without removing local mode.
3. Add server-side progress sync for authenticated users.
4. Keep a migration layer that ingests local v2 snapshots.
