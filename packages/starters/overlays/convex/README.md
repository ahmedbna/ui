# Your BNA UI app 🚀

An [Expo](https://expo.dev) app scaffolded with [BNA UI](https://ui.ahmedbna.com),
backed by [Convex](https://convex.dev) — Expo Router, light/dark theming,
components already wired up, and authentication ready to go.

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
deployment URL to `.env.local`. Keep it running while you develop — it pushes
backend changes as you save.

## What's in here

```
app/                 Screens and routing (Expo Router — files become routes)
├── (tabs)/          Tab navigator: home, search, settings
└── _layout.tsx      Root layout: ConvexAuthProvider + ThemeProvider
components/auth/     Sign-in screens — email OTP, password, Google, Apple
components/ui/       Your UI components — yours to edit
convex/              Backend: schema, queries, mutations, auth config
├── schema.ts        Database tables
├── auth.ts          @convex-dev/auth setup
├── users.ts         User queries and mutations
└── resendOTP.ts     Email OTP delivery
hooks/               useColor, useColorScheme, useKeyboardHeight, useModeToggle
theme/               colors.ts, globals.ts, theme-provider.tsx
```

## Authentication

Email OTP, password with reset, Google and Apple sign-in are pre-wired via
[`@convex-dev/auth`](https://labs.convex.dev/auth). Email delivery goes through
[Resend](https://resend.com) — set `AUTH_RESEND_KEY` in your Convex deployment:

```bash
npx convex env set AUTH_RESEND_KEY re_your_key_here
```

OAuth providers need their own credentials; see the
[Convex Auth docs](https://labs.convex.dev/auth/config/oauth).

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
- 🔐 [Convex Auth](https://labs.convex.dev/auth)
- 🧭 [Expo Router](https://docs.expo.dev/router/introduction/)
- 🐛 [Report an issue](https://github.com/ahmedbna/ui/issues)
