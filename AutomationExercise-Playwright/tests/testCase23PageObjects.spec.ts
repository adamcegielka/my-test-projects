import { test, expect, chromium } from '@playwright/test';
import { testCase23Data } from '../test-data/testCase23.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { CartPage } from '../page-objects/CartPage';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 23: Verify address details in checkout page', () => {
  
  test('verify address details in checkout page', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    const registrationUset = new RegistrationUser(page);
    const cartPage = new CartPage(page);
    const deletionUser = new DeletionUser(page);
    
    const userId = testRegistrationData.userId;       
    const urlCart = testCase23Data.urlCart;
    const verifyShoppingCart = testCase23Data.verifyShoppingCart;
    
    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await navbar.clickOnNav('Signup / Login')
    await registrationUset.enterNameEmail();
    await registrationUset.createAccount();
    await registrationUset.messageAccountCreated();
    await registrationUset.clickButton();
    await expect(page.getByText(`Logged in as ${userId}`)).toBeVisible();
    const winterTop = await page.waitForSelector('[data-product-id="5"]');
    await winterTop.click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page).toHaveURL(urlCart);
    await expect(page.getByText(verifyShoppingCart)).toBeVisible();
    await cartPage.clickbuttonProToCheckout();
    await cartPage.assertAddressDelivery();
    await cartPage.assertAddressBillingy();
    await deletionUser.clickDeleteButton();
    await deletionUser.messageAccountDeleted();
    await deletionUser.clickContinueButton();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify ' Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify that the delivery address is same address filled at the time registration of account
13. Verify that the billing address is same address filled at the time registration of account
14. Click 'Delete Account' button
15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
*/