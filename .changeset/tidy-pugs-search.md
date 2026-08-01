---
'bna-ui': minor
---

Add `bna-ui supabase`, which scaffolds an Expo app with a Supabase backend.

Two new starters, mirroring the Convex pair. `npx bna-ui supabase my-app` gives
you the auth variant — password, magic link, email OTP, and Google, Apple and
GitHub over browser PKCE — with protected route groups, an onboarding flow, user
profiles, avatar uploads and an account-deletion edge function.
`--no-auth` gives you the backend only: migrations, realtime, storage and an
edge function.

Both ship SQL migrations with row level security on every table, generated
database types, a jest setup, and a GitHub Actions workflow that typechecks,
tests, catches type drift against the migrations, deploys migrations and
functions, and kicks off an EAS build.

After copying files the command prompts for a project URL and publishable key,
writes `.env.local`, and then links the project, applies migrations and
generates types — but only if the Supabase CLI is installed. Without it, those
commands are printed as next steps instead.

Also fixes two pre-existing crashes in every scaffold: `expo-router` 57 removed
the top-level `Icon`, `Label`, `Badge` and `VectorIcon` exports from
`unstable-native-tabs` (they are statics on `NativeTabs.Trigger` now), and
`expo-navigation-bar` 57 replaced `setButtonStyleAsync` with `setStyle`. Both
threw at runtime.
