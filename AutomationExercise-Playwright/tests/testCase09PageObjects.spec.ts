import { test, expect, chromium } from '@playwright/test';
import { testCase09Data } from '../test-data/testCase09.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';

test.describe('Test Case 9: Search Product', () => {
  test('TC09 POM search product', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);

    const messageProducts = testCase09Data.messageProducts;
    const productName = testCase09Data.productName;
    const allProductsSearch = testCase09Data.allProductsSearch;

    // Blocking of network resources that generate Ads
    await page.route("**/*", route => {
      route.request().url().startsWith("https://googleads.") ?
        route.abort() : route.continue();
      return;
    });
    // --- End code

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await navbar.clickOnNav('Products');
    await expect(page.getByText(messageProducts)).toBeVisible();
    await page.type('#search_product', productName);
    await page.click('#submit_search');
    const verifyTitleText = await page.locator('h2.title.text-center');
    await expect(verifyTitleText).toContainText('Searched Products');
    await expect(page.getByText(allProductsSearch)).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. Enter product name in search input and click search button
7. Verify 'SEARCHED PRODUCTS' is visible
8. Verify all the products related to search are visible
*/
