# bna-ui

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
