import { test, expect, chromium } from '@playwright/test';

test.describe('Test Case 14: Place Order: Register while Checkout', () => {

  test('register while checkou', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const urlCart = 'https://automationexercise.com/view_cart';
    const userId = 'AdrianoJ';
    const email = 'adrian.jackson@mail.com';
    const userPassword = '1a2b3c4d';
    const firstName = 'Adrian';
    const lastName = 'Jackson';
    const birthDay = '9';
    const birthMonth = '5';
    const birthYear = '1985';
    const companyName = 'Porta Limited';
    const address1 = '50 Herzi Street APT 93';
    const zipCode = '84739';
    const city = 'Washington';
    const state = 'Washington';
    const country = 'United States';
    const mobileNumber = '801222333';
    const cardVendor = 'Visa';
    const cardNumber = '4070723055941987';
    const cardCvv = '981';
    const cardExpirationateMonth = '11';
    const cardExpirationateYear = '25';

    const verifyAddress = 'Your delivery address Mr. Adrian Jackson Porta Limited 50 Herzi Street APT 9';
    const verifyOrder = 'Product Image Sleeveless Dress Women > Dress Rs. 1000 1 Rs. 1000';
    const messageText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
    const messageOrderConfirmed = 'Congratulations! Your order has been confirmed!';

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 4. Add products to cart
    const blueTop = await page.waitForSelector('[data-product-id="3"]');
    await blueTop.click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // 5. Click 'Cart' button
    await page.getByRole('link', { name: ' Cart' }).click();

    // 6. Verify that cart page is displayed
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText('Shopping Cart')).toBeVisible();

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
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
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
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});