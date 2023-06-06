import { test, expect, chromium } from '@playwright/test';
import { testCase12Data } from '../test-data/testCase12.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';

test.describe('Test Case 12: Add Products in Cart', () => {
  
  test('add products in cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);

    const productFirst = testCase12Data.productFirst;
    const productSecond = testCase12Data.productSecond;
    const productFirstVerifyPrice = testCase12Data.productFirstVerifyPrice;
    const productFirstQuantity = testCase12Data.productFirstQuantity;
    const productFirstVerifyTotalPrice = testCase12Data.productFirstVerifyTotalPrice;
    const productSecondVerifyPrice = testCase12Data.productSecondVerifyPrice;
    const productSecondQuantity = testCase12Data.productSecondQuantity;
    const productSecondVerifyTotalPrice = testCase12Data.productSecondVerifyTotalPrice;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await navbar.clickOnNav('Products');
    await page.goBack();    // EXIT FROM GOOGLE ADS
    await navbar.clickOnNav('Products');
    const blueTop = await page.waitForSelector('[data-product-id="1"]');
    await blueTop.click(); 
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    const menTshirt = await page.waitForSelector('[data-product-id="2"]');
    await menTshirt.click();
    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page.getByRole('row', { name: productFirst })).toBeVisible();
    await expect(page.getByRole('row', { name: productSecond })).toBeVisible();
    await expect(page.getByText(productFirstVerifyPrice).first()).toBeVisible();
    await expect(page.getByRole('row', { name: productFirst }).getByRole('button', { name: productFirstQuantity })).toBeVisible();
    await expect(page.getByText(productFirstVerifyTotalPrice).nth(1)).toBeVisible();
    await expect(page.getByText(productSecondVerifyPrice).first()).toBeVisible();
    await expect(page.getByRole('row', { name: productSecond }).getByRole('button', { name: productSecondQuantity })).toBeVisible();
    await expect(page.getByText(productSecondVerifyTotalPrice).nth(1)).toBeVisible();
  });
});

/*
1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Products' button
5. Hover over first product and click 'Add to cart'
6. Click 'Continue Shopping' button
7. Hover over second product and click 'Add to cart'
8. Click 'View Cart' button
9. Verify both products are added to Cart
10. Verify their prices, quantity and total price
*/