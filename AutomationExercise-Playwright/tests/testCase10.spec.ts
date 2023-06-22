import { test, expect, chromium } from '@playwright/test';
import { testCase10Data } from '../test-data/testCase10.data';

test.describe('Test Case 10: Verify Subscription in home page', () => {
  test('verify subscription in home page', async ({ page }) => {
    const subscription = testCase10Data.subscription;
    const emailSubscription = testCase10Data.emailSubscription;
    const messageSubscription = testCase10Data.messageSubscription;
    const verifyHomePage = testCase10Data.verifyHomePage;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Scroll down to footer
    await page.evaluate(() => {
      const footerElement = document.querySelector('footer');
      if (footerElement) footerElement.scrollIntoView();
    });

    // 5. Verify text 'SUBSCRIPTION'
    await page.getByText(subscription).click();
    // or:
    const verifyText = await page.locator('.single-widget');
    await expect(verifyText).toContainText(subscription);

    // 6. Enter email address in input and click arrow button
    // await page.getByPlaceholder('Your email address').fill(emailSubscription);
    // await page.getByRole('button', { name: '' }).click();
    // or:
    await page.type('#susbscribe_email', emailSubscription);
    await page.click('#subscribe');

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    const verifyMessage = await page.locator('#footer');
    await expect(verifyMessage).toContainText(messageSubscription);
  });
});
