import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Load environment variables from .env files
 * Priority: .env.local > .env.{NODE_ENV} > .env
 */
const environment = process.env.NODE_ENV || 'qa';
const envFiles = [
  '.env.local',
  `.env.${environment}`, 
  '.env'
];

// Load env files in order of priority
envFiles.forEach(envFile => {
  const envPath = path.resolve(__dirname, envFile);
  try {
    dotenv.config({ path: envPath, override: false });
  } catch (error) {
    // File doesn't exist, continue
  }
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: parseInt(process.env.TEST_TIMEOUT || '90000'),
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: process.env.PARALLEL === 'true',
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry configuration from env */
  retries: parseInt(process.env.RETRIES || (process.env.CI ? '2' : '0')),
  
  /* Workers configuration from env */
  workers: parseInt(process.env.WORKERS || (process.env.CI ? '1' : '4')),
  
  /* Reporter configuration */
  reporter: [
    [process.env.REPORT_FORMAT || 'html', { outputDir: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL from environment */
    baseURL: process.env.BASE_URL,

    /* Timeout configurations */
    actionTimeout: parseInt(process.env.BROWSER_TIMEOUT || '30000'),
    
    /* Viewport configuration */
    viewport: { 
      width: parseInt(process.env.VIEWPORT_WIDTH || '1920'), 
      height: parseInt(process.env.VIEWPORT_HEIGHT || '1080') 
    },

    /* Browser configuration */
    headless: process.env.HEADLESS === 'true',
    
    /* Artifacts configuration */
    screenshot: process.env.SCREENSHOT_ON_FAILURE === 'true' ? 'only-on-failure' : 'off',
    video: process.env.VIDEO_ON_FAILURE === 'true' ? 'retain-on-failure' : 'off',
    trace: process.env.TRACE_ON_FAILURE === 'true' ? 'retain-on-failure' : 'off',
    
    /* Debug configuration */
    launchOptions: {
      slowMo: parseInt(process.env.SLOW_MO || '0')
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: "chrome" },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
