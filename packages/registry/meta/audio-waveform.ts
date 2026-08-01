// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const audioWaveformMeta: ComponentMeta = {
  name: 'audio-waveform',
  types: [
    {
      name: 'AudioWaveform',
      description: 'The main AudioWaveform component.',
      props: [
        {
          name: 'data',
          type: 'number[]',
          description:
            'Audio amplitude data (0-1 range). Auto-generated if not provided.',
        },
        {
          name: 'isPlaying',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the audio is currently playing.',
        },
        {
          name: 'progress',
          type: 'number',
          default: '`0`',
          description: 'Current playback progress (0-100).',
        },
        {
          name: 'onSeek',
          type: '(position: number) => void',
          description: 'Callback fired when user seeks to a position.',
        },
        {
          name: 'onSeekStart',
          type: '() => void',
          description: 'Callback fired when seeking starts.',
        },
        {
          name: 'onSeekEnd',
          type: '() => void',
          description: 'Callback fired when seeking ends.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the container.',
        },
        {
          name: 'height',
          type: 'number',
          default: '`60`',
          description: 'Height of the waveform in pixels.',
        },
        {
          name: 'barCount',
          type: 'number',
          default: '`50`',
          description: 'Number of bars in the waveform.',
        },
        {
          name: 'barWidth',
          type: 'number',
          default: '`3`',
          description: 'Width of each bar in pixels.',
        },
        {
          name: 'barGap',
          type: 'number',
          default: '`2`',
          description: 'Gap between bars in pixels.',
        },
        {
          name: 'activeColor',
          type: 'string',
          default: 'theme color',
          description: 'Color for played/active portion.',
        },
        {
          name: 'inactiveColor',
          type: 'string',
          default: 'theme color',
          description: 'Color for unplayed/inactive portion.',
        },
        {
          name: 'animated',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to animate the waveform during playback.',
        },
        {
          name: 'showProgress',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to show progress indicator.',
        },
        {
          name: 'interactive',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to enable touch-based seeking.',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      'The AudioWaveform component follows accessibility best practices:',
    items: [
      'Proper touch target sizes for interactive elements',
      'Screen reader support for progress information',
      'Respects system accessibility settings',
      'Keyboard navigation support where applicable',
    ],
  },
};
