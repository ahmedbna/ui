import node from '@bna-ui/eslint-config/node';

export default [
  ...node,
  {
    // Only this package's own tooling is linted here. `start/` and `overlays/`
    // are template payloads copied into a user's project — they ship with their
    // own eslint.config.js and are linted there.
    ignores: ['dist/**', 'start/**', 'overlays/**'],
  },
];
