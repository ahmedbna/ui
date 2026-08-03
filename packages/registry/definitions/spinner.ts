// Registry configuration for spinner component and demo

export const spinnerRegistry = {
  // Main spinner component
  spinner: {
    name: 'spinner',
    description:
      'A loading indicator component with multiple variants and customization options.',
    type: 'registry:ui',
    dependencies: [
      'lucide-react-native',
      'react-native-reanimated',
      'react-native-worklets',
    ],
    registryDependencies: ['text'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/spinner.tsx',
        target: 'components/ui/spinner.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0279-spinner-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0279-spinner-demo.MP4',
    },
  },

  // Default demo
  'spinner-demo': {
    name: 'spinner-demo',
    description: 'A basic spinner with default styling',
    type: 'registry:example',
    registryDependencies: ['spinner'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-demo.tsx',
        target: 'components/demo/spinner/spinner-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0279-spinner-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0279-spinner-demo.MP4',
    },
  },

  // Variants example
  'spinner-variants': {
    name: 'spinner-variants',
    description:
      'Different spinner variants: default, circle, dots, pulse, and bars',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-variants.tsx',
        target: 'components/demo/spinner/spinner-variants.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0280-spinner-variants.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0280-spinner-variants.MP4',
    },
  },

  // Sizes example
  'spinner-sizes': {
    name: 'spinner-sizes',
    description: 'Spinners in different sizes: sm, default, lg, and icon',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-sizes.tsx',
        target: 'components/demo/spinner/spinner-sizes.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0281-spinner-sizes.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0281-spinner-sizes.MP4',
    },
  },

  // Labels example
  'spinner-labels': {
    name: 'spinner-labels',
    description: 'Spinners with custom loading labels',
    type: 'registry:example',
    registryDependencies: ['spinner', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-labels.tsx',
        target: 'components/demo/spinner/spinner-labels.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0282-spinner-labels.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0282-spinner-labels.MP4',
    },
  },

  // Speeds example
  'spinner-speeds': {
    name: 'spinner-speeds',
    description:
      'Spinners with different animation speeds: slow, normal, and fast',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-speeds.tsx',
        target: 'components/demo/spinner/spinner-speeds.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0283-spinner-speeds.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0283-spinner-speeds.MP4',
    },
  },

  // Colors example
  'spinner-colors': {
    name: 'spinner-colors',
    description: 'Spinners with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-colors.tsx',
        target: 'components/demo/spinner/spinner-colors.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0284-spinner-colors.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0284-spinner-colors.MP4',
    },
  },

  // Overlay example
  'spinner-overlay': {
    name: 'spinner-overlay',
    description: 'Full-screen loading overlay with backdrop',
    type: 'registry:example',
    registryDependencies: ['spinner', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-overlay.tsx',
        target: 'components/demo/spinner/spinner-overlay.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0285-spinner-overlay.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0285-spinner-overlay.MP4',
    },
  },

  // Inline example
  'spinner-inline': {
    name: 'spinner-inline',
    description: 'Small spinners for inline usage in buttons or text',
    type: 'registry:example',
    registryDependencies: ['spinner', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/spinner/spinner-inline.tsx',
        target: 'components/demo/spinner/spinner-inline.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0286-spinner-inline.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0286-spinner-inline.MP4',
    },
  },
};
