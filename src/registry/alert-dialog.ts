// Registry configuration for alert-dialog component and demo

export const alertDialogRegistry = {
  // Main alert-dialog component
  'alert-dialog': {
    name: 'alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: ['card', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/alert-dialog.tsx',
        target: 'components/ui/alert-dialog.tsx',
      },
    ],
    preview: {
      // todo: prepare preview videos
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_09-05-2025 15-56-08_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_09-05-2025 15-56-08_1.MP4',
    },
  },

  // Basic demo
  'alert-dialog-demo': {
    name: 'alert-dialog-demo',
    description: 'A basic alert dialog with confirmation buttons',
    type: 'registry:example',
    registryDependencies: ['alert-dialog'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert-dialog/alert-dialog-demo.tsx',
        target: 'components/demo/alert-dialog/alert-dialog-demo.tsx',
      },
    ],
    preview: {
      // todo: prepare preview videos
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_09-05-2025 15-56-08_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_09-05-2025 15-56-08_1.MP4',
    },
  },

  // Destructive action demo
  'alert-dialog-destructive': {
    name: 'alert-dialog-destructive',
    description: 'An alert dialog for destructive actions like delete',
    type: 'registry:example',
    registryDependencies: ['alert-dialog'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert-dialog/alert-dialog-destructive.tsx',
        target: 'components/demo/alert-dialog/alert-dialog-destructive.tsx',
      },
    ],
    preview: {
      // todo: prepare preview videos
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_09-05-2025 15-56-47_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_09-05-2025 15-56-47_1.MP4',
    },
  },

  // Custom styled demo
  'alert-dialog-custom': {
    name: 'alert-dialog-custom',
    description: 'A custom styled alert dialog with different appearance',
    type: 'registry:example',
    registryDependencies: ['alert-dialog'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert-dialog/alert-dialog-custom.tsx',
        target: 'components/demo/alert-dialog/alert-dialog-custom.tsx',
      },
    ],
    preview: {
      // todo: prepare preview videos
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-custom.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-custom-dark.mov',
    },
  },
};
