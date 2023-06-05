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

  test.fixme('DELETE to verify login', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/verifyLogin`);
    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
    console.log(responseBody);
  });
});