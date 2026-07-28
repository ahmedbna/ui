---
'bna-ui': minor
---

Target Expo SDK 57 (React Native 0.86), and install dependencies with `expo install` in Expo projects.

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
