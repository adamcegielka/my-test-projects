import { test, expect, chromium } from '@playwright/test';
import { testCase08Data } from '../test-data/testCase08.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar'

test.describe('Test Case 8: Verify All Products and product detail page', () => {
  
  test.only('verify all products and product detail page', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);

    const urlProductDetails = testCase08Data.urlProductDetails;
    const messageProducts = testCase08Data.messageProducts;
    const messageProductList = testCase08Data.messageProductList;
    const messageProductDetails = testCase08Data.messageProductDetails;
    
    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await navbar.clickOnNav('Products');
    await page.goBack();    // EXIT FROM GOOGLE ADS
    await navbar.clickOnNav('Products');
    await expect(page.getByText(messageProducts)).toBeVisible();
    await expect(page.getByText(messageProductList)).toBeVisible();
    await page.locator('.choose > .nav > li > a').first().click();
    await expect(page).toHaveURL(urlProductDetails);
    await expect(page.getByText(messageProductDetails)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs. 500')).toBeVisible();
    await expect(page.getByText('Availability: In Stock')).toBeVisible();
    await expect(page.getByText('Condition: New')).toBeVisible();
    await expect(page.getByText('Brand: Polo')).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Products' button
5. Verify user is navigated to ALL PRODUCTS page successfully
6. The products list is visible
7. Click on 'View Product' of first product
8. User is landed to product detail page
9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
*/