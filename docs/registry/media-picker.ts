// Registry configuration for media-picker component and examples

export const mediaPickerRegistry = {
  // Main media-picker component
  'media-picker': {
    name: 'media-picker',
    description:
      'A versatile component for selecting images and videos from device gallery or camera with preview capabilities.',
    type: 'registry:ui',
    dependencies: [
      'expo-image',
      'expo-image-picker',
      'expo-media-library',
      'lucide-react-native',
    ],
    registryDependencies: ['button', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/media-picker.tsx',
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
  'media-picker-demo': {
    name: 'media-picker-demo',
    description: 'A basic media picker with image and video selection',
    type: 'registry:example',
    registryDependencies: ['media-picker'],
    files: [
      {
        path: 'registry/examples/media-picker/media-picker-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Images only example
  'media-picker-images': {
    name: 'media-picker-images',
    description: 'Media picker configured for images only',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker'],
    files: [
      {
        path: 'registry/examples/media-picker/media-picker-images.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Videos only example
  'media-picker-videos': {
    name: 'media-picker-videos',
    description: 'Media picker configured for videos only',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker'],
    files: [
      {
        path: 'registry/examples/media-picker/media-picker-videos.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Multiple selection example
  'media-picker-multiple': {
    name: 'media-picker-multiple',
    description: 'Media picker with multiple selection enabled',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/media-picker/media-picker-multiple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Gallery example
  'media-picker-gallery': {
    name: 'media-picker-gallery',
    description: 'Media picker with custom gallery modal',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker'],
    files: [
      {
        path: 'registry/examples/media-picker/media-picker-gallery.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Preview example
  'media-picker-preview': {
    name: 'media-picker-preview',
    description: 'Media picker showing selected media previews',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/media-picker/media-picker-preview.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Quality settings example
  'media-picker-quality': {
    name: 'media-picker-quality',
    description: 'Media picker with different quality settings',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/media-picker/media-picker-quality.tsx',
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
