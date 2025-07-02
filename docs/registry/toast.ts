// Registry configuration for toast component and examples

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
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastPreview.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastPreviewDark.mp4',
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
        path: 'registry/examples/toast/toast-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastDemo.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastDemoDark.mp4',
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
        path: 'registry/examples/toast/toast-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastVariants.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastVariantsDark.mp4',
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
        path: 'registry/examples/toast/toast-actions.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastActions.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastActionsDark.mp4',
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
        path: 'registry/examples/toast/toast-duration.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastDuration.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastDurationDark.mp4',
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
        path: 'registry/examples/toast/toast-multiple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastMultiple.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastMultipleDark.mp4',
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
        path: 'registry/examples/toast/toast-compact.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastCompact.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ToastCompactDark.mp4',
    },
  },
};
