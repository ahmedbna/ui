// Registry configuration for hello-wave component and demo

export const helloWaveRegistry = {
  // Main hello-wave component
  'hello-wave': {
    name: 'hello-wave',
    description:
      'An animated waving hand emoji component with smooth rotation animation.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated', 'react-native-worklets'],
    registryDependencies: ['text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/hello-wave.tsx',
        target: 'components/ui/hello-wave.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0151-hello-wave-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0151-hello-wave-demo.mov',
    },
  },

  // Default demo
  'hello-wave-demo': {
    name: 'hello-wave-demo',
    description: 'An animated waving hand emoji',
    type: 'registry:example',
    registryDependencies: ['hello-wave'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/hello-wave/hello-wave-demo.tsx',
        target: 'components/demo/hello-wave/hello-wave-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0151-hello-wave-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0151-hello-wave-demo.mov',
    },
  },
};
