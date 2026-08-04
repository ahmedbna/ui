---
'bna-ui': patch
---

Scaffold `react-native-gesture-handler@~3.1.0`, the version Expo SDK 57 expects.

Expo moved SDK 57's recommended range from `~2.32.0` to `~3.1.0` server-side, so
every project the starters produced failed `npx expo install --check` and
`expo-doctor` on a clean scaffold:

```
The following packages should be updated for best compatibility with the installed expo version:
  react-native-gesture-handler@2.32.0 - expected version: ~3.1.0
```

All nine pins move together — the playground, the registry's dev dependency and
the seven starter/overlay `package.json` files — so the components keep being
built and shipped against the same version a scaffolded app installs.

No component source changed. The registry only ever used the modern gesture API
(`Gesture`, `GestureDetector`, `GestureHandlerRootView`), all of which v3 keeps;
the legacy `*GestureHandler` components v3 removed were never used here.
