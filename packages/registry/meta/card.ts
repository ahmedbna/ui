// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const cardMeta: ComponentMeta = {
  name: 'card',
  usage: {
    import:
      "import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from '@/components/ui/card';",
    snippet:
      '<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card Content</p>\n  </CardContent>\n  <CardFooter>\n    <p>Card Footer</p>\n  </CardFooter>\n</Card>',
  },
  types: [
    {
      name: 'Card',
      description: 'The main container component that wraps all card content.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The card content (typically header/content/footer).',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the card container.',
        },
      ],
    },
    {
      name: 'CardHeader',
      description:
        "Container for the card's header content, typically containing title and description.",
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description:
            'The header content (typically CardTitle/CardDescription).',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the header container.',
        },
      ],
    },
    {
      name: 'CardTitle',
      description: 'The main title text of the card.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The title text content.',
        },
        {
          name: 'style',
          type: 'TextStyle',
          description: 'Additional styles to apply to the title text.',
        },
      ],
    },
    {
      name: 'CardDescription',
      description: 'Subtitle or description text for the card.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The description text content.',
        },
        {
          name: 'style',
          type: 'TextStyle',
          description: 'Additional styles to apply to the description text.',
        },
      ],
    },
    {
      name: 'CardContent',
      description: 'Container for the main content of the card.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The main content of the card.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the content container.',
        },
      ],
    },
    {
      name: 'CardFooter',
      description:
        "Container for the card's footer content, typically containing actions or additional info.",
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The footer content (typically buttons or actions).',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the footer container.',
        },
      ],
    },
  ],
};
