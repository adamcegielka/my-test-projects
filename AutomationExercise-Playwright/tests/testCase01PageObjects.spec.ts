import { test, expect, chromium } from '@playwright/test';
import { testCase01Data } from '../test-data/testCase01.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe.only('Test Case 1: Register User', () => {

  test('register user', async ({ page }) => {
    let homePage: HomePage = new HomePage(page);
    let navbar: Navbar = new Navbar(page);
    let registrationUser: RegistrationUser = new RegistrationUser(page);
    let deletionUse: DeletionUser = new DeletionUser(page);

    const userId = testRegistrationData.userId;
    const verifyNewUser = testCase01Data.verifyNewUser;
    const verifEenterAccountInformation = testCase01Data.verifEenterAccountInformation;
    const verifAccountCreated = testCase01Data.verifAccountCreated;
    const verifAccountDeleted = testCase01Data.verifAccountDeleted;

    // 1. Launch browser    
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.navHomePage();

    // 3. Verify that home page is visible successfully
    await homePage.verifytTitlePage();
    await homePage.verifyHomePage();

    // 4. Click on 'Signup / Login' button
    await navbar.clickOnNav('Signup / Login');

    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByText(verifyNewUser)).toBeVisible();

    // 6. Enter name and email address
    // 7. Click 'Signup' button
    await registrationUser.enterNameEmail();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText(verifEenterAccountInformation)).toBeVisible();

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // 10. Select checkbox 'Sign up for our newsletter!'
    // 11. Select checkbox 'Receive special offers from our partners!'
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    // 13. Click 'Create Account button'
    await registrationUser.createAccount();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.getByText(verifAccountCreated)).toBeVisible();

    // 15. Click 'Continue' button
    await registrationUser.clickButton();

    // 16. Verify that 'Logged in as username' is visible
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();


    // 17. Click 'Delete Account' button
    await deletionUse.clickDeleteButton();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.getByText(verifAccountDeleted)).toBeVisible();
    await deletionUse.clickContinueButton();

    // CLOSE BROWSER
    await page.close();
  });
});
