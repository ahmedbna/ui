// Registry configuration for file-picker component and demo

export const filePickerRegistry = {
  // Main file-picker component
  'file-picker': {
    name: 'file-picker',
    description:
      'A customizable file picker component with validation, preview, and multiple file support.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native', 'expo-document-picker'],
    registryDependencies: ['button', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/file-picker.tsx',
        target: 'components/ui/file-picker.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0138-file-picker-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0138-file-picker-demo.MP4',
    },
  },

  // Default demo
  'file-picker-demo': {
    name: 'file-picker-demo',
    description: 'A basic file picker with validation and preview',
    type: 'registry:example',
    registryDependencies: ['file-picker'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/file-picker/file-picker-demo.tsx',
        target: 'components/demo/file-picker/file-picker-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0138-file-picker-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0138-file-picker-demo.MP4',
    },
  },

  'file-picker-images': {
    name: 'file-picker-images',
    description: 'File picker configured for images only',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/file-picker/file-picker-images.tsx',
        target: 'components/demo/file-picker/file-picker-images.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0139-file-picker-images.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0139-file-picker-images.MP4',
    },
  },

  'file-picker-single': {
    name: 'file-picker-single',
    description: 'File picker for selecting a single file',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/file-picker/file-picker-single.tsx',
        target: 'components/demo/file-picker/file-picker-single.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0140-file-picker-single.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0140-file-picker-single.MP4',
    },
  },

  'file-picker-validation': {
    name: 'file-picker-validation',
    description: 'File picker with size limits and extension validation',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/file-picker/file-picker-validation.tsx',
        target: 'components/demo/file-picker/file-picker-validation.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0141-file-picker-validation.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0141-file-picker-validation.MP4',
    },
  },

  'file-picker-styled': {
    name: 'file-picker-styled',
    description: 'File picker with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'view', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/file-picker/file-picker-styled.tsx',
        target: 'components/demo/file-picker/file-picker-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0142-file-picker-styled.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0142-file-picker-styled.MP4',
    },
  },

  'file-picker-controlled': {
    name: 'file-picker-controlled',
    description: 'Controlled file picker using the useFilePicker hook',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/file-picker/file-picker-controlled.tsx',
        target: 'components/demo/file-picker/file-picker-controlled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0143-file-picker-controlled.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0143-file-picker-controlled.MP4',
    },
  },

  'file-picker-info': {
    name: 'file-picker-info',
    description: 'File picker displaying detailed file information',
    type: 'registry:example',
    registryDependencies: ['file-picker', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/file-picker/file-picker-info.tsx',
        target: 'components/demo/file-picker/file-picker-info.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0144-file-picker-info.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0144-file-picker-info.MP4',
    },
  },
};
