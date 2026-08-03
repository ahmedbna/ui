// Registry configuration for camera preview component and demo

export const cameraPreviewRegistry = {
  // Main camera preview component
  'camera-preview': {
    name: 'camera-preview',
    description:
      'A comprehensive camera component with capture, preview, and media management capabilities.',
    type: 'registry:ui',
    dependencies: [
      'expo-camera',
      'expo-media-library',
      'lucide-react-native',
      'react-native-safe-area-context',
    ],
    registryDependencies: [
      'button',
      'text',
      'view',
      'image',
      'video',
      'camera',
    ],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/camera-preview.tsx',
        target: 'components/ui/camera-preview.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0082-camera-preview-demo.mov',
      dark: 'https://ui.ahmedbna.com/0082-camera-preview-demo.mov',
    },
  },

  // Default demo
  'camera-preview-demo': {
    name: 'camera-preview-demo',
    description: 'A basic camera preview with capture and save functionality',
    type: 'registry:example',
    registryDependencies: ['camera-preview'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/camera-preview/camera-preview-demo.tsx',
        target: 'components/demo/camera-preview/camera-preview-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0082-camera-preview-demo.mov',
      dark: 'https://ui.ahmedbna.com/0082-camera-preview-demo.mov',
    },
  },
};
