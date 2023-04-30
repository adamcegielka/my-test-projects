import { test, expect, chromium } from '@playwright/test';

test.describe('Test Case 2: login User with correct email and password', () => {

  test('creation of a new user before the test', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userId = 'Jan Nowak';
    const userEmail = 'nowaki@tester.com';
    const userPassword = 'nowy234';
    const birthDay = '11';
    const birthMonth = '5';
    const birthYear = '1996';
    const firstName = 'Jan';
    const lastName = 'Nowak';
    const companyName = 'Nowinki';
    const address1 = 'Nowa 4'; 
    const country = 'United States';
    const state = 'Dover';
    const city = 'Delaware';
    const zipcode = '19906';
    const mobileNumber = '8223334444';

    // Creation of a new user before the test
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

  // Test Case 2: login User with correct email and password'
  test('login User with correct email and password', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userEmail = 'nowaki@tester.com';
    const userPassword = 'nowy234';

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
    await expect(page.getByText('Logged in as Jan Nowak')).toBeVisible();
    // 9. Click 'Delete Account' button
    await page.getByRole('link', { name: ' Delete Account' }).click();
    // 10. Verify that 'ACCOUNT DELETED!' is visible
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click(); 
  });
  
});