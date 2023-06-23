import { test, expect, chromium } from '@playwright/test';
import { testCase09Data } from '../test-data/testCase09.data';

test.describe('Test Case 9: Search Product', () => {
  test('TC09 search product', async ({ page }) => {
    const messageProducts = testCase09Data.messageProducts;
    const productName = testCase09Data.productName;
    const allProductsSearch = testCase09Data.allProductsSearch;
    const verifyHomePage = testCase09Data.verifyHomePage;

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

    // 4. Click on 'Products' button
    await page.click('.material-icons.card_travel');

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByText(messageProducts)).toBeVisible();

    // 6. Enter product name in search input and click search button
    // await page.getByPlaceholder('Search Product').fill(productName);
    // await page.getByRole('button', { name: '' }).click();
    // or:
    await page.type('#search_product', productName);
    await page.click('#submit_search');

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    await expect(
      page.getByRole('heading', { name: 'Searched Products' })
    ).toBeVisible();
    // or:
    const verifyTitleText = await page.locator('h2.title.text-center');
    await expect(verifyTitleText).toContainText('Searched Products');

    // 8. Verify all the products related to search are visible
    await expect(page.getByText(allProductsSearch)).toBeVisible();
  });
});
