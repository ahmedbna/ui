// Registry configuration for avatar component and demo

export const avatarRegistry = {
  // Main avatar component
  avatar: {
    name: 'avatar',
    description: 'An image element with a fallback for representing the user.',
    type: 'registry:ui',
    dependencies: ['expo-image'],
    registryDependencies: ['text', 'view', 'image'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/avatar.tsx',
        target: 'components/ui/avatar.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5446.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5446.PNG',
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
        path: 'templates/demo/avatar/avatar-demo.tsx',
        target: 'components/demo/avatar/avatar-demo.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5446.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5446.PNG',
    },
  },

  // Sizes example
  'avatar-sizes': {
    name: 'avatar-sizes',
    description: 'Avatars in different sizes',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avatar/avatar-sizes.tsx',
        target: 'components/demo/avatar/avatar-sizes.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5447.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5447.PNG',
    },
  },

  // Fallback example
  'avatar-fallback': {
    name: 'avatar-fallback',
    description: 'Avatars with fallback text when no image is provided',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avatar/avatar-fallback.tsx',
        target: 'components/demo/avatar/avatar-fallback.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5448.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5448.PNG',
    },
  },

  // Custom styled example
  'avatar-styled': {
    name: 'avatar-styled',
    description: 'Avatars with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avatar/avatar-styled.tsx',
        target: 'components/demo/avatar/avatar-styled.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5449.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5449.PNG',
    },
  },

  // Group example
  'avatar-group': {
    name: 'avatar-group',
    description: 'Multiple avatars arranged in a group layout',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avatar/avatar-group.tsx',
        target: 'components/demo/avatar/avatar-group.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5450.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5450.PNG',
    },
  },

  // Status example
  'avatar-status': {
    name: 'avatar-status',
    description: 'Avatars with online/offline status indicators',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avatar/avatar-status.tsx',
        target: 'components/demo/avatar/avatar-status.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5451.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5451.PNG',
    },
  },

  // Bordered example
  'avatar-bordered': {
    name: 'avatar-bordered',
    description: 'Avatars with custom borders and shadows',
    type: 'registry:example',
    registryDependencies: ['avatar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/avatar/avatar-bordered.tsx',
        target: 'components/demo/avatar/avatar-bordered.tsx',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5452.PNG',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/IMG_5452.PNG',
    },
  },
};
