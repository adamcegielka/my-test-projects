import { test, expect, chromium } from '@playwright/test';
import { testCase03Data } from '../test-data/testCase03.data';
import { LoginIncorrectPage } from '../pages/loginIncorrect.page';

test.describe('Test Case 3: Login User with incorrect email and password', () => {
  test('login user with incorrect email and password', async ({ page }) => {
    const incorrectUserEmail = testCase03Data.incorrectUserEmail;
    const incorrectUserPassword = testCase03Data.incorrectUserPassword;

    const verifyHomePage = testCase03Data.verifyHomePage;
    const verifyLoginToAccount = testCase03Data.verifyLoginToAccount;
    const verifyErrorMessage = testCase03Data.verifyErrorMessage;

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

    // 6. Enter incorrect email address and password
    // POM - Page Object Model
    const loginIncorrectPage = new LoginIncorrectPage(page);
    await loginIncorrectPage.userEmailIncorrect.fill(incorrectUserEmail);
    await loginIncorrectPage.userPasswordIncorrect.fill(incorrectUserPassword);

    // 7. Click 'login' button
    await loginIncorrectPage.loginButton.click();

    // 8. Verify error 'Your email or password is incorrect!' is visible
    await expect(page.getByText(verifyErrorMessage)).toBeVisible();

    // CLOSE BROWSER
    await page.close();
  });
});
