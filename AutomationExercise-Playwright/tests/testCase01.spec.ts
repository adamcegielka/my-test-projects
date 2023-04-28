import { test, expect } from '@playwright/test';

test.describe('Test Case 1: Register User', () => {
  test('AutomationExercise scenario tests', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userId = 'Smok Wawelski';
    const userEmail = 'wawelski@test.com';

    await page.goto(url); // Navigate to url 'http://automationexercise.com'
    await page.getByRole('link', { name: ' Signup / Login' }).click(); // Click on 'Signup / Login' button

    await expect(page.getByText('New User Signup!')).toBeVisible(); // Verify 'New User Signup!' is visible

    await page.getByPlaceholder('Name').fill(userId); // Enter name
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(userEmail); // Enter email address
    await page.getByRole('button', { name: 'Signup' }).click(); // Click 'Signup' button

    await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible(); // Verify that 'ENTER ACCOUNT INFORMATION' is visible
  });
});
