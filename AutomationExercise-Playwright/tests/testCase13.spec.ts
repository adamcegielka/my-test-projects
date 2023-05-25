import { test, expect, chromium } from '@playwright/test';
import { testCase13Data } from '../test-data/testCase13.data';

test.describe('Test Case 13: Verify Product quantity in Cart', () => {

  test('verify product quantity in cart', async ({ page }) => {
    const verifyHomePage = testCase13Data.verifyHomePage;
    const verifyDetail = testCase13Data.verifyDetail;
    const verifyProductDisplayed = testCase13Data.verifyProductDisplayed;
    const quantityProduct = testCase13Data.quantityProduct;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click 'View Product' for any product on home page
    await page.locator('div:nth-child(6) > .product-image-wrapper > .choose').click();

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goto('/');
    await page.locator('div:nth-child(6) > .product-image-wrapper > .choose').click();

    // 5. Verify product detail is opened
    await expect(page.getByText(verifyDetail)).toBeVisible();

    // 6. Increase quantity to 4
    await page.locator('#quantity').fill(quantityProduct);

    // 7. Click 'Add to cart' button
      // await page.getByRole('button', { name: 'Add to cart' }).click();
      // or:
    await page.click('button[type="button"]');

    // 8. Click 'View Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 9. Verify that product is displayed in cart page with exact quantity
    await expect(page.getByRole('row', { name: verifyProductDisplayed })).toBeVisible();
    await expect(page.getByRole('button', { name: quantityProduct })).toBeVisible();
  });
});