import { test, expect, chromium } from '@playwright/test';
import { testCase10Data } from '../test-data/testCase10.data';

test.describe('Test Case 10: Verify Subscription in home page', () => {
  // Search Product
  test('verify subscription in home page', async ({ page }) => {
    const url = testCase10Data.url;
    const subscription = testCase10Data.subscription;
    const emailSubscription = testCase10Data.emailSubscription;
    const messageSubscription = testCase10Data.messageSubscription;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Scroll down to footer
    await page.evaluate(() => {
        const footerElement = document.querySelector('footer');
        if (footerElement)
          footerElement.scrollIntoView();
      });

    // 5. Verify text 'SUBSCRIPTION'
    await page.getByText(subscription).click();

    // 6. Enter email address in input and click arrow button
    await page.getByPlaceholder('Your email address').fill(emailSubscription);
    await page.getByRole('button', { name: '' }).click();

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    await page.getByText(messageSubscription).click();
  });
});
