// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const avatarMeta: ComponentMeta = {
  "name": "avatar",
  "usage": {
    "import": "import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';",
    "snippet": "<Avatar>\n  <AvatarImage\n    source={{ uri: 'https://avatars.githubusercontent.com/u/99088394?v=4' }}\n  />\n  <AvatarFallback>AB</AvatarFallback>\n</Avatar>"
  },
  "types": [
    {
      "name": "Avatar",
      "description": "The container component that wraps the avatar image and fallback.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The avatar image and fallback components."
        },
        {
          "name": "size",
          "type": "number",
          "default": "`40`",
          "description": "The size of the avatar in pixels."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the avatar container."
        }
      ]
    },
    {
      "name": "AvatarImage",
      "description": "The image component that displays the user's avatar.",
      "props": [
        {
          "name": "source",
          "type": "ImageSource",
          "description": "The image source for the avatar."
        },
        {
          "name": "style",
          "type": "ImageProps.style",
          "description": "Additional styles to apply to the image."
        }
      ]
    },
    {
      "name": "AvatarFallback",
      "description": "The fallback component that displays when the image fails to load or is not provided.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The fallback content (usually initials or text)."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the fallback container."
        },
        {
          "name": "textStyle",
          "type": "TextStyle",
          "description": "Additional styles to apply to the fallback text."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Avatar component is built with accessibility in mind:",
    "items": [
      "Uses semantic structure for screen readers",
      "Fallback text provides alternative content when images fail to load",
      "Proper contrast ratios for text fallbacks",
      "Supports dynamic text sizing"
    ]
  }
};
