import { test, expect, chromium } from '@playwright/test';

test.describe('Test Case 4: Logout User', () => {

  // Creation of a new user before the test
  test('creation of a new user before the test', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userId = 'John Smith';
    const userEmail = 'smith@tester.com';
    const userPassword = 'smith234';
    const birthDay = '19';
    const birthMonth = '8';
    const birthYear = '1991';
    const firstName = 'John';
    const lastName = 'Smith';
    const companyName = 'Matrix';
    const address1 = 'Neo 99'; 
    const country = 'United States';
    const state = 'Dover';
    const city = 'Delaware';
    const zipcode = '19906';
    const mobileNumber = '8003330000';
    
    await page.goto(url);   
    await page.getByRole('link', { name: ' Signup / Login' }).click(); 
    await page.getByPlaceholder('Name').fill(userId); 
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(userEmail); 
    await page.getByRole('button', { name: 'Signup' }).click();  
    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').fill(userPassword);
    await page.locator('#days').selectOption(birthDay);
    await page.locator('#months').selectOption(birthMonth);
    await page.locator('#years').selectOption(birthYear);
    await page.getByLabel('Sign up for our newsletter!').check();
    await page.getByLabel('Receive special offers from our partners!').check();
    await page.getByLabel('First name *').fill(firstName);
    await page.getByLabel('Last name *').fill(lastName);
    await page.getByLabel('Company', { exact: true }).fill(companyName);
    await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill(address1);
    await page.getByRole('combobox', { name: 'Country *' }).selectOption(country);
    await page.getByLabel('State *').fill(state);
    await page.getByLabel('City *').fill(city);
    await page.locator('#zipcode').fill(zipcode);
    await page.getByLabel('Mobile Number *').fill(mobileNumber);
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.getByRole('link', { name: ' Logout' }).click();    
  });

  // Test Case 4: Logout User
  test('logout User', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const urlLogin = 'https://automationexercise.com/login';
    const userEmail = 'smith@tester.com';
    const userPassword = 'smith234';

    // 1. Launch browser    
    await chromium.launch();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url); 
    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);   
    // 4. Click on 'Signup / Login' button
    await page.getByRole('link', { name: ' Signup / Login' }).click(); 
    // 5. Verify 'Login to your account' is visible
    await expect(page.getByText('New User Signup!')).toBeVisible(); 
    // 6. Enter correct email address and password
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(userEmail);
    await page.getByPlaceholder('Password').fill(userPassword);
    // 7. Click 'login' button
    await page.getByRole('button', { name: 'Login' }).click();
    // 8. Verify that 'Logged in as username' is visible
    await expect(page.getByText('Logged in as John Smith')).toBeVisible();
    // 9. Click 'Logout' button    
    await page.getByRole('link', { name: ' Logout' }).click();
    // 10. Verify that user is navigated to login page
    await expect(page).toHaveURL(urlLogin);
  });
  
});