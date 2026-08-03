// docs/registry/bottom-sheet.ts
// Registry configuration for bottom-sheet component and demo

export const bottomSheetRegistry = {
  // Main bottom-sheet component
  'bottom-sheet': {
    name: 'bottom-sheet',
    description:
      'A modal sheet component that slides up from the bottom with gesture support and snap points.',
    type: 'registry:ui',
    dependencies: [
      'react-native-gesture-handler',
      'react-native-reanimated',
      'react-native-worklets',
      'react-native-safe-area-context',
    ],
    registryDependencies: ['text', 'view'],
    hooks: ['useColor', 'useKeyboardHeight'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/bottom-sheet.tsx',
        target: 'components/ui/bottom-sheet.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0065-bottom-sheet-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0065-bottom-sheet-demo.MP4',
    },
  },

  // Default demo
  'bottom-sheet-demo': {
    name: 'bottom-sheet-demo',
    description: 'A basic bottom sheet with gesture support and snap points',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-demo.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0065-bottom-sheet-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0065-bottom-sheet-demo.MP4',
    },
  },

  // Title example
  'bottom-sheet-title': {
    name: 'bottom-sheet-title',
    description: 'Bottom sheet with a title header',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-title.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-title.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0066-bottom-sheet-title.MP4',
      dark: 'https://ui.ahmedbna.com/0066-bottom-sheet-title.MP4',
    },
  },

  // Snap points example
  'bottom-sheet-snap-points': {
    name: 'bottom-sheet-snap-points',
    description: 'Bottom sheet with custom snap point configurations',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-snap-points.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-snap-points.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0067-bottom-sheet-snap-points.MP4',
      dark: 'https://ui.ahmedbna.com/0067-bottom-sheet-snap-points.MP4',
    },
  },

  // Form example
  'bottom-sheet-form': {
    name: 'bottom-sheet-form',
    description: 'Bottom sheet containing form elements and inputs',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'input', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-form.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-form.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0068-bottom-sheet-form.MP4',
      dark: 'https://ui.ahmedbna.com/0068-bottom-sheet-form.MP4',
    },
  },

  // List example
  'bottom-sheet-list': {
    name: 'bottom-sheet-list',
    description: 'Bottom sheet with scrollable list content',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-list.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-list.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0069-bottom-sheet-list.MP4',
      dark: 'https://ui.ahmedbna.com/0069-bottom-sheet-list.MP4',
    },
  },

  // No dismiss example
  'bottom-sheet-no-dismiss': {
    name: 'bottom-sheet-no-dismiss',
    description: 'Bottom sheet that cannot be dismissed by tapping backdrop',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-no-dismiss.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-no-dismiss.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0070-bottom-sheet-no-dismiss.MP4',
      dark: 'https://ui.ahmedbna.com/0070-bottom-sheet-no-dismiss.MP4',
    },
  },

  // Styled example
  'bottom-sheet-styled': {
    name: 'bottom-sheet-styled',
    description: 'Bottom sheet with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-styled.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0071-bottom-sheet-styled.MP4',
      dark: 'https://ui.ahmedbna.com/0071-bottom-sheet-styled.MP4',
    },
  },

  'bottom-sheet-menu': {
    name: 'bottom-sheet-menu',
    description: 'Bottom sheet used as a menu with action items',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/bottom-sheet/bottom-sheet-menu.tsx',
        target: 'components/demo/bottom-sheet/bottom-sheet-menu.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0072-bottom-sheet-menu.MP4',
      dark: 'https://ui.ahmedbna.com/0072-bottom-sheet-menu.MP4',
    },
  },
};
