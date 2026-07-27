# BNA UI

Beautiful, accessible Expo React Native components you copy into your project.

📚 **[Documentation](https://ui.ahmedbna.com)** · 📦 **[npm](https://www.npmjs.com/package/bna-ui)**

```bash
npx bna-ui init my-app      # scaffold a new Expo app
npx bna-ui add button       # add a component
```

## Repository

| Path                | Package            | Description                                            |
| ------------------- | ------------------ | ------------------------------------------------------ |
| `packages/registry` | `@bna-ui/registry` | Source of truth for every component, hook, theme, demo |
| `packages/cli`      | [`bna-ui`][npm]    | The published CLI                                      |
| `packages/starters` | `@bna-ui/starters` | `init` and `convex` scaffolds                          |
| `apps/docs`         | —                  | Docs site, and the registry at `/r/*.json`             |
| `apps/playground`   | —                  | Expo app for developing components                     |

[npm]: https://www.npmjs.com/package/bna-ui

## Development

Requires Node 20+ and pnpm 10+.

```bash
pnpm install
pnpm build          # everything, in dependency order
pnpm dev            # docs + playground
pnpm test
pnpm typecheck
```

Working on a component:

```bash
pnpm --filter playground ios     # or android / web
```

Edit `packages/registry/src/components/ui/<name>.tsx` and the playground hot
reloads. The same file is what the docs site displays and what `bna-ui add`
installs — there is only one copy.

Testing the CLI against unreleased components:

```bash
pnpm --filter docs dev
cd /tmp && node ~/path/to/repo/packages/cli/bin/bna-ui.js init app && cd app
node ~/path/to/repo/packages/cli/bin/bna-ui.js add button --registry http://localhost:3000/r
```

See [CLAUDE.md](./CLAUDE.md) for architecture details and [CONTRIBUTING.md](./packages/cli/CONTRIBUTING.md) for contribution guidelines.

## License

MIT © [Ahmed BNA](https://github.com/ahmedbna)
