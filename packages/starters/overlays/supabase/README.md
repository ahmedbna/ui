# Expo + Supabase

An [Expo](https://expo.dev) app with [BNA UI](https://ui.ahmedbna.com) and a
[Supabase](https://supabase.com) backend — Postgres with row level security,
realtime subscriptions, file storage and an edge function. No sign-in.

Scaffolded with:

```bash
npx bna-ui supabase my-app --no-auth
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

4. **Generate types** — do this again after every migration:

   ```bash
   npm run db:types
   ```

5. **Deploy the edge function** (optional; the settings tab calls it):

   ```bash
   npm run functions:deploy
   ```

6. **Run it.**

   ```bash
   npm start
   ```

## What's here

```
lib/
├── supabase.ts          the client — no session, so nothing is persisted
└── database.types.ts    generated; regenerate with `npm run db:types`
hooks/
├── useTasks.ts          select + postgres_changes subscription + optimistic CRUD
└── useUpload.ts         file URI → ArrayBuffer → storage → public URL
app/(tabs)/
├── (home)/index.tsx     live task list
├── search/index.tsx     `ilike` query against Postgres
└── settings/index.tsx   storage upload + edge function
supabase/
├── config.toml          local stack config
├── seed.sql             `supabase db reset` fixtures
├── migrations/
│   ├── 0001_tasks.sql   table, RLS, realtime publication, replica identity
│   └── 0002_storage.sql public bucket + policies
└── functions/hello-world/index.ts
```

## Local development

Everything above works against a hosted project. To run the whole stack on your
machine instead — Postgres, storage, realtime, Studio, and a mail catcher —
install [Docker](https://docs.docker.com/desktop/) and:

```bash
npx supabase start          # Studio at http://localhost:54323
npx supabase db reset       # migrations + seed.sql
npm run db:types:local
```

Point `.env.local` at the URL and key `supabase start` prints.

## Row level security

RLS is enabled on every table, with policies that let the `anon` role read and
write freely. That is the right shape for a public demo and the wrong shape for
real data — the publishable key is in your app bundle, so those policies are
your only access control. Tighten them in `supabase/migrations/` before you
ship, or move to the auth starter:

```bash
npx bna-ui supabase my-app
```

## Learn more

- [Starter documentation](https://ui.ahmedbna.com/docs/installation/supabase)
- [Database, RLS and migrations](https://ui.ahmedbna.com/docs/supabase/database)
- [Realtime](https://ui.ahmedbna.com/docs/supabase/realtime) ·
  [Storage](https://ui.ahmedbna.com/docs/supabase/storage) ·
  [Edge functions](https://ui.ahmedbna.com/docs/supabase/edge-functions)
- [Supabase documentation](https://supabase.com/docs)
