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
    files: [
      {
        path: 'registry/components/ui/toast.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-24-28_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-24-28_1.MP4',
    },
  },

  // Default demo
  'toast-demo': {
    name: 'toast-demo',
    description: 'A basic toast notification with title and description',
    type: 'registry:example',
    registryDependencies: ['toast', 'button'],
    files: [
      {
        path: 'registry/demo/toast/toast-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-24-28_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-24-28_1.MP4',
    },
  },

  // Variants example
  'toast-variants': {
    name: 'toast-variants',
    description:
      'Toast notifications with different variants (success, error, warning, info)',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    files: [
      {
        path: 'registry/demo/toast/toast-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-25-51_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-25-51_1.MP4',
    },
  },

  // Actions example
  'toast-actions': {
    name: 'toast-actions',
    description: 'Toast notifications with action buttons',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    files: [
      {
        path: 'registry/demo/toast/toast-actions.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-26-21_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-26-21_1.MP4',
    },
  },

  // Duration example
  'toast-duration': {
    name: 'toast-duration',
    description: 'Toast notifications with custom durations',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    files: [
      {
        path: 'registry/demo/toast/toast-duration.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-26-45_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-26-45_1.MP4',
    },
  },

  // Multiple toasts example
  'toast-multiple': {
    name: 'toast-multiple',
    description: 'Multiple toast notifications stacked vertically',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    files: [
      {
        path: 'registry/demo/toast/toast-multiple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-27-16_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-27-16_1.MP4',
    },
  },

  // Compact example
  'toast-compact': {
    name: 'toast-compact',
    description: 'Compact toast notifications without title or description',
    type: 'registry:example',
    registryDependencies: ['toast', 'button', 'view'],
    files: [
      {
        path: 'registry/demo/toast/toast-compact.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-31-55_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-31-55_1.MP4',
    },
  },
};
