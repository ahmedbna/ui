// definitions/charts/doughnut-chart.ts
// Registry configuration for doughnut-chart component and demos

export const doughnutChartRegistry = {
  // Main doughnut-chart component
  'doughnut-chart': {
    name: 'doughnut-chart',
    description:
      'A customizable doughnut chart component with smooth animations, interactive legends, and flexible styling.',
    type: 'registry:ui',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['text'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/doughnut-chart.tsx',
        target: 'components/charts/doughnut-chart.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0351-doughnut-chart-demo.MOV',
      dark: 'https://demo.ahmedbna.com/0351-doughnut-chart-demo.MOV',
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
        path: 'src/demo/charts/doughnut-chart/doughnut-chart-demo.tsx',
        target: 'components/demo/charts/doughnut-chart/doughnut-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0351-doughnut-chart-demo.MOV',
      dark: 'https://demo.ahmedbna.com/0351-doughnut-chart-demo.MOV',
    },
  },

  'doughnut-chart-sample': {
    name: 'doughnut-chart-sample',
    description: 'A sample doughnut chart with custom theme colors',
    type: 'registry:example',
    registryDependencies: ['doughnut-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/doughnut-chart/doughnut-chart-sample.tsx',
        target:
          'components/demo/charts/doughnut-chart/doughnut-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0352-doughnut-chart-sample.MOV',
      dark: 'https://demo.ahmedbna.com/0352-doughnut-chart-sample.MOV',
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
        path: 'src/demo/charts/doughnut-chart/doughnut-chart-styled.tsx',
        target:
          'components/demo/charts/doughnut-chart/doughnut-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0353-doughnut-chart-styled.MOV',
      dark: 'https://demo.ahmedbna.com/0353-doughnut-chart-styled.MOV',
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
        path: 'src/demo/charts/doughnut-chart/doughnut-chart-large.tsx',
        target:
          'components/demo/charts/doughnut-chart/doughnut-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0354-doughnut-chart-large.MOV',
      dark: 'https://demo.ahmedbna.com/0354-doughnut-chart-large.MOV',
    },
  },
};
