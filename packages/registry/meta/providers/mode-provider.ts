// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const modeProviderMeta: ComponentMeta = {
  name: 'mode-provider',
  usage: {
    import:
      "import { ModeProvider, useModeContext } from '@/providers/mode-provider';",
    snippet:
      "import * as SecureStore from 'expo-secure-store';\n\n<ModeProvider storage={SecureStore}>\n  <App />\n</ModeProvider>",
  },
  types: [
    {
      name: 'ModeProvider',
      description:
        'Holds the app-wide theme mode (`light`, `dark` or `system`) and resolves it to a concrete scheme. `useColorScheme` reads it when mounted, so an in-app toggle works on native *and* web — react-native-web has no `Appearance.setColorScheme` to write an override through. On native the choice is also mirrored into React Native `Appearance`, so the status bar and Android navigation bar follow. `ThemeProvider` mounts this for you.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'The wrapped app content.',
        },
        {
          name: 'storage',
          type: 'ModeStorage',
          required: false,
          description:
            'A key/value store — `{ getItem, setItem }`, sync or async, which `expo-secure-store` and `AsyncStorage` both satisfy as-is — used to persist the choice across launches. Omit it and the mode resets to `defaultMode` on every launch. A missing, malformed or unreadable value falls back to `defaultMode`, so a store that is unavailable on the current platform degrades to no persistence rather than an error.',
        },
        {
          name: 'storageKey',
          type: 'string',
          required: false,
          description:
            'Key the mode is persisted under. Defaults to `bna-ui.mode`.',
        },
        {
          name: 'defaultMode',
          type: "'light' | 'dark' | 'system'",
          required: false,
          description:
            'Mode used before anything is restored from storage. Defaults to `system`.',
        },
      ],
    },
    {
      name: 'useModeContext',
      description:
        'Returns `{ mode, setMode, scheme }`, or `null` when no `ModeProvider` is mounted — which is what lets `useColor` work without one. `scheme` is the resolved `light`/`dark` value; prefer it over re-deriving from `mode`. Most apps want `useModeToggle` instead.',
      props: [],
    },
  ],
};
