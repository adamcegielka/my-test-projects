import { test, expect, chromium } from '@playwright/test';
import { testCase26Data } from '../test-data/testCase26.data';

test.describe('Test Case 26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', () => {
  
  test.only('verify scroll up without "Arrow" button and scroll down functionality', async ({ page }) => {
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
    const scrollFooter = page.locator('footer');
    await scrollFooter.scrollIntoViewIfNeeded();

    // 5. Verify text 'SUBSCRIPTION'
    await expect(page.getByText(verifySubscription)).toBeVisible();

    // 6. Scroll up page to top
    // await page.mouse.wheel(0, -100000000)    
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });    

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    const isScrolledUp = await page.evaluate(() => {
      return window.scrollY === 0;
    });
    expect(isScrolledUp).toBe(true);
    await expect(page.getByRole('heading', { name: verifyVisibleScreen })).toBeInViewport();
  });
});

/*
7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen

const isScrolledUp = await page.evaluate(() => {
  return window.scrollY === 0;
});
expect(isScrolledUp).toBe(true);

---

const scrollY = await page.evaluate(() => {
  return window.scrollY;
});    
expect(scrollY === 0).toBeTruthy();

---

const scrollY = await page.evaluate(() => {
  return window.scrollY;
});
expect(scrollY).toEqual(0);
*/