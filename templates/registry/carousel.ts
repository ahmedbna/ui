// Registry configuration for carousel component and demo

export const carouselRegistry = {
  // Main carousel component
  carousel: {
    name: 'carousel',
    description:
      'A flexible carousel component with support for auto-play, indicators, arrows, and custom layouts.',
    type: 'registry:ui',
    dependencies: [
      'expo-blur',
      'lucide-react-native',
      'react-native-gesture-handler',
    ],
    registryDependencies: ['text'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/carousel.tsx',
        target: 'components/ui/carousel.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-11-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-11-52_1.MP4',
    },
  },

  // Default demo
  'carousel-demo': {
    name: 'carousel-demo',
    description: 'A basic carousel with auto-play and indicators',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/carousel/carousel-demo.tsx',
        target: 'components/demo/carousel/carousel-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-11-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-11-52_1.MP4',
    },
  },

  // Arrows example
  'carousel-arrows': {
    name: 'carousel-arrows',
    description: 'Carousel with navigation arrows and indicators',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/carousel/carousel-arrows.tsx',
        target: 'components/demo/carousel/carousel-arrows.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-12-15_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-12-15_1.MP4',
    },
  },

  // Custom width example
  'carousel-custom-width': {
    name: 'carousel-custom-width',
    description: 'Carousel with custom item width and spacing',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/carousel/carousel-custom-width.tsx',
        target: 'components/demo/carousel/carousel-custom-width.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-12-37_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-12-37_1.MP4',
    },
  },

  // Images example
  'carousel-images': {
    name: 'carousel-images',
    description: 'Image carousel with auto-play and loop',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    dependencies: ['expo-image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/carousel/carousel-images.tsx',
        target: 'components/demo/carousel/carousel-images.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-13-20_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-13-20_1.MP4',
    },
  },

  // Cards example
  'carousel-cards': {
    name: 'carousel-cards',
    description: 'Card-based carousel with custom content',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/carousel/carousel-cards.tsx',
        target: 'components/demo/carousel/carousel-cards.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-13-45_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-13-45_1.MP4',
    },
  },

  // No indicators example
  'carousel-no-indicators': {
    name: 'carousel-no-indicators',
    description: 'Carousel without indicators, arrows only',
    type: 'registry:example',
    registryDependencies: ['carousel'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/carousel/carousel-no-indicators.tsx',
        target: 'components/demo/carousel/carousel-no-indicators.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-03_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-03_1.MP4',
    },
  },

  // Manual control example
  'carousel-manual': {
    name: 'carousel-manual',
    description: 'Manually controlled carousel with external buttons',
    type: 'registry:example',
    registryDependencies: ['carousel', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/carousel/carousel-manual.tsx',
        target: 'components/demo/carousel/carousel-manual.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-20_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-14-20_1.MP4',
    },
  },
};
