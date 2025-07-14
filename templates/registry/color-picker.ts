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
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/color-picker.tsx',
        target: 'components/ui/color-picker.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-21-55_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-21-55_1.MP4',
    },
  },

  // Default demo
  'color-picker-demo': {
    name: 'color-picker-demo',
    description: 'A basic color picker with swatch and modal selection',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-picker-demo.tsx',
        target: 'components/demo/color-picker/color-picker-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-21-55_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-21-55_1.MP4',
    },
  },

  // Sizes example
  'color-picker-sizes': {
    name: 'color-picker-sizes',
    description: 'Color pickers with different swatch sizes',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-picker-sizes.tsx',
        target: 'components/demo/color-picker/color-picker-sizes.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-22-23_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-22-23_1.MP4',
    },
  },

  // Colors example
  'color-picker-colors': {
    name: 'color-picker-colors',
    description: 'Color pickers with different initial colors',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-picker-colors.tsx',
        target: 'components/demo/color-picker/color-picker-colors.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-22-54_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-22-54_1.MP4',
    },
  },

  // Disabled example
  'color-picker-disabled': {
    name: 'color-picker-disabled',
    description: 'Disabled color picker that cannot be opened',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-picker-disabled.tsx',
        target: 'components/demo/color-picker/color-picker-disabled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-23-24_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-23-24_1.MP4',
    },
  },

  // Color swatch demo
  'color-swatch-demo': {
    name: 'color-swatch-demo',
    description: 'Standalone color swatches without picker functionality',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-swatch-demo.tsx',
        target: 'components/demo/color-picker/color-swatch-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-23-38_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-23-38_1.MP4',
    },
  },

  'color-picker-styled': {
    name: 'color-picker-styled',
    description: 'Color pickers with custom styling and layouts',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-picker-styled.tsx',
        target: 'components/demo/color-picker/color-picker-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-23-59_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-23-59_1.MP4',
    },
  },

  'color-picker-palette': {
    name: 'color-picker-palette',
    description: 'Multiple color pickers arranged as a color palette',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-picker-palette.tsx',
        target: 'components/demo/color-picker/color-picker-palette.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-25-11_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-25-11_1.mov',
    },
  },

  'color-picker-labeled': {
    name: 'color-picker-labeled',
    description: 'color-picker-labeled',
    type: 'registry:example',
    registryDependencies: ['color-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/color-picker/color-picker-labeled.tsx',
        target: 'components/demo/color-picker/color-picker-labeled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-25-52_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-25-52_1.MP4',
    },
  },
};
