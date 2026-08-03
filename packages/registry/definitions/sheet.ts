// Registry configuration for sheet component and demo

export const sheetRegistry = {
  // Main sheet component
  sheet: {
    name: 'sheet',
    description:
      'A modal component that slides in from the side of the screen, commonly used for navigation menus, filters, and detail views.',
    type: 'registry:ui',
    dependencies: [
      'lucide-react-native',
      'react-native-reanimated',
      'react-native-worklets',
      'react-native-safe-area-context',
    ],
    registryDependencies: ['button', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/sheet.tsx',
        target: 'components/ui/sheet.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0268-sheet-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0268-sheet-demo.MP4',
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
        path: 'src/demo/sheet/sheet-demo.tsx',
        target: 'components/demo/sheet/sheet-demo.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0268-sheet-demo.MP4',
      dark: 'https://demo.ahmedbna.com/0268-sheet-demo.MP4',
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
        path: 'src/demo/sheet/sheet-left.tsx',
        target: 'components/demo/sheet/sheet-left.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0269-sheet-left.MP4',
      dark: 'https://demo.ahmedbna.com/0269-sheet-left.MP4',
    },
  },

  'sheet-navigation': {
    name: 'sheet-navigation',
    description: 'A sheet that slides in from the navigation side',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['sheet', 'button', 'text', 'view', 'icon'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/sheet/sheet-navigation.tsx',
        target: 'components/demo/sheet/sheet-navigation.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0270-sheet-navigation.MP4',
      dark: 'https://demo.ahmedbna.com/0270-sheet-navigation.MP4',
    },
  },

  'sheet-form': {
    name: 'sheet-form',
    description: 'A sheet that slides in from the form side',
    type: 'registry:example',
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/sheet/sheet-form.tsx',
        target: 'components/demo/sheet/sheet-form.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0271-sheet-form.MP4',
      dark: 'https://demo.ahmedbna.com/0271-sheet-form.MP4',
    },
  },

  'sheet-filter': {
    name: 'sheet-filter',
    description: 'A sheet that slides in from the filter side',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/sheet/sheet-filter.tsx',
        target: 'components/demo/sheet/sheet-filter.tsx',
      },
    ],
    preview: {
      light: 'https://demo.ahmedbna.com/0272-sheet-filter.MP4',
      dark: 'https://demo.ahmedbna.com/0272-sheet-filter.MP4',
    },
  },
};
