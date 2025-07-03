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
    files: [
      {
        path: 'registry/components/ui/bottom-sheet.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-49-58_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-49-58_1.MP4',
    },
  },

  // Default demo
  'bottom-sheet-demo': {
    name: 'bottom-sheet-demo',
    description: 'A basic bottom sheet with gesture support and snap points',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-49-58_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-49-58_1.MP4',
    },
  },

  // Title example
  'bottom-sheet-title': {
    name: 'bottom-sheet-title',
    description: 'Bottom sheet with a title header',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-title.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-50-17_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-50-17_1.MP4',
    },
  },

  // Snap points example
  'bottom-sheet-snap-points': {
    name: 'bottom-sheet-snap-points',
    description: 'Bottom sheet with custom snap point configurations',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-snap-points.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-50-38_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 22-50-38_1.MP4',
    },
  },

  // Form example
  'bottom-sheet-form': {
    name: 'bottom-sheet-form',
    description: 'Bottom sheet containing form elements and inputs',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'input'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-form.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-00-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-00-09_1.MP4',
    },
  },

  // List example
  'bottom-sheet-list': {
    name: 'bottom-sheet-list',
    description: 'Bottom sheet with scrollable list content',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-list.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-00-33_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-00-33_1.MP4',
    },
  },

  // No dismiss example
  'bottom-sheet-no-dismiss': {
    name: 'bottom-sheet-no-dismiss',
    description: 'Bottom sheet that cannot be dismissed by tapping backdrop',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-no-dismiss.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-00-58_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-00-58_1.MP4',
    },
  },

  // Styled example
  'bottom-sheet-styled': {
    name: 'bottom-sheet-styled',
    description: 'Bottom sheet with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-styled.tsx',
        type: 'registry:example',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-03-29_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-03-29_1.MP4',
    },
  },

  'bottom-sheet-menu': {
    name: 'bottom-sheet-menu',
    description: 'Bottom sheet used as a menu with action items',
    type: 'registry:example',
    registryDependencies: ['bottom-sheet', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/bottom-sheet/bottom-sheet-menu.tsx',
        type: 'registry:example',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-05-38_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 23-05-38_1.MP4',
    },
  },
};
