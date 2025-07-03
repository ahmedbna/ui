// Registry configuration for color-picker component and demo

export const colorPickerRegistry = {
  // Main color picker component
  'color-picker': {
    name: 'color-picker',
    description:
      'A color picker component with HSV color space selection and swatch display.',
    type: 'registry:ui',
    dependencies: [
      'expo-linear-gradient',
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-svg',
    ],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/color-picker.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-21-55_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-21-55_1.MP4',
    },
  },

  // Default demo
  'color-picker-demo': {
    name: 'color-picker-demo',
    description: 'A basic color picker with swatch and modal selection',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-picker-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-21-55_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-21-55_1.MP4',
    },
  },

  // Sizes example
  'color-picker-sizes': {
    name: 'color-picker-sizes',
    description: 'Color pickers with different swatch sizes',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-picker-sizes.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-22-23_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-22-23_1.MP4',
    },
  },

  // Colors example
  'color-picker-colors': {
    name: 'color-picker-colors',
    description: 'Color pickers with different initial colors',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-picker-colors.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-22-54_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-22-54_1.MP4',
    },
  },

  // Disabled example
  'color-picker-disabled': {
    name: 'color-picker-disabled',
    description: 'Disabled color picker that cannot be opened',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-picker-disabled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-23-24_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-23-24_1.MP4',
    },
  },

  // Color swatch demo
  'color-swatch-demo': {
    name: 'color-swatch-demo',
    description: 'Standalone color swatches without picker functionality',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-swatch-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-23-38_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-23-38_1.MP4',
    },
  },

  'color-picker-styled': {
    name: 'color-picker-styled',
    description: 'Color pickers with custom styling and layouts',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-picker-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-23-59_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-23-59_1.MP4',
    },
  },

  'color-picker-palette': {
    name: 'color-picker-palette',
    description: 'Multiple color pickers arranged as a color palette',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-picker-palette.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-25-11_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-25-11_1.MP4',
    },
  },

  'color-picker-labeled': {
    name: 'color-picker-labeled',
    description: 'color-picker-labeled',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/demo/color-picker/color-picker-labeled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-25-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-25-52_1.MP4',
    },
  },
};
