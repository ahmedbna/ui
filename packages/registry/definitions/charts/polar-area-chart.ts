// definitions/charts/polar-area-chart.ts
// Registry configuration for polar-area-chart component and demos

export const polarAreaChartRegistry = {
  // Main polar-area-chart component
  'polar-area-chart': {
    name: 'polar-area-chart',
    description:
      'A customizable polar area chart component with smooth animations and flexible styling for displaying radial data.',
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
        path: 'src/components/charts/polar-area-chart.tsx',
        target: 'components/charts/polar-area-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0367-polar-area-chart-demo.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0367-polar-area-chart-demo.MOV',
    },
  },

  // Basic polar area chart demo
  'polar-area-chart-demo': {
    name: 'polar-area-chart-demo',
    description: 'A polar area chart with smooth animations',
    type: 'registry:example',
    registryDependencies: ['polar-area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/polar-area-chart/polar-area-chart-demo.tsx',
        target:
          'components/demo/charts/polar-area-chart/polar-area-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0367-polar-area-chart-demo.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0367-polar-area-chart-demo.MOV',
    },
  },

  'polar-area-chart-sample': {
    name: 'polar-area-chart-sample',
    description: 'A sample polar area chart',
    type: 'registry:example',
    registryDependencies: ['polar-area-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/polar-area-chart/polar-area-chart-sample.tsx',
        target:
          'components/demo/charts/polar-area-chart/polar-area-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0368-polar-area-chart-sample.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0368-polar-area-chart-sample.MOV',
    },
  },

  'polar-area-chart-styled': {
    name: 'polar-area-chart-styled',
    description: 'A customized polar area chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['polar-area-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/polar-area-chart/polar-area-chart-styled.tsx',
        target:
          'components/demo/charts/polar-area-chart/polar-area-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0369-polar-area-chart-styled.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0369-polar-area-chart-styled.MOV',
    },
  },

  'polar-area-chart-large': {
    name: 'polar-area-chart-large',
    description: 'A polar area chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['polar-area-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/polar-area-chart/polar-area-chart-large.tsx',
        target:
          'components/demo/charts/polar-area-chart/polar-area-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0370-polar-area-chart-large.MOV',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0370-polar-area-chart-large.MOV',
    },
  },
};
