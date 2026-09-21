import { test, expect } from '@playwright/test';

test.describe('Ontology Specifications & Custom Components', () => {
  test('should render group index page with GroupKeysTable', async ({ page }) => {
    await page.goto('/groups/compute/');

    await expect(page.locator('main h1, [data-page-title]').first()).toContainText('compute.native.cloud');
    
    // Check GroupKeysTable presence
    const table = page.locator('table');
    await expect(table).toBeVisible();

    const baseboardRow = table.locator('tr:has-text("compute.native.cloud/baseboardSerialNumber")');
    await expect(baseboardRow).toBeVisible();

    // Click row link to navigate to key page
    const keyLink = baseboardRow.locator('a');
    await keyLink.click();
    await expect(page).toHaveURL(/\/groups\/compute\/baseboardserialnumber\/?/);
  });

  test('should render KeyHeader, ContextBadges, and ExampleValues on key page', async ({ page }) => {
    await page.goto('/groups/compute/baseboardserialnumber/');

    // 1. KeyHeader
    const keyHeader = page.locator('.key-header-card');
    await expect(keyHeader).toBeVisible();
    await expect(keyHeader.locator('.key-code')).toHaveText('compute.native.cloud/baseboardSerialNumber');

    // 2. ContextBadges
    const badges = page.locator('.context-badges-grid');
    await expect(badges).toBeVisible();
    
    // Annotation enabled, Label disabled
    const annotationBadge = badges.locator('.context-badge:has-text("Annotation"):not(:has-text("OCI"))');
    await expect(annotationBadge).toHaveClass(/enabled/);

    const labelBadge = badges.locator('.context-badge:has-text("Label")');
    await expect(labelBadge).toHaveClass(/disabled/);

    // 3. Validation Constraint Aside
    const aside = page.locator('aside.starlight-aside');
    await expect(aside).toBeVisible();

    // 4. ExampleValues
    const exampleValues = page.locator('.example-values-list');
    await expect(exampleValues).toBeVisible();
    await expect(exampleValues.locator('.example-value-item').first()).toBeVisible();
  });

  test('should render ContextBadges in consistent canonical order across different keys', async ({ page }) => {
    await page.goto('/groups/compute/baseboardserialnumber/');
    const badges1 = page.locator('.context-badges-grid .context-badge > span:first-child');
    const texts1 = await badges1.allTextContents();
    expect(texts1).toEqual(['Annotation', 'Label', 'Taint', 'ResourceClaim', 'OCI annotation']);

    await page.goto('/groups/storage/retentionduration/');
    const badges2 = page.locator('.context-badges-grid .context-badge > span:first-child');
    const texts2 = await badges2.allTextContents();
    expect(texts2).toEqual(['Annotation', 'Label', 'Taint', 'ResourceClaim', 'OCI annotation']);
  });

  test('should render AllowedValues component for enumerated keys', async ({ page }) => {
    await page.goto('/groups/compute/virtualized/');

    const keyHeader = page.locator('.key-header-card');
    await expect(keyHeader.locator('.key-code')).toHaveText('compute.native.cloud/virtualized');

    // Check AllowedValues component
    const allowedValuesList = page.locator('.example-values-list');
    await expect(allowedValuesList).toBeVisible();

    // Check specific allowed values: "true", "false"
    await expect(page.locator('.example-value-item:has-text("true")')).toBeVisible();
    await expect(page.locator('.example-value-item:has-text("false")')).toBeVisible();
  });
});
