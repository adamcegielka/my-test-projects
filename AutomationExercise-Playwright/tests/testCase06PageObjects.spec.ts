import { test, expect, chromium, } from '@playwright/test';
import { testCase06Data } from '../test-data/testCase06.data';
import { HomePage } from '../page-objects/HomePage';
import { Navbar } from '../page-objects/components/Navbar';
import { FormPage } from '../page-objects/FormPage';

test.describe('Test Case 6: Contact Us Form', () => {
  
  test('contact us form', async ({ page }) => {   
    const homePage = new HomePage(page);
    const navbar = new Navbar(page);
    const formPage = new FormPage(page);
    
    const userId = testCase06Data.userId;
    const userEmail = testCase06Data.userEmail;
    const subject = testCase06Data.subject;
    const message = testCase06Data.message;
    const verifyGetInTouch = testCase06Data.verifyGetInTouch;

    await chromium.launch();
    await homePage.navHomePage();
    await homePage.verifytTitlePage();
    await homePage.verifyHomePage();
    await navbar.clickOnNav('Contact Us');
    await expect(page.getByText(verifyGetInTouch)).toBeVisible();
    await formPage.fillForm(userId, userEmail, subject, message);
    await formPage.uploadFile();
    await formPage.submitForm();
    page.on('dialog', dialog => dialog.accept());
    await formPage.submitForm();
    await formPage.assertFormSent();
    await page.click('#form-section > .btn.btn-success');    
    await page.goBack();      // EXIT FROM GOOGLE ADS
    await page.goForward();   // EXIT FROM GOOGLE ADS
    await homePage.verifyHomePage();
    await homePage.verifytTitlePage();
    await page.close();
  });  
});