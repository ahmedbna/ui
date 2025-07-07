// docs/registry/audio-waveform.ts
// Registry configuration for audio-waveform component and demo

export const audioWaveformRegistry = {
  // Main audio-waveform component
  'audio-waveform': {
    name: 'audio-waveform',
    description:
      'A customizable audio waveform visualization component with playback progress and interactive seeking capabilities.',
    type: 'registry:ui',
    registryDependencies: ['text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/audio-waveform.tsx',
        target: 'components/ui/audio-waveform.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-16-42_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-16-42_1.MP4',
    },
  },

  // Basic demo
  'audio-waveform-demo': {
    name: 'audio-waveform-demo',
    description:
      'A basic audio waveform with playback controls and progress tracking',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    hooks: [],
    theme: ['useThemeColor'],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-waveform/audio-waveform-demo.tsx',
        target: 'components/demo/audio-waveform/audio-waveform-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-16-42_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-16-42_1.MP4',
    },
  },

  // Recording demo
  'audio-waveform-recording': {
    name: 'audio-waveform-recording',
    description:
      'An animated waveform for recording visualization with real-time audio levels',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-waveform/audio-waveform-recording.tsx',
        target: 'components/demo/audio-waveform/audio-waveform-recording.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-17-56_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-17-56_1.MP4',
    },
  },

  // Interactive demo
  'audio-waveform-interactive': {
    name: 'audio-waveform-interactive',
    description:
      'A waveform with touch-based seeking functionality and custom audio data',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-waveform/audio-waveform-interactive.tsx',
        target: 'components/demo/audio-waveform/audio-waveform-interactive.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-17-31_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-17-31_1.MP4',
    },
  },

  // Styled demo
  'audio-waveform-styled': {
    name: 'audio-waveform-styled',
    description:
      'Multiple themed waveforms with custom colors, dimensions, and styles',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-waveform/audio-waveform-styled.tsx',
        target: 'components/demo/audio-waveform/audio-waveform-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-19-04_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-19-04_1.MP4',
    },
  },

  // Real-time demo
  'audio-waveform-realtime': {
    name: 'audio-waveform-realtime',
    description:
      'A waveform that updates with real-time audio data and configurable patterns',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-waveform/audio-waveform-realtime.tsx',
        target: 'components/demo/audio-waveform/audio-waveform-realtime.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-22-00_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-22-00_1.MP4',
    },
  },

  // Compact demo
  'audio-waveform-compact': {
    name: 'audio-waveform-compact',
    description:
      'Compact waveforms suitable for chat messages and minimal interfaces',
    type: 'registry:example',
    registryDependencies: ['audio-waveform', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-waveform/audio-waveform-compact.tsx',
        target: 'components/demo/audio-waveform/audio-waveform-compact.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-27-19_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 21-27-19_1.MP4',
    },
  },
};
