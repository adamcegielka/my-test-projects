import { test, expect, chromium } from '@playwright/test';
import { testCase10Data } from '../test-data/testCase10.data';
import { HomePage } from '../page-objects/HomePage';

test.describe('Test Case 10: Verify Subscription in home page', () => {
  test('verify subscription in home page', async ({ page }) => {
    const homePage = new HomePage(page);

    const subscription = testCase10Data.subscription;
    const emailSubscription = testCase10Data.emailSubscription;
    const messageSubscription = testCase10Data.messageSubscription;

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
    await homePage.verifytTitlePage();
    await page.evaluate(() => {
      const footerElement = document.querySelector('footer');
      if (footerElement) footerElement.scrollIntoView();
    });
    const verifyText = await page.locator('.single-widget');
    await expect(verifyText).toContainText(subscription);
    await page.type('#susbscribe_email', emailSubscription);
    await page.click('#subscribe');
    const verifyMessage = await page.locator('#footer');
    await expect(verifyMessage).toContainText(messageSubscription);
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Scroll down to footer
5. Verify text 'SUBSCRIPTION'
6. Enter email address in input and click arrow button
7. Verify success message 'You have been successfully subscribed!' is visible
*/
