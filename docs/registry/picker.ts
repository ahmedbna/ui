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
    files: [
      {
        path: 'registry/components/ui/picker.tsx',
        type: 'registry:ui',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-demo.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-sections.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-multiple.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-searchable.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-variants.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-styled.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-form.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/picker/picker-advanced.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-13-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 09-13-09_1.MP4',
    },
  },
};
