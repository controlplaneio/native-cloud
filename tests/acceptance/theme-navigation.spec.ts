import { test, expect } from '@playwright/test';

test.describe('Theme & Interactive UI Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle theme between dark and light when clicking theme button', async ({ page }) => {
    const toggleButton = page.locator('#theme-toggle');
    await expect(toggleButton).toBeVisible();

    const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme || 'dark');
    const targetTheme = initialTheme === 'dark' ? 'light' : 'dark';

    await toggleButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', targetTheme);

    // Verify localStorage persistence
    const stored = await page.evaluate(() => localStorage.getItem('starlight-theme'));
    expect(stored).toBe(targetTheme);

    // Click again to toggle back
    await toggleButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', initialTheme);
  });

  test('should open search modal dialog on search button click', async ({ page }) => {
    const searchButton = page.locator('button[data-open-modal], site-search button');
    await expect(searchButton.first()).toBeVisible();
    await searchButton.first().click();

    const searchDialog = page.locator('dialog.pagefind-ui__dialog, dialog[aria-label="Search"], dialog.dialog-frame');
    await expect(searchDialog.first()).toBeVisible();

    const searchInput = page.locator('input.pagefind-ui__search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('baseboard');

    // Wait for Pagefind search results
    const results = page.locator('.pagefind-ui__result');
    await expect(results.first()).toBeVisible({ timeout: 5000 });
  });

  test('should render sidebar navigation links with hierarchy', async ({ page }) => {
    await page.goto('/groups/compute/');

    const sidebar = page.locator('nav.sidebar, .sidebar-pane');
    await expect(sidebar).toBeVisible();

    // Verify presence of Start Here, Context Uses, Advice & Tips, and Ontology Domains
    await expect(sidebar.getByText('Start Here')).toBeVisible();
    await expect(sidebar.getByText('Ontology Domains')).toBeVisible();
    await expect(sidebar.getByText('Compute')).toBeVisible();
  });

  test('should render On this page Table of Contents with Overview, Applicable Contexts, and Description', async ({ page }) => {
    await page.goto('/groups/compute/baseboardserialnumber/');

    // Desktop TOC
    const toc = page.locator('starlight-toc');
    await expect(toc).toBeVisible();
    await expect(toc.getByText('On this page')).toBeVisible();
    await expect(toc.getByRole('link', { name: 'Overview' })).toBeVisible();
    await expect(toc.getByRole('link', { name: 'Applicable Contexts' })).toBeVisible();
    await expect(toc.getByRole('link', { name: 'Description' })).toBeVisible();
    await expect(toc.getByRole('link', { name: 'Example Values' })).toBeVisible();

    // Clicking TOC link scrolls to target heading
    const descLink = toc.getByRole('link', { name: 'Description' });
    await descLink.click();
    await expect(page).toHaveURL(/#description$/);
  });
});
