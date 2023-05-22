import { userDeletion } from '../test-data/testUserDeletion.data';

export async function registerUser({ page }) {
  const url = userDeletion.url;  
  const email = userDeletion.email;
  const userPassword = userDeletion.userPassword;

  await page.goto(url);
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
  await page.getByPlaceholder('Password').fill(userPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: ' Delete Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
};