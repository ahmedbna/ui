# @bna-ui/mcp

A [Model Context Protocol](https://modelcontextprotocol.io) server over the
[BNA UI](https://ui.ahmedbna.com) registry, so Claude Code, Cursor, VS Code and
other assistants can list, search and read components — props, usage and full
source — instead of recalling the library from training data.

That matters more than it sounds. Asked to "add a BNA UI button", a model with no
way to look it up produces web React: `<div className="flex">`, Tailwind classes,
Radix primitives. BNA UI is React Native — it renders through `react-native`, not
the DOM. Every response from this server is prefixed with that constraint, next to
the component it is about to be used for.

No configuration, no API key. Everything it serves is the public registry.

## Install

**Claude Code**

```bash
claude mcp add bna-ui -- npx -y bna-ui mcp
```

**Any other client** — same command, in its config file:

```json
{
  "mcpServers": {
    "bna-ui": {
      "command": "npx",
      "args": ["-y", "bna-ui", "mcp"]
    }
  }
}
```

- **Cursor** — `.cursor/mcp.json`
- **VS Code / Copilot** — `.vscode/mcp.json`
- **Windsurf** — `~/.codeium/windsurf/mcp_config.json`
- **Codex** — `~/.codex/config.toml`

`bna-ui mcp` hands off to this package, which is why the CLI stays small: the MCP
SDK pulls in express, hono, ajv, cors and jose for HTTP and SSE transports this
server never uses — 93 packages and 24 MB that no `npx bna-ui add` should pay
for. Only `StdioServerTransport` is used here.

You can also run it directly, skipping the CLI shim:

```bash
npx -y @bna-ui/mcp
```

## Tools

| Tool                   | What it answers                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `list_components`      | Everything installable, filterable by component, chart, hook or theme.                                 |
| `search_components`    | "Which component does X?" — matches names and descriptions.                                            |
| `get_component`        | Description, props, variants, usage, accessibility notes, dependencies, full source and every example. |
| `get_component_source` | Just the source, for when the API is already known.                                                    |
| `get_install_plan`     | The exact `add` command, the npm packages, and the files it will write.                                |
| `get_docs`             | Any documentation page as Markdown, with all source expanded inline.                                   |

## Nothing is written to disk

`get_install_plan` returns a command; it does not run it. Installing stays an
explicit step you or your assistant takes with `npx bna-ui add`, so nothing
appears in your project without you asking.

## Configuration

| Variable          | Effect                                                          |
| ----------------- | --------------------------------------------------------------- |
| `BNA_UI_REGISTRY` | Registry to read from. Defaults to `https://ui.ahmedbna.com/r`. |

It shares the `~/.cache/bna-ui` ETag cache with `bna-ui add`, so an agent and a
human hitting the same registry see byte-identical data, repeat calls are free,
and it keeps working offline against a warm cache. Point `BNA_UI_REGISTRY` at
`http://localhost:3000/r` to develop against a local docs site; `get_docs` follows
it there too.

Requires Node.js 22.12 or newer.

## Links

- [Documentation](https://ui.ahmedbna.com/docs/mcp)
- [Components](https://ui.ahmedbna.com/docs/components)
- [Source](https://github.com/ahmedbna/ui/tree/main/packages/mcp)

MIT © [Ahmed BNA](https://github.com/ahmedbna)
