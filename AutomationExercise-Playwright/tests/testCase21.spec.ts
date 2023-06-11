import { test, expect, chromium } from '@playwright/test';
import { testCase21Data } from '../test-data/testCase21.data';

test.describe('Test Case 21: Add review on product', () => {

  // Test Case 21: Add review on product
  test('add review on product', async ({ page }) => {
    const userEmail = testCase21Data.userEmail;
    const nameSurname = testCase21Data.nameSurname;
    const review = testCase21Data.review;
    const verifyProducts = testCase21Data.verifyProducts;
    const verifyProductsAll = testCase21Data.verifyProductsAll;
    const verifySuccessMessage = testCase21Data.verifySuccessMessage;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Click on 'Products' button
    await page.getByRole('link', { name: 'Products' }).click();

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_6"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goBack();
    await page.goForward();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByRole('heading', { name: verifyProducts })).toBeVisible();
    await expect(page.getByText(verifyProductsAll)).toBeVisible();

    // 5. Click on 'View Product' button
    await page.locator('.choose > .nav > li > a').first().click();

    // 6. Verify 'Write Your Review' is visible
    await expect(page.getByRole('link', { name: 'Write Your Review' })).toBeVisible();

    // 7. Enter name, email and review
    await page.getByPlaceholder('Your Name').fill(nameSurname);
    await page.getByPlaceholder('Email Address', { exact: true }).fill(userEmail);
    await page.getByPlaceholder('Add Review Here!').fill(review);

    // 8. Click 'Submit' button
    await page.getByRole('button', { name: 'Submit' }).click();

    // 9. Verify success message 'Thank you for your review.'
    await expect(page.getByText(verifySuccessMessage)).toBeVisible();
  });
});