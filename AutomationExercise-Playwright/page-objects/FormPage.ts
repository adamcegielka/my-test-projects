import { expect, Locator, Page } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  readonly userId: Locator;
  readonly userEmail: Locator;
  readonly subject: Locator;
  readonly mesagge: Locator;
  readonly file: Locator;
  readonly buttonSubmit: Locator;
  readonly verifySuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userId = page.getByPlaceholder('Name');
    this.userEmail = page.getByPlaceholder('Email', { exact: true });
    this.subject = page.getByPlaceholder('subject');
    this.mesagge = page.getByPlaceholder('Your Message Here');
    this.file = page.locator('input[name="upload_file"]');
    this.buttonSubmit = page.getByRole('button', { name: 'Submit' });
    this.verifySuccessMessage = page.locator('div.status.alert.alert-success');
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    comment: string
  ) {
    await this.userId.type(name);
    await this.userEmail.type(email);
    await this.subject.type(subject);
    await this.mesagge.type(comment);
  }

  async uploadFile() {
    await this.file.setInputFiles('upload-file/myfile.txt');
  }

  async submitForm() {
    await this.buttonSubmit.click();
  }

  async assertFormSent() {
    await expect(this.verifySuccessMessage).toContainText(
      'Success! Your details have been submitted successfully.'
    );
  }
}
