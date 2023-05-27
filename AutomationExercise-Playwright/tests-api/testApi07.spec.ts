/*
API 7: POST To Verify Login with valid details
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameters: email, password
Response Code: 200
Response Message: User exists!
*/

import { test, expect } from '@playwright/test';

test.describe('API 6: POST To Search Product without search_product parameter', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('POST to search product without search_product parameter', async ({ request }) => {
    // Request Method: POST
    const response = await request.post(`${baseUrl}/verifyLogin`,{
        // ...
    });

    // Request Parameters: email, password

    // Response Code: 200
    expect(response.status()).toBe(200);

    // Response Message: User exists!
  });
});