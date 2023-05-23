import { test, expect, chromium } from '@playwright/test';
import { testCase05Data } from '../test-data/testCase05.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { registerUser } from './testRegistration.spec';
import { userDeletion } from './testUserDeletion.spec';
import { RegistrationPage } from '../pages/registration.page';

test.describe('Test Case 5: Register User with existing email', () => {

  // Creation a new user before the test
  test.beforeEach(registerUser);

  // Deletion of a user after a test
  test.afterEach(userDeletion);

  // Test Case 5: Register User with existing email
  test('register user with existing email', async ({ page }) => {
    const userIdNew = testRegistrationData.userIdNew;
    const userEmail = testRegistrationData.userEmail;

    const verifyHomePage = testCase05Data.verifyHomePage;
    const verifyNewUserSignup = testCase05Data.verifyNewUserSignup;
    const verifyEmailAlreadyExist = testCase05Data.verifyEmailAlreadyExist;

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
    await expect(page.getByText(verifyNewUserSignup)).toBeVisible();

    // 6. Enter name and already registered email address
    // POM - Page Object Model
    const registrationPage = new RegistrationPage(page);
    await registrationPage.userIdNew.fill(userIdNew);
    await registrationPage.userEmail.fill(userEmail);

    // 7. Click 'Signup' button
    await registrationPage.signupButton.click();

    // 8. Verify error 'Email Address already exist!' is visible
    await expect(page.getByText(verifyEmailAlreadyExist)).toBeVisible();
  });  
});