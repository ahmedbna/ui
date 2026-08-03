// definitions/charts/bubble-chart.ts
// Registry configuration for bubble-chart component and demos

export const bubbleChartRegistry = {
  // Main bubble-chart component
  'bubble-chart': {
    name: 'bubble-chart',
    description:
      'A customizable bubble chart component with animations, size mapping, and interactive features.',
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
        path: 'src/components/charts/bubble-chart.tsx',
        target: 'components/charts/bubble-chart.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0337-bubble-chart-demo.mov',
      dark: 'https://demo.ahmedbna.com/0337-bubble-chart-demo.mov',
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
        path: 'src/demo/charts/bubble-chart/bubble-chart-demo.tsx',
        target: 'components/demo/charts/bubble-chart/bubble-chart-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0337-bubble-chart-demo.mov',
      dark: 'https://demo.ahmedbna.com/0337-bubble-chart-demo.mov',
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
        path: 'src/demo/charts/bubble-chart/bubble-chart-sample.tsx',
        target: 'components/demo/charts/bubble-chart/bubble-chart-sample.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0338-bubble-chart-sample.mov',
      dark: 'https://demo.ahmedbna.com/0338-bubble-chart-sample.mov',
    },
  },

  // Styled bubble chart demo
  'bubble-chart-styled': {
    name: 'bubble-chart-styled',
    description: 'A customized bubble chart with custom styling',
    type: 'registry:example',
    registryDependencies: ['bubble-chart', 'chart-container'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/charts/bubble-chart/bubble-chart-styled.tsx',
        target: 'components/demo/charts/bubble-chart/bubble-chart-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0339-bubble-chart-styled.mov',
      dark: 'https://demo.ahmedbna.com/0339-bubble-chart-styled.mov',
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
        path: 'src/demo/charts/bubble-chart/bubble-chart-minimal.tsx',
        target: 'components/demo/charts/bubble-chart/bubble-chart-minimal.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0340-bubble-chart-minimal.MP4',
      dark: 'https://demo.ahmedbna.com/0340-bubble-chart-minimal.MP4',
    },
  },
};
