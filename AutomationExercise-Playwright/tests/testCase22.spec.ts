import { test, expect, chromium } from '@playwright/test';
import { testCase22Data } from '../test-data/testCase22.data';

test.describe('Test Case 22: Add to cart from Recommended items', () => {
  
  test('add to cart from recommended items', async ({ page }) => {
    const url = testCase22Data.url;
    const verifyRecommendedItems = testCase22Data.verifyRecommendedItems;
    const verifyProductIsDisplayes = testCase22Data.verifyProductIsDisplayes;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Scroll to bottom of page
    await page.evaluate(() => {
        const recommendedItemsElement = document.querySelector('.recommended_items');
        if (recommendedItemsElement)
          recommendedItemsElement.scrollIntoView();
      });

    // 4. Verify 'RECOMMENDED ITEMS' are visible
    await expect(await page.getByRole('heading', { name: verifyRecommendedItems })).toBeVisible();

    // 5. Click on 'Add To Cart' on Recommended product
    await page.locator('div:nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').first().click();

    // 6. Click on 'View Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 7. Verify that product is displayed in cart page
    await expect(page.getByRole('row', { name: verifyProductIsDisplayes })).toBeVisible();
  });
});