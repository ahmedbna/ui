// Registry configuration for chart-container component and demo

export const chartContainerRegistry = {
  // Main avatar component
  'chart-container': {
    name: 'chart-container',
    description:
      'A container component for wrapping charts with title, description, and consistent styling.',
    type: 'registry:ui',
    dependencies: ['expo-image'],
    registryDependencies: ['text', 'view', 'image'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/charts/chart-container.tsx',
        target: 'components/charts/chart-container.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-47-37_1.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-47-37_1.MOV',
    },
  },

  'chart-container-demo': {
    name: 'chart-container-demo',
    description: 'A basic chart container with title and description',
    type: 'registry:example',
    registryDependencies: ['chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/chart-container/chart-container-demo.tsx',
        target:
          'components/demo/charts/chart-container/chart-container-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-47-37_1.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-47-37_1.MOV',
    },
  },

  'chart-container-styled': {
    name: 'chart-container-styled',
    description: 'Chart container with custom styling',
    type: 'registry:example',
    registryDependencies: ['chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/chart-container/chart-container-styled.tsx',
        target:
          'components/demo/charts/chart-container/chart-container-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 16 5.41.34 PM.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 16 5.41.34 PM.MOV',
    },
  },
};
