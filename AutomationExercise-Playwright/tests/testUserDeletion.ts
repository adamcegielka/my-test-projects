import { testUserDeletionData } from '../test-data/testUserDeletion.data';

export async function userDeletion(page) {
  const email = testUserDeletionData.email;
  const userPassword = testUserDeletionData.userPassword;

  // Blocking of network resources that generate Ads
  await page.route("**/*", route => {
    route.request().url().startsWith("https://googleads.") ?
      route.abort() : route.continue();
    return;
  });
  // --- End code

  await page.goto('/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
  await page.getByPlaceholder('Password').fill(userPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Delete Account' }).click();
  await page.click('.btn.btn-primary');

  await page.close();
}