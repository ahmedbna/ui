// docs/registry/action-sheet.ts
// Registry configuration for action sheet component and demo

export const actionSheetRegistry = {
  // Main action sheet component
  'action-sheet': {
    name: 'action-sheet',
    description:
      'A native-feeling action sheet component that provides a menu of options triggered from the bottom of the screen.',
    type: 'registry:ui',
    registryDependencies: ['text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/action-sheet.tsx',
        target: 'components/ui/action-sheet.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-08_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-08_1.MP4',
    },
  },

  // Default demo
  'action-sheet-demo': {
    name: 'action-sheet-demo',
    description: 'A basic action sheet with multiple options',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/action-sheet/action-sheet-demo.tsx',
        target: 'components/demo/action-sheet/action-sheet-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-08_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-08_1.MP4',
    },
  },

  // Icons example
  'action-sheet-icons': {
    name: 'action-sheet-icons',
    description: 'An action sheet with icons next to each option',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/action-sheet/action-sheet-icons.tsx',
        target: 'components/demo/action-sheet/action-sheet-icons.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-33_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-33_1.MP4',
    },
  },

  // Destructive example
  'action-sheet-destructive': {
    name: 'action-sheet-destructive',
    description:
      'An action sheet featuring destructive actions with appropriate styling',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/action-sheet/action-sheet-destructive.tsx',
        target: 'components/demo/action-sheet/action-sheet-destructive.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-54_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-18-54_1.MP4',
    },
  },

  // Disabled example
  'action-sheet-disabled': {
    name: 'action-sheet-disabled',
    description: 'An action sheet with some disabled options',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/action-sheet/action-sheet-disabled.tsx',
        target: 'components/demo/action-sheet/action-sheet-disabled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-19-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-19-14_1.MP4',
    },
  },

  // Custom styled example
  'action-sheet-styled': {
    name: 'action-sheet-styled',
    description: 'An action sheet with custom styling and branding',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/action-sheet/action-sheet-styled.tsx',
        target: 'components/demo/action-sheet/action-sheet-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-19-45_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-19-45_1.MP4',
    },
  },

  // Long list example
  'action-sheet-long': {
    name: 'action-sheet-long',
    description: 'An action sheet with many options that scrolls',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/action-sheet/action-sheet-long.tsx',
        target: 'components/demo/action-sheet/action-sheet-long.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-20-08_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-20-08_1.MP4',
    },
  },

  // Hook usage example
  'action-sheet-hook': {
    name: 'action-sheet-hook',
    description: 'Using the useActionSheet hook for easier management',
    type: 'registry:example',
    registryDependencies: ['action-sheet', 'button', 'view', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/action-sheet/action-sheet-hook.tsx',
        target: 'components/demo/action-sheet/action-sheet-hook.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-20-29_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-20-29_1.MP4',
    },
  },
};
