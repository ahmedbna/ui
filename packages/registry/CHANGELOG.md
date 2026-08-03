# @bna-ui/registry

## 1.0.0

### Major Changes

- [`fd48918`](https://github.com/ahmedbna/ui/commit/fd4891814433e7421ddef9096fc355043d117718) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Fix the theme mode toggle, and move the providers out of `theme/`.

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

### Patch Changes

- [`811b5e5`](https://github.com/ahmedbna/ui/commit/811b5e5d4c2a8921ceefb035ecadb06bbaeb98af) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Modernization pass across the component registry, fixing all 79 items
  cataloged in `AUDIT.md` (see `AUDIT_CHECKLIST.md` for the phase-by-phase
  breakdown).

  **Fixed**

  - 15 charts crashed ("Rendered more/fewer hooks...") whenever a dataset's
    length changed between renders — `useAnimatedProps`/`useAnimatedStyle` were
    called inside a `.map()` render loop instead of at a mounted subcomponent's
    top level.
  - Two `Tabs` instances with overlapping tab values corrupted each other's
    content indefinitely, from a module-scope mutable object in `tabs.tsx`.
  - `video.tsx`'s `nativeControls` prop was ignored, and its `VideoRef` methods
    (`play`, `pause`, `seekTo`, etc.) were never wired up.
  - `action-sheet` shipped with no `dependencies` declared despite importing
    Reanimated, so `bna-ui add action-sheet` produced an unresolvable import.
  - `media-picker.tsx` used the deprecated `ImagePicker.MediaTypeOptions` enum
    and requested permissions eagerly with no denial fallback.
  - Zero components had `accessibility*` props beyond `file-picker` — added
    roles, states, labels, and `hitSlop` across ~60 components.
  - 40+ `meta.ts`/`.mdx` entries documented props, defaults, or behavior the
    source didn't have, or omitted real ones.
  - `share.tsx`'s `subject`/`title` were routed to the wrong `Share.share()`
    argument and silently dropped; `link.tsx` discarded its `asChild` prop on
    internal routes; several charts divided by zero on empty/flat datasets;
    `treemap-chart` ignored its documented hierarchical `children`; and more —
    see `AUDIT_CHECKLIST.md` Phase 3.
  - `text`, `view`, `card`, `avatar`, and `skeleton` were unmemoized; several
    charts recomputed O(n²) geometry every render regardless of whether `data`
    changed; `gallery.tsx`'s thumbnail grid and `table.tsx`'s rows used a plain
    `.map()` instead of `FlatList`; six components cached `Dimensions.get('window')`
    at module scope, stale after rotation; four components hardcoded safe-area
    offsets instead of `useSafeAreaInsets()`.
  - 14 chart definitions declared an unused `react-native-gesture-handler`
    dependency; `combobox`/`carousel`/`scroll-view` declared unused
    `registryDependencies`; `spinner`/`skeleton` were missing a real
    `react-native-reanimated` dependency they import.
  - `semanticColors` (success/warning/info/error) was exported from
    `theme/colors.ts` but never merged into `Colors`, so it was unreachable via
    `useColor` — merged in, unblocking `badge.tsx`'s `success` variant. Added a
    `SPACING` scale to `theme/globals.ts` to match what its own docs described.

  **Documented, not changed**

  - `checkbox`/`radio`/`toggle` use three different controlled-prop naming
    conventions (`checked`/`onCheckedChange`, `value`/`onValueChange`,
    `pressed`/`onPressedChange`). Each matches its own control's ARIA
    interaction model; recorded as intentional in `AUDIT.md` rather than
    renamed, since this package is unpublished/unversioned source copied
    directly into consumer projects.
