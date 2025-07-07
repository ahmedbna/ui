// Registry configuration for progress component and demo

export const progressRegistry = {
  // Main progress component
  progress: {
    name: 'progress',
    description:
      'A progress bar component to show completion status with optional interactivity.',
    type: 'registry:ui',
    dependencies: ['react-native-gesture-handler', 'react-native-reanimated'],
    registryDependencies: ['view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/progress.tsx',
        target: 'components/ui/progress.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5657.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5657.PNG',
    },
  },

  // Default demo
  'progress-demo': {
    name: 'progress-demo',
    description: 'A basic progress bar showing completion status',
    type: 'registry:example',
    registryDependencies: ['progress'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/progress/progress-demo.tsx',
        target: 'components/demo/progress/progress-demo.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5657.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5657.PNG',
    },
  },

  // Interactive example
  'progress-interactive': {
    name: 'progress-interactive',
    description: 'An interactive progress bar that can be dragged or tapped',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/progress/progress-interactive.tsx',
        target: 'components/demo/progress/progress-interactive.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-38-30_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-38-30_1.MP4',
    },
  },

  'progress-heights': {
    name: 'progress-heights',
    description: 'Progress bars with different heights',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/progress/progress-heights.tsx',
        target: 'components/demo/progress/progress-heights.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5660.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5660.PNG',
    },
  },

  'progress-labels': {
    name: 'progress-labels',
    description: 'Progress bars with percentage labels and descriptions',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/progress/progress-labels.tsx',
        target: 'components/demo/progress/progress-labels.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5661.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5661.PNG',
    },
  },

  'progress-animated': {
    name: 'progress-animated',
    description: 'Progress bars with smooth animations and transitions',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/progress/progress-animated.tsx',
        target: 'components/demo/progress/progress-animated.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-39-51_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-39-51_1.mov',
    },
  },

  'progress-media': {
    name: 'progress-media',
    description: 'Progress bars styled for media player controls',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/progress/progress-media.tsx',
        target: 'components/demo/progress/progress-media.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-40-29_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-40-29_1.mov',
    },
  },

  'progress-steps': {
    name: 'progress-steps',
    description: 'Multi-step progress indicators',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/progress/progress-steps.tsx',
        target: 'components/demo/progress/progress-steps.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-42-04_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-42-04_1.MP4',
    },
  },
};
