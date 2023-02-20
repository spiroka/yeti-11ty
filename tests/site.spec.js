const { test, expect } = require('@playwright/test');

test.describe('YetiSi tests', () => {
  let navigateTo;

  test.beforeEach(async ({ page, isMobile }) => {
    await page.goto('http://localhost:8080/');

    navigateTo = async (name) => {
      if (isMobile) {
        await page.locator('#nav-toggle').click();
      }

      await page.locator(`[data-region="${name}"]`).click();
    };
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Yetisí Szeged/);
  });

  test('email placeholders are replaced', async ({ page }) => {
    for (const a of await page.locator('.mailto').all()) {
      await expect(a).toHaveAttribute('href', /mailto:info@yetisiszeged.hu/);
    }

    for (const el of await page.locator('.email-placeholder').all()) {
      await (expect(el).toContainText('info@yetisiszeged.hu'));
    }
  });

  test('nav items should become active when their region is reached', async ({ page }) => {
    await navigateTo('prices');

    await expect(page.locator('[data-region="prices"]')).toHaveAttribute('aria-current', 'location');
    await expect(page.locator('[aria-current="location"]')).toHaveCount(1);
  });

  test('nav drawer should open when hamburger is clicked', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'navigation is always visible on desktop');

    const nav = page.locator('#main-nav ul');

    await expect(nav).not.toBeVisible();

    await page.locator('#nav-toggle').click();

    await expect(nav).toBeVisible();
  });

  test('nav drawer should close when clicking outside', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'navigation is always visible on desktop');

    await page.locator('#nav-toggle').click();
    await page.locator('body').click();

    await expect(page.locator('#main-nav ul')).not.toBeVisible();
  });
});
