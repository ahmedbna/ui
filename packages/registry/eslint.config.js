import node from '@bna-ui/eslint-config/node';

export default [
  ...node,
  // src/ holds React Native source that is copied into user projects; it is
  // typechecked by tsconfig.src.json and linted in the playground's context.
  { ignores: ['dist/**', 'generated/**', 'src/**'] },
];
