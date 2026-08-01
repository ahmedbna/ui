import node from '@bna-ui/eslint-config/node';

export default [
  ...node,
  { ignores: ['dist/**', 'scripts/**'] },
  {
    // The CLI's visual identity lives in exactly one module. Without this rule
    // the next `import chalk` quietly re-scatters colour decisions across the
    // codebase, which is how the cyan banner and ora's default cyan ended up
    // being two separate things to find and change.
    files: ['src/**/*.ts'],
    ignores: ['src/utils/theme.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'chalk',
              message:
                'Colour lives in src/utils/theme.ts — import from there.',
            },
            {
              name: 'ora',
              message: 'Use createSpinner() from src/utils/theme.ts.',
            },
          ],
        },
      ],
    },
  },
];
