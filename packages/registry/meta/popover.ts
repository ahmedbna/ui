// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const popoverMeta: ComponentMeta = {
  name: 'popover',
  usage: {
    import:
      "import {\n  Popover,\n  PopoverBody,\n  PopoverClose,\n  PopoverContent,\n  PopoverFooter,\n  PopoverHeader,\n  PopoverTrigger,\n} from '@/components/ui/popover';",
    snippet:
      "<Popover>\n  <PopoverTrigger>\n    <Button>Open Popover</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <PopoverHeader>\n      <Text>Popover Title</Text>\n    </PopoverHeader>\n    <PopoverBody>\n      <Text>This is the popover content.</Text>\n    </PopoverBody>\n    <PopoverFooter>\n      <PopoverClose>\n        <Button variant='outline'>Close</Button>\n      </PopoverClose>\n    </PopoverFooter>\n  </PopoverContent>\n</Popover>",
  },
  types: [
    {
      name: 'Popover',
      description:
        'The root component that manages the popover state and provides context.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The popover trigger and content components.',
        },
        {
          name: 'open',
          type: 'boolean',
          default: '`false`',
          description: 'Controls the open state of the popover.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Callback fired when the open state changes.',
        },
      ],
    },
    {
      name: 'PopoverTrigger',
      description: 'The element that triggers the popover when pressed.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The trigger content.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: '`false`',
          description: 'When true, merges props with the child element.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the trigger container.',
        },
      ],
    },
    {
      name: 'PopoverContent',
      description:
        'The container for the popover content with positioning logic.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The popover content.',
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          default: '`center`',
          description: 'How to align the popover relative to the trigger.',
        },
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          default: '`bottom`',
          description: 'The preferred side of the trigger to position against.',
        },
        {
          name: 'sideOffset',
          type: 'number',
          default: '`8`',
          description: 'The distance between the trigger and the popover.',
        },
        {
          name: 'alignOffset',
          type: 'number',
          default: '`0`',
          description: 'An offset in pixels from the alignment position.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the content container.',
        },
        {
          name: 'maxWidth',
          type: 'number',
          default: '`300`',
          description: 'Maximum width of the popover in pixels.',
        },
        {
          name: 'maxHeight',
          type: 'number',
          default: '`400`',
          description: 'Maximum height of the popover in pixels.',
        },
      ],
    },
    {
      name: 'PopoverHeader',
      description: 'A header section for the popover content.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The header content.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the header container.',
        },
      ],
    },
    {
      name: 'PopoverBody',
      description: 'The main content area of the popover.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The body content.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the body container.',
        },
      ],
    },
    {
      name: 'PopoverFooter',
      description: 'A footer section for the popover content.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The footer content.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the footer container.',
        },
      ],
    },
    {
      name: 'PopoverClose',
      description: 'A utility component that closes the popover when pressed.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The close trigger content.',
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: '`false`',
          description: 'When true, merges props with the child element.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the close container.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Popover component is built with accessibility in mind:',
    items: [
      'Proper focus management when opening and closing',
      'Keyboard navigation support (Escape to close)',
      'Screen reader compatible with proper ARIA attributes',
      'Touch-friendly interaction areas',
      "Respects user's motion preferences",
    ],
  },
};
