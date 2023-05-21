import { test, expect, chromium } from '@playwright/test';
import { testCase18Data } from '../test-data/testCase18.data';

test.describe('Test Case 18: View Category Products', () => {

  test('view category products', async ({ page }) => {
    const url = testCase18Data.url;
    const verifyCategoryWomen = testCase18Data.verifyCategoryWomen;
    const verifyCategoryMen = testCase18Data.verifyCategoryMen;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Click on 'Women' category
    await page.getByRole('link', { name: ' Women' }).click();

    // 5. Click on any category link under 'Women' category, for example: Dress
    await page.getByRole('link', { name: 'Tops' }).click();

    // EXIT FROM GOOGLE ADS
    await page.goto(url);
    await page.getByRole('link', { name: ' Women' }).click();
    await page.getByRole('link', { name: 'Tops' }).click();

    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(page.getByRole('heading', { name: verifyCategoryWomen })).toBeVisible();

    // 7. On left side bar, click on any sub-category link of 'Men' category
    await page.getByRole('link', { name: ' Men' }).click();
    await page.getByRole('link', { name: 'Jeans' }).click();
    
    // 8. Verify that user is navigated to that category page
    await expect(page.getByRole('heading', { name: verifyCategoryMen })).toBeVisible();
  });
});