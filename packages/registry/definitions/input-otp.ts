// Registry configuration for input-otp component and demo

export const inputOtpRegistry = {
  // Main input-otp component
  'input-otp': {
    name: 'input-otp',
    description:
      'A secure input component for one-time passwords and verification codes.',
    type: 'registry:ui',
    registryDependencies: ['text'],
    hooks: ['useColor', 'useHaptics'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/input-otp.tsx',
        target: 'components/ui/input-otp.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0167-input-otp-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0167-input-otp-demo.MP4',
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
        path: 'src/demo/input-otp/input-otp-demo.tsx',
        target: 'components/demo/input-otp/input-otp-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0167-input-otp-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0167-input-otp-demo.MP4',
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
        path: 'src/demo/input-otp/input-otp-lengths.tsx',
        target: 'components/demo/input-otp/input-otp-lengths.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0168-input-otp-lengths.MP4',
      dark: 'https://demo.ahmedbna.com/0168-input-otp-lengths.MP4',
    },
  },

  // Separator example
  'input-otp-separator': {
    name: 'input-otp-separator',
    description: 'OTP input with dash separators between digits',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input-otp/input-otp-separator.tsx',
        target: 'components/demo/input-otp/input-otp-separator.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0169-input-otp-separator.MP4',
      dark: 'https://demo.ahmedbna.com/0169-input-otp-separator.MP4',
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
        path: 'src/demo/input-otp/input-otp-masked.tsx',
        target: 'components/demo/input-otp/input-otp-masked.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0170-input-otp-masked.MP4',
      dark: 'https://demo.ahmedbna.com/0170-input-otp-masked.MP4',
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
        path: 'src/demo/input-otp/input-otp-error.tsx',
        target: 'components/demo/input-otp/input-otp-error.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0171-input-otp-error.MP4',
      dark: 'https://demo.ahmedbna.com/0171-input-otp-error.MP4',
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
        path: 'src/demo/input-otp/input-otp-disabled.tsx',
        target: 'components/demo/input-otp/input-otp-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0172-input-otp-disabled.MP4',
      dark: 'https://demo.ahmedbna.com/0172-input-otp-disabled.MP4',
    },
  },

  'input-otp-styled': {
    name: 'input-otp-styled',
    description: 'OTP input with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['input-otp', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/input-otp/input-otp-styled.tsx',
        target: 'components/demo/input-otp/input-otp-styled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0173-input-otp-styled.MP4',
      dark: 'https://demo.ahmedbna.com/0173-input-otp-styled.MP4',
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
        path: 'src/demo/input-otp/input-otp-no-cursor.tsx',
        target: 'components/demo/input-otp/input-otp-no-cursor.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0174-input-otp-no-cursor.MP4',
      dark: 'https://demo.ahmedbna.com/0174-input-otp-no-cursor.MP4',
    },
  },
};
