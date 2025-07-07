// Registry configuration for link component and demo

export const linkRegistry = {
  // Main link component
  link: {
    name: 'link',
    description:
      'A navigation component that handles both internal and external links with customizable browser behavior.',
    type: 'registry:ui',
    dependencies: ['expo-router', 'expo-web-browser'],
    registryDependencies: ['text'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/link.tsx',
        target: 'components/ui/link.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-40-41_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-40-41_1.MP4',
    },
  },

  // Default demo
  'link-demo': {
    name: 'link-demo',
    description: 'Basic internal navigation links',
    type: 'registry:example',
    registryDependencies: ['link', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/link/link-demo.tsx',
        target: 'components/demo/link/link-demo.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-40-41_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-40-41_1.MP4',
    },
  },

  // External links example
  'link-external': {
    name: 'link-external',
    description: 'Links that open external URLs',
    type: 'registry:example',
    registryDependencies: ['link', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/link/link-external.tsx',
        target: 'components/demo/link/link-external.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-40-59_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-40-59_1.MP4',
    },
  },

  // Browser options example
  'link-browser': {
    name: 'link-browser',
    description: 'Links with different browser opening behaviors',
    type: 'registry:example',
    registryDependencies: ['link', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/link/link-browser.tsx',
        target: 'components/demo/link/link-browser.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-44-13_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-44-13_1.MP4',
    },
  },

  // Custom children example
  'link-custom': {
    name: 'link-custom',
    description: 'Links with custom child components instead of text',
    type: 'registry:example',
    registryDependencies: ['link', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/link/link-custom.tsx',
        target: 'components/demo/link/link-custom.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-50-04_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-50-04_1.MP4',
    },
  },

  // Link types example
  'link-types': {
    name: 'link-types',
    description: 'Various types of links including mailto and tel',
    type: 'registry:example',
    registryDependencies: ['link', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/link/link-types.tsx',
        target: 'components/demo/link/link-types.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-56-06_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-56-06_1.MP4',
    },
  },

  // Styled links example
  'link-styled': {
    name: 'link-styled',
    description: 'Links with custom styling and variants',
    type: 'registry:example',
    registryDependencies: ['link', 'text', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/link/link-styled.tsx',
        target: 'components/demo/link/link-styled.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-56-50_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-56-50_1.MP4',
    },
  },

  // Button-style links example
  'link-buttons': {
    name: 'link-buttons',
    description: 'Links styled as buttons for navigation',
    type: 'registry:example',
    registryDependencies: ['link', 'button', 'view'],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:example',
        path: 'templates/demo/link/link-buttons.tsx',
        target: 'components/demo/link/link-buttons.tsx',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-58-41_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-58-41_1.MP4',
    },
  },
};
