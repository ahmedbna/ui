// docs/registry/button.ts
// Registry configuration for button component and demo

export const buttonRegistry = {
  // Main button component
  button: {
    name: 'button',
    description:
      'A versatile button component with multiple variants, sizes, and interactive animations.',
    type: 'registry:ui',
    dependencies: [
      // expo-haptics is not listed here: button reaches it through the
      // useHaptics hook, which declares it. The closure flattens it back into
      // this payload's dependencies.
      'lucide-react-native',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['text', 'icon', 'spinner'],
    hooks: ['useColor', 'useHaptics'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/button.tsx',
        target: 'components/ui/button.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0073-button-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0073-button-demo.MP4',
    },
  },

  // Default demo
  'button-demo': {
    name: 'button-demo',
    description: 'A basic button with default styling',
    type: 'registry:example',
    registryDependencies: ['button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-demo.tsx',
        target: 'components/demo/button/button-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0073-button-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0073-button-demo.MP4',
    },
  },

  // Variants example
  'button-variants': {
    name: 'button-variants',
    description: 'Buttons with different visual styles',
    type: 'registry:example',
    registryDependencies: ['button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-variants.tsx',
        target: 'components/demo/button/button-variants.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0074-button-variants.MP4',
      dark: 'https://demo.ahmedbna.com/0074-button-variants.MP4',
    },
  },

  // Sizes example
  'button-sizes': {
    name: 'button-sizes',
    description: 'Buttons in different sizes',
    type: 'registry:example',
    registryDependencies: ['button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-sizes.tsx',
        target: 'components/demo/button/button-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0075-button-sizes.MP4',
      dark: 'https://demo.ahmedbna.com/0075-button-sizes.MP4',
    },
  },

  // Icons example
  'button-with-icons': {
    name: 'button-with-icons',
    description: 'Buttons with leading icons',
    type: 'registry:example',
    registryDependencies: ['button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-with-icons.tsx',
        target: 'components/demo/button/button-with-icons.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0076-button-with-icons.MP4',
      dark: 'https://demo.ahmedbna.com/0076-button-with-icons.MP4',
    },
  },

  // Icon only example
  'button-icon-only': {
    name: 'button-icon-only',
    description: 'Icon-only buttons for compact layouts',
    type: 'registry:example',
    registryDependencies: ['button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-icon-only.tsx',
        target: 'components/demo/button/button-icon-only.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0077-button-icon-only.MP4',
      dark: 'https://demo.ahmedbna.com/0077-button-icon-only.MP4',
    },
  },

  // Loading example
  'button-loading': {
    name: 'button-loading',
    description: 'Buttons with loading spinners',
    type: 'registry:example',
    registryDependencies: ['button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-loading.tsx',
        target: 'components/demo/button/button-loading.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0078-button-loading.MP4',
      dark: 'https://demo.ahmedbna.com/0078-button-loading.MP4',
    },
  },

  // Disabled example
  'button-disabled': {
    name: 'button-disabled',
    description: 'Buttons in disabled state',
    type: 'registry:example',
    registryDependencies: ['button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-disabled.tsx',
        target: 'components/demo/button/button-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0079-button-disabled.MP4',
      dark: 'https://demo.ahmedbna.com/0079-button-disabled.MP4',
    },
  },

  // Custom styling example
  'button-custom': {
    name: 'button-custom',
    description: 'Buttons with custom colors and styles',
    type: 'registry:example',
    registryDependencies: ['button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-custom.tsx',
        target: 'components/demo/button/button-custom.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0080-button-custom.MP4',
      dark: 'https://demo.ahmedbna.com/0080-button-custom.MP4',
    },
  },

  // Animation example
  'button-animation': {
    name: 'button-animation',
    description: 'Buttons with and without animations',
    type: 'registry:example',
    registryDependencies: ['button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/button/button-animation.tsx',
        target: 'components/demo/button/button-animation.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0081-button-animation.MP4',
      dark: 'https://demo.ahmedbna.com/0081-button-animation.MP4',
    },
  },
};
