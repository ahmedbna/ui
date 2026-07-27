// Registry configuration for toast component and demo

export const toastRegistry = {
  // Main toast component
  toast: {
    name: 'toast',
    description:
      'A succinct message that is displayed temporarily with Dynamic Island animation inspired by iOS.',
    type: 'registry:ui',
    dependencies: [
      'react-native-gesture-handler',
      'react-native-reanimated',
      'lucide-react-native',
    ],
    registryDependencies: ['text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/toast.tsx',
        target: 'components/ui/toast.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-24-28_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-24-28_1.MP4',
    },
  },

  // Default demo
  'toast-demo': {
    name: 'toast-demo',
    description: 'A basic toast notification with title and description',
    type: 'registry:example',
    registryDependencies: ['toast', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/toast/toast-demo.tsx',
        target: 'components/demo/toast/toast-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-24-28_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-24-28_1.MP4',
    },
  },

  // Variants example
  'toast-variants': {
    name: 'toast-variants',
    description:
      'Toast notifications with different variants (success, error, warning, info)',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/toast/toast-variants.tsx',
        target: 'components/demo/toast/toast-variants.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-25-51_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-25-51_1.MP4',
    },
  },

  // Actions example
  'toast-actions': {
    name: 'toast-actions',
    description: 'Toast notifications with action buttons',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/toast/toast-actions.tsx',
        target: 'components/demo/toast/toast-actions.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-26-21_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-26-21_1.MP4',
    },
  },

  // Duration example
  'toast-duration': {
    name: 'toast-duration',
    description: 'Toast notifications with custom durations',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/toast/toast-duration.tsx',
        target: 'components/demo/toast/toast-duration.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-26-45_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-26-45_1.MP4',
    },
  },

  // Multiple toasts example
  'toast-multiple': {
    name: 'toast-multiple',
    description: 'Multiple toast notifications stacked vertically',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/toast/toast-multiple.tsx',
        target: 'components/demo/toast/toast-multiple.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-27-16_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-27-16_1.MP4',
    },
  },

  // Compact example
  'toast-compact': {
    name: 'toast-compact',
    description: 'Compact toast notifications without title or description',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/toast/toast-compact.tsx',
        target: 'components/demo/toast/toast-compact.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-31-55_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-31-55_1.MP4',
    },
  },
};
