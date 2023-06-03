import { Browser, expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navHomePage() {
    await this.page.goto('https://automationexercise.com/');
  }

  // assertions

  async verifytTitlePage() {
    await expect(this.page).toHaveTitle('Automation Exercise');
  }

  async verifyHomePage() {
    await expect(this.page).toHaveURL('https://automationexercise.com/');
  }
}
