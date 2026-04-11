# Persistence Schema (Supabase-Ready)

Last updated: April 11, 2026

## Purpose

Define a forward-compatible domain model for login and cross-device learning persistence.

## Tables

### `users`
- `id` UUID primary key
- `email` text unique not null
- `name` text
- `role` text check in (`learner`, `reviewer`, `admin`)
- `created_at` timestamptz default now()

### `progress`
- `id` UUID primary key
- `user_id` UUID references `users(id)` not null
- `active_module` integer not null default 0
- `active_lesson` integer not null default 0
- `study_mode` text not null default `deep`
- `streak_days` integer not null default 0
- `updated_at` timestamptz default now()

### `lesson_states`
- `id` UUID primary key
- `user_id` UUID references `users(id)` not null
- `lesson_key` text not null
- `state` text check in (`Unread`, `Read`, `Practiced`, `Artifact completed`, `Reviewed`)
- `artifact_checklist` jsonb not null default `[]`
- `weak_concept` boolean not null default false
- `updated_at` timestamptz default now()
- unique (`user_id`, `lesson_key`)

### `artifacts`
- `id` UUID primary key
- `user_id` UUID references `users(id)` not null
- `lesson_key` text not null
- `path` text not null
- `status` text check in (`draft`, `review_ready`, `approved`) default `draft`
- `evidence` jsonb default `{}`
- `updated_at` timestamptz default now()

### `reviews`
- `id` UUID primary key
- `user_id` UUID references `users(id)` not null
- `lesson_key` text not null
- `review_type` text check in (`weekly`, `cohort`, `capstone`)
- `evidence` text
- `status` text check in (`pending`, `complete`) default `pending`
- `created_at` timestamptz default now()

### `cohort_memberships`
- `id` UUID primary key
- `user_id` UUID references `users(id)` not null
- `cohort_id` text not null
- `status` text check in (`active`, `paused`, `completed`) default `active`
- `joined_at` timestamptz default now()

### `capstone_submissions`
- `id` UUID primary key
- `user_id` UUID references `users(id)` not null
- `readiness_score` integer not null default 0
- `checklist` jsonb not null default `{}`
- `reviewer_notes` text
- `submitted_at` timestamptz
- `updated_at` timestamptz default now()

## API Contract Snapshot

### `GET /api/progress`
Returns:
- active module/lesson
- study mode
- streak
- lesson states map
- artifact checklist map
- weak concept queue

### `POST /api/progress/import`
Input:
- versioned progress JSON payload

Behavior:
- validate schema version
- reject malformed payload
- write partial updates atomically

### `POST /api/artifacts`
Input:
- `lesson_key`
- `path`
- optional evidence payload

Behavior:
- upsert artifact per lesson and user

## Migration Notes

- Current local-storage snapshot is schema version `2`.
- Server ingestion should accept v2 and map fields 1:1 where possible.
- New fields must be additive and backwards compatible.
