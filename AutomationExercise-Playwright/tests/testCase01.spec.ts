import { test, expect, chromium } from '@playwright/test';
import { testCase01Data } from '../test-data/testCase01.data';

test.describe('Test Case 1: Register User', () => {

  test.only('register user', async ({ page }) => {
    const userId = testCase01Data.userId;
    const userEmail = testCase01Data.userEmail;
    const userPassword = testCase01Data.userPassword;
    const birthDay = testCase01Data.birthDay;
    const birthMonth = testCase01Data.birthMonth;
    const birthYear = testCase01Data.birthYear;
    const firstName = testCase01Data.firstName;
    const lastName = testCase01Data.lastName;
    const companyName = testCase01Data.companyName;
    const address1 = testCase01Data.address1; 
    const country = testCase01Data.country;
    const state = testCase01Data.state;
    const city = testCase01Data.city;
    const zipcode = testCase01Data.zipcode;
    const mobileNumber = testCase01Data.mobileNumber;
    const checkboxNewsletter = testCase01Data.checkboxNewsletter;
    const checkboxOffers = testCase01Data.checkboxOffers;

    const verifyNewUser = testCase01Data.verifyNewUser;
    const verifEenterAccountInformation = testCase01Data.verifEenterAccountInformation;
    const verifAccountCreated = testCase01Data.verifAccountCreated;
    const verifAccountDeleted = testCase01Data.verifAccountDeleted;

    // 1. Launch browser    
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle('Automation Exercise');

    // 4. Click on 'Signup / Login' button
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByText(verifyNewUser)).toBeVisible();

    // 6. Enter name and email address
    await page.getByPlaceholder('Name').fill(userId);
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(userEmail);

    // 7. Click 'Signup' button
    await page.getByRole('button', { name: 'Signup' }).click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText(verifEenterAccountInformation)).toBeVisible();

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').fill(userPassword);
    await page.locator('#days').selectOption(birthDay);
    await page.locator('#months').selectOption(birthMonth);
    await page.locator('#years').selectOption(birthYear);

    // 10. Select checkbox 'Sign up for our newsletter!'
    await page.getByLabel(checkboxNewsletter).check();

    // 11. Select checkbox 'Receive special offers from our partners!'
    await page.getByLabel(checkboxOffers).check();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.getByLabel('First name *').fill(firstName);
    await page.getByLabel('Last name *').fill(lastName);
    await page.getByLabel('Company', { exact: true }).fill(companyName);
    await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill(address1);
    await page.getByRole('combobox', { name: 'Country *' }).selectOption(country);
    await page.getByLabel('State *').fill(state);
    await page.getByLabel('City *').fill(city);
    await page.locator('#zipcode').fill(zipcode);
    await page.getByLabel('Mobile Number *').fill(mobileNumber);

    // 13. Click 'Create Account button'
    await page.getByRole('button', { name: 'Create Account' }).click();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.getByText(verifAccountCreated)).toBeVisible();

    // 15. Click 'Continue' button
    await page.getByRole('link', { name: 'Continue' }).click();

    // 16. Verify that 'Logged in as username' is visible
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();

    // 17. Click 'Delete Account' button
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.getByText(verifAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // CLOSE BROWSER
    await page.close();
  });
});
