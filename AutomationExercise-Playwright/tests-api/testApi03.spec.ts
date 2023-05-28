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

    expect(response.status()).toBe(200);
    
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
  });


  // ANOTHER WAY FOR TEST:

  test.skip('another way - get all brands list', async ({ request }) => {
    const response = await request.get(`${baseUrl}/brandsList`);

    expect(response.status()).toBe(200);    
    console.log(await response.json());
  });
});