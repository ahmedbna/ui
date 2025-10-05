// docs/registry/alert.ts
// Registry configuration for alert component and demo

export const alertRegistry = {
  // Main alert component
  alert: {
    name: 'alert',
    description:
      'Display important messages to users with both visual inline alerts and native system alerts.',
    type: 'registry:ui',
    registryDependencies: ['text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/alert.tsx',
        target: 'components/ui/alert.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-10_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-10_1.mov',
    },
  },

  // Two button alert demo
  'alert-demo': {
    name: 'alert-demo',
    description: 'A basic native alert with two buttons',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-demo.tsx',
        target: 'components/demo/alert/alert-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-10_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-10_1.mov',
    },
  },

  // Three button alert demo
  'alert-three-button-demo': {
    name: 'alert-three-button-demo',
    description: 'A native alert with three button options',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-three-button-demo.tsx',
        target: 'components/demo/alert/alert-three-button-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-32_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-32_1.MP4',
    },
  },

  // Success alert demo
  'alert-success-demo': {
    name: 'alert-success-demo',
    description: 'Success alert with positive messaging',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-success-demo.tsx',
        target: 'components/demo/alert/alert-success-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-52_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-25-52_1.mov',
    },
  },

  // Error alert demo
  'alert-error-demo': {
    name: 'alert-error-demo',
    description: 'Error alert with destructive styling',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-error-demo.tsx',
        target: 'components/demo/alert/alert-error-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-26-10_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-26-10_1.MP4',
    },
  },

  // Confirm alert demo
  'alert-confirm-demo': {
    name: 'alert-confirm-demo',
    description: 'Confirmation alert for destructive actions',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-confirm-demo.tsx',
        target: 'components/demo/alert/alert-confirm-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-26-36_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-26-36_1.MP4',
    },
  },

  // Custom alert demo
  'alert-custom-demo': {
    name: 'alert-custom-demo',
    description: 'Custom native alert with multiple options',
    type: 'registry:example',
    registryDependencies: ['alert', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-custom-demo.tsx',
        target: 'components/demo/alert/alert-custom-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-26-55_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-26-55_1.MP4',
    },
  },

  // Visual alert demo
  'alert-visual-demo': {
    name: 'alert-visual-demo',
    description: 'Inline visual alerts that appear within your content',
    type: 'registry:example',
    registryDependencies: ['alert', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-visual-demo.tsx',
        target: 'components/demo/alert/alert-visual-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-24-45_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-24-45_1.mov',
    },
  },

  // Visual destructive alert demo
  'alert-visual-destructive-demo': {
    name: 'alert-visual-destructive-demo',
    description: 'Destructive visual alerts for error messages',
    type: 'registry:example',
    registryDependencies: ['alert', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-visual-destructive-demo.tsx',
        target: 'components/demo/alert/alert-visual-destructive-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-24-45_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-24-45_1.mov',
    },
  },

  // Advanced demo combining multiple alert types
  'alert-advanced-demo': {
    name: 'alert-advanced-demo',
    description: 'Advanced alert usage patterns and combinations',
    type: 'registry:example',
    registryDependencies: ['alert', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/alert/alert-advanced-demo.tsx',
        target: 'components/demo/alert/alert-advanced-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-27-15_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-27-15_1.MP4',
    },
  },
};
