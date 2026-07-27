# docs

The [ui.ahmedbna.com](https://ui.ahmedbna.com) documentation site — Next.js 15
App Router with [Fumadocs](https://fumadocs.vercel.app).

It also serves **the component registry**: the JSON that `bna-ui add` fetches at
runtime is published as static files under `public/r/`.

## Development

Run from the repo root so the registry builds first:

```bash
pnpm install
pnpm --filter docs dev
```

The dev server serves both the site and the registry, so you can point the CLI
at it to test unreleased components:

```bash
node packages/cli/bin/bna-ui.js add button --registry http://localhost:3000/r
```

## Layout

```
content/docs/        MDX — the source directory is set in source.config.ts
app/                 Routes: /, /docs/[[...slug]], /charts
components/          Site chrome; components/ui/ is shadcn/Radix (web, not RN)
lib/registry.ts      Thin adapter over @bna-ui/registry
scripts/             sync-registry.mjs copies payloads into public/r/
public/r/            Generated — the registry endpoint (gitignored)
```

## How previews work

`ComponentPreview` renders a CDN-hosted screen recording plus the component's
source, pulled from `@bna-ui/registry`. The site does **not** render React
Native components live and has no `react-native` dependency.

## Adding documentation

Create `content/docs/components/<name>.mdx`. Fumadocs picks it up automatically;
`meta.json` in each directory controls sidebar ordering.

## Deployment

Vercel builds this app from the monorepo root with
`turbo run build --filter=docs`, which builds `@bna-ui/registry` first and then
publishes `public/r/`.

**Deploy docs before releasing the CLI.** An older CLI reads newer registry
entries fine; the reverse ships a CLI asking for components the registry lacks.
