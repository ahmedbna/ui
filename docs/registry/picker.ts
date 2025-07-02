// Registry configuration for picker component and examples

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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/picker/picker-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'picker-sections': {
    name: 'picker-sections',
    description: 'Picker with grouped options in sections',
    type: 'registry:example',
    registryDependencies: ['picker'],
    files: [
      {
        path: 'registry/examples/picker/picker-sections.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'picker-multiple': {
    name: 'picker-multiple',
    description: 'Picker allowing multiple selections',
    type: 'registry:example',
    registryDependencies: ['picker'],
    files: [
      {
        path: 'registry/examples/picker/picker-multiple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'picker-searchable': {
    name: 'picker-searchable',
    description: 'Picker with search functionality',
    type: 'registry:example',
    registryDependencies: ['picker'],
    files: [
      {
        path: 'registry/examples/picker/picker-searchable.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'picker-variants': {
    name: 'picker-variants',
    description: 'Different picker variants: outline, filled, and group',
    type: 'registry:example',
    registryDependencies: ['picker', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/picker/picker-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/picker/picker-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'picker-form': {
    name: 'picker-form',
    description: 'Picker integrated with form validation and error handling',
    type: 'registry:example',
    registryDependencies: ['picker', 'view', 'text', 'button'],
    files: [
      {
        path: 'registry/examples/picker/picker-form.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/picker/picker-advanced.tsx',
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
