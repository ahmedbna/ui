// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const mediaPickerMeta: ComponentMeta = {
  name: 'media-picker',
  usage: {
    import: "import { MediaPicker } from '@/components/ui/media-picker';",
    snippet:
      "<MediaPicker\n  mediaType='all'\n  multiple={true}\n  maxSelection={5}\n  onSelectionChange={(assets) => console.log(assets)}\n/>",
  },
  types: [
    {
      name: 'MediaPicker',
      description:
        'The main component for selecting media from device gallery or camera.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description:
            'Custom trigger element. If not provided, uses default button.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the container.',
        },
        {
          name: 'size',
          type: 'ButtonSize',
          description: 'Size of the default button trigger.',
        },
        {
          name: 'variant',
          type: 'ButtonVariant',
          description: 'Variant of the default button trigger.',
        },
        {
          name: 'icon',
          type: 'ComponentType<LucideProps>',
          description: 'Icon for the default button trigger.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the media picker is disabled.',
        },
        {
          name: 'mediaType',
          type: "'image' | 'video' | 'all'",
          default: "`'all'`",
          description: 'Type of media to allow selection.',
        },
        {
          name: 'multiple',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to allow multiple selection.',
        },
        {
          name: 'maxSelection',
          type: 'number',
          default: '`10`',
          description: 'Maximum number of items that can be selected.',
        },
        {
          name: 'quality',
          type: "'low' | 'medium' | 'high'",
          default: "`'high'`",
          description: 'Quality of selected media.',
        },
        {
          name: 'buttonText',
          type: 'string',
          description: 'Text for the default button trigger.',
        },
        {
          name: 'placeholder',
          type: 'string',
          description: 'Placeholder text (currently unused).',
        },
        {
          name: 'gallery',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to show custom gallery modal.',
        },
        {
          name: 'showPreview',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show preview of selected media.',
        },
        {
          name: 'previewSize',
          type: 'number',
          default: '`80`',
          description: 'Size of preview thumbnails in pixels.',
        },
        {
          name: 'selectedAssets',
          type: 'MediaAsset[]',
          default: '`[]`',
          description: 'Controlled selected assets.',
        },
        {
          name: 'onSelectionChange',
          type: '(assets: MediaAsset[]) => void',
          description: 'Callback when selection changes.',
        },
        {
          name: 'onError',
          type: '(error: string) => void',
          description: 'Callback when an error occurs.',
        },
      ],
    },
    {
      name: 'MediaAsset',
      description: 'The interface for media assets returned by the picker.',
      props: [
        {
          name: 'id',
          type: 'string',
          description: 'Unique identifier for the asset.',
        },
        {
          name: 'uri',
          type: 'string',
          description: 'Local URI of the selected media.',
        },
        {
          name: 'type',
          type: "'image' | 'video'",
          description: 'Type of the media asset.',
        },
        {
          name: 'width',
          type: 'number?',
          description: 'Width of the media in pixels.',
        },
        {
          name: 'height',
          type: 'number?',
          description: 'Height of the media in pixels.',
        },
        {
          name: 'duration',
          type: 'number?',
          description: 'Duration in seconds for videos.',
        },
        {
          name: 'filename',
          type: 'string?',
          description: 'Original filename of the media.',
        },
        {
          name: 'fileSize',
          type: 'number?',
          description: 'File size in bytes.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The MediaPicker component is built with accessibility in mind:',
    items: [
      'Proper labeling for screen readers',
      'Keyboard navigation support',
      'High contrast support for buttons and indicators',
      'Semantic structure for better navigation',
      'Error announcements for screen readers',
    ],
  },
};
