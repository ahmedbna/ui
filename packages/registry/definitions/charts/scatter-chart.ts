// definitions/charts/scatter-chart.ts
// Registry configuration for scatter-chart component and demos

export const scatterChartRegistry = {
  // Main scatter-chart component
  'scatter-chart': {
    name: 'scatter-chart',
    description:
      'A customizable scatter plot component with smooth animations and flexible styling for visualizing data relationships.',
    type: 'registry:ui',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: [],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/charts/scatter-chart.tsx',
        target: 'components/charts/scatter-chart.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0383-scatter-chart-demo.MOV',
      dark: 'https://demo.ahmedbna.com/0383-scatter-chart-demo.MOV',
    },
  },

  // Basic scatter chart demo
  'scatter-chart-demo': {
    name: 'scatter-chart-demo',
    description: 'A scatter plot with smooth animations',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/scatter-chart/scatter-chart-demo.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0383-scatter-chart-demo.MOV',
      dark: 'https://demo.ahmedbna.com/0383-scatter-chart-demo.MOV',
    },
  },

  'scatter-chart-sample': {
    name: 'scatter-chart-sample',
    description: 'A sample scatter chart with various data points',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/scatter-chart/scatter-chart-sample.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0384-scatter-chart-sample.MOV',
      dark: 'https://demo.ahmedbna.com/0384-scatter-chart-sample.MOV',
    },
  },

  'scatter-chart-styled': {
    name: 'scatter-chart-styled',
    description: 'A customized scatter chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/scatter-chart/scatter-chart-styled.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0385-scatter-chart-styled.MOV',
      dark: 'https://demo.ahmedbna.com/0385-scatter-chart-styled.MOV',
    },
  },

  'scatter-chart-large': {
    name: 'scatter-chart-large',
    description: 'A scatter chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['scatter-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/scatter-chart/scatter-chart-large.tsx',
        target: 'components/demo/charts/scatter-chart/scatter-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0386-scatter-chart-large.MOV',
      dark: 'https://demo.ahmedbna.com/0386-scatter-chart-large.MOV',
    },
  },
};
