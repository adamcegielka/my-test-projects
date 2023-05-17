import { test, expect, chromium } from '@playwright/test';
import { testCase11Data } from '../test-data/testCase11.data';

test.describe('Test Case 11: Verify Subscription in Cart page', () => {
  // Search Product
  test('verify subscription in cart page', async ({ page }) => {
    const url = testCase11Data.url;
    const subscription = testCase11Data.subscription;
    const emailSubscription = testCase11Data.emailSubscription;
    const messageSubscription = testCase11Data.messageSubscription;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Click 'Cart' button
    await page.getByRole('link', { name: ' Cart' }).click();

    // 5. Scroll down to footer
    await page.evaluate(() => {
        const footerElement = document.querySelector('footer');
        if (footerElement)
          footerElement.scrollIntoView();
      });

    // 6. Verify text 'SUBSCRIPTION'
    await page.getByText(subscription).click();

    // 7. Enter email address in input and click arrow button
    await page.getByPlaceholder('Your email address').fill(emailSubscription);
    await page.getByRole('button', { name: '' }).click();

    // 8. Verify success message 'You have been successfully subscribed!' is visible
    await page.getByText(messageSubscription).click();
  });
});
