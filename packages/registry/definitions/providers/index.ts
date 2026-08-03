/**
 * React context providers an app mounts at its root.
 *
 * Separate from `theme/` — which is palette and layout *data* (`colors`,
 * `globals`) — so the folder a file lands in says what kind of thing it is.
 */
export const providersRegistry = {
  'mode-provider': {
    name: 'mode-provider',
    description:
      'App-wide light/dark/system theme mode, with optional persistence.',
    type: 'registry:theme',
    dependencies: [],
    files: [
      {
        type: 'registry:theme',
        path: 'src/providers/mode-provider.tsx',
        target: 'providers/mode-provider.tsx',
      },
    ],
  },

  'theme-provider': {
    name: 'theme-provider',
    description: 'Theme Provider',
    type: 'registry:theme',
    dependencies: ['expo-router'],
    hooks: ['useColorScheme'],
    providers: ['mode-provider'],
    theme: ['colors'],
    files: [
      {
        type: 'registry:theme',
        path: 'src/providers/theme-provider.tsx',
        target: 'providers/theme-provider.tsx',
      },
    ],
  },
};
