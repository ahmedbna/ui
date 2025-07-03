// Registry configuration for mode-toggle component and demo

export const modeToggleRegistry = {
  // Main mode-toggle component
  'mode-toggle': {
    name: 'mode-toggle',
    description:
      'An animated button component for switching between light and dark themes.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native', 'react-native-reanimated'],
    registryDependencies: ['button', 'icon'],
    files: [
      {
        path: 'registry/components/ui/mode-toggle.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-11-16_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-11-16_1.MP4',
    },
  },

  // Default demo
  'mode-toggle-demo': {
    name: 'mode-toggle-demo',
    description: 'Animated theme toggle button',
    type: 'registry:example',
    registryDependencies: ['mode-toggle'],
    files: [
      {
        path: 'registry/demo/mode-toggle/mode-toggle-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-11-16_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-11-16_1.MP4',
    },
  },
};
