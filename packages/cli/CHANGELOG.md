# bna-ui

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
