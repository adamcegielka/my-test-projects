import { test, expect, chromium } from '@playwright/test';
import { testCase14Data } from '../test-data/testCase14.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { testPaymentByCarsData } from '../test-data/testPaymentByCard.data';
import { RegistrationPage } from '../pages/registration.page';
import { CreditCardPage } from '../pages/paymentByCard.page';

test.describe('Test Case 14: Place Order: Register while Checkout', () => {

  test('register while checkout', async ({ page }) => {
    // testRegistrationData
    const userId = testRegistrationData.userId;
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;
    const firstName = testRegistrationData.firstName;
    const lastName = testRegistrationData.lastName;
    const birthDay = testRegistrationData.birthDay;
    const birthMonth = testRegistrationData.birthMonth;
    const birthYear = testRegistrationData.birthYear;
    const companyName = testRegistrationData.companyName;
    const address1 = testRegistrationData.address1;
    const zipCode = testRegistrationData.zipCode;
    const city = testRegistrationData.city;
    const state = testRegistrationData.state;
    const country = testRegistrationData.country;
    const mobileNumber = testRegistrationData.mobileNumber;
    // testPaymentByCarsData
    const cardVendor = testPaymentByCarsData.cardVendor;
    const cardNumber = testPaymentByCarsData.cardNumber;
    const cardCvv = testPaymentByCarsData.cardCvv;
    const cardExpirationateMonth = testPaymentByCarsData.cardExpirationateMonth;
    const cardExpirationateYear = testPaymentByCarsData.cardExpirationateYear;
    // testCase14Data
    const urlCart = testCase14Data.urlCart;
    const verifyHomePage = testCase14Data.verifyHomePage;
    const verifyAddress = testCase14Data.verifyAddress;
    const verifyOrder = testCase14Data.verifyOrder;
    const messageText = testCase14Data.messageText;
    const messageOrderConfirmed = testCase14Data.messageOrderConfirmed;
    const verifyShoppingCart = testCase14Data.verifyShoppingCart;
    const verifyAccountCreated = testCase14Data.verifyAccountCreated;
    const verifyAccountDeleted = testCase14Data.verifyAccountDeleted;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Add products to cart
    const blueTop = await page.waitForSelector('[data-product-id="3"]');
    await blueTop.click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // 5. Click 'Cart' button
    await page.getByRole('link', { name: 'Cart' }).click();

    // 6. Verify that cart page is displayed
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();

    // 7. Click Proceed To Checkout
    await page.getByText('Proceed To Checkout').click();

    // 8. Click 'Register / Login' button
    await page.getByRole('link', { name: 'Register / Login' }).click();

    // 9. Fill all details in Signup and create account
    // POM - Page Object Model
    const registrationPage = new RegistrationPage(page)
    await registrationPage.userId.fill(userId);
    await registrationPage.userEmail.fill(userEmail);
    await registrationPage.signupButton.click();
    await registrationPage.courtesyPhrase.check();
    await registrationPage.userPassword.fill(userPassword);
    await registrationPage.birthDay.selectOption(birthDay);
    await registrationPage.birthMonth.selectOption(birthMonth);
    await registrationPage.birthYear.selectOption(birthYear);
    await registrationPage.firstName.fill(firstName);
    await registrationPage.lastName.fill(lastName);
    await registrationPage.companyName.fill(companyName);
    await registrationPage.address1.fill(address1);
    await registrationPage.country.selectOption(country);
    await registrationPage.state.fill(state);
    await registrationPage.city.fill(city);
    await registrationPage.zipCode.fill(zipCode);
    await registrationPage.mobileNumber.fill(mobileNumber);
    await registrationPage.createAccountButton.click();

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountCreated)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // 11. Verify ' Logged in as username' at top
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();

    // 12.Click 'Cart' button
    await page.getByRole('link', { name: 'Cart' }).click();

    // 13. Click 'Proceed To Checkout' button
    await page.getByText('Proceed To Checkout').click();

    // 14. Verify Address Details and Review Your Order
    await expect(page.getByText(verifyAddress)).toBeVisible();    
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();

    // 15. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill(messageText);
    await page.getByRole('link', { name: 'Place Order' }).click();

    // EXIT FROM GOOGLE ADS
    await page.goto(urlCart);
    await page.getByText('Proceed To Checkout').click();
    await page.getByRole('link', { name: 'Place Order' }).click();

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    // POM - Page Object Model
    const creditCardPage = new CreditCardPage(page);
    await creditCardPage.cardVendor.fill(cardVendor);
    await creditCardPage.cardNumber.fill(cardNumber);
    await creditCardPage.cardCvv.fill(cardCvv);
    await creditCardPage.cardExpirationateMonth.fill(cardExpirationateMonth);
    await creditCardPage.cardExpirationateYear.fill(cardExpirationateYear);

    // 17. Click 'Pay and Confirm Order' button
     await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // 18. Verify success message 'Your order has been placed successfully!'
    await expect(page.getByText(messageOrderConfirmed)).toBeVisible();

    // 19. Click 'Delete Account' button
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});