import { Locator, Page, expect } from '@playwright/test';
import { testRegistrationData } from '../test-data/testRegistration.data';

export class RegistrationUser {
  readonly page: Page;
  readonly userID: Locator;
  readonly userIdNew: Locator;
  readonly userEmail: Locator;
  readonly signupButton: Locator;
  // details
  readonly courtesyPhrase: Locator;
  readonly userPassword: Locator;
  readonly birtDay: Locator;
  readonly birtMonth: Locator;
  readonly birtYear: Locator;
  readonly checkboxNewsletter: Locator;
  readonly checkboxOffers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly companyName: Locator;
  readonly address1: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipCode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountButton: Locator;
  readonly continueButton: Locator;
  readonly verifyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userID = page.getByPlaceholder('Name');
    this.userIdNew = page.getByPlaceholder('Name');
    this.userEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    // details
    this.courtesyPhrase = page.getByLabel('Mr.');
    this.userPassword = page.getByLabel('Password *');
    this.birtDay = page.locator('#days');
    this.birtMonth = page.locator('#months');
    this.birtYear = page.locator('#years');
    this.checkboxNewsletter = page.getByLabel('Sign up for our newsletter!');
    this.checkboxOffers = page.getByLabel('Receive special offers from our partners!');
    this.firstName = page.getByLabel('First name *');
    this.lastName = page.getByLabel('Last name *');
    this.companyName = page.getByLabel('Company', { exact: true });
    this.address1 = page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)');
    this.country = page.getByRole('combobox', { name: 'Country *' });
    this.state = page.getByLabel('State *');
    this.city = page.getByLabel('City *');
    this.zipCode = page.locator('#zipcode');
    this.mobileNumber = page.getByLabel('Mobile Number *');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
    this.verifyMessage = page.locator('.title.text-center');
  }

  async enterUserIdNew() {
    const userIdNew = testRegistrationData.userIdNew;
    await this.userIdNew.fill(userIdNew);
  }

  async enterUserEmail() {
    const userEmail = testRegistrationData.userEmail;
    await this.userEmail.fill(userEmail);
  }

  async clickSignupButton() {
    await this.signupButton.click();
  }

  async enterNameEmail() {
    const userId = testRegistrationData.userId;
    const userEmail = testRegistrationData.userEmail;
    await this.userID.fill(userId);
    await this.userEmail.fill(userEmail);
    await this.signupButton.click();
  }

  async createAccount() {
    const userPassword = testRegistrationData.userPassword;
    const birthDay = testRegistrationData.birthDay;
    const birthMonth = testRegistrationData.birthMonth;
    const birthYear = testRegistrationData.birthYear;
    const firstName = testRegistrationData.firstName;
    const lastName = testRegistrationData.lastName;
    const companyName = testRegistrationData.companyName;
    const address1 = testRegistrationData.address1; 
    const country = testRegistrationData.country;
    const state = testRegistrationData.state;
    const city = testRegistrationData.city;
    const zipCode = testRegistrationData.zipCode;
    const mobileNumber = testRegistrationData.mobileNumber;
    await this.userPassword.fill(userPassword);
    await this.birtDay.selectOption(birthDay);
    await this.birtMonth.selectOption(birthMonth);
    await this.birtYear.selectOption(birthYear);
    await this.checkboxNewsletter.check();
    await this.checkboxOffers.check();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.companyName.fill(companyName);
    await this.address1.fill(address1);
    await this.country.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipCode.fill(zipCode);
    await this.mobileNumber.fill(mobileNumber);
    await this.createAccountButton.click();
  }

  async clickButton() {
    await this.continueButton.click();
  }

  async registerNewUser() {    
    const userId = testRegistrationData.userId;
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;
    const birthDay = testRegistrationData.birthDay;
    const birthMonth = testRegistrationData.birthMonth;
    const birthYear = testRegistrationData.birthYear;
    const firstName = testRegistrationData.firstName;
    const lastName = testRegistrationData.lastName;
    const companyName = testRegistrationData.companyName;
    const address1 = testRegistrationData.address1; 
    const country = testRegistrationData.country;
    const state = testRegistrationData.state;
    const city = testRegistrationData.city;
    const zipCode = testRegistrationData.zipCode;
    const mobileNumber = testRegistrationData.mobileNumber;
    await this.userID.fill(userId);
    await this.userEmail.fill(userEmail);
    await this.signupButton.click();
    await this.userPassword.fill(userPassword);
    await this.birtDay.selectOption(birthDay);
    await this.birtMonth.selectOption(birthMonth);
    await this.birtYear.selectOption(birthYear);
    await this.checkboxNewsletter.check();
    await this.checkboxOffers.check();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.companyName.fill(companyName);
    await this.address1.fill(address1);
    await this.country.selectOption(country);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipCode.fill(zipCode);
    await this.mobileNumber.fill(mobileNumber);
    await this.createAccountButton.click();
    await this.continueButton.click();
  }

  async messageAccountCreated() {
    await expect(this.verifyMessage).toContainText('Account Created!');
  }
}
