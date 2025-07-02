// Registry configuration for progress component and examples

export const progressRegistry = {
  // Main progress component
  progress: {
    name: 'progress',
    description:
      'A progress bar component to show completion status with optional interactivity.',
    type: 'registry:ui',
    dependencies: ['react-native-gesture-handler', 'react-native-reanimated'],
    registryDependencies: ['view'],
    files: [
      {
        path: 'registry/components/ui/progress.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Default demo
  'progress-demo': {
    name: 'progress-demo',
    description: 'A basic progress bar showing completion status',
    type: 'registry:example',
    registryDependencies: ['progress'],
    files: [
      {
        path: 'registry/examples/progress/progress-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Interactive example
  'progress-interactive': {
    name: 'progress-interactive',
    description: 'An interactive progress bar that can be dragged or tapped',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/progress/progress-interactive.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'progress-heights': {
    name: 'progress-heights',
    description: 'Progress bars with different heights',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/progress/progress-heights.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'progress-labels': {
    name: 'progress-labels',
    description: 'Progress bars with percentage labels and descriptions',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/progress/progress-labels.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'progress-animated': {
    name: 'progress-animated',
    description: 'Progress bars with smooth animations and transitions',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/progress/progress-animated.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'progress-media': {
    name: 'progress-media',
    description: 'Progress bars styled for media player controls',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/progress/progress-media.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'progress-steps': {
    name: 'progress-steps',
    description: 'Multi-step progress indicators',
    type: 'registry:example',
    registryDependencies: ['progress', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/progress/progress-steps.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
