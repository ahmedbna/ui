// definitions/charts/progress-ring-chart.ts
// Registry configuration for progress-ring-chart component and demos

export const progressRingChartRegistry = {
  // Main progress-ring-chart component
  'progress-ring-chart': {
    name: 'progress-ring-chart',
    description:
      'A customizable circular progress ring component with smooth animations and flexible styling.',
    type: 'registry:ui',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['text'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/progress-ring-chart.tsx',
        target: 'components/charts/progress-ring-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0371-progress-ring-chart-demo.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0371-progress-ring-chart-demo.MOV',
    },
  },

  // Basic progress ring chart demo
  'progress-ring-chart-demo': {
    name: 'progress-ring-chart-demo',
    description: 'A circular progress ring with smooth animations',
    type: 'registry:example',
    registryDependencies: ['progress-ring-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/progress-ring-chart/progress-ring-chart-demo.tsx',
        target:
          'components/demo/charts/progress-ring-chart/progress-ring-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0371-progress-ring-chart-demo.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0371-progress-ring-chart-demo.MOV',
    },
  },

  'progress-ring-chart-sample': {
    name: 'progress-ring-chart-sample',
    description: 'A sample progress ring chart',
    type: 'registry:example',
    registryDependencies: ['progress-ring-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/progress-ring-chart/progress-ring-chart-sample.tsx',
        target:
          'components/demo/charts/progress-ring-chart/progress-ring-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0372-progress-ring-chart-sample.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0372-progress-ring-chart-sample.MOV',
    },
  },

  'progress-ring-chart-styled': {
    name: 'progress-ring-chart-styled',
    description: 'A customized progress ring with gradient and custom styling',
    type: 'registry:example',
    registryDependencies: ['progress-ring-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/progress-ring-chart/progress-ring-chart-styled.tsx',
        target:
          'components/demo/charts/progress-ring-chart/progress-ring-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0373-progress-ring-chart-styled.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0373-progress-ring-chart-styled.MOV',
    },
  },

  'progress-ring-chart-large': {
    name: 'progress-ring-chart-large',
    description: 'A large progress ring with center text',
    type: 'registry:example',
    registryDependencies: ['progress-ring-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/progress-ring-chart/progress-ring-chart-large.tsx',
        target:
          'components/demo/charts/progress-ring-chart/progress-ring-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0374-progress-ring-chart-large.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0374-progress-ring-chart-large.MOV',
    },
  },
};
