import { test, expect, chromium } from '@playwright/test';
import { testCase14Data } from '../test-data/testCase14.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { DeletionUser } from '../page-objects/DeletionUser';
import { CreditCardPage } from '../page-objects/CreditCardPage';
import { CartPage } from '../page-objects/CartPage';

test.describe('Test Case 14: Place Order: Register while Checkout', () => {

  test('register while checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    const registrationUset = new RegistrationUser(page);
    const deletionUser = new DeletionUser(page);
    const creditCardPage = new CreditCardPage(page);
    const cartPage = new CartPage(page);
    
    const userId = testRegistrationData.userId;
    const verifyOrder = testCase14Data.verifyOrder;
    const verifyShoppingCart = testCase14Data.verifyShoppingCart;
    
    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    const blueTop = await page.waitForSelector('[data-product-id="3"]');
    await blueTop.click();
    await page.click('text="Continue Shopping"');
    await page.click('text="Cart"');
    await homePage.verifyUrlCart();
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();
    await cartPage.clickbuttonProToCheckout();
    await page.click('text="Register / Login"');
    await registrationUset.enterNameEmail();
    await registrationUset.createAccount();
    await registrationUset.messageAccountCreated();
    await registrationUset.clickButton();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    await navbar.clickOnNav('Cart')
    await cartPage.clickbuttonProToCheckout();
    await cartPage.assertAddressDelivery();
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();
    await cartPage.addComment();
    await cartPage.clickPlaceOrder();
    await page.goBack();      // EXIT FROM GOOGLE ADS
    await page.goForward();   // EXIT FROM GOOGLE ADS
    await creditCardPage.enterPaymentDetails();
    // await creditCardPage.confirmOrder();
    // 18. Verify success message 'Your order has been placed successfully!'
    // --- Fixme
    // const [_, successMessage] = await Promise.all([
    //   page.getByRole('button', { name: 'Pay and Confirm Order' }).click(),
    //   page.getByText('Your order has been placed successfully!')])         
    // expect(successMessage).toBeVisible();
    // --- Fixme
    await deletionUser.clickDeleteButton();
    await page.goBack();      // EXIT FROM GOOGLE ADS
    await page.goForward();   // EXIT FROM GOOGLE ADS
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
19. Click 'Delete Account' button
20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/