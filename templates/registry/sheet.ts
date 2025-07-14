// Registry configuration for sheet component and demo

export const sheetRegistry = {
  // Main sheet component
  sheet: {
    name: 'sheet',
    description:
      'A modal component that slides in from the side of the screen, commonly used for navigation menus, filters, and detail views.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['button', 'text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/sheet.tsx',
        target: 'components/ui/sheet.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-31-38_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-31-38_1.MP4',
    },
  },

  // Default demo
  'sheet-demo': {
    name: 'sheet-demo',
    description: 'A basic sheet that slides in from the right side',
    type: 'registry:example',
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/sheet/sheet-demo.tsx',
        target: 'components/demo/sheet/sheet-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-31-38_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-31-38_1.MP4',
    },
  },

  'sheet-left': {
    name: 'sheet-left',
    description: 'A sheet that slides in from the left side',
    type: 'registry:example',
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/sheet/sheet-left.tsx',
        target: 'components/demo/sheet/sheet-left.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-32-11_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-32-11_1.MP4',
    },
  },

  'sheet-navigation': {
    name: 'sheet-navigation',
    description: 'A sheet that slides in from the navigation side',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/sheet/sheet-navigation.tsx',
        target: 'components/demo/sheet/sheet-navigation.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-33-28_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-33-28_1.MP4',
    },
  },

  'sheet-form': {
    name: 'sheet-form',
    description: 'A sheet that slides in from the form side',
    type: 'registry:example',
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/sheet/sheet-form.tsx',
        target: 'components/demo/sheet/sheet-form.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-34-17_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-34-17_1.MP4',
    },
  },

  'sheet-filter': {
    name: 'sheet-filter',
    description: 'A sheet that slides in from the filter side',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/sheet/sheet-filter.tsx',
        target: 'components/demo/sheet/sheet-filter.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-35-22_1.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-35-22_1.MP4',
    },
  },
};
