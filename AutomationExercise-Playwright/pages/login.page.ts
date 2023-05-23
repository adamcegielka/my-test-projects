import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  userEmail = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
  userPassword = this.page.getByPlaceholder('Password');
  loginButton = this.page.getByRole('button', { name: 'Login' });
}