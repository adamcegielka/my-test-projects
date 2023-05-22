import { test, expect, chromium } from '@playwright/test';
import { testCase20Data } from '../test-data/testCase20.data';
import { registerUser } from './testRegistration.spec';
import { userDeletion } from './testUserDeletion.spec';

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {

  // Creation a new user before the test
  test.beforeEach(registerUser);

  // Deletion of a user after a test
  test.afterEach(userDeletion);

  // Test Case 20: Search Products and Verify Cart After Login
  test('search products and verify cart after login', async ({ page }) => {
    const url = testCase20Data.url;
    const email = testCase20Data.email;
    const userPassword = testCase20Data.userPassword;
    const verifyProducts = testCase20Data.verifyProducts;
    const verifyProductsAll = testCase20Data.verifyProductsAll;
    const verifyProductsSearched = testCase20Data.verifyProductsSearched;
    const verifyProductsSearchedAll = testCase20Data.verifyProductsSearchedAll;
    const verifyProductsInCart = testCase20Data.verifyProductsInCart;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Click on 'Products' button
    await page.getByRole('link', { name: ' Products' }).click();

    // EXIT FROM GOOGLE ADS
    await page.goto(url);
    await page.getByRole('link', { name: ' Products' }).click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByRole('heading', { name: verifyProducts })).toBeVisible();
    await expect(page.getByText(verifyProductsAll)).toBeVisible();

    // 5. Enter product name in search input and click search button
    await page.getByPlaceholder('Search Product').fill('Blue Top');
    await page.getByRole('button', { name: '' }).click();

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
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await page.getByPlaceholder('Password').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    // 11. Again, go to Cart page
    await page.getByRole('link', { name: ' Cart' }).click();

    // 12. Verify that those products are visible in cart after login as well
    await expect(page.getByRole('row', { name: verifyProductsInCart })).toBeVisible();

    // Logout
    await page.getByRole('link', { name: ' Logout' }).click();
  });
});