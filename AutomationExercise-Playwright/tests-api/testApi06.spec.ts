/*
API 6: POST To Search Product without search_product parameter
API URL: https://automationexercise.com/api/searchProduct
Request Method: POST
Response Code: 400
Response Message: Bad request, search_product parameter is missing in POST request.
*/

import { test, expect } from '@playwright/test';

test.describe('API 6: POST To Search Product without search_product parameter', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('POST to search product without search_product parameter', async ({ request }) => {
    // Request Method: POST
    const response = await request.post(`${baseUrl}/searchProduct`,{
        // ...
    });

    // Response Code: 400
    expect(response.status()).toBe(400);

    // Response Message: Bad request, search_product parameter is missing in POST request.
  });
});