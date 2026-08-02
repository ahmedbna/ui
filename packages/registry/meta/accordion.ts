// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const accordionMeta: ComponentMeta = {
  name: 'accordion',
  usage: {
    import:
      "import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from '@/components/ui/accordion';",
    snippet:
      "<Accordion type='single' collapsible>\n  <AccordionItem value='item-1'>\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>",
  },
  types: [
    {
      name: 'Accordion',
      description: 'Contains all the parts of a collapsible accordion.',
      props: [
        {
          name: 'type',
          type: "'single' | 'multiple'",
          description:
            'Determines whether one or multiple items can be opened at the same time.',
        },
        {
          name: 'value',
          type: 'string | string[]',
          description:
            'The controlled value of the item to expand when `type` is `"single"` or the controlled values of the items to expand when `type` is `"multiple"`.',
        },
        {
          name: 'defaultValue',
          type: 'string | string[]',
          description:
            'The value of the item to expand when initially rendered when `type` is `"single"` or the values of the items to expand when initially rendered when `type` is `"multiple"`.',
        },
        {
          name: 'onValueChange',
          type: '(value: string | string[]) => void',
          description:
            'Event handler called when the expanded state of an item changes.',
        },
        {
          name: 'collapsible',
          type: 'boolean',
          default: '`false`',
          description:
            'When `type` is `"single"`, allows closing content when clicking trigger for an open item.',
        },
      ],
    },
    {
      name: 'AccordionItem',
      description: 'Contains all the parts of a collapsible item.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: 'A unique value for the item.',
        },
      ],
    },
    {
      name: 'AccordionTrigger',
      description: 'Toggles the collapsed state of its associated item.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'The content to display in the trigger.',
        },
      ],
    },
    {
      name: 'AccordionContent',
      description: 'Contains the collapsible content for an item.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'The content to display when the item is expanded.',
        },
        {
          name: 'style',
          type: 'object',
          description: 'Additional styles to apply to the content container.',
        },
      ],
    },
  ],
};
