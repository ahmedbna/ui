// Registry configuration for view component and demo

export const viewRegistry = {
  // Main view component
  view: {
    name: 'view',
    description:
      'A foundational View component with transparent background and ref forwarding support.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text'],
    files: [
      {
        path: 'registry/components/ui/view.tsx',
        type: 'registry:ui',
        target: '',
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
    registryDependencies: ['view'],
    files: [
      {
        path: 'registry/demo/view/view-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5760.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5760.PNG',
    },
  },
};
