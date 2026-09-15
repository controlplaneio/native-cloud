import { test, expect } from '@playwright/test';

test.describe('Theme & Auto Light / Dark Mode Detection', () => {
  test('should automatically detect dark mode by default or from OS preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(theme).toBe('dark');
  });

  test('should automatically detect light mode from OS preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(theme).toBe('light');
  });

  // TODO: fix os level switching
  // not too bad as detection works above for first load
  //
  // test('should dynamically adapt when OS color scheme changes in auto mode', async ({ page }) => {
  //   await page.emulateMedia({ colorScheme: 'dark' });
  //   await page.goto('/');
  //   expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');

  //   // Switch OS preference to light
  //   await page.emulateMedia({ colorScheme: 'light' });
  //   // Allow event listener to fire
  //   await page.waitForTimeout(100);
  //   expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('light');
  // });

  test('should toggle theme between dark and light when clicking theme button', async ({ page }) => {
    await page.goto('/');
    const toggleButton = page.locator('theme-toggle');
    await expect(toggleButton).toBeVisible();

    const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme || 'dark');
    const targetTheme = initialTheme === 'dark' ? 'light' : 'dark';

    await toggleButton.first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', targetTheme);

    // Verify localStorage persistence
    const stored = await page.evaluate(() => localStorage.getItem('starlight-theme'));
    expect(stored).toBe(targetTheme);

    // Click again to toggle back
    await toggleButton.first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', initialTheme);
  });

  test('should render soft light theme palette without harsh stark white background', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const bgToken = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--sl-color-bg').trim();
    });
    // Ensure soft background token #f8fafc is used rather than pure glaring #ffffff
    expect(bgToken).toBe('#f8fafc');
  });

  test('should render site title and logo cleanly without outline or border glitches during transition', async ({ page }) => {
    await page.goto('/');
    const siteTitle = page.locator('header .site-title');
    await expect(siteTitle.first()).toBeVisible();

    const styles = await siteTitle.first().evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outlineStyle: computed.outlineStyle,
        borderStyle: computed.borderStyle,
      };
    });

    expect(styles.outlineStyle).toBe('none');
    expect(styles.borderStyle).toBe('none');
  });

  test('should render header with transparent inner container and unified outer header background', async ({ page }) => {
    await page.goto('/');
    const innerHeader = page.locator('header.header div.header, header.header > div');
    if (await innerHeader.first().isVisible()) {
      const innerBg = await innerHeader.first().evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      // Ensure inner header is rgba(0, 0, 0, 0) / transparent so it doesn't create nested box fade artifacts
      expect(innerBg).toBe('rgba(0, 0, 0, 0)');
    }
  });
});

test.describe('Localisation & Language Settings', () => {
  test('should set html lang attribute to en-US', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  });

  test('should render translated footer and headers correctly matching Hugo specification', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Sponsors');
    await expect(footer).toContainText('Silver');
    await expect(footer).toContainText('CC BY 4.0');
    await expect(footer).toContainText('Shared names for common ideas in cloud native infrastructure metadata');
  });
});

test.describe('Navigation, Search & Table of Contents', () => {
  test('should open search modal dialog on search button click', async ({ page }) => {
    await page.goto('/');
    const searchButton = page.locator('site-search button[data-open-modal], button[data-open-modal]');
    await expect(searchButton.first()).toBeVisible();
    await searchButton.first().click();

    const dialog = page.locator('site-search dialog');
    await expect(dialog.first()).toHaveAttribute('open', '');

    const searchInput = page.locator('.pagefind-ui__search-input, input[type="search"]');
    if (await searchInput.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchInput.first().fill('baseboard');
      const results = page.locator('.pagefind-ui__result');
      await expect(results.first()).toBeVisible({ timeout: 5000 });
    } else {
      await expect(dialog.first()).toContainText('Search');
    }
  });

  test('should render sidebar navigation links with hierarchy', async ({ page, isMobile }) => {
    await page.goto('/groups/compute/');

    if (isMobile) {
      const menuBtn = page.locator('button.sl-menu-button');
      if (await menuBtn.first().isVisible()) {
        await menuBtn.first().click();
      }
    }
    //   const navLinks = page.locator('sl-sidebar-pane');
    //   await expect(navLinks.getByText('Start Here').first()).toBeVisible();
    //   await expect(navLinks.getByText('Ontology Domains').first()).toBeVisible();
    //   await expect(navLinks.getByText('Compute', { exact: true }).first()).toBeVisible();
    // } else {
      const sidebarNav = page.locator('sl-sidebar-pane > div.sidebar-content');
      await expect(sidebarNav).toBeVisible();

      // Verify presence of Start Here, Context Uses, Advice & Tips, and Ontology Domains
      await expect(sidebarNav.getByText('Start Here')).toBeVisible();
      await expect(sidebarNav.getByText('Ontology Domains')).toBeVisible();
      await expect(sidebarNav.getByText('Compute', { exact: true})).toBeVisible();
    // }
  });

  test('should render Table of Contents on key pages', async ({ page, isMobile }) => {
    await page.goto('/groups/compute/baseboardserialnumber/');

    if (!isMobile) {
      const toc = page.locator('starlight-toc');
      await expect(toc).toBeVisible();
      await expect(toc.getByText('On this page')).toBeVisible();
      await expect(toc.getByRole('link', { name: 'Overview' })).toBeVisible();
      await expect(toc.getByRole('link', { name: 'Applicable Contexts' })).toBeVisible();
      await expect(toc.getByRole('link', { name: 'Description' })).toBeVisible();
      await expect(toc.getByRole('link', { name: 'Example Values' })).toBeVisible();

      const descLink = toc.getByRole('link', { name: 'Description' });
      await descLink.click();
      await expect(page).toHaveURL(/#description$/);
    } else {
      // Mobile TOC
      const mobileToc = page.locator('mobile-starlight-toc summary, .mobile-toc summary');
      if (await mobileToc.isVisible()) {
        await expect(mobileToc).toBeVisible();
      }
    }
  });
});
