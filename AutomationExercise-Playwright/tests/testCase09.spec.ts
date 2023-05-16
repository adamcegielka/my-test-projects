import { test, expect, chromium } from '@playwright/test';
import { testCase09Data } from '../test-data/testCase09.data';

test.describe('Test Case 9: Search Product', () => {
  // Search Product
  test('search product', async ({ page }) => {
    const url = testCase09Data.url;
    const messageProducts = testCase09Data.messageProducts;
    const productName = testCase09Data.productName;
    const allProductsSearch = testCase09Data.allProductsSearch;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Click on 'Products' button
    await page.getByRole('link', { name: ' Products' }).click();

    // EXIT FROM GOOGLE ADS
    await page.goto('https://automationexercise.com/');
    await page.getByRole('link', { name: ' Products' }).click();    
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByText(messageProducts)).toBeVisible();

    // 6. Enter product name in search input and click search button
    await page.getByPlaceholder('Search Product').fill(productName);
    await page.getByRole('button', { name: '' }).click();

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();

    // 8. Verify all the products related to search are visible
    await expect(page.getByText(allProductsSearch)).toBeVisible();
  });
});
