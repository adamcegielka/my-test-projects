import { test, expect, chromium } from '@playwright/test';
import { testCase01Data } from '../test-data/testCase01.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 1: Register User', () => {
  test('TC01 POM register user', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    const registrationUser = new RegistrationUser(page);
    const deletionUser = new DeletionUser(page);

    const userId = testRegistrationData.userId;
    const verifyNewUser = testCase01Data.verifyNewUser;
    const verifyEnterAccountInformation = testCase01Data.verifEenterAccountInformation;

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
    await expect(page.getByText(verifyNewUser)).toBeVisible();
    await registrationUser.enterNameEmail();
    await expect(page.getByText(verifyEnterAccountInformation)).toBeVisible();
    await registrationUser.createAccount();
    await registrationUser.messageAccountCreated();
    await registrationUser.clickButton();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    await deletionUser.clickDeleteButton();
    await deletionUser.messageAccountDeleted();
    await deletionUser.clickContinueButton();
    await page.close();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Signup / Login' button
5. Verify 'New User Signup!' is visible
6. Enter name and email address
7. Click 'Signup' button
8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
9. Fill details: Title, Name, Email, Password, Date of birth
10. Select checkbox 'Sign up for our newsletter!'
11. Select checkbox 'Receive special offers from our partners!'
12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
13. Click 'Create Account button'
14. Verify that 'ACCOUNT CREATED!' is visible
15. Click 'Continue' button
16. Verify that 'Logged in as username' is visible
17. Click 'Delete Account' button
18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
*/
