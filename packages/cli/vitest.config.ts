import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    // Several suites chdir into a temp directory and stub process env; running
    // them in one process would let that leak between files.
    isolate: true,
    // `NODE_ENV=test` is what suppresses the update notifier's network call.
    env: { NODE_ENV: 'test' },
  },
});
