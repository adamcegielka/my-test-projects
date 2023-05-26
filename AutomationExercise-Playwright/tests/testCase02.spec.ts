import { test, expect, chromium } from '@playwright/test';
import { testCase02Data } from '../test-data/testCase02.data';
import { registerUser } from './testRegistration';
import { LoginPage } from '../pages/login.page';

test.describe('Test Case 2: login User with correct email and password', () => {
  // Creation a new user before the test
  test.beforeEach(async ({ page }) => {
    await registerUser(page);
  });

  // Test Case 2: login User with correct email and password
  test('login user with correct email and password', async ({ page }) => {
    const userId = testCase02Data.userId;
    const userEmail = testCase02Data.userEmail;
    const userPassword = testCase02Data.userPassword;

    const verifyHomePage = testCase02Data.verifyHomePage;
    const verifyLoginToAccount = testCase02Data.verifyLoginToAccount;
    const verifyAccountDeleted = testCase02Data.verifyAccountDeleted;

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

    // 9. Click 'Delete Account' button
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // 10. Verify that 'ACCOUNT DELETED!' is visible
    await expect(page.getByText(verifyAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // CLOSE BROWSER
    await page.close();
  });
});
