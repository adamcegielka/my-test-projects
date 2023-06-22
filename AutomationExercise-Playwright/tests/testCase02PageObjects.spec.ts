import { test, expect, chromium } from '@playwright/test';
import { testCase02Data } from '../test-data/testCase02.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { LoginPage } from '../page-objects/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 2: login User with correct email and password', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;

  // Creation a new user before the test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    const registerUser = new RegistrationUser(page);

    await homePage.navHomePage();
    await navbar.clickOnNav('Signup / Login');
    await registerUser.enterNameEmail();
    await registerUser.createAccount();
    await registerUser.clickButton();
    await loginPage.logout();
  });

  // Test Case 2: login User with correct email and password
  test('TC02 POM login user with correct email and password', async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    const deletionUser = new DeletionUser(page);

    const userId = testRegistrationData.userId;
    const verifyLoginToAccount = testCase02Data.verifyLoginToAccount;

    // Blocking of network resources that generate Ads
    await page.route('**/*', (route) => {
      if (route.request().url().startsWith('https://googleads.')) {
        route.abort();
      } else {
        route.continue();
      }
    });
    // --- End code

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifytTitlePage();
    await homePage.verifyHomePage();
    await navbar.clickOnNav('Signup / Login');
    await expect(page.getByText(verifyLoginToAccount)).toBeVisible();
    await loginPage.login();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    await deletionUser.clickDeleteButton();
    await deletionUser.messageAccountDeleted();
    await deletionUser.clickContinueButton();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter correct email address and password
7. Click 'login' button
8. Verify that 'Logged in as username' is visible
9. Click 'Delete Account' button
10. Verify that 'ACCOUNT DELETED!' is visible
*/
