import { Page } from '@playwright/test';

export class RegistrationPage {
  constructor(private page: Page) {}

  userId = this.page.getByPlaceholder('Name');
  userIdNew = this.page.getByPlaceholder('Name');
  userEmail = this.page
    .locator('form')
    .filter({ hasText: 'Signup' })
    .getByPlaceholder('Email Address');
  signupButton = this.page.getByRole('button', { name: 'Signup' });
  courtesyPhrase = this.page.getByLabel('Mr.');
  userPassword = this.page.getByLabel('Password *');
  birthDay = this.page.locator('#days');
  birthMonth = this.page.locator('#months');
  birthYear = this.page.locator('#years');
  checkboxNewsletter = this.page.getByLabel('Sign up for our newsletter!');
  checkboxOffers = this.page.getByLabel(
    'Receive special offers from our partners!'
  );
  firstName = this.page.getByLabel('First name *');
  lastName = this.page.getByLabel('Last name *');
  companyName = this.page.getByLabel('Company', { exact: true });
  address1 = this.page.getByLabel(
    'Address * (Street address, P.O. Box, Company name, etc.)'
  );
  country = this.page.getByRole('combobox', { name: 'Country *' });
  state = this.page.getByLabel('State *');
  city = this.page.getByLabel('City *');
  zipCode = this.page.locator('#zipcode');
  mobileNumber = this.page.getByLabel('Mobile Number *');
  createAccountButton = this.page.getByRole('button', {
    name: 'Create Account',
  });
}
