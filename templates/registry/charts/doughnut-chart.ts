// templates/registry/charts/doughnut-chart.ts
// Registry configuration for doughnut-chart component and demos

export const doughnutChartRegistry = {
  // Main doughnut-chart component
  'doughnut-chart': {
    name: 'doughnut-chart',
    description:
      'A customizable doughnut chart component with smooth animations, interactive legends, and flexible styling.',
    type: 'registry:charts',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-gesture-handler',
    ],
    registryDependencies: ['text'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:charts',
        path: 'templates/components/charts/doughnut-chart.tsx',
        target: 'components/charts/doughnut-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-dark.png',
    },
  },

  // Basic doughnut chart demo
  'doughnut-chart-demo': {
    name: 'doughnut-chart-demo',
    description:
      'A doughnut chart with smooth animations and percentage labels',
    type: 'registry:example',
    registryDependencies: ['doughnut-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/doughnut-chart/doughnut-chart-demo.tsx',
        target: 'components/demo/charts/doughnut-chart/doughnut-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-demo-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-demo-dark.png',
    },
  },

  'doughnut-chart-sample': {
    name: 'doughnut-chart-sample',
    description: 'A sample doughnut chart with custom theme colors',
    type: 'registry:example',
    registryDependencies: ['doughnut-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/doughnut-chart/doughnut-chart-sample.tsx',
        target:
          'components/demo/charts/doughnut-chart/doughnut-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-sample-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-sample-dark.png',
    },
  },

  'doughnut-chart-styled': {
    name: 'doughnut-chart-styled',
    description: 'A customized doughnut chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['doughnut-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/doughnut-chart/doughnut-chart-styled.tsx',
        target:
          'components/demo/charts/doughnut-chart/doughnut-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-styled-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-styled-dark.png',
    },
  },

  'doughnut-chart-large': {
    name: 'doughnut-chart-large',
    description: 'A doughnut chart with large dataset and legend-only labels',
    type: 'registry:example',
    registryDependencies: ['doughnut-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/doughnut-chart/doughnut-chart-large.tsx',
        target:
          'components/demo/charts/doughnut-chart/doughnut-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-large-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/doughnut-chart-large-dark.png',
    },
  },
};
