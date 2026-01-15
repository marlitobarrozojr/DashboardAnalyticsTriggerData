import { PlaywrightTestConfig } from '@playwright/test';

// Environment-specific configurations
export const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 120000, // 2 minutes per test
  expect: {
    timeout: 30000 // 30 seconds for assertions
  },
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail build on CI if you accidentally left test.only in source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputDir: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  // Global setup and teardown
  globalSetup: './src/Commons/GlobalSetup.ts',
  globalTeardown: './src/Commons/GlobalTeardown.ts',
  
  use: {
    // Base URL for tests
    baseURL: process.env.BASE_URL || 'https://hrportal-qa.ehr.com',
    
    // Browser options
    headless: process.env.CI === 'true',
    viewport: { width: 1920, height: 1080 },
    
    // Artifacts
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Network options
    ignoreHTTPSErrors: true,
    
    // Permissions
    permissions: ['downloads', 'notifications']
  },
  
  // Project configurations for different environments/browsers
  projects: [
    {
      name: 'qa-chrome',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
        baseURL: 'https://hrportal-qa.ehr.com'
      }
    },
    {
      name: 'qa-firefox',
      use: { 
        ...require('@playwright/test').devices['Desktop Firefox'],
        baseURL: 'https://hrportal-qa.ehr.com'
      }
    },
    {
      name: 'staging-chrome',
      use: { 
        ...require('@playwright/test').devices['Desktop Chrome'],
        baseURL: 'https://hrportal-staging.ehr.com'
      }
    }
  ],
  
  // Output directory
  outputDir: 'test-results/'
};