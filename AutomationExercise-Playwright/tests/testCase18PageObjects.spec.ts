import { test, expect, chromium } from '@playwright/test';
import { testCase18Data } from '../test-data/testCase18.data';
import { HomePage } from '../page-objects/HomePage';
import { Sidebar } from '../page-objects/components/Sidebar';

test.describe('Test Case 18: View Category Products', () => {
  test('TC18 POM view category products', async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebar = new Sidebar(page);

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

    await chromium.launch();
    await homePage.navHomePage();
    await expect(page.getByText(verifyCategories)).toBeVisible();
    await sidebar.categoryWomen();
    await sidebar.categoryWomenTops();
    await expect(
      page.getByRole('heading', { name: verifyCategoryWomen })
    ).toBeVisible();
    await sidebar.categoryMen();
    await sidebar.categoryMenJeans();
    await expect(
      page.getByRole('heading', { name: verifyCategoryMen })
    ).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that categories are visible on left side bar
4. Click on 'Women' category
5. Click on any category link under 'Women' category, for example: Dress
6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
7. On left side bar, click on any sub-category link of 'Men' category
8. Verify that user is navigated to that category page 
*/
