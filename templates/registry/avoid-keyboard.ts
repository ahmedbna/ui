// Registry configuration for avoid-keyboard component and demos

export const avoidKeyboardRegistry = {
  // Main avoid-keyboard component
  'avoid-keyboard': {
    name: 'avoid-keyboard',
    description:
      'A component that automatically adjusts its height to avoid keyboard overlap with smooth animations and cross-platform support.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: [],
    hooks: ['useKeyboardHeight'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/avoid-keyboard.tsx',
        target: 'components/ui/avoid-keyboard.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-49-51_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-49-51_1.MP4',
    },
  },

  // Basic demo
  'avoid-keyboard-demo': {
    name: 'avoid-keyboard-demo',
    description: 'Simple keyboard avoidance with default settings',
    type: 'registry:example',
    dependencies: [],
    registryDependencies: ['avoid-keyboard', 'input', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avoid-keyboard/avoid-keyboard-demo.tsx',
        target: 'components/demo/avoid-keyboard/avoid-keyboard-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-49-51_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-49-51_1.MP4',
    },
  },

  // Offset example
  'avoid-keyboard-offset': {
    name: 'avoid-keyboard-offset',
    description: 'Add extra spacing above the keyboard',
    type: 'registry:example',
    dependencies: [],
    registryDependencies: ['avoid-keyboard', 'input', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avoid-keyboard/avoid-keyboard-offset.tsx',
        target: 'components/demo/avoid-keyboard/avoid-keyboard-offset.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-48-07_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-48-07_1.MP4',
    },
  },

  // Custom duration example
  'avoid-keyboard-duration': {
    name: 'avoid-keyboard-duration',
    description: 'Customize animation timing for different effects',
    type: 'registry:example',
    dependencies: [],
    registryDependencies: ['avoid-keyboard', 'input', 'view', 'text', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avoid-keyboard/avoid-keyboard-duration.tsx',
        target: 'components/demo/avoid-keyboard/avoid-keyboard-duration.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-47-18_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-47-18_1.MP4',
    },
  },

  // Chat interface example
  'avoid-keyboard-chat': {
    name: 'avoid-keyboard-chat',
    description: 'Real-world chat interface example',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['avoid-keyboard', 'input', 'view', 'text', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avoid-keyboard/avoid-keyboard-chat.tsx',
        target: 'components/demo/avoid-keyboard/avoid-keyboard-chat.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-46-52_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-46-52_1.MP4',
    },
  },

  // Form example
  'avoid-keyboard-form': {
    name: 'avoid-keyboard-form',
    description: 'Form with multiple inputs and keyboard avoidance',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['avoid-keyboard', 'input', 'view', 'text', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avoid-keyboard/avoid-keyboard-form.tsx',
        target: 'components/demo/avoid-keyboard/avoid-keyboard-form.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-37-25_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-37-25_1.MP4',
    },
  },

  // ScrollView integration example
  'avoid-keyboard-playground': {
    name: 'avoid-keyboard-playground',
    description: 'Playground to test different configurations',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['avoid-keyboard', 'button', 'input', 'view', 'text'],
    hooks: ['useKeyboardHeight', 'useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avoid-keyboard/avoid-keyboard-playground.tsx',
        target: 'components/demo/avoid-keyboard/avoid-keyboard-playground.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-27-03_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-25-2025 14-27-03_1.MP4',
    },
  },
};
