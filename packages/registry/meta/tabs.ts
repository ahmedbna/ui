// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const tabsMeta: ComponentMeta = {
  name: 'tabs',
  usage: {
    import:
      "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';",
    snippet:
      "<Tabs defaultValue='tab1'>\n  <TabsList>\n    <TabsTrigger value='tab1'>Tab 1</TabsTrigger>\n    <TabsTrigger value='tab2'>Tab 2</TabsTrigger>\n    <TabsTrigger value='tab3'>Tab 3</TabsTrigger>\n  </TabsList>\n  <TabsContent value='tab1'>\n    <Text>Content for Tab 1</Text>\n  </TabsContent>\n  <TabsContent value='tab2'>\n    <Text>Content for Tab 2</Text>\n  </TabsContent>\n  <TabsContent value='tab3'>\n    <Text>Content for Tab 3</Text>\n  </TabsContent>\n</Tabs>",
  },
  types: [
    {
      name: 'Tabs',
      description: 'The root container for the tabs component.',
      props: [
        {
          name: 'haptic',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether to trigger haptic feedback when the active tab changes, by tap or by swipe. Programmatic changes stay silent.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The tabs list and content components.',
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: 'The value of the tab that should be active by default.',
        },
        {
          name: 'value',
          type: 'string',
          description:
            'The controlled active tab value. When provided, the component becomes controlled and `onValueChange` must be used to update it.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description:
            'Called whenever the active tab changes, whether by press or swipe.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "`'horizontal'`",
          description: 'The orientation of the tabs.',
        },
        {
          name: 'enableSwipe',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether horizontal tabs can be swiped between, in addition to pressing a trigger. Has no effect when `orientation` is `"vertical"`.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the container.',
        },
      ],
    },
    {
      name: 'TabsList',
      description: 'Container for the tab triggers.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The tab trigger components.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the tabs list.',
        },
      ],
    },
    {
      name: 'TabsTrigger',
      description: 'The clickable tab that activates its associated content.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The content of the tab trigger (usually text).',
        },
        {
          name: 'value',
          type: 'string',
          description: 'The unique value that identifies this tab.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the tab is disabled.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the trigger.',
        },
        {
          name: 'textStyle',
          type: 'TextStyle',
          description: 'Additional styles to apply to the trigger text.',
        },
      ],
    },
    {
      name: 'TabsContent',
      description: 'The content panel associated with a tab trigger.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The content to display when the tab is active.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'The value that matches the associated trigger.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the content.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Tabs component is built with accessibility in mind:',
    items: [
      '`TabsList` exposes `accessibilityRole="tablist"`, each `TabsTrigger` exposes `accessibilityRole="tab"` with `accessibilityState={{ selected, disabled }}`',
      'Disabled tabs report `accessibilityState.disabled` to screen readers',
    ],
  },
};
