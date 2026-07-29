// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const shareMeta: ComponentMeta = {
  "name": "share",
  "usage": {
    "import": "import { ShareButton, useShare } from '@/components/ui/share';",
    "snippet": "<ShareButton\n  content={{\n    message: 'Check out this amazing app!',\n    url: 'https://example.com',\n  }}\n>\n  Share\n</ShareButton>"
  },
  "accessibility": {
    "summary": "The Share component is built with accessibility in mind:",
    "items": [
      "Uses semantic button structure for screen readers",
      "Provides appropriate ARIA labels and roles",
      "Supports dynamic text sizing",
      "Maintains proper focus management",
      "Includes loading states for better user feedback"
    ]
  }
};
