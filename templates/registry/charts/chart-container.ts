// Registry configuration for chart-container component and demo

export const chartContainerRegistry = {
  // Main avatar component
  'chart-container': {
    name: 'chart-container',
    description:
      'A container component for wrapping charts with title, description, and consistent styling.',
    type: 'registry:charts',
    dependencies: ['expo-image'],
    registryDependencies: ['text', 'view', 'image'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:charts',
        path: 'templates/components/ui/charts/chart-container.tsx',
        target: 'components/ui/charts/chart-container.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
