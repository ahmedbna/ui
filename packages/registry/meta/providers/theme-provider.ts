// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const themeProviderMeta: ComponentMeta = {
  name: 'theme-provider',
  usage: {
    import: "import { ThemeProvider } from '@/providers/theme-provider';",
    snippet: '<ThemeProvider>\n  <App />\n</ThemeProvider>',
  },
  types: [
    {
      name: 'ThemeProvider',
      description:
        "Mounts `ModeProvider` (see `providers/mode-provider.tsx`) and wraps the app in React Navigation's `ThemeProvider`, mapping the current color scheme (via `useColorScheme`) onto navigation theme colors sourced from `Colors` in `theme/colors.ts`. Mounting this is what makes `useModeToggle` work.",
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
            'Forwarded to `ModeProvider`. Supply a key/value store — `expo-secure-store` and `AsyncStorage` both work unchanged — to persist the theme choice across launches.',
        },
        {
          name: 'storageKey',
          type: 'string',
          required: false,
          description:
            'Forwarded to `ModeProvider`. Key the mode is persisted under. Defaults to `bna-ui.mode`.',
        },
        {
          name: 'defaultMode',
          type: "'light' | 'dark' | 'system'",
          required: false,
          description:
            'Forwarded to `ModeProvider`. Mode used before anything is restored from storage. Defaults to `system`.',
        },
      ],
    },
  ],
};
