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
    files: [
      {
        path: 'registry/components/ui/switch.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-14_1.MP4',
    },
  },

  // Default demo
  'switch-demo': {
    name: 'switch-demo',
    description: 'A basic switch with label',
    type: 'registry:example',
    registryDependencies: ['switch'],
    files: [
      {
        path: 'registry/demo/switch/switch-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-14_1.MP4',
    },
  },

  'switch-simple': {
    name: 'switch-simple',
    description: 'A switch without label text',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/demo/switch/switch-simple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-38_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-38_1.MP4',
    },
  },

  'switch-error': {
    name: 'switch-error',
    description: 'Switch with error message and styling',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/demo/switch/switch-error.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-55_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-02-55_1.MP4',
    },
  },

  'switch-disabled': {
    name: 'switch-disabled',
    description: 'Switches in disabled state',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/demo/switch/switch-disabled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-03-13_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-03-13_1.MP4',
    },
  },

  'switch-settings': {
    name: 'switch-settings',
    description: 'Multiple switches arranged in a settings list',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/demo/switch/switch-settings.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-03-57_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-03-57_1.MP4',
    },
  },

  'switch-colors': {
    name: 'switch-colors',
    description: 'Switches with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['switch', 'view'],
    files: [
      {
        path: 'registry/demo/switch/switch-colors.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-04-18_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 11-04-18_1.MP4',
    },
  },
};
