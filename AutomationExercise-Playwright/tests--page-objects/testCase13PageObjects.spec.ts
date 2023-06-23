import { test, expect, chromium } from '@playwright/test';
import { testCase13Data } from '../test-data/testCase13.data';
import { HomePage } from '../page-objects/HomePage';

test.describe('Test Case 13: Verify Product quantity in Cart', () => {
  test('TC13 POM verify product quantity in cart', async ({ page }) => {
    const homePage = new HomePage(page);

    const verifyDetail = testCase13Data.verifyDetail;
    const verifyProductDisplayed = testCase13Data.verifyProductDisplayed;
    const quantityProduct = testCase13Data.quantityProduct;

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
    await page
      .locator('div:nth-child(6) > .product-image-wrapper > .choose')
      .click();
    await expect(page.getByText(verifyDetail)).toBeVisible();
    await page.locator('#quantity').fill(quantityProduct);
    await page.click('button[type="button"]');
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(
      page.getByRole('row', { name: verifyProductDisplayed })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: quantityProduct })
    ).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'View Product' for any product on home page
5. Verify product detail is opened
6. Increase quantity to 4
7. Click 'Add to cart' button
8. Click 'View Cart' button
9. Verify that product is displayed in cart page with exact quantity
*/
