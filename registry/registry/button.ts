// docs/registry/button.ts
// Registry configuration for button component and demo

export const buttonRegistry = {
  // Main button component
  button: {
    name: 'button',
    description:
      'A versatile button component with multiple variants, sizes, and interactive animations.',
    type: 'registry:ui',
    dependencies: [
      'react-native-reanimated',
      'react-native-gesture-handler',
      'lucide-react-native',
    ],
    registryDependencies: ['text', 'icon', 'spinner'],
    files: [
      {
        path: 'registry/components/ui/button.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-44-50_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-44-50_1.MP4',
    },
  },

  // Default demo
  'button-demo': {
    name: 'button-demo',
    description: 'A basic button with default styling',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-44-50_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-44-50_1.MP4',
    },
  },

  // Variants example
  'button-variants': {
    name: 'button-variants',
    description: 'Buttons with different visual styles',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-45-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-45-14_1.MP4',
    },
  },

  // Sizes example
  'button-sizes': {
    name: 'button-sizes',
    description: 'Buttons in different sizes',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-sizes.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-45-40_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-45-40_1.MP4',
    },
  },

  // Icons example
  'button-with-icons': {
    name: 'button-with-icons',
    description: 'Buttons with leading icons',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-with-icons.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-45-59_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-45-59_1.MP4',
    },
  },

  // Icon only example
  'button-icon-only': {
    name: 'button-icon-only',
    description: 'Icon-only buttons for compact layouts',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-icon-only.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-50-31_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-50-31_1.MP4',
    },
  },

  // Loading example
  'button-loading': {
    name: 'button-loading',
    description: 'Buttons with loading spinners',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-loading.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-50-58_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-50-58_1.MP4',
    },
  },

  // Disabled example
  'button-disabled': {
    name: 'button-disabled',
    description: 'Buttons in disabled state',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-disabled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-51-44_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 00-51-44_1.MP4',
    },
  },

  // Custom styling example
  'button-custom': {
    name: 'button-custom',
    description: 'Buttons with custom colors and styles',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-custom.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-03-05_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-03-05_1.MP4',
    },
  },

  // Animation example
  'button-animation': {
    name: 'button-animation',
    description: 'Buttons with and without animations',
    type: 'registry:example',
    registryDependencies: ['button'],
    files: [
      {
        path: 'registry/demo/button/button-animation.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-03-33_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-03-33_1.MP4',
    },
  },
};
