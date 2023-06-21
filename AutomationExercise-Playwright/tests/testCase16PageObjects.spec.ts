import { test, expect, chromium } from '@playwright/test';
import { testCase16Data } from '../test-data/testCase16.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';
import { CartPage } from '../page-objects/CartPage';
import { CreditCardPage } from '../page-objects/CreditCardPage';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 16: Place Order: Login before Checkout', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;

  // Creation a new user before the test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);    
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    const registerUser = new RegistrationUser(page);

    await homePage.navHomePage();
    await navbar.clickOnNav('Signup / Login');
    await registerUser.registerNewUser();
    await loginPage.logout();
  });

  // Test Case 16: Place Order: Login Before Checkout
  test('login before checkout', async ({ page }) => {
    homePage = new HomePage(page);
    navbar = new Navbar(page);
    loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const creditCardPage = new CreditCardPage(page);
    const deletionUser = new DeletionUser(page);

    const userId = testRegistrationData.userId;
    const urlCart = testCase16Data.urlCart;
    const verifyOrder = testCase16Data.verifyOrder;
    const verifyShoppingCart = testCase16Data.verifyShoppingCart;
    
    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await navbar.clickOnNav('Signup / Login');
    await loginPage.login();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();
    await cartPage.clickbuttonProToCheckout();
    await cartPage.assertAddressDelivery
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();
    await cartPage.addComment();
    await cartPage.clickPlaceOrder();
    await page.goBack();      // EXIT FROM GOOGLE ADS
    await page.goForward();   // EXIT FROM GOOGLE ADS
    await creditCardPage.enterPaymentDetails();
    // await creditCardPage.confirmOrder();
    // 15. Verify success message 'Your order has been placed successfully!'
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
5. Fill email, password and click 'Login' button
6. Verify 'Logged in as username' at top
7. Add products to cart
8. Click 'Cart' button
9. Verify that cart page is displayed
10. Click Proceed To Checkout
11. Verify Address Details and Review Your Order
12. Enter description in comment text area and click 'Place Order'
13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
14. Click 'Pay and Confirm Order' button
15. Verify success message 'Your order has been placed successfully!'
16. Click 'Delete Account' button
17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/