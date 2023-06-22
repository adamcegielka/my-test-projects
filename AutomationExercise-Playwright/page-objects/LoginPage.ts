import { Locator, Page } from '@playwright/test';
import { testRegistrationData } from '../test-data/testRegistration.data';

export class LoginPage {
  readonly page: Page;
  readonly userEmailInput: Locator;
  readonly userPasswordInput: Locator;
  readonly clickButton: Locator;
  readonly logoutButton: Locator;
  readonly userEmailInputIncorrect: Locator;
  readonly userPasswordInputIncorrect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmailInput = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
    this.userPasswordInput = page.getByPlaceholder('Password');
    this.clickButton = page.getByRole('button', { name: 'Login' });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
    this.userEmailInputIncorrect = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
    this.userPasswordInputIncorrect = page.getByPlaceholder('Password');
  }

  async login() {
    const userEmail = testRegistrationData.userEmail;
    const userPassword = testRegistrationData.userPassword;

    await this.userEmailInput.fill(userEmail);
    await this.userPasswordInput.fill(userPassword);
    await this.clickButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async loginIncorrect() {
    const userEmailIncorrect = testRegistrationData.userEmailIncorrect;
    const userPasswordIncorrect = testRegistrationData.userPasswordIncorrect;

    await this.userEmailInputIncorrect.fill(userEmailIncorrect);
    await this.userPasswordInputIncorrect.fill(userPasswordIncorrect);
    await this.clickButton.click();
  }
}
