/*
API 11: POST To Create/Register User Account
API URL: https://automationexercise.com/api/createAccount
Request Method: POST
Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
Response Code: 201
Response Message: User created!
*/

import { test, expect } from '@playwright/test';

test.describe('API 11: POST To Create/Register User Account', () => {
  const baseUrl = 'https://automationexercise.com/api';

  test('POST to Create/Register user account', async ({ request }) => {
    // Request Method: POST
    const response = await request.post(`${baseUrl}/createAccount`,{
        // ...
    });

    // Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number

    // Request Parameters: email, password (invalid values)

    // Response Code: 201
    expect(response.status()).toBe(201);

    // Response Message: User created!
  });
});