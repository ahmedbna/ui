// templates/registry/charts/column-chart.ts
// Registry configuration for column-chart component and demos

export const columnChartRegistry = {
  // Main column-chart component
  'column-chart': {
    name: 'column-chart',
    description:
      'A customizable horizontal bar chart component with smooth animations and flexible styling.',
    type: 'registry:charts',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-gesture-handler',
    ],
    registryDependencies: [],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:charts',
        path: 'templates/components/ui/charts/column-chart.tsx',
        target: 'components/ui/charts/column-chart.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Basic column chart demo
  'column-chart-demo': {
    name: 'column-chart-demo',
    description: 'A horizontal bar chart with smooth animations',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/column-chart/column-chart-demo.tsx',
        target: 'components/demo/charts/column-chart/column-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'column-chart-sample': {
    name: 'column-chart-sample',
    description: 'An sample column chart',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/column-chart/column-chart-sample.tsx',
        target: 'components/demo/charts/column-chart/column-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'column-chart-styled': {
    name: 'column-chart-styled',
    description: 'A customized column chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/column-chart/column-chart-styled.tsx',
        target: 'components/demo/charts/column-chart/column-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'column-chart-large': {
    name: 'column-chart-large',
    description: 'A column chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/column-chart/column-chart-large.tsx',
        target: 'components/demo/charts/column-chart/column-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
