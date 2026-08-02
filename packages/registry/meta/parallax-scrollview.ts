// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const parallaxScrollviewMeta: ComponentMeta = {
  name: 'parallax-scrollview',
  usage: {
    import:
      "import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';\nimport { Image } from 'expo-image';",
    snippet:
      "<ParallaxScrollView\n  headerHeight={300}\n  headerImage={\n    <Image\n      source={{ uri: 'https://example.com/header-image.jpg' }}\n      style={{ width: '100%', height: '100%' }}\n      contentFit='cover'\n    />\n  }\n>\n  <Text>Your scrollable content goes here...</Text>\n</ParallaxScrollView>",
  },
  types: [
    {
      name: 'ParallaxScrollView',
      description: 'A scroll view with a header image that scales and translates as the user scrolls.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'The scrollable content rendered below the header.',
        },
        {
          name: 'headerHeight',
          type: 'number',
          default: '`250`',
          description: 'Height of the header image area.',
        },
        {
          name: 'headerImage',
          type: 'ReactElement',
          required: true,
          description: 'The element rendered in the parallax header.',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      'The ParallaxScrollView component follows accessibility best practices:',
    items: [
      'Gates the header parallax transform behind `useReducedMotion()`, so the header stays static for users with reduced motion enabled',
    ],
  },
};
