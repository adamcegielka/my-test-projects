import { testUserDeletion } from '../test-data/testUserDeletion.data';

export async function userDeletion({ page }) {
  const url = testUserDeletion.url;  
  const email = testUserDeletion.email;
  const userPassword = testUserDeletion.userPassword;

  await page.goto(url);
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
  await page.getByPlaceholder('Password').fill(userPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: ' Delete Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
};