// templates/registry/charts/line-chart.ts
// Registry configuration for line-chart component and demos

export const lineChartRegistry = {
  // Main line-chart component
  'line-chart': {
    name: 'line-chart',
    description:
      'A customizable line chart component with animations, interactions, and gradient fills.',
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
        path: 'templates/components/ui/charts/line-chart.tsx',
        target: 'components/ui/charts/line-chart.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-dark.png',
    },
  },

  // Basic line chart demo
  'line-chart-demo': {
    name: 'line-chart-demo',
    description: 'A basic line chart with smooth animations and grid lines',
    type: 'registry:example',
    registryDependencies: ['line-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart-demo/line-chart-demo.tsx',
        target: 'components/demo/charts/line-chart-demo/line-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-demo-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-demo-dark.png',
    },
  },

  // Interactive line chart demo
  'line-chart-interactive': {
    name: 'line-chart-interactive',
    description: 'An interactive line chart with touch gestures',
    type: 'registry:example',
    registryDependencies: ['line-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart/line-chart-interactive.tsx',
        target: 'components/demo/charts/line-chart/line-chart-interactive.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-interactive-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-interactive-dark.png',
    },
  },

  // Styled line chart demo
  'line-chart-styled': {
    name: 'line-chart-styled',
    description: 'A customized line chart with custom styling',
    type: 'registry:example',
    registryDependencies: ['line-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart/line-chart-styled.tsx',
        target: 'components/demo/charts/line-chart/line-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-styled-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-styled-dark.png',
    },
  },

  // Minimal line chart demo
  'line-chart-minimal': {
    name: 'line-chart-minimal',
    description: 'A minimal line chart without labels or grid',
    type: 'registry:example',
    registryDependencies: ['line-chart'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/line-chart/line-chart-minimal.tsx',
        target: 'components/demo/charts/line-chart/line-chart-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-minimal-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/line-chart-minimal-dark.png',
    },
  },
};
