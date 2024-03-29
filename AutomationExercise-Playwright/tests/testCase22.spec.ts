import { test, expect, chromium } from '@playwright/test';
import { testCase22Data } from '../test-data/testCase22.data';

test.describe('Test Case 22: Add to cart from Recommended items', () => {
  test('TC22 add to cart from recommended items', async ({ page }) => {
    const verifyRecommendedItems = testCase22Data.verifyRecommendedItems;
    const verifyProductIsDisplayes = testCase22Data.verifyProductIsDisplayes;

    // Blocking of network resources that generate Ads
    await page.route("**/*", route => {
      route.request().url().startsWith("https://googleads.") ?
        route.abort() : route.continue();
      return;
    });
    // --- End code

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Scroll to bottom of page
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // 4. Verify 'RECOMMENDED ITEMS' are visible
    await expect(await page.getByRole('heading', { name: verifyRecommendedItems })).toBeVisible();

    // 5. Click on 'Add To Cart' on Recommended product
    await page
      .locator(
        'div:nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .add-to-cart'
      )
      .first()
      .click();

    // 6. Click on 'View Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 7. Verify that product is displayed in cart page
    await expect(page.getByRole('row', { name: verifyProductIsDisplayes })).toBeVisible();
  });
});
