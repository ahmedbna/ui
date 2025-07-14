// docs/registry/audio-player.ts
// Registry configuration for audio player component and demo

export const audioPlayerRegistry = {
  // Main audio player component
  'audio-player': {
    name: 'audio-player',
    description:
      'A feature-rich audio player component with waveform visualization, playback controls, and seeking capabilities for music, podcasts, and voice recordings.',
    type: 'registry:ui',
    dependencies: ['expo-audio', 'lucide-react-native'],
    registryDependencies: ['button', 'progress', 'text', 'audio-waveform'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/audio-player.tsx',
        target: 'components/ui/audio-player.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-06-28_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-06-28_1.MP4',
    },
  },

  // Default demo
  'audio-player-demo': {
    name: 'audio-player-demo',
    description: 'A complete audio player with all features enabled',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-player/audio-player-demo.tsx',
        target: 'components/demo/audio-player/audio-player-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-06-28_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-06-28_1.MP4',
    },
  },

  // Minimal example
  'audio-player-minimal': {
    name: 'audio-player-minimal',
    description: 'A minimal audio player with only essential controls',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-player/audio-player-minimal.tsx',
        target: 'components/demo/audio-player/audio-player-minimal.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-07-40_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-07-40_1.MP4',
    },
  },

  // Waveform focused example
  'audio-player-waveform': {
    name: 'audio-player-waveform',
    description: 'Audio player focused on waveform visualization',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-player/audio-player-waveform.tsx',
        target: 'components/demo/audio-player/audio-player-waveform.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-08-03_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-08-03_1.MP4',
    },
  },

  // Progress bar example
  'audio-player-progress': {
    name: 'audio-player-progress',
    description: 'Audio player using only a progress bar for seeking',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-player/audio-player-progress.tsx',
        target: 'components/demo/audio-player/audio-player-progress.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-08-29_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-08-29_1.MP4',
    },
  },

  // Auto play example
  'audio-player-autoplay': {
    name: 'audio-player-autoplay',
    description: 'Audio player that starts playing automatically when loaded',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-player/audio-player-autoplay.tsx',
        target: 'components/demo/audio-player/audio-player-autoplay.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-08-49_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-08-49_1.MP4',
    },
  },

  // Custom styled example
  'audio-player-styled': {
    name: 'audio-player-styled',
    description: 'An audio player with custom styling and theming',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-player/audio-player-styled.tsx',
        target: 'components/demo/audio-player/audio-player-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-11-56_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-11-56_1.MP4',
    },
  },

  // Music player example
  'audio-player-music': {
    name: 'audio-player-music',
    description:
      'Audio player with music-focused UI including album art and track info',
    type: 'registry:example',
    registryDependencies: ['audio-player', 'text', 'view', 'image', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/audio-player/audio-player-music.tsx',
        target: 'components/demo/audio-player/audio-player-music.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-13-01_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-13-01_1.MP4',
    },
  },
};
