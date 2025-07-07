// Registry configuration for onboarding component and demo

export const onboardingRegistry = {
  // Main onboarding component
  onboarding: {
    name: 'onboarding',
    description:
      'A customizable multi-step onboarding flow with smooth animations and gesture support.',
    type: 'registry:ui',
    dependencies: ['react-native-gesture-handler', 'react-native-reanimated'],
    registryDependencies: ['button', 'text'],
    hooks: ['useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/onboarding.tsx',
        target: 'components/ui/onboarding.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-20-37_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-20-37_1.MP4',
    },
  },

  // Default demo
  'onboarding-demo': {
    name: 'onboarding-demo',
    description: 'A basic onboarding flow with multiple steps',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/onboarding/onboarding-demo.tsx',
        target: 'components/demo/onboarding/onboarding-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-20-37_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-20-37_1.MP4',
    },
  },

  // Images example
  'onboarding-images': {
    name: 'onboarding-images',
    description: 'Onboarding flow with custom images for each step',
    type: 'registry:example',
    registryDependencies: ['onboarding', 'image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/onboarding/onboarding-images.tsx',
        target: 'components/demo/onboarding/onboarding-images.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-28-45_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-28-45_1.MP4',
    },
  },

  'onboarding-styled': {
    name: 'onboarding-styled',
    description: 'Onboarding with custom colors and styling',
    type: 'registry:example',
    dependencies: ['lucide-react-native', 'expo-linear-gradient'],
    registryDependencies: ['onboarding'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/onboarding/onboarding-styled.tsx',
        target: 'components/demo/onboarding/onboarding-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-29-07_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-29-07_1.MP4',
    },
  },

  'onboarding-no-skip': {
    name: 'onboarding-no-skip',
    description: 'Onboarding flow without skip functionality',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/onboarding/onboarding-no-skip.tsx',
        target: 'components/demo/onboarding/onboarding-no-skip.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-29-26_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-29-26_1.MP4',
    },
  },

  'onboarding-no-swipe': {
    name: 'onboarding-no-swipe',
    description: 'Onboarding with swipe gestures disabled',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/onboarding/onboarding-no-swipe.tsx',
        target: 'components/demo/onboarding/onboarding-no-swipe.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-29-44_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-29-44_1.MP4',
    },
  },

  'onboarding-custom-buttons': {
    name: 'onboarding-custom-buttons',
    description: 'Onboarding with custom button text',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/onboarding/onboarding-custom-buttons.tsx',
        target: 'components/demo/onboarding/onboarding-custom-buttons.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-30-00_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-30-00_1.MP4',
    },
  },

  'onboarding-hook': {
    name: 'onboarding-hook',
    description: 'Media picker showing selected media previews',
    type: 'registry:example',
    registryDependencies: ['onboarding', 'view', 'text', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/onboarding/onboarding-hook.tsx',
        target: 'components/demo/onboarding/onboarding-hook.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-30-19_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-30-19_1.MP4',
    },
  },
};
