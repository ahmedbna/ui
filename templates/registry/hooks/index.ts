export const hooksRegistry = {
  useBottomTabOverflow: {
    name: 'useBottomTabOverflow',
    description: 'useBottomTabOverflow',
    type: 'registry:hook',
    dependencies: ['@react-navigation/bottom-tabs'],
    files: [
      {
        type: 'registry:hook',
        path: 'templates/hooks/useBottomTabOverflow.ts',
        target: 'hooks/useBottomTabOverflow.ts',
      },
    ],
  },

  useColorScheme: {
    name: 'useColorScheme',
    description: 'useColorScheme',
    type: 'registry:hook',
    dependencies: [],
    files: [
      {
        type: 'registry:hook',
        path: 'templates/hooks/useColorScheme.ts',
        target: 'hooks/useColorScheme.ts',
      },
      {
        type: 'registry:hook',
        path: 'templates/hooks/useColorScheme.web.ts',
        target: 'hooks/useColorScheme.web.ts',
      },
    ],
  },

  useModeToggle: {
    name: 'useModeToggle',
    description: 'useModeToggle',
    type: 'registry:hook',
    dependencies: [],
    hooks: ['useColorScheme'],
    files: [
      {
        type: 'registry:hook',
        path: 'templates/hooks/useModeToggle.tsx',
        target: 'hooks/useModeToggle.tsx',
      },
    ],
  },

  useThemeColor: {
    name: 'useThemeColor',
    description: 'useThemeColor',
    type: 'registry:hook',
    dependencies: [],
    hooks: ['useColorScheme'],
    theme: ['colors'],
    files: [
      {
        type: 'registry:hook',
        path: 'templates/hooks/useThemeColor.ts',
        target: 'hooks/useThemeColor.ts',
      },
    ],
  },
};
