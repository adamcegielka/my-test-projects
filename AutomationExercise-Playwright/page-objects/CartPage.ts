import { Locator, Page, expect } from '@playwright/test';
import { testRegistrationData } from '../test-data/testRegistration.data';

export class CartPage {
  readonly page: Page;
  readonly addressDelivery: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressDelivery = page.locator('#address_delivery');
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
}
