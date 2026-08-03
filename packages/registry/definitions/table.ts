// Registry configuration for table component and demo

export const tableRegistry = {
  // Main table component
  table: {
    name: 'table',
    description:
      'A flexible data table component with sorting, filtering, pagination, and search functionality.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['button', 'text', 'view'],
    hooks: ['useColor'],
    theme: ['globals'],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/table.tsx',
        target: 'components/ui/table.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0293-table-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0293-table-demo.MP4',
    },
  },

  // Default demo
  'table-demo': {
    name: 'table-demo',
    description: 'A basic data table with sample data',
    type: 'registry:example',
    registryDependencies: ['table'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/table/table-demo.tsx',
        target: 'components/demo/table/table-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0293-table-demo.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0293-table-demo.MP4',
    },
  },

  'table-sortable': {
    name: 'table-sortable',
    description: 'Table with sortable columns',
    type: 'registry:example',
    registryDependencies: ['table'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/table/table-sortable.tsx',
        target: 'components/demo/table/table-sortable.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0294-table-sortable.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0294-table-sortable.MP4',
    },
  },

  'table-custom-cells': {
    name: 'table-custom-cells',
    description: 'Table with custom cell renderers and formatting',
    type: 'registry:example',
    registryDependencies: ['table', 'avatar', 'badge', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/table/table-custom-cells.tsx',
        target: 'components/demo/table/table-custom-cells.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0295-table-custom-cells.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0295-table-custom-cells.MP4',
    },
  },

  'table-pagination': {
    name: 'table-pagination',
    description: 'Table with pagination controls',
    type: 'registry:example',
    registryDependencies: ['table'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/table/table-pagination.tsx',
        target: 'components/demo/table/table-pagination.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0296-table-pagination.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0296-table-pagination.MP4',
    },
  },

  'table-search': {
    name: 'table-search',
    description: 'Table with search functionality',
    type: 'registry:example',
    registryDependencies: ['table'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/table/table-search.tsx',
        target: 'components/demo/table/table-search.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0297-table-search.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0297-table-search.MP4',
    },
  },

  'table-loading': {
    name: 'table-loading',
    description: 'Table showing loading state',
    type: 'registry:example',
    registryDependencies: ['table', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'src/demo/table/table-loading.tsx',
        target: 'components/demo/table/table-loading.tsx',
      },
    ],
    preview: {
      light:
        'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0298-table-loading.MP4',
      dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0298-table-loading.MP4',
    },
  },
};
