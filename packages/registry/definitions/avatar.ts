// Registry configuration for avatar component and demo

export const avatarRegistry = {
  // Main avatar component
  avatar: {
    name: 'avatar',
    description: 'An image element with a fallback for representing the user.',
    type: 'registry:ui',
    dependencies: ['expo-image'],
    registryDependencies: ['text', 'view', 'image'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/avatar.tsx',
        target: 'components/ui/avatar.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0045-avatar-demo.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0045-avatar-demo.PNG',
    },
  },

  // Default demo
  'avatar-demo': {
    name: 'avatar-demo',
    description: 'A basic avatar with image and fallback text',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/avatar/avatar-demo.tsx',
        target: 'components/demo/avatar/avatar-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0045-avatar-demo.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0045-avatar-demo.PNG',
    },
  },

  // Sizes example
  'avatar-sizes': {
    name: 'avatar-sizes',
    description: 'Avatars in different sizes',
    type: 'registry:example',
    registryDependencies: ['avatar', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/avatar/avatar-sizes.tsx',
        target: 'components/demo/avatar/avatar-sizes.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0046-avatar-sizes.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0046-avatar-sizes.PNG',
    },
  },

  // Fallback example
  'avatar-fallback': {
    name: 'avatar-fallback',
    description: 'Avatars with fallback text when no image is provided',
    type: 'registry:example',
    registryDependencies: ['avatar', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/avatar/avatar-fallback.tsx',
        target: 'components/demo/avatar/avatar-fallback.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0047-avatar-fallback.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0047-avatar-fallback.PNG',
    },
  },

  // Custom styled example
  'avatar-styled': {
    name: 'avatar-styled',
    description: 'Avatars with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['avatar', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/avatar/avatar-styled.tsx',
        target: 'components/demo/avatar/avatar-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0048-avatar-styled.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0048-avatar-styled.PNG',
    },
  },

  // Group example
  'avatar-group': {
    name: 'avatar-group',
    description: 'Multiple avatars arranged in a group layout',
    type: 'registry:example',
    registryDependencies: ['avatar', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/avatar/avatar-group.tsx',
        target: 'components/demo/avatar/avatar-group.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0049-avatar-group.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0049-avatar-group.PNG',
    },
  },

  // Status example
  'avatar-status': {
    name: 'avatar-status',
    description: 'Avatars with online/offline status indicators',
    type: 'registry:example',
    registryDependencies: ['avatar', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/avatar/avatar-status.tsx',
        target: 'components/demo/avatar/avatar-status.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0050-avatar-status.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0050-avatar-status.PNG',
    },
  },

  // Bordered example
  'avatar-bordered': {
    name: 'avatar-bordered',
    description: 'Avatars with custom borders and shadows',
    type: 'registry:example',
    registryDependencies: ['avatar', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/avatar/avatar-bordered.tsx',
        target: 'components/demo/avatar/avatar-bordered.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0051-avatar-bordered.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0051-avatar-bordered.PNG',
    },
  },
};
