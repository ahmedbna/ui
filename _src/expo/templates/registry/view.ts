// Registry configuration for view component and demo

export const viewRegistry = {
  // Main view component
  view: {
    name: 'view',
    description:
      'A foundational View component with transparent background and ref forwarding support.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/view.tsx',
        target: 'components/ui/view.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5760.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5760.PNG',
    },
  },

  // Default demo
  'view-demo': {
    name: 'view-demo',
    description: 'Basic view container with content',
    type: 'registry:example',
    registryDependencies: ['view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/view/view-demo.tsx',
        target: 'components/demo/view/view-demo.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5760.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5760.PNG',
    },
  },
};
