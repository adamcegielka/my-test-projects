import { test, expect, chromium } from '@playwright/test';
import { testCase20Data } from '../test-data/testCase20.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { RegistrationUser } from '../page-objects/RegistrationUser';
import { LoginPage } from '../page-objects/LoginPage';
import { DeletionUser } from '../page-objects/DeletionUser';

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {
  let homePage: HomePage;
  let navbar: Navbar;
  let loginPage: LoginPage;

  // Creation a new user before the test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    navbar = new Navbar(page);
    loginPage = new LoginPage(page);
    const registerUser = new RegistrationUser(page);

    await homePage.navHomePage();
    await navbar.clickOnNav('Signup / Login');
    await registerUser.registerNewUser();
    await loginPage.logout();
  });

  // Deletion of a user after a test
  test.afterEach(async ({ page }) => {
    homePage = new HomePage(page);
    navbar = new Navbar(page);
    loginPage = new LoginPage(page);
    const deletionUser = new DeletionUser(page);

    await homePage.navHomePage();
    await navbar.clickOnNav('Signup / Login');
    await loginPage.login();
    await deletionUser.deletionNewUser();
  });

  // Test Case 20: Search Products and Verify Cart After Login
  test('search products and verify cart after login', async ({ page }) => {
    homePage = new HomePage(page);
    navbar = new Navbar(page);
    loginPage = new LoginPage(page);

    const searchProduct = testCase20Data.searchProduct;
    const verifyProducts = testCase20Data.verifyProducts;
    const verifyProductsAll = testCase20Data.verifyProductsAll;
    const verifyProductsSearched = testCase20Data.verifyProductsSearched;
    const verifyProductsSearchedAll = testCase20Data.verifyProductsSearchedAll;
    const verifyProductsInCart = testCase20Data.verifyProductsInCart;

    await chromium.launch();
    await homePage.navHomePage();
    await navbar.clickOnNav('Products');
    await page.goBack(); // EXIT FROM GOOGLE ADS
    await page.goForward(); // EXIT FROM GOOGLE ADS
    await expect(
      page.getByRole('heading', { name: verifyProducts })
    ).toBeVisible();
    await expect(page.getByText(verifyProductsAll)).toBeVisible();
    await page.type('#search_product', searchProduct);
    await page.click('#submit_search');
    await expect(
      page.getByRole('heading', { name: verifyProductsSearched })
    ).toBeVisible();
    await expect(page.getByText(verifyProductsSearchedAll)).toBeVisible();
    const blueTop = await page.waitForSelector('[data-product-id="1"]');
    await blueTop.click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(
      page.getByRole('row', { name: verifyProductsInCart })
    ).toBeVisible();
    await navbar.clickOnNav('Signup / Login');
    await loginPage.login();
    await navbar.clickOnNav('Cart');
    await expect(
      page.getByRole('row', { name: verifyProductsInCart })
    ).toBeVisible();
    await loginPage.logout();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Click on 'Products' button
4. Verify user is navigated to ALL PRODUCTS page successfully
5. Enter product name in search input and click search button
6. Verify 'SEARCHED PRODUCTS' is visible
7. Verify all the products related to search are visible
8. Add those products to cart
9. Click 'Cart' button and verify that products are visible in cart
10. Click 'Signup / Login' button and submit login details
11. Again, go to Cart page
12. Verify that those products are visible in cart after login as well
*/
