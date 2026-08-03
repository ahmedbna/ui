---
'@bna-ui/registry': major
'bna-ui': minor
---

Fix the theme mode toggle, and move the providers out of `theme/`.

## The toggle

A report claimed `Appearance.setColorScheme` does not exist in React Native.
On native it does — it landed in React Native 0.73, and `'unspecified'` (the
value `useModeToggle` passed for system mode) is correct for the 0.86 the
registry targets. But the reporter was right about **web**: react-native-web's
`Appearance` exposes `getColorScheme` and `addChangeListener` and no setter.

`useModeToggle` already branched on that, writing `class`/`data-theme` onto
`document.documentElement` instead — dead code, since nothing in the registry
ships CSS or reads those attributes. Colors resolve through `useColor` →
`Colors[useColorScheme()]`, which on web reads `prefers-color-scheme`. Pressing
`ModeToggle` on web animated the icon and changed nothing else.

The mode also lived in the hook's own `useState` while the `Appearance`
override was global, so the two halves disagreed: remounting a screen reset the
cycle to `'system'` while the app stayed dark, and two toggles on screen each
tracked their own mode.

**New**

- `providers/mode-provider.tsx` — `ModeProvider` holds the mode app-wide and resolves it
  to a scheme. `useColorScheme` (both the native and `.web.ts` variants) prefers
  it, so an in-app toggle repaints components on every platform.
- Optional persistence via a `storage` prop taking any `{ getItem, setItem }`
  store, sync or async — `expo-secure-store` and `AsyncStorage` both fit with no
  adapter. No new npm dependency in the registry, and the hand-rolled wrapper the
  docs used to prescribe is gone.
- `ThemeProvider` mounts `ModeProvider` and forwards `storage`, `storageKey`
  and `defaultMode`, so apps still mount exactly one provider.

`Appearance.setColorScheme` is still called on native — it is what makes the
status bar, the Android navigation bar and root layouts above the provider
follow the toggle — but it is now feature-detected rather than assumed.

## The move

`theme/` held both design tokens and a React provider. Providers now live in
`providers/`, alongside the `providers/` folder the auth scaffolds already used,
so the folder a file sits in says what kind of thing it is:

- `theme/theme-provider.tsx` → `providers/theme-provider.tsx`
- `theme/mode.tsx` → `providers/mode-provider.tsx`

`theme/` keeps `colors.ts` and `globals.ts`. Definitions gained a `providers`
dependency field beside `hooks` and `theme`; payloads are unaffected, so older
CLIs read the new registry unchanged.

## Breaking

- **`@/theme/theme-provider` is now `@/providers/theme-provider`.** Projects
  that already installed it must move the file and update their imports, or
  re-run `bna-ui add theme-provider` and delete the old copy. Docs moved to
  `/docs/providers/*` to match.
- `useModeToggle` requires a `ModeProvider` above it and throws with a message
  naming the fix if there is none. Apps wrapped in `ThemeProvider` — every
  `bna-ui init` scaffold among them — need no change.
- `useModeToggle().currentMode` is typed `'light' | 'dark'` instead of
  `ColorSchemeName`. The runtime value is unchanged; it never could be
  `'unspecified'` or `null`.

## Scaffolds

All five starters now persist the theme with `expo-secure-store`, and their root
layouts were split so the code reading `useColorScheme()` renders _inside_
`ThemeProvider` — previously it sat above, which native's global `Appearance`
override papered over but left the sheet colors on web stuck on the OS scheme.
SecureStore has no web implementation, so persistence there degrades to a no-op
rather than an error.

The CLI learned a `providers` alias in `components.json`, defaulting to
`providers`. Existing configs without the key still resolve correctly.
