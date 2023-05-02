import { test, expect, chromium } from '@playwright/test';

test.describe('Test Case 3: Login User with incorrect email and password', () => {

  // Test Case 3: Login User with incorrect email and password
  test.only('login User with incorrect email and password', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userEmail = 'nowakincorrect@tester.com';
    const userPassword = 'nowyincorrect234';

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
    // 6. Enter incorrect email address and password
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(userEmail);
    await page.getByPlaceholder('Password').fill(userPassword);
    // 7. Click 'login' button
    await page.getByRole('button', { name: 'Login' }).click();
    // 8. Verify error 'Your email or password is incorrect!' is visible
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible(); 
  });
  
});