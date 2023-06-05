/*
API 7: POST To Verify Login with valid details
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameters: email, password
Response Code: 200
Response Message: User exists!
*/

import { test, expect } from '@playwright/test';

test.describe('API 7: POST To Verify Login with valid details', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test.fixme('POST to verify login with valid details', async ({ request }) => {
    const response = await request.post(`${baseUrl}/verifyLogin`,{
      data: {
        email: 'testowy@email.com',
        password: 'abcd1234',
      },
    });   
    const responseBody = JSON.parse(await response.text());;

    expect(response.status()).toBe(200);
    expect(responseBody.message).toBe('User exists!');
    console.log(responseBody);
  });
});