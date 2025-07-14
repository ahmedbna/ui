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
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/video.tsx',
        target: 'components/ui/video.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-41-52_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-41-52_1.MP4',
    },
  },

  // Default demo
  'video-demo': {
    name: 'video-demo',
    description: 'A basic video player with custom controls',
    type: 'registry:example',
    registryDependencies: ['video'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-demo.tsx',
        target: 'components/demo/video/video-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-41-52_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-41-52_1.MP4',
    },
  },

  // Native controls example
  'video-native-controls': {
    name: 'video-native-controls',
    description: 'Video player using native system controls',
    type: 'registry:example',
    registryDependencies: ['video'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-native-controls.tsx',
        target: 'components/demo/video/video-native-controls.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-42-24_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-42-24_1.MP4',
    },
  },

  // Custom controls example
  'video-custom-controls': {
    name: 'video-custom-controls',
    description: 'Video player with custom control interface',
    type: 'registry:example',
    registryDependencies: ['video'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-custom-controls.tsx',
        target: 'components/demo/video/video-custom-controls.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-44-04_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-44-04_1.MP4',
    },
  },

  // Subtitles example
  'video-subtitles': {
    name: 'video-subtitles',
    description: 'Video player with subtitle support',
    type: 'registry:example',
    registryDependencies: ['video'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-subtitles.tsx',
        target: 'components/demo/video/video-subtitles.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-45-26_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-45-26_1.MP4',
    },
  },

  // Autoplay and loop example
  'video-autoplay-loop': {
    name: 'video-autoplay-loop',
    description: 'Video that automatically plays and loops',
    type: 'registry:example',
    registryDependencies: ['video'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-autoplay-loop.tsx',
        target: 'components/demo/video/video-autoplay-loop.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-46-15_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-46-15_1.MP4',
    },
  },

  // Different sources example
  'video-sources': {
    name: 'video-sources',
    description: 'Video players with different source types',
    type: 'registry:example',
    registryDependencies: ['video', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-sources.tsx',
        target: 'components/demo/video/video-sources.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-48-58_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-48-58_1.MP4',
    },
  },

  // Gesture controls example
  'video-gestures': {
    name: 'video-gestures',
    description: 'Video player with tap-to-play and seek gestures',
    type: 'registry:example',
    registryDependencies: ['video', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-gestures.tsx',
        target: 'components/demo/video/video-gestures.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-46-59_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-46-59_1.MP4',
    },
  },

  // Content fit example
  'video-content-fit': {
    name: 'video-content-fit',
    description: 'Videos with different content fitting options',
    type: 'registry:example',
    registryDependencies: ['video', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/video/video-content-fit.tsx',
        target: 'components/demo/video/video-content-fit.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-48-24_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-48-24_1.mov',
    },
  },
};
