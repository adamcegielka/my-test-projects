import { test, expect, chromium } from '@playwright/test';
import { testCase01Data } from '../test-data/testCase01.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { RegistrationPage } from '../pages/registration.page';

test.describe('Test Case 01: Register User', () => {
  test('TC01 register user', async ({ page }) => {
    const userId = testRegistrationData.userId;
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;
    const birthDay = testRegistrationData.birthDay;
    const birthMonth = testRegistrationData.birthMonth;
    const birthYear = testRegistrationData.birthYear;
    const firstName = testRegistrationData.firstName;
    const lastName = testRegistrationData.lastName;
    const companyName = testRegistrationData.companyName;
    const address1 = testRegistrationData.address1;
    const country = testRegistrationData.country;
    const state = testRegistrationData.state;
    const city = testRegistrationData.city;
    const zipCode = testRegistrationData.zipCode;
    const mobileNumber = testRegistrationData.mobileNumber;

    const verifyHomePage = testCase01Data.verifyHomePage;
    const verifyNewUser = testCase01Data.verifyNewUser;
    const verifEenterAccountInformation = testCase01Data.verifEenterAccountInformation;
    const verifAccountCreated = testCase01Data.verifAccountCreated;
    const verifAccountDeleted = testCase01Data.verifAccountDeleted;

    // Blocking of network resources that generate Ads
    await page.route("**/*", route => {
      route.request().url().startsWith("https://googleads.") ?
        route.abort() : route.continue();
      return;
    });
    // --- End code

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click on 'Signup / Login' button
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByText(verifyNewUser)).toBeVisible();

    // 6. Enter name and email address
    // POM - Page Object Model
    const registrationPage = new RegistrationPage(page);

    await registrationPage.userId.fill(userId);
    await registrationPage.userEmail.fill(userEmail);

    // 7. Click 'Signup' button
    await registrationPage.signupButton.click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText(verifEenterAccountInformation)).toBeVisible();

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    await registrationPage.courtesyPhrase.check();
    await registrationPage.userPassword.fill(userPassword);
    await registrationPage.birthDay.selectOption(birthDay);
    await registrationPage.birthMonth.selectOption(birthMonth);
    await registrationPage.birthYear.selectOption(birthYear);

    // 10. Select checkbox 'Sign up for our newsletter!'
    await registrationPage.checkboxNewsletter.check();

    // 11. Select checkbox 'Receive special offers from our partners!'
    await registrationPage.checkboxOffers.check();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await registrationPage.firstName.fill(firstName);
    await registrationPage.lastName.fill(lastName);
    await registrationPage.companyName.fill(companyName);
    await registrationPage.address1.fill(address1);
    await registrationPage.country.selectOption(country);
    await registrationPage.state.fill(state);
    await registrationPage.city.fill(city);
    await registrationPage.zipCode.fill(zipCode);
    await registrationPage.mobileNumber.fill(mobileNumber);

    // 13. Click 'Create Account button'
    await registrationPage.createAccountButton.click();

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
