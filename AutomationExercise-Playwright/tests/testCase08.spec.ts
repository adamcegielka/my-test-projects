import { test, expect, chromium } from '@playwright/test';
import { testCase08Data } from '../test-data/testCase08.data';

test.describe('Test Case 7: Verify Test Cases Page', () => {
  // Verify Test Cases Page
  test('verify test cases page', async ({ page }) => {
    const url = testCase08Data.url;
    const urlProductDetails = testCase08Data.urlProductDetails;

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
    await expect(page.getByText('ALL PRODUCTS')).toBeVisible();

    // 6. The products list is visible
    await expect(page.getByText('All Products  Added! Your product has been added to cart. View Cart Continue Sh')).toBeVisible();

    // 7. Click on 'View Product' of first product
    await page.locator('.choose > .nav > li > a').first().click();

    // 8. User is landed to product detail page
    await expect(page).toHaveURL(urlProductDetails);
    await expect(page.getByText('Blue Top Category: Women > Tops Rs. 500 Quantity: Add to cart Availability: In S')).toBeVisible();

    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs. 500')).toBeVisible();
    await expect(page.getByText('Availability: In Stock')).toBeVisible();
    await expect(page.getByText('Condition: New')).toBeVisible();
    await expect(page.getByText('Brand: Polo')).toBeVisible();
  });
});
