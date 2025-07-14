// docs/registry/card.ts
// Registry configuration for card component and demo

export const cardRegistry = {
  // Main card component
  card: {
    name: 'card',
    description: 'Displays a card with header, content, and footer.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: ['text', 'view'],
    hooks: ['useThemeColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/card.tsx',
        target: 'components/ui/card.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5489.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5489.PNG',
    },
  },

  // Default demo
  'card-demo': {
    name: 'card-demo',
    description: 'A complete card with header, content, and footer sections',
    type: 'registry:example',
    registryDependencies: ['card', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/card/card-demo.tsx',
        target: 'components/demo/card/card-demo.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5489.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5489.PNG',
    },
  },

  // Simple card example
  'card-simple': {
    name: 'card-simple',
    description: 'A minimal card with just content',
    type: 'registry:example',
    registryDependencies: ['card'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/card/card-simple.tsx',
        target: 'components/demo/card/card-simple.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5490.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5490.PNG',
    },
  },

  // Card with image example
  'card-with-image': {
    name: 'card-with-image',
    description: 'Card featuring an image with content below',
    type: 'registry:example',
    registryDependencies: ['card', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/card/card-with-image.tsx',
        target: 'components/demo/card/card-with-image.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5492.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5492.PNG',
    },
  },

  // Card with form example
  'card-with-form': {
    name: 'card-with-form',
    description: 'Interactive card containing a login form',
    type: 'registry:example',
    registryDependencies: ['card', 'button'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/card/card-with-form.tsx',
        target: 'components/demo/card/card-with-form.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5493.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5493.PNG',
    },
  },

  // Statistics cards example
  'card-stats': {
    name: 'card-stats',
    description: 'Grid of cards displaying key metrics and statistics',
    type: 'registry:example',
    registryDependencies: ['card'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/card/card-stats.tsx',
        target: 'components/demo/card/card-stats.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5494.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5494.PNG',
    },
  },

  // Notification card example
  'card-notification': {
    name: 'card-notification',
    description: 'Card designed for displaying notifications with actions',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/card/card-notification.tsx',
        target: 'components/demo/card/card-notification.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5495.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5495.PNG',
    },
  },

  // Pricing cards example
  'card-pricing': {
    name: 'card-pricing',
    description: 'Professional pricing cards with feature lists and CTAs',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'icon'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/card/card-pricing.tsx',
        target: 'components/demo/card/card-pricing.tsx',
      },
    ],
    preview: {
      light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5496.PNG',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5496.PNG',
    },
  },
};
