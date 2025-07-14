// docs/registry/collapsible.ts
// Registry configuration for collapsible component and demo
export const collapsibleRegistry = {
  // Main collapsible component
  collapsible: {
    name: 'collapsible',
    description:
      'An interactive component which can be expanded/collapsed to show and hide content.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['icon', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/collapsible.tsx',
        target: 'components/ui/collapsible.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-19-30_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-19-30_1.MP4',
    },
  },

  // Default demo
  'collapsible-demo': {
    name: 'collapsible-demo',
    description: 'A basic collapsible component with title and content',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/collapsible/collapsible-demo.tsx',
        target: 'components/demo/collapsible/collapsible-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-19-30_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-19-30_1.MP4',
    },
  },

  // Multiple collapsibles example
  'collapsible-multiple': {
    name: 'collapsible-multiple',
    description: 'Multiple collapsible components working independently',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/collapsible/collapsible-multiple.tsx',
        target: 'components/demo/collapsible/collapsible-multiple.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-19-48_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-19-48_1.MP4',
    },
  },

  // Nested collapsibles example
  'collapsible-nested': {
    name: 'collapsible-nested',
    description: 'Collapsible components nested within each other',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/collapsible/collapsible-nested.tsx',
        target: 'components/demo/collapsible/collapsible-nested.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-20-05_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-20-05_1.MP4',
    },
  },

  // With interactive content example
  'collapsible-with-content': {
    name: 'collapsible-with-content',
    description: 'Collapsible containing interactive elements like checkboxes',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'checkbox', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/collapsible/collapsible-with-content.tsx',
        target: 'components/demo/collapsible/collapsible-with-content.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-20-24_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-20-24_1.MP4',
    },
  },

  // FAQ style example
  'collapsible-faq': {
    name: 'collapsible-faq',
    description: 'Collapsible components styled as frequently asked questions',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/collapsible/collapsible-faq.tsx',
        target: 'components/demo/collapsible/collapsible-faq.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-20-43_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-20-43_1.MP4',
    },
  },
};
