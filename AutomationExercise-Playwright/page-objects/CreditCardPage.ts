import { Locator, Page } from '@playwright/test';
import { testPaymentByCarsData } from '../test-data/testPaymentByCard.data';

export class CreditCardPage {
  readonly page: Page;
  readonly cardName: Locator;
  readonly cardNumber: Locator;
  readonly cardCvv: Locator;
  readonly cardExpirationateMonth: Locator;
  readonly cardExpirationateYear: Locator;
  readonly buttonPayOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardName = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.cardCvv = page.getByPlaceholder('ex. 311');
    this.cardExpirationateMonth = page.getByPlaceholder('MM');
    this.cardExpirationateYear = page.getByPlaceholder('YYYY');
    this.buttonPayOrder = page.getByRole('button', { name: 'Pay and Confirm Order' });
  }

  async enterPaymentDetails() {
    const cardName = testPaymentByCarsData.cardVendor;
    const cardNumber = testPaymentByCarsData.cardNumber;
    const cardCvv = testPaymentByCarsData.cardCvv;
    const cardExpirationateMonth = testPaymentByCarsData.cardExpirationateMonth;
    const cardExpirationateYear = testPaymentByCarsData.cardExpirationateYear;
    await this.cardName.fill(cardName);
    await this.cardNumber.fill(cardNumber);
    await this.cardCvv.fill(cardCvv);
    await this.cardExpirationateMonth.fill(cardExpirationateMonth);
    await this.cardExpirationateYear.fill(cardExpirationateYear);
  }

  async confirmOrder() {
    await this.buttonPayOrder.click();
  }
}
