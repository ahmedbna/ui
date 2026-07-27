# Phase 0 — Drift reconciliation decisions

Default rule (per user): **expo working copy (A) wins.** Applied to all 2,166 files.
Exceptions below are cases where the default would have shipped a regression or a known-broken file.

Copy labels: **A** `expo/` working · **B** `expo/templates/` · **C** `cli/templates/` (shipped) · **D** `docs/templates/`

## Defaults by directory

| Canonical target                             | Source                                                                                                                        |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `packages/registry/src/components/ui/**`     | **A** `expo/components/ui`                                                                                                    |
| `packages/registry/src/components/charts/**` | **A** `expo/components/charts`                                                                                                |
| `packages/registry/src/hooks/**`             | **A** `expo/hooks`                                                                                                            |
| `packages/registry/src/theme/**`             | **A** `expo/theme`                                                                                                            |
| `packages/registry/src/demo/**`              | **C** `cli/templates/demo` — this is the shipped copy; B is a stale mirror (see below)                                        |
| `packages/registry/definitions/**`           | **C** `cli/src/registry` — only copy with the `.js` relative-import convention; D uses `@/templates/registry/*` aliases       |
| `apps/docs/content/docs/**`                  | **D** `docs/templates/docs` — B is a _strict subset_, missing `alert-dialog.mdx` and all of `convex/`, and behind on 11 files |

## Exceptions to "A wins" — 6 files

| File                                                           | Winner | Why the default was overridden                                                                                                                                                                                     |
| -------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hooks/useBottomTabOverflow.ts`                                | **C**  | A's first line is `// components/ui/blur-background.tsx` — a **wrong** filename comment. C already removed it.                                                                                                     |
| `theme/colors.ts`                                              | **C**  | Measured strict superset: **0 lines lost, +43 gained**, including the `withOpacity()` helper A lacks. Taking A would delete shipped public API. This is carve-out (b) from the plan, now confirmed by measurement. |
| `demo/alert-dialog/alert-dialog-{demo,custom,destructive}.tsx` | **C**  | B uses `export default` (the registry pipeline requires named exports) and wraps in playground-only `<View style={{padding:20}}>`.                                                                                 |
| `demo/bottom-sheet/bottom-sheet-form.tsx`                      | **C**  | B contains unfinished scratch work — literal `{/* --- START: Changes --- */}` markers and `// Import these` comments. Not shippable. See follow-up 1.                                                              |
| `demo/charts/column-chart/column-chart-styled.tsx`             | **B**  | C imports `useColor` and **never uses it** — dead import in a shipped demo.                                                                                                                                        |
| `demo/video/video-demo.tsx`                                    | **B**  | C's video `uri` is `https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/` — a **directory, not a video file**. The shipped video demo is broken today; B has the working sample URL.                                  |

The last two are live bugs in what users currently receive from `bna-ui add`. The migration fixes both.

## Drift that resolved to A with no contest

| File                                            | Nature                                                                                                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `components/ui/text.tsx`                        | `fontWeight: '700'` (A) vs `'800'` (shipped) — the one real visual difference; A wins per decision                                       |
| `components/ui/link.tsx`                        | shipped imports `useRouter` unused → removed                                                                                             |
| `components/ui/switch.tsx`                      | import order only                                                                                                                        |
| `components/ui/carousel.tsx`                    | one blank line                                                                                                                           |
| `components/ui/date-picker.tsx`                 | D was missing `disablePanGesture={showMonthPicker \|\| showYearPicker}`; A/C have it                                                     |
| `components/charts/chart-container.tsx`         | B had a playground-only `margin: 8`                                                                                                      |
| `components/charts/{pie,stacked-bar}-chart.tsx` | leading path comment present in A, absent in C/D                                                                                         |
| `hooks/useThemeColor.ts`                        | B is a pre-rename snapshot (exports `useColor` from `useThemeColor.ts`) and lacks `useColor.ts` entirely — B ignored wholesale for hooks |

## Follow-ups (not part of the migration)

1. **`bottom-sheet-form` keyboard handling.** B's discarded work added `KeyboardAvoidingView` + `ScrollView`. The real fix is to use the registry's own `avoid-keyboard` component instead of raw RN primitives. Worth a separate PR after the migration.
2. **Header path comments** (`// components/charts/pie-chart.tsx`) are inconsistent across the library — present in some files, absent in others, and wrong in at least one. Decide once, enforce with lint.

## Baseline artifact

`registry-baseline.json` — 479 entries dumped from the current `cli/dist/registry/index.js`.
Phase 3's generator must reproduce this exactly (modulo the `templates/` → `src/` path rewrite).
