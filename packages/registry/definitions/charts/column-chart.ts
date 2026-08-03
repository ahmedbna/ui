// definitions/charts/column-chart.ts
// Registry configuration for column-chart component and demos

export const columnChartRegistry = {
  // Main column-chart component
  'column-chart': {
    name: 'column-chart',
    description:
      'A customizable horizontal bar chart component with smooth animations and flexible styling.',
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
        path: 'src/components/charts/column-chart.tsx',
        target: 'components/charts/column-chart.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0347-column-chart-demo.MOV',
      dark: 'https://demo.ahmedbna.com/0347-column-chart-demo.MOV',
    },
  },

  // Basic column chart demo
  'column-chart-demo': {
    name: 'column-chart-demo',
    description: 'A horizontal bar chart with smooth animations',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/column-chart/column-chart-demo.tsx',
        target: 'components/demo/charts/column-chart/column-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0347-column-chart-demo.MOV',
      dark: 'https://demo.ahmedbna.com/0347-column-chart-demo.MOV',
    },
  },

  'column-chart-sample': {
    name: 'column-chart-sample',
    description: 'An sample column chart',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/column-chart/column-chart-sample.tsx',
        target: 'components/demo/charts/column-chart/column-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0348-column-chart-sample.MOV',
      dark: 'https://demo.ahmedbna.com/0348-column-chart-sample.MOV',
    },
  },

  'column-chart-styled': {
    name: 'column-chart-styled',
    description: 'A customized column chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/column-chart/column-chart-styled.tsx',
        target: 'components/demo/charts/column-chart/column-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0349-column-chart-styled.MOV',
      dark: 'https://demo.ahmedbna.com/0349-column-chart-styled.MOV',
    },
  },

  'column-chart-large': {
    name: 'column-chart-large',
    description: 'A column chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['column-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/column-chart/column-chart-large.tsx',
        target: 'components/demo/charts/column-chart/column-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0350-column-chart-large.mov',
      dark: 'https://demo.ahmedbna.com/0350-column-chart-large.mov',
    },
  },
};
