// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const progressMeta: ComponentMeta = {
  name: 'progress',
  usage: {
    import: "import { Progress } from '@/components/ui/progress';",
    snippet: '<Progress value={65} />',
  },
  types: [
    {
      name: 'Progress',
      description: 'The main progress bar component.',
      props: [
        {
          name: 'value',
          type: 'number',
          description: 'The progress value between 0-100.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the progress container.',
        },
        {
          name: 'height',
          type: 'number',
          default: '`4`',
          description: 'The height of the progress bar in pixels.',
        },
        {
          name: 'onValueChange',
          type: '(value: number) => void',
          description:
            'Callback fired when the progress value changes (interactive).',
        },
        {
          name: 'onSeekStart',
          type: '() => void',
          description: 'Callback fired when seeking starts (interactive).',
        },
        {
          name: 'onSeekEnd',
          type: '() => void',
          description: 'Callback fired when seeking ends (interactive).',
        },
        {
          name: 'interactive',
          type: 'boolean',
          default: '`false`',
          description:
            'Whether the progress bar can be interacted with (tap/drag).',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Progress component is built with accessibility in mind:',
    items: [
      'Uses semantic structure for screen readers',
      'Supports gesture-based interaction when interactive',
      'Proper touch targets for interactive elements',
      'Smooth animations with reduced motion support',
      'Clear visual feedback for progress states',
    ],
  },
};
