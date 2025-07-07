// Registry configuration for popover component and demo

export const popoverRegistry = {
  // Main popover component
  popover: {
    name: 'popover',
    description:
      'A contextual overlay that displays rich content triggered by user interaction.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: ['button'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/popover.tsx',
        target: 'components/ui/popover.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-14-01_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-14-01_1.MP4',
    },
  },

  // Default demo
  'popover-demo': {
    name: 'popover-demo',
    description: 'A basic popover with trigger button and content',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/popover/popover-demo.tsx',
        target: 'components/demo/popover/popover-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-14-01_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-14-01_1.MP4',
    },
  },

  // Positioning example
  'popover-positioning': {
    name: 'popover-positioning',
    description: 'Popovers positioned on different sides of the trigger',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/popover/popover-positioning.tsx',
        target: 'components/demo/popover/popover-positioning.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-17-57_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-17-57_1.MP4',
    },
  },

  // Alignment example
  'popover-alignment': {
    name: 'popover-alignment',
    description: 'Popovers with different alignment options',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/popover/popover-alignment.tsx',
        target: 'components/demo/popover/popover-alignment.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-18-41_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-18-41_1.MP4',
    },
  },

  // Controlled example
  'popover-controlled': {
    name: 'popover-controlled',
    description: 'A controlled popover with external state management',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/popover/popover-controlled.tsx',
        target: 'components/demo/popover/popover-controlled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-19-23_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-19-23_1.MP4',
    },
  },

  // Custom content example
  'popover-custom': {
    name: 'popover-custom',
    description: 'Popovers with custom content and styling',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/popover/popover-custom.tsx',
        target: 'components/demo/popover/popover-custom.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-21-07_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-21-07_1.MP4',
    },
  },

  // Form content example
  'popover-form': {
    name: 'popover-form',
    description: 'A popover containing form elements',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view', 'input'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/popover/popover-form.tsx',
        target: 'components/demo/popover/popover-form.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-21-50_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-21-50_1.MP4',
    },
  },

  // Menu style example
  'popover-menu': {
    name: 'popover-menu',
    description: 'A popover styled as a dropdown menu',
    type: 'registry:example',
    registryDependencies: ['popover', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/popover/popover-menu.tsx',
        target: 'components/demo/popover/popover-menu.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-23-30_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-23-30_1.MP4',
    },
  },
};
