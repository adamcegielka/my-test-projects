/*
API 1: Get All Products List
API URL: https://automationexercise.com/api/productsList
Request Method: GET
Response Code: 200
Response JSON: All products list
*/

import { test, expect } from '@playwright/test';

test.describe('API 1: Get All Products List', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('get all products list', async ({ request }) => {
    const response = await request.get(`${baseUrl}/productsList`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);   
    console.log(await response.json());
  });


  // ANOTHER WAY FOR TEST:

  test.skip('another way - get all products list', async ({ request }) => {
    const response = await request.get(`${baseUrl}/productsList`);

    expect(response.status()).toBe(200); 
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
  });
});