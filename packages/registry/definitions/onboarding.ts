// Registry configuration for onboarding component and demo

export const onboardingRegistry = {
  // Main onboarding component
  onboarding: {
    name: 'onboarding',
    description:
      'A customizable multi-step onboarding flow with smooth animations and gesture support.',
    type: 'registry:ui',
    dependencies: [
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['button', 'text'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/onboarding.tsx',
        target: 'components/ui/onboarding.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0198-onboarding-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0198-onboarding-demo.MP4',
    },
  },

  // Default demo
  'onboarding-demo': {
    name: 'onboarding-demo',
    description: 'A basic onboarding flow with multiple steps',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['onboarding', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/onboarding/onboarding-demo.tsx',
        target: 'components/demo/onboarding/onboarding-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0198-onboarding-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0198-onboarding-demo.MP4',
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
        path: 'src/demo/onboarding/onboarding-images.tsx',
        target: 'components/demo/onboarding/onboarding-images.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0199-onboarding-images.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0199-onboarding-images.MP4',
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
        path: 'src/demo/onboarding/onboarding-styled.tsx',
        target: 'components/demo/onboarding/onboarding-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0200-onboarding-styled.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0200-onboarding-styled.MP4',
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
        path: 'src/demo/onboarding/onboarding-no-skip.tsx',
        target: 'components/demo/onboarding/onboarding-no-skip.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0201-onboarding-no-skip.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0201-onboarding-no-skip.MP4',
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
        path: 'src/demo/onboarding/onboarding-no-swipe.tsx',
        target: 'components/demo/onboarding/onboarding-no-swipe.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0202-onboarding-no-swipe.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0202-onboarding-no-swipe.MP4',
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
        path: 'src/demo/onboarding/onboarding-custom-buttons.tsx',
        target: 'components/demo/onboarding/onboarding-custom-buttons.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0203-onboarding-custom-buttons.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0203-onboarding-custom-buttons.MP4',
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
        path: 'src/demo/onboarding/onboarding-hook.tsx',
        target: 'components/demo/onboarding/onboarding-hook.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0204-onboarding-hook.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0204-onboarding-hook.MP4',
    },
  },
};
