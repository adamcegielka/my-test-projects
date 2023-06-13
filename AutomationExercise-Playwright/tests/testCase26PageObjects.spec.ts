import { test, expect, chromium } from '@playwright/test';
import { testCase26Data } from '../test-data/testCase26.data';
import { HomePage } from '../page-objects/HomePage';

test.describe('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', () => {
  
  test('verify scroll up without "Arrow" button and scroll down functionality', async ({ page }) => {
    const homePage = new HomePage(page);

    const verifySubscription = testCase26Data.verifySubscription;
    const verifyVisibleScreen = testCase26Data.verifyVisibleScreen;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    const scrollFooter = page.locator('footer');
    await scrollFooter.scrollIntoViewIfNeeded();
    await expect(page.getByText(verifySubscription)).toBeVisible();
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });   
    const isScrolledUp = await page.evaluate(() => {
      return window.scrollY === 0;
    });
    expect(isScrolledUp).toBe(true);
    await expect(page.getByRole('heading', { name: verifyVisibleScreen })).toBeInViewport();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down page to bottom
5. Verify 'SUBSCRIPTION' is visible
6. Scroll up page to top
7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
*/