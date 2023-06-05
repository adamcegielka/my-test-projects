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

  test.fixme('POST to search product without search_product parameter', async ({ request }) => {    
    const response = await request.post(`${baseUrl}/searchProduct`);
    const responseBody = await response.json();
    
    // expect(response.status()).toBe(400);
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
    console.log(responseBody);
  });
});