// Registry configuration for icon component and demo

export const iconRegistry = {
  // Main icon component
  icon: {
    name: 'icon',
    description:
      'A themed icon component with support for Lucide React Native icons.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/icon.tsx',
        target: 'components/ui/icon.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5566.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5566.PNG',
    },
  },

  // Default demo
  'icon-demo': {
    name: 'icon-demo',
    description: 'A basic icon with default styling',
    type: 'registry:example',
    registryDependencies: ['icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/icon/icon-demo.tsx',
        target: 'components/demo/icon/icon-demo.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5566.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5566.PNG',
    },
  },

  // Sizes example
  'icon-sizes': {
    name: 'icon-sizes',
    description: 'Icons in different sizes',
    type: 'registry:example',
    registryDependencies: ['icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/icon/icon-sizes.tsx',
        target: 'components/demo/icon/icon-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5567.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5567.PNG',
    },
  },

  // Colors example
  'icon-colors': {
    name: 'icon-colors',
    description: 'Icons with custom colors and themed colors',
    type: 'registry:example',
    registryDependencies: ['icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/icon/icon-colors.tsx',
        target: 'components/demo/icon/icon-colors.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5568.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5568.PNG',
    },
  },

  // Stroke weights example
  'icon-stroke': {
    name: 'icon-stroke',
    description: 'Icons with different stroke weights',
    type: 'registry:example',
    registryDependencies: ['icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/icon/icon-stroke.tsx',
        target: 'components/demo/icon/icon-stroke.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5569.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5569.PNG',
    },
  },

  // Interactive example
  'icon-interactive': {
    name: 'icon-interactive',
    description: 'Icons with press and hover interactions',
    type: 'registry:example',
    registryDependencies: ['icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/icon/icon-interactive.tsx',
        target: 'components/demo/icon/icon-interactive.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5570.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5570.PNG',
    },
  },

  // Grid example
  'icon-grid': {
    name: 'icon-grid',
    description: 'A grid of commonly used icons',
    type: 'registry:example',
    registryDependencies: ['icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/icon/icon-grid.tsx',
        target: 'components/demo/icon/icon-grid.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5571.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5571.PNG',
    },
  },

  // Themed example
  'icon-themed': {
    name: 'icon-themed',
    description: 'Icons that adapt to light and dark themes',
    type: 'registry:example',
    registryDependencies: ['icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/icon/icon-themed.tsx',
        target: 'components/demo/icon/icon-themed.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5572.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5572.PNG',
    },
  },
};
