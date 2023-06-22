import { test, expect, chromium } from '@playwright/test';
import { testCase15Data } from '../test-data/testCase15.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { CartPage } from '../page-objects/CartPage';
import { CreditCardPage } from '../page-objects/CreditCardPage';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 15: Place Order: Register before Checkout', () => {
  test('register before checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    const registrationUset = new RegistrationUser(page);
    const cartPage = new CartPage(page);
    const creditCardPage = new CreditCardPage(page);
    const deletionUser = new DeletionUser(page);

    const userId = testRegistrationData.userId;
    const urlCart = testCase15Data.urlCart;
    const verifyOrder = testCase15Data.verifyOrder;
    const verifyShoppingCart = testCase15Data.verifyShoppingCart;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await navbar.clickOnNav('Signup / Login');
    await registrationUset.enterNameEmail();
    await registrationUset.createAccount();
    await registrationUset.messageAccountCreated();
    await registrationUset.clickButton();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();
    await cartPage.clickbuttonProToCheckout();
    await cartPage.assertAddressDelivery();
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();
    await cartPage.addComment();
    await cartPage.clickPlaceOrder();
    await page.goBack(); // EXIT FROM GOOGLE ADS
    await page.goForward(); // EXIT FROM GOOGLE ADS
    await creditCardPage.enterPaymentDetails();
    await creditCardPage.confirmOrder();
    // 16. Verify success message 'Your order has been placed successfully!'
    // --- Fixme
    // const [_, successMessage] = await Promise.all([
    //   page.getByRole('button', { name: 'Pay and Confirm Order' }).click(),
    //   page.getByText('Your order has been placed successfully!')])
    // expect(successMessage).toBeVisible();
    // --- Fixme
    await deletionUser.clickDeleteButton();
    await deletionUser.messageAccountDeleted();
    await deletionUser.clickContinueButton();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify ' Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify Address Details and Review Your Order
13. Enter description in comment text area and click 'Place Order'
14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
15. Click 'Pay and Confirm Order' button
16. Verify success message 'Your order has been placed successfully!'
17. Click 'Delete Account' button
18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/
