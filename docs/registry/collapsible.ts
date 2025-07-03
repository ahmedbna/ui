// docs/registry/collapsible.ts
// Registry configuration for collapsible component and demo
export const collapsibleRegistry = {
  // Main collapsible component
  collapsible: {
    name: 'collapsible',
    description:
      'An interactive component which can be expanded/collapsed to show and hide content.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/collapsible.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-19-30_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-19-30_1.MP4',
    },
  },

  // Default demo
  'collapsible-demo': {
    name: 'collapsible-demo',
    description: 'A basic collapsible component with title and content',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text'],
    files: [
      {
        path: 'registry/demo/collapsible/collapsible-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-19-30_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-19-30_1.MP4',
    },
  },

  // Multiple collapsibles example
  'collapsible-multiple': {
    name: 'collapsible-multiple',
    description: 'Multiple collapsible components working independently',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/collapsible/collapsible-multiple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-19-48_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-19-48_1.MP4',
    },
  },

  // Nested collapsibles example
  'collapsible-nested': {
    name: 'collapsible-nested',
    description: 'Collapsible components nested within each other',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text'],
    files: [
      {
        path: 'registry/demo/collapsible/collapsible-nested.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-20-05_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-20-05_1.MP4',
    },
  },

  // With interactive content example
  'collapsible-with-content': {
    name: 'collapsible-with-content',
    description: 'Collapsible containing interactive elements like checkboxes',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'checkbox', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/collapsible/collapsible-with-content.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-20-24_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-20-24_1.MP4',
    },
  },

  // FAQ style example
  'collapsible-faq': {
    name: 'collapsible-faq',
    description: 'Collapsible components styled as frequently asked questions',
    type: 'registry:example',
    registryDependencies: ['collapsible', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/collapsible/collapsible-faq.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-20-43_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-30-2025 23-20-43_1.MP4',
    },
  },
};
