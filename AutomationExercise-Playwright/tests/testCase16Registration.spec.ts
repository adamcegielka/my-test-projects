import { test } from '@playwright/test';
import { testCase16Data } from '../test-data/testCase16.data';

export async function registerUser({ page }) {
  const url = testCase16Data.url;  
  const userId = testCase16Data.userId;
  const email = testCase16Data.email;
  const userPassword = testCase16Data.userPassword;
  const firstName = testCase16Data.firstName;
  const lastName = testCase16Data.lastName;
  const birthDay = testCase16Data.birthDay;
  const birthMonth = testCase16Data.birthMonth;
  const birthYear = testCase16Data.birthYear;
  const companyName = testCase16Data.companyName;
  const address1 = testCase16Data.address1;
  const zipCode = testCase16Data.zipCode;
  const city = testCase16Data.city;
  const state = testCase16Data.state;
  const country = testCase16Data.country;
  const mobileNumber = testCase16Data.mobileNumber;

  await page.goto(url);
  await page.getByRole('link', { name: ' Signup / Login' }).click();

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
  await page.getByRole('link', { name: ' Logout' }).click();
};