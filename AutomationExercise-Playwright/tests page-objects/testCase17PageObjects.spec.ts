import { test, expect, chromium } from '@playwright/test';
import { testCase17Data } from '../test-data/testCase17.data';
import { HomePage } from '../page-objects/HomePage';

test.describe('Test Case 17: Remove Products From Cart', () => {
  test('TC17 POM remove products from cart', async ({ page }) => {
    const homePage = new HomePage(page);

    const verifyShoppingCart = testCase17Data.verifyShoppingCart;
    const verifyProductRemoved = testCase17Data.verifyProductRemoved;

    // Blocking of network resources that generate Ads
    await page.route("**/*", route => {
      route.request().url().startsWith("https://googleads.") ?
        route.abort() : route.continue();
      return;
    });
    // --- End code

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    const verifyCartPage = await page.locator('.active');
    await expect(verifyCartPage).toContainText(verifyShoppingCart);
    await page.click('.cart_quantity_delete');
    await expect(page.getByText(verifyProductRemoved)).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click 'X' button corresponding to particular product
8. Verify that product is removed from the cart
*/
