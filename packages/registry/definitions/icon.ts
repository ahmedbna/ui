// Registry configuration for icon component and demo

export const iconRegistry = {
  // Main icon component
  icon: {
    name: 'icon',
    description:
      'A themed icon component with support for Lucide React Native icons.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native', 'react-native-svg'],
    registryDependencies: ['text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/icon.tsx',
        target: 'components/ui/icon.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0152-icon-demo.PNG',
      dark: 'https://demo.ahmedbna.com/0152-icon-demo.PNG',
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
        path: 'src/demo/icon/icon-demo.tsx',
        target: 'components/demo/icon/icon-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0152-icon-demo.PNG',
      dark: 'https://demo.ahmedbna.com/0152-icon-demo.PNG',
    },
  },

  // Sizes example
  'icon-sizes': {
    name: 'icon-sizes',
    description: 'Icons in different sizes',
    type: 'registry:example',
    registryDependencies: ['icon', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/icon/icon-sizes.tsx',
        target: 'components/demo/icon/icon-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0153-icon-sizes.PNG',
      dark: 'https://demo.ahmedbna.com/0153-icon-sizes.PNG',
    },
  },

  // Colors example
  'icon-colors': {
    name: 'icon-colors',
    description: 'Icons with custom colors and themed colors',
    type: 'registry:example',
    registryDependencies: ['icon', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/icon/icon-colors.tsx',
        target: 'components/demo/icon/icon-colors.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0154-icon-colors.PNG',
      dark: 'https://demo.ahmedbna.com/0154-icon-colors.PNG',
    },
  },

  // Stroke weights example
  'icon-stroke': {
    name: 'icon-stroke',
    description: 'Icons with different stroke weights',
    type: 'registry:example',
    registryDependencies: ['icon', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/icon/icon-stroke.tsx',
        target: 'components/demo/icon/icon-stroke.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0155-icon-stroke.PNG',
      dark: 'https://demo.ahmedbna.com/0155-icon-stroke.PNG',
    },
  },

  // Interactive example
  'icon-interactive': {
    name: 'icon-interactive',
    description: 'Icons with press and hover interactions',
    type: 'registry:example',
    registryDependencies: ['icon', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/icon/icon-interactive.tsx',
        target: 'components/demo/icon/icon-interactive.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0156-icon-interactive.PNG',
      dark: 'https://demo.ahmedbna.com/0156-icon-interactive.PNG',
    },
  },

  // Grid example
  'icon-grid': {
    name: 'icon-grid',
    description: 'A grid of commonly used icons',
    type: 'registry:example',
    registryDependencies: ['icon', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/icon/icon-grid.tsx',
        target: 'components/demo/icon/icon-grid.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0157-icon-grid.PNG',
      dark: 'https://demo.ahmedbna.com/0157-icon-grid.PNG',
    },
  },

  // Themed example
  'icon-themed': {
    name: 'icon-themed',
    description: 'Icons that adapt to light and dark themes',
    type: 'registry:example',
    registryDependencies: ['icon', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/icon/icon-themed.tsx',
        target: 'components/demo/icon/icon-themed.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0158-icon-themed.PNG',
      dark: 'https://demo.ahmedbna.com/0158-icon-themed.PNG',
    },
  },
};
