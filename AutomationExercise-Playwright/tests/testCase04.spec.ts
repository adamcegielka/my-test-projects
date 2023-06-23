import { test, expect, chromium } from '@playwright/test';
import { testCase04Data } from '../test-data/testCase04.data';
import { registerUser } from './testRegistration';
import { userDeletion } from './testUserDeletion';
import { LoginPage } from '../pages/login.page';

test.describe('Test Case 4: Logout User', () => {
  // Creation a new user before the test
  test.beforeEach(async ({ page }) => {
    await registerUser(page);
  });

  // Deletion of a user after a test
  test.afterEach(async ({ page }) => {
    await userDeletion(page);
  });

  // Test Case 4: Logout User
  test('TC04 logout user', async ({ page }) => {
    const userId = testCase04Data.userId;
    const userEmail = testCase04Data.userEmail;
    const userPassword = testCase04Data.userPassword;

    const verifyHomePage = testCase04Data.verifyHomePage;
    const verifyLoginToAccount = testCase04Data.verifyLoginToAccount;
    const verifyUrlLogin = testCase04Data.verifyUrlLogin;

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
