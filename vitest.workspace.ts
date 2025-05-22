import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: './vite.config.ts',
    test: {
      includeTaskLocation: true,
      name:'integration:ui',
      setupFiles: ['./setup-file.ts'],
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
      includeTaskLocation: true,
      name:'integration',
      setupFiles: ['./setup-file.ts'],
      browser: {
        enabled: true,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [
          {browser: 'chromium'}
        ],
        headless: true
      },
    },
  }
])