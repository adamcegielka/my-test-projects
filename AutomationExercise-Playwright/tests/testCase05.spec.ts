import { test, expect, chromium } from '@playwright/test';
import { testCase05Data } from '../test-data/testCase05.data';

test.describe('Test Case 5: Register User with existing email', () => {

  // Creation of new user before the test
  test('creation of a new user before the test', async ({ page }) => {
    const url = testCase05Data.url;
    const userId = testCase05Data.userId;
    const userEmail = testCase05Data.userEmail;
    const userPassword = testCase05Data.userPassword;
    const birthDay = testCase05Data.birthDay;
    const birthMonth = testCase05Data.birthMonth;
    const birthYear = testCase05Data.birthYear;
    const firstName = testCase05Data.firstName;
    const lastName = testCase05Data.lastName;
    const companyName = testCase05Data.companyName;
    const address1 = testCase05Data.address1; 
    const country = testCase05Data.country;
    const state = testCase05Data.state;
    const city = testCase05Data.city;
    const zipcode = testCase05Data.zipcode;
    const mobileNumber = testCase05Data.mobileNumber;
    
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

  // Test Case 5: Register User with existing email
  test('register User with existing email', async ({ page }) => {
    const url = testCase05Data.url;
    const userIdNew = testCase05Data.userIdNew;
    const userEmail = testCase05Data.userEmail;

    // 1. Launch browser    
    await chromium.launch();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url); 
    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);   
    // 4. Click on 'Signup / Login' button
    await page.getByRole('link', { name: ' Signup / Login' }).click(); 
    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByText('New User Signup!')).toBeVisible();
    // 6. Enter name and already registered email address
    await page.getByPlaceholder('Name').fill(userIdNew); 
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(userEmail); 
    // 7. Click 'Signup' button
    await page.getByRole('button', { name: 'Signup' }).click(); 
    // 8. Verify error 'Email Address already exist!' is visible
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });  
});