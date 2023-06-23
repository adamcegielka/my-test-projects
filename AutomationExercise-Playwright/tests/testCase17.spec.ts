import { test, expect, chromium } from '@playwright/test';
import { testCase17Data } from '../test-data/testCase17.data';

test.describe('Test Case 17: Remove Products From Cart', () => {
  test('TC17 remove products from cart', async ({ page }) => {
    const verifyHomePage = testCase17Data.verifyHomePage;
    const urlCart = testCase17Data.urlCart;
    const verifyShoppingCart = testCase17Data.verifyShoppingCart;
    const verifyProductRemoved = testCase17Data.verifyProductRemoved;

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

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Add products to cart
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();

    // 5. Click 'Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 6. Verify that cart page is displayed
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();

    // 7. Click 'X' button corresponding to particular product
    await page.click('.cart_quantity_delete');

    // 8. Verify that product is removed from the cart
    await expect(page.getByText(verifyProductRemoved)).toBeVisible();
  });
});
