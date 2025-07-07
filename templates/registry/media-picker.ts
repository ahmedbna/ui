// Registry configuration for media-picker component and demo

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
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/media-picker.tsx',
        target: 'components/ui/media-picker.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-03-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-03-09_1.MP4',
    },
  },

  // Default demo
  'media-picker-demo': {
    name: 'media-picker-demo',
    description: 'A basic media picker with image and video selection',
    type: 'registry:example',
    registryDependencies: ['media-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/media-picker/media-picker-demo.tsx',
        target: 'components/demo/media-picker/media-picker-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-03-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-03-09_1.MP4',
    },
  },

  // Images only example
  'media-picker-images': {
    name: 'media-picker-images',
    description: 'Media picker configured for images only',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/media-picker/media-picker-images.tsx',
        target: 'components/demo/media-picker/media-picker-images.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-03-48_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-03-48_1.MP4',
    },
  },

  // Videos only example
  'media-picker-videos': {
    name: 'media-picker-videos',
    description: 'Media picker configured for videos only',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/media-picker/media-picker-videos.tsx',
        target: 'components/demo/media-picker/media-picker-videos.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-04-18_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-04-18_1.MP4',
    },
  },

  // Multiple selection example
  'media-picker-multiple': {
    name: 'media-picker-multiple',
    description: 'Media picker with multiple selection enabled',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/media-picker/media-picker-multiple.tsx',
        target: 'components/demo/media-picker/media-picker-multiple.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-04-38_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-04-38_1.MP4',
    },
  },

  // Gallery example
  'media-picker-gallery': {
    name: 'media-picker-gallery',
    description: 'Media picker with custom gallery modal',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/media-picker/media-picker-gallery.tsx',
        target: 'components/demo/media-picker/media-picker-gallery.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-06-49_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-06-49_1.MP4',
    },
  },

  // Preview example
  'media-picker-preview': {
    name: 'media-picker-preview',
    description: 'Media picker showing selected media previews',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/media-picker/media-picker-preview.tsx',
        target: 'components/demo/media-picker/media-picker-preview.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-09-39_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-09-39_1.MP4',
    },
  },

  // Quality settings example
  'media-picker-quality': {
    name: 'media-picker-quality',
    description: 'Media picker with different quality settings',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['media-picker', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/media-picker/media-picker-quality.tsx',
        target: 'components/demo/media-picker/media-picker-quality.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-10-12_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-10-12_1.MP4',
    },
  },
};
