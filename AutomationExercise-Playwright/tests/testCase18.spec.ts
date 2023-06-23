import { test, expect, chromium } from '@playwright/test';
import { testCase18Data } from '../test-data/testCase18.data';

test.describe('Test Case 18: View Category Products', () => {
  test('TC18 view category products', async ({ page }) => {
    const verifyCategories = testCase18Data.verifyCaregories;
    const verifyCategoryWomen = testCase18Data.verifyCategoryWomen;
    const verifyCategoryMen = testCase18Data.verifyCategoryMen;

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

    // 3. Verify that categories are visible on left side bar
    await expect(page.getByText(verifyCategories)).toBeVisible();

    // 4. Click on 'Women' category
    // await page.getByRole('link', { name: ' Women' }).click();
    // or:
    await page.click('text=Women');

    // 5. Click on any category link under 'Women' category, for example: Dress
    // await page.getByRole('link', { name: 'Tops' }).click();
    // or:
    await page.click('text=Tops');

    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(
      page.getByRole('heading', { name: verifyCategoryWomen })
    ).toBeVisible();

    // 7. On left side bar, click on any sub-category link of 'Men' category
    await page.getByRole('link', { name: ' Men' }).click();
    await page.getByRole('link', { name: 'Jeans' }).click();

    // 8. Verify that user is navigated to that category page
    await expect(
      page.getByRole('heading', { name: verifyCategoryMen })
    ).toBeVisible();
  });
});
