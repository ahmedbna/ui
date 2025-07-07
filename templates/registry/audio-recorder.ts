// docs/registry/audio-recorder.ts
export const audioRecorderRegistry = {
  // Main audio recorder component
  'audio-recorder': {
    name: 'audio-recorder',
    description:
      'A comprehensive audio recording component with real-time waveform visualization, quality settings, and built-in playback capabilities.',
    type: 'registry:ui',
    dependencies: ['expo-audio', 'lucide-react-native'],
    registryDependencies: ['audio-player', 'audio-waveform', 'button', 'text'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/audio-recorder.tsx',
        target: 'components/ui/audio-recorder.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-42-54_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-42-54_1.MP4',
    },
  },

  // Default demo
  'audio-recorder-demo': {
    name: 'audio-recorder-demo',
    description:
      'Full-featured audio recorder with real-time waveform and playback',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-demo.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-42-54_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-42-54_1.MP4',
    },
  },

  // Voice notes example
  'audio-recorder-voice': {
    name: 'audio-recorder-voice',
    description: 'Optimized recorder for quick voice notes with time limit',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-voice.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-voice.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-43-38_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-43-38_1.MP4',
    },
  },

  // High quality example
  'audio-recorder-hq': {
    name: 'audio-recorder-hq',
    description: 'High-quality recorder for music or professional audio',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-hq.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-hq.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-44-45_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-44-45_1.MP4',
    },
  },

  // Minimal example
  'audio-recorder-minimal': {
    name: 'audio-recorder-minimal',
    description: 'Minimal recorder without waveform visualization',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-minimal.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-46-02_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-46-02_1.MP4',
    },
  },

  // Styled example
  'audio-recorder-styled': {
    name: 'audio-recorder-styled',
    description: 'Audio recorder with custom styling and branding',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-styled.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-48-19_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-48-19_1.MP4',
    },
  },

  // Callbacks example
  'audio-recorder-callbacks': {
    name: 'audio-recorder-callbacks',
    description: 'Recorder with comprehensive callback handling',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-callbacks.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-callbacks.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-50-18_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-50-18_1.MP4',
    },
  },

  // Cloud integration example
  'audio-recorder-cloud': {
    name: 'audio-recorder-cloud',
    description: 'Recorder with cloud storage integration',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view', 'loading-spinner'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-cloud.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-cloud.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-51-43_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-51-43_1.MP4',
    },
  },

  // Interview mode example
  'audio-recorder-interview': {
    name: 'audio-recorder-interview',
    description: 'Long-form recorder optimized for interviews and meetings',
    type: 'registry:example',
    registryDependencies: ['audio-recorder', 'text', 'view', 'badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-recorder/audio-recorder-interview.tsx',
        target: 'components/demo/audio-recorder/audio-recorder-interview.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-52-32_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-52-32_1.MP4',
    },
  },
};
