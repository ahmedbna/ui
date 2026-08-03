// Registry configuration for tabs component and demo

export const tabsRegistry = {
  // Main tabs component
  tabs: {
    name: 'tabs',
    description:
      'A swipeable, animated tabs component with support for scrollable tab lists and gesture-driven content switching.',
    type: 'registry:ui',
    dependencies: [
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['text', 'view'],
    hooks: ['useColor', 'useHaptics'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/tabs.tsx',
        target: 'components/ui/tabs.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0299-tabs-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0299-tabs-demo.MP4',
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
        path: 'src/demo/tabs/tabs-demo.tsx',
        target: 'components/demo/tabs/tabs-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0299-tabs-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0299-tabs-demo.MP4',
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
        path: 'src/demo/tabs/tabs-vertical.tsx',
        target: 'components/demo/tabs/tabs-vertical.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0300-tabs-vertical.MP4',
      dark: 'https://ui.ahmedbna.com/0300-tabs-vertical.MP4',
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
        path: 'src/demo/tabs/tabs-disabled.tsx',
        target: 'components/demo/tabs/tabs-disabled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0301-tabs-disabled.MP4',
      dark: 'https://ui.ahmedbna.com/0301-tabs-disabled.MP4',
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
        path: 'src/demo/tabs/tabs-styled.tsx',
        target: 'components/demo/tabs/tabs-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0302-tabs-styled.MP4',
      dark: 'https://ui.ahmedbna.com/0302-tabs-styled.MP4',
    },
  },
};
