// Registry configuration for switch component and demo

export const switchRegistry = {
  // Main switch component
  switch: {
    name: 'switch',
    description:
      'A control that allows the user to toggle between checked and not checked states.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    hooks: ['useColor', 'useHaptics'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/switch.tsx',
        target: 'components/ui/switch.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0287-switch-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0287-switch-demo.MP4',
    },
  },

  // Default demo
  'switch-demo': {
    name: 'switch-demo',
    description: 'A basic switch with label',
    type: 'registry:example',
    registryDependencies: ['switch'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/switch/switch-demo.tsx',
        target: 'components/demo/switch/switch-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0287-switch-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0287-switch-demo.MP4',
    },
  },

  'switch-simple': {
    name: 'switch-simple',
    description: 'A switch without label text',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/switch/switch-simple.tsx',
        target: 'components/demo/switch/switch-simple.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0288-switch-simple.MP4',
      dark: 'https://demo.ahmedbna.com/0288-switch-simple.MP4',
    },
  },

  'switch-error': {
    name: 'switch-error',
    description: 'Switch with error message and styling',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/switch/switch-error.tsx',
        target: 'components/demo/switch/switch-error.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0289-switch-error.MP4',
      dark: 'https://demo.ahmedbna.com/0289-switch-error.MP4',
    },
  },

  'switch-disabled': {
    name: 'switch-disabled',
    description: 'Switches in disabled state',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/switch/switch-disabled.tsx',
        target: 'components/demo/switch/switch-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0290-switch-disabled.MP4',
      dark: 'https://demo.ahmedbna.com/0290-switch-disabled.MP4',
    },
  },

  'switch-settings': {
    name: 'switch-settings',
    description: 'Multiple switches arranged in a settings list',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/switch/switch-settings.tsx',
        target: 'components/demo/switch/switch-settings.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0291-switch-settings.MP4',
      dark: 'https://demo.ahmedbna.com/0291-switch-settings.MP4',
    },
  },

  'switch-colors': {
    name: 'switch-colors',
    description: 'Switches with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/switch/switch-colors.tsx',
        target: 'components/demo/switch/switch-colors.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0292-switch-colors.MP4',
      dark: 'https://demo.ahmedbna.com/0292-switch-colors.MP4',
    },
  },
};
