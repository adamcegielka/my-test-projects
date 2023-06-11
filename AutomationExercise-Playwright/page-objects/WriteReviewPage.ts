import { expect, Locator, Page } from '@playwright/test';
import { testRegistrationData } from '../test-data/testRegistration.data';

export class WriteReviewPage {
  readonly page: Page;
  readonly yourName: Locator;
  readonly emailAddress: Locator;
  readonly addReview: Locator;
  readonly submitButton: Locator;
  readonly verifyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yourName = page.getByPlaceholder('Your Name');
    this.emailAddress = page.getByPlaceholder('Email Address', { exact: true });
    this.addReview = page.getByPlaceholder('Add Review Here!');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.verifyMessage = page.getByText('Thank you for your review.');
  }

  async fillForm() {
    const yourName = testRegistrationData.userId;
    const email = testRegistrationData.userEmail;

    await this.yourName.fill(yourName);
    await this.emailAddress.fill(email);
    await this.addReview.fill('Very good product');
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.verifyMessage).toBeVisible();
  }
}
