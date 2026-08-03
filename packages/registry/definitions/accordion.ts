// Registry configuration for accordion component and demo

export const accordionRegistry = {
  // Main accordion component
  accordion: {
    name: 'accordion',
    description:
      'A vertically stacked set of interactive headings that each reveal a section of content.',
    type: 'registry:ui',
    dependencies: [
      'lucide-react-native',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['text', 'view', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/accordion.tsx',
        target: 'components/ui/accordion.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0001-accordion-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0001-accordion-demo.mov',
    },
  },

  // Default demo
  'accordion-demo': {
    name: 'accordion-demo',
    description: 'A basic accordion with collapsible sections',
    type: 'registry:example',
    registryDependencies: ['accordion', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/accordion/accordion-demo.tsx',
        target: 'components/demo/accordion/accordion-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0001-accordion-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0001-accordion-demo.mov',
    },
  },

  // Single selection example
  'accordion-single': {
    name: 'accordion-single',
    description: 'An accordion that allows only one item to be open at a time',
    type: 'registry:example',
    registryDependencies: ['accordion', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/accordion/accordion-single.tsx',
        target: 'components/demo/accordion/accordion-single.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0001-accordion-demo.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0001-accordion-demo.mov',
    },
  },

  // Multiple selection example
  'accordion-multiple': {
    name: 'accordion-multiple',
    description:
      'An accordion that allows multiple items to be open simultaneously',
    type: 'registry:example',
    registryDependencies: ['accordion', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/accordion/accordion-multiple.tsx',
        target: 'components/demo/accordion/accordion-multiple.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0002-accordion-multiple.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0002-accordion-multiple.mov',
    },
  },

  // Controlled example
  'accordion-controlled': {
    name: 'accordion-controlled',
    description: 'An accordion with controlled state management',
    type: 'registry:example',
    registryDependencies: ['accordion', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/accordion/accordion-controlled.tsx',
        target: 'components/demo/accordion/accordion-controlled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0003-accordion-controlled.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0003-accordion-controlled.mov',
    },
  },

  // FAQ style example
  'accordion-faq': {
    name: 'accordion-faq',
    description:
      'An accordion formatted as a frequently asked questions section',
    type: 'registry:example',
    registryDependencies: ['accordion', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/accordion/accordion-faq.tsx',
        target: 'components/demo/accordion/accordion-faq.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0004-accordion-faq.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0004-accordion-faq.mov',
    },
  },

  // Non-collapsible example
  'accordion-non-collapsible': {
    name: 'accordion-non-collapsible',
    description: 'An accordion where at least one item must always remain open',
    type: 'registry:example',
    registryDependencies: ['accordion', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/accordion/accordion-non-collapsible.tsx',
        target: 'components/demo/accordion/accordion-non-collapsible.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0005-accordion-non-collapsible.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0005-accordion-non-collapsible.mov',
    },
  },

  // Custom styled example
  'accordion-styled': {
    name: 'accordion-styled',
    description: 'An accordion with custom styling and icons',
    type: 'registry:example',
    registryDependencies: ['accordion', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/accordion/accordion-styled.tsx',
        target: 'components/demo/accordion/accordion-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0006-accordion-styled.mov',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0006-accordion-styled.mov',
    },
  },
};
