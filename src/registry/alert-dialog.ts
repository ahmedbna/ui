// Registry configuration for alert-dialog component and demo

export const alertDialogRegistry = {
  // Main alert-dialog component
  'alert-dialog': {
    name: 'alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
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
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-preview.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-preview-dark.mov',
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
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-demo-dark.mov',
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
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-destructive.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-destructive-dark.mov',
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
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-custom.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/alert-dialog-custom-dark.mov',
    },
  },
};