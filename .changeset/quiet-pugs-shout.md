---
'bna-ui': major
---

Fetch components from the registry instead of bundling them.

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
