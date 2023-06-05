/*
API 14: GET user account detail by email
API URL: https://automationexercise.com/api/getUserDetailByEmail
Request Method: GET
Request Parameters: email
Response Code: 200
Response JSON: User Detail
*/

import { test, expect } from '@playwright/test';

test.describe('API 14: GET user account detail by email', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test.fixme('user account detail by email', async ({ request }) => {
    const response = await request.get(`${baseUrl}/getUserDetailByEmail`);

    expect(response.status()).toBe(200);
    console.log(await response.json());
  });
});