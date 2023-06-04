import { test, expect, chromium } from '@playwright/test';
import { testCase04Data } from '../test-data/testCase04.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { LoginPage } from '../page-objects/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe.only('Test Case 4: Logout User', () => {
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
    await registerUser.registerNewUser();
    await loginPage.logout();
  });

  // Deletion of a user after a test
  test.afterEach(async ({ page }) => {
    homePage = new HomePage(page);    
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    const deletionUser = new DeletionUser(page);

    await homePage.navHomePage();
    await navbar.clickOnNav('Signup / Login');
    await loginPage.login();
    await deletionUser.deletionNewUser();
  });

  // Test Case 4: Logout User
  test('logout user', async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    const userId = testRegistrationData.userId;
    const verifyLoginToAccount = testCase04Data.verifyLoginToAccount;
    const verifyUrlLogin = testCase04Data.verifyUrlLogin;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifytTitlePage();
    await homePage.verifyHomePage();
    await navbar.clickOnNav('Signup / Login');
    await expect(page.getByText(verifyLoginToAccount)).toBeVisible();
    await loginPage.login();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    await loginPage.logout();
    await expect(page).toHaveURL(verifyUrlLogin);
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
9. Click 'Logout' button
10. Verify that user is navigated to login page
*/
