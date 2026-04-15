# GFL BGMI League MVP (Next.js + TypeScript)

Production-style, mobile-first esports MVP for **GFL (Gand Faad League)**.

## Included
- Home page with hype hero, countdown switch logic, highlights, featured captains, announcements, AI host panel.
- Auth scaffolding (signup/login/forgot) with mock local auth state and email verification indicator.
- Player dashboard + profile editor.
- Tournament overview + schedule + FAQ.
- Draft auction engine (mode A) with state transitions and captain turn flow.
- Admin controls scaffold.
- Backend-ready TypeScript models and SQL schema suggestions.

## Time Logic (IST)
- Website Launch: `2026-04-15T18:00:00+05:30`
- Tournament Start: `2026-04-18T21:00:00+05:30`

The countdown automatically transitions:
`website_launch -> tournament_start -> live`.

## Run
```bash
npm install
npm run dev
```

## Architecture Notes
- Components are grouped by domain (`home`, `auction`, `auth`, `profile`, `tournament`, `layout`).
- `lib/services` contains business logic (countdown, auction state machine, auth utilities).
- `lib/data/mock.ts` provides realistic BGMI demo seeds.
- `lib/data/schema.sql` provides backend DB starter schema.

## Backend Upgrade Path
1. Replace `lib/services/auth.ts` with Supabase Auth/Firebase Auth.
2. Store auction runtime in realtime DB table + subscriptions.
3. Add server actions for admin mutations and announcements.
4. Connect AI Host panel to LLM API endpoint for live commentary.
