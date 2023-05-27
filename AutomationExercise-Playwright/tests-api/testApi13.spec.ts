/*
API 13: PUT METHOD To Update User Account
API URL: https://automationexercise.com/api/updateAccount
Request Method: PUT
Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
Response Code: 200
Response Message: User updated!
*/

import { test, expect } from '@playwright/test';

test.describe('AAPI 13: PUT METHOD To Update User Account', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('PUT METHOD to update user account', async ({ request }) => {
    // Request Method: PUT
    const response = await request.put(`${baseUrl}/updateAccount`,{
        // ...
    });

    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number

    // Response Code: 200
    expect(response.status()).toBe(200);

    // Response Message: User updated!
  });
});