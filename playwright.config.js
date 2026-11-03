// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries:0,

  use:{
    actionTimeout: 10* 1000,
    navigationTimeout: 30* 1000,
    //Browser OPtions
    browserName: 'chromium',
    headless: true,
    screenshot : 'on',
    trace : 'retain_on_failure',
  },

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  


});

module.exports = config;

