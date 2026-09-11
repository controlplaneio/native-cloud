import { defineConfig, devices } from '@playwright/test';
import { execFileSync } from 'node:child_process';

const PORT = process.env.PORT || 4321;
const BASE_URL = `http://localhost:${PORT}`;

function checkForBun() {
  try {
    execFileSync('bun', ['--version'], { stdio: 'ignore' });
    return true
  } catch {
    return false
  }
}

const hasBun = checkForBun()

export default defineConfig({
  testDir: './tests/acceptance',
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: `${hasBun ? "bun" : "npm"} run preview -- --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 30_000,
  },
});
