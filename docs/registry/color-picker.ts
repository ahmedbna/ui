// Registry configuration for color-picker component and examples

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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/color-picker/color-picker-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/color-picker/color-picker-sizes.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/color-picker/color-picker-colors.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/color-picker/color-picker-disabled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/color-picker/color-swatch-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'color-picker-styled': {
    name: 'color-picker-styled',
    description: 'Color pickers with custom styling and layouts',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/examples/color-picker/color-picker-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'color-picker-palette': {
    name: 'color-picker-palette',
    description: 'Multiple color pickers arranged as a color palette',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/examples/color-picker/color-picker-palette.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'color-picker-labeled': {
    name: 'color-picker-labeled',
    description: 'color-picker-labeled',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    files: [
      {
        path: 'registry/examples/color-picker/color-picker-labeled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
