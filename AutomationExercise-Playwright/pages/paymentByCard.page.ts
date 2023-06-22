import { Page } from '@playwright/test';

export class CreditCardPage {
  constructor(private page: Page) {}

  cardVendor = this.page.locator('input[name="name_on_card"]');
  cardNumber = this.page.locator('input[name="card_number"]');
  cardCvv = this.page.getByPlaceholder('ex. 311');
  cardExpirationateMonth = this.page.getByPlaceholder('MM');
  cardExpirationateYear = this.page.getByPlaceholder('YYYY');
}
