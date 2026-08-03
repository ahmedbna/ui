// Registry configuration for separator component and demo

export const separatorRegistry = {
  // Main separator component
  separator: {
    name: 'separator',
    description: 'Visually or semantically separates content.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/separator.tsx',
        target: 'components/ui/separator.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0255-separator-demo.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0255-separator-demo.PNG',
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
        path: 'src/demo/separator/separator-demo.tsx',
        target: 'components/demo/separator/separator-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0255-separator-demo.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0255-separator-demo.PNG',
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
        path: 'src/demo/separator/separator-vertical.tsx',
        target: 'components/demo/separator/separator-vertical.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0256-separator-vertical.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0256-separator-vertical.PNG',
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
        path: 'src/demo/separator/separator-thickness.tsx',
        target: 'components/demo/separator/separator-thickness.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0257-separator-thickness.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0257-separator-thickness.PNG',
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
        path: 'src/demo/separator/separator-colors.tsx',
        target: 'components/demo/separator/separator-colors.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0258-separator-colors.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0258-separator-colors.PNG',
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
        path: 'src/demo/separator/separator-spacing.tsx',
        target: 'components/demo/separator/separator-spacing.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0259-separator-spacing.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0259-separator-spacing.PNG',
    },
  },
};
