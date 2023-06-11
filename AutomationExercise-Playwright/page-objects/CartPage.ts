import { Locator, Page, expect } from '@playwright/test';
import { testRegistrationData } from '../test-data/testRegistration.data';

export class CartPage {
  readonly page: Page;
  readonly addressDelivery: Locator;
  readonly buttonProceedToCheckout: Locator;
  readonly insertMessage: Locator;
  readonly buttonPlaceOrder: Locator;
  readonly verifyCartPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressDelivery = page.locator('#address_delivery');
    this.buttonProceedToCheckout = page.locator('a.btn.btn-default.check_out');
    this.insertMessage = page.locator('textarea[name="message"]');
    this.buttonPlaceOrder = page.getByRole('link', { name: 'Place Order' });
    this.verifyCartPage = page.locator('.active');
  }

  async assertAddressDelivery() {
    const userTitle = testRegistrationData.userTitle;
    const firstName = testRegistrationData.firstName;
    const lastName = testRegistrationData.lastName;
    const companyName = testRegistrationData.companyName;
    const address1 = testRegistrationData.address1;
    const city = testRegistrationData.city;
    const state = testRegistrationData.state;
    const zipCode = testRegistrationData.zipCode;
    const country = testRegistrationData.country;
    const mobileNumber = testRegistrationData.mobileNumber;

    await expect(this.addressDelivery).toContainText(userTitle);
    await expect(this.addressDelivery).toContainText(firstName);
    await expect(this.addressDelivery).toContainText(lastName);
    await expect(this.addressDelivery).toContainText(companyName);
    await expect(this.addressDelivery).toContainText(address1);
    await expect(this.addressDelivery).toContainText(city);
    await expect(this.addressDelivery).toContainText(state);
    await expect(this.addressDelivery).toContainText(zipCode);
    await expect(this.addressDelivery).toContainText(country);
    await expect(this.addressDelivery).toContainText(mobileNumber);
  }

  async assertAddressBillingy() {
    const userTitle = testRegistrationData.userTitle;
    const firstName = testRegistrationData.firstName;
    const lastName = testRegistrationData.lastName;
    const companyName = testRegistrationData.companyName;
    const address1 = testRegistrationData.address1;
    const city = testRegistrationData.city;
    const state = testRegistrationData.state;
    const zipCode = testRegistrationData.zipCode;
    const country = testRegistrationData.country;
    const mobileNumber = testRegistrationData.mobileNumber;

    await expect(this.addressDelivery).toContainText(userTitle);
    await expect(this.addressDelivery).toContainText(firstName);
    await expect(this.addressDelivery).toContainText(lastName);
    await expect(this.addressDelivery).toContainText(companyName);
    await expect(this.addressDelivery).toContainText(address1);
    await expect(this.addressDelivery).toContainText(city);
    await expect(this.addressDelivery).toContainText(state);
    await expect(this.addressDelivery).toContainText(zipCode);
    await expect(this.addressDelivery).toContainText(country);
    await expect(this.addressDelivery).toContainText(mobileNumber);
  }

  async clickbuttonProToCheckout() {
    await this.buttonProceedToCheckout.click();
  }

  async addComment() {
    await this.insertMessage.fill('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
  }

  async clickPlaceOrder() {
    await this.buttonPlaceOrder.click();
  }

  async verifyCartPageIsDisplayed () {
    await expect(this.verifyCartPage).toContainText('Shopping Cart');
  }
}
