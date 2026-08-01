// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const carouselMeta: ComponentMeta = {
  name: 'carousel',
  usage: {
    import:
      "import {\n  Carousel,\n  CarouselContent,\n  CarouselItem,\n} from '@/components/ui/carousel';",
    snippet:
      '<Carousel autoPlay showIndicators>\n  <CarouselItem>\n    <Text>Slide 1</Text>\n  </CarouselItem>\n  <CarouselItem>\n    <Text>Slide 2</Text>\n  </CarouselItem>\n  <CarouselItem>\n    <Text>Slide 3</Text>\n  </CarouselItem>\n</Carousel>',
  },
  accessibility: {
    summary:
      'The Carousel component includes comprehensive accessibility features:',
    items: [
      '**Screen Reader Support**: Proper announcements for navigation controls and slide changes',
      '**Keyboard Navigation**: Full keyboard support for focus management and navigation',
      '**Semantic Roles**: Appropriate ARIA roles for carousel structure and components',
      '**Accessible Indicators**: Dot indicators with descriptive labels and touch targets',
      "**Motion Preferences**: Respects user's reduced motion preferences",
      '**Focus Management**: Logical focus order and visible focus indicators',
      '**Alternative Text**: Support for image descriptions and content labels',
    ],
  },
};
