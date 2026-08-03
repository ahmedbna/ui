# bna-ui

## 4.1.0

### Minor Changes

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

- [`20c69d4`](https://github.com/ahmedbna/ui/commit/20c69d457d61402d6c26e57cc31ef331093cfd16) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Install relative to the project's `@/*` alias, so apps with a `src/` directory
  get their components in the right place.

  `add` wrote every file relative to the project root. In a project mapping
  `@/*` onto `./src/*` — the layout Expo's own docs suggest — `add button`
  produced `components/ui/button.tsx` at the root, outside the alias space the
  app resolves through, and nothing imported.

  The mapping was already being read, but only to check the `@/*` key existed;
  its value was ignored, making `["./*"]` and `["./src/*"]` indistinguishable.
  That was the wrong reading of what a registry target is. The registry freezes
  every internal import to `@/components/…`, `@/hooks/…`, `@/theme/…` and
  `@/providers/…` at build time, so a target like `components/ui/button.tsx` has
  always described a path **relative to wherever `@/` points**, not to the
  project root.

  So the CLI now resolves that root and installs beneath it:

  | `"@/*"` in your tsconfig | `add button` writes            |
  | ------------------------ | ------------------------------ |
  | `["./*"]`                | `components/ui/button.tsx`     |
  | `["./src/*"]`            | `src/components/ui/button.tsx` |

  `baseUrl` is honoured, `jsconfig.json` works the same way, and a mapping that
  climbs out of the project is refused rather than followed. Projects at the root
  — every `bna-ui init` scaffold among them — get byte-identical output to
  before.

  Conflict detection, the `--dry-run` listing and the overwrite prompts all moved
  with the write, so every path shown is the path used.

  ## Aliases now work

  `aliases` in `components.json` relocated files but nothing rewrote the frozen
  `@/…` specifiers inside them, so any non-default value produced components that
  could not resolve. `add` now rewrites those imports as it copies, and the
  feature does what it always claimed:

  ```json
  { "aliases": { "components": "ui-kit" } }
  ```

  writes `ui-kit/ui/button.tsx` importing `@/ui-kit/ui/text`.

  **Alias values are relative to the `@/` root, not the project root.** A config
  written against the old docs — `"components": "src/components"` in an app whose
  `@/*` already maps to `./src/*` — would now nest twice, so `add` drops the
  redundant prefix, installs where it did before, and prints a warning naming the
  keys to shorten. It also flags a `components/` left at the project root by an
  earlier install, which is outside `@/` and no longer updated.

  ## Also
  - New `baseDir` in `components.json` overrides the detection, for an alias
    declared in a base config you `extends`.
  - `add` refuses a payload target that resolves outside the install root. The
    registry types `target` as an unconstrained string, so nothing upstream
    stopped a `../` from escaping.
  - The "no `@/*` alias" error now shows both the root and `src/` shapes.

### Patch Changes

- [`922f924`](https://github.com/ahmedbna/ui/commit/922f9242aa05870df6b2167399fd922ebfe4e028) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Scaffolds now install a real, flat `node_modules` under every package manager.

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

- [`0780314`](https://github.com/ahmedbna/ui/commit/0780314e2d583e95ca2f0c961bbd0480c036f931) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Fix `bunx --bun bna-ui init`, which died with `TypeError: fs.opendir is not a
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

## 4.0.0

### Major Changes

- [`7ecac9e`](https://github.com/ahmedbna/ui/commit/7ecac9ea2ce41f2634ed9ce6fac6db53e51fbcab) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Rebuild the CLI's visual identity around #FAD40B, cut the install to a fifth of
  its size, and collapse the duplicated scaffold commands.

  **Breaking**

  - **Node.js 22.12 or newer is required.** Node 20 reached end of life on
    2026-04-30, and chalk 6 and commander 15 both require 22+.
  - **`bna-ui mcp` now runs `@bna-ui/mcp`.** The documented
    `claude mcp add bna-ui -- npx -y bna-ui mcp` keeps working unchanged; the
    server was moved into its own package so the MCP SDK's HTTP and SSE transport
    dependencies — 93 packages and 24 MB it never used — stop being downloaded by
    every `npx bna-ui add`. What `add` installs went from 156 packages / 38 MB to
    50 packages / 8.8 MB.
  - **`-t, --template` has been removed.** It was registered on `init`, `convex`
    and `supabase` with a default of `default` and read by none of them, so
    passing it silently did nothing. It is now an unknown-option error.

  **Added**

  - `bna-ui list` and `bna-ui search <query>`. Discovering a component name
    previously meant running `add` with no arguments and scrolling a checkbox of
    80+ entries. Both also surface hooks, charts and theme entries, which `add`'s
    picker filters out.
  - `components.json`, written by `init` and entirely optional. Holds the registry
    URL, per-kind install aliases, and the package manager.
  - An update notifier, skipped under npx, CI, a non-TTY and `NO_UPDATE_NOTIFIER`.
  - `--verbose` on every command, and worked examples in every `--help`.

  **Fixed**

  - Ctrl-C at a prompt printed `An error occurred: ExitPromptError` and exited 1.
    It is now a clean cancellation.
  - `--dry-run` prompted about file conflicts, so it could not be used from a
    script.
  - `add` did not check for the `@/*` path alias, so it wrote components whose
    imports could not resolve, with nothing pointing back at the command.
  - `add` inside a pnpm or yarn project could install with npm; the package
    manager is now detected from the lockfile too.
  - Errors printed raw `Error` objects and stack traces instead of a message and
    a fix.
  - The scaffold copy filter matched `dist` and `build` anywhere in a path rather
    than per segment, silently dropping files like `components/rebuild.tsx`.
  - Warnings went to stdout, which corrupted the MCP server's JSON-RPC channel.
  - The install line printed a bare `yarn` where the shared helper prints
    `yarn install`.

### Minor Changes

- [`8a71548`](https://github.com/ahmedbna/ui/commit/8a7154843a3dc6b3f0718cc4fd5dd6cc24e96901) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Add `bna-ui mcp` and `bna-ui info`.

  `bna-ui mcp` runs an MCP server over the registry, so Claude Code, Cursor,
  VS Code and other assistants can list, search and read components — including
  props, usage and full source — instead of recalling the library from training
  data or scraping the docs site. It reuses the same registry client as `add`, so
  it shares the `~/.cache/bna-ui` ETag cache, honours `--registry` and
  `BNA_UI_REGISTRY`, and works offline against a warm cache. It never writes to
  disk: `get_install_plan` returns the command for you to run.

  `bna-ui info <component>` prints the same bundle for agents that cannot speak
  MCP, with `--json` for piping.

  Requires a registry serving `/r/ai/*.json`, so deploy the docs site first.

- [`1c4dfd2`](https://github.com/ahmedbna/ui/commit/1c4dfd26ef011f572ebab4a09b8ea6c504c52403) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Add `bna-ui convex --no-auth`, a Convex scaffold with no authentication.

  `bna-ui convex` previously had one shape: a Convex backend with `@convex-dev/auth`
  wired in — Google, Apple, password and email OTP — and no way to opt out. Getting
  a plain Convex backend meant scaffolding the auth starter and deleting six
  sign-in screens, eight `convex/` modules and seven npm dependencies.

  `--no-auth` now scaffolds a backend-only variant: a `tasks` table, a live query
  and the mutations behind it, rendered on the home tab so the first run shows the
  backend working. `ConvexProvider` replaces `ConvexAuthProvider`, and the only
  dependency added over the plain Expo starter is `convex`.

  Bare `npx bna-ui convex` is unchanged and still produces the full auth setup. It
  also now prints the `AUTH_RESEND_KEY` command on completion — email OTP and
  password reset fail silently without it, and nothing in the flow asked for it
  before.

- [`31ae9b4`](https://github.com/ahmedbna/ui/commit/31ae9b487d368111d1bc8da5153a2fcc8d147aa3) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Add `bna-ui supabase`, which scaffolds an Expo app with a Supabase backend.

  Two new starters, mirroring the Convex pair. `npx bna-ui supabase my-app` gives
  you the auth variant — password, magic link, email OTP, and Google, Apple and
  GitHub over browser PKCE — with protected route groups, an onboarding flow, user
  profiles, avatar uploads and an account-deletion edge function.
  `--no-auth` gives you the backend only: migrations, realtime, storage and an
  edge function.

  Both ship SQL migrations with row level security on every table, generated
  database types, a jest setup, and a GitHub Actions workflow that typechecks,
  tests, catches type drift against the migrations, deploys migrations and
  functions, and kicks off an EAS build.

  After copying files the command prompts for a project URL and publishable key,
  writes `.env.local`, and then links the project, applies migrations and
  generates types — but only if the Supabase CLI is installed. Without it, those
  commands are printed as next steps instead.

  Also fixes two pre-existing crashes in every scaffold: `expo-router` 57 removed
  the top-level `Icon`, `Label`, `Badge` and `VectorIcon` exports from
  `unstable-native-tabs` (they are statics on `NativeTabs.Trigger` now), and
  `expo-navigation-bar` 57 replaced `setButtonStyleAsync` with `setStyle`. Both
  threw at runtime.

## 3.0.0

### Major Changes

- [`8442a00`](https://github.com/ahmedbna/ui/commit/8442a003bfb307da44718d745234e35014720cc7) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Fetch components from the registry instead of bundling them.

  `bna-ui add` now resolves components from `https://ui.ahmedbna.com/r` at runtime
  rather than from templates shipped inside the package. The tarball drops from
  ~10.7 MB to ~1.7 MB, and new components become available without a CLI release.
  `init` and `convex` are unchanged — their scaffolds are still bundled and work
  offline.

  Fixes shipped alongside:

  - `add` now installs every file a component imports. Previously `add button`
    wrote `hooks/useColor.ts` without `hooks/useColorScheme.ts` or
    `theme/colors.ts`, so the result did not compile. 126 registry entries were
    under-declaring their dependencies.
  - `init` produced projects with no `.gitignore`, because npm strips that file
    from published tarballs.
  - `--version` reported `1.0.0` regardless of the installed version.
  - `useModeToggle` computed `isDark` from the system colour scheme, so explicitly
    choosing light or dark had no effect; it also now handles web.
  - Timer refs typed as `useRef<number>` failed to compile in any project with
    `@types/node` in scope.
  - The `video` demo pointed at a directory URL instead of a video file.

  New: `--registry <url>` and `BNA_UI_REGISTRY` to point at an alternate registry,
  plus an on-disk ETag cache so repeat installs work offline.

### Minor Changes

- [`763de39`](https://github.com/ahmedbna/ui/commit/763de396f3347f854cae26a3259cc43009b8fd23) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Target Expo SDK 57 (React Native 0.86), and install dependencies with `expo install` in Expo projects.

  Registry entries declare bare package names, which the CLI previously handed to
  `npm install` — resolving every one of them to `latest`. In an Expo app that is
  wrong as soon as a new SDK ships: `bna-ui add camera` would pull the newest
  `expo-camera` rather than the one matching the project's SDK. The CLI now
  detects an Expo project and runs `npx expo install`, which pins each package to
  the project's SDK and passes anything it doesn't recognise through to the
  package manager. Non-Expo projects are unaffected.

  Also fixes scoped-package detection: `@expo/vector-icons` and
  `@react-native-masked-view/masked-view` were parsed as having an empty package
  name, so they were never recognised as already installed and were reinstalled on
  every `add`.

  The bundled `init` and `convex` scaffolds now generate Expo SDK 57 projects.
