// Registry configuration for combobox component and demo

export const comboboxRegistry = {
  // Main combobox component
  combobox: {
    name: 'combobox',
    description:
      'A searchable dropdown component that combines an input with a list of options.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: [],
    hooks: ['useColor', 'useHaptics'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/combobox.tsx',
        target: 'components/ui/combobox.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0123-combobox-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0123-combobox-demo.MP4',
    },
  },

  // Default demo
  'combobox-demo': {
    name: 'combobox-demo',
    description: 'A basic combobox with search functionality',
    type: 'registry:example',
    registryDependencies: ['combobox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/combobox/combobox-demo.tsx',
        target: 'components/demo/combobox/combobox-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0123-combobox-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0123-combobox-demo.MP4',
    },
  },

  'combobox-groups': {
    name: 'combobox-groups',
    description: 'Combobox with grouped options',
    type: 'registry:example',
    registryDependencies: ['combobox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/combobox/combobox-groups.tsx',
        target: 'components/demo/combobox/combobox-groups.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0124-combobox-groups.MP4',
      dark: 'https://demo.ahmedbna.com/0124-combobox-groups.MP4',
    },
  },
  'combobox-multiple': {
    name: 'combobox-multiple',
    description: 'Combobox that allows selecting multiple values',
    type: 'registry:example',
    registryDependencies: ['combobox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/combobox/combobox-multiple.tsx',
        target: 'components/demo/combobox/combobox-multiple.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0125-combobox-multiple.MP4',
      dark: 'https://demo.ahmedbna.com/0125-combobox-multiple.MP4',
    },
  },
  'combobox-disabled': {
    name: 'combobox-disabled',
    description: 'Disabled combobox component',
    type: 'registry:example',
    registryDependencies: ['combobox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/combobox/combobox-disabled.tsx',
        target: 'components/demo/combobox/combobox-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0126-combobox-disabled.MP4',
      dark: 'https://demo.ahmedbna.com/0126-combobox-disabled.MP4',
    },
  },
  'combobox-search': {
    name: 'combobox-search',
    description: 'Combobox with custom search behavior',
    type: 'registry:example',
    registryDependencies: ['combobox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/combobox/combobox-search.tsx',
        target: 'components/demo/combobox/combobox-search.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0127-combobox-search.MP4',
      dark: 'https://demo.ahmedbna.com/0127-combobox-search.MP4',
    },
  },
  'combobox-form': {
    name: 'combobox-form',
    description: 'Combobox integrated with form validation',
    type: 'registry:example',
    registryDependencies: ['combobox', 'text', 'view', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/combobox/combobox-form.tsx',
        target: 'components/demo/combobox/combobox-form.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0128-combobox-form.MP4',
      dark: 'https://demo.ahmedbna.com/0128-combobox-form.MP4',
    },
  },
  'combobox-large': {
    name: 'combobox-large',
    description: 'Combobox handling large datasets efficiently',
    type: 'registry:example',
    registryDependencies: ['combobox'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/combobox/combobox-large.tsx',
        target: 'components/demo/combobox/combobox-large.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0129-combobox-large.MP4',
      dark: 'https://demo.ahmedbna.com/0129-combobox-large.MP4',
    },
  },
};
