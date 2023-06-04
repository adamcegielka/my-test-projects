import { test, expect, chromium } from '@playwright/test';
import { testCase03Data } from '../test-data/testCase03.data';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';

test.describe.only('Test Case 3: Login User with incorrect email and password', () => {

  test('login user with incorrect email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const navbar = new Navbar(page);

    const verifyLoginToAccount = testCase03Data.verifyLoginToAccount;
    const verifyErrorMessage = testCase03Data.verifyErrorMessage;
    
    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await navbar.clickOnNav('Signup / Login');
    await expect(page.getByText(verifyLoginToAccount)).toBeVisible();
    await loginPage.loginIncorrect();
    await expect(page.getByText(verifyErrorMessage)).toBeVisible();
    await page.close();
  });  
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'Login to your account' is visible
6. Enter incorrect email address and password
7. Click 'login' button
8. Verify error 'Your email or password is incorrect!' is visible
*/