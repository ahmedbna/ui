// Registry configuration for gallery component and demo

export const galleryRegistry = {
  // Main gallery component
  gallery: {
    name: 'gallery',
    description:
      'A responsive image gallery component with fullscreen viewing, zoom, and gesture support.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native', 'expo-document-picker'],
    registryDependencies: ['button', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/gallery.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-26-55_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-26-55_1.MP4',
    },
  },

  // Default demo
  'gallery-demo': {
    name: 'gallery-demo',
    description:
      'A basic image gallery with grid layout and fullscreen viewing',
    type: 'registry:example',
    registryDependencies: ['gallery'],
    files: [
      {
        path: 'registry/demo/gallery/gallery-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-26-55_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-26-55_1.MP4',
    },
  },

  'gallery-grid': {
    name: 'gallery-grid',
    description: 'Gallery with custom columns, spacing, and aspect ratio',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/demo/gallery/gallery-grid.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-51-01_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-51-01_1.MP4',
    },
  },

  'gallery-info': {
    name: 'gallery-info',
    description: 'Gallery displaying image titles and descriptions',
    type: 'registry:example',
    registryDependencies: ['gallery'],
    files: [
      {
        path: 'registry/demo/gallery/gallery-info.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-51-28_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-51-28_1.MP4',
    },
  },

  'gallery-layouts': {
    name: 'gallery-layouts',
    description: 'Various gallery layouts and configurations',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/demo/gallery/gallery-layouts.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-51-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-51-52_1.MP4',
    },
  },

  'gallery-controls': {
    name: 'gallery-controls',
    description: 'Images with controls',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/demo/gallery/gallery-controls.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-52-16_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-52-16_1.MP4',
    },
  },

  'gallery-overlay': {
    name: 'gallery-overlay',
    description: 'Images with overlay',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/demo/gallery/gallery-overlay.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-52-53_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 02-52-53_1.MP4',
    },
  },
};
