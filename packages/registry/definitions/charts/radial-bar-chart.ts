// definitions/charts/radial-bar-chart.ts
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
      'react-native-worklets',
    ],
    registryDependencies: ['text'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/radial-bar-chart.tsx',
        target: 'components/charts/radial-bar-chart.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0379-radial-bar-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0379-radial-bar-chart-demo.MOV',
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
        path: 'src/demo/charts/radial-bar-chart/radial-bar-chart-demo.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0379-radial-bar-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0379-radial-bar-chart-demo.MOV',
    },
  },

  'radial-bar-chart-sample': {
    name: 'radial-bar-chart-sample',
    description: 'A sample radial bar chart with custom data',
    type: 'registry:example',
    registryDependencies: ['radial-bar-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/radial-bar-chart/radial-bar-chart-sample.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0380-radial-bar-chart-sample.MOV',
      dark: 'https://ui.ahmedbna.com/0380-radial-bar-chart-sample.MOV',
    },
  },

  'radial-bar-chart-gradient': {
    name: 'radial-bar-chart-gradient',
    description: 'A radial bar chart with gradient effects',
    type: 'registry:example',
    registryDependencies: ['radial-bar-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/radial-bar-chart/radial-bar-chart-gradient.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-gradient.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0381-radial-bar-chart-gradient.MOV',
      dark: 'https://ui.ahmedbna.com/0381-radial-bar-chart-gradient.MOV',
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
        path: 'src/demo/charts/radial-bar-chart/radial-bar-chart-large.tsx',
        target:
          'components/demo/charts/radial-bar-chart/radial-bar-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0382-radial-bar-chart-large.MOV',
      dark: 'https://ui.ahmedbna.com/0382-radial-bar-chart-large.MOV',
    },
  },
};
