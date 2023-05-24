import { test, expect, chromium } from '@playwright/test';
import { testCase11Data } from '../test-data/testCase11.data';

test.describe('Test Case 11: Verify Subscription in Cart page', () => {
  
  test('verify subscription in cart page', async ({ page }) => {
    const subscription = testCase11Data.subscription;
    const emailSubscription = testCase11Data.emailSubscription;
    const messageSubscription = testCase11Data.messageSubscription;
    const verifyHomePage = testCase11Data.verifyHomePage;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click 'Cart' button
      // await page.getByRole('link', { name: 'Cart' }).click();
      // or:
    await page.click('.fa.fa-shopping-cart');

    // 5. Scroll down to footer
    await page.evaluate(() => {
        const footerElement = document.querySelector('footer');
        if (footerElement)
          footerElement.scrollIntoView();
      });

    // 6. Verify text 'SUBSCRIPTION'
    const verifyText = await page.locator('.single-widget');
    await expect(verifyText).toContainText(subscription);

    // 7. Enter email address in input and click arrow button
    await page.type('#susbscribe_email', emailSubscription);
    await page.click('#subscribe');

    // 8. Verify success message 'You have been successfully subscribed!' is visible
    const verifyMessage = await page.locator('#footer');
    await expect(verifyMessage).toContainText(messageSubscription);
  });
});