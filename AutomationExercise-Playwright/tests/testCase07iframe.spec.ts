import { test, expect, chromium } from '@playwright/test';

test.describe('Test Case 7: Verify Test Cases Page - iframe', () => {

  // Number of frames
  test.only('number of frames', async ({ page }) => {

    await page.goto('http://automationexercise.com');
    const allframes = page.frames();
    console.log('Number of frames: ' + allframes.length);    
  });
});
