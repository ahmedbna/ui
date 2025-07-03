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
    files: [
      {
        path: 'registry/components/ui/link.tsx',
        type: 'registry:ui',
        target: '',
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
    files: [
      {
        path: 'registry/demo/link/link-demo.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/link/link-external.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/link/link-browser.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/link/link-custom.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/link/link-types.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/link/link-styled.tsx',
        type: 'registry:example',
        target: '',
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
    files: [
      {
        path: 'registry/demo/link/link-buttons.tsx',
        type: 'registry:example',
        target: '',
      },
    ],
    preview: {
      light:
        'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-58-41_1.MP4',
      dark: 'https://bna-ui.s3.eu-north-1.amazonaws.com/ScreenRecording_07-01-2025 06-58-41_1.MP4',
    },
  },
};
