import { test, expect, chromium } from '@playwright/test';
import { testCase07Data } from '../test-data/testCase07.data';

test.describe('Test Case 7: Verify Test Cases Page', () => {
  
  test('verify test cases page', async ({ page }) => {
    const verifyHomePage = testCase07Data.verifyHomePage;
    const verifyTestCasesPage = testCase07Data.verifyTestCasesPage;
    const verifyTestCasesPageTitle = testCase07Data.verifyTestCasesPageTitle;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click on 'Test Cases' button
    await page.click('.btn.btn-success');
    // or:
    // await page.click('text=Test Cases');
    // await page.click('button[type="button"]');
    // await page.getByRole('button', { name: 'Test Cases' }).click();

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goto('/');
    await page.click('.btn.btn-success'); 
    
    // 5. Verify user is navigated to test cases page successfully
    await expect(page).toHaveURL(verifyTestCasesPage);
    await expect(page).toHaveTitle(verifyTestCasesPageTitle);

    // CLOSE BROWSER
    await page.close();
  });
});
