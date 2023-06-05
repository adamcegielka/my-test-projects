/*
API 10: POST To Verify Login with invalid details
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameters: email, password (invalid values)
Response Code: 404
Response Message: User not found!
*/

import { test, expect } from '@playwright/test';

test.describe('API 10: POST To Verify Login with invalid details', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test.fixme('POST to verify login with invalid details', async ({ request }) => {
    const response = await request.post(`${baseUrl}/verifyLogin`);
    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(404);
    expect(responseBody.message).toBe('User not found!');
    console.log(responseBody);
  });
});
