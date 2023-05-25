import { test, expect, chromium } from '@playwright/test';
import { testCase23Data } from '../test-data/testCase23.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { RegistrationPage } from '../pages/registration.page';

test.describe('Test Case 23: Verify address details in checkout page', () => {
  
  test('verify address details in checkout page', async ({ page }) => {
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
    // testCase23Data    
    const verifyHomePage = testCase23Data.verifyHomePage;
    const urlCart = testCase23Data.urlCart;
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
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });
});