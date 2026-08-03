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
    registryDependencies: ['view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/carousel.tsx',
        target: 'components/ui/carousel.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0097-carousel-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0097-carousel-demo.MP4',
    },
  },

  // Default demo
  'carousel-demo': {
    name: 'carousel-demo',
    description: 'A basic carousel with auto-play and indicators',
    type: 'registry:example',
    registryDependencies: ['carousel', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/carousel/carousel-demo.tsx',
        target: 'components/demo/carousel/carousel-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0097-carousel-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0097-carousel-demo.MP4',
    },
  },

  // Arrows example
  'carousel-arrows': {
    name: 'carousel-arrows',
    description: 'Carousel with navigation arrows and indicators',
    type: 'registry:example',
    registryDependencies: ['carousel', 'icon', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/carousel/carousel-arrows.tsx',
        target: 'components/demo/carousel/carousel-arrows.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0098-carousel-arrows.MP4',
      dark: 'https://ui.ahmedbna.com/0098-carousel-arrows.MP4',
    },
  },

  // Custom width example
  'carousel-custom-width': {
    name: 'carousel-custom-width',
    description: 'Carousel with custom item width and spacing',
    type: 'registry:example',
    registryDependencies: ['carousel', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/carousel/carousel-custom-width.tsx',
        target: 'components/demo/carousel/carousel-custom-width.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0099-carousel-custom-width.MP4',
      dark: 'https://ui.ahmedbna.com/0099-carousel-custom-width.MP4',
    },
  },

  // Images example
  'carousel-images': {
    name: 'carousel-images',
    description: 'Image carousel with auto-play and loop',
    type: 'registry:example',
    registryDependencies: ['carousel', 'text', 'view'],
    dependencies: ['expo-image'],
    hooks: [],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/carousel/carousel-images.tsx',
        target: 'components/demo/carousel/carousel-images.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0100-carousel-images.MP4',
      dark: 'https://ui.ahmedbna.com/0100-carousel-images.MP4',
    },
  },

  // Cards example
  'carousel-cards': {
    name: 'carousel-cards',
    description: 'Card-based carousel with custom content',
    type: 'registry:example',
    registryDependencies: ['carousel', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/carousel/carousel-cards.tsx',
        target: 'components/demo/carousel/carousel-cards.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0101-carousel-cards.MP4',
      dark: 'https://ui.ahmedbna.com/0101-carousel-cards.MP4',
    },
  },

  // No indicators example
  'carousel-no-indicators': {
    name: 'carousel-no-indicators',
    description: 'Carousel without indicators, arrows only',
    type: 'registry:example',
    registryDependencies: ['carousel', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/carousel/carousel-no-indicators.tsx',
        target: 'components/demo/carousel/carousel-no-indicators.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0102-carousel-no-indicators.MP4',
      dark: 'https://ui.ahmedbna.com/0102-carousel-no-indicators.MP4',
    },
  },

  // Manual control example
  'carousel-manual': {
    name: 'carousel-manual',
    description: 'Manually controlled carousel with external buttons',
    type: 'registry:example',
    registryDependencies: ['carousel', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/carousel/carousel-manual.tsx',
        target: 'components/demo/carousel/carousel-manual.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0103-carousel-manual.MP4',
      dark: 'https://ui.ahmedbna.com/0103-carousel-manual.MP4',
    },
  },
};
