import { test, expect, chromium, } from '@playwright/test';

test.describe('Test Case 7: Verify Test Cases Page', () => {

  // Verify Test Cases Page
  test.only('verify Test Cases Page', async ({ page }) => {
    const url = 'https://automationexercise.com/';
    const urlCase = 'https://automationexercise.com/test_cases';

    // 1. Launch browser    
    await chromium.launch();
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(url);
    // 3. Verify that home page is visible successfully
    await expect(page).toHaveURL(url);
    // 4. Click on 'Test Cases' button
    await page.getByRole('button', { name: 'Test Cases' }).click();

    // 5. Verify user is navigated to test cases page successfully
    await expect(page).toHaveURL(urlCase);
  });  
});

/*
5. Verify user is navigated to test cases page successfully
Log:

PARAMETERS
locator:
locator(':root')
expression:
"to.have.url"
expectedText:
[{"string":"https://automationexercise.com/test_cases"}]
expectedValue:
undefined
isNot:
false
timeout:
5000

RETURN VALUE
matches:
false
received:
"https://automationexercise.com/#google_vignette"
timedOut:
true
log:
["expect.toHaveURL with timeout 5000ms","waiting for locator(':root')"," locator resolved to <html lang=\"en\">…</html>"," unexpected value \"https://automationexercise.com/#google_vig

Timed out 5000ms waiting for expect(received).toHaveURL(expected)

Expected string: "https://automationexercise.com/test_cases"
Received string: "https://automationexercise.com/#google_vignette"
Call log:
  - expect.toHaveURL with timeout 5000ms
  - waiting for locator(':root')
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
  -   locator resolved to <html lang="en">…</html>
  -   unexpected value "https://automationexercise.com/#google_vignette"
*/