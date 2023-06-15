/*
API 3: Get All Brands List
API URL: https://automationexercise.com/api/brandsList
Request Method: GET
Response Code: 200
Response JSON: All brands list
*/

import { test, expect } from '@playwright/test';

test.describe('API 3: Get All Brands List', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('get all brands list', async ({ request }) => {
    const response = await request.get(`${baseUrl}/brandsList`);    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);   
    console.log(await response.json());
  });
});