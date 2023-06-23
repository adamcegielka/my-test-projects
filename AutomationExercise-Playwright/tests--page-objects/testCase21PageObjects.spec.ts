import { test, expect, chromium } from '@playwright/test';
import { testCase21Data } from '../test-data/testCase21.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { WriteReviewPage } from '../page-objects/WriteReviewPage';

test.describe('Test Case 21: Add review on product', () => {
  test('TC21 POM add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    const writeReviewPage = new WriteReviewPage(page);
    
    const verifyProducts = testCase21Data.verifyProducts;
    const verifyProductsAll = testCase21Data.verifyProductsAll;

    // Blocking of network resources that generate Ads
    await page.route("**/*", route => {
      route.request().url().startsWith("https://googleads.") ?
        route.abort() : route.continue();
      return;
    });
    // --- End code

    await chromium.launch();
    await homePage.navHomePage();
    await navbar.clickOnNav('Products');
    await expect(page.getByRole('heading', { name: verifyProducts })).toBeVisible();
    await expect(page.getByText(verifyProductsAll)).toBeVisible();
    await page.locator('.choose > .nav > li > a').first().click();
    const verifyWriteYourReview = await page.locator('li.active');
    await expect(verifyWriteYourReview).toContainText('Write Your Review');
    await writeReviewPage.fillForm();
    await writeReviewPage.clickSubmit();
    await writeReviewPage.verifySuccessMessage();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify user is navigated to ALL PRODUCTS page successfully
5. Click on 'View Product' button
6. Verify 'Write Your Review' is visible
7. Enter name, email and review
8. Click 'Submit' button
9. Verify success message 'Thank you for your review.'
*/