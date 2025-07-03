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
    files: [
      {
        path: 'registry/components/ui/accordion.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-09-54_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-09-54_1.mov',
    },
  },

  // Default demo
  'accordion-demo': {
    name: 'accordion-demo',
    description: 'A basic accordion with collapsible sections',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    files: [
      {
        path: 'registry/demo/accordion/accordion-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-09-54_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-09-54_1.mov',
    },
  },

  // Single selection example
  'accordion-single': {
    name: 'accordion-single',
    description: 'An accordion that allows only one item to be open at a time',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    files: [
      {
        path: 'registry/demo/accordion/accordion-single.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-09-54_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-09-54_1.mov',
    },
  },

  // Multiple selection example
  'accordion-multiple': {
    name: 'accordion-multiple',
    description:
      'An accordion that allows multiple items to be open simultaneously',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    files: [
      {
        path: 'registry/demo/accordion/accordion-multiple.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-10-59_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-10-59_1.mov',
    },
  },

  // Controlled example
  'accordion-controlled': {
    name: 'accordion-controlled',
    description: 'An accordion with controlled state management',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    files: [
      {
        path: 'registry/demo/accordion/accordion-controlled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-11-23_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-11-23_1.mov',
    },
  },

  // FAQ style example
  'accordion-faq': {
    name: 'accordion-faq',
    description:
      'An accordion formatted as a frequently asked questions section',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    files: [
      {
        path: 'registry/demo/accordion/accordion-faq.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-11-50_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-11-50_1.mov',
    },
  },

  // Non-collapsible example
  'accordion-non-collapsible': {
    name: 'accordion-non-collapsible',
    description: 'An accordion where at least one item must always remain open',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    files: [
      {
        path: 'registry/demo/accordion/accordion-non-collapsible.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-12-14_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-12-14_1.mov',
    },
  },

  // Custom styled example
  'accordion-styled': {
    name: 'accordion-styled',
    description: 'An accordion with custom styling and icons',
    type: 'registry:example',
    registryDependencies: ['accordion'],
    files: [
      {
        path: 'registry/demo/accordion/accordion-styled.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-13-33_1.mov',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_06-29-2025 06-13-33_1.mov',
    },
  },
};
