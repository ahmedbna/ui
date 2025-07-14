// templates/registry/charts/scatter-chart.ts
// Registry configuration for scatter-chart component and demos

export const scatterChartRegistry = {
  // Main scatter-chart component
  'scatter-chart': {
    name: 'scatter-chart',
    description:
      'A customizable scatter plot component with smooth animations and flexible styling for visualizing data relationships.',
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
        path: 'templates/components/charts/scatter-chart.tsx',
        target: 'components/charts/scatter-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 48.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 48.MOV',
    },
  },

  // Basic scatter chart demo
  'scatter-chart-demo': {
    name: 'scatter-chart-demo',
    description: 'A scatter plot with smooth animations',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/scatter-chart/scatter-chart-demo.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 48.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 48.MOV',
    },
  },

  'scatter-chart-sample': {
    name: 'scatter-chart-sample',
    description: 'A sample scatter chart with various data points',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/scatter-chart/scatter-chart-sample.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 23.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 23.MOV',
    },
  },

  'scatter-chart-styled': {
    name: 'scatter-chart-styled',
    description: 'A customized scatter chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/scatter-chart/scatter-chart-styled.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 22.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 22.MOV',
    },
  },

  'scatter-chart-large': {
    name: 'scatter-chart-large',
    description: 'A scatter chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/scatter-chart/scatter-chart-large.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 39.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 39.MOV',
    },
  },
};
