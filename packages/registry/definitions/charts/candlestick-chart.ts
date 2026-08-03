// definitions/charts/candlestick-chart.ts
// Registry configuration for candlestick-chart component and demos

export const candlestickChartRegistry = {
  // Main candlestick-chart component
  'candlestick-chart': {
    name: 'candlestick-chart',
    description:
      'A customizable candlestick chart component with animations for financial data visualization.',
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
        path: 'src/components/charts/candlestick-chart.tsx',
        target: 'components/charts/candlestick-chart.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0341-candlestick-chart-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0341-candlestick-chart-demo.MP4',
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
        path: 'src/demo/charts/candlestick-chart/candlestick-chart-demo.tsx',
        target:
          'components/demo/charts/candlestick-chart/candlestick-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0341-candlestick-chart-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0341-candlestick-chart-demo.MP4',
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
        path: 'src/demo/charts/candlestick-chart/candlestick-chart-sample.tsx',
        target:
          'components/demo/charts/candlestick-chart/candlestick-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0342-candlestick-chart-sample.MP4',
      dark: 'https://ui.ahmedbna.com/0342-candlestick-chart-sample.MP4',
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
        path: 'src/demo/charts/candlestick-chart/candlestick-chart-styled.tsx',
        target:
          'components/demo/charts/candlestick-chart/candlestick-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0343-candlestick-chart-styled.MP4',
      dark: 'https://ui.ahmedbna.com/0343-candlestick-chart-styled.MP4',
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
        path: 'src/demo/charts/candlestick-chart/candlestick-chart-minimal.tsx',
        target:
          'components/demo/charts/candlestick-chart/candlestick-chart-minimal.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0344-candlestick-chart-minimal.mov',
      dark: 'https://ui.ahmedbna.com/0344-candlestick-chart-minimal.mov',
    },
  },
};
