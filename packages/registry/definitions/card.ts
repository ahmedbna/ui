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
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/card.tsx',
        target: 'components/ui/card.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0090-card-demo.PNG',
      dark: 'https://ui.ahmedbna.com/0090-card-demo.PNG',
    },
  },

  // Default demo
  'card-demo': {
    name: 'card-demo',
    description: 'A complete card with header, content, and footer sections',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/card/card-demo.tsx',
        target: 'components/demo/card/card-demo.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0090-card-demo.PNG',
      dark: 'https://ui.ahmedbna.com/0090-card-demo.PNG',
    },
  },

  // Simple card example
  'card-simple': {
    name: 'card-simple',
    description: 'A minimal card with just content',
    type: 'registry:example',
    registryDependencies: ['card', 'text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/card/card-simple.tsx',
        target: 'components/demo/card/card-simple.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0091-card-simple.PNG',
      dark: 'https://ui.ahmedbna.com/0091-card-simple.PNG',
    },
  },

  // Card with image example
  'card-with-image': {
    name: 'card-with-image',
    description: 'Card featuring an image with content below',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/card/card-with-image.tsx',
        target: 'components/demo/card/card-with-image.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0092-card-with-image.PNG',
      dark: 'https://ui.ahmedbna.com/0092-card-with-image.PNG',
    },
  },

  // Card with form example
  'card-with-form': {
    name: 'card-with-form',
    description: 'Interactive card containing a login form',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'text', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/card/card-with-form.tsx',
        target: 'components/demo/card/card-with-form.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0093-card-with-form.PNG',
      dark: 'https://ui.ahmedbna.com/0093-card-with-form.PNG',
    },
  },

  // Statistics cards example
  'card-stats': {
    name: 'card-stats',
    description: 'Grid of cards displaying key metrics and statistics',
    type: 'registry:example',
    registryDependencies: ['card', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/card/card-stats.tsx',
        target: 'components/demo/card/card-stats.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0094-card-stats.PNG',
      dark: 'https://ui.ahmedbna.com/0094-card-stats.PNG',
    },
  },

  // Notification card example
  'card-notification': {
    name: 'card-notification',
    description: 'Card designed for displaying notifications with actions',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'icon', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/card/card-notification.tsx',
        target: 'components/demo/card/card-notification.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0095-card-notification.PNG',
      dark: 'https://ui.ahmedbna.com/0095-card-notification.PNG',
    },
  },

  // Pricing cards example
  'card-pricing': {
    name: 'card-pricing',
    description: 'Professional pricing cards with feature lists and CTAs',
    type: 'registry:example',
    registryDependencies: ['card', 'button', 'icon', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/card/card-pricing.tsx',
        target: 'components/demo/card/card-pricing.tsx',
      },
    ],
    preview: {
      light: 'https://ui.ahmedbna.com/0096-card-pricing.PNG',
      dark: 'https://ui.ahmedbna.com/0096-card-pricing.PNG',
    },
  },
};
