// Registry configuration for chart-container component and demo

export const chartContainerRegistry = {
  // Main avatar component
  'chart-container': {
    name: 'chart-container',
    description:
      'A container component for wrapping charts with title, description, and consistent styling.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/chart-container.tsx',
        target: 'components/charts/chart-container.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0345-chart-container-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0345-chart-container-demo.MOV',
    },
  },

  'chart-container-demo': {
    name: 'chart-container-demo',
    description: 'A basic chart container with title and description',
    type: 'registry:example',
    registryDependencies: ['chart-container', 'line-chart'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/chart-container/chart-container-demo.tsx',
        target:
          'components/demo/charts/chart-container/chart-container-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0345-chart-container-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0345-chart-container-demo.MOV',
    },
  },

  'chart-container-styled': {
    name: 'chart-container-styled',
    description: 'Chart container with custom styling',
    type: 'registry:example',
    registryDependencies: ['chart-container', 'line-chart'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/chart-container/chart-container-styled.tsx',
        target:
          'components/demo/charts/chart-container/chart-container-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0346-chart-container-styled.MOV',
      dark: 'https://ui.ahmedbna.com/0346-chart-container-styled.MOV',
    },
  },
};
