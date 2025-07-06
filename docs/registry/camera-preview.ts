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
      'expo-av',
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
    files: [
      {
        type: 'registry:ui',
        path: 'registry/components/ui/camera-preview.tsx',
        target: 'components/ui/camera-preview.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-14-10_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-14-10_1.mov',
    },
  },

  // Default demo
  'camera-preview-demo': {
    name: 'camera-preview-demo',
    description: 'A basic camera preview with capture and save functionality',
    type: 'registry:example',
    registryDependencies: ['camera-preview'],
    files: [
      {
        type: 'registry:example',
        path: 'registry/demo/camera-preview/camera-preview-demo.tsx',
        target: 'components/demo/camera-preview/camera-preview-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-14-10_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 07-14-10_1.mov',
    },
  },
};
