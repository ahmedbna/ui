// docs/registry/checkbox.ts
// Registry configuration for checkbox component and demo
export const checkboxRegistry = {
  // Main checkbox component
  checkbox: {
    name: 'checkbox',
    description:
      'A control that allows the user to toggle between checked and not checked states.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/checkbox.tsx',
        target: 'components/ui/checkbox.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-20_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-20_1.MP4',
    },
  },

  // Default demo
  'checkbox-demo': {
    name: 'checkbox-demo',
    description: 'A basic checkbox with label',
    type: 'registry:example',
    registryDependencies: ['checkbox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/checkbox/checkbox-demo.tsx',
        target: 'components/demo/checkbox/checkbox-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-20_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-20_1.MP4',
    },
  },

  // States example
  'checkbox-states': {
    name: 'checkbox-states',
    description:
      'Checkboxes in different states: unchecked, checked, and disabled',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/checkbox/checkbox-states.tsx',
        target: 'components/demo/checkbox/checkbox-states.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-17-04_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-17-04_1.MP4',
    },
  },

  // Without label example
  'checkbox-without-label': {
    name: 'checkbox-without-label',
    description: 'A checkbox without a label',
    type: 'registry:example',
    registryDependencies: ['checkbox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/checkbox/checkbox-without-label.tsx',
        target: 'components/demo/checkbox/checkbox-without-label.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-17-24_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-17-24_1.MP4',
    },
  },

  // With error example
  'checkbox-with-error': {
    name: 'checkbox-with-error',
    description: 'A checkbox with error styling and message',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/checkbox/checkbox-with-error.tsx',
        target: 'components/demo/checkbox/checkbox-with-error.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-17-46_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-17-46_1.MP4',
    },
  },

  // Custom styling example
  'checkbox-custom-styling': {
    name: 'checkbox-custom-styling',
    description: 'Checkboxes with custom label styling',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/checkbox/checkbox-custom-styling.tsx',
        target: 'components/demo/checkbox/checkbox-custom-styling.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-18-04_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-18-04_1.MP4',
    },
  },

  // Group example
  'checkbox-group': {
    name: 'checkbox-group',
    description: 'Multiple checkboxes working together as a group',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/checkbox/checkbox-group.tsx',
        target: 'components/demo/checkbox/checkbox-group.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-18-20_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-18-20_1.MP4',
    },
  },
};
