// Registry configuration for camera component and demo

export const cameraRegistry = {
  // Main camera component
  camera: {
    name: 'camera',
    description:
      'A powerful camera component with advanced features like zoom, timer, torch, and video recording.',
    type: 'registry:ui',
    dependencies: [
      'expo-camera',
      'lucide-react-native',
      'react-native-gesture-handler',
    ],
    registryDependencies: ['button', 'text', 'progress'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/camera.tsx',
        target: 'components/ui/camera.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-48-08_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-48-08_1.MP4',
    },
  },

  // Default demo
  'camera-demo': {
    name: 'camera-demo',
    description: 'A basic camera with default settings',
    type: 'registry:example',
    registryDependencies: ['camera'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/camera/camera-demo.tsx',
        target: 'components/demo/camera/camera-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-48-08_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-48-08_1.MP4',
    },
  },

  // Custom controls example
  'camera-custom-controls': {
    name: 'camera-custom-controls',
    description: 'Camera with custom control settings',
    type: 'registry:example',
    registryDependencies: ['camera'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/camera/camera-custom-controls.tsx',
        target: 'components/demo/camera/camera-custom-controls.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-49-50_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-49-50_1.MP4',
    },
  },

  // Picture only example
  'camera-picture-only': {
    name: 'camera-picture-only',
    description: 'Camera configured for picture-only mode',
    type: 'registry:example',
    registryDependencies: ['camera'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/camera/camera-picture-only.tsx',
        target: 'components/demo/camera/camera-picture-only.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-50-18_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-50-18_1.MP4',
    },
  },

  // Video example
  'camera-video': {
    name: 'camera-video',
    description: 'Camera with video recording capabilities',
    type: 'registry:example',
    registryDependencies: ['camera'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/camera/camera-video.tsx',
        target: 'components/demo/camera/camera-video.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-50-47_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-50-47_1.MP4',
    },
  },

  // Timer example
  'camera-timer': {
    name: 'camera-timer',
    description: 'Camera with timer functionality',
    type: 'registry:example',
    registryDependencies: ['camera'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/camera/camera-timer.tsx',
        target: 'components/demo/camera/camera-timer.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-51-44_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-51-44_1.MP4',
    },
  },

  // Zoom example
  'camera-zoom': {
    name: 'camera-zoom',
    description: 'Camera with zoom controls and gestures',
    type: 'registry:example',
    registryDependencies: ['camera'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/camera/camera-zoom.tsx',
        target: 'components/demo/camera/camera-zoom.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-52-21_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-52-21_1.MP4',
    },
  },

  // Settings example
  'camera-settings': {
    name: 'camera-settings',
    description: 'Camera with advanced settings panel',
    type: 'registry:example',
    registryDependencies: ['camera'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/camera/camera-settings.tsx',
        target: 'components/demo/camera/camera-settings.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-53-38_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 01-53-38_1.MP4',
    },
  },
};
