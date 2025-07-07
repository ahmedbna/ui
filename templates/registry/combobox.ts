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
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/combobox.tsx',
        target: 'components/ui/combobox.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/demo/combobox/combobox-demo.tsx',
        target: 'components/demo/combobox/combobox-demo.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/demo/combobox/combobox-groups.tsx',
        target: 'components/demo/combobox/combobox-groups.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/demo/combobox/combobox-multiple.tsx',
        target: 'components/demo/combobox/combobox-multiple.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/demo/combobox/combobox-disabled.tsx',
        target: 'components/demo/combobox/combobox-disabled.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/demo/combobox/combobox-search.tsx',
        target: 'components/demo/combobox/combobox-search.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/demo/combobox/combobox-form.tsx',
        target: 'components/demo/combobox/combobox-form.tsx',
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
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/demo/combobox/combobox-large.tsx',
        target: 'components/demo/combobox/combobox-large.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-33-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-33-14_1.MP4',
    },
  },
};
