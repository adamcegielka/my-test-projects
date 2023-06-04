import { Locator, Page } from '@playwright/test';

export class DeletionUser {
  readonly page: Page;
  readonly deleteButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = page.getByRole('link', { name: 'Delete Account' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async deletionNewUser() {    
    await this.deleteButton.click();
    await this.continueButton.click();
  }
}