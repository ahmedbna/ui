// docs/registry/bottom-sheet.ts
// Registry configuration for bottom-sheet component and demo

export const bottomSheetRegistry = {
  // Main bottom-sheet component
  'bottom-sheet': {
    name: 'bottom-sheet',
    description:
      'A modal sheet component that slides up from the bottom with gesture support and snap points.',
    type: 'registry:ui',
    dependencies: ['react-native-gesture-handler', 'react-native-reanimated'],
    registryDependencies: ['text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/bottom-sheet.tsx',
        target: 'components/ui/bottom-sheet.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-49-58_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-49-58_1.MP4',
    },
  },

  // Default demo
  'bottom-sheet-demo': {
    name: 'bottom-sheet-demo',
    description: 'A basic bottom sheet with gesture support and snap points',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-demo.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-49-58_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-49-58_1.MP4',
    },
  },

  // Title example
  'bottom-sheet-title': {
    name: 'bottom-sheet-title',
    description: 'Bottom sheet with a title header',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-title.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-title.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-50-17_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-50-17_1.MP4',
    },
  },

  // Snap points example
  'bottom-sheet-snap-points': {
    name: 'bottom-sheet-snap-points',
    description: 'Bottom sheet with custom snap point configurations',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-snap-points.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-snap-points.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-50-38_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 22-50-38_1.MP4',
    },
  },

  // Form example
  'bottom-sheet-form': {
    name: 'bottom-sheet-form',
    description: 'Bottom sheet containing form elements and inputs',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'input'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-form.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-form.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-09_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-09_1.MP4',
    },
  },

  // List example
  'bottom-sheet-list': {
    name: 'bottom-sheet-list',
    description: 'Bottom sheet with scrollable list content',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-list.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-list.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-33_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-33_1.MP4',
    },
  },

  // No dismiss example
  'bottom-sheet-no-dismiss': {
    name: 'bottom-sheet-no-dismiss',
    description: 'Bottom sheet that cannot be dismissed by tapping backdrop',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-no-dismiss.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-no-dismiss.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-58_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-58_1.MP4',
    },
  },

  // Styled example
  'bottom-sheet-styled': {
    name: 'bottom-sheet-styled',
    description: 'Bottom sheet with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-styled.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-03-29_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-03-29_1.MP4',
    },
  },

  'bottom-sheet-menu': {
    name: 'bottom-sheet-menu',
    description: 'Bottom sheet used as a menu with action items',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/bottom-sheet/bottom-sheet-menu.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-menu.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-05-38_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-05-38_1.MP4',
    },
  },
};
