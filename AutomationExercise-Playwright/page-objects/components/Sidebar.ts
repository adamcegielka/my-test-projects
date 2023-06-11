import { Locator, Page } from '@playwright/test';

export class Sidebar {
  readonly page: Page;
  readonly women: Locator;
  readonly womenDress: Locator;
  readonly womenTops: Locator;
  readonly womenSaree: Locator;
  readonly men: Locator;
  readonly menTshirts: Locator;
  readonly menJeans: Locator;
  readonly kids: Locator;
  readonly kidsDress: Locator;
  readonly kidsTopsShirts: Locator;
  readonly polo: Locator;
  readonly hm: Locator;
  readonly madame: Locator;
  readonly mastHarbour: Locator;
  readonly babyhug: Locator;
  readonly allenSollyJunior: Locator;
  readonly kookieKids: Locator;
  readonly biba: Locator;

  constructor(page: Page) {
    this.page = page;
    this.women = page.getByRole('link', { name: ' Women' });
    this.womenDress = page.getByRole('link', { name: 'Dress' });
    this.womenTops = page.getByRole('link', { name: 'Tops' });
    this.womenSaree = page.getByRole('link', { name: 'Saree' });
    this.men = page.getByRole('link', { name: ' Men' });
    this.menTshirts = page.getByRole('link', { name: 'Tshirts' });
    this.menJeans = page.getByRole('link', { name: 'Jeans' });
    this.kids = page.getByRole('link', { name: ' Kids' });
    this.kidsDress = page.getByRole('link', { name: 'Dress' });
    this.kidsTopsShirts = page.getByRole('link', { name: 'Tops & Shirts ' });
    this.polo = page.getByRole('link', { name: '(6) Polo' });
    this.hm = page.getByRole('link', { name: '(5) H&M' });
    this.madame = page.getByRole('link', { name: '(5) Madame' });
    this.mastHarbour = page.getByRole('link', { name: '(3) Mast & Harbour' });
    this.babyhug = page.getByRole('link', { name: '(4) Babyhug' });
    this.allenSollyJunior = page.getByRole('link', {
      name: '(3) Allen Solly Junior',
    });
    this.kookieKids = page.getByRole('link', { name: '(3) Kookie Kids' });
    this.biba = page.getByRole('link', { name: '(5) Biba' });
  }

  // CATEGORY

  async categoryWomen() {
    await this.women.click();
  }

  async categoryWomenDreess() {
    await this.womenDress.click();
  }

  async categoryWomenTops() {
    await this.womenTops.click();
  }

  async categoryWomenSatee() {
    await this.womenSaree.click();
  }

  async categoryMen() {
    await this.men.click();
  }

  async categoryMenTshirts() {
    await this.menTshirts.click();
  }

  async categoryMenJeans() {
    await this.menJeans.click();
  }

  async categoryKids() {
    await this.kids.click();
  }

  async categoryKidsDress() {
    await this.kidsDress.click();
  }

  async categoryKidsTopsShirts() {
    await this.kidsTopsShirts.click();
  }

  // BRANDS

  async brands(navBrands) {
    switch (navBrands) {
      case 'Polo':
        await this.polo.click();
        break;
      case 'H&M':
        await this.hm.click();
        break;
      case 'Madame':
        await this.madame.click();
        break;
      case 'Mast & Harbour':
        await this.mastHarbour.click();
        break;
      case 'Babyhug':
        await this.babyhug.click();
        break;
      case 'Allen Solly Junior':
        await this.allenSollyJunior.click();
        break;
      case 'Kookie Kids':
        await this.kookieKids.click();
        break;
      case 'Biba':
        await this.biba.click();
        break;
      default:
        throw new Error('This page does not exist.');
    }
  }
}
