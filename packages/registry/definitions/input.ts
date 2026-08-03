// Registry configuration for input component and demo

export const inputRegistry = {
  // Main input component
  input: {
    name: 'input',
    description:
      'A styled text input component with label, validation, icons, and grouped layouts.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'icon', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/input.tsx',
        target: 'components/ui/input.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0175-input-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0175-input-demo.MP4',
    },
  },

  // Default demo
  'input-demo': {
    name: 'input-demo',
    description: 'A basic input with label and placeholder',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-demo.tsx',
        target: 'components/demo/input/input-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0175-input-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0175-input-demo.MP4',
    },
  },

  // Icons example
  'input-icons': {
    name: 'input-icons',
    description: 'Inputs with left-side icons',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-icons.tsx',
        target: 'components/demo/input/input-icons.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0176-input-icons.MP4',
      dark: 'https://ui.ahmedbna.com/0176-input-icons.MP4',
    },
  },

  // Variants example
  'input-variants': {
    name: 'input-variants',
    description: 'Different input variants - filled and outline',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-variants.tsx',
        target: 'components/demo/input/input-variants.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0177-input-variants.MP4',
      dark: 'https://ui.ahmedbna.com/0177-input-variants.MP4',
    },
  },

  // Validation example
  'input-validation': {
    name: 'input-validation',
    description: 'Inputs with error states and validation messages',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-validation.tsx',
        target: 'components/demo/input/input-validation.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0178-input-validation.MP4',
      dark: 'https://ui.ahmedbna.com/0178-input-validation.MP4',
    },
  },

  // Right components example
  'input-right-components': {
    name: 'input-right-components',
    description:
      'Inputs with buttons, icons, or custom components on the right',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view', 'button', 'text'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-right-components.tsx',
        target: 'components/demo/input/input-right-components.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0179-input-right-components.MP4',
      dark: 'https://ui.ahmedbna.com/0179-input-right-components.MP4',
    },
  },

  // Disabled example
  'input-disabled': {
    name: 'input-disabled',
    description: 'Disabled inputs with reduced opacity',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-disabled.tsx',
        target: 'components/demo/input/input-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0180-input-disabled.PNG',
      dark: 'https://ui.ahmedbna.com/0180-input-disabled.PNG',
    },
  },

  // Grouped example
  'input-grouped': {
    name: 'input-grouped',
    description: 'Multiple inputs grouped together in a card-like container',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-grouped.tsx',
        target: 'components/demo/input/input-grouped.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0181-input-grouped.MP4',
      dark: 'https://ui.ahmedbna.com/0181-input-grouped.MP4',
    },
  },

  // Form example
  'input-form': {
    name: 'input-form',
    description: 'Complete form example with various input types',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['input', 'button', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input/input-form.tsx',
        target: 'components/demo/input/input-form.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0182-input-form.MP4',
      dark: 'https://ui.ahmedbna.com/0182-input-form.MP4',
    },
  },
};
