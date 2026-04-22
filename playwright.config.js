// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Increase timeout for slower CI environments
  timeout: 60000, 
  expect: {
    timeout: 10000,
  },
  
  testDir: './tests',
  fullyParallel: true,
  projects: [
    {
      name: 'API',
      testMatch: 'api/**/*.spec.js', 
      
    },
    {
      name: 'UI',
      testMatch: 'ui/**/*.spec.js', 
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only to reduce test flakiness */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI to avoid resource contention */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporters configuration */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  /* Shared settings for all projects */
  use: {
    /* Collect trace, screenshots, and videos only when a test fails */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment other browsers if needed
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});