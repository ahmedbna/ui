// Registry configuration for parallax-scrollview component and demo

export const parallaxScrollViewRegistry = {
  // Main parallax-scrollview component
  'parallax-scrollview': {
    name: 'parallax-scrollview',
    description:
      'A scroll view with parallax header effect that transforms as the user scrolls.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: ['view'],
    hooks: ['useBottomTabOverflow', 'useThemeColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/parallax-scrollview.tsx',
        target: 'components/ui/parallax-scrollview.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-33-25_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-33-25_1.MP4',
    },
  },

  // Default demo
  'parallax-scrollview-demo': {
    name: 'parallax-scrollview-demo',
    description: 'A basic parallax scroll view with header image',
    type: 'registry:example',
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/parallax-scrollview/parallax-scrollview-demo.tsx',
        target:
          'components/demo/parallax-scrollview/parallax-scrollview-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-33-25_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-33-25_1.MP4',
    },
  },

  // Custom height example
  'parallax-scrollview-custom-height': {
    name: 'parallax-scrollview-custom-height',
    description: 'Parallax scroll view with custom header height',
    type: 'registry:example',
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/parallax-scrollview/parallax-scrollview-custom-height.tsx',
        target:
          'components/demo/parallax-scrollview/parallax-scrollview-custom-height.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-35-02_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-35-02_1.MP4',
    },
  },

  // Gradient example
  'parallax-scrollview-gradient': {
    name: 'parallax-scrollview-gradient',
    description: 'Parallax scroll view with gradient overlay header',
    type: 'registry:example',
    dependencies: ['expo-linear-gradient'],
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/parallax-scrollview/parallax-scrollview-gradient.tsx',
        target:
          'components/demo/parallax-scrollview/parallax-scrollview-gradient.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-37-17_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-37-17_1.MP4',
    },
  },

  // Profile example
  'parallax-scrollview-profile': {
    name: 'parallax-scrollview-profile',
    description: 'Complete profile screen using parallax scroll view',
    type: 'registry:example',
    dependencies: ['expo-linear-gradient'],
    registryDependencies: ['parallax-scrollview', 'avatar', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/parallax-scrollview/parallax-scrollview-profile.tsx',
        target:
          'components/demo/parallax-scrollview/parallax-scrollview-profile.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-43-43_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-43-43_1.MP4',
    },
  },

  // Article example
  'parallax-scrollview-article': {
    name: 'parallax-scrollview-article',
    description: 'Article layout with parallax hero image',
    type: 'registry:example',
    dependencies: ['expo-linear-gradient'],
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/parallax-scrollview/parallax-scrollview-article.tsx',
        target:
          'components/demo/parallax-scrollview/parallax-scrollview-article.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-46-19_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-46-19_1.MP4',
    },
  },

  // Product example
  'parallax-scrollview-product': {
    name: 'parallax-scrollview-product',
    description: 'Product detail screen with parallax image gallery',
    type: 'registry:example',
    registryDependencies: ['parallax-scrollview', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/parallax-scrollview/parallax-scrollview-product.tsx',
        target:
          'components/demo/parallax-scrollview/parallax-scrollview-product.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-52-50_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 08-52-50_1.MP4',
    },
  },
};
