// templates/registry/charts/radar-chart.ts
// Registry configuration for radar-chart component and demos

export const radarChartRegistry = {
  // Main radar-chart component
  'radar-chart': {
    name: 'radar-chart',
    description:
      'A customizable radar chart component with smooth animations and flexible styling for displaying multi-dimensional data.',
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
        path: 'templates/components/charts/radar-chart.tsx',
        target: 'components/ui/charts/radar-chart.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Basic radar chart demo
  'radar-chart-demo': {
    name: 'radar-chart-demo',
    description: 'A radar chart with smooth animations',
    type: 'registry:example',
    registryDependencies: ['radar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radar-chart/radar-chart-demo.tsx',
        target: 'components/demo/charts/radar-chart/radar-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'radar-chart-sample': {
    name: 'radar-chart-sample',
    description: 'A sample radar chart',
    type: 'registry:example',
    registryDependencies: ['radar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radar-chart/radar-chart-sample.tsx',
        target: 'components/demo/charts/radar-chart/radar-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'radar-chart-styled': {
    name: 'radar-chart-styled',
    description: 'A customized radar chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['radar-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radar-chart/radar-chart-styled.tsx',
        target: 'components/demo/charts/radar-chart/radar-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'radar-chart-large': {
    name: 'radar-chart-large',
    description: 'A radar chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['radar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radar-chart/radar-chart-large.tsx',
        target: 'components/demo/charts/radar-chart/radar-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
