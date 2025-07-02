// docs/registry/checkbox.ts
// Registry configuration for checkbox component and examples
export const checkboxRegistry = {
  // Main checkbox component
  checkbox: {
    name: 'checkbox',
    description:
      'A control that allows the user to toggle between checked and not checked states.',
    type: 'registry:ui',
    dependencies: ['lucide-react-native'],
    registryDependencies: ['text', 'view'],
    files: [
      {
        path: 'registry/components/ui/checkbox.tsx',
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
  'checkbox-demo': {
    name: 'checkbox-demo',
    description: 'A basic checkbox with label',
    type: 'registry:example',
    registryDependencies: ['checkbox'],
    files: [
      {
        path: 'registry/examples/checkbox/checkbox-demo.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // States example
  'checkbox-states': {
    name: 'checkbox-states',
    description:
      'Checkboxes in different states: unchecked, checked, and disabled',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/checkbox/checkbox-states.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Without label example
  'checkbox-without-label': {
    name: 'checkbox-without-label',
    description: 'A checkbox without a label',
    type: 'registry:example',
    registryDependencies: ['checkbox'],
    files: [
      {
        path: 'registry/examples/checkbox/checkbox-without-label.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // With error example
  'checkbox-with-error': {
    name: 'checkbox-with-error',
    description: 'A checkbox with error styling and message',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/checkbox/checkbox-with-error.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Custom styling example
  'checkbox-custom-styling': {
    name: 'checkbox-custom-styling',
    description: 'Checkboxes with custom label styling',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'view'],
    files: [
      {
        path: 'registry/examples/checkbox/checkbox-custom-styling.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
  },

  // Group example
  'checkbox-group': {
    name: 'checkbox-group',
    description: 'Multiple checkboxes working together as a group',
    type: 'registry:example',
    registryDependencies: ['checkbox', 'text', 'view'],
    files: [
      {
        path: 'registry/examples/checkbox/checkbox-group.tsx',
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
