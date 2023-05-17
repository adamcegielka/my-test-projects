import { test, expect, chromium } from '@playwright/test';
import { testCase07Data } from '../test-data/testCase07.data';

test.describe('Test Case 7: Verify Test Cases Page', () => {

  // Verify Test Cases Page
  test.only('verify test cases page', async ({ page }) => {
    const url = testCase07Data.url;
    const urlCase = testCase07Data.urlCase;

    // 1. Launch browser
    await chromium.launch();    
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);
    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);
    // 4. Click on 'Test Cases' button
    await page.getByRole('button', { name: 'Test Cases' }).click();

    // Error: https://automationexercise.com/#google_vignette:
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goto('https://automationexercise.com/');
    await page.getByRole('button', { name: 'Test Cases' }).click(); 
    
    // 5. Verify user is navigated to test cases page successfully
    await expect(page).toHaveURL(urlCase);
  });
});
