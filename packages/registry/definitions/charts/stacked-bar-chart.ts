// definitions/charts/stacked-bar-chart.ts
// Registry configuration for stacked-bar-chart component and demos

export const stackedBarChartRegistry = {
  // Main stacked-bar-chart component
  'stacked-bar-chart': {
    name: 'stacked-bar-chart',
    description:
      'A customizable stacked bar chart component with smooth animations, support for both horizontal and vertical layouts, and flexible styling.',
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
        path: 'src/components/charts/stacked-bar-chart.tsx',
        target: 'components/charts/stacked-bar-chart.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0391-stacked-bar-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0391-stacked-bar-chart-demo.MOV',
    },
  },

  // Basic stacked bar chart demo
  'stacked-bar-chart-demo': {
    name: 'stacked-bar-chart-demo',
    description: 'A stacked bar chart with smooth animations',
    type: 'registry:example',
    registryDependencies: ['stacked-bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/stacked-bar-chart/stacked-bar-chart-demo.tsx',
        target:
          'components/demo/charts/stacked-bar-chart/stacked-bar-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0391-stacked-bar-chart-demo.MOV',
      dark: 'https://ui.ahmedbna.com/0391-stacked-bar-chart-demo.MOV',
    },
  },

  // Horizontal stacked bar chart demo
  'stacked-bar-chart-horizontal': {
    name: 'stacked-bar-chart-horizontal',
    description: 'A horizontal stacked bar chart',
    type: 'registry:example',
    registryDependencies: ['stacked-bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/stacked-bar-chart/stacked-bar-chart-horizontal.tsx',
        target:
          'components/demo/charts/stacked-bar-chart/stacked-bar-chart-horizontal.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0392-stacked-bar-chart-horizontal.MOV',
      dark: 'https://ui.ahmedbna.com/0392-stacked-bar-chart-horizontal.MOV',
    },
  },

  // Styled stacked bar chart demo
  'stacked-bar-chart-styled': {
    name: 'stacked-bar-chart-styled',
    description:
      'A customized stacked bar chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['stacked-bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/stacked-bar-chart/stacked-bar-chart-styled.tsx',
        target:
          'components/demo/charts/stacked-bar-chart/stacked-bar-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0393-stacked-bar-chart-styled.mov',
      dark: 'https://ui.ahmedbna.com/0393-stacked-bar-chart-styled.mov',
    },
  },

  // Large dataset stacked bar chart demo
  'stacked-bar-chart-large': {
    name: 'stacked-bar-chart-large',
    description: 'A stacked bar chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['stacked-bar-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/stacked-bar-chart/stacked-bar-chart-large.tsx',
        target:
          'components/demo/charts/stacked-bar-chart/stacked-bar-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0394-stacked-bar-chart-large.mov',
      dark: 'https://ui.ahmedbna.com/0394-stacked-bar-chart-large.mov',
    },
  },
};
