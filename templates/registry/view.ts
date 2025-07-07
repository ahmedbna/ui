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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5760.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5760.PNG',
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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5760.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5760.PNG',
    },
  },
};
