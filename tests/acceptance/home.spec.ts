import { test, expect } from '@playwright/test';

test.describe('Landing Page & Visual Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render hero title, tagline, and brand identity', async ({ page }) => {
    await expect(page).toHaveTitle(/native\.cloud/);
    const heroHeading = page.locator('.hero h1');
    await expect(heroHeading).toContainText('native.cloud');

    const tagline = page.locator('.hero .tagline');
    await expect(tagline).toContainText('Shared names for common ideas');
  });

  test('should render primary CTA that navigates to compute domain', async ({ page }) => {
    const exploreCta = page.getByRole('link', { name: /Explore Ontology/i });
    await expect(exploreCta).toBeVisible();
    await exploreCta.click();
    await expect(page).toHaveURL(/\/groups\/compute\/?/);
    await expect(page.locator('main h1, [data-page-title]').first()).toContainText('compute.native.cloud');
  });

  test('should render visual OntologyCardGrid with all 8 domains', async ({ page }) => {
    const domainCards = page.locator('.ontology-domain-card');
    await expect(domainCards).toHaveCount(8);

    const domainNames = [
      'compute.native.cloud',
      'identity.native.cloud',
      'network.native.cloud',
      'storage.native.cloud',
      'tenancy.native.cloud',
      'topology.native.cloud',
      'vendor.native.cloud',
      'workload.native.cloud',
    ];

    for (const name of domainNames) {
      await expect(page.locator(`.ontology-domain-card:has-text("${name}")`)).toBeVisible();
    }
  });

  test('should navigate to domain index when clicking domain card', async ({ page }) => {
    const storageCard = page.locator('.ontology-domain-card:has-text("storage.native.cloud")');
    await storageCard.click();
    await expect(page).toHaveURL(/\/groups\/storage\/?/);
    await expect(page.locator('main h1, [data-page-title]').first()).toContainText('storage.native.cloud');
  });

  test('should have GitHub social repository link', async ({ page }) => {
    const githubLink = page.locator('footer a[href*="github.com/controlplaneio/native-cloud"]');
    await expect(githubLink.first()).toBeVisible();
  });
});
