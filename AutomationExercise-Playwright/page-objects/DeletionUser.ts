import { Locator, Page, expect } from '@playwright/test';

export class DeletionUser {
  readonly page: Page;
  readonly deleteButton: Locator;
  readonly continueButton: Locator;
  readonly verifyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = page.getByRole('link', { name: 'Delete Account' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
    this.verifyMessage = page.locator('.title.text-center');
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

  async messageAccountDeleted() {
    await expect(this.verifyMessage).toContainText('Account Deleted!');
  }
}
