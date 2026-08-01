# Expo + Supabase + Auth

An [Expo](https://expo.dev) app with [BNA UI](https://ui.ahmedbna.com) and a
[Supabase](https://supabase.com) backend, with authentication already wired:
email and password, magic links, email OTP, Google, Apple and GitHub — plus
protected routes, an onboarding flow, user profiles and avatar uploads.

Scaffolded with:

```bash
npx bna-ui supabase my-app
```

## Setup

<!-- prettier-ignore -->
1. **Create a project** at [supabase.com/dashboard](https://supabase.com/dashboard).

2. **Add your credentials.** Copy `.env.example` to `.env.local` and fill in the
   URL and publishable key from
   [Settings → API](https://supabase.com/dashboard/project/_/settings/api):

   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
   ```

3. **Apply the migrations.**

   ```bash
   npx supabase link --project-ref your-project-ref
   npm run db:push
   ```

4. **Register your redirect URLs.** In
   [Authentication → URL Configuration](https://supabase.com/dashboard/project/_/auth/url-configuration),
   add both spellings — Expo Go uses the first, a build uses the second:

   ```
   exp://localhost:8081
   my-app://
   my-app://reset-password
   ```

   Without these, OAuth and magic links come back to a rejected redirect. It is
   the most common thing to get wrong here.

5. **Generate types** — do this again after every migration:

   ```bash
   npm run db:types
   ```

6. **Deploy the edge functions.**

   ```bash
   npm run functions:deploy
   ```

7. **Run it.**

   ```bash
   npm start
   ```

Email and password work immediately. See below for the rest.

## Configuring sign-in methods

| Method           | Works out of the box | Needs                                                    |
| ---------------- | -------------------- | -------------------------------------------------------- |
| Email + password | Yes                  | SMTP for the confirmation email — see below              |
| Magic link       | Yes                  | SMTP                                                     |
| Email OTP        | Yes                  | SMTP, and an email template that includes `{{ .Token }}` |
| Google           | No                   | Client ID and secret in Authentication → Providers       |
| Apple            | No                   | A Services ID and a generated client secret              |
| GitHub           | No                   | An OAuth app                                             |

**Email delivery.** Supabase's built-in SMTP is rate-limited to a handful of
messages an hour and is not for production. Configure your own provider under
[Authentication → Emails](https://supabase.com/dashboard/project/_/auth/templates)
before you ship, or sign-ups will silently stop arriving.

Provider walkthroughs: [Google](https://ui.ahmedbna.com/docs/supabase/google),
[Apple](https://ui.ahmedbna.com/docs/supabase/apple),
[email](https://ui.ahmedbna.com/docs/supabase/email).

## What's here

```
lib/
├── supabase.ts             client: encrypted storage, PKCE, AppState refresh
├── large-secure-store.ts   AES-256 wrapper — SecureStore caps values at 2048 bytes
└── database.types.ts       generated; regenerate with `npm run db:types`
providers/
└── auth-provider.tsx       session, user, profile, and the deep-link handler
hooks/
├── useTasks.ts             realtime CRUD, scoped to the signed-in user
├── useProfile.ts           profile updates
└── useAvatarUpload.ts      image → avatars bucket → profiles.avatar_url
app/
├── _layout.tsx             AuthProvider + the Stack.Protected route guards
├── (auth)/
│   ├── sign-in.tsx  sign-up.tsx
│   ├── magic-link.tsx  verify-otp.tsx
│   └── forgot-password.tsx  reset-password.tsx
├── (onboarding)/
│   ├── index.tsx           three-step intro
│   └── profile.tsx         display name + avatar, sets profiles.onboarded
└── (tabs)/
    ├── (home)/index.tsx    live task list
    ├── search/index.tsx    `ilike` query, scoped by RLS
    └── settings/index.tsx  profile, sign out, delete account
components/auth/
├── auth-screen.tsx         shared frame for the (auth) screens
├── oauth-buttons.tsx       Google / Apple / GitHub, browser PKCE
└── sign-out-button.tsx
supabase/
├── migrations/
│   ├── 0001_profiles.sql   profiles, RLS, handle_new_user trigger
│   ├── 0002_tasks.sql      per-user tasks, RLS, realtime
│   └── 0003_storage.sql    avatars + files buckets, owner-scoped policies
└── functions/
    ├── hello-world/        runs as the caller
    └── delete-account/     runs as admin, identifies the caller from their JWT
```

## How the guards work

`app/_layout.tsx` mounts exactly one route group at a time:

```tsx
<Stack.Protected guard={!signedIn}>          {/* (auth) */}
<Stack.Protected guard={needsOnboarding}>    {/* (onboarding) */}
<Stack.Protected guard={signedIn && !needsOnboarding}>  {/* (tabs) */}
```

`Stack.Protected` unmounts the screens whose guard is false, so with no session
there is no navigation path into `(tabs)` — not by deep link either.

That is the convenience layer. The real boundary is row level security: every
policy in `supabase/migrations/` filters on `auth.uid()`, so a modified client
gets nothing it is not entitled to regardless of what the app renders.

## Local development

Everything above works against a hosted project. To run the whole stack on your
machine — Postgres, auth, storage, realtime, Studio, and a mail catcher that
collects every magic link — install [Docker](https://docs.docker.com/desktop/)
and:

```bash
npx supabase start          # Studio at http://localhost:54323
npx supabase db reset       # migrations + seed.sql
npm run db:types:local
```

Point `.env.local` at the URL and key `supabase start` prints. Sign-up emails
land in [Inbucket](http://localhost:54324) instead of a real inbox.

## Before you ship

- Turn email confirmations **on** (`enable_confirmations`), configure real SMTP.
- Add your production scheme to the redirect allow-list.
- Rotate the publishable key if it was ever pasted anywhere public — and check
  no `sb_secret_…` key has reached the app bundle; it bypasses RLS entirely.
- Re-read every policy in `supabase/migrations/` as if you were an attacker
  holding the publishable key, because that is exactly what ships.

Full checklist: [deployment guide](https://ui.ahmedbna.com/docs/supabase/deployment).

## Learn more

- [Starter documentation](https://ui.ahmedbna.com/docs/installation/supabase-auth)
- [Auth architecture](https://ui.ahmedbna.com/docs/supabase/auth) ·
  [Database and RLS](https://ui.ahmedbna.com/docs/supabase/database)
- [Storage](https://ui.ahmedbna.com/docs/supabase/storage) ·
  [Realtime](https://ui.ahmedbna.com/docs/supabase/realtime) ·
  [Edge functions](https://ui.ahmedbna.com/docs/supabase/edge-functions)
- [Troubleshooting](https://ui.ahmedbna.com/docs/supabase/troubleshooting)
- [Supabase documentation](https://supabase.com/docs)
