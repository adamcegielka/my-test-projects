import { test, expect, chromium } from '@playwright/test';
import { testCase07Data } from '../test-data/testCase07.data';
import { HomePage } from '../page-objects/HomePage';

test.describe('Test Case 7: Verify Test Cases Page', () => {
  test('verify test cases page', async ({ page }) => {
    const homePage = new HomePage(page);

    const verifyTestCasesPage = testCase07Data.verifyTestCasesPage;
    const verifyTestCasesPageTitle = testCase07Data.verifyTestCasesPageTitle;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await page.click('.btn.btn-success');
    await page.goBack(); // EXIT FROM GOOGLE ADS
    await page.click('.btn.btn-success');
    await expect(page).toHaveURL(verifyTestCasesPage);
    await expect(page).toHaveTitle(verifyTestCasesPageTitle);
    await page.close();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Test Cases' button
5. Verify user is navigated to test cases page successfully
*/
