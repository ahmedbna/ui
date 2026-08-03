---
'bna-ui': patch
---

Fix `bunx --bun bna-ui init`, which died with `TypeError: fs.opendir is not a
function` before writing a single file.

`copyTemplate` no longer calls `fs.cp(…, { filter })`. `fs.cp`'s filter callback
has to re-enter JS for every entry, and runtimes that implement `node:fs`
natively have not always carried it — so under Bun the scaffold either threw or,
worse, silently ignored the filter and copied `node_modules` into the new
project. The copy is now an explicit walk over `readdir`/`mkdir`/`copyFile`,
primitives present in every Node and Bun release, and the dot-less renames
(`gitignore` → `.gitignore`, `github` → `.github`) happen during it. CI now
scaffolds under Bun on two versions and diffs the result against Node's.

`add` had a second Bun gap behind the same symptom. Installing a component's
npm dependencies in an Expo project shells out to `expo install`, and the runner
was a hardcoded `npx`. That holds for npm, yarn and pnpm — all three are Node
programs that bring `npx` with them — but Bun is its own runtime, so
`bunx --bun bna-ui add camera` on a machine without Node resolved every file it
was about to write and then died with `npx: command not found`. A bun project
now launches it with `bunx`.

The update notifier also no longer fires under `bunx`, `pnpm dlx` or `yarn dlx`.
It only ever recognised `npx`, so every `bunx bna-ui init` finished by
suggesting `npm install -g bna-ui@latest` — a package `bunx` had just resolved
to latest, with the wrong package manager.
