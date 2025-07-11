// templates/registry/charts/candlestick-chart.ts
// Registry configuration for candlestick-chart component and demos

export const candlestickChartRegistry = {
  // Main candlestick-chart component
  'candlestick-chart': {
    name: 'candlestick-chart',
    description:
      'A customizable candlestick chart component with animations for financial data visualization.',
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
        path: 'templates/components/charts/candlestick-chart.tsx',
        target: 'components/charts/candlestick-chart.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-dark.png',
    },
  },

  // Basic candlestick chart demo
  'candlestick-chart-demo': {
    name: 'candlestick-chart-demo',
    description:
      'A basic candlestick chart with smooth animations and grid lines',
    type: 'registry:example',
    registryDependencies: ['candlestick-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/candlestick-chart-demo/candlestick-chart-demo.tsx',
        target:
          'components/demo/charts/candlestick-chart-demo/candlestick-chart-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-demo-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-demo-dark.png',
    },
  },

  // Interactive candlestick chart demo
  'candlestick-chart-sample': {
    name: 'candlestick-chart-sample',
    description: 'A sample candlestick chart',
    type: 'registry:example',
    registryDependencies: ['candlestick-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/candlestick-chart/candlestick-chart-sample.tsx',
        target:
          'components/demo/charts/candlestick-chart/candlestick-chart-sample.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-sample-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-sample-dark.png',
    },
  },

  // Styled candlestick chart demo
  'candlestick-chart-styled': {
    name: 'candlestick-chart-styled',
    description: 'A customized candlestick chart with custom colors',
    type: 'registry:example',
    registryDependencies: ['candlestick-chart', 'chart-container'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/candlestick-chart/candlestick-chart-styled.tsx',
        target:
          'components/demo/charts/candlestick-chart/candlestick-chart-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-styled-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-styled-dark.png',
    },
  },

  // Minimal candlestick chart demo
  'candlestick-chart-minimal': {
    name: 'candlestick-chart-minimal',
    description: 'A minimal candlestick chart without labels or grid',
    type: 'registry:example',
    registryDependencies: ['candlestick-chart'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/charts/candlestick-chart/candlestick-chart-minimal.tsx',
        target:
          'components/demo/charts/candlestick-chart/candlestick-chart-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-minimal-light.png',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/candlestick-chart-minimal-dark.png',
    },
  },
};
