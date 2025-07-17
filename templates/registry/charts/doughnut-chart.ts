// templates/registry/charts/doughnut-chart.ts
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
      'react-native-gesture-handler',
    ],
    registryDependencies: ['text'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/charts/doughnut-chart.tsx',
        target: 'components/charts/doughnut-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 56.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 56.MOV',
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
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 56.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 56.MOV',
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
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 55.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 55.MOV',
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
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 54.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 54.MOV',
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
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 53.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 53.MOV',
    },
  },
};
