import { test, expect, chromium } from '@playwright/test';
import { testCase15Data } from '../test-data/testCase15.data';

test.describe('Test Case 15: Place Order: Register before Checkout', () => {

  test('register before checkout', async ({ page }) => {
    const url = testCase15Data.url;
    const urlCart = testCase15Data.urlCart;
    const userId = testCase15Data.userId;
    const email = testCase15Data.email;
    const userPassword = testCase15Data.userPassword;
    const firstName = testCase15Data.firstName;
    const lastName = testCase15Data.lastName;
    const birthDay = testCase15Data.birthDay;
    const birthMonth = testCase15Data.birthMonth;
    const birthYear = testCase15Data.birthYear;
    const companyName = testCase15Data.companyName;
    const address1 = testCase15Data.address1;
    const zipCode = testCase15Data.zipCode;
    const city = testCase15Data.city;
    const state = testCase15Data.state;
    const country = testCase15Data.country;
    const mobileNumber = testCase15Data.mobileNumber;
    const cardVendor = testCase15Data.cardVendor;
    const cardNumber = testCase15Data.cardNumber;
    const cardCvv = testCase15Data.cardCvv;
    const cardExpirationateMonth = testCase15Data.cardExpirationateMonth;
    const cardExpirationateYear = testCase15Data.cardExpirationateYear;

    const verifyOrder = testCase15Data.verifyOrder;
    const messageText = testCase15Data.messageText;
    const messageOrderConfirmed = testCase15Data.messageOrderConfirmed;
    const verifyShoppingCart = testCase15Data.verifyShoppingCart;
    const verifyAccountCreated = testCase15Data.verifyAccountCreated;
    const verifyAccountDeleted = testCase15Data.verifyAccountDeleted;
    const verifynameSurname = testCase15Data.verifynameSurname;
    const verifyCountryCityZip = testCase15Data.verifyCountryCityZip;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Click 'Signup / Login' button
    await page.getByRole('link', { name: ' Signup / Login' }).click();

    // 5. Fill all details in Signup and create account
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

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date   
    await page.locator('input[name="name_on_card"]').fill(cardVendor);
    await page.locator('input[name="card_number"]').fill(cardNumber);
    await page.getByPlaceholder('ex. 311').fill(cardCvv);
    await page.getByPlaceholder('MM').fill(cardExpirationateMonth);
    await page.getByPlaceholder('YYYY').fill(cardExpirationateYear);

    // 15. Click 'Pay and Confirm Order' button
     await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // 16. Verify success message 'Your order has been placed successfully!'
    await expect(page.getByText(messageOrderConfirmed)).toBeVisible();
    
    // 17. Click 'Delete Account' button
    await page.getByRole('link', { name: ' Delete Account' }).click();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});