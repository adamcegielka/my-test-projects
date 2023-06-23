import { test, expect, chromium } from '@playwright/test';
import { testCase25Data } from '../test-data/testCase25.data';
import { HomePage } from '../page-objects/HomePage';

test.describe('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', () => {
  test('TC25 POM verify scroll up using Arrow button and scroll down functionality', async ({ page }) => {
    const homePage = new HomePage(page);

    const verifySubscription = testCase25Data.verifySubscription;
    const verifyVisibleScreen = testCase25Data.verifyVisibleScreen;

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
    const scrollFooter = page.locator('footer');
    await scrollFooter.scrollIntoViewIfNeeded();
    await expect(page.getByText(verifySubscription)).toBeVisible();
    await page.locator('#scrollUp').click();
    await expect(page.locator('.logo.pull-left')).toBeInViewport();
    await expect(page.getByRole('heading', { name: verifyVisibleScreen })).toBeInViewport();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down page to bottom
5. Verify 'SUBSCRIPTION' is visible
6. Click on arrow at bottom right side to move upward
7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
*/
