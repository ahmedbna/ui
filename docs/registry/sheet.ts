// Registry configuration for sheet component and examples

export const sheetRegistry = {
  // Main sheet component
  sheet: {
    name: 'sheet',
    description:
      'A modal component that slides in from the side of the screen, commonly used for navigation menus, filters, and detail views.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['button', 'text', 'view'],
    files: [
      {
        path: 'registry/components/ui/sheet.tsx',
        type: 'registry:ui',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Default demo
  'sheet-demo': {
    name: 'sheet-demo',
    description: 'A basic sheet that slides in from the right side',
    type: 'registry:example',
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/sheet/sheet-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'sheet-left': {
    name: 'sheet-left',
    description: 'A sheet that slides in from the left side',
    type: 'registry:example',
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/sheet/sheet-left.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'sheet-navigation': {
    name: 'sheet-navigation',
    description: 'A sheet that slides in from the navigation side',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/sheet/sheet-navigation.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'sheet-form': {
    name: 'sheet-form',
    description: 'A sheet that slides in from the form side',
    type: 'registry:example',
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/sheet/sheet-form.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  'sheet-filter': {
    name: 'sheet-filter',
    description: 'A sheet that slides in from the filter side',
    type: 'registry:example',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['sheet', 'button', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/sheet/sheet-filter.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },
};
