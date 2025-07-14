// templates/registry/charts/bar-chart.ts
// Registry configuration for bar-chart component and demos

export const barChartRegistry = {
  // Main bar-chart component
  'bar-chart': {
    name: 'bar-chart',
    description:
      'A customizable bar chart component with smooth animations and rounded corners.',
    type: 'registry:charts',
    dependencies: ['react-native-svg', 'react-native-reanimated'],
    registryDependencies: [],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:charts',
        path: 'templates/components/charts/bar-chart.tsx',
        target: 'components/ui/charts/bar-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-22-22_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-22-22_1.mov',
    },
  },

  // Basic bar chart demo
  'bar-chart-demo': {
    name: 'bar-chart-demo',
    description: 'A basic bar chart with smooth animations and rounded corners',
    type: 'registry:example',
    registryDependencies: ['bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bar-chart/bar-chart-demo.tsx',
        target: 'components/demo/charts/bar-chart/bar-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-22-22_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-22-22_1.mov',
    },
  },

  // Horizontal bar chart demo
  'bar-chart-sample': {
    name: 'bar-chart-sample',
    description: 'A sample bar chart with custom colors',
    type: 'registry:example',
    registryDependencies: ['bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bar-chart/bar-chart-sample.tsx',
        target: 'components/demo/charts/bar-chart/bar-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 19.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 19.mov',
    },
  },

  // Minimal bar chart demo
  'bar-chart-minimal': {
    name: 'bar-chart-minimal',
    description: 'A minimal bar chart without labels',
    type: 'registry:example',
    registryDependencies: ['bar-chart'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bar-chart/bar-chart-minimal.tsx',
        target: 'components/demo/charts/bar-chart/bar-chart-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 17.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 17.mov',
    },
  },
};
