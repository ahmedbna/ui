// templates/registry/charts/pie-chart.ts
// Registry configuration for pie-chart component and demos

export const pieChartRegistry = {
  // Main pie-chart component
  'pie-chart': {
    name: 'pie-chart',
    description:
      'A customizable pie chart component with smooth animations and flexible styling.',
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
        path: 'templates/components/charts/pie-chart.tsx',
        target: 'components/charts/pie-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 44.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 44.MOV',
    },
  },

  // Basic pie chart demo
  'pie-chart-demo': {
    name: 'pie-chart-demo',
    description: 'A pie chart with smooth animations',
    type: 'registry:example',
    registryDependencies: ['pie-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/pie-chart/pie-chart-demo.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 44.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 44.MOV',
    },
  },

  'pie-chart-sample': {
    name: 'pie-chart-sample',
    description: 'A sample pie chart',
    type: 'registry:example',
    registryDependencies: ['pie-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/pie-chart/pie-chart-sample.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 43.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 43.MOV',
    },
  },

  'pie-chart-styled': {
    name: 'pie-chart-styled',
    description: 'A customized pie chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['pie-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/pie-chart/pie-chart-styled.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 42.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 42.MOV',
    },
  },

  'pie-chart-large': {
    name: 'pie-chart-large',
    description: 'A pie chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['pie-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/pie-chart/pie-chart-large.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 41.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 41.MOV',
    },
  },
};
