// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const sheetMeta: ComponentMeta = {
  "name": "sheet",
  "usage": {
    "import": "import {\n  Sheet,\n  SheetContent,\n  SheetDescription,\n  SheetHeader,\n  SheetTitle,\n  SheetTrigger,\n} from '@/components/ui/sheet';",
    "snippet": "<Sheet>\n  <SheetTrigger>\n    <Button>Open Sheet</Button>\n  </SheetTrigger>\n  <SheetContent>\n    <SheetHeader>\n      <SheetTitle>Sheet Title</SheetTitle>\n      <SheetDescription>\n        This is a description of the sheet content.\n      </SheetDescription>\n    </SheetHeader>\n    {/* Your content here */}\n  </SheetContent>\n</Sheet>"
  },
  "types": [
    {
      "name": "Sheet",
      "description": "The root component that manages the sheet state and provides context to child components.",
      "props": [
        {
          "name": "open",
          "type": "boolean",
          "description": "Controls whether the sheet is open or closed."
        },
        {
          "name": "onOpenChange",
          "type": "(open: boolean) => void",
          "description": "Callback fired when the sheet state changes."
        },
        {
          "name": "side",
          "type": "'left' | 'right'",
          "default": "`'right'`",
          "description": "The side from which the sheet slides in."
        },
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The sheet trigger and content components."
        }
      ]
    },
    {
      "name": "SheetTrigger",
      "description": "The trigger component that opens the sheet when pressed.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The trigger content (usually a button or text)."
        },
        {
          "name": "asChild",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether to render as a child component."
        }
      ]
    },
    {
      "name": "SheetContent",
      "description": "The main content container that slides in from the specified side.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The content to display inside the sheet."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the content container."
        }
      ]
    },
    {
      "name": "SheetHeader",
      "description": "A header component that provides consistent spacing and layout for the sheet title and description.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The header content (title and description)."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the header."
        }
      ]
    },
    {
      "name": "SheetTitle",
      "description": "The title component for the sheet header.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The title text or content."
        }
      ]
    },
    {
      "name": "SheetDescription",
      "description": "The description component for the sheet header.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The description text or content."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Sheet component is built with accessibility in mind:",
    "items": [
      "Uses native Modal component for proper focus management",
      "Includes proper ARIA attributes for screen readers",
      "Supports keyboard navigation and dismissal",
      "Close button is positioned for easy access",
      "Overlay can be pressed to dismiss the sheet",
      "Proper hit areas for touch targets"
    ]
  }
};
