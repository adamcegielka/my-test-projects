import { test, expect, chromium } from '@playwright/test';
import { testCase08Data } from '../test-data/testCase08.data';

test.describe.only('Test Case 8: Verify All Products and product detail page', () => {
  
  test('verify all products and product detail page', async ({ page }) => {
    const url = testCase08Data.url;
    const urlProductDetails = testCase08Data.urlProductDetails;
    const messageProducts = testCase08Data.messageProducts;
    const messageProductList = testCase08Data.messageProductList;
    const messageProductDetails = testCase08Data.messageProductDetails;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Click on 'Products' button
    await page.getByRole('link', { name: 'Products' }).click();

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goto('https://automationexercise.com/');
    await page.getByRole('link', { name: 'Products' }).click();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByText(messageProducts)).toBeVisible();

    // 6. The products list is visible
    await expect(page.getByText(messageProductList)).toBeVisible();

    // 7. Click on 'View Product' of first product
    await page.locator('.choose > .nav > li > a').first().click();

    // 8. User is landed to product detail page
    await expect(page).toHaveURL(urlProductDetails);
    await expect(page.getByText(messageProductDetails)).toBeVisible();

    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs. 500')).toBeVisible();
    await expect(page.getByText('Availability: In Stock')).toBeVisible();
    await expect(page.getByText('Condition: New')).toBeVisible();
    await expect(page.getByText('Brand: Polo')).toBeVisible();
  });
});