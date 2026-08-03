// definitions/charts/treemap-chart.ts
// Registry configuration for treemap-chart component and demos

export const treemapChartRegistry = {
  // Main treemap-chart component
  'treemap-chart': {
    name: 'treemap-chart',
    description:
      'A customizable treemap chart component with hierarchical data visualization, smooth animations, and flexible styling using the squarified treemap algorithm.',
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
        path: 'src/components/charts/treemap-chart.tsx',
        target: 'components/charts/treemap-chart.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0395-treemap-chart-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0395-treemap-chart-demo.MP4',
    },
  },

  // Basic treemap chart demo
  'treemap-chart-demo': {
    name: 'treemap-chart-demo',
    description: 'A treemap chart with smooth animations',
    type: 'registry:example',
    registryDependencies: ['treemap-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/treemap-chart/treemap-chart-demo.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0395-treemap-chart-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0395-treemap-chart-demo.MP4',
    },
  },

  'treemap-chart-sample': {
    name: 'treemap-chart-sample',
    description: 'A sample treemap chart with various data sizes',
    type: 'registry:example',
    registryDependencies: ['treemap-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/treemap-chart/treemap-chart-sample.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0396-treemap-chart-sample.MP4',
      dark: 'https://demo.ahmedbna.com/0396-treemap-chart-sample.MP4',
    },
  },

  'treemap-chart-styled': {
    name: 'treemap-chart-styled',
    description: 'A customized treemap chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['treemap-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/treemap-chart/treemap-chart-styled.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0397-treemap-chart-styled.MP4',
      dark: 'https://demo.ahmedbna.com/0397-treemap-chart-styled.MP4',
    },
  },

  'treemap-chart-large': {
    name: 'treemap-chart-large',
    description: 'A treemap chart with large dataset',
    type: 'registry:example',
    registryDependencies: ['treemap-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/treemap-chart/treemap-chart-large.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-large.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0398-treemap-chart-large.MP4',
      dark: 'https://demo.ahmedbna.com/0398-treemap-chart-large.MP4',
    },
  },
};
