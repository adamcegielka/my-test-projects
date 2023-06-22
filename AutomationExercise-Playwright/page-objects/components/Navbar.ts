import { Locator, Page } from '@playwright/test';

export class Navbar {
  readonly page: Page;
  readonly products: Locator;
  readonly cart: Locator;
  readonly siginLogin: Locator;
  readonly testCases: Locator;
  readonly apiTesting: Locator;
  readonly videoTutorials: Locator;
  readonly contactUs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.getByRole('link', { name: 'Products' });
    this.cart = page.getByRole('link', { name: 'Cart' });
    this.siginLogin = page.getByRole('link', { name: 'Signup / Login' });
    this.testCases = page.getByRole('link', { name: 'Test Cases' });
    this.apiTesting = page.getByRole('link', { name: 'API Testing' });
    this.videoTutorials = page.getByRole('link', { name: 'Video Tutorials' });
    this.contactUs = page.getByRole('link', { name: 'Contact us' });
  }

  async clickOnNav(navName) {
    switch (navName) {
      case 'Products':
        await this.products.click();
        break;
      case 'Cart':
        await this.cart.click();
        break;
      case 'Signup / Login':
        await this.siginLogin.click();
        break;
      case 'Test Cases':
        await this.testCases.click();
        break;
      case 'API Testing':
        await this.apiTesting.click();
        break;
      case 'Video Tutorials':
        await this.videoTutorials.click();
        break;
      case 'Contact Us':
        await this.contactUs.click();
        break;
      default:
        throw new Error('This page does not exist.');
    }
  }
}
