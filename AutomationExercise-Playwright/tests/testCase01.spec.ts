import { test, expect } from '@playwright/test';

test.describe('Test Case 1: Register User', () => {
  test('AutomationExercise scenario tests', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userId = 'Smok Wawelski';
    const userEmail = 'wawelski@test.com';
    const userPassword = 'dragon102';
    const firstName = 'Smok';
    const lastName = 'Wawelski';
    const companyName = 'Krzak';
    const address1 = 'Podwawelska 66'; 
    const state = 'Arizona';
    const city = 'Amado';
    const zipcode = '85645';
    const mobileNumber = '8112223333';

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url); 
    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);   
    // 4. Click on 'Signup / Login' button
    await page.getByRole('link', { name: ' Signup / Login' }).click(); 
    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByText('New User Signup!')).toBeVisible();
    // 6. Enter name and email address
    await page.getByPlaceholder('Name').fill(userId); 
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(userEmail); 
    // 7. Click 'Signup' button
    await page.getByRole('button', { name: 'Signup' }).click(); 
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible(); 

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').fill(userPassword);
    await page.locator('#days').selectOption('6');
    await page.locator('#months').selectOption('4');
    await page.locator('#years').selectOption('1989');
    // 10. Select checkbox 'Sign up for our newsletter!'
    await page.getByLabel('Sign up for our newsletter!').check();
    // 11. Select checkbox 'Receive special offers from our partners!'
    await page.getByLabel('Receive special offers from our partners!').check();
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.getByLabel('First name *').fill(firstName);
    await page.getByLabel('Last name *').fill(lastName);
    await page.getByLabel('Company', { exact: true }).fill(companyName);
    await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill(address1);
    await page.getByRole('combobox', { name: 'Country *' }).selectOption('United States');
    await page.getByLabel('State *').fill(state);
    await page.getByLabel('City *').fill(city);
    await page.locator('#zipcode').fill(zipcode);
    await page.getByLabel('Mobile Number *').fill(mobileNumber);
    // 13. Click 'Create Account button'
    await page.getByRole('button', { name: 'Create Account' }).click();
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();

    /*  TESTS DO NOT PROCEED BECAUSE OF ADVERTISING
    // 15. Click 'Continue' button
    await page.getByRole('link', { name: 'Continue' }).click();

    // 16. Verify that 'Logged in as username' is visible
    await expect(page.getByText('Logged in as Smok')).toBeVisible();

    // 17. Click 'Delete Account' button
    await page.getByRole('link', { name: ' Delete Account' }).click(); 

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    */
  });
});
