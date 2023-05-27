/*
API 9: DELETE To Verify Login
API URL: https://automationexercise.com/api/verifyLogin
Request Method: DELETE
Response Code: 405
Response Message: This request method is not supported.
*/

import { test, expect } from '@playwright/test';

test.describe('API 9: DELETE To Verify Login', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('DELETE to verify login', async ({ request }) => {
    // Request Method: DELETE
    const response = await request.delete(`${baseUrl}/verifyLogin`,{
        // ...
    });

    // Response Code: 405
    expect(response.status()).toBe(405);

    // Response Message: This request method is not supported.
  });
});