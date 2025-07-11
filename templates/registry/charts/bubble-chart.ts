// templates/registry/charts/bubble-chart.ts
// Registry configuration for bubble-chart component and demos

export const bubbleChartRegistry = {
  // Main bubble-chart component
  'bubble-chart': {
    name: 'bubble-chart',
    description:
      'A customizable bubble chart component with animations, size mapping, and interactive features.',
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
        path: 'templates/components/ui/charts/bubble-chart.tsx',
        target: 'components/ui/charts/bubble-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-dark.png',
    },
  },

  // Basic bubble chart demo
  'bubble-chart-demo': {
    name: 'bubble-chart-demo',
    description: 'A basic bubble chart with animated bubbles and grid lines',
    type: 'registry:example',
    registryDependencies: ['bubble-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bubble-chart-demo/bubble-chart-demo.tsx',
        target:
          'components/demo/charts/bubble-chart-demo/bubble-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-demo-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-demo-dark.png',
    },
  },

  // Interactive bubble chart demo
  'bubble-chart-sample': {
    name: 'bubble-chart-sample',
    description: 'A sample bubble chart',
    type: 'registry:example',
    registryDependencies: ['bubble-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bubble-chart/bubble-chart-sample.tsx',
        target: 'components/demo/charts/bubble-chart/bubble-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-sample-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-sample-dark.png',
    },
  },

  // Styled bubble chart demo
  'bubble-chart-styled': {
    name: 'bubble-chart-styled',
    description: 'A customized bubble chart with custom styling',
    type: 'registry:example',
    registryDependencies: ['bubble-chart', 'chart-container'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bubble-chart/bubble-chart-styled.tsx',
        target: 'components/demo/charts/bubble-chart/bubble-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-styled-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-styled-dark.png',
    },
  },

  // Minimal bubble chart demo
  'bubble-chart-minimal': {
    name: 'bubble-chart-minimal',
    description: 'A minimal bubble chart without labels or grid',
    type: 'registry:example',
    registryDependencies: ['bubble-chart'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/bubble-chart/bubble-chart-minimal.tsx',
        target: 'components/demo/charts/bubble-chart/bubble-chart-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-minimal-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bubble-chart-minimal-dark.png',
    },
  },
};
