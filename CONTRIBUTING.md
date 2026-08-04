# Contributing to BNA UI 🤝

Thanks for your interest in contributing! This document covers how the monorepo
is laid out and what a good pull request looks like.

## 🚀 Getting started

### Prerequisites

- **Node.js 20+**
- **pnpm 10+** (`corepack enable` picks up the right version)
- Git
- Xcode and/or Android Studio if you want to test on a simulator

### Fork and clone

Fork [ahmedbna/ui](https://github.com/ahmedbna/ui) on GitHub, then — replacing
`<your-username>` with your own:

```bash
git clone https://github.com/<your-username>/ui.git bna-ui
cd bna-ui
git remote add upstream https://github.com/ahmedbna/ui.git
```

### Setup

```bash
pnpm install
pnpm build      # builds every package in dependency order
pnpm test
```

## 🗂️ How the repo is organised

| Path                 | What it is                                                            |
| -------------------- | --------------------------------------------------------------------- |
| `packages/registry/` | **The only copy** of every component, hook, theme file and demo       |
| `packages/cli/`      | The published `bna-ui` CLI                                            |
| `packages/starters/` | Scaffolds for `bna-ui init`, `convex`, `supabase` and `firebase`      |
| `apps/docs/`         | The documentation site, which also serves the registry at `/r/*.json` |
| `apps/playground/`   | An Expo app for building and manually testing components              |

The single most important thing to know: **there is exactly one copy of every
component.** `packages/registry/src/components/ui/button.tsx` is simultaneously
what the playground renders, what the docs site displays, and what
`bna-ui add button` installs. Never copy a component file somewhere else — if
you find yourself doing that, something has gone wrong.

## 🧩 Adding or changing a component

### 1. Build it in the playground

```bash
pnpm --filter playground ios      # or android / web
```

Edit `packages/registry/src/components/ui/<name>.tsx`. The playground hot
reloads against it directly.

### 2. Write the component

```tsx
// Export your types so consumers can use them
export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

// Colours come from the theme hook, never hardcoded hex
const backgroundColor = useColor('primary');
```

Rules that matter:

- **Import through the consumer's alias space** — `@/components/ui/text`,
  `@/hooks/useColor`, `@/theme/globals`. These files are copied verbatim into
  user projects, so relative imports would break there.
- **Read colours via `useColor`** so light and dark both work.
- **Type timer handles as `ReturnType<typeof setTimeout>`**, not `number` —
  `number` only compiles when `@types/node` is absent from the user's project.
- **Named exports only.** `export default` gets rewritten by the registry build,
  so relying on it is confusing.

### 3. Add demos

Put them in `packages/registry/src/demo/<component>/<component>-<variant>.tsx`.
They render on the docs site and are installable in their own right.

### 4. Register it

Create `packages/registry/definitions/<name>.ts`:

```ts
export const buttonRegistry = {
  button: {
    name: 'button',
    description: 'A versatile button with variants, sizes and animations.',
    type: 'registry:ui',
    dependencies: ['expo-haptics'], // npm packages
    registryDependencies: ['text', 'icon'], // other registry entries
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/button.tsx', // relative to packages/registry
        target: 'components/ui/button.tsx', // where it lands in a user project
      },
    ],
  },
};
```

There is **no index file to update** — definitions are discovered automatically.

**Declare every dependency.** If your component imports `@/hooks/useColor`, it
must list `hooks: ['useColor']`. The build enforces this: a payload whose files
import something the payload doesn't carry fails CI, because it would install
into a user's project and fail to compile.

### 5. Document it

Add `apps/docs/content/docs/components/<name>.mdx`, then:

```bash
pnpm --filter docs dev
```

### 6. Verify

```bash
pnpm build        # validates the registry and the payload contract
pnpm typecheck
pnpm test
pnpm lint
pnpm format
```

### 7. Test the real install path

```bash
pnpm --filter docs dev            # serves the registry on :3000

cd /tmp && node ~/bna-ui/packages/cli/bin/bna-ui.js init testapp && cd testapp
node ~/bna-ui/packages/cli/bin/bna-ui.js add <name> --registry http://localhost:3000/r
```

### 8. Add a changeset

Only if the CLI's behaviour changed:

```bash
pnpm changeset
```

Component additions don't need one — they reach users through the registry as
soon as the docs site deploys.

## 🔄 Workflow

```bash
git fetch upstream && git checkout main && git merge upstream/main
git checkout -b feat/component-name
```

Conventional commits, scoped to the package you touched:

```bash
git commit -m "feat(registry): add Avatar component"
git commit -m "fix(cli): handle offline registry gracefully"
git commit -m "docs: clarify theme configuration"
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`.

## 📝 Pull requests

- Keep them focused — one component or one fix per PR.
- Say which platforms you tested on (iOS / Android / Web).
- Include a screenshot or recording for anything visual.
- CI must pass: build, typecheck, test, lint, format, and the CLI end-to-end job.

## 🧪 What CI checks

| Check               | What it catches                                                    |
| ------------------- | ------------------------------------------------------------------ |
| Registry validation | Unknown dependency names, missing files, duplicate keys, cycles    |
| Payload contract    | A component that would install into a user project and not compile |
| `typecheck`         | Type errors, including in the shipped component source itself      |
| CLI end-to-end      | `init` then `add` against a live registry, all imports resolved    |
| `format:check`      | Formatting drift                                                   |

## 🚫 Please don't

- Push directly to `main`
- Copy a component file to a second location — there is one source of truth
- Add an npm dependency without declaring it in the component's definition
- Hardcode colours instead of using `useColor`
- Make breaking CLI changes without a `major` changeset

## 📞 Getting help

- **Issues**: [github.com/ahmedbna/ui/issues](https://github.com/ahmedbna/ui/issues)
- **Discussions**: [github.com/ahmedbna/ui/discussions](https://github.com/ahmedbna/ui/discussions)
- **LinkedIn**: [@ahmedbna](https://www.linkedin.com/in/ahmedbna/)
- **X**: [@ahmedbnaa](https://x.com/ahmedbnaa)

## 🙏 Recognition

Contributors are credited in release notes and in the component documentation.

Thank you for contributing to BNA UI! 🚀
