import { test, expect, chromium } from '@playwright/test';
import { testCase12Data } from '../test-data/testCase12.data';

test.describe('Test Case 12: Add Products in Cart', () => {
  test('add products in cart', async ({ page }) => {
    const productFirst = testCase12Data.productFirst;
    const productSecond = testCase12Data.productSecond;
    const productFirstVerifyPrice = testCase12Data.productFirstVerifyPrice;
    const productFirstQuantity = testCase12Data.productFirstQuantity;
    const productFirstVerifyTotalPrice = testCase12Data.productFirstVerifyTotalPrice;
    const productSecondVerifyPrice = testCase12Data.productSecondVerifyPrice;
    const productSecondQuantity = testCase12Data.productSecondQuantity;
    const productSecondVerifyTotalPrice = testCase12Data.productSecondVerifyTotalPrice;
    const verifyHomePage = testCase12Data.verifyHomePage;

    // 1. Launch browser
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click 'Products' button
    await page.click('.material-icons.card_travel');

    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_5"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goBack();
    await page.goForward();

    // 5. Hover over first product and click 'Add to cart'
    const blueTop = await page.waitForSelector('[data-product-id="1"]');
    await blueTop.click();

    // 6. Click 'Continue Shopping' button
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // 7. Hover over second product and click 'Add to cart'
    const menTshirt = await page.waitForSelector('[data-product-id="2"]');
    await menTshirt.click();

    // 8. Click 'View Cart' button
    await page.getByRole('link', { name: 'View Cart' }).click();

    // 9. Verify both products are added to Cart
    await expect(page.getByRole('row', { name: productFirst })).toBeVisible();
    await expect(page.getByRole('row', { name: productSecond })).toBeVisible();

    // 10. Verify their prices, quantity and total price
    await expect(page.getByText(productFirstVerifyPrice).first()).toBeVisible();
    await expect(
      page
        .getByRole('row', { name: productFirst })
        .getByRole('button', { name: productFirstQuantity })
    ).toBeVisible();
    await expect(
      page.getByText(productFirstVerifyTotalPrice).nth(1)
    ).toBeVisible();

    await expect(
      page.getByText(productSecondVerifyPrice).first()
    ).toBeVisible();
    await expect(
      page
        .getByRole('row', { name: productSecond })
        .getByRole('button', { name: productSecondQuantity })
    ).toBeVisible();
    await expect(
      page.getByText(productSecondVerifyTotalPrice).nth(1)
    ).toBeVisible();
  });
});
