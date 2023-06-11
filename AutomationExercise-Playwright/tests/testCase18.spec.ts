import { test, expect, chromium } from '@playwright/test';
import { testCase18Data } from '../test-data/testCase18.data';

test.describe('Test Case 18: View Category Products', () => {

  test('view category products', async ({ page }) => {
    const verifyCategories = testCase18Data.verifyCaregories;
    const verifyCategoryWomen = testCase18Data.verifyCategoryWomen;
    const verifyCategoryMen = testCase18Data.verifyCategoryMen;

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

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goto('/');
    await page.click('text=Women');
    await page.click('text=Tops');

    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(page.getByRole('heading', { name: verifyCategoryWomen })).toBeVisible();

    // 7. On left side bar, click on any sub-category link of 'Men' category
      await page.getByRole('link', { name: ' Men' }).click();
      await page.getByRole('link', { name: 'Jeans' }).click();

    // 8. Verify that user is navigated to that category page
    await expect(page.getByRole('heading', { name: verifyCategoryMen })).toBeVisible();
  });
});