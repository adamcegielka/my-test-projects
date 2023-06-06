import { test, expect, chromium, } from '@playwright/test';
import { testCase06Data } from '../test-data/testCase06.data';

test.describe('Test Case 6: Contact Us Form', () => {
  
  test('contact us form', async ({ page }) => {    
    const userId = testCase06Data.userId;
    const userEmail = testCase06Data.userEmail;
    const subject = testCase06Data.subject;
    const message = testCase06Data.message;

    const verifyHomePage = testCase06Data.verifyHomePage;
    const verifyGetInTouch = testCase06Data.verifyGetInTouch;
    const verifySuccessMessage = testCase06Data.verifySuccessMessage;

    // 1. Launch browser    
    await chromium.launch();

    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto('/');

    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);

    // 4. Click on 'Contact Us' button
    await page.getByRole('link', { name: 'Contact us' }).click();

    // 5. Verify 'GET IN TOUCH' is visible
    await expect(page.getByText(verifyGetInTouch)).toBeVisible();

    // 6. Enter name, email, subject and message
    await page.getByPlaceholder('Name').fill(userId);
    await page.getByPlaceholder('Email', { exact: true }).fill(userEmail);
    await page.getByPlaceholder('Subject').fill(subject);
    await page.getByPlaceholder('Your Message Here').fill(message);

    // 7. Upload file
    await page.locator('input[name="upload_file"]').setInputFiles('upload-file/myfile.txt');

    // 8. Click 'Submit' button
    await page.getByRole('button', { name: 'Submit' }).click();

    // 9. Click OK button
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Submit' }).click();

    // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
    await expect(page.locator('.status.alert.alert-success').getByText(verifySuccessMessage)).toBeVisible({ timeout: 5000 });

    // 11. Click 'Home' button and verify that landed to home page successfully
    // await page.getByRole('link', { name: 'Home' }).click();
    await page.click('#form-section > .btn.btn-success');
    
    // EXIT FROM GOOGLE ADS
    // await page.frameLocator('iframe[name="aswift_2"]').frameLocator('iframe[name="ad_iframe"]').getByRole('button', { name: 'Close ad' }).click();
    await page.goBack();
    await page.goForward();
    
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(verifyHomePage);
    
    // CLOSE BROWSER
    await page.close();
  });  
});