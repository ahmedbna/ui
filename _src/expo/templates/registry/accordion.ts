// Registry configuration for accordion component and demo

export const accordionRegistry = {
  // Main accordion component
  accordion: {
    name: 'accordion',
    description:
      'A vertically stacked set of interactive headings that each reveal a section of content.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/accordion.tsx',
        target: 'components/ui/accordion.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-09-54_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-09-54_1.mov',
    },
  },

  // Default demo
  'accordion-demo': {
    name: 'accordion-demo',
    description: 'A basic accordion with collapsible sections',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/accordion/accordion-demo.tsx',
        target: 'components/demo/accordion/accordion-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-09-54_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-09-54_1.mov',
    },
  },

  // Single selection example
  'accordion-single': {
    name: 'accordion-single',
    description: 'An accordion that allows only one item to be open at a time',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/accordion/accordion-single.tsx',
        target: 'components/demo/accordion/accordion-single.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-09-54_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-09-54_1.mov',
    },
  },

  // Multiple selection example
  'accordion-multiple': {
    name: 'accordion-multiple',
    description:
      'An accordion that allows multiple items to be open simultaneously',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/accordion/accordion-multiple.tsx',
        target: 'components/demo/accordion/accordion-multiple.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-10-59_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-10-59_1.mov',
    },
  },

  // Controlled example
  'accordion-controlled': {
    name: 'accordion-controlled',
    description: 'An accordion with controlled state management',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/accordion/accordion-controlled.tsx',
        target: 'components/demo/accordion/accordion-controlled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-11-23_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-11-23_1.mov',
    },
  },

  // FAQ style example
  'accordion-faq': {
    name: 'accordion-faq',
    description:
      'An accordion formatted as a frequently asked questions section',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/accordion/accordion-faq.tsx',
        target: 'components/demo/accordion/accordion-faq.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-11-50_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-11-50_1.mov',
    },
  },

  // Non-collapsible example
  'accordion-non-collapsible': {
    name: 'accordion-non-collapsible',
    description: 'An accordion where at least one item must always remain open',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/accordion/accordion-non-collapsible.tsx',
        target: 'components/demo/accordion/accordion-non-collapsible.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-12-14_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-12-14_1.mov',
    },
  },

  // Custom styled example
  'accordion-styled': {
    name: 'accordion-styled',
    description: 'An accordion with custom styling and icons',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/accordion/accordion-styled.tsx',
        target: 'components/demo/accordion/accordion-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-13-33_1.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 06-13-33_1.mov',
    },
  },
};
