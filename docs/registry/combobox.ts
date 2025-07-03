// Registry configuration for combobox component and demo

export const comboboxRegistry = {
  // Main combobox component
  combobox: {
    name: 'combobox',
    description:
      'A searchable dropdown component that combines an input with a list of options.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/combobox.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-30-31_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-30-31_1.MP4',
    },
  },

  // Default demo
  'combobox-demo': {
    name: 'combobox-demo',
    description: 'A basic combobox with search functionality',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/demo/combobox/combobox-demo.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-30-31_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-30-31_1.MP4',
    },
  },

  'combobox-groups': {
    name: 'combobox-groups',
    description: 'Combobox with grouped options',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/demo/combobox/combobox-groups.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-31-00_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-31-00_1.MP4',
    },
  },
  'combobox-multiple': {
    name: 'combobox-multiple',
    description: 'Combobox that allows selecting multiple values',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/demo/combobox/combobox-multiple.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-31-21_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-31-21_1.MP4',
    },
  },
  'combobox-disabled': {
    name: 'combobox-disabled',
    description: 'Disabled combobox component',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/demo/combobox/combobox-disabled.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-31-48_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-31-48_1.MP4',
    },
  },
  'combobox-search': {
    name: 'combobox-search',
    description: 'Combobox with custom search behavior',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/demo/combobox/combobox-search.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-32-02_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-32-02_1.MP4',
    },
  },
  'combobox-form': {
    name: 'combobox-form',
    description: 'Combobox integrated with form validation',
    type: 'registry:ui',
    registryDependencies: ['combobox', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/combobox/combobox-form.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-32-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-32-52_1.MP4',
    },
  },
  'combobox-large': {
    name: 'combobox-large',
    description: 'Combobox handling large datasets efficiently',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/demo/combobox/combobox-large.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-33-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-33-14_1.MP4',
    },
  },
};
