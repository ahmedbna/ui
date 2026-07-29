---
'bna-ui': minor
---

Add `bna-ui mcp` and `bna-ui info`.

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
