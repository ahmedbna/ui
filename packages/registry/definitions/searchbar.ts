// Registry configuration for searchbar component and demo

export const searchbarRegistry = {
  // Main searchbar component
  searchbar: {
    name: 'searchbar',
    description:
      'A customizable search input with debouncing, loading states, and suggestions.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['icon', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/searchbar.tsx',
        target: 'components/ui/searchbar.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0248-searchbar-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0248-searchbar-demo.MP4',
    },
  },

  // Default demo
  'searchbar-demo': {
    name: 'searchbar-demo',
    description: 'A basic search bar with search functionality',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/searchbar/searchbar-demo.tsx',
        target: 'components/demo/searchbar/searchbar-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0248-searchbar-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0248-searchbar-demo.MP4',
    },
  },

  // Loading state example
  'searchbar-loading': {
    name: 'searchbar-loading',
    description: 'Search bar with loading indicator',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/searchbar/searchbar-loading.tsx',
        target: 'components/demo/searchbar/searchbar-loading.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0249-searchbar-loading.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0249-searchbar-loading.MP4',
    },
  },

  // Custom icons example
  'searchbar-icons': {
    name: 'searchbar-icons',
    description: 'Search bar with custom left and right icons',
    type: 'registry:example',
    registryDependencies: ['searchbar', 'icon', 'view'],
    hooks: ['useColor'],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/searchbar/searchbar-icons.tsx',
        target: 'components/demo/searchbar/searchbar-icons.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0250-searchbar-icons.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0250-searchbar-icons.MP4',
    },
  },

  // Suggestions example
  'searchbar-suggestions': {
    name: 'searchbar-suggestions',
    description: 'Search bar with dropdown suggestions',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/searchbar/searchbar-suggestions.tsx',
        target: 'components/demo/searchbar/searchbar-suggestions.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0251-searchbar-suggestions.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0251-searchbar-suggestions.MP4',
    },
  },

  // Custom styled example
  'searchbar-styled': {
    name: 'searchbar-styled',
    description: 'Search bar with custom styling and colors',
    type: 'registry:example',
    registryDependencies: ['searchbar', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/searchbar/searchbar-styled.tsx',
        target: 'components/demo/searchbar/searchbar-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0252-searchbar-styled.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0252-searchbar-styled.MP4',
    },
  },

  // No clear button example
  'searchbar-no-clear': {
    name: 'searchbar-no-clear',
    description: 'Search bar without the clear button',
    type: 'registry:example',
    registryDependencies: ['searchbar'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/searchbar/searchbar-no-clear.tsx',
        target: 'components/demo/searchbar/searchbar-no-clear.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0253-searchbar-no-clear.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0253-searchbar-no-clear.MP4',
    },
  },

  // Instant search example
  'searchbar-instant': {
    name: 'searchbar-instant',
    description: 'Search bar with no debounce for instant search',
    type: 'registry:example',
    registryDependencies: ['searchbar', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/searchbar/searchbar-instant.tsx',
        target: 'components/demo/searchbar/searchbar-instant.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0254-searchbar-instant.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0254-searchbar-instant.MP4',
    },
  },
};
