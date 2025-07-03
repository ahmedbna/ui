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
    files: [
      {
        path: 'registry/components/ui/share.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-26-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-26-52_1.MP4',
    },
  },

  // Default demo
  'share-demo': {
    name: 'share-demo',
    description: 'A basic share button with text and URL sharing',
    type: 'registry:example',
    registryDependencies: ['share'],
    files: [
      {
        path: 'registry/demo/share/share-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-26-52_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-26-52_1.MP4',
    },
  },

  // Variants example
  'share-variants': {
    name: 'share-variants',
    description: 'Share buttons with different visual variants',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/demo/share/share-variants.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-27-10_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-27-10_1.MP4',
    },
  },

  // Sizes example
  'share-sizes': {
    name: 'share-sizes',
    description: 'Share buttons in different sizes',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/demo/share/share-sizes.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-28-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-28-09_1.MP4',
    },
  },

  // URL only example
  'share-url-only': {
    name: 'share-url-only',
    description: 'Share button for sharing URLs without additional text',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/demo/share/share-url-only.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-28-32_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-28-32_1.MP4',
    },
  },

  // Custom content example
  'share-custom-content': {
    name: 'share-custom-content',
    description: 'Share button with custom title, subject, and content',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/demo/share/share-custom-content.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-28-51_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-28-51_1.MP4',
    },
  },

  // Icon only example
  'share-icon-only': {
    name: 'share-icon-only',
    description: 'Compact share button with icon only',
    type: 'registry:example',
    registryDependencies: ['share', 'view'],
    files: [
      {
        path: 'registry/demo/share/share-icon-only.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-29-09_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-29-09_1.MP4',
    },
  },

  // Callbacks example
  'share-callbacks': {
    name: 'share-callbacks',
    description: 'Share button with success, error, and dismiss callbacks',
    type: 'registry:example',
    registryDependencies: ['share', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/share/share-callbacks.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-29-27_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-29-27_1.MP4',
    },
  },

  'share-hook': {
    name: 'share-hook',
    description: 'Using the useShare hook for programmatic sharing',
    type: 'registry:example',
    registryDependencies: ['share', 'text', 'view', 'button'],
    files: [
      {
        path: 'registry/demo/share/share-hook.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-29-44_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 10-29-44_1.MP4',
    },
  },
};
