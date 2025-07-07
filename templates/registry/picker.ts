// Registry configuration for picker component and demo

export const pickerRegistry = {
  // Main picker component
  picker: {
    name: 'picker',
    description:
      'A customizable dropdown picker component with search, sections, and multiple selection support.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['icon', 'scroll-view', 'text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/picker.tsx',
        target: 'components/ui/picker.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-07-27_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-07-27_1.MP4',
    },
  },

  // Default demo
  'picker-demo': {
    name: 'picker-demo',
    description: 'A basic picker with simple options',
    type: 'registry:example',
    registryDependencies: ['picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-demo.tsx',
        target: 'components/demo/picker/picker-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-07-27_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-07-27_1.MP4',
    },
  },

  'picker-sections': {
    name: 'picker-sections',
    description: 'Picker with grouped options in sections',
    type: 'registry:example',
    registryDependencies: ['picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-sections.tsx',
        target: 'components/demo/picker/picker-sections.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-07-57_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-07-57_1.MP4',
    },
  },

  'picker-multiple': {
    name: 'picker-multiple',
    description: 'Picker allowing multiple selections',
    type: 'registry:example',
    registryDependencies: ['picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-multiple.tsx',
        target: 'components/demo/picker/picker-multiple.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-08-44_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-08-44_1.MP4',
    },
  },

  'picker-searchable': {
    name: 'picker-searchable',
    description: 'Picker with search functionality',
    type: 'registry:example',
    registryDependencies: ['picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-searchable.tsx',
        target: 'components/demo/picker/picker-searchable.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-09-22_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-09-22_1.MP4',
    },
  },

  'picker-variants': {
    name: 'picker-variants',
    description: 'Different picker variants: outline, filled, and group',
    type: 'registry:example',
    registryDependencies: ['picker', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-variants.tsx',
        target: 'components/demo/picker/picker-variants.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-10-21_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-10-21_1.MP4',
    },
  },

  'picker-styled': {
    name: 'picker-styled',
    description: 'Picker with custom styling, icons, and labels',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-styled.tsx',
        target: 'components/demo/picker/picker-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-11-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-11-09_1.MP4',
    },
  },

  'picker-form': {
    name: 'picker-form',
    description: 'Picker integrated with form validation and error handling',
    type: 'registry:example',
    registryDependencies: ['picker', 'view', 'text', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-form.tsx',
        target: 'components/demo/picker/picker-form.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-12-21_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-12-21_1.MP4',
    },
  },

  'picker-advanced': {
    name: 'picker-advanced',
    description:
      'Picker with descriptions, disabled options, and custom modal title',
    type: 'registry:example',
    registryDependencies: ['picker', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/picker/picker-advanced.tsx',
        target: 'components/demo/picker/picker-advanced.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-13-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-13-09_1.MP4',
    },
  },
};
