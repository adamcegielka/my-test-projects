import { test } from '@playwright/test';
import { testRegistrationData } from '../test-data/testRegistration.data';

test.skip('user deletion', async ({ page }) => {
  const email = testRegistrationData.userEmail;
  const userPassword = testRegistrationData.userPassword;

  await page.goto('/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page
    .locator('form')
    .filter({ hasText: 'Login' })
    .getByPlaceholder('Email Address')
    .fill(email);
  await page.getByPlaceholder('Password').fill(userPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Delete Account' }).click();
  await page.getByRole('link', { name: 'Continue' });

  await page.close();
});
