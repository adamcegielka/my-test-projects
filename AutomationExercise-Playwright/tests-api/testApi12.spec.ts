/*
API 12: DELETE METHOD To Delete User Account
API URL: https://automationexercise.com/api/deleteAccount
Request Method: DELETE
Request Parameters: email, password
Response Code: 200
Response Message: Account deleted!
*/

import { test, expect } from '@playwright/test';

test.describe('API 12: DELETE METHOD To Delete User Account', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('DELETE METHOD to delete user account', async ({ request }) => {
    // Request Method: DELETE
    const response = await request.delete(`${baseUrl}/deleteAccount`,{
        // ...
    });

    // Request Parameters: email, password

    // Response Code: 200
    expect(response.status()).toBe(200);

    // Response Message: Account deleted!
  });
});