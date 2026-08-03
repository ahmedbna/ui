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
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/picker.tsx',
        target: 'components/ui/picker.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0211-picker-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0211-picker-demo.MP4',
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
        path: 'src/demo/picker/picker-demo.tsx',
        target: 'components/demo/picker/picker-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0211-picker-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0211-picker-demo.MP4',
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
        path: 'src/demo/picker/picker-sections.tsx',
        target: 'components/demo/picker/picker-sections.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0212-picker-sections.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0212-picker-sections.MP4',
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
        path: 'src/demo/picker/picker-multiple.tsx',
        target: 'components/demo/picker/picker-multiple.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0213-picker-multiple.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0213-picker-multiple.MP4',
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
        path: 'src/demo/picker/picker-searchable.tsx',
        target: 'components/demo/picker/picker-searchable.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0214-picker-searchable.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0214-picker-searchable.MP4',
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
        path: 'src/demo/picker/picker-variants.tsx',
        target: 'components/demo/picker/picker-variants.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0215-picker-variants.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0215-picker-variants.MP4',
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
        path: 'src/demo/picker/picker-styled.tsx',
        target: 'components/demo/picker/picker-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0216-picker-styled.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0216-picker-styled.MP4',
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
        path: 'src/demo/picker/picker-form.tsx',
        target: 'components/demo/picker/picker-form.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0217-picker-form.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0217-picker-form.MP4',
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
        path: 'src/demo/picker/picker-advanced.tsx',
        target: 'components/demo/picker/picker-advanced.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0218-picker-advanced.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0218-picker-advanced.MP4',
    },
  },
};
