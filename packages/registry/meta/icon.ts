// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const iconMeta: ComponentMeta = {
  name: 'icon',
  usage: {
    import:
      "import { Icon } from '@/components/ui/icon';\nimport { Heart, Star, Home } from 'lucide-react-native';",
    snippet:
      '<Icon name={Heart} size={24} />\n<Icon name={Star} color="#FFD700" />\n<Icon name={Home} lightColor="#000" darkColor="#fff" />',
  },
  types: [
    {
      name: 'Icon',
      description:
        'The main icon component that renders Lucide React Native icons with theming support.',
      props: [
        {
          name: 'name',
          type: 'React.ComponentType<LucideProps>',
          description: 'The Lucide icon component to render.',
        },
        {
          name: 'size',
          type: 'number',
          default: '`24`',
          description: 'The size of the icon in pixels.',
        },
        {
          name: 'color',
          type: 'string',
          description: 'Custom color for the icon.',
        },
        {
          name: 'lightColor',
          type: 'string',
          description: 'Color to use in light theme.',
        },
        {
          name: 'darkColor',
          type: 'string',
          description: 'Color to use in dark theme.',
        },
        {
          name: 'strokeWidth',
          type: 'number',
          default: '`1.8`',
          description: 'The stroke width of the icon.',
        },
        {
          name: '...rest',
          type: 'LucideProps',
          description: 'Additional props passed to the Lucide icon component.',
        },
      ],
    },
    {
      name: 'LucideProps',
      description:
        'The Icon component accepts all props from Lucide React Native icons:',
      props: [
        {
          name: 'strokeLinecap',
          type: 'string',
          default: '`round`',
          description: 'The line cap style for strokes.',
        },
        {
          name: 'strokeLinejoin',
          type: 'string',
          description: 'The line join style for strokes.',
        },
        {
          name: 'fill',
          type: 'string',
          description: 'Fill color for the icon.',
        },
        {
          name: 'fillOpacity',
          type: 'number',
          description: 'Opacity of the fill color.',
        },
        {
          name: 'strokeOpacity',
          type: 'number',
          description: 'Opacity of the stroke color.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Icon component is built with accessibility in mind:',
    items: [
      'Icons are decorative by default and hidden from screen readers',
      'When icons convey important information, wrap them with accessible text',
      'Proper color contrast for themed icons',
      'Supports dynamic text sizing through size prop',
    ],
  },
};
