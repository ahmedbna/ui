// templates/registry/charts/area-chart.ts
// Registry configuration for area-chart component and demos

export const areaChartRegistry = {
  // Main area-chart component
  'area-chart': {
    name: 'area-chart',
    description:
      'A customizable area chart component with gradient fills and smooth animations.',
    type: 'registry:charts',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-gesture-handler',
    ],
    registryDependencies: ['line-chart'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:charts',
        path: 'templates/components/charts/area-chart.tsx',
        target: 'components/charts/area-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-15-47_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-15-47_1.mov',
    },
  },

  // Basic area chart demo
  'area-chart-demo': {
    name: 'area-chart-demo',
    description: 'An area chart with gradient fill and smooth animations',
    type: 'registry:example',
    registryDependencies: ['area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/area-chart/area-chart-demo.tsx',
        target: 'components/demo/charts/area-chart/area-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-15-47_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-15-47_1.mov',
    },
  },

  'area-chart-interactive': {
    name: 'area-chart-interactive',
    description: 'An interactive area chart with touch gestures',
    type: 'registry:example',
    registryDependencies: ['area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/area-chart/area-chart-interactive.tsx',
        target: 'components/demo/charts/area-chart/area-chart-interactive.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-17-36_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-17-36_1.mov',
    },
  },

  'area-chart-styled': {
    name: 'area-chart-styled',
    description: 'A customized area chart with custom styling',
    type: 'registry:example',
    registryDependencies: ['area-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/area-chart/area-chart-styled.tsx',
        target: 'components/demo/charts/area-chart/area-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-19-54_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-19-54_1.mov',
    },
  },

  'area-chart-large': {
    name: 'area-chart-large',
    description: 'An area chart with large data',
    type: 'registry:example',
    registryDependencies: ['area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/area-chart/area-chart-large.tsx',
        target: 'components/demo/charts/area-chart/area-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 16.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 16.mov',
    },
  },
};
