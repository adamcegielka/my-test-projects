import { Locator, Page } from '@playwright/test';
import { testRegistrationData } from '../test-data/testRegistration.data';

export class LoginPage {
  readonly page: Page;
  readonly userEmailInpot: Locator;
  readonly userPasswordInpot: Locator;
  readonly clickButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmailInpot = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
    this.userPasswordInpot = page.getByPlaceholder('Password');
    this.clickButton = page.getByRole('button', { name: 'Login' });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  async login() {
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;

    await this.userEmailInpot.fill(userEmail);
    await this.userPasswordInpot.fill(userPassword);
    await this.clickButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
