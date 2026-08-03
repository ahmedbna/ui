// definitions/charts/area-chart.ts
// Registry configuration for area-chart component and demos

export const areaChartRegistry = {
  // Main area-chart component
  'area-chart': {
    name: 'area-chart',
    description:
      'A customizable area chart component with gradient fills and smooth animations.',
    type: 'registry:ui',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-worklets',
      'react-native-gesture-handler',
    ],
    registryDependencies: ['line-chart'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/area-chart.tsx',
        target: 'components/charts/area-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0330-area-chart-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0330-area-chart-demo.mov',
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
        path: 'src/demo/charts/area-chart/area-chart-demo.tsx',
        target: 'components/demo/charts/area-chart/area-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0330-area-chart-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0330-area-chart-demo.mov',
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
        path: 'src/demo/charts/area-chart/area-chart-interactive.tsx',
        target: 'components/demo/charts/area-chart/area-chart-interactive.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0331-area-chart-interactive.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0331-area-chart-interactive.mov',
    },
  },

  'area-chart-styled': {
    name: 'area-chart-styled',
    description: 'A customized area chart with custom styling',
    type: 'registry:example',
    registryDependencies: ['area-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/area-chart/area-chart-styled.tsx',
        target: 'components/demo/charts/area-chart/area-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0332-area-chart-styled.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0332-area-chart-styled.mov',
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
        path: 'src/demo/charts/area-chart/area-chart-large.tsx',
        target: 'components/demo/charts/area-chart/area-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0333-area-chart-large.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0333-area-chart-large.mov',
    },
  },
};
