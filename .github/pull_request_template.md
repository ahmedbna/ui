## Description

<!-- What changed, and why. -->

## Type of change

- [ ] Bug fix
- [ ] New component
- [ ] Documentation
- [ ] Performance
- [ ] Breaking change

## Testing

- [ ] iOS
- [ ] Android
- [ ] Web

<!-- For a new or changed component, confirm the real install path works:
     pnpm --filter docs dev
     node packages/cli/bin/bna-ui.js add <name> --registry http://localhost:3000/r -->

- [ ] Installed via `bna-ui add` against a local registry and it compiles

## Screenshots

<!-- Required for anything visual. -->

## Checklist

- [ ] `pnpm build && pnpm typecheck && pnpm test && pnpm lint` pass
- [ ] Every `@/…` import the component makes is declared in its definition
- [ ] Docs added or updated under `apps/docs/content/docs/`
- [ ] Changeset added (`pnpm changeset`) if CLI behaviour changed
