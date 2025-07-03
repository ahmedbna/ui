// Registry configuration for hello-wave component and demo

export const helloWaveRegistry = {
  // Main hello-wave component
  'hello-wave': {
    name: 'hello-wave',
    description:
      'An animated waving hand emoji component with smooth rotation animation.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/hello-wave.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-12-54_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-12-54_1.mov',
    },
  },

  // Default demo
  'hello-wave-demo': {
    name: 'hello-wave-demo',
    description: 'An animated waving hand emoji',
    type: 'registry:example',
    registryDependencies: ['hello-wave'],
    files: [
      {
        path: 'registry/demo/hello-wave/hello-wave-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-12-54_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-12-54_1.mov',
    },
  },
};
