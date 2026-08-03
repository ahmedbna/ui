// Registry configuration for share component and demo

export const shareRegistry = {
  // Main share component
  share: {
    name: 'share',
    description:
      'A button component for sharing content across platforms with native share functionality.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['button', 'text'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/share.tsx',
        target: 'components/ui/share.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0260-share-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0260-share-demo.MP4',
    },
  },

  // Default demo
  'share-demo': {
    name: 'share-demo',
    description: 'A basic share button with text and URL sharing',
    type: 'registry:example',
    registryDependencies: ['share'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-demo.tsx',
        target: 'components/demo/share/share-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0260-share-demo.MP4',
      dark: 'https://ui.ahmedbna.com/0260-share-demo.MP4',
    },
  },

  // Variants example
  'share-variants': {
    name: 'share-variants',
    description: 'Share buttons with different visual variants',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-variants.tsx',
        target: 'components/demo/share/share-variants.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0261-share-variants.MP4',
      dark: 'https://ui.ahmedbna.com/0261-share-variants.MP4',
    },
  },

  // Sizes example
  'share-sizes': {
    name: 'share-sizes',
    description: 'Share buttons in different sizes',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-sizes.tsx',
        target: 'components/demo/share/share-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0262-share-sizes.MP4',
      dark: 'https://ui.ahmedbna.com/0262-share-sizes.MP4',
    },
  },

  // URL only example
  'share-url-only': {
    name: 'share-url-only',
    description: 'Share button for sharing URLs without additional text',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-url-only.tsx',
        target: 'components/demo/share/share-url-only.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0263-share-url-only.MP4',
      dark: 'https://ui.ahmedbna.com/0263-share-url-only.MP4',
    },
  },

  // Custom content example
  'share-custom-content': {
    name: 'share-custom-content',
    description: 'Share button with custom title, subject, and content',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-custom-content.tsx',
        target: 'components/demo/share/share-custom-content.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0264-share-custom-content.MP4',
      dark: 'https://ui.ahmedbna.com/0264-share-custom-content.MP4',
    },
  },

  // Icon only example
  'share-icon-only': {
    name: 'share-icon-only',
    description: 'Compact share button with icon only',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-icon-only.tsx',
        target: 'components/demo/share/share-icon-only.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0265-share-icon-only.MP4',
      dark: 'https://ui.ahmedbna.com/0265-share-icon-only.MP4',
    },
  },

  // Callbacks example
  'share-callbacks': {
    name: 'share-callbacks',
    description: 'Share button with success, error, and dismiss callbacks',
    type: 'registry:example',
    registryDependencies: ['share', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-callbacks.tsx',
        target: 'components/demo/share/share-callbacks.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0266-share-callbacks.MP4',
      dark: 'https://ui.ahmedbna.com/0266-share-callbacks.MP4',
    },
  },

  'share-hook': {
    name: 'share-hook',
    description: 'Using the useShare hook for programmatic sharing',
    type: 'registry:example',
    registryDependencies: ['share', 'text', 'view', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/share/share-hook.tsx',
        target: 'components/demo/share/share-hook.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0267-share-hook.MP4',
      dark: 'https://ui.ahmedbna.com/0267-share-hook.MP4',
    },
  },
};
