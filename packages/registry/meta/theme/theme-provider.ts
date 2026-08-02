// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const themeProviderMeta: ComponentMeta = {
  name: 'theme-provider',
  usage: {
    import: "import { ThemeProvider } from '@/theme/theme-provider';",
    snippet: '<ThemeProvider>\n  <App />\n</ThemeProvider>',
  },
  types: [
    {
      name: 'ThemeProvider',
      description:
        "Wraps the app in React Navigation's `ThemeProvider`, mapping the current color scheme (via `useColorScheme`) onto navigation theme colors sourced from `Colors` in `theme/colors.ts`.",
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'The wrapped app content.',
        },
      ],
    },
  ],
};
