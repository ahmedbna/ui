---
'bna-ui': minor
---

Install relative to the project's `@/*` alias, so apps with a `src/` directory
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
