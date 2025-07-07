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
    hooks: ['useModeToggle'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/mode-toggle.tsx',
        target: 'components/ui/mode-toggle.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/mode-toggle/mode-toggle-demo.tsx',
        target: 'components/demo/mode-toggle/mode-toggle-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-11-16_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-11-16_1.MP4',
    },
  },
};
