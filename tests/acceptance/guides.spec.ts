import { test, expect } from '@playwright/test';

test.describe('Reference Guides, Mobile Responsive & 404 Handling', () => {
  test('should render about page with vision and history', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('main h1, [data-page-title]').first()).toContainText('About');
    await expect(page.locator('main')).toContainText('The vision');
  });

  test('should render prefixes reference page', async ({ page }) => {
    await page.goto('/prefixes/');
    await expect(page.locator('main h1, [data-page-title]').first()).toContainText('Prefixes');
    await expect(page.locator('main')).toContainText('DNS domain names');
  });

  test('should render context uses guide pages', async ({ page }) => {
    await page.goto('/context-uses/kubernetesannotation/');
    await expect(page.locator('main h1, [data-page-title]').first()).toContainText('Kubernetes annotation');
    await expect(page.locator('main')).toContainText('metadata.annotations');
  });

  test('should render advice and tips pages', async ({ page }) => {
    await page.goto('/advice-tips/kyverno/');
    await expect(page.locator('h1')).toContainText('Kyverno');
    await expect(page.locator('body')).toContainText('ValidatingAdmissionPolicy');
  });

  test('should render 404 page when visiting non-existent path', async ({ page }) => {
    const response = await page.goto('/non-existent-page-path-12345/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('main h1, [data-page-title], #_top').first()).toContainText('404');
  });

  test('should open mobile navigation drawer on small screens', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only drawer test');

    await page.goto('/');

    const mobileMenuButton = page.locator('button[aria-label*="Menu"], button.menu-toggle, starlight-menu-button button');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      const mobileNav = page.locator('nav.sidebar, .mobile-preferences, starlight-menu-button + nav');
      await expect(mobileNav.first()).toBeVisible();
    }
  });
});
