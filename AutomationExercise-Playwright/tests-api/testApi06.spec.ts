/*
API 6: POST To Search Product without search_product parameter
API URL: https://automationexercise.com/api/searchProduct
Request Method: POST
Response Code: 400
Response Message: Bad request, search_product parameter is missing in POST request.
*/

import { test, expect } from '@playwright/test';

test.describe.fixme('API 6: POST To Search Product without search_product parameter', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('POST to search product without search_product parameter', async ({ request }) => {
    
    const response = await request.post(`${baseUrl}/searchProduct`, {
      data: {
        'search_product': ''
      }
    });
        
    expect(response.status()).toBe(400); 
    console.log(await response.json());
  });
});