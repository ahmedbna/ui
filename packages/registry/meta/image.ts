// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const imageMeta: ComponentMeta = {
  name: 'image',
  usage: {
    import: "import { Image } from '@/components/ui/image';",
    snippet:
      "<Image\n  source={{ uri: 'https://picsum.photos/400/300' }}\n  width={400}\n  height={300}\n/>",
  },
  types: [
    {
      name: 'Image',
      description:
        'A responsive image component with loading states and error handling.',
      props: [
        {
          name: 'source',
          type: 'ImageSource',
          description: 'The image source (required).',
        },
        {
          name: 'full',
          type: 'boolean',
          default: '`true`',
          description: 'Whether the image should fill its container.',
        },
        {
          name: 'variant',
          type: "'rounded' | 'circle'",
          default: "`'rounded'`",
          description: 'The border radius variant.',
        },
        {
          name: 'width',
          type: 'number | string',
          description: 'The width of the image.',
        },
        {
          name: 'height',
          type: 'number | string',
          description: 'The height of the image.',
        },
        {
          name: 'aspectRatio',
          type: 'number',
          description: 'The aspect ratio of the image.',
        },
        {
          name: 'contentFit',
          type: 'ContentFit',
          default: "`'cover'`",
          description: 'How the image should fit within its bounds.',
        },
        {
          name: 'showLoadingIndicator',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show loading indicator.',
        },
        {
          name: 'showErrorFallback',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show error fallback.',
        },
        {
          name: 'errorFallbackText',
          type: 'string',
          default: "`'Failed to load image'`",
          description: 'The error fallback text.',
        },
        {
          name: 'loadingIndicatorSize',
          type: "'small' | 'large'",
          default: "`'small'`",
          description: 'The size of the loading indicator.',
        },
        {
          name: 'loadingIndicatorColor',
          type: 'string',
          description: 'The color of the loading indicator.',
        },
        {
          name: 'transition',
          type: 'number',
          default: '`200`',
          description: 'The transition duration in milliseconds.',
        },
        {
          name: 'style',
          type: "ImageProps['style']",
          description: 'Additional styles to apply to the image.',
        },
        {
          name: 'containerStyle',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the container.',
        },
        {
          name: 'onLoadStart',
          type: '() => void',
          description: 'Callback when image starts loading.',
        },
        {
          name: 'onLoadEnd',
          type: '() => void',
          description: 'Callback when image finishes loading.',
        },
        {
          name: 'onError',
          type: '() => void',
          description: 'Callback when image fails to load.',
        },
      ],
    },
  ],
  variants: [
    {
      name: 'Content Fit Options',
      description: 'The `contentFit` prop accepts the following values:',
      values: [
        {
          value: 'cover',
          description: 'Scale the image to cover the entire container',
        },
        {
          value: 'contain',
          description: 'Scale the image to fit within the container',
        },
        {
          value: 'fill',
          description: 'Stretch the image to fill the container',
        },
        {
          value: 'none',
          description: 'Display the image at its natural size',
        },
        {
          value: 'scale-down',
          description: "Scale down the image if it's larger than the container",
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Image component is built with accessibility in mind:',
    items: [
      'Supports `accessibilityLabel` for screen readers',
      'Error fallback provides alternative content when images fail to load',
      'Loading indicators communicate loading state to assistive technologies',
      'Proper semantic structure for better navigation',
    ],
  },
};
