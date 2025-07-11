// templates/registry/charts/bar-chart.ts
// Registry configuration for bar-chart component and demos

export const barChartRegistry = {
  // Main bar-chart component
  'bar-chart': {
    name: 'bar-chart',
    description:
      'A customizable bar chart component with smooth animations and rounded corners.',
    type: 'registry:charts',
    dependencies: ['react-native-svg', 'react-native-reanimated'],
    registryDependencies: [],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:charts',
        path: 'templates/components/charts/bar-chart.tsx',
        target: 'components/ui/charts/bar-chart.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-dark.png',
    },
  },

  // Basic bar chart demo
  'bar-chart-demo': {
    name: 'bar-chart-demo',
    description: 'A basic bar chart with smooth animations and rounded corners',
    type: 'registry:example',
    registryDependencies: ['bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bar-chart-demo/bar-chart-demo.tsx',
        target: 'components/demo/charts/bar-chart-demo/bar-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-demo-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-demo-dark.png',
    },
  },

  // Horizontal bar chart demo
  'bar-chart-horizontal': {
    name: 'bar-chart-horizontal',
    description: 'A horizontal bar chart with custom colors',
    type: 'registry:example',
    registryDependencies: ['bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bar-chart/bar-chart-horizontal.tsx',
        target: 'components/demo/charts/bar-chart/bar-chart-horizontal.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-horizontal-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-horizontal-dark.png',
    },
  },

  // Stacked bar chart demo
  'bar-chart-stacked': {
    name: 'bar-chart-stacked',
    description: 'A stacked bar chart showing multiple data series',
    type: 'registry:example',
    registryDependencies: ['bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bar-chart/bar-chart-stacked.tsx',
        target: 'components/demo/charts/bar-chart/bar-chart-stacked.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-stacked-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-stacked-dark.png',
    },
  },

  // Minimal bar chart demo
  'bar-chart-minimal': {
    name: 'bar-chart-minimal',
    description: 'A minimal bar chart without labels',
    type: 'registry:example',
    registryDependencies: ['bar-chart'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bar-chart/bar-chart-minimal.tsx',
        target: 'components/demo/charts/bar-chart/bar-chart-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-minimal-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bar-chart-minimal-dark.png',
    },
  },
};
