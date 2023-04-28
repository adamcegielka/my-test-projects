import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  await page.getByRole('heading', { name: 'New User Signup!' }).click();
  
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Smok Wawelski');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('wawelski@test.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByText('Enter Account Information').click();
  
});