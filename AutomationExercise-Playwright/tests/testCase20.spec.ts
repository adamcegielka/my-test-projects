import { test, expect, chromium } from '@playwright/test';
import { testCase20Data } from '../test-data/testCase20.data';
import { testRegistrationData } from '../test-data/testRegistration.data';
import { registerUser } from './testRegistration.spec';
import { userDeletion } from './testUserDeletion.spec';
import { LoginPage } from '../pages/login.page';

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {

  // Creation a new user before the test
  test.beforeEach(registerUser);

  // Deletion of a user after a test
  test.afterEach(userDeletion);

  // Test Case 20: Search Products and Verify Cart After Login
  test('search products and verify cart after login', async ({ page }) => {
    // testRegistrationData
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;
    // testCase20Data
    const searchProduct = testCase20Data.searchProduct;
    const verifyProducts = testCase20Data.verifyProducts;
    const verifyProductsAll = testCase20Data.verifyProductsAll;
    const verifyProductsSearched = testCase20Data.verifyProductsSearched;
    const verifyProductsSearchedAll = testCase20Data.verifyProductsSearchedAll;
    const verifyProductsInCart = testCase20Data.verifyProductsInCart;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Click on 'Products' button
    await page.getByRole('link', { name: 'Products' }).click();

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_6"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goto('/');
    await page.click('.material-icons.card_travel');

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByRole('heading', { name: verifyProducts })).toBeVisible();
    await expect(page.getByText(verifyProductsAll)).toBeVisible();

    // 5. Enter product name in search input and click search button
      // await page.getByPlaceholder('Search Product').fill(searchProduct);
      // await page.getByRole('button', { name: '' }).click();
      // or:
    await page.type('#search_product', searchProduct);
    await page.click('#submit_search');

    // 6. Verify 'SEARCHED PRODUCTS' is visible
    await expect(page.getByRole('heading', { name: verifyProductsSearched })).toBeVisible();

    // 7. Verify all the products related to search are visible
    await expect(page.getByText(verifyProductsSearchedAll)).toBeVisible();

    // 8. Add those products to cart
    const blueTop = await page.waitForSelector('[data-product-id="1"]');
    await blueTop.click();

    // 9. Click 'Cart' button and verify that products are visible in cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 10. Click 'Signup / Login' button and submit login details
    // POM - Page Object Model
    const loginPage = new LoginPage(page);
    await loginPage.signupLogin.click();
    await loginPage.userEmail.fill(userEmail);
    await loginPage.userPassword.fill(userPassword);
    await loginPage.loginButton.click();

    // 11. Again, go to Cart page
    await page.getByRole('link', { name: 'Cart' }).click();

    // 12. Verify that those products are visible in cart after login as well
    await expect(page.getByRole('row', { name: verifyProductsInCart })).toBeVisible();

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();
  });
});