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
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/text.tsx',
        target: 'components/ui/text.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/text/text-demo.tsx',
        target: 'components/demo/text/text-demo.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/text/text-variants.tsx',
        target: 'components/demo/text/text-variants.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/text/text-colors.tsx',
        target: 'components/demo/text/text-colors.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5742.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5742.PNG',
    },
  },
};
