// Registry configuration for gallery component and demo

export const galleryRegistry = {
  // Main gallery component
  gallery: {
    name: 'gallery',
    description:
      'A responsive image gallery component with fullscreen viewing, zoom, and gesture support.',
    type: 'registry:ui',
    dependencies: [
      'expo-image',
      'lucide-react-native',
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-worklets',
      'react-native-safe-area-context',
    ],
    registryDependencies: ['button', 'text'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/gallery.tsx',
        target: 'components/ui/gallery.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0145-gallery-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0145-gallery-demo.MP4',
    },
  },

  // Default demo
  'gallery-demo': {
    name: 'gallery-demo',
    description:
      'A basic image gallery with grid layout and fullscreen viewing',
    type: 'registry:example',
    registryDependencies: ['gallery'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/gallery/gallery-demo.tsx',
        target: 'components/demo/gallery/gallery-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0145-gallery-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0145-gallery-demo.MP4',
    },
  },

  'gallery-grid': {
    name: 'gallery-grid',
    description: 'Gallery with custom columns, spacing, and aspect ratio',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text', 'scroll-view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/gallery/gallery-grid.tsx',
        target: 'components/demo/gallery/gallery-grid.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0146-gallery-grid.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0146-gallery-grid.MP4',
    },
  },

  'gallery-info': {
    name: 'gallery-info',
    description: 'Gallery displaying image titles and descriptions',
    type: 'registry:example',
    registryDependencies: ['gallery'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/gallery/gallery-info.tsx',
        target: 'components/demo/gallery/gallery-info.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0147-gallery-info.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0147-gallery-info.MP4',
    },
  },

  'gallery-layouts': {
    name: 'gallery-layouts',
    description: 'Various gallery layouts and configurations',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text', 'scroll-view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/gallery/gallery-layouts.tsx',
        target: 'components/demo/gallery/gallery-layouts.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0148-gallery-layouts.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0148-gallery-layouts.MP4',
    },
  },

  'gallery-controls': {
    name: 'gallery-controls',
    description: 'Images with controls',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/gallery/gallery-controls.tsx',
        target: 'components/demo/gallery/gallery-controls.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0149-gallery-controls.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0149-gallery-controls.MP4',
    },
  },

  'gallery-overlay': {
    name: 'gallery-overlay',
    description: 'Images with overlay',
    type: 'registry:example',
    registryDependencies: ['gallery', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/gallery/gallery-overlay.tsx',
        target: 'components/demo/gallery/gallery-overlay.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0150-gallery-overlay.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0150-gallery-overlay.MP4',
    },
  },
};
