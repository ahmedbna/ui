// Registry configuration for tabs component and demo

export const tabsRegistry = {
  // Main tabs component
  tabs: {
    name: 'tabs',
    description:
      'A foundational View component with transparent background and ref forwarding support.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/tabs.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-18-46_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-18-46_1.MP4',
    },
  },

  // Default demo
  'tabs-demo': {
    name: 'tabs-demo',
    description: 'Basic tabs container with content',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/tabs/tabs-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-18-46_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-18-46_1.MP4',
    },
  },

  'tabs-vertical': {
    name: 'tabs-vertical',
    description: 'Tabs arranged in vertical orientation',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/tabs/tabs-vertical.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-19-27_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-19-27_1.MP4',
    },
  },

  'tabs-disabled': {
    name: 'tabs-disabled',
    description: 'Tabs with disabled states',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/tabs/tabs-disabled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-20-47_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-20-47_1.MP4',
    },
  },

  'tabs-styled': {
    name: 'tabs-styled',
    description: 'Tabs with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/demo/tabs/tabs-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-21-13_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-02-2025 06-21-13_1.MP4',
    },
  },
};
