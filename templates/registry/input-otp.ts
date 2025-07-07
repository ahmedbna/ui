// Registry configuration for input-otp component and demo

export const inputOtpRegistry = {
  // Main input-otp component
  'input-otp': {
    name: 'input-otp',
    description:
      'A secure input component for one-time passwords and verification codes.',
    type: 'registry:ui',
    registryDependencies: ['text'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/input-otp.tsx',
        target: 'components/ui/input-otp.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-34-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-34-14_1.MP4',
    },
  },

  // Default demo
  'input-otp-demo': {
    name: 'input-otp-demo',
    description: 'A basic OTP input with 6 digits',
    type: 'registry:example',
    registryDependencies: ['input-otp'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-demo.tsx',
        target: 'components/demo/input-otp/input-otp-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-34-14_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-34-14_1.MP4',
    },
  },

  // Lengths example
  'input-otp-lengths': {
    name: 'input-otp-lengths',
    description: 'OTP inputs with different digit lengths',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-lengths.tsx',
        target: 'components/demo/input-otp/input-otp-lengths.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-34-50_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-34-50_1.MP4',
    },
  },

  // Separator example
  'input-otp-separator': {
    name: 'input-otp-separator',
    description: 'OTP input with dash separators between digits',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-separator.tsx',
        target: 'components/demo/input-otp/input-otp-separator.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-35-54_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-35-54_1.MP4',
    },
  },

  'input-otp-masked': {
    name: 'input-otp-masked',
    description: 'OTP input that masks digits with dots for security',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-masked.tsx',
        target: 'components/demo/input-otp/input-otp-masked.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-36-27_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-36-27_1.MP4',
    },
  },

  'input-otp-error': {
    name: 'input-otp-error',
    description: 'OTP input showing error state with validation message',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-error.tsx',
        target: 'components/demo/input-otp/input-otp-error.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-37-25_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-37-25_1.MP4',
    },
  },

  'input-otp-disabled': {
    name: 'input-otp-disabled',
    description: 'OTP input in disabled state',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-disabled.tsx',
        target: 'components/demo/input-otp/input-otp-disabled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-37-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-37-52_1.MP4',
    },
  },

  'input-otp-styled': {
    name: 'input-otp-styled',
    description: 'OTP input with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-styled.tsx',
        target: 'components/demo/input-otp/input-otp-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-38-18_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-38-18_1.MP4',
    },
  },

  'input-otp-no-cursor': {
    name: 'input-otp-no-cursor',
    description: 'OTP input without the blinking cursor indicator',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/input-otp/input-otp-no-cursor.tsx',
        target: 'components/demo/input-otp/input-otp-no-cursor.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-39-08_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-39-08_1.MP4',
    },
  },
};
