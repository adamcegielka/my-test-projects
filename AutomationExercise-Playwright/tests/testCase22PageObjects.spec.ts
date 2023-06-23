import { test, expect, chromium } from '@playwright/test';
import { testCase22Data } from '../test-data/testCase22.data';
import { HomePage } from '../page-objects/HomePage';

test.describe('Test Case 22: Add to cart from Recommended items', () => {
  test('TC22 POM add to cart from recommended items', async ({ page }) => {
    const homePage = new HomePage(page);

    const verifyRecommendedItems = testCase22Data.verifyRecommendedItems;
    const verifyProductIsDisplayes = testCase22Data.verifyProductIsDisplayes;

    // Blocking of network resources that generate Ads
    await page.route("**/*", route => {
      route.request().url().startsWith("https://googleads.") ?
        route.abort() : route.continue();
      return;
    });
    // --- End code

    await chromium.launch();
    await homePage.navHomePage();
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await expect(
      await page.getByRole('heading', { name: verifyRecommendedItems })
    ).toBeVisible();
    await page
      .locator(
        'div:nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .add-to-cart'
      )
      .first()
      .click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(
      page.getByRole('row', { name: verifyProductIsDisplayes })
    ).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Scroll to bottom of page
4. Verify 'RECOMMENDED ITEMS' are visible
5. Click on 'Add To Cart' on Recommended product
6. Click on 'View Cart' button
7. Verify that product is displayed in cart page
*/
