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
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/image.tsx',
        target: 'components/ui/image.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5575.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5575.PNG',
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
        path: 'templates/demo/image/image-demo.tsx',
        target: 'components/demo/image/image-demo.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5575.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5575.PNG',
    },
  },

  // Variants example
  'image-variants': {
    name: 'image-variants',
    description: 'Images with different border radius variants',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/image/image-variants.tsx',
        target: 'components/demo/image/image-variants.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5576.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5576.PNG',
    },
  },

  // Sizes example
  'image-sizes': {
    name: 'image-sizes',
    description: 'Images in different sizes and aspect ratios',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/image/image-sizes.tsx',
        target: 'components/demo/image/image-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5577.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5577.PNG',
    },
  },

  // Loading states example
  'image-loading': {
    name: 'image-loading',
    description: 'Images with different loading indicator configurations',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/image/image-loading.tsx',
        target: 'components/demo/image/image-loading.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 05-41-40_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 05-41-40_1.MP4',
    },
  },

  'image-error': {
    name: 'image-error',
    description: 'Images with custom error fallback messages',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/image/image-error.tsx',
        target: 'components/demo/image/image-error.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5581.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5581.PNG',
    },
  },

  'image-gallery': {
    name: 'image-gallery',
    description: 'Multiple images arranged in a gallery layout',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/image/image-gallery.tsx',
        target: 'components/demo/image/image-gallery.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5584.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5584.PNG',
    },
  },

  'image-responsive': {
    name: 'image-responsive',
    description: 'Responsive images that adapt to container size',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/image/image-responsive.tsx',
        target: 'components/demo/image/image-responsive.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5583.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5583.PNG',
    },
  },

  'image-content-fit': {
    name: 'image-content-fit',
    description: 'Images with different content fit modes',
    type: 'registry:example',
    registryDependencies: ['image'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/image/image-content-fit.tsx',
        target: 'components/demo/image/image-content-fit.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5582.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5582.PNG',
    },
  },
};
