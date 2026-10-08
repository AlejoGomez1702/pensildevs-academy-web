// Learn more about Vitest configuration options at https://vitest.dev/config/
// The Angular CLI owns `include`/`exclude` (see the `test` target in angular.json).

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true,
    sequence: { shuffle: true },
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'html', 'lcov'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
        'src/app/**/domain/**': {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
      },
    },
  },
});
