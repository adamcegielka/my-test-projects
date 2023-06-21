import { test, expect, chromium } from '@playwright/test';
import { testCase15Data } from '../test-data/testCase15.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { testPaymentByCarsData } from '../test-data/testPaymentByCard.data';
import { RegistrationPage } from '../pages/registration.page';
import { CreditCardPage } from '../pages/paymentByCard.page';

test.describe('Test Case 15: Place Order: Register before Checkout', () => {

  test('register before checkout', async ({ page }) => {
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
    // testCase15Data
    const urlCart = testCase15Data.urlCart;
    const verifyHomePage = testCase15Data.verifyHomePage;
    const verifyOrder = testCase15Data.verifyOrder;
    const messageText = testCase15Data.messageText;
    const verifyShoppingCart = testCase15Data.verifyShoppingCart;
    const verifyAccountCreated = testCase15Data.verifyAccountCreated;
    const verifyAccountDeleted = testCase15Data.verifyAccountDeleted;
    const verifynameSurname = testCase15Data.verifynameSurname;
    const verifyCountryCityZip = testCase15Data.verifyCountryCityZip;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click 'Signup / Login' button
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 5. Fill all details in Signup and create account
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

    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountCreated)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // 7. Verify ' Logged in as username' at top
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();

    // 8. Add products to cart
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();

    // 9. Click 'Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 10. Verify that cart page is displayed
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();

    // 11. Click Proceed To Checkout
    await page.getByText('Proceed To Checkout').click();

    // 12. Verify Address Details and Review Your Order 
    await expect(page.locator('#address_delivery').getByText(verifynameSurname)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(companyName)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(address1)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(verifyCountryCityZip)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(country)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(mobileNumber)).toBeVisible();    
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();

    // 13. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill(messageText);
    await page.getByRole('link', { name: 'Place Order' }).click();

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goBack();
    await page.goForward();

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date   
    // POM - Page Object Model
    const creditCardPage = new CreditCardPage(page);
    await creditCardPage.cardVendor.fill(cardVendor);
    await creditCardPage.cardNumber.fill(cardNumber);
    await creditCardPage.cardCvv.fill(cardCvv);
    await creditCardPage.cardExpirationateMonth.fill(cardExpirationateMonth);
    await creditCardPage.cardExpirationateYear.fill(cardExpirationateYear);

    // 15. Click 'Pay and Confirm Order' button
     await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // 16. Verify success message 'Your order has been placed successfully!'
    // --- Fixme
    // const successMessageText = await page.evaluate(() => {
    //     const successMessage = document.querySelector('#success_message.alert-success');
    //     return successMessage?.textContent?.trim() ?? '';
    //   });
    // expect(successMessageText).toBe('Your order has been placed successfully!'); 
    // --- Fixme
    
    // 17. Click 'Delete Account' button
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});