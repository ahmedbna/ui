# @bna-ui/mcp

## 1.0.0

First published release. The package existed in the repository at 1.0.0, 1.1.0 and
1.1.1 while the CLI was being reworked; none of those reached npm, so this is the
first version anyone can install.

`bna-ui mcp` resolves this package with `npx` at runtime rather than bundling it,
so `bna-ui@3.0.0` — already published — picks it up with no CLI release.

### Major Changes

- [`7ecac9e`](https://github.com/ahmedbna/ui/commit/7ecac9ea2ce41f2634ed9ce6fac6db53e51fbcab) Thanks [@ahmedbna](https://github.com/ahmedbna)! - Split the MCP server out of the `bna-ui` CLI into its own package.

  `bna-ui mcp` now runs `@bna-ui/mcp`. The documented
  `claude mcp add bna-ui -- npx -y bna-ui mcp` keeps working unchanged; the server
  moved so the MCP SDK's HTTP and SSE transport dependencies — 93 packages and
  24 MB it never used — stop being downloaded by every `npx bna-ui add`. What
  `add` installs went from 156 packages / 38 MB to 50 packages / 8.8 MB.

  Node.js 22.12 or newer is required.

- [`8a71548`](https://github.com/ahmedbna/ui/commit/8a7154843a3dc6b3f0718cc4fd5dd6cc24e96901) Thanks [@ahmedbna](https://github.com/ahmedbna)! - An MCP server over the BNA UI registry, so Claude Code, Cursor, VS Code and other
  assistants can list, search and read components — including props, usage and full
  source — instead of recalling the library from training data or scraping the docs
  site.

  It reuses the same registry client as `bna-ui add`, so it shares the
  `~/.cache/bna-ui` ETag cache, honours `--registry` and `BNA_UI_REGISTRY`, and
  works offline against a warm cache. It never writes to disk: `get_install_plan`
  returns the command for you to run.

  Warnings go to stderr, so nothing corrupts the JSON-RPC channel on stdout.

### Patch Changes

- Depends on [`bna-ui@3.0.0`](https://www.npmjs.com/package/bna-ui/v/3.0.0).
