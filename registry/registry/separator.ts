// Registry configuration for separator component and demo

export const separatorRegistry = {
  // Main separator component
  separator: {
    name: 'separator',
    description: 'Visually or semantically separates content.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['view'],
    files: [
      {
        path: 'registry/components/ui/separator.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5781.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5781.PNG',
    },
  },

  // Default demo
  'separator-demo': {
    name: 'separator-demo',
    description: 'A basic horizontal separator',
    type: 'registry:example',
    registryDependencies: ['separator', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/separator/separator-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5781.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5781.PNG',
    },
  },

  // Vertical example
  'separator-vertical': {
    name: 'separator-vertical',
    description: 'A vertical separator for inline content',
    type: 'registry:example',
    registryDependencies: ['separator', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/separator/separator-vertical.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5782.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5782.PNG',
    },
  },

  // Thickness example
  'separator-thickness': {
    name: 'separator-thickness',
    description: 'Separators with different thickness values',
    type: 'registry:example',
    registryDependencies: ['separator', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/separator/separator-thickness.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5783.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5783.PNG',
    },
  },

  // Colors example
  'separator-colors': {
    name: 'separator-colors',
    description: 'Separators with custom colors and opacity',
    type: 'registry:example',
    registryDependencies: ['separator', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/separator/separator-colors.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5784.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5784.PNG',
    },
  },

  // Spacing example
  'separator-spacing': {
    name: 'separator-spacing',
    description: 'Separators with different margin and padding',
    type: 'registry:example',
    registryDependencies: ['separator', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/separator/separator-spacing.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5785.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5785.PNG',
    },
  },
};
