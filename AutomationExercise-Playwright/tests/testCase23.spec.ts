import { test, expect, chromium } from '@playwright/test';
import { testCase23Data } from '../test-data/testCase23.data';

test.describe('Test Case 23: Verify address details in checkout page', () => {
  
  test('verify address details in checkout page', async ({ page }) => {
    const url = testCase23Data.url;
    const urlCart = testCase23Data.urlCart;
    const userId = testCase23Data.userId;
    const email = testCase23Data.email;
    const userPassword = testCase23Data.userPassword;
    const firstName = testCase23Data.firstName;
    const lastName = testCase23Data.lastName;
    const birthDay = testCase23Data.birthDay;
    const birthMonth = testCase23Data.birthMonth;
    const birthYear = testCase23Data.birthYear;
    const companyName = testCase23Data.companyName;
    const address1 = testCase23Data.address1;
    const zipCode = testCase23Data.zipCode;
    const city = testCase23Data.city;
    const state = testCase23Data.state;
    const country = testCase23Data.country;
    const mobileNumber = testCase23Data.mobileNumber;
    const verifyShoppingCart = testCase23Data.verifyShoppingCart;
    const verifyAccountCreated = testCase23Data.verifyAccountCreated;
    const verifyAccountDeleted = testCase23Data.verifyAccountDeleted;
    const verifyNameSurname = testCase23Data.verifyNameSurname;
    const verifyCountryCityZip = testCase23Data.verifyCountryCityZip;
    const verifyDeliveryAddress = testCase23Data.verifyDeliveryAddress;
    const verifyBillingyAddress = testCase23Data.verifyBillingyAddress;

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

    // 12. Verify that the delivery address is same address filled at the time registration of account
    await expect(page.getByText(verifyDeliveryAddress)).toBeVisible();  
    await expect(page.locator('#address_delivery').getByText(verifyNameSurname)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(companyName)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(address1)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(verifyCountryCityZip)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(country)).toBeVisible();
    await expect(page.locator('#address_delivery').getByText(mobileNumber)).toBeVisible();

    // 13. Verify that the billing address is same address filled at the time registration of account
    await expect(page.getByText(verifyBillingyAddress)).toBeVisible();
    await expect(page.locator('#address_invoice').getByText(verifyNameSurname)).toBeVisible();
    await expect(page.locator('#address_invoice').getByText(companyName)).toBeVisible();
    await expect(page.locator('#address_invoice').getByText(address1)).toBeVisible();
    await expect(page.locator('#address_invoice').getByText(verifyCountryCityZip)).toBeVisible();
    await expect(page.locator('#address_invoice').getByText(country)).toBeVisible();
    await expect(page.locator('#address_invoice').getByText(mobileNumber)).toBeVisible();

    // 14. Click 'Delete Account' button
    await page.getByRole('link', { name: ' Delete Account' }).click();

    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});