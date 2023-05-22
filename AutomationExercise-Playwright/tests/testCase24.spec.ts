import { test, expect, chromium } from '@playwright/test';
import { testCase24Data } from '../test-data/testCase24.data';

test.describe('Test Case 24: Download Invoice after purchase order', () => {
  
  test('download invoice after purchase order', async ({ page }) => {
    const url = testCase24Data.url;
    const urlCart = testCase24Data.urlCart;
    const userId = testCase24Data.userId;
    const email = testCase24Data.email;
    const userPassword = testCase24Data.userPassword;
    const firstName = testCase24Data.firstName;
    const lastName = testCase24Data.lastName;
    const birthDay = testCase24Data.birthDay;
    const birthMonth = testCase24Data.birthMonth;
    const birthYear = testCase24Data.birthYear;
    const companyName = testCase24Data.companyName;
    const address1 = testCase24Data.address1;
    const zipCode = testCase24Data.zipCode;
    const city = testCase24Data.city;
    const state = testCase24Data.state;
    const country = testCase24Data.country;
    const mobileNumber = testCase24Data.mobileNumber;
    const cardName = testCase24Data.cardName;
    const cardNumber = testCase24Data.cardNumber;
    const cardCvv = testCase24Data.cardCvv;
    const cardExpirationateMonth = testCase24Data.cardExpirationateMonth;
    const cardExpirationateYear = testCase24Data.cardExpirationateYear;
    const verifyShoppingCart = testCase24Data.verifyShoppingCart;
    const verifyAccountCreated = testCase24Data.verifyAccountCreated;
    const verifyAccountDeleted = testCase24Data.verifyAccountDeleted;
    const verifyNameSurname = testCase24Data.verifyNameSurname;
    const verifyCountryCityZip = testCase24Data.verifyCountryCityZip;
    const verifyDeliveryAddress = testCase24Data.verifyDeliveryAddress;
    const messageText = testCase24Data.messageText;
    const messageOrderSuccessfully = testCase24Data.messageOrderSuccessfully;
    const verifyReviewOrder = testCase24Data.verifyReviewOrder;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Add products to cart
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();

    // 5. Click 'Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

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

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_2"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    // await page.frameLocator('iframe[name="aswift_2"]').getByRole('button', { name: 'Close ad' }).click();

    // 11. Verify ' Logged in as username' at top
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();

    // 12.Click 'Cart' button
    await page.getByRole('link', { name: ' Cart' }).click();
    
    // 13. Click 'Proceed To Checkout' button
    await page.getByText('Proceed To Checkout').click();

    // 14. Verify Address Details and Review Your Order
    await expect(page.getByText(verifyDeliveryAddress)).toBeVisible();  
    await expect(page.locator('#address_delivery').getByText(verifyNameSurname)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(companyName)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(address1)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(verifyCountryCityZip)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(country)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(mobileNumber)).toBeVisible();
    await expect(page.getByRole('row', { name: verifyReviewOrder })).toBeVisible();

    // 15. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill(messageText);
    await page.getByRole('link', { name: 'Place Order' }).click();

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await page.locator('input[name="name_on_card"]').fill(cardName);
    await page.locator('input[name="card_number"]').fill(cardNumber);
    await page.getByPlaceholder('ex. 311').fill(cardCvv);
    await page.getByPlaceholder('MM').fill(cardExpirationateMonth);
    await page.getByPlaceholder('YYYY').fill(cardExpirationateYear);

    // 17. Click 'Pay and Confirm Order' button
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // 18. Verify success message 'Your order has been placed successfully!'
    await expect(page.getByText(messageOrderSuccessfully)).toBeVisible();

    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download Invoice' }).click();
    const download = await downloadPromise;
    // verify invoice is downloaded successfully

    // 20. Click 'Continue' button
    await page.getByRole('link', { name: 'Continue' }).click();

    // 21. Click 'Delete Account' button
    await page.getByRole('link', { name: ' Delete Account' }).click();

    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});