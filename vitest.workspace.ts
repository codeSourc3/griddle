import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: './vite.config.ts',
    test: {
      include: ['test/unit/**/*.{test,spec}.ts',
        'test/**/*.unit.{test,spec}.ts'
      ],
      includeTaskLocation: true,
      name:'unit',
      setupFiles: ['./setup-file.ts', './vitest-unit-setup.ts'],
      browser: {
        enabled: true,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [
          {browser: 'chromium'}
        ]
      },
    },
  },{
    extends: './vite.config.ts',
    test: {
      include: ['test/integration/**/*.{test,spec}.ts',
        'test/**/*.integration.{test,spec}.ts'
      ],
      includeTaskLocation: true,
      name:'integration',
      setupFiles: ['./setup-file.ts', './vitest-integration-setup.ts'],
      browser: {
        enabled: true,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [
          {browser: 'chromium'}
        ],
        headless: false
      },
    },
  }
])