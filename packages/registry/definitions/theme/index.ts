/**
 * Palette and layout data. The providers that *read* it live in
 * `definitions/providers/`.
 */
export const themeRegistry = {
  colors: {
    name: 'colors',
    description: 'colors',
    type: 'registry:theme',
    dependencies: [],
    files: [
      {
        type: 'registry:theme',
        path: 'src/theme/colors.ts',
        target: 'theme/colors.ts',
      },
    ],
  },

  globals: {
    name: 'globals',
    description: 'globals',
    type: 'registry:theme',
    dependencies: [],
    files: [
      {
        type: 'registry:theme',
        path: 'src/theme/globals.ts',
        target: 'theme/globals.ts',
      },
    ],
  },
};
