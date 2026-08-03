# Your BNA UI app 🚀

An [Expo](https://expo.dev) app scaffolded with [BNA UI](https://ui.ahmedbna.com) —
Expo Router, light/dark theming, and a set of components already wired up.

## Getting started

```bash
npm install       # or pnpm / yarn / bun
npx expo start
```

Then press `i` for iOS, `a` for Android, or `w` for web.

Expo needs a flat `node_modules` — Metro and autolinking both read it off disk.
Two of the config files here exist only to guarantee one: `.npmrc` plus
`pnpm-workspace.yaml` keep pnpm off its isolated layout, and `.yarnrc.yml` keeps
yarn 2+ off Plug'n'Play. npm and bun need neither. Delete them only if you are
prepared to fix Metro resolution yourself.

## What's in here

```
app/                 Screens and routing (Expo Router — files become routes)
├── (tabs)/          Tab navigator: home, search, settings
├── _layout.tsx      Root layout, wraps the app in ThemeProvider
└── sheet.tsx        Example modal route
components/ui/       Your UI components — yours to edit
hooks/               useColor, useColorScheme, useKeyboardHeight, useModeToggle
theme/               colors.ts, globals.ts, theme-provider.tsx
providers/           App-level React context
```

## Adding components

```bash
npx bna-ui add avatar
npx bna-ui add badge card input
npx bna-ui add            # browse everything interactively
```

Dependencies come along automatically — adding `button` also brings the `text`,
`icon` and `spinner` it builds on, plus any npm packages it needs.

Browse the full catalogue at **[ui.ahmedbna.com](https://ui.ahmedbna.com/docs/components)**.

## Theming

Components read colours through `useColor`, so light and dark work everywhere
without per-component wiring:

```tsx
import { useColor } from '@/hooks/useColor';

const background = useColor('background');
const primary = useColor('primary');
```

Change the palette in `theme/colors.ts` and every component follows. Spacing,
radii and font sizes live in `theme/globals.ts`.

## These components are yours

BNA UI copies source into your project rather than installing a dependency.
Edit anything in `components/ui/` freely — nothing will overwrite it.

The trade-off: upstream fixes reach you only when you re-run
`npx bna-ui add <component>`, which asks before replacing files.

## Learn more

- 📚 [BNA UI documentation](https://ui.ahmedbna.com)
- 🧭 [Expo Router](https://docs.expo.dev/router/introduction/)
- 📱 [Expo](https://docs.expo.dev)
- 🐛 [Report an issue](https://github.com/ahmedbna/ui/issues)
