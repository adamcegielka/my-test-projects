/*
API 8: POST To Verify Login without email parameter
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameter: password
Response Code: 400
Response Message: Bad request, email or password parameter is missing in POST request.
*/

import { test, expect } from '@playwright/test';

test.describe('API 8: POST To Verify Login without email parameter', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('verify login without email parameter', async ({ request }) => {
    // Request Method: POST
    const response = await request.post(`${baseUrl}/verifyLogin`,{
        // ...
    });

    // Request Parameter: password

    // Response Code: 400
    expect(response.status()).toBe(400);

    // Response Message: Bad request, email or password parameter is missing in POST request.
  });
});