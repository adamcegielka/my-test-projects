import { test, expect, chromium } from '@playwright/test';
import { testCase26Data } from '../test-data/testCase26.data';

test.describe('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', () => {
  
  test('verify scroll up without "Arrow" button and scroll down functionality', async ({ page }) => {
    const verifyHomePage = testCase26Data.verifyHomePage;
    const verifySubscription = testCase26Data.verifySubscription;
    const verifyVisibleScreen = testCase26Data.verifyVisibleScreen;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Scroll down to footer
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

    // 5. Verify text 'SUBSCRIPTION'
    await expect(page.getByText(verifySubscription)).toBeVisible();

    // 6. Scroll up page to top
    await page.evaluate(() => {
        const footerElement = document.querySelector('header');
        if (footerElement)
          footerElement.scrollIntoView();
      });

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    await page.waitForSelector('header', { timeout: 5000 });
    const isScrolledUp = await page.evaluate(() => {
        return window.pageYOffset === 0;
      });      
      expect(isScrolledUp).toBe(true);

    await expect(page.getByRole('heading', { name: verifyVisibleScreen })).toBeVisible();
  });
});