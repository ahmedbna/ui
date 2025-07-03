// Registry configuration for spinner component and demo

export const spinnerRegistry = {
  // Main spinner component
  spinner: {
    name: 'spinner',
    description:
      'A loading indicator component with multiple variants and customization options.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/spinner.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-46-27_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-46-27_1.MP4',
    },
  },

  // Default demo
  'spinner-demo': {
    name: 'spinner-demo',
    description: 'A basic spinner with default styling',
    type: 'registry:example',
    registryDependencies: ['spinner'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-46-27_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-46-27_1.MP4',
    },
  },

  // Variants example
  'spinner-variants': {
    name: 'spinner-variants',
    description:
      'Different spinner variants: default, circle, dots, pulse, and bars',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-46-44_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-46-44_1.MP4',
    },
  },

  // Sizes example
  'spinner-sizes': {
    name: 'spinner-sizes',
    description: 'Spinners in different sizes: sm, default, lg, and icon',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-sizes.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-48-11_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-48-11_1.MP4',
    },
  },

  // Labels example
  'spinner-labels': {
    name: 'spinner-labels',
    description: 'Spinners with custom loading labels',
    type: 'registry:example',
    registryDependencies: ['spinner', 'view'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-labels.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-48-31_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-48-31_1.MP4',
    },
  },

  // Speeds example
  'spinner-speeds': {
    name: 'spinner-speeds',
    description:
      'Spinners with different animation speeds: slow, normal, and fast',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-speeds.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-48-46_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-48-46_1.MP4',
    },
  },

  // Colors example
  'spinner-colors': {
    name: 'spinner-colors',
    description: 'Spinners with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-colors.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-49-03_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-49-03_1.MP4',
    },
  },

  // Overlay example
  'spinner-overlay': {
    name: 'spinner-overlay',
    description: 'Full-screen loading overlay with backdrop',
    type: 'registry:example',
    registryDependencies: ['spinner', 'button', 'view'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-overlay.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-49-33_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-49-33_1.MP4',
    },
  },

  // Inline example
  'spinner-inline': {
    name: 'spinner-inline',
    description: 'Small spinners for inline usage in buttons or text',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/spinner/spinner-inline.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-49-18_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-49-18_1.MP4',
    },
  },
};
