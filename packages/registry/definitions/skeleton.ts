// Registry configuration for skeleton component and demo

export const skeletonRegistry = {
  // Main skeleton component
  skeleton: {
    name: 'skeleton',
    description:
      'A placeholder component to show a loading state while content is being fetched.',
    type: 'registry:ui',
    dependencies: ['react-native-reanimated'],
    registryDependencies: [],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/skeleton.tsx',
        target: 'components/ui/skeleton.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0273-skeleton-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0273-skeleton-demo.MP4',
    },
  },

  // Default demo
  'skeleton-demo': {
    name: 'skeleton-demo',
    description: 'A basic skeleton loader with pulsing animation',
    type: 'registry:example',
    registryDependencies: ['skeleton'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/skeleton/skeleton-demo.tsx',
        target: 'components/demo/skeleton/skeleton-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0273-skeleton-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0273-skeleton-demo.MP4',
    },
  },

  // Sizes example
  'skeleton-sizes': {
    name: 'skeleton-sizes',
    description: 'Skeletons in various sizes and dimensions',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/skeleton/skeleton-sizes.tsx',
        target: 'components/demo/skeleton/skeleton-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0274-skeleton-sizes.MP4',
      dark: 'https://demo.ahmedbna.com/0274-skeleton-sizes.MP4',
    },
  },

  'skeleton-card': {
    name: 'skeleton-card',
    description: 'Skeleton placeholders arranged in a card layout',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/skeleton/skeleton-card.tsx',
        target: 'components/demo/skeleton/skeleton-card.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0275-skeleton-card.MP4',
      dark: 'https://demo.ahmedbna.com/0275-skeleton-card.MP4',
    },
  },

  'skeleton-profile': {
    name: 'skeleton-profile',
    description: 'Skeleton layout mimicking a user profile',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/skeleton/skeleton-profile.tsx',
        target: 'components/demo/skeleton/skeleton-profile.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0276-skeleton-profile.MP4',
      dark: 'https://demo.ahmedbna.com/0276-skeleton-profile.MP4',
    },
  },

  'skeleton-list': {
    name: 'skeleton-list',
    description: 'Multiple skeleton items arranged in a list',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/skeleton/skeleton-list.tsx',
        target: 'components/demo/skeleton/skeleton-list.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0277-skeleton-list.MP4',
      dark: 'https://demo.ahmedbna.com/0277-skeleton-list.MP4',
    },
  },

  'skeleton-shapes': {
    name: 'skeleton-shapes',
    description: 'Skeletons with custom shapes and styling',
    type: 'registry:example',
    registryDependencies: ['skeleton', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/skeleton/skeleton-shapes.tsx',
        target: 'components/demo/skeleton/skeleton-shapes.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0278-skeleton-shapes.MP4',
      dark: 'https://demo.ahmedbna.com/0278-skeleton-shapes.MP4',
    },
  },
};
