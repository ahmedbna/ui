// docs/registry/audio-recorder.ts
export const audioRecorderRegistry = {
  // Main audio recorder component
  'audio-recorder': {
    name: 'audio-recorder',
    description:
      'A comprehensive audio recording component with real-time waveform visualization, quality settings, and built-in playback capabilities.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: [
      'audio-player',
      'audio-waveform',
      'button',
      'text',
      'progress',
    ],
    files: [
      {
        path: 'registry/components/ui/audio-recorder.tsx',
        type: 'registry:ui',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-demo.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-voice.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-hq.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-minimal.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-styled.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-callbacks.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-cloud.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/audio-recorder/audio-recorder-interview.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-52-32_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 20-52-32_1.MP4',
    },
  },
};
