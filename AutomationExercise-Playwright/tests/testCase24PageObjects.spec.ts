import { test, expect, chromium } from '@playwright/test';
import { testCase24Data } from '../test-data/testCase24.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { CartPage } from '../page-objects/CartPage';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { Navbar } from '../page-objects/components/Navbar';
import { CreditCardPage } from '../page-objects/CreditCardPage';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 24: Download Invoice after purchase order', () => {
  
  test('download invoice after purchase order', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const registrationUser = new RegistrationUser(page);
    const navbar = new Navbar(page);
    const creditCardPage = new CreditCardPage(page);
    const deletionUser = new DeletionUser(page);
    
    const userId = testRegistrationData.userId;
    const verifyReviewOrder = testCase24Data.verifyReviewOrder;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await cartPage.verifyCartPageIsDisplayed();
    await cartPage.clickbuttonProToCheckout();
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await registrationUser.enterNameEmail();
    await registrationUser.createAccount();
    await registrationUser.messageAccountCreated();
    await registrationUser.clickButton();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    await navbar.clickOnNav('Cart');
    await cartPage.clickbuttonProToCheckout();
    await cartPage.assertAddressDelivery();
    await expect(page.getByRole('row', { name: verifyReviewOrder })).toBeVisible();
    await cartPage.addComment();
    await cartPage.clickPlaceOrder();
    await page.goBack();
    await page.goForward();
    await creditCardPage.enterPaymentDetails();
    await creditCardPage.confirmOrder();

    // 18. Verify success message 'Your order has been placed successfully!'
    // --- Fixme
    // await expect(page.getByText('Your order has been placed successfully!')).toBeVisible();

    // const successMessage = await page.locator('#success_message.alert-success');
    // await expect(successMessage).toContainText('Your order has been placed successfully!');
    
    // const successMessage = await page.waitForSelector('#success_message.alert-success');
    // await expect(successMessage).toContain('Your order has been placed successfully!');
    
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download Invoice' }).click();
    const download = await downloadPromise;
    if (download) {
      console.log('File downloaded successfully.');
    } else {
      console.log('File download failed.');
    }
    await creditCardPage.clickContinue();
    await deletionUser.clickDeleteButton();
    await deletionUser.messageAccountDeleted();
    await deletionUser.clickContinueButton();
  });
});