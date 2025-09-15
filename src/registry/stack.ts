// Registry configuration for stack (XStack, YStack, ZStack) layout components

export const stackRegistry = {
  // Main stack component
  stack: {
    name: 'stack',
    description:
      'Layout primitives for horizontal (XStack), vertical (YStack), and overlay (ZStack) stacking with gap, alignment, and shorthand props.',
    type: 'registry:ui',
    dependencies: [],
    registryDependencies: [],
    hooks: [],
    theme: [],
    files: [
      {
        type: 'registry:ui',
        path: 'templates/components/ui/stack.tsx',
        target: 'components/ui/stack.tsx',
      },
    ],
  },
};
