// Registry configuration for separator component and demo

export const separatorRegistry = {
  // Main separator component
  separator: {
    name: 'separator',
    description: 'Visually or semantically separates content.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['view'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/separator.tsx',
        target: 'components/ui/separator.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/separator/separator-demo.tsx',
        target: 'components/demo/separator/separator-demo.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/separator/separator-vertical.tsx',
        target: 'components/demo/separator/separator-vertical.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/separator/separator-thickness.tsx',
        target: 'components/demo/separator/separator-thickness.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/separator/separator-colors.tsx',
        target: 'components/demo/separator/separator-colors.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/separator/separator-spacing.tsx',
        target: 'components/demo/separator/separator-spacing.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5785.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5785.PNG',
    },
  },
};
