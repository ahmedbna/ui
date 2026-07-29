# Your BNA UI app 🚀

An [Expo](https://expo.dev) app scaffolded with [BNA UI](https://ui.ahmedbna.com),
backed by [Convex](https://convex.dev) — Expo Router, light/dark theming,
components already wired up, and a real-time backend ready to build on.

No authentication here. If you want Google, Apple, password and email OTP
sign-in pre-wired, scaffold with `npx bna-ui convex` instead (without
`--no-auth`) — see [the auth guide](https://ui.ahmedbna.com/docs/installation/convex-auth).

## Getting started

```bash
npm install       # or pnpm / yarn / bun
```

You need two processes running. In one terminal:

```bash
npx convex dev    # backend: syncs functions, watches convex/
```

In another:

```bash
npx expo start    # app: press i for iOS, a for Android, w for web
```

The first `npx convex dev` walks you through creating a project and writes your
deployment URL to `.env.local` as `EXPO_PUBLIC_CONVEX_URL`. Keep it running
while you develop — it pushes backend changes as you save.

## What's in here

```
app/                 Screens and routing (Expo Router — files become routes)
├── (tabs)/          Tab navigator: home, search, settings
└── _layout.tsx      Root layout: ConvexProvider + ThemeProvider
components/ui/       Your UI components — yours to edit
convex/              Backend: schema, queries, mutations
├── schema.ts        Database tables
└── tasks.ts         The demo query and mutations
hooks/               useColor, useColorScheme, useKeyboardHeight, useModeToggle
theme/               colors.ts, globals.ts, theme-provider.tsx
```

## The demo

The home tab renders a task list straight out of Convex:

```tsx
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

const tasks = useQuery(api.tasks.list); // undefined while loading, then live
const addTask = useMutation(api.tasks.add);
```

`useQuery` subscribes — when anything writes to `tasks`, every device holding
that subscription re-renders. No refetching, no cache invalidation.

Delete `convex/tasks.ts`, drop the `tasks` table from `convex/schema.ts` and
rewrite `app/(tabs)/(home)/index.tsx` whenever you're ready to build your own
thing.

## Adding components

```bash
npx bna-ui add avatar
npx bna-ui add badge card input
npx bna-ui add            # browse everything interactively
```

Dependencies come along automatically. Browse the full catalogue at
**[ui.ahmedbna.com](https://ui.ahmedbna.com/docs/components)**.

## Theming

Components read colours through `useColor`, so light and dark work everywhere:

```tsx
import { useColor } from '@/hooks/useColor';

const background = useColor('background');
const primary = useColor('primary');
```

Change the palette in `theme/colors.ts` and every component follows.

## These components are yours

BNA UI copies source into your project rather than installing a dependency.
Edit anything in `components/ui/` freely — nothing will overwrite it. Upstream
fixes reach you when you re-run `npx bna-ui add <component>`, which asks before
replacing files.

## Learn more

- 📚 [BNA UI documentation](https://ui.ahmedbna.com)
- ⚡ [Convex](https://docs.convex.dev)
- 🧭 [Expo Router](https://docs.expo.dev/router/introduction/)
- 🐛 [Report an issue](https://github.com/ahmedbna/ui/issues)
