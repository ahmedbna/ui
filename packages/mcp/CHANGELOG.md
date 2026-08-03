# @bna-ui/mcp

## 1.1.1

### Patch Changes

- Updated dependencies [[`fd48918`](https://github.com/ahmedbna/ui/commit/fd4891814433e7421ddef9096fc355043d117718), [`922f924`](https://github.com/ahmedbna/ui/commit/922f9242aa05870df6b2167399fd922ebfe4e028), [`0780314`](https://github.com/ahmedbna/ui/commit/0780314e2d583e95ca2f0c961bbd0480c036f931), [`20c69d4`](https://github.com/ahmedbna/ui/commit/20c69d457d61402d6c26e57cc31ef331093cfd16)]:
  - bna-ui@4.1.0

## 1.1.0

### Minor Changes

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

### Patch Changes

- Updated dependencies [[`8a71548`](https://github.com/ahmedbna/ui/commit/8a7154843a3dc6b3f0718cc4fd5dd6cc24e96901), [`7ecac9e`](https://github.com/ahmedbna/ui/commit/7ecac9ea2ce41f2634ed9ce6fac6db53e51fbcab), [`1c4dfd2`](https://github.com/ahmedbna/ui/commit/1c4dfd26ef011f572ebab4a09b8ea6c504c52403), [`31ae9b4`](https://github.com/ahmedbna/ui/commit/31ae9b487d368111d1bc8da5153a2fcc8d147aa3)]:
  - bna-ui@4.0.0
