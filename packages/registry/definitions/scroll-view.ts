// Registry configuration for scroll-view component and demo

export const scrollViewRegistry = {
  // Main scroll-view component
  'scroll-view': {
    name: 'scroll-view',
    description:
      'A scrollable view component that allows content to be scrolled when it exceeds the container size.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/scroll-view.tsx',
        target: 'components/ui/scroll-view.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0240-scroll-view-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0240-scroll-view-demo.MP4',
    },
  },

  // Default demo
  'scroll-view-demo': {
    name: 'scroll-view-demo',
    description: 'A basic scrollable view with content',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-demo.tsx',
        target: 'components/demo/scroll-view/scroll-view-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0240-scroll-view-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0240-scroll-view-demo.MP4',
    },
  },

  // Vertical scrolling example
  'scroll-view-vertical': {
    name: 'scroll-view-vertical',
    description: 'Vertical scrolling with multiple items',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: [],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-vertical.tsx',
        target: 'components/demo/scroll-view/scroll-view-vertical.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0241-scroll-view-vertical.MP4',
      dark: 'https://demo.ahmedbna.com/0241-scroll-view-vertical.MP4',
    },
  },

  // Horizontal scrolling example
  'scroll-view-horizontal': {
    name: 'scroll-view-horizontal',
    description: 'Horizontal scrolling with cards',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: [],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-horizontal.tsx',
        target: 'components/demo/scroll-view/scroll-view-horizontal.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0242-scroll-view-horizontal.MP4',
      dark: 'https://demo.ahmedbna.com/0242-scroll-view-horizontal.MP4',
    },
  },

  // Nested scrollviews example
  'scroll-view-nested': {
    name: 'scroll-view-nested',
    description: 'ScrollViews nested within each other',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: [],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-nested.tsx',
        target: 'components/demo/scroll-view/scroll-view-nested.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0243-scroll-view-nested.MP4',
      dark: 'https://demo.ahmedbna.com/0243-scroll-view-nested.MP4',
    },
  },

  // Pull to refresh example
  'scroll-view-refresh': {
    name: 'scroll-view-refresh',
    description: 'ScrollView with pull-to-refresh functionality',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-refresh.tsx',
        target: 'components/demo/scroll-view/scroll-view-refresh.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0244-scroll-view-refresh.MP4',
      dark: 'https://demo.ahmedbna.com/0244-scroll-view-refresh.MP4',
    },
  },

  // Custom styled example
  'scroll-view-styled': {
    name: 'scroll-view-styled',
    description: 'ScrollView with custom styling and padding',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-styled.tsx',
        target: 'components/demo/scroll-view/scroll-view-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0245-scroll-view-styled.MP4',
      dark: 'https://demo.ahmedbna.com/0245-scroll-view-styled.MP4',
    },
  },

  // Scroll indicators example
  'scroll-view-indicators': {
    name: 'scroll-view-indicators',
    description: 'ScrollView with custom scroll indicators',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-indicators.tsx',
        target: 'components/demo/scroll-view/scroll-view-indicators.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0246-scroll-view-indicators.MP4',
      dark: 'https://demo.ahmedbna.com/0246-scroll-view-indicators.MP4',
    },
  },

  // Content inset example
  'scroll-view-inset': {
    name: 'scroll-view-inset',
    description: 'ScrollView with content inset adjustments',
    type: 'registry:example',
    registryDependencies: ['scroll-view', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/scroll-view/scroll-view-inset.tsx',
        target: 'components/demo/scroll-view/scroll-view-inset.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0247-scroll-view-inset.MP4',
      dark: 'https://demo.ahmedbna.com/0247-scroll-view-inset.MP4',
    },
  },
};
