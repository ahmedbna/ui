// templates/registry/charts/line-chart.ts
// Registry configuration for line-chart component and demos

export const lineChartRegistry = {
  // Main line-chart component
  'line-chart': {
    name: 'line-chart',
    description:
      'A customizable line chart component with animations, interactions, and gradient fills.',
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
        path: 'templates/components/charts/line-chart.tsx',
        target: 'components/charts/line-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 58.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 58.MOV',
    },
  },

  // Basic line chart demo
  'line-chart-demo': {
    name: 'line-chart-demo',
    description: 'A basic line chart with smooth animations and grid lines',
    type: 'registry:example',
    registryDependencies: ['line-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart/line-chart-demo.tsx',
        target: 'components/demo/charts/line-chart/line-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 58.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 58.MOV',
    },
  },

  // Interactive line chart demo
  'line-chart-interactive': {
    name: 'line-chart-interactive',
    description: 'An interactive line chart with touch gestures',
    type: 'registry:example',
    registryDependencies: ['line-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart/line-chart-interactive.tsx',
        target: 'components/demo/charts/line-chart/line-chart-interactive.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 47.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 47.MOV',
    },
  },

  // Styled line chart demo
  'line-chart-styled': {
    name: 'line-chart-styled',
    description: 'A customized line chart with custom styling',
    type: 'registry:example',
    registryDependencies: ['line-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart/line-chart-styled.tsx',
        target: 'components/demo/charts/line-chart/line-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 46.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 46.MOV',
    },
  },

  // Minimal line chart demo
  'line-chart-minimal': {
    name: 'line-chart-minimal',
    description: 'A minimal line chart without labels or grid',
    type: 'registry:example',
    registryDependencies: ['line-chart'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart/line-chart-minimal.tsx',
        target: 'components/demo/charts/line-chart/line-chart-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 45.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 45.MOV',
    },
  },
};
