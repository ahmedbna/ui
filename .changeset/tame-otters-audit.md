---
'@bna-ui/registry': patch
---

Modernization pass across the component registry, fixing all 79 items
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
