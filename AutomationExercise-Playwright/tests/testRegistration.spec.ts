import { testRegistration } from '../test-data/testRegistration.data';

export async function registerUser({ page }) {
  const userId = testRegistration.userId;
  const email = testRegistration.email;
  const userPassword = testRegistration.userPassword;
  const firstName = testRegistration.firstName;
  const lastName = testRegistration.lastName;
  const birthDay = testRegistration.birthDay;
  const birthMonth = testRegistration.birthMonth;
  const birthYear = testRegistration.birthYear;
  const companyName = testRegistration.companyName;
  const address1 = testRegistration.address1;
  const zipCode = testRegistration.zipCode;
  const city = testRegistration.city;
  const state = testRegistration.state;
  const country = testRegistration.country;
  const mobileNumber = testRegistration.mobileNumber;

  await page.goto('/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  await page.getByPlaceholder('Name').fill(userId);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  await page.getByLabel('Mr.').check();
  await page.getByLabel('Password *').fill(userPassword);
  await page.locator('#days').selectOption(birthDay);
  await page.locator('#months').selectOption(birthMonth);
  await page.locator('#years').selectOption(birthYear);
  await page.getByLabel('First name *').fill(firstName);
  await page.getByLabel('Last name *').fill(lastName);
  await page.getByLabel('Company', { exact: true }).fill(companyName);
  await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill(address1);
  await page.getByRole('combobox', { name: 'Country *' }).selectOption(country);
  await page.getByLabel('State *').fill(state);
  await page.getByLabel('City *').fill(city);
  await page.locator('#zipcode').fill(zipCode);
  await page.getByLabel('Mobile Number *').fill(mobileNumber);
  await page.getByRole('button', { name: 'Create Account' }).click();  
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
};