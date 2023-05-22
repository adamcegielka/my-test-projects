import { test, expect, chromium } from '@playwright/test';
import { testCase20Data } from '../test-data/testCase20.data';
import { registerUser } from './testRegistration.spec';

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {

  // Creation a new user before the test
  test.beforeEach(registerUser);

  // Test Case 20: Search Products and Verify Cart After Login
  test('search products and verify cart after login', async ({ page }) => {
    const url = testCase20Data.url;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);

    // 3. Click on 'Products' button
    await page.getByRole('link', { name: ' Products' }).click();

    // EXIT FROM GOOGLE ADS
    await page.frameLocator('iframe[name="aswift_6"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully

    // 5. Enter product name in search input and click search button

    // 6. Verify 'SEARCHED PRODUCTS' is visible

    // 7. Verify all the products related to search are visible

    // 8. Add those products to cart

    // 9. Click 'Cart' button and verify that products are visible in cart

    // 10. Click 'Signup / Login' button and submit login details

    // 11. Again, go to Cart page

    // 12. Verify that those products are visible in cart after login as well

  });
});