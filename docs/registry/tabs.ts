// Registry configuration for tabs component and examples

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
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
        path: 'registry/examples/tabs/tabs-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'tabs-vertical': {
    name: 'tabs-vertical',
    description: 'Tabs arranged in vertical orientation',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/tabs/tabs-vertical.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'tabs-disabled': {
    name: 'tabs-disabled',
    description: 'Tabs with disabled states',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/tabs/tabs-disabled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'tabs-styled': {
    name: 'tabs-styled',
    description: 'Tabs with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/tabs/tabs-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'tabs-scrollable': {
    name: 'tabs-scrollable',
    description: 'Tabs that scroll horizontally when they overflow',
    type: 'registry:example',
    registryDependencies: ['tabs', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/tabs/tabs-scrollable.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
