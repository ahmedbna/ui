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
    hooks: ['useHaptics'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/collapsible.tsx',
        target: 'components/ui/collapsible.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0110-collapsible-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0110-collapsible-demo.MP4',
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
        path: 'src/demo/collapsible/collapsible-demo.tsx',
        target: 'components/demo/collapsible/collapsible-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0110-collapsible-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0110-collapsible-demo.MP4',
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
        path: 'src/demo/collapsible/collapsible-multiple.tsx',
        target: 'components/demo/collapsible/collapsible-multiple.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0111-collapsible-multiple.MP4',
      dark: 'https://demo.ahmedbna.com/0111-collapsible-multiple.MP4',
    },
  },

  // Nested collapsibles example
  'collapsible-nested': {
    name: 'collapsible-nested',
    description: 'Collapsible components nested within each other',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/collapsible/collapsible-nested.tsx',
        target: 'components/demo/collapsible/collapsible-nested.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0112-collapsible-nested.MP4',
      dark: 'https://demo.ahmedbna.com/0112-collapsible-nested.MP4',
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
        path: 'src/demo/collapsible/collapsible-with-content.tsx',
        target: 'components/demo/collapsible/collapsible-with-content.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0113-collapsible-with-content.MP4',
      dark: 'https://demo.ahmedbna.com/0113-collapsible-with-content.MP4',
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
        path: 'src/demo/collapsible/collapsible-faq.tsx',
        target: 'components/demo/collapsible/collapsible-faq.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0114-collapsible-faq.MP4',
      dark: 'https://demo.ahmedbna.com/0114-collapsible-faq.MP4',
    },
  },
};
