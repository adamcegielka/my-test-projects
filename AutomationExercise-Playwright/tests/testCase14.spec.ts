import { test, expect, chromium } from '@playwright/test';
import { testCase14Data } from '../test-data/testCase14.data';

test.describe('Test Case 14: Place Order: Register while Checkout', () => {

  test('register while checkout', async ({ page }) => {
    const url = testCase14Data.url;
    const urlCart = testCase14Data.urlCart;
    const userId = testCase14Data.userId;
    const email = testCase14Data.email;
    const userPassword = testCase14Data.userPassword;
    const firstName = testCase14Data.firstName;
    const lastName = testCase14Data.lastName;
    const birthDay = testCase14Data.birthDay;
    const birthMonth = testCase14Data.birthMonth;
    const birthYear = testCase14Data.birthYear;
    const companyName = testCase14Data.companyName;
    const address1 = testCase14Data.address1;
    const zipCode = testCase14Data.zipCode;
    const city = testCase14Data.city;
    const state = testCase14Data.state;
    const country = testCase14Data.country;
    const mobileNumber = testCase14Data.mobileNumber;
    const cardVendor = testCase14Data.cardVendor;
    const cardNumber = testCase14Data.cardNumber;
    const cardCvv = testCase14Data.cardCvv;
    const cardExpirationateMonth = testCase14Data.cardExpirationateMonth;
    const cardExpirationateYear = testCase14Data.cardExpirationateYear;

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
    await page.goto(url);    

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Add products to cart
    const blueTop = await page.waitForSelector('[data-product-id="3"]');
    await blueTop.click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // 5. Click 'Cart' button
    await page.getByRole('link', { name: ' Cart' }).click();

    // 6. Verify that cart page is displayed
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();

    // 7. Click Proceed To Checkout
    await page.getByText('Proceed To Checkout').click();

    // 8. Click 'Register / Login' button
    await page.getByRole('link', { name: 'Register / Login' }).click();

    // 9. Fill all details in Signup and create account
    await page.getByPlaceholder('Name').fill(userId);
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
    await page.getByRole('button', { name: 'Signup' }).click();

    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').fill(userPassword);
    await page.locator('#days').selectOption(birthDay);
    await page.locator('#months').selectOption(birthMonth);
    await page.locator('#years').selectOption(birthYear);
    await page.getByLabel('First name *').fill(firstName);
    await page.getByLabel('Last name *').fill(lastName);
    await page.getByLabel('Company', { exact: true }).fill(companyName);
    await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill(address1);
    await page.getByRole('combobox', { name: 'Country *' }).selectOption(country);
    await page.getByLabel('State *').fill(state);
    await page.getByLabel('City *').fill(city);
    await page.locator('#zipcode').fill(zipCode);
    await page.getByLabel('Mobile Number *').fill(mobileNumber);
    await page.getByRole('button', { name: 'Create Account' }).click();

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountCreated)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // 11. Verify ' Logged in as username' at top
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();

    // 12.Click 'Cart' button
    await page.getByRole('link', { name: ' Cart' }).click();

    // 13. Click 'Proceed To Checkout' button
    await page.getByText('Proceed To Checkout').click();

    // 14. Verify Address Details and Review Your Order
    await expect(page.getByText(verifyAddress)).toBeVisible();    
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();

    // 15. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill(messageText);
    await page.getByRole('link', { name: 'Place Order' }).click();

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date    
    await page.locator('input[name="name_on_card"]').fill(cardVendor);
    await page.locator('input[name="card_number"]').fill(cardNumber);
    await page.getByPlaceholder('ex. 311').fill(cardCvv);
    await page.getByPlaceholder('MM').fill(cardExpirationateMonth);
    await page.getByPlaceholder('YYYY').fill(cardExpirationateYear);

    // 17. Click 'Pay and Confirm Order' button
     await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // 18. Verify success message 'Your order has been placed successfully!'
    await expect(page.getByText(messageOrderConfirmed)).toBeVisible();

    // 19. Click 'Delete Account' button
    await page.getByRole('link', { name: ' Delete Account' }).click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});