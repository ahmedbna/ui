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
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/radio.tsx',
        target: 'components/ui/radio.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-42-48_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-42-48_1.MP4',
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
        path: 'templates/demo/radio/radio-demo.tsx',
        target: 'components/demo/radio/radio-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-42-48_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-42-48_1.MP4',
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
        path: 'templates/demo/radio/radio-horizontal.tsx',
        target: 'components/demo/radio/radio-horizontal.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-43-05_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-43-05_1.MP4',
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
        path: 'templates/demo/radio/radio-disabled.tsx',
        target: 'components/demo/radio/radio-disabled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-43-24_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-43-24_1.MP4',
    },
  },

  // Custom styled example
  'radio-styled': {
    name: 'radio-styled',
    description: 'Radio buttons with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['radio', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/radio/radio-styled.tsx',
        target: 'components/demo/radio/radio-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-45-43_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-45-43_1.MP4',
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
        path: 'templates/demo/radio/radio-form.tsx',
        target: 'components/demo/radio/radio-form.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-48-18_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-48-18_1.MP4',
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
        path: 'templates/demo/radio/radio-large.tsx',
        target: 'components/demo/radio/radio-large.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-46-32_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-46-32_1.MP4',
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
        path: 'templates/demo/radio/radio-single.tsx',
        target: 'components/demo/radio/radio-single.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-47-08_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-47-08_1.MP4',
    },
  },
};
