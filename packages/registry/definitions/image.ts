// Registry configuration for image component and demo

export const imageRegistry = {
  // Main image component
  image: {
    name: 'image',
    description:
      'A responsive image component with loading states, error handling, and flexible styling options.',
    type: 'registry:ui',
    dependencies: ['expo-image'],
    registryDependencies: ['text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/image.tsx',
        target: 'components/ui/image.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0159-image-demo.PNG',
      dark: 'https://ui.ahmedbna.com/0159-image-demo.PNG',
    },
  },

  // Default demo
  'image-demo': {
    name: 'image-demo',
    description: 'A basic image with loading indicator and error fallback',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-demo.tsx',
        target: 'components/demo/image/image-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0159-image-demo.PNG',
      dark: 'https://ui.ahmedbna.com/0159-image-demo.PNG',
    },
  },

  // Variants example
  'image-variants': {
    name: 'image-variants',
    description: 'Images with different border radius variants',
    type: 'registry:example',
    registryDependencies: ['image', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-variants.tsx',
        target: 'components/demo/image/image-variants.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0160-image-variants.PNG',
      dark: 'https://ui.ahmedbna.com/0160-image-variants.PNG',
    },
  },

  // Sizes example
  'image-sizes': {
    name: 'image-sizes',
    description: 'Images in different sizes and aspect ratios',
    type: 'registry:example',
    registryDependencies: ['image', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-sizes.tsx',
        target: 'components/demo/image/image-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0161-image-sizes.PNG',
      dark: 'https://ui.ahmedbna.com/0161-image-sizes.PNG',
    },
  },

  // Loading states example
  'image-loading': {
    name: 'image-loading',
    description: 'Images with different loading indicator configurations',
    type: 'registry:example',
    registryDependencies: ['image', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-loading.tsx',
        target: 'components/demo/image/image-loading.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0162-image-loading.MP4',
      dark: 'https://ui.ahmedbna.com/0162-image-loading.MP4',
    },
  },

  'image-error': {
    name: 'image-error',
    description: 'Images with custom error fallback messages',
    type: 'registry:example',
    registryDependencies: ['image', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-error.tsx',
        target: 'components/demo/image/image-error.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0163-image-error.PNG',
      dark: 'https://ui.ahmedbna.com/0163-image-error.PNG',
    },
  },

  'image-gallery': {
    name: 'image-gallery',
    description: 'Multiple images arranged in a gallery layout',
    type: 'registry:example',
    registryDependencies: ['image', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-gallery.tsx',
        target: 'components/demo/image/image-gallery.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0164-image-gallery.PNG',
      dark: 'https://ui.ahmedbna.com/0164-image-gallery.PNG',
    },
  },

  'image-responsive': {
    name: 'image-responsive',
    description: 'Responsive images that adapt to container size',
    type: 'registry:example',
    registryDependencies: ['image', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-responsive.tsx',
        target: 'components/demo/image/image-responsive.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0165-image-responsive.PNG',
      dark: 'https://ui.ahmedbna.com/0165-image-responsive.PNG',
    },
  },

  'image-content-fit': {
    name: 'image-content-fit',
    description: 'Images with different content fit modes',
    type: 'registry:example',
    registryDependencies: ['image', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/image/image-content-fit.tsx',
        target: 'components/demo/image/image-content-fit.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0166-image-content-fit.PNG',
      dark: 'https://ui.ahmedbna.com/0166-image-content-fit.PNG',
    },
  },
};
