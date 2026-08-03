// Registry configuration for progress component and demo

export const progressRegistry = {
  // Main progress component
  progress: {
    name: 'progress',
    description:
      'A progress bar component to show completion status with optional interactivity.',
    type: 'registry:ui',
    dependencies: [
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/progress.tsx',
        target: 'components/ui/progress.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0226-progress-demo.PNG',
      dark: 'https://demo.ahmedbna.com/0226-progress-demo.PNG',
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
        path: 'src/demo/progress/progress-demo.tsx',
        target: 'components/demo/progress/progress-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0226-progress-demo.PNG',
      dark: 'https://demo.ahmedbna.com/0226-progress-demo.PNG',
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
        path: 'src/demo/progress/progress-interactive.tsx',
        target: 'components/demo/progress/progress-interactive.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0227-progress-interactive.MP4',
      dark: 'https://demo.ahmedbna.com/0227-progress-interactive.MP4',
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
        path: 'src/demo/progress/progress-heights.tsx',
        target: 'components/demo/progress/progress-heights.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0228-progress-heights.PNG',
      dark: 'https://demo.ahmedbna.com/0228-progress-heights.PNG',
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
        path: 'src/demo/progress/progress-labels.tsx',
        target: 'components/demo/progress/progress-labels.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0229-progress-labels.PNG',
      dark: 'https://demo.ahmedbna.com/0229-progress-labels.PNG',
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
        path: 'src/demo/progress/progress-animated.tsx',
        target: 'components/demo/progress/progress-animated.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0230-progress-animated.mov',
      dark: 'https://demo.ahmedbna.com/0230-progress-animated.mov',
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
        path: 'src/demo/progress/progress-media.tsx',
        target: 'components/demo/progress/progress-media.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0231-progress-media.mov',
      dark: 'https://demo.ahmedbna.com/0231-progress-media.mov',
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
        path: 'src/demo/progress/progress-steps.tsx',
        target: 'components/demo/progress/progress-steps.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0232-progress-steps.MP4',
      dark: 'https://demo.ahmedbna.com/0232-progress-steps.MP4',
    },
  },
};
