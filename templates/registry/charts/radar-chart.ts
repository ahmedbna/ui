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
        target: 'components/charts/radar-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 32.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 32.MOV',
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
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 32.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 32.MOV',
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
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 31.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 31.MOV',
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
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 59.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 59.MOV',
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
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 29.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 29.MOV',
    },
  },
};
