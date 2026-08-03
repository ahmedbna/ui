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
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/video.tsx',
        target: 'components/ui/video.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0321-video-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0321-video-demo.MP4',
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
        path: 'src/demo/video/video-demo.tsx',
        target: 'components/demo/video/video-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0321-video-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0321-video-demo.MP4',
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
        path: 'src/demo/video/video-native-controls.tsx',
        target: 'components/demo/video/video-native-controls.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0322-video-native-controls.MP4',
      dark: 'https://ui.ahmedbna.com/0322-video-native-controls.MP4',
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
        path: 'src/demo/video/video-custom-controls.tsx',
        target: 'components/demo/video/video-custom-controls.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0323-video-custom-controls.MP4',
      dark: 'https://ui.ahmedbna.com/0323-video-custom-controls.MP4',
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
        path: 'src/demo/video/video-subtitles.tsx',
        target: 'components/demo/video/video-subtitles.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0324-video-subtitles.MP4',
      dark: 'https://ui.ahmedbna.com/0324-video-subtitles.MP4',
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
        path: 'src/demo/video/video-autoplay-loop.tsx',
        target: 'components/demo/video/video-autoplay-loop.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0325-video-autoplay-loop.MP4',
      dark: 'https://ui.ahmedbna.com/0325-video-autoplay-loop.MP4',
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
        path: 'src/demo/video/video-sources.tsx',
        target: 'components/demo/video/video-sources.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0326-video-sources.MP4',
      dark: 'https://ui.ahmedbna.com/0326-video-sources.MP4',
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
        path: 'src/demo/video/video-gestures.tsx',
        target: 'components/demo/video/video-gestures.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0327-video-gestures.MP4',
      dark: 'https://ui.ahmedbna.com/0327-video-gestures.MP4',
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
        path: 'src/demo/video/video-content-fit.tsx',
        target: 'components/demo/video/video-content-fit.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0328-video-content-fit.mov',
      dark: 'https://ui.ahmedbna.com/0328-video-content-fit.mov',
    },
  },
};
