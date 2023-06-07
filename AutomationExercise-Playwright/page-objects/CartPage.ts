import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly address1: Locator;
  readonly address2: Locator;
  readonly address3: Locator;
  readonly address4: Locator;
  readonly address5: Locator;
  readonly address6: Locator;

  constructor(page: Page) {
    this.page = page;
    this.address1 = page.locator(''); 
    this.address2 = page.locator(''); 
    this.address3 = page.locator('');
    this.address4 = page.locator('');
    this.address5 = page.locator('');
    this.address6 = page.locator('');
  }
}
