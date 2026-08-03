// Registry configuration for radio component and demo

export const radioRegistry = {
  // Main radio component
  radio: {
    name: 'radio',
    description:
      'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
    type: 'registry:ui',
    dependencies: ['react-native'],
    registryDependencies: ['text'],
    hooks: ['useColor', 'useHaptics'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/radio.tsx',
        target: 'components/ui/radio.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0233-radio-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0233-radio-demo.MP4',
    },
  },

  // Default demo
  'radio-demo': {
    name: 'radio-demo',
    description: 'A basic radio group with multiple options',
    type: 'registry:example',
    registryDependencies: ['radio'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/radio/radio-demo.tsx',
        target: 'components/demo/radio/radio-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0233-radio-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0233-radio-demo.MP4',
    },
  },

  // Horizontal layout example
  'radio-horizontal': {
    name: 'radio-horizontal',
    description: 'Radio buttons arranged horizontally',
    type: 'registry:example',
    registryDependencies: ['radio'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/radio/radio-horizontal.tsx',
        target: 'components/demo/radio/radio-horizontal.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0234-radio-horizontal.MP4',
      dark: 'https://demo.ahmedbna.com/0234-radio-horizontal.MP4',
    },
  },

  // Disabled options example
  'radio-disabled': {
    name: 'radio-disabled',
    description: 'Radio group with some disabled options',
    type: 'registry:example',
    registryDependencies: ['radio', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/radio/radio-disabled.tsx',
        target: 'components/demo/radio/radio-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0235-radio-disabled.MP4',
      dark: 'https://demo.ahmedbna.com/0235-radio-disabled.MP4',
    },
  },

  // Custom styled example
  'radio-styled': {
    name: 'radio-styled',
    description: 'Radio buttons with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['radio', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/radio/radio-styled.tsx',
        target: 'components/demo/radio/radio-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0236-radio-styled.MP4',
      dark: 'https://demo.ahmedbna.com/0236-radio-styled.MP4',
    },
  },

  // Form integration example
  'radio-form': {
    name: 'radio-form',
    description: 'Radio group integrated with form validation',
    type: 'registry:example',
    registryDependencies: ['radio', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/radio/radio-form.tsx',
        target: 'components/demo/radio/radio-form.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0237-radio-form.MP4',
      dark: 'https://demo.ahmedbna.com/0237-radio-form.MP4',
    },
  },

  // Large size example
  'radio-large': {
    name: 'radio-large',
    description: 'Radio buttons with larger size and spacing',
    type: 'registry:example',
    registryDependencies: ['radio'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/radio/radio-large.tsx',
        target: 'components/demo/radio/radio-large.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0238-radio-large.MP4',
      dark: 'https://demo.ahmedbna.com/0238-radio-large.MP4',
    },
  },

  // Single radio button example
  'radio-single': {
    name: 'radio-single',
    description: 'Individual radio button component usage',
    type: 'registry:example',
    registryDependencies: ['radio', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/radio/radio-single.tsx',
        target: 'components/demo/radio/radio-single.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0239-radio-single.MP4',
      dark: 'https://demo.ahmedbna.com/0239-radio-single.MP4',
    },
  },
};
