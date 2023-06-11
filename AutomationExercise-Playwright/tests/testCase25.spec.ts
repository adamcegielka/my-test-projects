import { test, expect, chromium } from '@playwright/test';
import { testCase25Data } from '../test-data/testCase25.data';

test.describe('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', () => {
  
  test.only('verify scroll up using "Arrow" button and scroll down functionality', async ({ page }) => {
    const verifyHomePage = testCase25Data.verifyHomePage;
    const verifySubscription = testCase25Data.verifySubscription;
    const verifyVisibleScreen = testCase25Data.verifyVisibleScreen;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Scroll down to footer
    const scrollFooter = page.locator('footer');
    await scrollFooter.scrollIntoViewIfNeeded();

    // 5. Verify text 'SUBSCRIPTION'
    await expect(page.getByText(verifySubscription)).toBeVisible();

    // 6. Click on arrow at bottom right side to move upward 
    await page.locator('.grippy-host').click();     // HIDING ADVERTISING
    await page.locator('#scrollUp').click();

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    const isScrolledUp = await page.evaluate(() => {
        return window.pageYOffset === 0;
      });      
      expect(isScrolledUp).toBe(false);

    // TO FIX !!!
    const visibleScreen = page.getByRole('heading', { name: verifyVisibleScreen });
    await expect(visibleScreen).toBeFocused();
  });
});