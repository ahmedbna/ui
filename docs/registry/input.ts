// Registry configuration for input component and demo

export const inputRegistry = {
  // Main input component
  input: {
    name: 'input',
    description:
      'A styled text input component with label, validation, icons, and grouped layouts.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'icon', 'view'],
    files: [
      {
        path: 'registry/components/ui/input.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-25-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-25-09_1.MP4',
    },
  },

  // Default demo
  'input-demo': {
    name: 'input-demo',
    description: 'A basic input with label and placeholder',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input'],
    files: [
      {
        path: 'registry/demo/input/input-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-25-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-25-09_1.MP4',
    },
  },

  // Icons example
  'input-icons': {
    name: 'input-icons',
    description: 'Inputs with left-side icons',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    files: [
      {
        path: 'registry/demo/input/input-icons.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-26-46_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-26-46_1.MP4',
    },
  },

  // Variants example
  'input-variants': {
    name: 'input-variants',
    description: 'Different input variants - filled and outline',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    files: [
      {
        path: 'registry/demo/input/input-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-27-10_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-27-10_1.MP4',
    },
  },

  // Validation example
  'input-validation': {
    name: 'input-validation',
    description: 'Inputs with error states and validation messages',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    files: [
      {
        path: 'registry/demo/input/input-validation.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-27-48_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-27-48_1.MP4',
    },
  },

  // Right components example
  'input-right-components': {
    name: 'input-right-components',
    description:
      'Inputs with buttons, icons, or custom components on the right',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view', 'button', 'text'],
    files: [
      {
        path: 'registry/demo/input/input-right-components.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-31-39_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-31-39_1.MP4',
    },
  },

  // Disabled example
  'input-disabled': {
    name: 'input-disabled',
    description: 'Disabled inputs with reduced opacity',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    files: [
      {
        path: 'registry/demo/input/input-disabled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5593.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5593.PNG',
    },
  },

  // Grouped example
  'input-grouped': {
    name: 'input-grouped',
    description: 'Multiple inputs grouped together in a card-like container',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input'],
    files: [
      {
        path: 'registry/demo/input/input-grouped.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-32-33_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-32-33_1.MP4',
    },
  },

  // Form example
  'input-form': {
    name: 'input-form',
    description: 'Complete form example with various input types',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'button', 'view', 'text'],
    files: [
      {
        path: 'registry/demo/input/input-form.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-33-17_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-33-17_1.MP4',
    },
  },
};
