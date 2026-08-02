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
  types: [
    {
      name: 'Carousel',
      description: 'The root carousel container, handling scrolling, paging, and auto-play.',
      props: [
        {
          name: 'children',
          type: 'ReactNode[]',
          required: true,
          description: 'The slides to render, one per array element.',
        },
        {
          name: 'autoPlay',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to automatically advance slides.',
        },
        {
          name: 'autoPlayInterval',
          type: 'number',
          default: '`3000`',
          description: 'Milliseconds between automatic slide advances.',
        },
        {
          name: 'showIndicators',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to render the dot indicators below the carousel.',
        },
        {
          name: 'showArrows',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to render previous/next arrow buttons.',
        },
        {
          name: 'loop',
          type: 'boolean',
          default: '`false`',
          description: 'Whether navigating past the last slide wraps to the first (and vice versa).',
        },
        {
          name: 'itemWidth',
          type: 'number',
          description: 'Fixed width per slide. Omit for full-width paging slides.',
        },
        {
          name: 'spacing',
          type: 'number',
          default: '`0`',
          description: 'Gap between slides when `itemWidth` is set.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the outer container.',
        },
        {
          name: 'onIndexChange',
          type: '(index: number) => void',
          description: 'Called when the active slide index changes.',
        },
      ],
    },
    {
      name: 'CarouselItem',
      description: 'A single slide wrapper with default card styling.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'The slide content.',
        },
        {
          name: 'style',
          type: 'ViewStyle | ViewStyle[]',
          description: 'Additional styles for the slide.',
        },
      ],
    },
    {
      name: 'CarouselContent',
      description: 'A plain, unstyled wrapper for slide content.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'The content to render.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles.',
        },
      ],
    },
    {
      name: 'CarouselIndicators',
      description: 'The dot indicators row. Rendered automatically by `Carousel` when `showIndicators` is true — use directly only for a custom layout.',
      props: [
        {
          name: 'total',
          type: 'number',
          required: true,
          description: 'Total number of slides.',
        },
        {
          name: 'current',
          type: 'number',
          required: true,
          description: 'Index of the active slide.',
        },
        {
          name: 'onPress',
          type: '(index: number) => void',
          description: 'Called when a dot is pressed.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the row.',
        },
      ],
    },
    {
      name: 'CarouselArrow',
      description: 'A previous/next arrow button. Rendered automatically by `Carousel` when `showArrows` is true — use directly only for a custom layout.',
      props: [
        {
          name: 'direction',
          type: "'left' | 'right'",
          required: true,
          description: 'Which direction the arrow navigates.',
        },
        {
          name: 'onPress',
          type: '() => void',
          required: true,
          description: 'Called when the arrow is pressed.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the arrow is disabled (e.g. at the first/last slide when not looping).',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the arrow.',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      'The Carousel component includes accessibility features:',
    items: [
      'Dot indicators expose `accessibilityLabel` (e.g. "Go to slide 2 of 5") and `accessibilityState={{ selected }}`',
      'Arrow buttons are labeled "Previous slide"/"Next slide" and report their disabled state',
    ],
  },
};
