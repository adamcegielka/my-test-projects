import { test, expect, chromium } from '@playwright/test';
import { testCase16Data } from '../test-data/testCase16.data';
import { registerUser } from './testCase16Registration.spec';

test.describe('Test Case 16: Place Order: Login before Checkout', () => {

  // Creation a new user before the test
  test.beforeEach(registerUser);

  // Test Case 16: Place Order: Login Before Checkout
  test('login before checkout', async ({ page }) => {
    const url = testCase16Data.url;    
    const urlCart = testCase16Data.urlCart;
    const userId = testCase16Data.userId;
    const email = testCase16Data.email;
    const userPassword = testCase16Data.userPassword;
    const companyName = testCase16Data.companyName;
    const address1 = testCase16Data.address1;    
    const country = testCase16Data.country;
    const mobileNumber = testCase16Data.mobileNumber;
    const cardVendor = testCase16Data.cardVendor;
    const cardNumber = testCase16Data.cardNumber;
    const cardCvv = testCase16Data.cardCvv;
    const cardExpirationateMonth = testCase16Data.cardExpirationateMonth;
    const cardExpirationateYear = testCase16Data.cardExpirationateYear;
    const verifyOrder = testCase16Data.verifyOrder;
    const messageText = testCase16Data.messageText;
    const messageOrderConfirmed = testCase16Data.messageOrderConfirmed;
    const verifyShoppingCart = testCase16Data.verifyShoppingCart;
    const verifyAccountDeleted = testCase16Data.verifyAccountDeleted;
    const verifynameSurname = testCase16Data.verifynameSurname;
    const verifyCountryCityZip = testCase16Data.verifyCountryCityZip;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);

    // 4. Click 'Signup / Login' button
    await page.getByRole('link', { name: ' Signup / Login' }).click();

    // 5. Fill email, password and click 'Login' button
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await page.getByPlaceholder('Password').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

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
    await expect(page.locator('#address_delivery').getByText(verifynameSurname)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(companyName)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(address1)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(verifyCountryCityZip)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(country)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(mobileNumber)).toBeVisible();    
    await expect(page.getByRole('row', { name: verifyOrder })).toBeVisible();

    // 12. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill(messageText);
    await page.getByRole('link', { name: 'Place Order' }).click();

    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await page.locator('input[name="name_on_card"]').fill(cardVendor);
    await page.locator('input[name="card_number"]').fill(cardNumber);
    await page.getByPlaceholder('ex. 311').fill(cardCvv);
    await page.getByPlaceholder('MM').fill(cardExpirationateMonth);
    await page.getByPlaceholder('YYYY').fill(cardExpirationateYear);

    // 14. Click 'Pay and Confirm Order' button
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    // 15. Verify success message 'Your order has been placed successfully!'
    await expect(page.getByText(messageOrderConfirmed)).toBeVisible();

    // 16. Click 'Delete Account' button
    await page.getByRole('link', { name: ' Delete Account' }).click();

    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});
