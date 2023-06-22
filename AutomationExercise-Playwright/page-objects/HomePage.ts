import { Browser, expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly urlCart: Page;

  constructor(page: Page) {
    this.page = page;
    this.urlCart = page;
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

  async verifyUrlCart() {
    await expect(this.page).toHaveURL(
      'https://automationexercise.com/view_cart'
    );
  }
}
