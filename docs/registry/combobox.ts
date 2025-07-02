// Registry configuration for combobox component and examples

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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/combobox/combobox-demo.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'combobox-groups': {
    name: 'combobox-groups',
    description: 'Combobox with grouped options',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/examples/combobox/combobox-groups.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
  'combobox-multiple': {
    name: 'combobox-multiple',
    description: 'Combobox that allows selecting multiple values',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/examples/combobox/combobox-multiple.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
  'combobox-disabled': {
    name: 'combobox-disabled',
    description: 'Disabled combobox component',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/examples/combobox/combobox-disabled.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
  'combobox-search': {
    name: 'combobox-search',
    description: 'Combobox with custom search behavior',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/examples/combobox/combobox-search.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
  'combobox-form': {
    name: 'combobox-form',
    description: 'Combobox integrated with form validation',
    type: 'registry:ui',
    registryDependencies: ['combobox', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/combobox/combobox-form.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
  'combobox-large': {
    name: 'combobox-large',
    description: 'Combobox handling large datasets efficiently',
    type: 'registry:ui',
    registryDependencies: ['combobox'],
    files: [
      {
        path: 'registry/examples/combobox/combobox-large.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
