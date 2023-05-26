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
    // Request Method: GET
    const response = await request.get(`${baseUrl}/productsList`);

    // Verify response code
    expect(response.status()).toBe(200);

    // Get response JSON
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
  });
});