import { test, expect, chromium, } from '@playwright/test';

test.describe('Test Case 6: Contact Us Form', () => {

  // Register User with existing email
  test('contact Us Form', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const userId = 'John Smith';
    const userEmail = 'smith@tester.com';
    const subject = 'What is Lorem Ipsum?';
    const message = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

    // 1. Launch browser    
    await chromium.launch();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url); 
    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);   
    // 4. Click on 'Contact Us' button
    await page.getByRole('link', { name: ' Contact us' }).click();
    // 5. Verify 'GET IN TOUCH' is visible
    await expect(page.getByText('GET IN TOUCH')).toBeVisible();
    // 6. Enter name, email, subject and message
    await page.getByPlaceholder('Name').fill(userId);
    await page.getByPlaceholder('Email', { exact: true }).fill(userEmail);
    await page.getByPlaceholder('Subject').fill(subject);
    await page.getByPlaceholder('Your Message Here').fill(message);
    // 7. Upload file
    await page.locator('input[name="upload_file"]').setInputFiles('myfile.txt');
    // 8. Click 'Submit' button
    await page.getByRole('button', { name: 'Submit' }).click();

    // 9. Click OK button
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Submit' }).click();

    // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
    await expect(page.locator('.status.alert.alert-success').getByText('Success! Your details have been submitted successfully.')).toBeVisible({ timeout: 5000 });

    // 11. Click 'Home' button and verify that landed to home page successfully
    await page.getByRole('link', { name: ' Home' }).click();
    await expect(page).toHaveURL(url);
  });  
});