// Registry configuration for text component and demo

export const textRegistry = {
  // Main text component
  text: {
    name: 'text',
    description:
      'A foundational View component with transparent background and ref forwarding support.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'registry/components/ui/text.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5741.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5741.PNG',
    },
  },

  // Default demo
  'text-demo': {
    name: 'text-demo',
    description: 'Basic text component showing different variants',
    type: 'registry:example',
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/demo/text/text-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5741.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5741.PNG',
    },
  },

  'text-variants': {
    name: 'text-variants',
    description: 'All text variants showing the typography hierarchy',
    type: 'registry:example',
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/demo/text/text-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5743.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5743.PNG',
    },
  },

  'text-colors': {
    name: 'text-colors',
    description: 'Text with custom light and dark mode colors',
    type: 'registry:example',
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/demo/text/text-colors.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5742.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5742.PNG',
    },
  },
};
