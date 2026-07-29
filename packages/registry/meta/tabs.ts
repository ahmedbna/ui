// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const tabsMeta: ComponentMeta = {
  "name": "tabs",
  "usage": {
    "import": "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';",
    "snippet": "<Tabs defaultValue='tab1'>\n  <TabsList>\n    <TabsTrigger value='tab1'>Tab 1</TabsTrigger>\n    <TabsTrigger value='tab2'>Tab 2</TabsTrigger>\n    <TabsTrigger value='tab3'>Tab 3</TabsTrigger>\n  </TabsList>\n  <TabsContent value='tab1'>\n    <Text>Content for Tab 1</Text>\n  </TabsContent>\n  <TabsContent value='tab2'>\n    <Text>Content for Tab 2</Text>\n  </TabsContent>\n  <TabsContent value='tab3'>\n    <Text>Content for Tab 3</Text>\n  </TabsContent>\n</Tabs>"
  },
  "types": [
    {
      "name": "Tabs",
      "description": "The root container for the tabs component.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The tabs list and content components."
        },
        {
          "name": "defaultValue",
          "type": "string",
          "description": "The value of the tab that should be active by default."
        },
        {
          "name": "orientation",
          "type": "'horizontal' | 'vertical'",
          "default": "`'horizontal'`",
          "description": "The orientation of the tabs."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the container."
        }
      ]
    },
    {
      "name": "TabsList",
      "description": "Container for the tab triggers.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The tab trigger components."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the tabs list."
        }
      ]
    },
    {
      "name": "TabsTrigger",
      "description": "The clickable tab that activates its associated content.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The content of the tab trigger (usually text)."
        },
        {
          "name": "value",
          "type": "string",
          "description": "The unique value that identifies this tab."
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether the tab is disabled."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the trigger."
        },
        {
          "name": "textStyle",
          "type": "TextStyle",
          "description": "Additional styles to apply to the trigger text."
        }
      ]
    },
    {
      "name": "TabsContent",
      "description": "The content panel associated with a tab trigger.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The content to display when the tab is active."
        },
        {
          "name": "value",
          "type": "string",
          "description": "The value that matches the associated trigger."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the content."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Tabs component is built with accessibility in mind:",
    "items": [
      "Uses proper ARIA roles and properties for screen readers",
      "Supports keyboard navigation between tabs",
      "Active tab is properly announced to screen readers",
      "Disabled tabs are marked as inaccessible",
      "Content is properly associated with its trigger"
    ]
  }
};
