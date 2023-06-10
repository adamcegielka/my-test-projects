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
    this.women = page.locator('');
    this.womenDress = page.locator('');
    this.womenTops = page.locator('');
    this.womenSaree = page.locator('');
    this.men = page.locator('');
    this.menTshirts = page.locator('');
    this.menJeans = page.locator('');
    this.kids = page.locator('');
    this.kidsDress = page.locator('');
    this.kidsTopsShirts = page.locator('');
    this.polo = page.locator('');
    this.hm = page.locator('');
    this.madame = page.locator('');
    this.mastHarbour = page.locator('');
    this.babyhug = page.locator('');
    this.allenSollyJunior = page.locator('');
    this.kookieKids = page.locator('');
    this.biba = page.locator('');
  }

  async category(navCategory) {}

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
