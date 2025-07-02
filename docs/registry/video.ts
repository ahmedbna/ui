// Registry configuration for video component and examples

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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/video/video-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/video/video-native-controls.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
        path: 'registry/examples/video/video-custom-controls.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
        path: 'registry/examples/video/video-subtitles.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
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
        path: 'registry/examples/video/video-autoplay-loop.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
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
        path: 'registry/examples/video/video-sources.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/video/video-gestures.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
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
        path: 'registry/examples/video/video-content-fit.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      dark: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
  },
};
