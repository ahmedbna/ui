// Registry configuration for badge component and demo

export const badgeRegistry = {
  // Main badge component
  badge: {
    name: 'badge',
    description: 'A small status descriptor for UI elements.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/badge.tsx',
        target: 'components/ui/badge.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5453.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5453.PNG',
    },
  },

  // Default demo
  'badge-demo': {
    name: 'badge-demo',
    description: 'Basic badges showing all available variants',
    type: 'registry:example',
    registryDependencies: ['badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/badge/badge-demo.tsx',
        target: 'components/demo/badge/badge-demo.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5453.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5453.PNG',
    },
  },

  // Icons example
  'badge-icons': {
    name: 'badge-icons',
    description: 'Badges with icons and custom content',
    type: 'registry:example',
    registryDependencies: ['badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/badge/badge-icons.tsx',
        target: 'components/demo/badge/badge-icons.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5454.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5454.PNG',
    },
  },

  // Notifications example
  'badge-notifications': {
    name: 'badge-notifications',
    description: 'Small notification badges for counters and status',
    type: 'registry:example',
    registryDependencies: ['badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/badge/badge-notifications.tsx',
        target: 'components/demo/badge/badge-notifications.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5455.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5455.PNG',
    },
  },

  // Custom styled example
  'badge-styled': {
    name: 'badge-styled',
    description: 'Badges with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/badge/badge-styled.tsx',
        target: 'components/demo/badge/badge-styled.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5456.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5456.PNG',
    },
  },

  // Interactive example
  'badge-interactive': {
    name: 'badge-interactive',
    description: 'Badges that can be pressed or dismissed',
    type: 'registry:example',
    registryDependencies: ['badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/badge/badge-interactive.tsx',
        target: 'components/demo/badge/badge-interactive.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5457.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5457.PNG',
    },
  },

  // Sizes example
  'badge-sizes': {
    name: 'badge-sizes',
    description: 'Badges in different sizes',
    type: 'registry:example',
    registryDependencies: ['badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/badge/badge-sizes.tsx',
        target: 'components/demo/badge/badge-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5458.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5458.PNG',
    },
  },

  // Status example
  'badge-status': {
    name: 'badge-status',
    description: 'Badges used as status indicators',
    type: 'registry:example',
    registryDependencies: ['badge'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/badge/badge-status.tsx',
        target: 'components/demo/badge/badge-status.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5460.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5460.PNG',
    },
  },
};
