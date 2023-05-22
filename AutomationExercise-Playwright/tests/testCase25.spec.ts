import { test, expect, chromium } from '@playwright/test';
import { testCase25Data } from '../test-data/testCase25.data';

test.describe('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', () => {
  
  test('verify scroll up using "Arrow" button and scroll down functionality', async ({ page }) => {
    const url = testCase25Data.url;
    const verifySubscription = testCase25Data.verifySubscription;
    const verifyVisibleScreen = testCase25Data.verifyVisibleScreen;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Scroll down to footer
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

    // 5. Verify text 'SUBSCRIPTION'
    await expect(page.getByText(verifySubscription)).toBeVisible();

    // 6. Click on arrow at bottom right side to move upward 
    await page.locator('.grippy-host').click();     // hiding advertising
    await page.locator('#scrollUp').click();

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    await page.waitForSelector('header', { timeout: 5000 });
    const isScrolledUp = await page.evaluate(() => {
        return window.pageYOffset === 0;
      });      
      expect(isScrolledUp).toBe(true);

    await expect(page.getByRole('heading', { name: verifyVisibleScreen })).toBeVisible();
  });
});