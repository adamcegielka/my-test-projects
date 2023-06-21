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
    // await creditCardPage.confirmOrder();
    // 18. Verify success message 'Your order has been placed successfully!'
     // --- Fixme
    //  const [_, successMessage] = await Promise.all([
    //   page.getByRole('button', { name: 'Pay and Confirm Order' }).click(),
    //   page.getByText('Your order has been placed successfully!')])         
    // expect(successMessage).toBeVisible();
    // --- Fixme    
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

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Add products to cart
5. Click 'Cart' button
6. Verify that cart page is displayed
7. Click Proceed To Checkout
8. Click 'Register / Login' button
9. Fill all details in Signup and create account
10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
11. Verify ' Logged in as username' at top
12.Click 'Cart' button
13. Click 'Proceed To Checkout' button
14. Verify Address Details and Review Your Order
15. Enter description in comment text area and click 'Place Order'
16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
17. Click 'Pay and Confirm Order' button
18. Verify success message 'Your order has been placed successfully!'
19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
20. Click 'Continue' button
21. Click 'Delete Account' button
22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/