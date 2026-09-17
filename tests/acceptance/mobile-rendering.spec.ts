import { test, expect } from '@playwright/test';

test.describe('Mobile Phone Viewport Rendering & Layout Defenses', () => {
  const SAMPLE_KEY_ROUTES = [
    '/groups/compute/baseboardserialnumber/',
    '/groups/compute/outsidethermaltolerance/',
    '/groups/identity/minimumremainingcertificatevalidity/',
    '/groups/identity/useruniqueidentifier/',
    '/groups/storage/eligiblefordeletionafter/',
    '/groups/storage/retentionduration/',
    '/groups/tenancy/tenancymodel/',
    '/groups/vendor/servicelevelagreementurls/',
    '/groups/vendor/usbvendorid/',
    '/groups/workload/documentationlandingpageurl/',
    '/groups/workload/sourcecoderepositoryurl/',
  ];

  const SAMPLE_CONTENT_ROUTES = [
    '/',
    '/about/',
    '/prefixes/',
    '/advice-tips/',
    '/advice-tips/contexts/',
    '/advice-tips/ease-of-adoption/',
    '/advice-tips/kubernetes-quantities/',
    '/groups/compute/',
    '/groups/identity/',
    '/groups/storage/',
    '/groups/tenancy/',
    '/groups/vendor/',
    '/groups/workload/',
    '/404.html',
  ];

  test('should render key pages without horizontal viewport overflow or clipped key-code on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    for (const route of SAMPLE_KEY_ROUTES) {
      await page.goto(route);

      // Verify no document horizontal scroll overflow
      const docOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });
      expect(docOverflow, `Route ${route} should not have horizontal overflow`).toBeLessThanOrEqual(1);

      // Verify .key-code element is contained within .key-header-card
      const codeContained = await page.evaluate(() => {
        const code = document.querySelector('.key-code');
        const card = document.querySelector('.key-header-card');
        if (!code || !card) return true;
        const codeRect = code.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        return codeRect.right <= cardRect.right + 2;
      });
      expect(codeContained, `Route ${route} .key-code should stay inside .key-header-card`).toBe(true);
    }
  });

  test('should render general content pages without horizontal viewport overflow on small phone (320px)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });

    for (const route of SAMPLE_CONTENT_ROUTES) {
      await page.goto(route);
      const docOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth - window.innerWidth;
      });
      expect(docOverflow, `Route ${route} should not overflow 320px viewport`).toBeLessThanOrEqual(1);
    }
  });

  test('should render usbVendorId with visible Example Values component on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/groups/vendor/usbvendorid/');

    const exampleHeading = page.locator('#example-values');
    await expect(exampleHeading).toBeVisible();

    const exampleValues = page.locator('.example-value-item');
    await expect(exampleValues).toHaveCount(4);
    await expect(exampleValues.nth(0)).toContainText('1d6b');
    await expect(exampleValues.nth(1)).toContainText('046d');
    await expect(exampleValues.nth(2)).toContainText('045e');
    await expect(exampleValues.nth(3)).toContainText('8086');
  });

  test('should render tenancyModel with clean bold bullet items without Kramdown artifacts', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/groups/tenancy/tenancymodel/');

    const descList = page.locator('main ul');
    await expect(descList.first()).toBeVisible();

    const text = await page.locator('main').textContent();
    // Ensure no raw Kramdown ': :' artifacts remain
    expect(text).not.toContain(': :');
    expect(text).toContain('dedicated — Infrastructure is dedicated');
    expect(text).toContain('pooled — Infrastructure is shared');
    expect(text).toContain('hybrid — A mix of dedicated');
  });

  test('should render retentionDuration with correct unit minutes definition and combined examples', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/groups/storage/retentionduration/');

    const bodyText = await page.locator('main').textContent();
    expect(bodyText).toContain('2y6m - 2 years and 6 minutes');
    expect(bodyText).toContain('30d12h - 30 days and 12 hours');
    expect(bodyText).not.toContain('2 years and 6 months');
  });

  test('should toggle mobile navigation drawer and display sidebar links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/groups/compute/');

    const menuBtn = page.locator('button.sl-menu-button, button:has-text("Menu"), button[aria-label*="Menu"]');
    await expect(menuBtn.first()).toBeVisible();

    // Open drawer
    await menuBtn.first().click();
    const sidebar = page.locator('#starlight__sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByText('Ontology Domains')).toBeVisible();

    // Close drawer
    await menuBtn.first().click();
  });
});
