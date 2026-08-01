---
'bna-ui': major
'@bna-ui/mcp': minor
---

Rebuild the CLI's visual identity around #FAD40B, cut the install to a fifth of
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
