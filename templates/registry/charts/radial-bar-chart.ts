// templates/registry/charts/radial-bar-chart.ts
// Registry configuration for radial-bar-chart component and demos

export const radialBarChartRegistry = {
  // Main radial-bar-chart component
  'radial-bar-chart': {
    name: 'radial-bar-chart',
    description:
      'A customizable radial bar chart component with smooth animations, gradient support, and center value display.',
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
        path: 'templates/components/charts/radial-bar-chart.tsx',
        target: 'components/charts/radial-bar-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 61.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 61.MOV',
    },
  },

  // Basic radial bar chart demo
  'radial-bar-chart-demo': {
    name: 'radial-bar-chart-demo',
    description: 'A radial bar chart with smooth animations and center totals',
    type: 'registry:example',
    registryDependencies: ['radial-bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radial-bar-chart/radial-bar-chart-demo.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 61.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 61.MOV',
    },
  },

  'radial-bar-chart-sample': {
    name: 'radial-bar-chart-sample',
    description: 'A sample radial bar chart with custom data',
    type: 'registry:example',
    registryDependencies: ['radial-bar-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radial-bar-chart/radial-bar-chart-sample.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 27.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 27.MOV',
    },
  },

  'radial-bar-chart-gradient': {
    name: 'radial-bar-chart-gradient',
    description: 'A radial bar chart with gradient effects',
    type: 'registry:example',
    registryDependencies: ['radial-bar-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radial-bar-chart/radial-bar-chart-gradient.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-gradient.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 26.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 26.MOV',
    },
  },

  'radial-bar-chart-large': {
    name: 'radial-bar-chart-large',
    description: 'A radial bar chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['radial-bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/radial-bar-chart/radial-bar-chart-large.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 30.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 30.MOV',
    },
  },
};
