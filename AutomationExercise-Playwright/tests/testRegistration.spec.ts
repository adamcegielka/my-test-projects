import { testRegistrationData } from '../test-data/testRegistration.data';

export async function registerUser({ page }) {
  const userId = testRegistrationData.userId;
  const userEmail = testRegistrationData.userEmail;
  const userPassword = testRegistrationData.userPassword;
  const firstName = testRegistrationData.firstName;
  const lastName = testRegistrationData.lastName;
  const birthDay = testRegistrationData.birthDay;
  const birthMonth = testRegistrationData.birthMonth;
  const birthYear = testRegistrationData.birthYear;
  const companyName = testRegistrationData.companyName;
  const address1 = testRegistrationData.address1;
  const zipCode = testRegistrationData.zipCode;
  const city = testRegistrationData.city;
  const state = testRegistrationData.state;
  const country = testRegistrationData.country;
  const mobileNumber = testRegistrationData.mobileNumber;

  await page.goto('/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  await page.getByPlaceholder('Name').fill(userId);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(userEmail);
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