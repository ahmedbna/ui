// templates/registry/charts/heatmap-chart.ts
// Registry configuration for heatmap-chart component and demos

export const heatmapChartRegistry = {
  // Main heatmap-chart component
  'heatmap-chart': {
    name: 'heatmap-chart',
    description:
      'A customizable heatmap chart component with smooth animations and flexible color scaling for visualizing matrix data.',
    type: 'registry:ui',
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
        type: 'registry:ui',
        path: 'templates/components/charts/heatmap-chart.tsx',
        target: 'components/charts/heatmap-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 52.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 52.MOV',
    },
  },

  // Basic heatmap chart demo
  'heatmap-chart-demo': {
    name: 'heatmap-chart-demo',
    description: 'A heatmap chart with smooth animations and color scaling',
    type: 'registry:example',
    registryDependencies: ['heatmap-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/heatmap-chart/heatmap-chart-demo.tsx',
        target: 'components/demo/charts/heatmap-chart/heatmap-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 52.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 52.MOV',
    },
  },

  'heatmap-chart-sample': {
    name: 'heatmap-chart-sample',
    description: 'A sample heatmap chart with different data',
    type: 'registry:example',
    registryDependencies: ['heatmap-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/heatmap-chart/heatmap-chart-sample.tsx',
        target: 'components/demo/charts/heatmap-chart/heatmap-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 51.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 51.MOV',
    },
  },

  'heatmap-chart-styled': {
    name: 'heatmap-chart-styled',
    description: 'A customized heatmap chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['heatmap-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/heatmap-chart/heatmap-chart-styled.tsx',
        target: 'components/demo/charts/heatmap-chart/heatmap-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 50.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 50.MOV',
    },
  },

  'heatmap-chart-large': {
    name: 'heatmap-chart-large',
    description: 'A heatmap chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['heatmap-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/heatmap-chart/heatmap-chart-large.tsx',
        target: 'components/demo/charts/heatmap-chart/heatmap-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 49.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 49.MOV',
    },
  },
};
