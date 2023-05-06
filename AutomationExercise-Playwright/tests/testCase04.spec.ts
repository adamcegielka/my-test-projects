import { test, expect, chromium } from '@playwright/test';
import { testCase04Data } from '../test-data/testCase04.data';

test.describe('Test Case 4: Logout User', () => {

  // Creation of a new user before the test
  test('creation of a new user before the test', async ({ page }) => {
    const url = testCase04Data.url;
    const userId = testCase04Data.userId;
    const userEmail = testCase04Data.userEmail;
    const userPassword = testCase04Data.userPassword;
    const birthDay = testCase04Data.birthDay;
    const birthMonth = testCase04Data.birthMonth;
    const birthYear = testCase04Data.birthYear;
    const firstName = testCase04Data.firstName;
    const lastName = testCase04Data.lastName;
    const companyName = testCase04Data.companyName;
    const address1 = testCase04Data.address1; 
    const country = testCase04Data.country;
    const state = testCase04Data.state;
    const city = testCase04Data.city;
    const zipcode = testCase04Data.zipcode;
    const mobileNumber = testCase04Data.mobileNumber;
    
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
    const url = testCase04Data.url;
    const urlLogin = testCase04Data.urlLogin;
    const userEmail = testCase04Data.userEmail;
    const userPassword = testCase04Data.userPassword;

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

  // Deleting John Smith users
  test('deleting John Smith users', async ({ page }) => {
    const url = testCase04Data.url;
    const userEmail = testCase04Data.userEmail;
    const userPassword = testCase04Data.userPassword;
    
    await page.goto(url);
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(userEmail);
    await page.getByPlaceholder('Password').fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await page.getByRole('link', { name: 'Continue' }).click(); 
  });  
});