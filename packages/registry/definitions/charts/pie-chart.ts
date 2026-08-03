// definitions/charts/pie-chart.ts
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
      'react-native-worklets',
    ],
    registryDependencies: ['text'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/pie-chart.tsx',
        target: 'components/charts/pie-chart.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0363-pie-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0363-pie-chart-demo.MOV',
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
        path: 'src/demo/charts/pie-chart/pie-chart-demo.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0363-pie-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0363-pie-chart-demo.MOV',
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
        path: 'src/demo/charts/pie-chart/pie-chart-sample.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0364-pie-chart-sample.MOV',
      dark: 'https://ui.ahmedbna.com/0364-pie-chart-sample.MOV',
    },
  },

  'pie-chart-styled': {
    name: 'pie-chart-styled',
    description: 'A customized pie chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['pie-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/pie-chart/pie-chart-styled.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0365-pie-chart-styled.MOV',
      dark: 'https://ui.ahmedbna.com/0365-pie-chart-styled.MOV',
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
        path: 'src/demo/charts/pie-chart/pie-chart-large.tsx',
        target: 'components/demo/charts/pie-chart/pie-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0366-pie-chart-large.MOV',
      dark: 'https://ui.ahmedbna.com/0366-pie-chart-large.MOV',
    },
  },
};
