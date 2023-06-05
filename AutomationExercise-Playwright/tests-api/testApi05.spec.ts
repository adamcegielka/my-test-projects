/*
API 5: POST To Search Product
API URL: https://automationexercise.com/api/searchProduct
Request Method: POST
Request Parameter: search_product (For example: top, tshirt, jean)
Response Code: 200
Response JSON: Searched products list
*/

import { test, expect } from '@playwright/test';

test.describe('API 5: POST To Search Product', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test.fixme('POST to search product', async ({ request }) => {    
    const response = await request.post(`${baseUrl}/searchProduct`);
    const responseBody = JSON.parse(await response.text());
    
    expect(response.status()).toBe(200);
    console.log(responseBody);
  });
});