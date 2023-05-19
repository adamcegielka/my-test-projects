import { test, expect, chromium } from '@playwright/test';
import { testCase13Data } from '../test-data/testCase13.data';

test.describe('Test Case 13: Verify Product quantity in Cart', () => {

  test.only('verify product quantity in cart', async ({ page }) => {
    const url = testCase13Data.url;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Click 'View Product' for any product on home page
    await page.locator('div:nth-child(6) > .product-image-wrapper > .choose > .nav > li > a').click();

    // EXIT FROM GOOGLE ADS
    await page.goto(url);
    await page.locator('div:nth-child(6) > .product-image-wrapper > .choose > .nav > li > a').click();

    // 5. Verify product detail is opened
    await expect(page.getByText('Stylish Dress Category: Women > Dress Rs. 1500 Quantity: Add to cart Availabilit')).toBeVisible();

    // 6. Increase quantity to 4
    await page.locator('#quantity').fill('4');

    // 7. Click 'Add to cart' button
    await page.getByRole('button', { name: ' Add to cart' }).click();

    // 8. Click 'View Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 9. Verify that product is displayed in cart page with exact quantity
    await expect(page.getByRole('row', { name: 'Product Image Stylish Dress Women > Dress Rs. 1500 4 Rs. 6000 ' })).toBeVisible();
    await expect(page.getByRole('button', { name: '4' })).toBeVisible();
  });
});
