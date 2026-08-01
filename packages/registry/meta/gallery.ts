// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const galleryMeta: ComponentMeta = {
  name: 'gallery',
  usage: {
    import: "import { Gallery } from '@/components/ui/gallery';",
    snippet:
      "const galleryItems = [\n  {\n    id: '1',\n    uri: 'https://picsum.photos/400/400?random=1',\n    title: 'Beautiful Landscape',\n    description: 'A stunning view of mountains and valleys',\n  },\n  {\n    id: '2',\n    uri: 'https://picsum.photos/400/400?random=2',\n    title: 'City Skyline',\n    description: 'Urban architecture at its finest',\n  },\n  // ... more items\n];\n\n<Gallery items={galleryItems} />;",
  },
  types: [
    {
      name: 'Gallery',
      description:
        'The main gallery component that displays images in a grid layout with fullscreen viewing capabilities.',
      props: [
        {
          name: 'items',
          type: 'GalleryItem[]',
          description: 'Array of gallery items to display.',
        },
        {
          name: 'columns',
          type: 'number',
          default: '`4`',
          description: 'Number of columns in the grid layout.',
        },
        {
          name: 'spacing',
          type: 'number',
          default: '`0`',
          description: 'Spacing between grid items in pixels.',
        },
        {
          name: 'borderRadius',
          type: 'number',
          default: '`0`',
          description: 'Border radius for gallery items.',
        },
        {
          name: 'aspectRatio',
          type: 'number',
          default: '`1`',
          description: 'Aspect ratio for gallery items (width/height).',
        },
        {
          name: 'showPages',
          type: 'boolean',
          default: '`false`',
          description: 'Show page indicator in fullscreen mode.',
        },
        {
          name: 'showTitles',
          type: 'boolean',
          default: '`false`',
          description: 'Show image titles in grid view.',
        },
        {
          name: 'showDescriptions',
          type: 'boolean',
          default: '`false`',
          description: 'Show image descriptions in grid view.',
        },
        {
          name: 'enableFullscreen',
          type: 'boolean',
          default: '`true`',
          description: 'Enable fullscreen viewing mode.',
        },
        {
          name: 'enableZoom',
          type: 'boolean',
          default: '`true`',
          description: 'Enable zoom functionality in fullscreen mode.',
        },
        {
          name: 'enableDownload',
          type: 'boolean',
          default: '`false`',
          description: 'Show download button in fullscreen mode.',
        },
        {
          name: 'enableShare',
          type: 'boolean',
          default: '`false`',
          description: 'Show share button in fullscreen mode.',
        },
        {
          name: 'onItemPress',
          type: '(item: GalleryItem, index: number) => void',
          description: 'Custom handler for item press events.',
        },
        {
          name: 'onDownload',
          type: '(item: GalleryItem) => void',
          description: 'Handler for download button press.',
        },
        {
          name: 'onShare',
          type: '(item: GalleryItem) => void',
          description: 'Handler for share button press.',
        },
        {
          name: 'renderCustomOverlay',
          type: '(item: GalleryItem, index: number) => React.ReactNode',
          description: 'Custom overlay renderer for grid items.',
        },
      ],
    },
    {
      name: 'GalleryItem',
      description: 'Interface for gallery items.',
      props: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'Unique identifier for the gallery item.',
        },
        {
          name: 'uri',
          type: 'string',
          required: true,
          description: 'Image URI for the full-size image.',
        },
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'Optional title for the image.',
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          description: 'Optional description for the image.',
        },
        {
          name: 'thumbnail',
          type: 'string',
          required: false,
          description: 'Optional thumbnail URI (falls back to `uri`).',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Gallery component includes accessibility features:',
    items: [
      'Proper keyboard navigation support',
      'Screen reader compatibility',
      'High contrast support for UI elements',
      'Semantic structure for assistive technologies',
      'Touch target sizes meet accessibility guidelines',
    ],
  },
};
