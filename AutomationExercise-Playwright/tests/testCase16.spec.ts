import { test, expect, chromium } from '@playwright/test';
import { testCase16Data } from '../test-data/testCase16.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { testPaymentByCarsData } from '../test-data/testPaymentByCard.data';
import { registerUser } from './testRegistration';
import { LoginPage } from '../pages/login.page';
import { CreditCardPage } from '../pages/paymentByCard.page';

test.describe('Test Case 16: Place Order: Login before Checkout', () => {
  // Creation a new user before the test
  test.beforeEach(async ({ page }) => {
    await registerUser(page);
  });

  // Test Case 16: Place Order: Login Before Checkout
  test('login before checkout', async ({ page }) => {
    // testRegistrationData
    const userId = testRegistrationData.userId;
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;
    const companyName = testRegistrationData.companyName;
    const address1 = testRegistrationData.address1;
    const country = testRegistrationData.country;
    const mobileNumber = testRegistrationData.mobileNumber;
    // testPaymentByCarsData
    const cardVendor = testPaymentByCarsData.cardVendor;
    const cardNumber = testPaymentByCarsData.cardNumber;
    const cardCvv = testPaymentByCarsData.cardCvv;
    const cardExpirationateMonth = testPaymentByCarsData.cardExpirationateMonth;
    const cardExpirationateYear = testPaymentByCarsData.cardExpirationateYear;
    // testCase16Data
    const urlCart = testCase16Data.urlCart;
    const verifyHomePage = testCase16Data.verifyHomePage;
    const verifyOrder = testCase16Data.verifyOrder;
    const messageText = testCase16Data.messageText;
    const verifyShoppingCart = testCase16Data.verifyShoppingCart;
    const verifyAccountDeleted = testCase16Data.verifyAccountDeleted;
    const verifyNameSurname = testCase16Data.verifyNameSurname;
    const verifyCountryCityZip = testCase16Data.verifyCountryCityZip;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click 'Signup / Login' button
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 5. Fill email, password and click 'Login' button
    // POM - Page Object Model
    const loginPage = new LoginPage(page);
    await loginPage.userEmail.fill(userEmail);
    await loginPage.userPassword.fill(userPassword);
    await loginPage.loginButton.click();

    // 6. Verify 'Logged in as username' at top
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();

    // 7. Add products to cart
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();

    // 8. Click 'Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 9. Verify that cart page is displayed
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();

    // 10. Click Proceed To Checkout
    await page.getByText('Proceed To Checkout').click();

    // 11. Verify Address Details and Review Your Order
    await expect(page.locator('#address_delivery').getByText(companyName)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(address1)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(country)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(mobileNumber)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(verifyNameSurname)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(verifyCountryCityZip)).toBeVisible();
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();

    // 12. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill(messageText);
    await page.getByRole('link', { name: 'Place Order' }).click();

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goBack();
    await page.goForward();

    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // POM - Page Object Model
    const creditCardPage = new CreditCardPage(page);
    await creditCardPage.cardVendor.fill(cardVendor);
    await creditCardPage.cardNumber.fill(cardNumber);
    await creditCardPage.cardCvv.fill(cardCvv);
    await creditCardPage.cardExpirationateMonth.fill(cardExpirationateMonth);
    await creditCardPage.cardExpirationateYear.fill(cardExpirationateYear);

    // 14. Click 'Pay and Confirm Order' button
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // 15. Verify success message 'Your order has been placed successfully!'
    // --- Fixme
    // const [_, successMessage] = await Promise.all([
    //   page.getByRole('button', { name: 'Pay and Confirm Order' }).click(),
    //   page.getByText('Your order has been placed successfully!')])         
    // expect(successMessage).toBeVisible(); 
    // --- Fixme

    // 16. Click 'Delete Account' button
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});
