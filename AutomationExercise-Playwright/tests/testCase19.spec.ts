import { test, expect, chromium } from '@playwright/test';
import { testCase19Data } from '../test-data/testCase19.data';

test.describe('Test Case 19: View & Cart Brand Products', () => {
  test('TC19 view & cart brand products', async ({ page }) => {
    const verifyBrandsPolo = testCase19Data.verifyBrandsPolo;
    const verifyBrandPoloProducts = testCase19Data.verifyBrandPoloProducts;
    const verifyBrandPoloProductsAll = testCase19Data.verifyBrandPoloProductsAll;
    const verifyBrandBabyhugProducts = testCase19Data.verifyBrandBabyhugProducts;
    const verifyBrandBabyhugProductsAll = testCase19Data.verifyBrandBabyhugProductsAll;

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

    // 3. Click on 'Products' button
    await page.getByRole('link', { name: 'Products' }).click();

    // 4. Verify that Brands are visible on left side bar
    await expect(page.getByText(verifyBrandsPolo)).toBeVisible();

    // 5. Click on any brand name
    await page.getByRole('link', { name: '(6) Polo' }).click();

    // 6. Verify that user is navigated to brand page and brand products are displayed
    await expect(
      page.getByRole('heading', { name: verifyBrandPoloProducts })
    ).toBeVisible();
    await expect(page.getByText(verifyBrandPoloProductsAll)).toBeVisible();

    // 7. On left side bar, click on any other brand link
    await page.getByRole('link', { name: '(4) Babyhug' }).click();

    // 8. Verify that user is navigated to that brand page and can see products
    await expect(
      page.getByRole('heading', { name: verifyBrandBabyhugProducts })
    ).toBeVisible();
    await expect(page.getByText(verifyBrandBabyhugProductsAll)).toBeVisible();
  });
});
