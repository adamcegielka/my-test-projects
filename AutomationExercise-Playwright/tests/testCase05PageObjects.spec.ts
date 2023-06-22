import { test, expect, chromium } from '@playwright/test';
import { testCase05Data } from '../test-data/testCase05.data';
import { HomePage } from '../page-objects/HomePage';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { LoginPage } from '../page-objects/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 5: Register User with existing email', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let registerUser: RegistrationUser;

  // Creation a new user before the test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    registerUser = new RegistrationUser(page);

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

  // Test Case 5: Register User with existing email
  test('register user with existing email', async ({ page }) => {
    homePage = new HomePage(page);
    navbar = new Navbar(page);
    registerUser = new RegistrationUser(page);

    const verifyNewUserSignup = testCase05Data.verifyNewUserSignup;
    const verifyEmailAlreadyExist = testCase05Data.verifyEmailAlreadyExist;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifytTitlePage();
    await homePage.verifyHomePage();
    await navbar.clickOnNav('Signup / Login');
    await expect(page.getByText(verifyNewUserSignup)).toBeVisible();
    await registerUser.enterUserIdNew();
    await registerUser.enterUserEmail();
    await registerUser.clickSignupButton();
    await expect(page.getByText(verifyEmailAlreadyExist)).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and already registered email address
7. Click 'Signup' button
8. Verify error 'Email Address already exist!' is visible
*/
