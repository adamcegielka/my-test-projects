import { test, expect, chromium } from '@playwright/test';

test.describe('Test Case 5: Register User with existing email', () => {

  // Register User with existing email
  test('logout User', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userId = 'Olek Mucha';
    const userEmail = 'smith@tester.com';

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
    await page.getByPlaceholder('Name').fill(userId); 
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(userEmail); 
    // 7. Click 'Signup' button
    await page.getByRole('button', { name: 'Signup' }).click(); 
    // 8. Verify error 'Email Address already exist!' is visible
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
  
});