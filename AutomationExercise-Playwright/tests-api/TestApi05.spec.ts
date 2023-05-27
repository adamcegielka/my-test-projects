/*
API 5: POST To Search Product
API URL: https://automationexercise.com/api/searchProduct
Request Method: POST
Request Parameter: search_product (For example: top, tshirt, jean)
Response Code: 200
Response JSON: Searched products list
*/

import { test, expect } from '@playwright/test';

test.describe.fixme('API 5: POST To Search Product', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('POST to search product', async ({ request }) => {
    // Request Method: POST
    const response = await request.post(`${baseUrl}/searchProduct`,{
        data: {
            search_product: 'Men Tshirt',
        }
    });
    
    // Request Parameter: search_product (For example: top, tshirt, jean)

    // Response Code: 200
    expect(response.status()).toBe(200);

    // Response JSON: Searched products list
    const responseBody = JSON.parse(await response.text());
    // expect(responseBody.id).toBe(2);
    // expect(responseBody.name).toBe('Men Tshirt');
    // expect(responseBody.brand).toBe('H&M');
    // expect(responseBody.price).toBeTruthy();
    expect(response.ok()).toBeTruthy();
    console.log(responseBody);
  });
});