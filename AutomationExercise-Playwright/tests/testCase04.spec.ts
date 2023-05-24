import { test, expect, chromium } from '@playwright/test';
import { testCase04Data } from '../test-data/testCase04.data';
import { registerUser } from './testRegistration.spec';
import { userDeletion } from './testUserDeletion.spec';
import { LoginPage } from '../pages/login.page';

test.describe('Test Case 4: Logout User', () => {

  // Creation a new user before the test
  test.beforeEach(registerUser);

  // Deletion of a user after a test
  test.afterEach(userDeletion);

  // Test Case 4: Logout User
  test('logout user', async ({ page }) => {
    const userId = testCase04Data.userId;
    const userEmail = testCase04Data.userEmail;
    const userPassword = testCase04Data.userPassword;

    const verifyHomePage = testCase04Data.verifyHomePage;
    const verifyLoginToAccount = testCase04Data.verifyLoginToAccount;
    const verifyUrlLogin = testCase04Data.verifyUrlLogin;

    // 1. Launch browser    
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/'); 

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click on 'Signup / Login' button
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 5. Verify 'Login to your account' is visible
    await expect(page.getByText(verifyLoginToAccount)).toBeVisible();

    // 6. Enter correct email address and password
    // POM - Page Object Model
    const loginPage = new LoginPage(page);
    await loginPage.userEmail.fill(userEmail);
    await loginPage.userPassword.fill(userPassword);

    // 7. Click 'login' button
    await loginPage.loginButton.click();

    // 8. Verify that 'Logged in as username' is visible
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();

    // 9. Click 'Logout' button    
    await page.getByRole('link', { name: 'Logout' }).click();

    // 10. Verify that user is navigated to login page
    await expect(page).toHaveURL(verifyUrlLogin);
  });
});