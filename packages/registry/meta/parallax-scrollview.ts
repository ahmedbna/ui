// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const parallaxScrollviewMeta: ComponentMeta = {
  "name": "parallax-scrollview",
  "usage": {
    "import": "import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';\nimport { Image } from 'expo-image';",
    "snippet": "<ParallaxScrollView\n  headerHeight={300}\n  headerImage={\n    <Image\n      source={{ uri: 'https://example.com/header-image.jpg' }}\n      style={{ width: '100%', height: '100%' }}\n      contentFit='cover'\n    />\n  }\n>\n  <Text>Your scrollable content goes here...</Text>\n</ParallaxScrollView>"
  },
  "accessibility": {
    "summary": "The ParallaxScrollView component follows accessibility best practices:",
    "items": [
      "Maintains scroll accessibility for screen readers",
      "Preserves focus management during animations",
      "Supports reduced motion preferences",
      "Compatible with VoiceOver and TalkBack"
    ]
  }
};
