// Registry configuration for badge component and demo

export const badgeRegistry = {
  // Main badge component
  badge: {
    name: 'badge',
    description: 'A small status descriptor for UI elements.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/badge.tsx',
        target: 'components/ui/badge.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0058-badge-demo.PNG',
      dark: 'https://ui.ahmedbna.com/0058-badge-demo.PNG',
    },
  },

  // Default demo
  'badge-demo': {
    name: 'badge-demo',
    description: 'Basic badges showing all available variants',
    type: 'registry:example',
    registryDependencies: ['badge', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/badge/badge-demo.tsx',
        target: 'components/demo/badge/badge-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0058-badge-demo.PNG',
      dark: 'https://ui.ahmedbna.com/0058-badge-demo.PNG',
    },
  },

  // Icons example
  'badge-icons': {
    name: 'badge-icons',
    description: 'Badges with icons and custom content',
    type: 'registry:example',
    registryDependencies: ['badge', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/badge/badge-icons.tsx',
        target: 'components/demo/badge/badge-icons.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0059-badge-icons.PNG',
      dark: 'https://ui.ahmedbna.com/0059-badge-icons.PNG',
    },
  },

  // Notifications example
  'badge-notifications': {
    name: 'badge-notifications',
    description: 'Small notification badges for counters and status',
    type: 'registry:example',
    registryDependencies: ['badge', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/badge/badge-notifications.tsx',
        target: 'components/demo/badge/badge-notifications.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0060-badge-notifications.PNG',
      dark: 'https://ui.ahmedbna.com/0060-badge-notifications.PNG',
    },
  },

  // Custom styled example
  'badge-styled': {
    name: 'badge-styled',
    description: 'Badges with custom colors and styling',
    type: 'registry:example',
    registryDependencies: ['badge', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/badge/badge-styled.tsx',
        target: 'components/demo/badge/badge-styled.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0061-badge-styled.PNG',
      dark: 'https://ui.ahmedbna.com/0061-badge-styled.PNG',
    },
  },

  // Interactive example
  'badge-interactive': {
    name: 'badge-interactive',
    description: 'Badges that can be pressed or dismissed',
    type: 'registry:example',
    registryDependencies: ['badge', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/badge/badge-interactive.tsx',
        target: 'components/demo/badge/badge-interactive.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0062-badge-interactive.PNG',
      dark: 'https://ui.ahmedbna.com/0062-badge-interactive.PNG',
    },
  },

  // Sizes example
  'badge-sizes': {
    name: 'badge-sizes',
    description: 'Badges in different sizes',
    type: 'registry:example',
    registryDependencies: ['badge', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/badge/badge-sizes.tsx',
        target: 'components/demo/badge/badge-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0063-badge-sizes.PNG',
      dark: 'https://ui.ahmedbna.com/0063-badge-sizes.PNG',
    },
  },

  // Status example
  'badge-status': {
    name: 'badge-status',
    description: 'Badges used as status indicators',
    type: 'registry:example',
    registryDependencies: ['badge', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/badge/badge-status.tsx',
        target: 'components/demo/badge/badge-status.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0064-badge-status.PNG',
      dark: 'https://ui.ahmedbna.com/0064-badge-status.PNG',
    },
  },
};
