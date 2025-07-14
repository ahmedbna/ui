// templates/registry/charts/stacked-area-chart.ts
// Registry configuration for stacked-area-chart component and demos

export const stackedAreaChartRegistry = {
  // Main stacked-area-chart component
  'stacked-area-chart': {
    name: 'stacked-area-chart',
    description:
      'A customizable stacked area chart component with smooth animations and gradient fills for visualizing multiple data series over time.',
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
        path: 'templates/components/charts/stacked-area-chart.tsx',
        target: 'components/charts/stacked-area-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 20.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 20.MOV',
    },
  },

  // Basic stacked area chart demo
  'stacked-area-chart-demo': {
    name: 'stacked-area-chart-demo',
    description:
      'A stacked area chart with smooth animations and gradient fills',
    type: 'registry:example',
    registryDependencies: ['stacked-area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/stacked-area-chart/stacked-area-chart-demo.tsx',
        target:
          'components/demo/charts/stacked-area-chart/stacked-area-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 20.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 20.MOV',
    },
  },

  'stacked-area-chart-sample': {
    name: 'stacked-area-chart-sample',
    description: 'A sample stacked area chart with revenue data',
    type: 'registry:example',
    registryDependencies: ['stacked-area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/stacked-area-chart/stacked-area-chart-sample.tsx',
        target:
          'components/demo/charts/stacked-area-chart/stacked-area-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 24.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 24.MOV',
    },
  },

  'stacked-area-chart-styled': {
    name: 'stacked-area-chart-styled',
    description:
      'A customized stacked area chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['stacked-area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/stacked-area-chart/stacked-area-chart-styled.tsx',
        target:
          'components/demo/charts/stacked-area-chart/stacked-area-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 25.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 25.MOV',
    },
  },

  'stacked-area-chart-large': {
    name: 'stacked-area-chart-large',
    description: 'A stacked area chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['stacked-area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/stacked-area-chart/stacked-area-chart-large.tsx',
        target:
          'components/demo/charts/stacked-area-chart/stacked-area-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 21.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 21.MOV',
    },
  },
};
