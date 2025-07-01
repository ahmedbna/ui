// Registry configuration for gallery component and examples

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
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerPreview.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerPreview.mp4',
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
        path: 'registry/examples/gallery/gallery-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDemo.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDemo.mp4',
    },
  },

  'gallery-grid': {
    name: 'gallery-grid',
    description: 'Gallery with custom columns, spacing, and aspect ratio',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/gallery/gallery-grid.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerTime.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerTime.mp4',
    },
  },

  'gallery-info': {
    name: 'gallery-info',
    description: 'Gallery displaying image titles and descriptions',
    type: 'registry:example',
    registryDependencies: ['gallery'],
    files: [
      {
        path: 'registry/examples/gallery/gallery-info.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDateTime.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerDateTime.mp4',
    },
  },

  'gallery-layouts': {
    name: 'gallery-layouts',
    description: 'Various gallery layouts and configurations',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/gallery/gallery-layouts.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
    },
  },

  'gallery-controls': {
    name: 'gallery-controls',
    description: 'Images with controls',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/gallery/gallery-controls.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
    },
  },

  'gallery-overlays': {
    name: 'gallery-overlays',
    description: 'Images with overlays',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    files: [
      {
        path: 'registry/examples/gallery/gallery-overlays.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DatePickerConstraints.mp4',
    },
  },
};
