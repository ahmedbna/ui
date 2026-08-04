# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

A single pnpm + Turborepo monorepo (`github.com/ahmedbna/ui`). It replaces three
formerly separate repos — `ahmedbna/ui` (CLI), `ahmedbna/docs`, `ahmedbna/expo` —
whose histories are preserved here via `git subtree`.

| Path                          | Package                     | What it is                                                                |
| ----------------------------- | --------------------------- | ------------------------------------------------------------------------- |
| `packages/registry/`          | `@bna-ui/registry`          | **Single source of truth** for every component, hook, theme file and demo |
| `packages/cli/`               | `bna-ui` (published)        | `npx bna-ui init\|convex\|supabase\|firebase\|add`                        |
| `packages/starters/`          | `@bna-ui/starters`          | Scaffolds for `init`, `convex`, `supabase` and `firebase`                 |
| `apps/docs/`                  | `docs`                      | Next.js + Fumadocs site at ui.ahmedbna.com; also hosts `/r/*.json`        |
| `apps/playground/`            | `playground`                | Expo app for building and manually verifying components                   |
| `packages/eslint-config/`     | `@bna-ui/eslint-config`     | Shared `expo` / `next` / `node` presets                                   |
| `packages/typescript-config/` | `@bna-ui/typescript-config` | Shared tsconfig bases                                                     |

## Commands

Run from the repo root; Turborepo handles the task graph and ordering.

```bash
pnpm build       # all packages, in dependency order
pnpm dev         # dev servers
pnpm typecheck
pnpm test
pnpm lint
pnpm format      # prettier write (format:check in CI)
pnpm changeset   # record a release note for bna-ui
```

Scoped: `pnpm --filter docs dev`, `pnpm --filter playground ios`, etc.

## Architecture

### One copy of every component

`packages/registry/src/` holds the only copy of every `components/ui/*.tsx`,
`components/charts/*.tsx`, `demo/**`, `hooks/*` and `theme/*`. There is no
hand-syncing — this replaced four drifting copies across the old repos.

Consumers reach it differently:

- **playground** maps `@/components/ui/*`, `@/components/charts/*`, `@/demo/*`,
  `@/hooks/*` and `@/theme/*` onto the package via tsconfig `paths`
  (`apps/playground/tsconfig.json`). Expo's Metro reads those natively;
  `metro.config.js` only adds the workspace watch root.
- **docs** imports `@bna-ui/registry` for metadata and `@bna-ui/registry/server`
  for generated payloads.
- **cli** fetches payloads over HTTP; it does not import the source at all.

**Critical constraint:** component source is copied verbatim into user projects
and imports through the _consumer's_ alias space (`@/components/ui/text`,
`@/hooks/useColor`, `@/theme/globals`). Those specifiers must never change. This
is why the source stays plain files with `@/…` imports rather than becoming a
normal importable package.

### The registry is generated

`packages/registry/scripts/build.ts` globs `definitions/**/*.ts`, validates every
entry with zod, and emits:

- `generated/registry.ts` — metadata module consumed by `index.ts`
- `generated/r/<name>.json` — one payload per entry, source inlined, the full
  transitive closure (registryDependencies **plus** hooks and theme) flattened
- `generated/r/index.json` — searchable metadata index

The build **fails** on an unknown `registryDependencies` / `hooks` / `theme`
name, a `files[].path` missing on disk, a duplicate key, or a dependency cycle.
`scripts/verify-payloads.mjs` then asserts every payload is self-contained —
every `@/…` import a shipped file makes must resolve within the same payload.

There is no hand-maintained index. Adding a component means adding the source
file plus one definition file; nothing else needs editing.

### Adding a component

1. Build it in `apps/playground` against `packages/registry/src/`.
2. Add `packages/registry/definitions/<name>.ts` exporting `<name>Registry`,
   declaring `dependencies` (npm), `registryDependencies`, `hooks`, `theme`,
   and `files` (`path` relative to the registry root, `target` in the user's project).
3. Add MDX under `apps/docs/content/docs/components/`.
4. `pnpm build` — validation and the payload contract check run here.
5. `pnpm changeset` if the CLI is affected.

### The CLI fetches; it does not bundle

`bna-ui add` resolves from `https://ui.ahmedbna.com/r` (override with
`--registry <url>` or `BNA_UI_REGISTRY`). Payloads are cached per registry under
`~/.cache/bna-ui` and revalidated with ETags, so repeat installs work offline.
Every payload carries `$schemaVersion`; a CLI that sees a higher version refuses
it and tells the user to upgrade.

`init`, `convex`, `supabase` and `firebase` scaffolds stay **bundled** in the npm tarball — they must
work before any network trust exists, and are mostly binary assets.

To test an unreleased component end to end:

```bash
pnpm --filter docs dev
cd /tmp && node <repo>/packages/cli/bin/bna-ui.js init app && cd app
node <repo>/packages/cli/bin/bna-ui.js add button --registry http://localhost:3000/r
```

Files stored dot-less in `packages/starters/` (`gitignore`) are renamed on
scaffold — npm strips `.gitignore` from published tarballs.

### Deploy ordering

Docs deploys before a CLI release, always. An older CLI reads newer registry
entries fine; the reverse ships a CLI asking for components the registry lacks.
Vercel builds `apps/docs` from this repo, which publishes `public/r/`.

### Theming

`packages/registry/src/theme/` — `colors.ts` (semantic tokens, iOS accent
colours, `semanticColors`, `withOpacity`), `globals.ts` (`HEIGHT`, `FONT_SIZE`,
`BORDER_RADIUS`, `CORNERS`), `theme-provider.tsx`. Components read colours via
the `useColor` hook rather than hardcoding hex values.

### Docs site

MDX lives in `apps/docs/content/docs/` (the conventional Fumadocs location).
Component previews are CDN-hosted screen recordings plus highlighted source
pulled from the registry — the site does **not** render React Native components
live, and has no `react-native` dependency.
