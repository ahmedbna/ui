// Registry configuration for video component and demo

export const videoRegistry = {
  // Main video component
  video: {
    name: 'video',
    description:
      'A video player component with custom controls, gestures, and subtitle support.',
    type: 'registry:ui',
    dependencies: ['expo-video', 'lucide-react-native'],
    registryDependencies: ['progress', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/video.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-41-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-41-52_1.MP4',
    },
  },

  // Default demo
  'video-demo': {
    name: 'video-demo',
    description: 'A basic video player with custom controls',
    type: 'registry:example',
    registryDependencies: ['video'],
    files: [
      {
        path: 'registry/demo/video/video-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-41-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-41-52_1.MP4',
    },
  },

  // Native controls example
  'video-native-controls': {
    name: 'video-native-controls',
    description: 'Video player using native system controls',
    type: 'registry:example',
    registryDependencies: ['video'],
    files: [
      {
        path: 'registry/demo/video/video-native-controls.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-42-24_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-42-24_1.MP4',
    },
  },

  // Custom controls example
  'video-custom-controls': {
    name: 'video-custom-controls',
    description: 'Video player with custom control interface',
    type: 'registry:example',
    registryDependencies: ['video'],
    files: [
      {
        path: 'registry/demo/video/video-custom-controls.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-44-04_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-44-04_1.MP4',
    },
  },

  // Subtitles example
  'video-subtitles': {
    name: 'video-subtitles',
    description: 'Video player with subtitle support',
    type: 'registry:example',
    registryDependencies: ['video'],
    files: [
      {
        path: 'registry/demo/video/video-subtitles.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-45-26_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-45-26_1.MP4',
    },
  },

  // Autoplay and loop example
  'video-autoplay-loop': {
    name: 'video-autoplay-loop',
    description: 'Video that automatically plays and loops',
    type: 'registry:example',
    registryDependencies: ['video'],
    files: [
      {
        path: 'registry/demo/video/video-autoplay-loop.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-46-15_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-46-15_1.MP4',
    },
  },

  // Different sources example
  'video-sources': {
    name: 'video-sources',
    description: 'Video players with different source types',
    type: 'registry:example',
    registryDependencies: ['video', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/video/video-sources.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-46-59_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-46-59_1.MP4',
    },
  },

  // Gesture controls example
  'video-gestures': {
    name: 'video-gestures',
    description: 'Video player with tap-to-play and seek gestures',
    type: 'registry:example',
    registryDependencies: ['video', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/video/video-gestures.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-48-24_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-48-24_1.MP4',
    },
  },

  // Content fit example
  'video-content-fit': {
    name: 'video-content-fit',
    description: 'Videos with different content fitting options',
    type: 'registry:example',
    registryDependencies: ['video', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/video/video-content-fit.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-48-58_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-48-58_1.MP4',
    },
  },
};
