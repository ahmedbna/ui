// Registry configuration for onboarding component and examples

export const onboardingRegistry = {
  // Main onboarding component
  onboarding: {
    name: 'onboarding',
    description:
      'A customizable multi-step onboarding flow with smooth animations and gesture support.',
    type: 'registry:ui',
    dependencies: ['react-native-gesture-handler', 'react-native-reanimated'],
    registryDependencies: ['button', 'text'],
    files: [
      {
        path: 'registry/components/ui/onboarding.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Default demo
  'onboarding-demo': {
    name: 'onboarding-demo',
    description: 'A basic onboarding flow with multiple steps',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    files: [
      {
        path: 'registry/examples/onboarding/onboarding-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Images example
  'onboarding-images': {
    name: 'onboarding-images',
    description: 'Onboarding flow with custom images for each step',
    type: 'registry:example',
    registryDependencies: ['onboarding', 'image'],
    files: [
      {
        path: 'registry/examples/onboarding/onboarding-images.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'onboarding-styled': {
    name: 'onboarding-styled',
    description: 'Onboarding with custom colors and styling',
    type: 'registry:example',
    dependencies: ['lucide-react-native', 'expo-linear-gradient'],
    registryDependencies: ['onboarding'],
    files: [
      {
        path: 'registry/examples/onboarding/onboarding-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'onboarding-no-skip': {
    name: 'onboarding-no-skip',
    description: 'Onboarding flow without skip functionality',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    files: [
      {
        path: 'registry/examples/onboarding/onboarding-no-skip.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'onboarding-no-swipe': {
    name: 'onboarding-no-swipe',
    description: 'Onboarding with swipe gestures disabled',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    files: [
      {
        path: 'registry/examples/onboarding/onboarding-no-swipe.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'onboarding-custom-buttons': {
    name: 'onboarding-custom-buttons',
    description: 'Onboarding with custom button text',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding'],
    files: [
      {
        path: 'registry/examples/onboarding/onboarding-custom-buttons.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'onboarding-hook': {
    name: 'onboarding-hook',
    description: 'Media picker showing selected media previews',
    type: 'registry:example',
    registryDependencies: ['onboarding', 'view', 'text', 'button'],
    files: [
      {
        path: 'registry/examples/onboarding/onboarding-hook.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
