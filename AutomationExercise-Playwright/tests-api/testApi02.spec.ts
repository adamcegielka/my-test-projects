/*
API 2: POST To All Products List
API URL: https://automationexercise.com/api/productsList
Request Method: POST
Response Code: 405
Response Message: This request method is not supported.
*/

import { test, expect } from '@playwright/test';

test.describe('API 2: POST To All Products List', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('POST to all products list', async ({ request }) => {    
    const response = await request.post(`${baseUrl}/productsList`);
    
    // expect(response.status()).toBe(405);
    expect(await response.text()).toContain("This request method is not supported.")
    console.log(await response.json());
  });
});