// templates/registry/charts/treemap-chart.ts
// Registry configuration for treemap-chart component and demos

export const treemapChartRegistry = {
  // Main treemap-chart component
  'treemap-chart': {
    name: 'treemap-chart',
    description:
      'A customizable treemap chart component with hierarchical data visualization, smooth animations, and flexible styling using the squarified treemap algorithm.',
    type: 'registry:charts',
    dependencies: [
      'react-native-svg',
      'react-native-reanimated',
      'react-native-gesture-handler',
    ],
    registryDependencies: [],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:charts',
        path: 'templates/components/charts/treemap-chart.tsx',
        target: 'components/ui/charts/treemap-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-demo.MP4',
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
        path: 'templates/demo/charts/treemap-chart/treemap-chart-demo.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-demo.MP4',
    },
  },

  'treemap-chart-sample': {
    name: 'treemap-chart-sample',
    description: 'A sample treemap chart with various data sizes',
    type: 'registry:example',
    registryDependencies: ['treemap-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/treemap-chart/treemap-chart-sample.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-sample.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-sample.MP4',
    },
  },

  'treemap-chart-styled': {
    name: 'treemap-chart-styled',
    description: 'A customized treemap chart with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['treemap-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/treemap-chart/treemap-chart-styled.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-styled.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-styled.MP4',
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
        path: 'templates/demo/charts/treemap-chart/treemap-chart-large.tsx',
        target: 'components/demo/charts/treemap-chart/treemap-chart-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-large.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-large.MP4',
    },
  },
};
