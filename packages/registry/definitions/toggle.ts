// docs/registry/toggle.ts
// Registry configuration for toggle component and demo

export const toggleRegistry = {
  // Main toggle component
  toggle: {
    name: 'toggle',
    description: 'A two-state button that can be either on or off.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view', 'icon'],
    hooks: ['useColor', 'useHaptics'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/toggle.tsx',
        target: 'components/ui/toggle.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0312-toggle-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0312-toggle-demo.MP4',
    },
  },

  // Default demo
  'toggle-demo': {
    name: 'toggle-demo',
    description: 'A basic toggle button with icon',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-demo.tsx',
        target: 'components/demo/toggle/toggle-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0312-toggle-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0312-toggle-demo.MP4',
    },
  },

  // Variants example
  'toggle-variants': {
    name: 'toggle-variants',
    description: 'Toggle buttons in different variants',
    type: 'registry:example',
    registryDependencies: ['toggle', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-variants.tsx',
        target: 'components/demo/toggle/toggle-variants.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0313-toggle-variants.MP4',
      dark: 'https://demo.ahmedbna.com/0313-toggle-variants.MP4',
    },
  },

  // Sizes example
  'toggle-sizes': {
    name: 'toggle-sizes',
    description: 'Toggle buttons in different sizes',
    type: 'registry:example',
    registryDependencies: ['toggle', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-sizes.tsx',
        target: 'components/demo/toggle/toggle-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0314-toggle-sizes.MP4',
      dark: 'https://demo.ahmedbna.com/0314-toggle-sizes.MP4',
    },
  },

  // Text example
  'toggle-text': {
    name: 'toggle-text',
    description: 'Toggle buttons with text labels',
    type: 'registry:example',
    registryDependencies: ['toggle', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-text.tsx',
        target: 'components/demo/toggle/toggle-text.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0315-toggle-text.MP4',
      dark: 'https://demo.ahmedbna.com/0315-toggle-text.MP4',
    },
  },

  // Disabled example
  'toggle-disabled': {
    name: 'toggle-disabled',
    description: 'Disabled toggle buttons',
    type: 'registry:example',
    registryDependencies: ['toggle', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-disabled.tsx',
        target: 'components/demo/toggle/toggle-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0316-toggle-disabled.MP4',
      dark: 'https://demo.ahmedbna.com/0316-toggle-disabled.MP4',
    },
  },

  // Single toggle group example
  'toggle-group-single': {
    name: 'toggle-group-single',
    description: 'Single selection toggle group',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-group-single.tsx',
        target: 'components/demo/toggle/toggle-group-single.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0317-toggle-group-single.MP4',
      dark: 'https://demo.ahmedbna.com/0317-toggle-group-single.MP4',
    },
  },

  // Multiple toggle group example
  'toggle-group-multiple': {
    name: 'toggle-group-multiple',
    description: 'Multiple selection toggle group',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-group-multiple.tsx',
        target: 'components/demo/toggle/toggle-group-multiple.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0318-toggle-group-multiple.MP4',
      dark: 'https://demo.ahmedbna.com/0318-toggle-group-multiple.MP4',
    },
  },

  // Vertical toggle group example
  'toggle-group-vertical': {
    name: 'toggle-group-vertical',
    description: 'Vertical toggle group layout',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-group-vertical.tsx',
        target: 'components/demo/toggle/toggle-group-vertical.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0319-toggle-group-vertical.MP4',
      dark: 'https://demo.ahmedbna.com/0319-toggle-group-vertical.MP4',
    },
  },

  // Outline toggle group example
  'toggle-group-outline': {
    name: 'toggle-group-outline',
    description: 'Toggle group with outline variant',
    type: 'registry:example',
    registryDependencies: ['toggle'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/toggle/toggle-group-outline.tsx',
        target: 'components/demo/toggle/toggle-group-outline.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0320-toggle-group-outline.MP4',
      dark: 'https://demo.ahmedbna.com/0320-toggle-group-outline.MP4',
    },
  },
};
