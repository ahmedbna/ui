// definitions/charts/line-chart.ts
// Registry configuration for line-chart component and demos

export const lineChartRegistry = {
  // Main line-chart component
  'line-chart': {
    name: 'line-chart',
    description:
      'A customizable line chart component with animations, interactions, and gradient fills.',
    type: 'registry:ui',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-worklets',
      'react-native-gesture-handler',
    ],
    registryDependencies: [],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/line-chart.tsx',
        target: 'components/charts/line-chart.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0359-line-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0359-line-chart-demo.MOV',
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
        path: 'src/demo/charts/line-chart/line-chart-demo.tsx',
        target: 'components/demo/charts/line-chart/line-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0359-line-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0359-line-chart-demo.MOV',
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
        path: 'src/demo/charts/line-chart/line-chart-interactive.tsx',
        target: 'components/demo/charts/line-chart/line-chart-interactive.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0360-line-chart-interactive.MOV',
      dark: 'https://ui.ahmedbna.com/0360-line-chart-interactive.MOV',
    },
  },

  // Styled line chart demo
  'line-chart-styled': {
    name: 'line-chart-styled',
    description: 'A customized line chart with custom styling',
    type: 'registry:example',
    registryDependencies: ['line-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/line-chart/line-chart-styled.tsx',
        target: 'components/demo/charts/line-chart/line-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0361-line-chart-styled.MOV',
      dark: 'https://ui.ahmedbna.com/0361-line-chart-styled.MOV',
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
        path: 'src/demo/charts/line-chart/line-chart-minimal.tsx',
        target: 'components/demo/charts/line-chart/line-chart-minimal.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0362-line-chart-minimal.MOV',
      dark: 'https://ui.ahmedbna.com/0362-line-chart-minimal.MOV',
    },
  },
};
