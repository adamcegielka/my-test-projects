import { Page } from '@playwright/test';

export class LoginIncorrectPage {
  constructor(private page: Page) {}

  userEmailIncorrect = this.page
    .locator('form')
    .filter({ hasText: 'Login' })
    .getByPlaceholder('Email Address');
  userPasswordIncorrect = this.page.getByPlaceholder('Password');
  loginButton = this.page.getByRole('button', { name: 'Login' });
}
