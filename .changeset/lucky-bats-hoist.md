---
'bna-ui': patch
---

Scaffolds now install a real, flat `node_modules` under every package manager.

Metro and React Native's autolinking both read `node_modules` off disk, and two
package managers do not provide one by default:

- **pnpm** defaults to the isolated linker. Scaffolds ship an `.npmrc`
  (`node-linker=hoisted`) and a `pnpm-workspace.yaml` (`nodeLinker: hoisted`) —
  both, because pnpm 11 reads settings only from `pnpm-workspace.yaml` while
  pnpm 10.15 and older read only `.npmrc`. Reported as `expo start` failing on
  an unresolvable `metro-runtime/src/modules/empty-module.js` where npm worked.
- **yarn 2+** defaults to Plug'n'Play and installs no `node_modules` at all, so
  Metro could not bundle a yarn scaffold. Scaffolds ship a `.yarnrc.yml`
  (`nodeLinker: node-modules`). Yarn 1.x is flat already and ignores it.

`init`, `convex` and `supabase` now install and bundle under npm, pnpm, yarn and
bun alike, each covered by a CI leg that installs for real and runs a Metro
bundle.

`.DS_Store` is no longer copied into a scaffold, and the starters build now
fails on any file npm silently strips from the tarball (`.gitignore`, `.npmrc`,
`.npmignore`, `.DS_Store`) rather than shipping a scaffold missing it.

A failed dependency install now prints what the package manager actually said
and the command to re-run, instead of dumping a raw `Error` object.
