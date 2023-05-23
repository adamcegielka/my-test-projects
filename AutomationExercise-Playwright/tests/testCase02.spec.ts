import { test, expect, chromium } from '@playwright/test';
import { testCase02Data } from '../test-data/testCase02.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { registerUser } from './testRegistration.spec';
import { LoginPage } from '../pages/login.page';

test.describe('Test Case 2: login User with correct email and password', () => {

  // Creation a new user before the test
  test.beforeEach(registerUser);

  // Test Case 2: login User with correct email and password
  test('login user with correct email and password', async ({ page }) => {
    const userId = testRegistrationData.userId;
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;

    const verifyHomePage = testCase02Data.verifyHomePage;
    const verifyLoginInAccount = testCase02Data.verifyLoginInAccount;
    const verifAccountDeleted = testCase02Data.verifAccountDeleted;

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
    await expect(page.getByText(verifyLoginInAccount)).toBeVisible();

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
    await expect(page.getByText(verifAccountDeleted)).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();

    // CLOSE BROWSER
    await page.close();
  });  
});