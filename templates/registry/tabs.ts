// Registry configuration for tabs component and demo

export const tabsRegistry = {
  // Main tabs component
  tabs: {
    name: 'tabs',
    description:
      'A foundational View component with transparent background and ref forwarding support.',
    type: 'registry:ui',
    dependencies: ['react-native-gesture-handler', 'react-native-reanimated'],
    registryDependencies: ['text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/tabs.tsx',
        target: 'components/ui/tabs.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-18-46_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-18-46_1.MP4',
    },
  },

  // Default demo
  'tabs-demo': {
    name: 'tabs-demo',
    description: 'Basic tabs container with content',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/tabs/tabs-demo.tsx',
        target: 'components/demo/tabs/tabs-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-18-46_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-18-46_1.MP4',
    },
  },

  'tabs-vertical': {
    name: 'tabs-vertical',
    description: 'Tabs arranged in vertical orientation',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/tabs/tabs-vertical.tsx',
        target: 'components/demo/tabs/tabs-vertical.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-19-27_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-19-27_1.MP4',
    },
  },

  'tabs-disabled': {
    name: 'tabs-disabled',
    description: 'Tabs with disabled states',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/tabs/tabs-disabled.tsx',
        target: 'components/demo/tabs/tabs-disabled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-20-47_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-20-47_1.MP4',
    },
  },

  'tabs-styled': {
    name: 'tabs-styled',
    description: 'Tabs with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/tabs/tabs-styled.tsx',
        target: 'components/demo/tabs/tabs-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-21-13_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-21-13_1.MP4',
    },
  },
};
