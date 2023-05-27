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

  test('user account detail by email', async ({ request }) => {
    // Request Method: GET
    const response = await request.get(`${baseUrl}/getUserDetailByEmail`,{
        // ...
    });

    // Request Parameters: email

    // Response Code: 200
    expect(response.status()).toBe(200);

    // Response JSON: User Detail
  });
});